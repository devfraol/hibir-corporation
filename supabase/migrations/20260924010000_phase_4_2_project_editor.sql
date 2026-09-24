-- Phase 4.2: additive, optional project SEO metadata.
alter table public.projects add column if not exists seo_title text;
alter table public.projects add column if not exists seo_description text;

-- Project cover images are uploaded by the same authenticated CMS roles as News.
create policy "administrators can upload project media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-media' and name like 'projects/%'
    and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can update project media"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-media' and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]))
  with check (bucket_id = 'project-media' and name like 'projects/%'
    and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));
