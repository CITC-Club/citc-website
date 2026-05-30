<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

CITC club website — Next.js 16, Drizzle (Postgres), Supabase (admin auth + storage). Full context: **[README.md](./README.md)**. Contributor conventions: **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

## Conventions (short)

| Topic | Rule |
|--------|------|
| Imports | Always `@/` (e.g. `@/components/Footer`, `@/app/admin/events/EventForm`). No `../` across folders. |
| Types | Use `Member`, `Event`, `Team` from `@/types` (inferred from Drizzle). Do not duplicate row shapes by hand. |
| Env | Read via `@/lib/env` (`getDatabaseUrl`, `getSupabaseUrl`, `getSupabaseAnonKey`). Copy `.env.example` → `.env.local`. |
| Brand copy | Tagline and site metadata in `@/lib/site-config`. Colors in `globals.css` (`citc-blue`, `citc-navy`). |
| Years | `sortYearsDesc`, `resolveAcademicYear` from `@/lib/years`. |
| Images (public URLs) | `resolveMediaUrl` / `getMemberPhotoUrl` in `@/lib/media`. |
| Images (fallbacks) | Client `MediaImage` only — never `onError` on `<img>` in Server Components. |
| Supabase | `createBrowserSupabaseClient` (client), `createServerSupabaseClient` (server), `createMiddlewareSupabaseClient` (middleware). |
| Components | Shared public UI → `src/components/`. Admin-only UI → co-located under `src/app/admin/`. |
| Pages | Prefer Server Components; add `*Client.tsx` beside `page.tsx` for interactivity. Mark client files with `"use client"`. |
| Data | Public pages fetch in RSC; admin CRUD via `src/app/api/*`. Seed with `npm run db:seed` (`src/db/seed.ts`). |
| Lint / format | `npm run lint` / `npm run format` (Biome). |

## Brand

- Blue: `#0052CC` (`citc-blue`)
- Navy: `#050A18` (`citc-navy`)
