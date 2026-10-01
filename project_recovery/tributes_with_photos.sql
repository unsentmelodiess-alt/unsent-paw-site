-- Moderated public memory wall with optional pet photos.
create table if not exists public.tributes (
  id uuid primary key default gen_random_uuid(),
  pet_name text not null check (char_length(pet_name) between 1 and 80),
  dates text check (dates is null or char_length(dates) <= 80),
  note text not null check (char_length(note) between 1 and 2000),
  photo_path text,
  consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  moderated_at timestamptz
);

alter table public.tributes enable row level security;

drop policy if exists "Public can read approved tributes" on public.tributes;
create policy "Public can read approved tributes"
  on public.tributes for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists "Visitors can submit pending tributes" on public.tributes;
create policy "Visitors can submit pending tributes"
  on public.tributes for insert
  to anon, authenticated
  with check (status = 'pending' and consent = true);

drop policy if exists "Admins can manage tributes" on public.tributes;
create policy "Admins can manage tributes"
  on public.tributes for all
  to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

grant select, insert on table public.tributes to anon;
grant select, insert, update, delete on table public.tributes to authenticated;
grant select, insert, update, delete on table public.tributes to service_role;

create index if not exists tributes_status_created_idx
  on public.tributes (status, created_at desc);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tribute-photos', 'tribute-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']::text[])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Visitors can upload tribute photos" on storage.objects;
create policy "Visitors can upload tribute photos"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'tribute-photos' and name like 'pending/%');

drop policy if exists "Anyone can view tribute photos" on storage.objects;
create policy "Anyone can view tribute photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'tribute-photos');

drop policy if exists "Admins can manage tribute photos" on storage.objects;
create policy "Admins can manage tribute photos"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'tribute-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (bucket_id = 'tribute-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()));
