// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export const SITE = 'https://gubbitkeytoday.github.io';
export const BASE = '/Profile';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  // Per-page CSS is small (~20 KB gzipped); inlining it removes every render-blocking request.
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'th', locales: { th: 'th-TH', en: 'en-US' } },
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
