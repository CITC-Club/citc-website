import {getSupabaseMediaBucket} from '@/lib/env';
import {
  ensureMediaBucketExists,
  getSupabaseAdminClient,
  inferImageMime,
  isAllowedImageMime,
} from '@/lib/supabase-storage';
import {createServerSupabaseClient} from '@/utils/supabase/server';

const MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set(['events', 'members']);

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: {session},
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return Response.json({error: 'Unauthorized'}, {status: 401});
    }

    try {
      await ensureMediaBucketExists();
    } catch (bucketError) {
      const message =
        bucketError instanceof Error ? bucketError.message : 'Storage setup failed';
      return Response.json({error: message}, {status: 500});
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder');
    const contentTypeField = formData.get('contentType');

    if (!(file instanceof File) || file.size === 0) {
      return Response.json({error: 'No file provided'}, {status: 400});
    }

    if (typeof folder !== 'string' || !ALLOWED_FOLDERS.has(folder)) {
      return Response.json({error: 'Invalid upload folder'}, {status: 400});
    }

    const mime =
      (typeof contentTypeField === 'string' && contentTypeField) ||
      file.type ||
      inferImageMime(file.name);

    if (!isAllowedImageMime(mime)) {
      return Response.json(
          {error: 'Only AVIF, WebP, JPEG, or PNG images are allowed'},
          {status: 400},
      );
    }

    if (file.size > MAX_BYTES) {
      return Response.json(
          {error: 'Image must be 12 MB or smaller'},
          {status: 400},
      );
    }

    const baseName = file.name.replace(/\s+/g, '-').replace(/[^\w.-]/g, '');
    const ext =
      mime === 'image/avif' ? '.avif' :
      mime === 'image/webp' ? '.webp' :
      mime === 'image/png' ? '.png' :
      '.jpg';
    const hasExt = /\.(avif|webp|jpe?g|png)$/i.test(baseName);
    const fileName = hasExt ? baseName : `${baseName || 'upload'}${ext}`;
    const path = `${folder}/${Date.now()}-${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = getSupabaseMediaBucket();

    const admin = getSupabaseAdminClient();
    const {error: uploadError} = await admin.storage.from(bucket).upload(path, buffer, {
      contentType: mime,
      upsert: false,
    });

    if (uploadError) {
      return Response.json({error: uploadError.message}, {status: 400});
    }

    const {data: urlData} = admin.storage.from(bucket).getPublicUrl(path);

    return Response.json({
      url: urlData.publicUrl,
      path,
      contentType: mime,
      format: mime.replace('image/', ''),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return Response.json({error: message}, {status: 500});
  }
}
