import type { APIRoute } from 'astro';

// Crawling is allowed on purpose (issue 1.6): a robot must fetch the page to
// read its noindex, which controls indexing until issue 2.5 (ADR-0006).
// Under the GitHub Pages project path this file is not at the host root, so
// robots ignore it there; the noindex still applies.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
