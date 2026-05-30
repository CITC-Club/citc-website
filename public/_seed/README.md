# Seed-only static files (optional — safe to delete later)

These images back **local paths** in `src/db/seed.ts` (e.g. `/_seed/event/001/…`, `/_seed/media/2025/members/…`).

They are **not** used by the app at build time — only when the database still points at `/_seed/…` URLs.

## When you can remove this folder

1. Upload member and event images via **Admin** (Supabase `media` bucket), or
2. Update production DB rows to full `https://…supabase.co/storage/…` URLs.

Then:

```bash
rm -rf public/_seed
npm run db:seed   # only if you still use seed with Supabase URLs in seed.ts
```

Re-run seed after changing paths in `seed.ts` so Postgres matches your storage.

## Contents

| Path | Purpose |
|------|---------|
| `event/` | Event hero + gallery JPEGs/PNG for seeded events `001`–`003` |
| `media/` | Member AVIFs (`2025/members/`), list thumbs (`2025/members/thumbs/*-thumb.avif`), and `og-team.avif` (homepage hero) |

Do not put site logos, favicons, or `scripts/` here — those live in `public/` root.
