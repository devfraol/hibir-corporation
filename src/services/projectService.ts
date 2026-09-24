import { projects, type Project, type ProjectStatus } from "@/data/projects";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { fetchPublishedProjectRows, type PublishedProjectRow } from "@/services/supabaseContentAdapters";
import type { Database } from "@/types/database";
import { PROJECT_CATEGORIES, type AdminProjectFilters, type CreateProjectInput, type ProjectCategory, type ProjectPublicationStatus, type UpdateProjectInput } from "@/types/projects";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImageRow = Database["public"]["Tables"]["project_images"]["Row"];
export interface AdminProject extends ProjectRow { images: ProjectImageRow[]; }

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
    // Contract value and contractor role are static fallback-only fields. Do not
    // fabricate them for CMS records until their database columns are approved.
    status: row.project_status ?? undefined,
    contractValue: undefined,
    contractorRole: undefined,
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

const withImages = async (rows: ProjectRow[]): Promise<AdminProject[]> => {
  if (!rows.length) return [];
  const { data, error } = await getSupabaseClient().from("project_images").select("*").in("project_id", rows.map((row) => row.id)).order("sort_order");
  if (error) throw error;
  const byProject = new Map<string, ProjectImageRow[]>();
  for (const image of data) byProject.set(image.project_id, [...(byProject.get(image.project_id) ?? []), image]);
  return rows.map((row) => ({ ...row, images: byProject.get(row.id) ?? [] }));
};

export async function getAdminProjects(filters: AdminProjectFilters = {}): Promise<AdminProject[]> {
  let query = getSupabaseClient().from("projects").select("*").order("updated_at", { ascending: false });
  if (filters.status && filters.status !== "all") query = query.eq("status", filters.status);
  if (filters.category && filters.category !== "all") query = query.eq("category", filters.category);
  if (filters.projectStatus && filters.projectStatus !== "all") query = query.eq("project_status", filters.projectStatus);
  if (filters.featured === "featured") query = query.eq("featured", true);
  if (filters.featured === "not_featured") query = query.eq("featured", false);
  if (filters.search?.trim()) query = query.or(`title.ilike.%${filters.search.trim()}%,client.ilike.%${filters.search.trim()}%,location.ilike.%${filters.search.trim()}%`);
  const { data, error } = await query;
  if (error) throw error;
  return withImages(data);
}

export async function getAdminProjectById(id: string): Promise<AdminProject | null> {
  const { data, error } = await getSupabaseClient().from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? (await withImages([data]))[0] : null;
}

const toRow = (input: UpdateProjectInput) => ({
  ...(input.title !== undefined && { title: input.title }), ...(input.slug !== undefined && { slug: input.slug }),
  ...(input.description !== undefined && { description: input.description || null }), ...(input.client !== undefined && { client: input.client || null }),
  ...(input.consultant !== undefined && { consultant: input.consultant || null }), ...(input.location !== undefined && { location: input.location || null }),
  ...(input.category !== undefined && { category: input.category }), ...(input.coverImage !== undefined && { cover_image: input.coverImage || null }),
  ...(input.featured !== undefined && { featured: input.featured }), ...(input.status !== undefined && { status: input.status }),
  ...(input.projectStatus !== undefined && { project_status: input.projectStatus }), ...(input.contractDate !== undefined && { contract_date: input.contractDate || null }),
  ...(input.completionDate !== undefined && { completion_date: input.completionDate || null }),
});

export async function createProject(input: CreateProjectInput): Promise<AdminProject> {
  const { data, error } = await getSupabaseClient().from("projects").insert(toRow(input)).select("*").single();
  if (error) throw error;
  return { ...data, images: [] };
}
export async function updateProject(id: string, input: UpdateProjectInput): Promise<AdminProject> {
  const { data, error } = await getSupabaseClient().from("projects").update(toRow(input)).eq("id", id).select("*").single();
  if (error) throw error;
  return (await withImages([data]))[0];
}
export async function deleteProject(id: string): Promise<void> { const { error } = await getSupabaseClient().from("projects").delete().eq("id", id); if (error) throw error; }
export const publishProject = (id: string) => updateProject(id, { status: "published" });
export const archiveProject = (id: string) => updateProject(id, { status: "archived" });
export const saveProjectDraft = (id: string, input: UpdateProjectInput) => updateProject(id, { ...input, status: "draft" });

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
