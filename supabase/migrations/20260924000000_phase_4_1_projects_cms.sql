-- Phase 4.1: Projects CMS. Add delivery lifecycle independently of publication.
create type public.project_execution_status as enum ('Ongoing', 'Completed', 'Suspended', 'Terminated');

alter table public.projects
  add column project_status public.project_execution_status;

create index projects_project_status_idx on public.projects (project_status);

-- RLS remains enabled from Phase 1. Public SELECT policies continue to expose only
-- published rows; these policies grant CMS writes only to trusted admin roles.
create policy "administrators can read projects"
on public.projects for select to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can insert projects"
on public.projects for insert to authenticated
with check (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can update projects"
on public.projects for update to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]))
with check (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can delete projects"
on public.projects for delete to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

create policy "administrators can read project images"
on public.project_images for select to authenticated
using (public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));
