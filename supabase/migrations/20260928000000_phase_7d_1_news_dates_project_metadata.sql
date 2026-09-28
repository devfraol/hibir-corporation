-- Phase 7D.1: retain explicit news publication dates and optional project metadata.
-- news_articles.published_at already represents the publication timestamp and is retained.
alter table public.projects
  add column if not exists length text,
  add column if not exists pavement_type text;
