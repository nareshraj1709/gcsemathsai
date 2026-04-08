-- ============================================================================
-- Storage bucket for forum image uploads
-- Run in Supabase SQL Editor (after 0001_forum.sql)
-- ============================================================================

-- Create the bucket (public read, authenticated write)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'forum-images',
  'forum-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ── STORAGE RLS POLICIES ────────────────────────────────────────────────────

-- Anyone can view forum images (bucket is public anyway, but explicit is better)
drop policy if exists "Anyone can view forum images" on storage.objects;
create policy "Anyone can view forum images"
  on storage.objects for select
  using (bucket_id = 'forum-images');

-- Logged-in users can upload, but only into their own folder ({user_id}/...)
drop policy if exists "Logged in users can upload forum images" on storage.objects;
create policy "Logged in users can upload forum images"
  on storage.objects for insert
  with check (
    bucket_id = 'forum-images'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can delete their own uploads
drop policy if exists "Users can delete own forum images" on storage.objects;
create policy "Users can delete own forum images"
  on storage.objects for delete
  using (
    bucket_id = 'forum-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
