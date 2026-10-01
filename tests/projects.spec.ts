import { expect, test } from '@playwright/test';
import { LANGS, prodUrl, projectPathFor, projects } from './fixtures';

test.describe('project pages', () => {
  // Pure routing/content checks — viewport independent, so run them once.
  test.skip(({ isMobile }) => isMobile, 'covered by the desktop project');

  test('data file has projects', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  for (const project of projects) {
    for (const lang of LANGS) {
      test(`${project.id} (${lang})`, async ({ page }) => {
        const path = projectPathFor(project.id, lang);
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toContainText(project.title[lang]);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', prodUrl(path));
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          'content',
          prodUrl(`og/${project.id}-${lang}.png`),
        );
        const og = await page.request.get(`og/${project.id}-${lang}.png`);
        expect(og.status()).toBe(200);
        expect(og.headers()['content-type']).toContain('image/png');
      });
    }
  }
});
