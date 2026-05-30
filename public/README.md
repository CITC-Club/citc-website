# Static files (Next.js `public/`)

Everything here is served from the site root (`/filename`).

## Keep (production)

| Item | Why |
|------|-----|
| `CITCLOGOW.webp`, `CITC_LOGOD.webp` | Navbar & footer logos |
| `favicon/` | Browser icons & manifest |
| `scripts/theme-init.js` | Dark mode before first paint |
| `robots.txt` | Crawlers |
| `googlecf8ab7e06b4c8358.html` | Google Search Console verification |

## Optional — delete when DB uses Supabase only

| Item | Why |
|------|-----|
| **`_seed/`** | Bootstrap photos for `npm run db:seed` — see `_seed/README.md` |

## Removed intentionally

- `data/*.json` — duplicate of `src/db/seed.ts`, not read by the app
- Default Create Next App SVGs (`next.svg`, `vercel.svg`, …)
- Unused logo PNG/WebP variants (`&nobg`, duplicate `.png` logos)
