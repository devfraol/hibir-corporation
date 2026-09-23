type VercelRequest = { method?: string };
type VercelResponse = { status: (code: number) => VercelResponse; end: () => void; send: (body: string) => void; setHeader: (name: string, value: string) => void };
import { createClient } from "@supabase/supabase-js";

const siteUrl = process.env.SITE_URL || "https://hibir-visions.lovable.app";
const staticPaths = ["/", "/about", "/services", "/projects", "/resources", "/safety", "/organization", "/news", "/contact"];
const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character] ?? character);

/** Server-only dynamic sitemap. SUPABASE_SERVICE_ROLE_KEY must be configured only in Vercel. */
export default async function sitemap(request: VercelRequest, response: VercelResponse) {
  if (request.method && request.method !== "GET") return response.status(405).end();
  const urls = new Map(staticPaths.map((path) => [path, undefined]));
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceRoleKey) {
    const client = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await client.from("news_articles").select("slug, updated_at, published_at").eq("status", "published");
    if (error) console.error("Unable to load published news for sitemap", error.message);
    else data.forEach((article) => urls.set(`/news/${article.slug}`, article.updated_at || article.published_at));
  } else console.warn("Dynamic sitemap is serving static routes because server-only Supabase credentials are not configured.");
  const body = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...[...urls.entries()].map(([path, lastmod]) => `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod.slice(0, 10))}</lastmod>` : ""}</url>`), "</urlset>"].join("\n");
  response.setHeader("Content-Type", "application/xml; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return response.status(200).send(body);
}
