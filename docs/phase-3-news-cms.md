# Phase 3.1 — News CMS foundation

## Architecture and data flow

The existing `src/services/newsService.ts` remains the single news data-access layer. Public functions query only published rows through the existing published-content adapter and retain the static-news fallback when Supabase has no published records. CMS functions (`getAdminNews`, create/update/delete, publish/archive, and draft save) use the existing browser Supabase client and authenticated session directly; they do not contain credentials or make authorization decisions.

The frontend maps `news_articles` to the canonical `NewsArticle` model. The additive migration adds `seo_title` and `seo_description`; all other supported fields already existed: `id`, `title`, `slug`, `excerpt`, JSON `content`, `category`, `cover_image`, `author_id`, `published_at`, `status`, `featured`, `created_at`, and `updated_at`.

## Routes

All routes are nested under the existing `ProtectedAdminRoute` and `AdminLayout`:

- `/admin/news` — filterable responsive news list.
- `/admin/news/new` — create workflow.
- `/admin/news/:id/edit` — edit workflow.

`/news`, `/news/:slug`, `/news/category/:slug`, and the homepage continue to use public published-only service functions.

## Roles and RLS

The existing `super_admin`, `admin`, and `editor` roles retain their `manage_content` capability. The UI uses that helper solely to show management controls. The migration adds authenticated administrator RLS policies for full newsroom management; public readers still receive published records only. There is no service-role key, client-side role mutation, public write policy, or draft access for anonymous users.

## Media and SEO

Cover images are represented by `cover_image` URLs. Deleting an article deliberately **does not** delete its storage object because the current media architecture has no safe ownership/cleanup workflow. SEO fields are persisted for later integration with the existing SEO component; canonical and Open Graph rules are not duplicated in this phase.

## Known limitations and Phase 3.2

The editor accepts the existing safe JSON content-block model rather than adding a rich-text editor. It also does not upload media. Phase 3.2 should add controlled media selection/upload policies and a block editor, then connect persisted SEO metadata to the existing public SEO architecture.
