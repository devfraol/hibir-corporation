# Phase 1 status: Supabase backend foundation

## What already existed

- The repository already contained the Supabase JavaScript dependency, a typed browser-client factory, database definitions, read adapters, a Phase 1 SQL migration, environment template, and backend architecture documentation.
- News and projects were served by asynchronous static-data services. The sitemap generator consumes the same local datasets, and the contact form only shows a client-side success toast.

## What changed

- Standardized the browser configuration on `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; no anonymous-key alias, service-role key, password, or fallback credential is committed.
- Updated the client factory to cache one typed browser client and exposed a configuration check so static previews continue to work without local Supabase variables.
- Connected the existing news and project service APIs to the existing published-only Supabase read adapters. When configuration is absent, a request fails, or the remote tables contain no published records, the services intentionally use the retained static datasets.
- Extended the project adapter to retrieve ordered project images and attach them to their published project records.
- Updated backend architecture documentation for the active adapter/fallback flow and the deferred sitemap/contact work.

## Database schema prepared locally

The local migration at `supabase/migrations/20260910000000_phase_1_backend_foundation.sql` prepares these UUID-based tables:

| Table | Key implementation details |
| --- | --- |
| `admin_profiles` | Unique `auth.users` identity and email, active role (`super_admin`, `admin`, or `editor`), and update timestamp. |
| `news_articles` | Unique slug, publication status (`draft`, `published`, or `archived`), JSON content, author reference, publication date, and timestamps. |
| `projects` | Unique slug, publication status, project metadata, dates, cover image, and timestamps. |
| `project_images` | Cascading project reference, URL/accessibility metadata, and non-negative display order. |
| `media` | Unique storage path, public-asset metadata, and optional uploader reference. |

It also provides lookup indexes, `updated_at` triggers, and a security-definer role-check helper for later trusted admin-policy work.

## RLS and storage configuration prepared locally

- RLS is enabled on all five application tables.
- Anonymous and authenticated visitors can select only published news, published projects, and images belonging to published projects. There are no public policies for `admin_profiles` or `media`, and no application-table write policies.
- The migration prepares `news-media`, `project-media`, and `company-media` as public website-asset buckets. Public reads are restricted to those bucket IDs. There are deliberately no browser storage write, update, or delete policies.
- These are **local migration definitions only**. The Supabase CLI is not installed/authenticated in this environment, so this work has not been applied to, or inspected on, the owner’s remote project.

## Supabase client and service layer

The sole browser client is `src/lib/supabase.ts`; it is typed with `src/types/database.ts` and initialized from Vite environment values. `newsService.ts` and `projectService.ts` retain their existing public APIs while selecting published Supabase content when it is available. Their static datasets remain source/fallback data until approved content import is complete.

The current public project domain model includes delivery status and contract value, whereas the Phase 1 database `projects.status` is intentionally a publication status. Consequently, imported projects need a reviewed Phase 2 domain/schema decision before those UI-only fields can be fully dynamic.

## Environment variables required

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-publishable-key
```

Put these only in an ignored local `.env`/`.env.local` file or deployment environment. `.gitignore` ignores `.env`, `.env.*`, and `*.local`, while retaining `.env.example`.

## Intentionally not implemented

- Authentication, administrator provisioning UI, dashboard/routes, role management, News/Projects CMS, media manager, or company CMS.
- Content import, storage-object upload tooling, contact-form persistence, and contact-submission review.
- Sitemap redesign or server architecture. The static build-time sitemap remains compatible with the static fallback. Dynamic entries must later come from a trusted build/server process—not browser credentials.
- Any visual, route, navigation, animation, or frontend redesign work.

## Validation results

- `npm run lint` could not start because the installed dependency tree is incomplete (`@eslint/js` is unavailable).
- `npm run build` ran the existing Bun sitemap generation successfully, then could not find the local `vite` executable.
- `npm test` could not find the local `vitest` executable.
- Both `npm ci` and `bun install --frozen-lockfile` are blocked because the environment receives HTTP 403 for `@supabase/supabase-js`; `npm ci` also reports that the existing `package-lock.json` does not contain the resolved Supabase dependency tree. No source validation errors were reported before those environment/dependency failures.

The build invokes the existing Bun sitemap script through `prebuild`; Bun is available in this environment.

## Remaining risks and manual steps

1. Apply the local migration to the owner’s reviewed Supabase project using authenticated Supabase tooling; do not assume tables or buckets exist remotely yet.
2. Inspect the deployed schema and regenerate `src/types/database.ts` from that project.
3. Provision the first administrator through trusted server-side tooling, never from the browser client.
4. Import and validate approved content and public storage assets. Test RLS as anonymous and authenticated non-admin users before turning off static fallback.
5. Decide how the domain’s project delivery status and contract value will be modeled without conflating them with publication status.

## Recommended Phase 2

Implement trusted initial-admin provisioning and narrowly scoped role-based write policies, then build CMS capabilities incrementally behind validation and tests. Add a trusted dynamic sitemap data source and contact persistence only in their respective scoped phases.
