import { getProjects } from '@/lib/projects';

/** Shared getStaticPaths for /projects/[slug]/ in every locale. */
export async function projectStaticPaths() {
  const projects = await getProjects();
  return projects.map((project, i) => ({
    params: { slug: project.id },
    props: { project, prev: projects[i - 1], next: projects[i + 1] },
  }));
}
