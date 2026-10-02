import { expect, type Page, test } from '@playwright/test';
import { homePath, projectPathFor, SAMPLE_PROJECT, scrollThrough } from './fixtures';

const PAGES = [
  { name: 'home (th)', path: homePath('th') },
  { name: 'home (en)', path: homePath('en') },
  { name: `project ${SAMPLE_PROJECT.id} (th)`, path: projectPathFor(SAMPLE_PROJECT.id, 'th') },
];

/** Record console errors, uncaught exceptions, failed requests and HTTP ≥ 400 responses. */
function watch(page: Page) {
  const problems: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`console.error: ${msg.text()} (${msg.location().url})`);
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
  page.on('requestfailed', (req) => {
    const reason = req.failure()?.errorText ?? 'unknown';
    // Browsers legitimately abort media range requests when they switch/seek streams.
    if (reason === 'net::ERR_ABORTED' && req.resourceType() === 'media') return;
    problems.push(`requestfailed: ${req.method()} ${req.url()} — ${reason}`);
  });
  page.on('response', (res) => {
    if (res.status() >= 400) problems.push(`HTTP ${res.status()}: ${res.request().method()} ${res.url()}`);
  });
  return problems;
}

for (const { name, path } of PAGES) {
  test.describe(name, () => {
    test('no console errors and no failed requests', async ({ page }) => {
      const problems = watch(page);
      await page.goto(path, { waitUntil: 'load' });
      await scrollThrough(page);
      await page.waitForLoadState('networkidle');
      expect(problems).toEqual([]);
    });

    test('every <img> has width, height and alt attributes', async ({ page }) => {
      await page.goto(path);
      const bad = await page.locator('img').evaluateAll((imgs) =>
        imgs
          .filter((img) => {
            const w = img.getAttribute('width');
            const h = img.getAttribute('height');
            const ok = (v: string | null) => v !== null && /^\d+$/.test(v) && Number(v) > 0;
            return !ok(w) || !ok(h) || !img.hasAttribute('alt');
          })
          .map((img) => img.outerHTML.slice(0, 200)),
      );
      expect(bad).toEqual([]);
    });
  });
}

test('internal links on the home pages resolve (no 404s)', async ({ page, baseURL, isMobile }) => {
  test.skip(isMobile, 'link targets are viewport independent');
  const origin = new URL(baseURL as string).origin;
  const targets = new Set<string>();
  for (const lang of ['th', 'en'] as const) {
    await page.goto(homePath(lang));
    const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const u = new URL(href);
      if (u.origin !== origin) continue;
      u.hash = '';
      targets.add(u.href);
    }
  }
  expect(targets.size).toBeGreaterThan(1);

  const broken: string[] = [];
  for (const url of targets) {
    const res = await page.request.get(url, { maxRedirects: 0 });
    if (res.status() !== 200) broken.push(`${res.status()} ${url}`);
  }
  expect(broken).toEqual([]);
});
