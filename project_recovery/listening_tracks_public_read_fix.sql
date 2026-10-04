-- Restore public access to published listening tracks and keep admin access secure.
-- The direct admin_users lookup caused anonymous REST requests to fail with 42501
-- when admin_users was not readable by anon. The existing security-definer helper
-- avoids exposing the admin allow-list to public requests.

alter table public.listening_tracks enable row level security;

drop policy if exists "Public can read published listening tracks" on public.listening_tracks;
create policy "Public can read published listening tracks"
  on public.listening_tracks for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins can manage listening tracks" on public.listening_tracks;
create policy "Admins can manage listening tracks"
  on public.listening_tracks for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select on table public.listening_tracks to anon;
grant select, insert, update, delete on table public.listening_tracks to authenticated;
grant select, insert, update, delete on table public.listening_tracks to service_role;
