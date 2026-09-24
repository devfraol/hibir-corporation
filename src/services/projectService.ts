import { projects as staticProjects, type Project, type ProjectStatus } from "@/data/projects";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { fetchPublishedProjectRows, type PublishedProjectRow } from "@/services/supabaseContentAdapters";
import type { Database } from "@/types/database";
import type { MediaAsset } from "@/services/newsService";
import { PROJECT_CATEGORIES, type AdminProjectFilters, type CreateProjectInput, type ProjectCategory, type ProjectPublicationStatus, type UpdateProjectInput } from "@/types/projects";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImageRow = Database["public"]["Tables"]["project_images"]["Row"];
export interface AdminProject extends ProjectRow { images: ProjectImageRow[]; }
export type ProjectGalleryImage = ProjectImageRow;
export type ProjectGalleryImageInput = Pick<ProjectImageRow, "image_url" | "alt_text" | "caption">;

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
    consultant: row.consultant ?? undefined,
    location: row.location ?? "",
    // Contract value and contractor role are static fallback-only fields. Do not
    // fabricate them for CMS records until their database columns are approved.
    status: row.project_status ?? undefined,
    contractValue: undefined,
    contractorRole: undefined,
    contractDate: row.contract_date ?? undefined,
    completionDate: row.completion_date ?? undefined,
    featuredImage: { url: coverImage, alt: row.title },
    gallery,
    category: isProjectCategory(row.category) ? row.category : "Urban Infrastructure",
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    budget: 0,
    image: coverImage,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  };
};

/**
 * The public catalogue uses one source at a time: published CMS rows when any
 * exist, otherwise the approved static catalogue. We intentionally never merge
 * them, avoiding duplicate cards during the Phase 4.4 migration.
 */
const getPublishedProjects = async (): Promise<Project[]> => {
  if (!isSupabaseConfigured) return staticProjects;

  try {
    const rows = await fetchPublishedProjectRows();
    return rows.length > 0 ? rows.map(toProject) : staticProjects;
  } catch (error) {
    console.warn("Unable to load published projects from Supabase; using static fallback.", error);
    return staticProjects;
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
  ...(input.seoTitle !== undefined && { seo_title: input.seoTitle || null }), ...(input.seoDescription !== undefined && { seo_description: input.seoDescription || null }),
});

export async function isProjectSlugAvailable(slug: string, excludingId?: string): Promise<boolean> {
  let query = getSupabaseClient().from("projects").select("id").eq("slug", slug);
  if (excludingId) query = query.neq("id", excludingId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return !data;
}

export async function uploadProjectImage(projectId: string, file: File): Promise<string> {
  const client = getSupabaseClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "image";
  const path = `projects/${projectId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from("project-media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return client.storage.from("project-media").getPublicUrl(path).data.publicUrl;
}

/** Project-gallery relationship methods. Removing a row never removes its storage object. */
export async function getProjectGallery(projectId: string): Promise<ProjectGalleryImage[]> {
  const { data, error } = await getSupabaseClient().from("project_images").select("*").eq("project_id", projectId).order("sort_order");
  if (error) throw error;
  return data;
}

export async function addProjectImages(projectId: string, images: ProjectGalleryImageInput[]): Promise<ProjectGalleryImage[]> {
  const unique = images.filter((image, index) => images.findIndex((candidate) => candidate.image_url === image.image_url) === index);
  if (unique.length !== images.length) throw new Error("The same media asset cannot be added to a project gallery more than once.");
  if (!unique.length) return [];
  const existing = await getProjectGallery(projectId);
  const existingUrls = new Set(existing.map((image) => image.image_url));
  const duplicates = unique.filter((image) => existingUrls.has(image.image_url));
  if (duplicates.length) throw new Error("One or more selected images are already in this project gallery.");
  const { data, error } = await getSupabaseClient().from("project_images").insert(unique.map((image, index) => ({ ...image, project_id: projectId, sort_order: existing.length + index }))).select("*");
  if (error) throw error;
  return data;
}
export const addProjectImage = (projectId: string, image: ProjectGalleryImageInput) => addProjectImages(projectId, [image]);
export async function updateProjectGalleryImage(id: string, input: Pick<ProjectGalleryImageInput, "alt_text" | "caption">): Promise<ProjectGalleryImage> {
  const { data, error } = await getSupabaseClient().from("project_images").update(input).eq("id", id).select("*").single(); if (error) throw error; return data;
}
export async function reorderProjectGallery(projectId: string, imageIds: string[]): Promise<void> {
  const { error } = await getSupabaseClient().rpc("set_project_image_order", { target_project_id: projectId, ordered_image_ids: imageIds }); if (error) throw error;
}
export async function removeProjectGalleryImage(id: string): Promise<void> { const { error } = await getSupabaseClient().from("project_images").delete().eq("id", id); if (error) throw error; }

/** Lists only project-media objects for the authenticated project editor. */
export async function getProjectMedia(): Promise<MediaAsset[]> {
  const client = getSupabaseClient();
  const { data: folders, error } = await client.storage.from("project-media").list("projects", { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  const assets: MediaAsset[] = [];
  for (const folder of folders) {
    if (folder.id) continue;
    const { data: files, error: filesError } = await client.storage.from("project-media").list(`projects/${folder.name}`, { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
    if (filesError) throw filesError;
    for (const file of files) {
      if (!file.id) continue;
      const path = `projects/${folder.name}/${file.name}`;
      assets.push({ name: file.name, path, publicUrl: client.storage.from("project-media").getPublicUrl(path).data.publicUrl, createdAt: file.created_at, size: file.metadata?.size, contentType: file.metadata?.mimetype });
    }
  }
  return assets;
}

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
  if (!isSupabaseConfigured) return staticProjects.find((project) => project.slug === slug) ?? null;

  try {
    const cmsRows = await fetchPublishedProjectRows();
    // Published CMS is the entire public source as soon as it has any rows.
    if (cmsRows.length) return cmsRows.map(toProject).find((project) => project.slug === slug) ?? null;
  } catch (error) {
    console.warn("Unable to load published project detail; attempting approved static fallback.", error);
  }

  if (!staticProjects.some((project) => project.slug === slug)) return null;

  // A browser RLS query cannot distinguish a missing row from an unpublished
  // row. The server-only availability endpoint returns only a block signal, not
  // draft data, so a static record can never bypass an unpublished CMS slug.
  try {
    const response = await fetch(`/api/projects/${encodeURIComponent(slug)}/availability`);
    if (!response.ok || (await response.json() as { blocked?: boolean }).blocked) return null;
  } catch {
    // Fail closed for a configured CMS: without the server-only guard we cannot
    // prove that a legacy slug is not a draft or archived CMS record.
    return null;
  }
  return staticProjects.find((project) => project.slug === slug) ?? null;
}

export async function getRelatedProjects(slug: string, limit = 3): Promise<Project[]> {
  const current = await getProjectBySlug(slug);
  if (!current) return [];
  const rest = (await getPublishedProjects()).filter((p) => p.slug !== slug);
  const sameCategory = rest.filter((p) => p.category === current.category);
  return [...sameCategory, ...rest.filter((p) => p.category !== current.category)].slice(0, limit);
}
