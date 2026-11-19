import type { APIRoute } from 'astro';
import { pages } from '../lib/content';

// The home (issue 1.6) and the privacy and legal notice pages (issue 5.1). The
// URLs follow DEPLOY_TARGET through `site` and `base`, like the canonical link.
// The 404 page is not listed.
export const GET: APIRoute = async ({ site }) => {
  const home = new URL(import.meta.env.BASE_URL, site).href;
  const urls = [home, ...(await pages()).map((p) => new URL(`${p.id}/`, home).href)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
