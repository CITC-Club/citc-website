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
  return requireEnv("NEXT_PUBLIC_SUPABASE_URL");
}

/** Supabase anon / publishable key (public). */
export function getSupabaseAnonKey(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}
