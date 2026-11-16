// Serves dist/ under the configured base path and requests every resource
// the built pages reference (href, src, srcset, and url() in the CSS they
// load). Fails on any status other than 200, on any request to another host,
// on any link to an anchor (#id) that does not exist on its page, and on any
// published image above 200 KB (AGENTS.md §9).
//
// Usage: node scripts/check-requests.mjs [base]   (default base "/")
// Example: node scripts/check-requests.mjs /dra-victoria-laufer/
//
// Remote mode, for the published site (run after each deploy): pass the page
// URL instead of a base. It checks that page and every resource it loads, and
// the 200 KB limit on the image bytes it receives.
// Example: node scripts/check-requests.mjs https://filipeoliveira94.github.io/dra-victoria-laufer/

import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { DIST, normalizeBase, serveDist } from './lib/serve-dist.mjs';

const MAX_IMAGE_BYTES = 200 * 1024;
const IMAGE = /\.(avif|webp|png|jpe?g|gif|svg|ico)$/i;

const arg = process.argv[2] || '/';
const remote = /^https?:\/\//.test(arg) ? new URL(arg) : null;
const base = normalizeBase(remote ? remote.pathname : arg);

async function files(dir, test) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(p, test)));
    else if (test.test(p)) out.push(p);
  }
  return out;
}

const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

let origin;
let server;
const pages = [];
if (remote) {
  origin = remote.origin;
  const res = await fetch(remote);
  pages.push({ file: remote.href, pageUrl: remote, html: res.ok ? await res.text() : '' });
} else {
  server = await serveDist(base);
  origin = server.origin;
  for (const file of await files(DIST, /\.html$/)) {
    const pageUrl = new URL(base + file.slice(DIST.length + 1).replace(/index\.html$/, ''), origin);
    pages.push({ file, pageUrl, html: await readFile(file, 'utf8') });
  }
}
const failures = [];
let checked = 0;

for (const { file, pageUrl, html } of pages) {
  const refs = new Set();
  const anchors = new Set();
  for (const [tag] of html.matchAll(/<[a-z]+\s[^>]*>/gi)) {
    const ref = tag.match(/\s(?:href|src)="([^"]+)"/)?.[1];
    if (!ref || /^(mailto|tel|data):/.test(ref)) continue;
    // A canonical link is metadata, not a request made by the page.
    if (/^<link\s/i.test(tag) && /rel="canonical"/.test(tag)) continue;
    const target = new URL(ref, pageUrl);
    if (/^<a\s/i.test(tag)) {
      // Anchors to other hosts are navigation, not requests at page load.
      if (target.origin !== origin) continue;
      if (target.hash) anchors.add(target.href);
      if (ref.startsWith('#')) continue;
    }
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
    else if (remote && IMAGE.test(target.pathname)) {
      const bytes = (await res.arrayBuffer()).byteLength;
      if (bytes > MAX_IMAGE_BYTES) failures.push(`${target.pathname}: ${Math.round(bytes / 1024)} KB, above 200 KB`);
    }
  }
  // Every link to an anchor must land on an element with that id.
  for (const href of anchors) {
    const target = new URL(href);
    const id = decodeURIComponent(target.hash.slice(1));
    target.hash = '';
    const targetHtml = target.href === new URL(pageUrl).href ? html : await (await fetch(target)).text();
    if (!id || !ids(targetHtml).has(id)) failures.push(`${file}: link to missing anchor ${href.replace(origin, '')}`);
  }
  // The page itself must also be served at the base path.
  const page = await fetch(pageUrl);
  checked++;
  if (page.status !== 200) failures.push(`${file}: ${page.status} ${pageUrl.pathname}`);
}

if (!remote) {
  await server.close();
  for (const img of await files(DIST, IMAGE)) {
    const { size } = await stat(img);
    if (size > MAX_IMAGE_BYTES) failures.push(`${img}: ${Math.round(size / 1024)} KB, above 200 KB`);
  }
}
console.log(`${remote ? origin : 'base'} ${base}: ${checked} requests, ${failures.length} failing`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
