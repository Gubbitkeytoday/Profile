import { type CollectionEntry, getCollection } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectCategory = Project['data']['category'];

/** Site-wide project order: newest year first, then the portfolio's "no." (`order`) descending. */
export const byNewest = (a: Project, b: Project): number => b.data.year - a.data.year || b.data.order - a.data.order;

/** All projects in site-wide order (Work index, prev/next, CV, palette all share it). */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort(byNewest);
}

export const projectPath = (p: Project | string): string => `/projects/${typeof p === 'string' ? p : p.id}/`;
