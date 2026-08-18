import { projects, type Project, type ProjectStatus } from "@/data/projects";

/** Async data-access layer so the UI is ready for a real backend. */
export async function getProjects(status?: ProjectStatus | "All"): Promise<Project[]> {
  if (!status || status === "All") return projects;
  return projects.filter((p) => p.status === status);
}

export async function getFeaturedProject(): Promise<Project> {
  return projects.find((p) => p.featured) ?? projects[0];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProjects(slug: string, limit = 3): Promise<Project[]> {
  const current = await getProjectBySlug(slug);
  if (!current) return [];
  const rest = projects.filter((p) => p.slug !== slug);
  const sameCategory = rest.filter((p) => p.category === current.category);
  return [...sameCategory, ...rest.filter((p) => p.category !== current.category)].slice(0, limit);
}
