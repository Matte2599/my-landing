import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type ProjectEntry = CollectionEntry<'projects'>;

/**
 * All published projects for a given locale, sorted by `order` ascending.
 */
export async function getProjects(locale: Locale): Promise<ProjectEntry[]> {
  const all = await getCollection('projects', (entry) => {
    return entry.data.lang === locale && !entry.data.draft;
  });
  return all.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Lookup a single project by slug + locale.
 */
export async function getProject(
  slug: string,
  locale: Locale,
): Promise<ProjectEntry | undefined> {
  const projects = await getProjects(locale);
  return projects.find((p) => p.data.slug === slug);
}

/**
 * Find previous and next project for prev/next navigation on case study pages.
 */
export async function getAdjacentProjects(
  slug: string,
  locale: Locale,
): Promise<{ prev: ProjectEntry | null; next: ProjectEntry | null }> {
  const projects = await getProjects(locale);
  const idx = projects.findIndex((p) => p.data.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
