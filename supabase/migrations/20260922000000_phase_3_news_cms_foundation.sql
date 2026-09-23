-- Phase 3.1: additive news CMS fields and authenticated administrator writes.
-- Existing records and public published-news access remain unchanged.
alter table public.news_articles
  add column if not exists seo_title text,
  add column if not exists seo_description text;

-- RLS is the authorization boundary. The browser only uses the authenticated
-- session; these policies do not grant any access to anon visitors.
create policy "administrators can read all news"
on public.news_articles for select to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can create news"
on public.news_articles for insert to authenticated
with check (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can update news"
on public.news_articles for update to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]))
with check (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can delete news"
on public.news_articles for delete to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));
