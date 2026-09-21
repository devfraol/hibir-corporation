-- Phase 2: browser clients may read only their own administrator profile.
-- No INSERT, UPDATE, or DELETE policy is added: provisioning and role changes
-- remain trusted, server-side operations.
create policy "administrators can read their own profile"
on public.admin_profiles
for select
to authenticated
using (user_id = auth.uid());
