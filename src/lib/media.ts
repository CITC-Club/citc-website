import type { Member } from "@/types";

function encodePathSegment(segment: string): string {
  if (!segment) return segment;
  try {
    const decoded = decodeURIComponent(segment);
    return /[^A-Za-z0-9._~-]/.test(decoded)
      ? encodeURIComponent(decoded)
      : decoded;
  } catch {
    return /[^A-Za-z0-9._~-]/.test(segment)
      ? encodeURIComponent(segment)
      : segment;
  }
}

/**
 * Normalizes image URLs from Postgres or Supabase Storage.
 * Local paths under /public are encoded only when segments contain spaces or special characters.
 */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const path = url.startsWith("/") ? url : `/${url}`;
  return path
    .split("/")
    .map((segment, index) =>
      index === 0 && segment === "" ? "" : encodePathSegment(segment),
    )
    .join("/");
}

export function getMemberPhotoUrl(member: Pick<Member, "photo" | "photoVersion">): string {
  if (!member.photo) return "";
  const base = resolveMediaUrl(member.photo);
  return member.photoVersion ? `${base}?v=${member.photoVersion}` : base;
}
