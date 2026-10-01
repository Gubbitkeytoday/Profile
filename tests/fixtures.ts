import { expect, type Page } from '@playwright/test';
import projectsJson from '../src/data/projects.json' with { type: 'json' };

export type Lang = 'th' | 'en';
export const LANGS: readonly Lang[] = ['th', 'en'];
export const THEMES = ['dark', 'light'] as const;
export type Theme = (typeof THEMES)[number];

/** Production origin + base used for canonical / hreflang / og:image URLs. */
export const SITE = 'https://gubbitkeytoday.github.io';
export const BASE = '/Profile/';

export interface ProjectRecord {
  id: string;
  title: Record<Lang, string>;
}
export const projects: ProjectRecord[] = projectsJson;

/** Path relative to Playwright's `baseURL` (…/Profile/) — never starts with a slash. */
export const homePath = (lang: Lang) => (lang === 'th' ? './' : 'en/');
export const projectPathFor = (id: string, lang: Lang) => `${lang === 'th' ? '' : 'en/'}projects/${id}/`;
/** Absolute production URL for a base-relative path. */
export const prodUrl = (relative: string) => new URL(relative, `${SITE}${BASE}`).href;

/** A project used for the "one project page" checks (first entry in the data file). */
export const SAMPLE_PROJECT = projects[0] as ProjectRecord;

/** Persist the theme before any page script runs (Base.astro reads localStorage 'theme'). */
export async function useTheme(page: Page, theme: Theme) {
  await page.addInitScript((t) => {
    try {
      localStorage.setItem('theme', t);
    } catch {}
  }, theme);
}

export async function expectTheme(page: Page, theme: Theme) {
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
}

/** Scroll the whole page so lazy media and scroll-triggered content load. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
}

/** Map an absolute production URL (e.g. og:image) onto the local preview server. */
export const toLocal = (absolute: string, baseURL: string) => {
  const u = new URL(absolute);
  return new URL(u.pathname + u.search, baseURL).href;
};
