<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project context

See **[README.md](./README.md)** for what this repo is, stack, env vars, what has been done, and the todo list.

**Quick facts:** CITC club website at NCIT — Next.js 16 + Postgres (Drizzle) + Supabase (auth/storage). Public brand colors: `#0052CC` / `#050A18`. Do not put `onError` on `<img>` in Server Components; use `MediaImage` (`src/components/MediaImage.tsx`) instead.
