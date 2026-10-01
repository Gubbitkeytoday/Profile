import { type CollectionEntry, getCollection } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectCategory = Project['data']['category'];

/** All projects, newest-first by `order` (the portfolio's "no." field). */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => b.data.order - a.data.order);
}

export const projectPath = (p: Project | string): string => `/projects/${typeof p === 'string' ? p : p.id}/`;
