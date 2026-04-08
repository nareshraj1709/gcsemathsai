-- ============================================================================
-- Forum schema for GCSEMathsAI community
-- Run in Supabase SQL Editor
-- ============================================================================

-- ── TABLES ──────────────────────────────────────────────────────────────────

-- Forum posts (one big feed with tags)
create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text not null default 'Student',
  title text not null,
  body text not null,
  tags text[] default '{}',
  image_urls text[] default '{}',
  upvote_count int default 0 not null,
  comment_count int default 0 not null,
  flagged boolean default false not null,
  flag_count int default 0 not null,
  hidden boolean default false not null,
  pinned boolean default false not null,
  created_at timestamptz default now() not null
);

create index if not exists forum_posts_created_at_idx on public.forum_posts (created_at desc);
create index if not exists forum_posts_upvote_idx on public.forum_posts (upvote_count desc);
create index if not exists forum_posts_user_idx on public.forum_posts (user_id);

-- Forum comments (threaded)
create table if not exists public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.forum_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text not null default 'Student',
  parent_comment_id uuid references public.forum_comments(id) on delete cascade,
  body text not null,
  image_urls text[] default '{}',
  upvote_count int default 0 not null,
  flagged boolean default false not null,
  flag_count int default 0 not null,
  hidden boolean default false not null,
  created_at timestamptz default now() not null
);

create index if not exists forum_comments_post_idx on public.forum_comments (post_id);
create index if not exists forum_comments_parent_idx on public.forum_comments (parent_comment_id);

-- Votes (one row per user per item)
create table if not exists public.forum_votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id uuid references public.forum_posts(id) on delete cascade,
  comment_id uuid references public.forum_comments(id) on delete cascade,
  created_at timestamptz default now() not null,
  -- Either post_id or comment_id, not both, not neither
  constraint vote_target_check check ((post_id is null) <> (comment_id is null)),
  -- Prevent double-voting
  constraint unique_user_post_vote unique (user_id, post_id),
  constraint unique_user_comment_vote unique (user_id, comment_id)
);

-- Reports (for manual moderation review)
create table if not exists public.forum_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references auth.users(id) on delete cascade not null,
  post_id uuid references public.forum_posts(id) on delete cascade,
  comment_id uuid references public.forum_comments(id) on delete cascade,
  reason text,
  resolved boolean default false not null,
  created_at timestamptz default now() not null,
  constraint report_target_check check ((post_id is null) <> (comment_id is null))
);

create index if not exists forum_reports_unresolved_idx on public.forum_reports (resolved, created_at desc);

-- ── ROW LEVEL SECURITY ──────────────────────────────────────────────────────

alter table public.forum_posts enable row level security;
alter table public.forum_comments enable row level security;
alter table public.forum_votes enable row level security;
alter table public.forum_reports enable row level security;

-- Posts: anyone reads non-hidden, logged-in users insert/update/delete own
drop policy if exists "Anyone can read posts" on public.forum_posts;
create policy "Anyone can read posts" on public.forum_posts
  for select using (not hidden);

drop policy if exists "Logged in users can post" on public.forum_posts;
create policy "Logged in users can post" on public.forum_posts
  for insert with check (auth.uid() = user_id);

drop policy if exists "Authors can update own posts" on public.forum_posts;
create policy "Authors can update own posts" on public.forum_posts
  for update using (auth.uid() = user_id);

drop policy if exists "Authors can delete own posts" on public.forum_posts;
create policy "Authors can delete own posts" on public.forum_posts
  for delete using (auth.uid() = user_id);

-- Comments: same pattern
drop policy if exists "Anyone can read comments" on public.forum_comments;
create policy "Anyone can read comments" on public.forum_comments
  for select using (not hidden);

drop policy if exists "Logged in users can comment" on public.forum_comments;
create policy "Logged in users can comment" on public.forum_comments
  for insert with check (auth.uid() = user_id);

drop policy if exists "Authors can update own comments" on public.forum_comments;
create policy "Authors can update own comments" on public.forum_comments
  for update using (auth.uid() = user_id);

drop policy if exists "Authors can delete own comments" on public.forum_comments;
create policy "Authors can delete own comments" on public.forum_comments
  for delete using (auth.uid() = user_id);

-- Votes: anyone can see vote counts (already in posts/comments), users manage own
drop policy if exists "Users see all votes" on public.forum_votes;
create policy "Users see all votes" on public.forum_votes
  for select using (true);

drop policy if exists "Users vote as themselves" on public.forum_votes;
create policy "Users vote as themselves" on public.forum_votes
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users remove own votes" on public.forum_votes;
create policy "Users remove own votes" on public.forum_votes
  for delete using (auth.uid() = user_id);

-- Reports: users create their own reports, no public reads
drop policy if exists "Users create reports" on public.forum_reports;
create policy "Users create reports" on public.forum_reports
  for insert with check (auth.uid() = reporter_id);

-- ── TRIGGERS to maintain counts ─────────────────────────────────────────────

-- Update upvote_count on votes table change
create or replace function public.update_vote_counts()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    if new.post_id is not null then
      update public.forum_posts set upvote_count = upvote_count + 1 where id = new.post_id;
    elsif new.comment_id is not null then
      update public.forum_comments set upvote_count = upvote_count + 1 where id = new.comment_id;
    end if;
  elsif tg_op = 'DELETE' then
    if old.post_id is not null then
      update public.forum_posts set upvote_count = greatest(0, upvote_count - 1) where id = old.post_id;
    elsif old.comment_id is not null then
      update public.forum_comments set upvote_count = greatest(0, upvote_count - 1) where id = old.comment_id;
    end if;
  end if;
  return null;
end;
$$;

drop trigger if exists forum_votes_count_trigger on public.forum_votes;
create trigger forum_votes_count_trigger
after insert or delete on public.forum_votes
for each row execute function public.update_vote_counts();

-- Update comment_count on forum_comments insert/delete
create or replace function public.update_comment_counts()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    update public.forum_posts set comment_count = comment_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.forum_posts set comment_count = greatest(0, comment_count - 1) where id = old.post_id;
  end if;
  return null;
end;
$$;

drop trigger if exists forum_comments_count_trigger on public.forum_comments;
create trigger forum_comments_count_trigger
after insert or delete on public.forum_comments
for each row execute function public.update_comment_counts();

-- Update flag_count and auto-hide if too many reports
create or replace function public.handle_new_report()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.post_id is not null then
    update public.forum_posts
    set flag_count = flag_count + 1,
        flagged = true,
        hidden = case when flag_count + 1 >= 3 then true else hidden end
    where id = new.post_id;
  elsif new.comment_id is not null then
    update public.forum_comments
    set flag_count = flag_count + 1,
        flagged = true,
        hidden = case when flag_count + 1 >= 3 then true else hidden end
    where id = new.comment_id;
  end if;
  return null;
end;
$$;

drop trigger if exists forum_reports_handle_trigger on public.forum_reports;
create trigger forum_reports_handle_trigger
after insert on public.forum_reports
for each row execute function public.handle_new_report();
