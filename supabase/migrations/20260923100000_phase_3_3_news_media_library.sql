-- Phase 3.3: administrators may inspect existing news-media objects; writes stay role-gated.
-- The public bucket remains read-only to visitors. No delete policy is added.
create policy "administrators can list news media"
on storage.objects for select to authenticated
using (
  bucket_id = 'news-media'
  and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[])
);
