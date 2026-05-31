import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import {eq} from 'drizzle-orm';
import {SEED_ASSET_PREFIX} from '@/lib/seed-assets';
import {getSupabaseMediaBucket} from '@/lib/env';
import {ensureMediaBucketExists, getSupabaseAdminClient} from '@/lib/supabase-storage';
import {db} from './index';
import {events, members} from './schema';

function seedUrlToFilePath(url: string): string | null {
  if (!url.startsWith(SEED_ASSET_PREFIX)) return null;
  const relative = url.slice(SEED_ASSET_PREFIX.length).replace(/^\//, '');
  const filePath = path.join(process.cwd(), 'public', SEED_ASSET_PREFIX.slice(1), relative);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Missing file: ${filePath}`);
    return null;
  }
  return filePath;
}

function mimeFromPath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.avif') return 'image/avif';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  return 'application/octet-stream';
}

async function uploadFile(
    storagePath: string,
    filePath: string,
): Promise<string> {
  const bucket = getSupabaseMediaBucket();
  const admin = getSupabaseAdminClient();
  const buffer = fs.readFileSync(filePath);
  const contentType = mimeFromPath(filePath);

  const {error} = await admin.storage.from(bucket).upload(storagePath, buffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(`${storagePath}: ${error.message}`);
  }

  const {data} = admin.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

function isSeedUrl(url: string | null | undefined): boolean {
  return Boolean(url?.startsWith(SEED_ASSET_PREFIX));
}

async function syncMembers() {
  const all = await db.select().from(members);
  let synced = 0;
  let skipped = 0;

  for (const member of all) {
    if (!isSeedUrl(member.photo)) {
      skipped++;
      continue;
    }

    const photoFile = seedUrlToFilePath(member.photo!);
    const thumbUrl = member.photoThumb || '';
    const thumbFile = isSeedUrl(thumbUrl) ? seedUrlToFilePath(thumbUrl) : null;

    if (!photoFile) {
      console.warn(`  ⏭️  ${member.name}: no photo file, skipped`);
      skipped++;
      continue;
    }

    const base = path.basename(photoFile);
    const storagePhoto = `members/2025/${base}`;
    const storageThumb = thumbFile ?
      `members/2025/thumbs/${path.basename(thumbFile)}` :
      `members/2025/thumbs/${base.replace(/\.avif$/i, '-thumb.avif')}`;

    console.log(`  ↑ ${member.name}`);

    const publicPhoto = await uploadFile(storagePhoto, photoFile);
    let publicThumb = member.photoThumb;

    if (thumbFile && fs.existsSync(thumbFile)) {
      publicThumb = await uploadFile(storageThumb, thumbFile);
    } else if (fs.existsSync(path.join(path.dirname(photoFile), 'thumbs', base.replace(/\.avif$/i, '-thumb.avif')))) {
      const fallbackThumb = path.join(
          path.dirname(photoFile),
          'thumbs',
          base.replace(/\.avif$/i, '-thumb.avif'),
      );
      publicThumb = await uploadFile(storageThumb, fallbackThumb);
    }

    await db
        .update(members)
        .set({
          photo: publicPhoto,
          photoThumb: publicThumb,
          photoVersion: (member.photoVersion ?? 0) + 1,
        })
        .where(eq(members.id, member.id));

    synced++;
  }

  console.log(`\n✅ Members: ${synced} synced, ${skipped} already on Supabase or skipped`);
}

async function syncEvents() {
  const all = await db.select().from(events);
  let synced = 0;
  let skipped = 0;

  for (const event of all) {
    if (!isSeedUrl(event.image)) {
      skipped++;
      continue;
    }

    const imageFile = seedUrlToFilePath(event.image);
    if (!imageFile) {
      skipped++;
      continue;
    }

    const storageImage = `events/${event.id}/${path.basename(imageFile)}`;
    console.log(`  ↑ ${event.title}`);
    const publicImage = await uploadFile(storageImage, imageFile);

    const gallery = event.gallery?.length ?
      await Promise.all(
          event.gallery.map(async (item, index) => {
            if (!isSeedUrl(item)) return item;
            const file = seedUrlToFilePath(item);
            if (!file) return item;
            const storagePath = `events/${event.id}/gallery-${index}-${path.basename(file)}`;
            return uploadFile(storagePath, file);
          }),
      ) :
      null;

    await db
        .update(events)
        .set({
          image: publicImage,
          gallery,
        })
        .where(eq(events.id, event.id));

    synced++;
  }

  console.log(`\n✅ Events: ${synced} synced, ${skipped} already on Supabase or skipped`);
}

async function main() {
  console.log('🔄 Syncing local _seed media → Supabase storage...\n');

  await ensureMediaBucketExists();

  console.log('Members:');
  await syncMembers();

  console.log('\nEvents:');
  await syncEvents();

  console.log('\nDone. Check Storage → media → members/ and events/ in Supabase.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
