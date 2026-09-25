-- YouTube-backed listening tracks for remembrance, relaxation, and sleep.
create table if not exists public.listening_tracks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'remembrance' check (category in ('remembrance', 'relaxation', 'sleep')),
  description text,
  youtube_url text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.listening_tracks enable row level security;

drop policy if exists "Public can read published listening tracks" on public.listening_tracks;
create policy "Public can read published listening tracks"
  on public.listening_tracks for select
  using (status = 'published');

drop policy if exists "Admins can manage listening tracks" on public.listening_tracks;
create policy "Admins can manage listening tracks"
  on public.listening_tracks for all
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- Explicit Data API grants for Supabase projects created before the
-- October 30 change to automatic grants on new public tables.
grant select
  on table public.listening_tracks
  to anon;

grant select, insert, update, delete
  on table public.listening_tracks
  to authenticated;

grant select, insert, update, delete
  on table public.listening_tracks
  to service_role;

create index if not exists listening_tracks_status_order_idx
  on public.listening_tracks (status, sort_order);
