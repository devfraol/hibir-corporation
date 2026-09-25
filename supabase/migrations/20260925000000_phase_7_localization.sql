-- Phase 7: additive bilingual fields. English columns remain the canonical
-- legacy representation; nullable Amharic fields are filled only with approved copy.
alter table public.news_articles
  add column if not exists title_am text,
  add column if not exists excerpt_am text,
  add column if not exists content_am jsonb,
  add column if not exists seo_title_am text,
  add column if not exists seo_description_am text;

alter table public.projects
  add column if not exists title_am text,
  add column if not exists description_am text,
  add column if not exists seo_title_am text,
  add column if not exists seo_description_am text;

-- These partial indexes support Amharic listing queries without changing RLS,
-- IDs, publication status, or any existing English content.
create index if not exists news_articles_amharic_published_idx
  on public.news_articles (published_at desc) where status = 'published' and nullif(trim(title_am), '') is not null;
create index if not exists projects_amharic_published_idx
  on public.projects (created_at desc) where status = 'published' and nullif(trim(title_am), '') is not null;
