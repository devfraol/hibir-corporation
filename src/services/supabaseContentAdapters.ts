import { getSupabaseClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type NewsRow = Database["public"]["Tables"]["news_articles"]["Row"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

/**
 * Phase 1 read adapters. They are deliberately not wired into the active
 * static services yet, so production can move one content type at a time.
 */
export const fetchPublishedNewsRows = async (): Promise<NewsRow[]> => {
  const { data, error } = await getSupabaseClient()
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchPublishedProjectRows = async (): Promise<ProjectRow[]> => {
  const { data, error } = await getSupabaseClient()
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
