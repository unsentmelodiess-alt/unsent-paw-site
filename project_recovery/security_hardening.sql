-- Security hardening for the moderated memory wall.
-- Pending uploads are private; only approved copies live in the public bucket.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tribute-photos', 'tribute-photos', false, 5242880, array['image/jpeg', 'image/png', 'image/webp']::text[])
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tribute-approved', 'tribute-approved', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']::text[])
on conflict (id) do update set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view tribute photos" on storage.objects;
drop policy if exists "Visitors can upload tribute photos" on storage.objects;
create policy "Visitors can upload pending tribute photos"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'tribute-photos' and name like 'pending/%');

drop policy if exists "Admins can manage tribute photos" on storage.objects;
create policy "Admins can manage pending tribute photos"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'tribute-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (bucket_id = 'tribute-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Anyone can view approved tribute photos" on storage.objects;
create policy "Anyone can view approved tribute photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'tribute-approved');

drop policy if exists "Admins can manage approved tribute photos" on storage.objects;
create policy "Admins can manage approved tribute photos"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'tribute-approved' and exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (bucket_id = 'tribute-approved' and exists (select 1 from public.admin_users where user_id = auth.uid()));

-- RLS is the primary control; remove unnecessary Data API table privileges.
revoke all on table public.admin_users from anon;
revoke all on table public.admin_users from authenticated;
grant select on table public.admin_users to authenticated;

-- Keep the admin helper safe from search_path manipulation.
alter function public.is_admin() set search_path = public;
