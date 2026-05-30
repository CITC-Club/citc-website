import type {Member} from '@/types';

function encodePathSegment(segment: string): string {
  if (!segment) return segment;
  try {
    const decoded = decodeURIComponent(segment);
    return /[^A-Za-z0-9._~-]/.test(decoded) ?
      encodeURIComponent(decoded) :
      decoded;
  } catch {
    return /[^A-Za-z0-9._~-]/.test(segment) ?
      encodeURIComponent(segment) :
      segment;
  }
}

/**
 * Normalizes image URLs from Postgres or Supabase Storage.
 * Local `/_seed/…` paths are encoded when segments contain spaces or special chars.
 */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const path = url.startsWith('/') ? url : `/${url}`;
  return path
      .split('/')
      .map((segment, index) =>
      index === 0 && segment === '' ? '' : encodePathSegment(segment),
      )
      .join('/');
}

function withPhotoVersion(url: string, version: number | undefined): string {
  return version ? `${url}?v=${version}` : url;
}

export function getMemberPhotoUrl(member: Pick<Member, 'photo' | 'photoVersion'>): string {
  if (!member.photo) return '';
  return withPhotoVersion(resolveMediaUrl(member.photo), member.photoVersion);
}

/** Admin list avatars — only the small thumb from upload/seed, not the full photo. */
export function getMemberThumbnailUrl(
    member: Pick<Member, 'photoThumb' | 'photoVersion'>,
): string {
  if (!member.photoThumb) return '';
  return withPhotoVersion(
      resolveMediaUrl(member.photoThumb),
      member.photoVersion,
  );
}
