import { createClient } from "@supabase/supabase-js";

type VercelRequest = { method?: string; query?: { slug?: string | string[] } };
type VercelResponse = { status: (code: number) => VercelResponse; json: (body: unknown) => void; end: () => void; setHeader: (name: string, value: string) => void };

/**
 * Server-only guard for the Phase 4.4 static fallback. It intentionally returns
 * no project data: a matching non-published CMS slug merely blocks a same-slug
 * legacy card from being rendered by the browser.
 */
export default async function availability(request: VercelRequest, response: VercelResponse) {
  if (request.method && request.method !== "GET") return response.status(405).end();
  const slug = Array.isArray(request.query?.slug) ? request.query?.slug[0] : request.query?.slug;
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return response.status(400).json({ blocked: false });
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return response.status(503).json({ blocked: false });
  const client = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.from("projects").select("status").eq("slug", slug).maybeSingle();
  if (error) return response.status(503).json({ blocked: false });
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ blocked: Boolean(data && data.status !== "published") });
}
