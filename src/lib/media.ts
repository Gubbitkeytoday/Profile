import { asset } from '@/i18n';

/** Media variants are pre-generated as `<path>-<width>.webp|jpg` (see docs/DEPLOYMENT.md). */
export const srcset = (path: string, widths: readonly number[], ext: 'webp' | 'jpg' = 'webp'): string =>
  widths.map((w) => `${asset(`${path}-${w}.${ext}`)} ${w}w`).join(', ');

/** Largest variant ≤ `max` (falls back to the smallest available). */
export const pickWidth = (widths: readonly number[], max = 960): number => {
  const sorted = [...widths].sort((a, b) => a - b);
  return sorted.filter((w) => w <= max).at(-1) ?? sorted[0] ?? 480;
};

export const imageSrc = (path: string, width: number, ext: 'webp' | 'jpg' = 'webp'): string =>
  asset(`${path}-${width}.${ext}`);

export const videoSrc = (path: string): string => asset(`${path}.mp4`);
export const posterSrc = (path: string): string => asset(`${path}-poster.jpg`);

/** Intrinsic size of every screenshot variant (all captured at 16:10). */
export const ASPECT = { w: 16, h: 10 } as const;
