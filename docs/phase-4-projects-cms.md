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
