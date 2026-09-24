#!/usr/bin/env node
/**
 * One-time, idempotent Phase 4.5 importer. It is intentionally server-only:
 * SUPABASE_SERVICE_ROLE_KEY is read only from the executing environment.
 */
import { createClient } from "@supabase/supabase-js";
import { createServer } from "vite";
import { readFile } from "node:fs/promises";
import { resolve, basename } from "node:path";

const apply = process.argv.includes("--apply");
const dryRun = !apply || process.argv.includes("--dry-run");
const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
const missing = required.filter((name) => !process.env[name]);
const assetPaths = {
  "airport-project.jpg": "src/assets/airport-project.jpg", "bridge-construction.jpg": "src/assets/bridge-construction.jpg",
  "equipment-fleet.jpg": "src/assets/equipment-fleet.jpg", "hero-construction.jpg": "src/assets/hero-construction.jpg",
  "hero-highway.jpg": "src/assets/hero-highway.jpg", "capacity-machinery.jpg": "src/assets/capacity-machinery.jpg",
  "road-construction.jpg": "src/assets/road-construction.jpg", "safety-workers.jpg": "src/assets/safety-workers.jpg",
};
const supportedCategories = new Set(["Asphalt Road", "Gravel Road", "Bridge", "Urban Infrastructure", "Cobblestone"]);
const supportedStatuses = new Set(["Ongoing", "Completed", "Suspended", "Terminated"]);

const vite = await createServer({ appType: "custom", server: { middlewareMode: true } });
let projectCatalogue;
try { ({ projectCatalogue } = await vite.ssrLoadModule("/scripts/project-catalogue.ts")); } finally { await vite.close(); }
const duplicates = projectCatalogue.filter((project, index, projects) => projects.findIndex(({ slug }) => slug === project.slug) !== index).map(({ slug }) => slug);
const issues = projectCatalogue.flatMap((project) => {
  const projectIssues = [];
  if (!project.title || !project.slug || !project.description || !project.location) projectIssues.push(`${project.slug}: missing publishing field`);
  if (!supportedCategories.has(project.category)) projectIssues.push(`${project.slug}: unsupported category ${project.category}`);
  if (!supportedStatuses.has(project.status)) projectIssues.push(`${project.slug}: unsupported execution status ${project.status}`);
  if (project.contractDate && project.completionDate && project.completionDate < project.contractDate) projectIssues.push(`${project.slug}: completion precedes contract`);
  for (const image of project.gallery) if (!assetPaths[basename(image.url)]) projectIssues.push(`${project.slug}: unmapped image ${image.url}`);
  return projectIssues;
});
const report = { sourceProjects: projectCatalogue.length, valid: projectCatalogue.length - new Set(issues.map((issue) => issue.split(":")[0])).size, duplicateSlugs: duplicates, issues, images: Object.keys(assetPaths).length };
console.log("PROJECT MIGRATION REPORT"); console.log(JSON.stringify(report, null, 2));
if (duplicates.length || issues.length) process.exitCode = 1;
if (dryRun) { if (missing.length) console.log(`Database comparison skipped: missing ${missing.join(", ")}.`); else console.log("Dry run: source is valid; querying CMS without writing."); }
if (missing.length) { if (apply) throw new Error(`Cannot apply: missing ${missing.join(", ")}`); process.exit(); }
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const { data: existing, error: existingError } = await supabase.from("projects").select("*"); if (existingError) throw existingError;
const sourceSlugs = new Set(projectCatalogue.map(({ slug }) => slug));
console.log(JSON.stringify({ existingMatches: existing.filter(({ slug }) => sourceSlugs.has(slug)).length, unexpectedCmsRecords: existing.filter(({ slug }) => !sourceSlugs.has(slug)).map(({ slug }) => slug) }, null, 2));
if (dryRun || issues.length || duplicates.length) process.exit();
for (const project of projectCatalogue) {
  const match = existing.find(({ slug }) => slug === project.slug);
  if (match) { console.log(`SKIP ${project.slug}: existing CMS record is preserved for review.`); continue; }
  const uploaded = new Map();
  for (const image of project.gallery) {
    const name = basename(image.url); const path = `migration/phase-4-5/${name}`;
    if (!uploaded.has(name)) { const bytes = await readFile(resolve(assetPaths[name])); const { error } = await supabase.storage.from("project-media").upload(path, bytes, { contentType: "image/jpeg", upsert: true }); if (error) throw error; uploaded.set(name, supabase.storage.from("project-media").getPublicUrl(path).data.publicUrl); }
  }
  const coverUrl = uploaded.get(basename(project.featuredImage.url));
  const { data: inserted, error } = await supabase.from("projects").insert({ title: project.title, slug: project.slug, description: project.description, client: project.client, consultant: project.consultant ?? null, location: project.location, category: project.category, project_status: project.status, status: "published", featured: project.featured, cover_image: coverUrl, contract_date: project.contractDate ?? null, completion_date: project.completionDate ?? null, seo_title: project.seoTitle ?? null, seo_description: project.seoDescription ?? null }).select("id").single(); if (error) throw error;
  const gallery = project.gallery.map((image, sort_order) => ({ project_id: inserted.id, image_url: uploaded.get(basename(image.url)), alt_text: image.alt || null, caption: image.caption ?? null, sort_order }));
  const { error: galleryError } = await supabase.from("project_images").insert(gallery); if (galleryError) throw galleryError;
  console.log(`INSERT ${project.slug}`);
}
