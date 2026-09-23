-- Phase 3.4: role-gated deletion for unreferenced news-media objects.
-- The application checks persisted article references before calling remove().
create policy "administrators can delete news media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'news-media'
    and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[])
  );
