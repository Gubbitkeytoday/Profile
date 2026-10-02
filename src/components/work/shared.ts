/**
 * Shared by the Work section's build-time markup AND its client script, so the
 * search haystack and the query are normalised by exactly the same function.
 * Keep this file dependency-free (it is bundled into the browser).
 */

/** Lower-case, NFKC, and drop spaces / dots / hyphens / slashes, so "nextjs" ↔ "Next.js". */
export const norm = (s: string): string =>
  s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s.\-/_·,()+]+/g, '');

/** Families whose tag strings differ only by a suffix ("Tailwind CSS" vs "Tailwind"). */
const TECH_ALIASES: Record<string, string> = {
  tailwindcss: 'tailwind',
  leafletjs: 'leaflet',
  node: 'nodejs',
  next: 'nextjs',
  three: 'threejs',
};

/** Canonical tech key: normalised, trailing version number dropped ("Next.js 14" → "nextjs"). */
export const techKey = (tag: string): string => {
  const n = norm(tag);
  const k = n.replace(/\d+$/, '') || n;
  return TECH_ALIASES[k] ?? k;
};

export const CATEGORIES = ['web', 'interactive', 'app'] as const;
export type Category = (typeof CATEGORIES)[number];

/** "BKK Transit — Bangkok Open…" → ["BKK Transit", "Bangkok Open…"]. */
export const splitTitle = (title: string): [string, string] => {
  const i = title.indexOf(' — ');
  return i === -1 ? [title, ''] : [title.slice(0, i), title.slice(i + 3)];
};
