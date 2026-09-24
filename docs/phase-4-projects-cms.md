# Phase 4.1 — Projects CMS foundation

## Model and flow

`projects.status` is the publication status (`draft`, `published`, or `archived`) and exclusively controls public visibility. The additive `projects.project_status` enum independently records execution lifecycle (`Ongoing`, `Completed`, `Suspended`, `Terminated`). Categories remain the established Asphalt Road, Gravel Road, Bridge, Urban Infrastructure, and Cobblestone values.

Public reads flow through `projectService` → published Supabase rows → public pages. Until approved Hibir records are migrated, an empty or unavailable Supabase response explicitly falls back to `src/data/projects.ts`; that source is retained unchanged. CMS records never fabricate contract value or contractor role: those remain static-fallback-only values and are omitted in the public card where unavailable.

Admin routes are `/admin/projects`, `/admin/projects/new`, and `/admin/projects/:id/edit`, inside the existing protected admin layout. The same `projectService` provides admin list, CRUD, draft, publish, and archive operations. RLS is the authorization boundary.

## Images and media

`project_images` remains a child relationship and is returned by both public and admin service reads. The database cascade removes image **rows** with a deleted project. Storage objects in the public `project-media` bucket are intentionally not deleted automatically because safe reference tracking has not been implemented. Phase 4.1 supports a cover-image URL; gallery and upload/library management are Phase 4.3 work.

## Security and migration

The Phase 4.1 migration adds execution status and grants `super_admin`, `admin`, and `editor` project read/write access via `has_admin_role()`. Existing public policies still allow only published projects and images belonging to published projects. No public write policy or browser service-role key is added.

Apply the migration with the normal Supabase deployment workflow, then regenerate `src/types/database.ts` using the repository's Supabase CLI workflow before deployment. This repository type update mirrors that expected generated schema because deployment credentials are not present locally.

## Limitations and Phase 4.2

SEO title/description, canonical overrides, and OG-image fields are not in the project schema and should be introduced only in an approved additive Phase 4.2 migration. Contract values, contractor role, and start date also need explicit schema decisions. Phase 4.2 should approve/import the static Hibir dataset, verify fields and slugs, then remove the fallback only after production verification. Phase 4.3 should add safe project-media uploads and gallery editing.
