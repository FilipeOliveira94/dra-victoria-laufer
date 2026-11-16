import type { APIRoute } from 'astro';

// One canonical page (issue 1.6). The URL follows DEPLOY_TARGET through
// `site` and `base`, like the canonical link. The 404 page is not listed.
export const GET: APIRoute = ({ site }) => {
  const home = new URL(import.meta.env.BASE_URL, site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${home}</loc></url>
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
