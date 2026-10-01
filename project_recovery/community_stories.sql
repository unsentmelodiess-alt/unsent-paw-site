-- Community-submitted stories. Text is private until manually approved.
create table if not exists public.community_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 5 and 140),
  pet_name text not null check (char_length(pet_name) between 1 and 80),
  story_body text not null check (char_length(story_body) between 80 and 12000),
  author_display text not null default 'A community member' check (char_length(author_display) between 1 and 80),
  private_email text,
  consent_publish boolean not null default false,
  consent_media boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  moderated_at timestamptz
);

alter table public.community_stories enable row level security;

drop policy if exists "Public can read approved community stories" on public.community_stories;
create policy "Public can read approved community stories"
  on public.community_stories for select
  to anon, authenticated
  using (status = 'approved' and consent_publish = true);

drop policy if exists "Visitors can submit community stories" on public.community_stories;
create policy "Visitors can submit community stories"
  on public.community_stories for insert
  to anon, authenticated
  with check (status = 'pending' and consent_publish = true);

drop policy if exists "Admins can manage community stories" on public.community_stories;
create policy "Admins can manage community stories"
  on public.community_stories for all
  to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

grant select, insert on table public.community_stories to anon;
grant select, insert, update, delete on table public.community_stories to authenticated;
grant select, insert, update, delete on table public.community_stories to service_role;

create index if not exists community_stories_status_created_idx
  on public.community_stories (status, created_at desc);
