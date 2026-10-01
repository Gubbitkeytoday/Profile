import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ th: z.string().min(1), en: z.string().min(1) });

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    order: z.number().int().positive(),
    category: z.enum(['web', 'interactive', 'app']),
    year: z.number().int().min(2020).max(2030),
    icon: z.string(),
    title: localized,
    role: localized,
    summary: localized,
    metrics: z.array(z.object({ value: z.string(), label: localized })),
    features: z.object({ th: z.array(z.string()), en: z.array(z.string()) }),
    tags: z.array(z.string()),
    repo: z.url().optional(),
    live: z.url().optional(),
    cover: z.object({
      path: z.string(),
      widths: z.array(z.number().int()).min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }),
    gallery: z.array(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal('image'),
          path: z.string(),
          widths: z.array(z.number().int()).min(1),
          width: z.number().int().positive(),
          height: z.number().int().positive(),
          /** A few full-page captures exceed WebP's 16383px limit and ship as JPEG only. */
          format: z.enum(['webp', 'jpg']).default('webp'),
        }),
        z.object({ type: z.literal('video'), path: z.string() }),
      ]),
    ),
  }),
});

export const collections = { projects };
