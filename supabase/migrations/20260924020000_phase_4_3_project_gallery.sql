-- Phase 4.3: keep project_images as the gallery relationship and prevent duplicate URLs.
create unique index if not exists project_images_project_url_unique on public.project_images (project_id, image_url);

create policy "administrators can insert project images" on public.project_images for insert to authenticated
with check (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));
create policy "administrators can update project images" on public.project_images for update to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]))
with check (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));
create policy "administrators can delete project images" on public.project_images for delete to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

-- A single transaction makes a complete reordered list stable and avoids partial ordering.
create or replace function public.set_project_image_order(target_project_id uuid, ordered_image_ids uuid[])
returns void language plpgsql security invoker set search_path = public as $$
begin
  if not public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]) then raise exception 'not authorized'; end if;
  if (select count(*) from public.project_images where project_id = target_project_id and id = any(ordered_image_ids)) <> coalesce(array_length(ordered_image_ids, 1), 0) then raise exception 'gallery order must contain only this project''s images'; end if;
  update public.project_images image set sort_order = ordered.position - 1
  from unnest(ordered_image_ids) with ordinality as ordered(id, position)
  where image.project_id = target_project_id and image.id = ordered.id;
end;
$$;
revoke all on function public.set_project_image_order(uuid, uuid[]) from public;
grant execute on function public.set_project_image_order(uuid, uuid[]) to authenticated;
