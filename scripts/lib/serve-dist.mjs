// Serves dist/ under a base path, the way GitHub Pages does: a directory
// answers with its index.html, and a missing path answers 404 with
// dist/404.html. Used by the request, axe and Lighthouse checks.
//
// As a module: const { origin, close } = await serveDist('/dra-victoria-laufer/');
// As a command (Lighthouse CI): node scripts/lib/serve-dist.mjs [base] [port]

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DIST = 'dist';

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

export function normalizeBase(base = '/') {
  return base.replace(/\/?$/, '/');
}

async function resolveFile(urlPath, base) {
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

export async function serveDist(base = '/', port = 0) {
  base = normalizeBase(base);
  const server = createServer(async (req, res) => {
    const file = await resolveFile(new URL(req.url, 'http://x').pathname, base);
    if (!file) {
      const notFound = await readFile(join(DIST, '404.html')).catch(() => '');
      res.writeHead(404, { 'content-type': types['.html'] }).end(notFound);
      return;
    }
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  });
  await new Promise((r) => server.listen(port, '127.0.0.1', r));
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    base,
    close: () => new Promise((r) => server.close(r)),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { origin, base } = await serveDist(process.argv[2], Number(process.argv[3] || 4322));
  console.log(`Serving ${DIST}/ at ${origin}${base}`);
}
