import type { APIRoute } from 'astro';

// Crawling is allowed (issue 1.6). Indexing is controlled by `indexable` in
// src/config/release.ts (ADR-0006), released in issue 2.6. Under the GitHub
// Pages project path this file is not at the host root, so robots ignore it
// there; it takes effect on the domain (issue 3.2).
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
