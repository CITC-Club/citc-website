import fs from "node:fs";
import path from "node:path";
import { seedAssetPath } from "@/lib/seed-assets";

const MEMBERS_DIR = path.join(
  process.cwd(),
  "public/_seed/media/2025/members",
);
const THUMBS_DIR = path.join(MEMBERS_DIR, "thumbs");

/** Matches admin upload naming: `{name}-thumb.avif` under `members/thumbs/`. */
export function seedMemberThumbPath(photoRelative: string): string {
  const file = path.basename(photoRelative);
  const thumb = file.replace(/\.avif$/i, "-thumb.avif");
  return seedAssetPath(`media/2025/members/thumbs/${thumb}`);
}

/** Build `photo` + `photoThumb` paths for a seeded member AVIF filename. */
export function seedMemberPhotos(filename: string) {
  const relative = `media/2025/members/${filename}`;
  return {
    photo: seedAssetPath(relative),
    photoThumb: seedMemberThumbPath(relative),
  };
}

/**
 * Creates 64×64 AVIF thumbs from full member photos (same sizes as admin upload).
 * Skips files that already exist.
 */
export async function ensureSeedMemberThumbs(): Promise<void> {
  if (!fs.existsSync(MEMBERS_DIR)) {
    console.warn("⚠️  Seed members folder missing, skipping thumb generation");
    return;
  }

  const sharp = (await import("sharp")).default;
  fs.mkdirSync(THUMBS_DIR, { recursive: true });

  const files = fs
    .readdirSync(MEMBERS_DIR)
    .filter((f) => f.endsWith(".avif"));

  let created = 0;
  for (const file of files) {
    const thumbName = file.replace(/\.avif$/i, "-thumb.avif");
    const dest = path.join(THUMBS_DIR, thumbName);
    if (fs.existsSync(dest)) continue;

    await sharp(path.join(MEMBERS_DIR, file))
      .resize(64, 64, { fit: "cover", position: "centre" })
      .avif({ quality: 60 })
      .toFile(dest);
    created++;
  }

  if (created > 0) {
    console.log(`✅ Generated ${created} member thumbnail(s) in _seed`);
  }
}
