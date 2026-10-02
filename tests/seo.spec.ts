import { expect, test } from '@playwright/test';
import { BASE, homePath, LANGS, prodUrl, toLocal } from './fixtures';

/** Read width/height from a PNG's IHDR chunk. */
const pngSize = (buf: Buffer) => ({ width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) });

for (const lang of LANGS) {
  test.describe(`home (${lang})`, () => {
    test('responds 200 with correct document metadata', async ({ page, baseURL }) => {
      const res = await page.goto(homePath(lang));
      expect(res?.status()).toBe(200);

      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(lang === 'th' ? /วงศธร/ : /Wongsathorn/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);

      const self = prodUrl(homePath(lang));
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', self);
      await expect(page.locator('link[rel="alternate"][hreflang="th"]')).toHaveAttribute('href', prodUrl('./'));
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', prodUrl('en/'));
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', prodUrl('./'));
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', self);

      // og:image is an absolute production URL — fetch the same path from the preview server.
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBe(prodUrl(`og/home-${lang}.png`));
      const img = await page.request.get(toLocal(ogImage as string, baseURL as string));
      expect(img.status()).toBe(200);
      expect(img.headers()['content-type']).toContain('image/png');
      expect(pngSize(await img.body())).toEqual({ width: 1200, height: 630 });

      // Every JSON-LD block parses and the Person entity is present.
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks.length).toBeGreaterThan(0);
      const entities = blocks.flatMap((b) => {
        const parsed: unknown = JSON.parse(b);
        return Array.isArray(parsed) ? parsed : [parsed];
      }) as { '@context'?: string; '@type'?: string }[];
      for (const e of entities) expect(e['@context']).toBe('https://schema.org');
      expect(entities.some((e) => e['@type'] === 'Person')).toBe(true);
    });
  });
}

test.describe('crawl files', () => {
  test('sitemap-index.xml lists a sitemap containing every locale', async ({ request }) => {
    const index = await request.get('sitemap-index.xml');
    expect(index.status()).toBe(200);
    const xml = await index.text();
    expect(xml).toContain('<sitemapindex');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] as string);
    expect(locs.length).toBeGreaterThan(0);

    const urls: string[] = [];
    for (const loc of locs) {
      expect(loc.startsWith(prodUrl('./'))).toBe(true);
      const child = await request.get(new URL(loc).pathname.replace(/^\/Profile\//, ''));
      expect(child.status()).toBe(200);
      urls.push(...[...(await child.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] as string));
    }
    expect(urls).toContain(prodUrl('./'));
    expect(urls).toContain(prodUrl('en/'));
    expect(urls.some((u) => u.includes('/404'))).toBe(false);
  });

  test('robots.txt allows crawling and references the sitemap', async ({ request }) => {
    const res = await request.get('robots.txt');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/plain');
    const body = await res.text();
    expect(body).toMatch(/^User-agent: \*$/m);
    expect(body).not.toMatch(/^Disallow: \/\s*$/m);
    expect(body).toContain(`Sitemap: ${prodUrl('sitemap-index.xml')}`);
  });

  test('web manifest is served and scoped to the base path', async ({ request }) => {
    const res = await request.get('manifest.webmanifest');
    expect(res.status()).toBe(200);
    const manifest = (await res.json()) as { start_url: string; scope: string; icons: { src: string }[] };
    expect(manifest.start_url).toBe(BASE);
    expect(manifest.scope).toBe(BASE);
    for (const icon of manifest.icons) {
      expect((await request.get(icon.src.replace(BASE, ''))).status(), icon.src).toBe(200);
    }
  });

  test('unknown routes get the noindex 404 page', async ({ page }) => {
    const res = await page.goto('this-page-does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    // Scope to <main>: the header also links to both homes (hidden in the collapsed mobile nav).
    await expect(page.locator(`main a[href="${BASE}"]`).first()).toBeVisible();
    await expect(page.locator(`main a[href="${BASE}en/"]`).first()).toBeVisible();
  });
});
