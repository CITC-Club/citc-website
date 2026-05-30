/**
 * Local files served from `public/_seed/`.
 * Used only for initial `npm run db:seed` and dev before Supabase uploads.
 * Safe to delete `public/_seed/` once every DB image URL is a Supabase URL or CDN path.
 */
export const SEED_ASSET_PREFIX = '/_seed';

export function seedAssetPath(relativePath: string): string {
  const trimmed = relativePath.replace(/^\/+/, '');
  return `${SEED_ASSET_PREFIX}/${trimmed}`;
}
