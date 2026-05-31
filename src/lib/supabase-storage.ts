import {createClient, type SupabaseClient} from '@supabase/supabase-js';
import {
  getSupabaseMediaBucket,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from '@/lib/env';

const ALLOWED_IMAGE_TYPES = [
  'image/avif',
  'image/webp',
  'image/jpeg',
  'image/png',
] as const;

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
      auth: {autoRefreshToken: false, persistSession: false},
    });
  }
  return adminClient;
}

export function isAllowedImageMime(mime: string): boolean {
  return (
    (ALLOWED_IMAGE_TYPES as readonly string[]).includes(mime) ||
    mime.startsWith('image/')
  );
}

export function inferImageMime(fileName: string, fallback = 'image/avif'): string {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.avif')) return 'image/avif';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  return fallback;
}

/** Creates the public media bucket if it does not exist yet. */
export async function ensureMediaBucketExists(): Promise<void> {
  const bucket = getSupabaseMediaBucket();
  const admin = getSupabaseAdminClient();

  const {data: buckets, error: listError} = await admin.storage.listBuckets();
  if (listError) {
    throw new Error(listError.message);
  }

  if (buckets?.some((b) => b.name === bucket)) {
    return;
  }

  const {error: createError} = await admin.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: 12 * 1024 * 1024,
    allowedMimeTypes: [...ALLOWED_IMAGE_TYPES],
  });

  if (createError && !createError.message.toLowerCase().includes('already exists')) {
    throw new Error(createError.message);
  }
}
