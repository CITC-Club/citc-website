/**
 * Central environment access. Import from here instead of reading process.env ad hoc.
 * Server-only vars must not be imported in Client Components.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** PostgreSQL connection string (server only). */
export function getDatabaseUrl(): string {
  return requireEnv("DATABASE_URL");
}

/** Supabase project URL (public). */
export function getSupabaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL");
  }
  return value;
}

/** Supabase anon / publishable key (public). */
export function getSupabaseAnonKey(): string {
  const value = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!value) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  return value;
}
