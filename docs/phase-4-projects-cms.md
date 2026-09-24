# Phase 4.3 — Project Gallery and Media Management

## Gallery architecture and workflow

`project_images` remains the gallery relationship: `id`, `project_id`, `image_url`, optional `alt_text` and `caption`, `sort_order`, and `created_at`. Images are URLs to public objects in `project-media`, rather than records in a generic media table. `projectService.ts` is the sole project data-access layer and provides load, add-one/add-many, metadata update, complete-order save, and relationship removal operations.

The editor stages gallery changes alongside project fields. Its Save/Publish actions persist the project then gallery relationships, metadata, and a complete order. A gallery persistence error is reported explicitly rather than being presented as a complete save. Existing image URLs are blocked in the client service and by the additive `(project_id, image_url)` unique index. Removal deletes only `project_images`; it never deletes a storage object or media library item.

The shared MediaPicker now has an optional multi-select mode. News continues to use its default single-select `news-media` callbacks; Projects passes the existing `project-media` callbacks. JPEG, PNG, and WebP validation and the 8 MB limit remain shared client-side validation. Storage policies remain admin-only under `has_admin_role()`.

The public published-project adapter already reads ordered gallery rows through public RLS (only rows whose project is published). It maps saved alt text first, then the project title. The static `src/data/projects.ts` catalogue remains the fallback when Supabase is unavailable or has no published records. The authenticated preview uses the same stored gallery even before publication.

Order changes have keyboard-accessible Move up/Move down controls (rather than drag-only UI). Gallery cards provide labelled remove, alt-text, and optional caption controls. Public gallery images lazy-load and retain the existing accessible viewer. Known limitation: files remain in public project-media after relationships are removed; reference-counted storage cleanup is deliberately deferred to a later phase.

# Phase 4.2 — Premium Project Editor

## Editor and field mapping

The protected editor uses focused Information, Status, Timeline, Cover Image, Description, SEO, and Publishing sections. `projects.status` is the independent publication control (`draft`, `published`, `archived`); `projects.project_status` retains the execution state (`Ongoing`, `Completed`, `Suspended`, `Terminated`). Categories remain the existing approved category set. Client and consultant remain optional text fields, and contract/completion dates map directly to their existing date columns.

Draft saves are intentionally permissive. Publishing requires title, URL-safe slug, description, category, and location. Client and cover image are deliberately optional because the public renderer already handles missing values and approved project records may not have them. Completion cannot precede contract date; completion is optional for ongoing projects. A manually edited slug is not overwritten and an authenticated uniqueness check runs before saving.

## SEO, cover media, and preview

The additive Phase 4.2 migration adds optional `seo_title` and `seo_description`. Public detail SEO uses those values when present, otherwise title and description; the cover image is the OG image and the existing site default remains the fallback. The editor displays an informational search-result preview.

Cover images use the existing shared `MediaPicker`, parameterized with project-only list/upload callbacks, so News remains on `news-media` and Projects uses only `project-media`. JPEG, PNG, and WebP use the shared 8 MB limit. Replacing/removing a cover clears only `projects.cover_image`; objects are intentionally retained until Phase 4.3 can implement reference-safe cleanup. Normal project updates never touch `project_images`.

`/admin/projects/:id/preview` is inside the existing protected admin route, reads an authenticated admin record, is explicitly labelled **PREVIEW — NOT PUBLISHED**, and sets `noindex`. It does not publish or alter status. Public project reads still query `status = 'published'` only.

## Transitional public data and next phase

Public reads remain Supabase published projects first, with `src/data/projects.ts` retained as the transitional fallback when Supabase is empty/unavailable. Draft and archived CMS rows never reach that fallback path. RLS remains the database authorization boundary via `has_admin_role()`; no service-role key or client role trust is introduced.

Apply `20260924010000_phase_4_2_project_editor.sql` through the normal Supabase migration workflow, then regenerate `src/types/database.ts` with the Supabase CLI in the deployment environment. Phase 4.3 should build gallery ordering/alt text/captions and reference-safe storage cleanup, without deleting the existing static catalogue until approved migration is complete.
