import { getSupabaseClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type NewsRow = Database["public"]["Tables"]["news_articles"]["Row"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImageRow = Database["public"]["Tables"]["project_images"]["Row"];

export interface PublishedProjectRow extends ProjectRow {
  images: ProjectImageRow[];
}

/** Phase 1 read adapters for public, published website content only. */
export const fetchPublishedNewsRows = async (): Promise<NewsRow[]> => {
  const { data, error } = await getSupabaseClient()
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchPublishedProjectRows = async (): Promise<PublishedProjectRow[]> => {
  const supabase = getSupabaseClient();
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (projectsError) throw projectsError;

  if (!projects.length) return [];
  const { data: images, error: imagesError } = await supabase
    .from("project_images")
    .select("*")
    .in("project_id", projects.map((project) => project.id))
    .order("sort_order", { ascending: true });

  if (imagesError) throw imagesError;

  const imagesByProject = new Map<string, ProjectImageRow[]>();
  for (const image of images) {
    const current = imagesByProject.get(image.project_id) ?? [];
    current.push(image);
    imagesByProject.set(image.project_id, current);
  }

  return projects.map((project) => ({
    ...project,
    images: imagesByProject.get(project.id) ?? [],
  }));
};
