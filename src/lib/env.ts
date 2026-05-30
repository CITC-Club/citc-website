/**
 * Central environment access. Import from here instead of reading process.env ad hoc.
 * Server-only vars must not be imported in Client Components.
 */

/** PostgreSQL connection string (server only). */
export function getDatabaseUrl(): string {
  const value = process.env.DATABASE_URL;
  if (!value) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.CI) {
      return 'postgresql://placeholder-user:placeholder-pass@localhost:5432/placeholder-db';
    }
    throw new Error('Missing required environment variable: DATABASE_URL');
  }
  return value;
}

/** Supabase project URL (public). */
export function getSupabaseUrl(): string {
  const value =
    (typeof window !== 'undefined' && (window as any).ENV?.NEXT_PUBLIC_SUPABASE_URL) ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.CI) {
      return 'https://placeholder-project.supabase.co';
    }
    throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL');
  }
  return value;
}

/** Supabase anon / publishable key (public). */
export function getSupabaseAnonKey(): string {
  const value =
    (typeof window !== 'undefined' && (window as any).ENV?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!value) {
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.CI) {
      return 'placeholder-anon-key';
    }
    throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  }
  return value;
}
