-- Explicit Data API grants for the public tables used by Unsent Melodies.
-- Keep this migration alongside any future CREATE TABLE migration.
-- RLS policies remain the primary row-level security control.

-- Public read-only content and admin-managed content.
grant select on table public.journal_posts to anon;
grant select, insert, update, delete on table public.journal_posts to authenticated;
grant select, insert, update, delete on table public.journal_posts to service_role;

grant select on table public.stories to anon;
grant select, insert, update, delete on table public.stories to authenticated;
grant select, insert, update, delete on table public.stories to service_role;

grant select on table public.products to anon;
grant select, insert, update, delete on table public.products to authenticated;
grant select, insert, update, delete on table public.products to service_role;

grant select on table public.social_links to anon;
grant select, insert, update, delete on table public.social_links to authenticated;
grant select, insert, update, delete on table public.social_links to service_role;

grant select on table public.listening_tracks to anon;
grant select, insert, update, delete on table public.listening_tracks to authenticated;
grant select, insert, update, delete on table public.listening_tracks to service_role;

grant select on table public.site_settings to anon;
grant select, insert, update, delete on table public.site_settings to authenticated;
grant select, insert, update, delete on table public.site_settings to service_role;

-- Moderated visitor-submission tables.
grant select, insert on table public.tributes to anon;
grant select, insert, update, delete on table public.tributes to authenticated;
grant select, insert, update, delete on table public.tributes to service_role;

grant select, insert on table public.community_stories to anon;
grant select, insert, update, delete on table public.community_stories to authenticated;
grant select, insert, update, delete on table public.community_stories to service_role;

-- Legacy memories table: keep explicit access documented while RLS controls rows.
grant select, insert, update, delete on table public.memories to anon;
grant select, insert, update, delete on table public.memories to authenticated;
grant select, insert, update, delete on table public.memories to service_role;

-- Private administrator allow-list: never grant it to anon.
revoke all on table public.admin_users from anon;
grant select on table public.admin_users to authenticated;
grant select, insert, update, delete on table public.admin_users to service_role;
