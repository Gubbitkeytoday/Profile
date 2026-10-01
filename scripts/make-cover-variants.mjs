#!/usr/bin/env node
/**
 * Adds a mid-size 720w WebP for every project cover (from its largest variant),
 * so phones at DPR ~1.75–2 fetch ~half the bytes of the 960w file for the LCP image.
 *   node scripts/make-cover-variants.mjs && node scripts/sync-media-dimensions.mjs
 */
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const DATA = new URL('../src/data/projects.json', import.meta.url);
const PUBLIC = new URL('../public/', import.meta.url);
const WIDTH = 720;

const projects = JSON.parse(await readFile(DATA, 'utf8'));
for (const p of projects) {
  const { path, widths } = p.cover;
  const largest = Math.max(...widths);
  if (largest <= WIDTH || widths.includes(WIDTH)) continue;
  const source = new URL(`${path}-${largest}.webp`, PUBLIC).pathname;
  // Some sources were saved under every width at their native size — never upscale.
  if (((await sharp(source).metadata()).width ?? 0) <= WIDTH) continue;
  const out = new URL(`${path}-${WIDTH}.webp`, PUBLIC).pathname;
  if (!existsSync(out)) {
    await sharp(source).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(out);
  }
  p.cover.widths = [...widths, WIDTH].sort((a, b) => a - b);
  console.log(`${p.id}: +${WIDTH}w`);
}
await writeFile(DATA, `${JSON.stringify(projects, null, 2)}\n`);
