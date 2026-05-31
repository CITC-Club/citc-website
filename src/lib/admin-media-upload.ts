import {inferImageMime} from '@/lib/supabase-storage';

export type MediaUploadFolder = 'events' | 'members';

export interface AdminMediaUploadResult {
  url: string;
  format: string;
  contentType: string;
}

/**
 * Upload a compressed image blob through the authenticated API route.
 * Pass AVIF blobs from `compressImageToAvif()` so the stored file uses image/avif.
 */
export async function uploadAdminMedia(
    blob: Blob,
    fileName: string,
    folder: MediaUploadFolder,
): Promise<AdminMediaUploadResult> {
  const contentType = blob.type || inferImageMime(fileName);
  const formData = new FormData();
  formData.append(
      'file',
      new File([blob], fileName, {type: contentType}),
  );
  formData.append('folder', folder);
  formData.append('contentType', contentType);

  const res = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
  });

  const data = (await res.json()) as AdminMediaUploadResult & { error?: string };

  if (!res.ok) {
    throw new Error(data.error || 'Upload failed');
  }

  if (!data.url) {
    throw new Error('Upload succeeded but no URL was returned');
  }

  return {
    url: data.url,
    format: data.format || contentType.replace('image/', ''),
    contentType: data.contentType || contentType,
  };
}
