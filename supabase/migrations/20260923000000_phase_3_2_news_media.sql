-- Phase 3.2: authenticated newsroom media uploads and server-side author assignment.
-- news-media remains public for published website images; only newsroom roles may write.
create policy "administrators can upload news media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'news-media'
    and name like 'news/%'
    and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[])
  );

create policy "administrators can update news media"
  on storage.objects for update to authenticated
  using (bucket_id = 'news-media' and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]))
  with check (bucket_id = 'news-media' and name like 'news/%' and public.has_admin_role(array['super_admin', 'admin', 'editor']::public.admin_role[]));

-- Deliberately no DELETE storage policy: replacing/removing an article image never deletes an object.
create or replace function public.assign_news_author()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.author_id is null then
    select id into new.author_id from public.admin_profiles where user_id = auth.uid() and active limit 1;
  end if;
  return new;
end;
$$;

create trigger news_articles_assign_author
  before insert on public.news_articles
  for each row execute function public.assign_news_author();
