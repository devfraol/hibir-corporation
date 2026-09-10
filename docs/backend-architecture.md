# Backend architecture

## Current application

The React/Vite application currently reads newsroom records from `src/data/news.ts` through `src/services/newsService.ts`, and project records from `src/data/projects.ts` through `src/services/projectService.ts`. Both services are asynchronous already. Static company and service data remains local. React Query is configured at the application root, routes remain client-side, SEO uses React Helmet Async, and the sitemap script reads the same static data before development and production builds. The contact form is currently a client-only success toast; it does not send data to a backend.

## Phase 1 Supabase foundation

`src/lib/supabase.ts` creates a typed browser client on demand from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. It deliberately throws if the values are absent rather than embedding a fallback URL or key. `src/services/supabaseContentAdapters.ts` provides unused read adapters for published news and projects; the existing static services remain active until a later migration is approved.

The migration is `supabase/migrations/20260910000000_phase_1_backend_foundation.sql`. `src/types/database.ts` is the application database contract and should be regenerated from the Supabase CLI after deployed-schema changes.

## Tables and relationships

| Table | Purpose | Relationships |
| --- | --- | --- |
| `admin_profiles` | Administrator identity, role, and activation state. | `user_id` → `auth.users.id` (unique). |
| `news_articles` | News CMS records. | `author_id` → `admin_profiles.id`. |
| `projects` | Public-project CMS records. | Has many `project_images`. |
| `project_images` | Ordered images for a project. | `project_id` → `projects.id` (cascade delete). |
| `media` | Metadata for storage objects. | `uploaded_by` → `admin_profiles.id`. |

All tables use UUID primary keys and timestamps. Article and project `slug` values are unique, and the migration supplies the requested lookup indexes. The project `status` is a publication state (`draft`, `published`, or `archived`) so the public policy is explicit and cannot accidentally expose drafts.

## RLS strategy

RLS is enabled on every application table. Anonymous and authenticated visitors may select only published news, published projects, and images belonging to published projects. `admin_profiles` and `media` have no public read policy.

No write policy is included in Phase 1: clients cannot create, edit, or delete content; upload, alter, or delete media; create profiles; or alter roles. A security-definer `has_admin_role` helper safely checks a caller's active role for a future controlled admin policy without allowing self-promotion. Phase 2 should add narrowly scoped policies and a trusted provisioning path for the first administrator (for example, server-side tooling using the service role, never the browser).

## Storage strategy

`news-media`, `project-media`, and `company-media` are public buckets intended only for approved public website assets. Their object read policy is restricted to those bucket IDs; no browser write policy exists. Private administrative documents must use a separate private bucket with explicit authenticated access rules, rather than being uploaded into these public buckets.

## Environment variables

Copy `.env.example` locally and supply:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Only the browser-safe anonymous key belongs in Vite variables. Service-role credentials must never be exposed to the browser or committed. `.env`, `.env.local`, and related local variants are ignored by Git.

## Migration strategy and intentional deferrals

Apply the migration to an empty or reviewed Supabase project first, provision administrators through trusted server-side tooling, then add validated content migration and backend-to-domain mappers. Static data, current routes, SEO, animations, visual design, sitemap generation, login UI, admin dashboard, CMS workflows, media migration, and contact-form delivery are intentionally unchanged in this phase.
