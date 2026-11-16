// Serves dist/ under the configured base path and requests every resource
// the built pages reference (href, src, srcset, and url() in the CSS they
// load). Fails on any status other than 200, on any request to another host,
// and on any published image above 200 KB (AGENTS.md §9).
//
// Usage: node scripts/check-requests.mjs [base]   (default base "/")
// Example: node scripts/check-requests.mjs /dra-victoria-laufer/

import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const MAX_IMAGE_BYTES = 200 * 1024;
const IMAGE = /\.(avif|webp|png|jpe?g|gif|svg|ico)$/i;

const DIST = 'dist';
const base = (process.argv[2] || '/').replace(/\/?$/, '/');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

async function resolveFile(urlPath) {
  if (!urlPath.startsWith(base)) return null;
  const rel = normalize(decodeURIComponent(urlPath.slice(base.length)));
  if (rel.startsWith('..')) return null;
  let file = join(DIST, rel);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(new URL(req.url, 'http://x').pathname);
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
});

async function files(dir, test) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(p, test)));
    else if (test.test(p)) out.push(p);
  }
  return out;
}

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const failures = [];
let checked = 0;

for (const file of await files(DIST, /\.html$/)) {
  const pageUrl = new URL(base + file.slice(DIST.length + 1).replace(/index\.html$/, ''), origin);
  const html = await readFile(file, 'utf8');
  const refs = new Set();
  for (const [tag] of html.matchAll(/<[a-z]+\s[^>]*>/gi)) {
    const ref = tag.match(/\s(?:href|src)="([^"]+)"/)?.[1];
    if (!ref || /^(mailto|tel|data):/.test(ref) || ref.startsWith('#')) continue;
    // A canonical link is metadata, not a request made by the page.
    if (/^<link\s/i.test(tag) && /rel="canonical"/.test(tag)) continue;
    const target = new URL(ref, pageUrl);
    // Anchors to other hosts are navigation, not requests at page load.
    if (/^<a\s/i.test(tag) && target.origin !== origin) continue;
    refs.add(ref);
  }
  for (const [, set] of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const candidate of set.split(',')) refs.add(candidate.trim().split(/\s+/)[0]);
  }
  // Stylesheets: their url() references (fonts) are requests at page load too.
  for (const ref of [...refs]) {
    if (!ref.endsWith('.css')) continue;
    const cssUrl = new URL(ref, pageUrl);
    if (cssUrl.origin !== origin) continue;
    const css = await (await fetch(cssUrl)).text();
    for (const [, u] of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
      if (!u.startsWith('data:')) refs.add(new URL(u, cssUrl).href);
    }
  }
  for (const ref of refs) {
    const target = new URL(ref, pageUrl);
    if (target.origin !== origin) {
      failures.push(`${file}: third-party request ${ref}`);
      continue;
    }
    const res = await fetch(target);
    checked++;
    if (res.status !== 200) failures.push(`${file}: ${res.status} ${target.pathname}`);
  }
  // The page itself must also be served at the base path.
  const page = await fetch(pageUrl);
  checked++;
  if (page.status !== 200) failures.push(`${file}: ${page.status} ${pageUrl.pathname}`);
}

server.close();

for (const img of await files(DIST, IMAGE)) {
  const { size } = await stat(img);
  if (size > MAX_IMAGE_BYTES) failures.push(`${img}: ${Math.round(size / 1024)} KB, above 200 KB`);
}
console.log(`base ${base}: ${checked} requests, ${failures.length} failing`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
