/**
 * Database types for the Phase 1 Supabase schema.
 * Regenerate from the Supabase CLI after the schema changes in a deployed project.
 */
export type AdminRole = "super_admin" | "admin" | "editor";
export type ArticleStatus = "draft" | "published" | "archived";
export type ProjectPublicationStatus = "draft" | "published" | "archived";

type Row<T> = T;
type Insert<T> = Partial<T>;
type Update<T> = Partial<T>;

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: Row<{ id: string; user_id: string; full_name: string | null; email: string; role: AdminRole; avatar_url: string | null; active: boolean; created_at: string; updated_at: string }>;
        Insert: Insert<{ id: string; user_id: string; full_name?: string | null; email: string; role?: AdminRole; avatar_url?: string | null; active?: boolean; created_at?: string; updated_at?: string }>;
        Update: Update<{ full_name: string | null; email: string; role: AdminRole; avatar_url: string | null; active: boolean; updated_at: string }>;
        Relationships: [];
      };
      news_articles: {
        Row: Row<{ id: string; title: string; slug: string; excerpt: string | null; content: unknown; category: string | null; featured: boolean; status: ArticleStatus; cover_image: string | null; author_id: string | null; published_at: string | null; created_at: string; updated_at: string }>;
        Insert: Insert<{ id: string; title: string; slug: string; excerpt?: string | null; content?: unknown; category?: string | null; featured?: boolean; status?: ArticleStatus; cover_image?: string | null; author_id?: string | null; published_at?: string | null; created_at?: string; updated_at?: string }>;
        Update: Update<{ title: string; slug: string; excerpt: string | null; content: unknown; category: string | null; featured: boolean; status: ArticleStatus; cover_image: string | null; author_id: string | null; published_at: string | null; updated_at: string }>;
        Relationships: [];
      };
      projects: {
        Row: Row<{ id: string; title: string; slug: string; description: string | null; location: string | null; category: string | null; status: ProjectPublicationStatus; client: string | null; consultant: string | null; contract_date: string | null; completion_date: string | null; featured: boolean; cover_image: string | null; created_at: string; updated_at: string }>;
        Insert: Insert<{ id: string; title: string; slug: string; description?: string | null; location?: string | null; category?: string | null; status?: ProjectPublicationStatus; client?: string | null; consultant?: string | null; contract_date?: string | null; completion_date?: string | null; featured?: boolean; cover_image?: string | null; created_at?: string; updated_at?: string }>;
        Update: Update<{ title: string; slug: string; description: string | null; location: string |null; category: string | null; status: ProjectPublicationStatus; client: string | null; consultant: string | null; contract_date: string | null; completion_date: string | null; featured: boolean; cover_image: string | null; updated_at: string }>;
        Relationships: [];
      };
      project_images: {
        Row: Row<{ id: string; project_id: string; image_url: string; alt_text: string | null; caption: string | null; sort_order: number; created_at: string }>;
        Insert: Insert<{ id: string; project_id: string; image_url: string; alt_text?: string | null; caption?: string | null; sort_order?: number; created_at?: string }>;
        Update: Update<{ image_url: string; alt_text: string | null; caption: string | null; sort_order: number }>;
        Relationships: [];
      };
      media: {
        Row: Row<{ id: string; file_name: string; file_url: string; file_type: string; storage_path: string; alt_text: string | null; caption: string | null; uploaded_by: string | null; created_at: string }>;
        Insert: Insert<{ id: string; file_name: string; file_url: string; file_type: string; storage_path: string; alt_text?: string | null; caption?: string | null; uploaded_by?: string | null; created_at?: string }>;
        Update: Update<{ file_name: string; file_url: string; file_type: string; storage_path: string; alt_text: string | null; caption: string | null }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { admin_role: AdminRole; article_status: ArticleStatus; project_publication_status: ProjectPublicationStatus };
    CompositeTypes: Record<string, never>;
  };
}
