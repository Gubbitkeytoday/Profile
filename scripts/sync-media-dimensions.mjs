#!/usr/bin/env node
/**
 * Reads every image variant referenced by src/data/projects.json and writes its
 * intrinsic `width`/`height` (taken from the largest variant) back into the file.
 * Run after adding or replacing screenshots:  node scripts/sync-media-dimensions.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const DATA = new URL('../src/data/projects.json', import.meta.url);
const PUBLIC = new URL('../public/', import.meta.url);

const size = async (path, widths, format = 'webp') => {
  const w = Math.max(...widths);
  const meta = await sharp(new URL(`${path}-${w}.${format}`, PUBLIC).pathname).metadata();
  return { width: meta.width, height: meta.height };
};

const projects = JSON.parse(await readFile(DATA, 'utf8'));
let missing = 0;
for (const p of projects) {
  try {
    Object.assign(p.cover, await size(p.cover.path, p.cover.widths));
  } catch (e) {
    missing++;
    console.error(`cover ${p.id}: ${e.message}`);
  }
  for (const g of p.gallery) {
    if (g.type !== 'image') continue;
    try {
      Object.assign(g, await size(g.path, g.widths, g.format));
    } catch (e) {
      missing++;
      console.error(`gallery ${p.id} ${g.path}: ${e.message}`);
    }
  }
}
await writeFile(DATA, `${JSON.stringify(projects, null, 2)}\n`);
console.log(`Updated ${projects.length} projects${missing ? `, ${missing} missing files` : ''}.`);
process.exit(missing ? 1 : 0);
