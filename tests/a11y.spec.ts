import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import {
  expectTheme,
  homePath,
  LANGS,
  type Lang,
  projectPathFor,
  SAMPLE_PROJECT,
  scrollThrough,
  THEMES,
  type Theme,
  useTheme,
} from './fixtures';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

// Deterministic end state for scroll-driven reveals / transitions so contrast is measured on final colours.
test.use({ reducedMotion: 'reduce' });

async function audit(page: Page) {
  await scrollThrough(page);
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  // Compact, readable failure output: rule → impact → offending selectors.
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.slice(0, 10).map((n) => n.target.join(' ')),
  }));
}

const cases: { name: string; path: string; lang: Lang; theme: Theme }[] = [
  ...LANGS.flatMap((lang) =>
    THEMES.map((theme) => ({ name: `home ${lang} ${theme}`, path: homePath(lang), lang, theme })),
  ),
  ...THEMES.map((theme) => ({
    name: `project ${SAMPLE_PROJECT.id} th ${theme}`,
    path: projectPathFor(SAMPLE_PROJECT.id, 'th'),
    lang: 'th' as const,
    theme,
  })),
];

test.describe('axe (WCAG 2.2 AA)', () => {
  for (const c of cases) {
    test(`${c.name}: zero violations`, async ({ page }) => {
      await useTheme(page, c.theme);
      await page.goto(c.path);
      await expectTheme(page, c.theme);
      await expect(page.locator('html')).toHaveAttribute('lang', c.lang);
      expect(await audit(page)).toEqual([]);
    });
  }
});

test.describe('keyboard', () => {
  for (const lang of LANGS) {
    test(`skip link is the first tab stop and moves focus to #main (${lang})`, async ({ page }) => {
      await page.goto(homePath(lang));
      await page.keyboard.press('Tab');
      const skip = page.locator('a.skip-link');
      await expect(skip).toBeFocused();
      await expect(skip).toHaveAttribute('href', '#main');
      await expect(skip).toBeVisible();
      await page.keyboard.press('Enter');
      await expect(page.locator('#main')).toBeFocused();
      await expect(page).toHaveURL(/#main$/);
    });
  }
});
