/**
 * Build-time media helpers for the project detail page.
 * (Server-only: reads poster dimensions from /public.)
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { asset } from '@/i18n';

export type Ext = 'webp' | 'jpg';

export interface Variant {
  url: string;
  /** Real pixel width of this file (never larger than the source). */
  w: number;
}

/**
 * Variants of `<path>-<width>.<ext>`. Small sources were exported to every
 * width bucket without upscaling, so descriptors are capped at the intrinsic
 * width and duplicates dropped (the smallest file wins).
 */
export function variants(path: string, widths: readonly number[], intrinsic: number, ext: Ext = 'webp'): Variant[] {
  const out: Variant[] = [];
  for (const w of [...new Set(widths)].sort((a, b) => a - b)) {
    const real = Math.min(w, intrinsic);
    if (out.some((v) => v.w === real)) continue;
    out.push({ url: asset(`${path}-${w}.${ext}`), w: real });
  }
  return out;
}

export const toSrcset = (list: readonly Variant[]): string => list.map((v) => `${v.url} ${v.w}w`).join(', ');

/** Smallest variant at least `min` px wide (or the largest available). */
export const atLeast = (list: readonly Variant[], min: number): Variant =>
  list.find((v) => v.w >= min) ?? (list.at(-1) as Variant);

/** Read width/height from a baseline/progressive JPEG header. */
function jpegSize(buf: Buffer): { width: number; height: number } | undefined {
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1] ?? 0;
    if (marker === 0xff || marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += marker === 0xff ? 1 : 2;
      continue;
    }
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return undefined;
}

const posterCache = new Map<string, { width: number; height: number }>();

/** Intrinsic size of `<path>-poster.jpg` (videos carry no size in the data). */
export function posterSize(path: string): { width: number; height: number } {
  const cached = posterCache.get(path);
  if (cached) return cached;
  let size = { width: 1280, height: 720 };
  try {
    size = jpegSize(readFileSync(join(process.cwd(), 'public', `${path}-poster.jpg`))) ?? size;
  } catch {
    /* keep the 16:9 fallback */
  }
  posterCache.set(path, size);
  return size;
}
