-- Hibir Corporation: Phase 1 backend foundation. No existing static content is migrated here.

create extension if not exists "pgcrypto";

create type public.admin_role as enum ('super_admin', 'admin', 'editor');
create type public.article_status as enum ('draft', 'published', 'archived');
create type public.project_publication_status as enum ('draft', 'published', 'archived');

create table public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  email text not null unique,
  role public.admin_role not null default 'editor',
  avatar_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '[]'::jsonb,
  category text,
  featured boolean not null default false,
  status public.article_status not null default 'draft',
  cover_image text,
  author_id uuid references public.admin_profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_articles_have_date check (status <> 'published' or published_at is not null)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  location text,
  category text,
  status public.project_publication_status not null default 'draft',
  client text,
  consultant text,
  contract_date date,
  completion_date date,
  featured boolean not null default false,
  cover_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  caption text,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  file_type text not null,
  storage_path text not null unique,
  alt_text text,
  caption text,
  uploaded_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index news_articles_slug_idx on public.news_articles (slug);
create index news_articles_status_idx on public.news_articles (status);
create index news_articles_category_idx on public.news_articles (category);
create index news_articles_published_at_idx on public.news_articles (published_at desc);
create index projects_slug_idx on public.projects (slug);
create index projects_status_idx on public.projects (status);
create index projects_category_idx on public.projects (category);
create index projects_featured_idx on public.projects (featured) where featured;
create index project_images_project_id_idx on public.project_images (project_id);
create index media_created_at_idx on public.media (created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger admin_profiles_set_updated_at before update on public.admin_profiles for each row execute function public.set_updated_at();
create trigger news_articles_set_updated_at before update on public.news_articles for each row execute function public.set_updated_at();
create trigger projects_set_updated_at before update on public.projects for each row execute function public.set_updated_at();

-- SECURITY DEFINER prevents RLS recursion. The function only returns a boolean
-- about the caller and never grants profile creation or role changes.
create or replace function public.has_admin_role(required_roles public.admin_role[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_profiles
    where user_id = auth.uid() and active and role = any(required_roles)
  );
$$;
revoke all on function public.has_admin_role(public.admin_role[]) from public;
grant execute on function public.has_admin_role(public.admin_role[]) to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.news_articles enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.media enable row level security;

-- Public readers receive only records deliberately published for the website.
create policy "public can read published news" on public.news_articles for select to anon, authenticated using (status = 'published');
create policy "public can read published projects" on public.projects for select to anon, authenticated using (status = 'published');
create policy "public can read images of published projects" on public.project_images for select to anon, authenticated using (exists (select 1 from public.projects p where p.id = project_id and p.status = 'published'));

-- There are intentionally no client write policies in Phase 1. This means no
-- browser user can create profiles, self-promote, or alter public content.

-- Website image buckets are public by design. Do not place administrative or
-- private documents in these buckets; create a dedicated private bucket later.
insert into storage.buckets (id, name, public)
values ('news-media', 'news-media', true), ('project-media', 'project-media', true), ('company-media', 'company-media', true)
on conflict (id) do update set public = excluded.public;

create policy "public can read website media" on storage.objects for select to anon, authenticated using (bucket_id in ('news-media', 'project-media', 'company-media'));
-- No storage INSERT, UPDATE, or DELETE policies are created in Phase 1.
