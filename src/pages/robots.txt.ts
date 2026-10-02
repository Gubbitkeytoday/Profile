import type { APIRoute } from 'astro';

/** robots.txt — allow everything and point crawlers at the sitemap index (absolute URL, base-aware). */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap-index.xml`, site);
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap.href}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
