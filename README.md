# CITC Website

Official website for **CITC** (Computer Engineering Innovation & Tech Club) at Nepal College of Information Technology (NCIT).

**Live target:** [citc.ncit.edu.np](https://citc.ncit.edu.np)  
**Tagline:** Innovate. Connect. Transform.

---

## What this repo is

A full-stack **Next.js 16** app with two parts:

| Area | Who uses it | Purpose |
|------|-------------|---------|
| **Public site** | Students & visitors | Club info, events, team roster, join form |
| **Admin dashboard** | CITC organizers | Manage members, teams, and events |

All public content (events, members, stats) is loaded from **PostgreSQL** via Drizzle ORM. Photos and event images can live under `public/` or in **Supabase Storage** (`media` bucket) after upload through admin.

---

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, brand colors from the CITC logo (`#0052CC`, `#050A18`)
- **Database:** PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/)
- **Auth & storage:** Supabase (admin login, image uploads to `media` bucket)
- **Forms:** Tally embed on `/join` and `/register/ai`
- **Lint/format:** Biome

---

## Project structure (high level)

```
src/
  app/
    page.tsx              # Home (hero + about bento)
    events/               # Events list & detail pages
    team/                 # Team roster by academic year
    join/                 # Membership form (Tally)
    register/ai/          # AI competition registration
    login/                # Admin login
    admin/                # Dashboard (members, teams, events)
    api/                  # CRUD API routes for admin
  components/             # Shared public UI (Hero, Footer, …)
  db/                     # Schema, migrations, seed.ts
  lib/                    # env, site-config, media, years, seed-assets, team-order
  types/                  # Drizzle-inferred Member, Event, Team
  utils/                  # Supabase clients, image compression
public/
  _seed/                  # Optional bootstrap images — safe to delete later (see public/README.md)
  CITCLOGOW.webp, …       # Site logos (required)
  favicon/, scripts/      # Icons + theme-init.js
```

---

## Environment variables

Copy `.env.example` to `.env.local` (not committed):

| Variable | Used for |
|----------|----------|
| `DATABASE_URL` | PostgreSQL connection (Drizzle + seed) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |

Admin auth and storage uploads depend on Supabase being configured correctly.

---

## Getting started

```bash
npm install
npm run db:push      # apply schema to Postgres
npm run db:seed      # optional: seed teams, members, events
npm run dev          # http://localhost:3000
```

Other scripts: `npm run build`, `npm run lint`, `npm run format`, `npm run check` (lint + build).

**Contributing:** see [CONTRIBUTING.md](./CONTRIBUTING.md) and [AGENTS.md](./AGENTS.md) for conventions.

---

## Public pages

| Route | Description |
|-------|-------------|
| `/` | Hero + “What we do” bento section; events only on `/events` |
| `/events` | All events from DB, filter by academic year |
| `/events/[id]` | Event detail + markdown description + gallery |
| `/team` | Team by academic year; advisors → mentors → executives |
| `/join` | Tally membership embed |
| `/register/ai` | AI competition page + countdown + Tally |

---

## Admin

| Route | Description |
|-------|-------------|
| `/login` | Admin sign-in (Supabase) |
| `/admin` | Dashboard overview |
| `/admin/members` | Add/edit members, photo upload (AVIF + thumb) |
| `/admin/teams` | Manage team groups per year |
| `/admin/events` | Add/edit events, image upload to Supabase |

Admin UI uses a separate **botanical** theme (sage/clay) from the public CITC blue/navy brand.

---

## What has been done (recent work)

### Public site & branding
- Applied **CITC logo colors** across navbar, footer, buttons, and content (replacing generic cyan/rose AI-style palette).
- Homepage hero uses a full-bleed club photo; **HomeAbout** bento section (events only on `/events`).
- **Events are only on `/events`**; home has a short “What we do” section (`HomeAbout`) with a link to events.
- **Minimal animations** on the homepage (removed heavy Framer Motion from hero/features/navbar).
- **Large-screen layout:** content capped with `.site-container` (max 1280px), no horizontal overflow on ultrawide monitors.
- **Dark mode:** `theme-init.js` via `next/script` (fixes console error from inline `<script>` in layout).
- **Footer** redesigned for mobile and desktop.

### Team page (`/team`)
- Roster filtered by **academic year** (defaults to latest year).
- Display order: **Patron/Faculty advisors → Mentors → Executive Committee**.
- Executives sorted by **college year (senior first)**, then name.
- Bottom **year picker** (circular buttons, latest first) instead of a long member directory list.
- Member photos: fixed loading (cached images, `getMemberPhotoUrl`, `MediaImage` client component for fallbacks).

### Events
- Event images use `resolveMediaUrl()` for paths with spaces (e.g. WhatsApp image filenames).
- `MediaImage` client component for image `onError` fallbacks (Server Components cannot use event handlers on `<img>`).

### Admin (earlier commits, still in place)
- Drizzle schema + migrations for members, teams, events (with `academic_year` / `member_year`).
- TanStack Query for admin mutations.
- AVIF compression on upload; Supabase `media` bucket for storage.
- Academic year filters on admin lists.

---

## Updated in repo (commit history summary)

Recent commits on `main` include:

- Standardization: `CONTRIBUTING.md`, `.env.example`, Drizzle-inferred types, `lib/env`, Supabase middleware, shared year helpers.
- Earlier — CITC branding, team year picker, `MediaImage`, admin dashboard, Drizzle + Supabase.

---

## To be done

### High priority
- [ ] **Push** local commits to remote and verify production deploy.
- [ ] **Verify production:** `DATABASE_URL`, Supabase storage public URLs, and admin login on the deployed environment.
- [ ] **End-to-end browser pass:** all routes on mobile, tablet, and desktop; fix any layout or broken images.

### Content & data
- [ ] Add **new academic years** in admin when committees change (teams + members `member_year`).
- [ ] Ensure event images are in `public/_seed/` (dev seed) or Supabase (production DB `image` / `gallery`).
- [ ] Replace placeholder social links on any seed members if still present.

### UX / polish
- [ ] Optional: reduce Framer Motion on `/events` and `/team` cards for consistency with minimal-motion homepage.
- [ ] SEO: per-page metadata, Open Graph images for events.
- [ ] Accessibility audit (focus states, contrast, keyboard nav).

### Nice to have
- [ ] `.env.example` committed (names only, no secrets) for new developers.
- [ ] Automated tests or smoke checks for API routes.
- [ ] Document Supabase Storage bucket policies (`media` public read).

---

## Media & images

| Source | Example path |
|--------|----------------|
| Local seed folder | `/_seed/event/002/top_image.jpg`, `/_seed/media/2025/members/name.avif` |
| Supabase Storage | Full `https://…supabase.co/storage/v1/object/public/media/…` URL in DB |

Helpers in `src/lib/media.ts`:
- `resolveMediaUrl()` — encodes local path segments safely.
- `getMemberPhotoUrl()` — member photo + cache-busting `?v=` from `photoVersion`.

---

## Brand tokens

Defined in `src/lib/site-config.ts` and `src/app/globals.css`:

- **CITC blue:** `#0052CC`
- **CITC navy:** `#050A18`
- **Muted blue:** `#E8F0FC`

Use Tailwind classes: `text-citc-blue`, `bg-citc-navy`, `site-container`, etc.

---

## Contributing

1. Read `AGENTS.md` — Next.js 16 may differ from older docs; check `node_modules/next/dist/docs/` when unsure.
2. Keep public copy aligned with **Innovate. Connect. Transform.** and avoid em-dash-heavy marketing tone unless requested.
3. Prefer **dynamic data** from DB/API over hardcoded lists for events, members, and stats.

---

## License / ownership

Private project for CITC @ NCIT. Contact: [citc@ncit.edu.np](mailto:citc@ncit.edu.np).
