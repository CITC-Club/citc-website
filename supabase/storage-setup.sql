-- Run once in Supabase Dashboard → SQL Editor (or via Supabase CLI).
-- Creates the public `media` bucket and policies for admin image uploads (AVIF/WebP/JPEG/PNG).

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  12582912,
  ARRAY['image/avif', 'image/webp', 'image/jpeg', 'image/png']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read (event banners, member photos on the website)
DROP POLICY IF EXISTS "Public read media" ON storage.objects;
CREATE POLICY "Public read media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media');

-- Logged-in admins can upload (matches /admin session)
DROP POLICY IF EXISTS "Authenticated upload media" ON storage.objects;
CREATE POLICY "Authenticated upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated update media" ON storage.objects;
CREATE POLICY "Authenticated update media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated delete media" ON storage.objects;
CREATE POLICY "Authenticated delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
