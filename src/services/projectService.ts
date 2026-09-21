import { projects, type Project, type ProjectCategory, type ProjectStatus } from "@/data/projects";
import { isSupabaseConfigured } from "@/lib/supabase";
import { fetchPublishedProjectRows, type PublishedProjectRow } from "@/services/supabaseContentAdapters";

const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  "Asphalt Road",
  "Gravel Road",
  "Bridge",
  "Urban Infrastructure",
  "Cobblestone",
];

const isProjectCategory = (category: string | null): category is ProjectCategory =>
  category !== null && PROJECT_CATEGORIES.some((projectCategory) => projectCategory === category);

const toProject = (row: PublishedProjectRow): Project => {
  const gallery = row.images.map((image) => ({
    url: image.image_url,
    alt: image.alt_text ?? row.title,
    ...(image.caption ? { caption: image.caption } : {}),
  }));
  const coverImage = row.cover_image ?? gallery[0]?.url ?? "";

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description ?? "",
    client: row.client ?? "",
    location: row.location ?? "",
    // The Phase 1 schema intentionally stores publication status only. Delivery
    // status and contract value remain static-model fields until their approved
    // schema migration is planned.
    status: "Ongoing",
    contractValue: 0,
    contractorRole: "General Contractor (GC-1)",
    completionDate: row.completion_date ?? undefined,
    featuredImage: { url: coverImage, alt: row.title },
    gallery,
    category: isProjectCategory(row.category) ? row.category : "Urban Infrastructure",
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    budget: 0,
    image: coverImage,
  };
};

const getPublishedProjects = async (): Promise<Project[]> => {
  if (!isSupabaseConfigured) return projects;

  try {
    const rows = await fetchPublishedProjectRows();
    return rows.length > 0 ? rows.map(toProject) : projects;
  } catch (error) {
    console.warn("Unable to load published projects from Supabase; using static fallback.", error);
    return projects;
  }
};

/** Async data-access layer so the UI is ready for a real backend. */
export async function getProjects(status?: ProjectStatus | "All"): Promise<Project[]> {
  const all = await getPublishedProjects();
  if (!status || status === "All") return all;
  return all.filter((p) => p.status === status);
}

export async function getFeaturedProject(): Promise<Project> {
  const all = await getPublishedProjects();
  return all.find((p) => p.featured) ?? all[0];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return (await getPublishedProjects()).find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProjects(slug: string, limit = 3): Promise<Project[]> {
  const current = await getProjectBySlug(slug);
  if (!current) return [];
  const rest = (await getPublishedProjects()).filter((p) => p.slug !== slug);
  const sameCategory = rest.filter((p) => p.category === current.category);
  return [...sameCategory, ...rest.filter((p) => p.category !== current.category)].slice(0, limit);
}
