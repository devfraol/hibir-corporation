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

# Phase 3.2 — Premium editor and media management

## Editor architecture and blocks

`AdminNewsEditor` retains the JSON `content` column and edits typed blocks rather than raw JSON. Existing paragraph, heading, list, and quote blocks remain compatible. New blocks are paragraph, heading, image, quote, ordered/unordered list, and link; newly created blocks receive a stable `id` while legacy blocks are normalized at edit time. Blocks can be moved, duplicated, or removed without drag-and-drop.

## Media upload strategy

The existing public `news-media` bucket is used exclusively. New records are saved as drafts before a cover or inline image can be uploaded; subsequent objects use `news/{article-id}/{uuid}.{extension}`. This gives every object a collision-resistant article path and avoids temporary identifiers or orphan draft rows. The browser uses the existing authenticated Supabase client only. Removing/replacing an image clears the article reference but deliberately never deletes a storage object.

Migration `20260923000000_phase_3_2_news_media.sql` adds newsroom-role INSERT/UPDATE policies for those paths and deliberately does **not** add DELETE permission. It also assigns `author_id` from the server-side authenticated user profile when an article is inserted, so the editor does not accept an arbitrary author identity.

## Workflow and validation

Save Draft permits incomplete editorial data. Publish requires a title, safe slug, category, excerpt, at least one populated content block, and a cover image. Archive changes only the publication status. The existing public service still asks only for published articles, so draft/archived records are not exposed. Image selection accepts JPEG, PNG, and WebP up to 8 MB. SEO title and description are optional but capped at 70 and 170 characters when supplied.

## SEO and preview

The editor persists the Phase 3.1 SEO fields and provides a visual search-result preview. The public news page uses a non-empty SEO title/description when supplied and otherwise falls back to the existing title and excerpt while retaining the shared canonical, Open Graph, Twitter, and structured-data implementation. The editor's preview renders the existing `NewsDetail` component from local editor state and never calls a publishing API.

## Known limitations and Phase 3.3

Upload progress is not displayed because the current Supabase browser upload API does not expose reliable progress callbacks. Public bucket objects cannot be automatically cleaned up until safe object ownership/reference tracking is introduced. Phase 3.3 should add a media library with ownership metadata, usage references, and carefully authorized cleanup.
