# Contributing to CITC Website

Thank you for helping maintain the club site. This guide keeps changes consistent for anyone editing the repo later.

## Prerequisites

- Node.js 20+
- PostgreSQL database
- Supabase project (admin login + `media` storage bucket)

Copy environment variables:

```bash
cp .env.example .env.local
# Fill in DATABASE_URL and Supabase keys
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | Biome check |
| `npm run format` | Biome format (write) |
| `npm run db:push` | Apply Drizzle schema |
| `npm run db:seed` | Seed teams, members, events |

## Repository layout

```
src/
  app/              # Routes (App Router)
    admin/          # Dashboard — auth required (layout + middleware)
    api/            # JSON CRUD for admin forms
    events/         # Public events
    team/           # Public team roster
  components/       # Shared public UI (Navbar, Hero, Footer, …)
  db/               # Drizzle schema, migrations, seed.ts
  lib/              # Domain helpers (config, media, env, years, team-order)
  types/            # Shared TS types (mostly Drizzle infer)
  utils/            # Infrastructure (Supabase clients, image compression)
```

### Where to put new code

- **New public page** → `src/app/<route>/page.tsx`; extract client UI to `<Route>Client.tsx` if needed.
- **New admin screen** → `src/app/admin/<section>/` next to existing tables/forms.
- **Reusable public widget** → `src/components/`.
- **DB column** → `src/db/schema.ts`, then `npm run db:push`; types update via `@/types` automatically.
- **Config / constants** → `src/lib/`, not scattered in components.

## Code style

- **TypeScript** strict; avoid `any`.
- **Imports:** `@/` alias only (see `tsconfig.json`).
- **Formatting:** Biome (2 spaces). Run `npm run format` before committing.
- **React:** Default export for pages and single-purpose components is fine; named exports for icon bundles (`Icons.tsx`).
- **Server vs client:** Fetch data in Server Components; use TanStack Query or `useState` only in client files.

## Database & types

- Schema lives in `src/db/schema.ts`.
- App types: `import type { Event, Member, Team } from "@/types"`.
- Do not maintain parallel interfaces for table rows.

## Supabase

- Browser (login, uploads): `createBrowserSupabaseClient()` from `@/utils/supabase/client`.
- Server (admin layout, logout): `createServerSupabaseClient()` from `@/utils/supabase/server`.
- Session refresh: `src/middleware.ts` on `/admin/*` and `/login`.
- **API routes** (`/api/*`) require a logged-in Supabase user (401 if not). Admin forms must send the session cookie.

## Media

- **Bootstrap only:** `public/_seed/` (see `public/_seed/README.md`) — delete when DB uses Supabase URLs.
- **Permanent:** logos, favicon, `scripts/` at `public/` root.
- Uploaded files: Supabase `media` bucket; store full URL or path in DB.
- Seed paths use `seedAssetPath()` from `@/lib/seed-assets` (prefix `/_seed`).
- Member uploads store **two** URLs: `photo` (full AVIF) and `photoThumb` (64px AVIF). Admin lists use `getMemberThumbnailUrl()` — never the full photo.
- Always normalize URLs with `resolveMediaUrl()` before rendering.

## Pull requests

1. Branch from `main`.
2. `npm run lint` and `npm run build` must pass.
3. Describe what pages you tested in the PR body.
4. Do not commit `.env.local` or secrets.

## Questions

Club contact: citc@ncit.edu.np
