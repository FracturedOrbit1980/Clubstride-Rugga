export type AuthMode = "demo" | "supabase";

export function getSupabaseEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/**
 * Demo when the public URL or anon key is missing, including an explicit
 * `NEXT_PUBLIC_AUTH_MODE=supabase` that cannot be honoured.
 * Supabase when both public values are set, unless `NEXT_PUBLIC_AUTH_MODE=demo`.
 */
export function getAuthMode(): AuthMode {
  const hasPublic = getSupabaseEnv() !== null;
  const explicit = process.env.NEXT_PUBLIC_AUTH_MODE?.trim().toLowerCase();
  if (explicit === "demo") return "demo";
  if (explicit === "supabase") return hasPublic ? "supabase" : "demo";
  return hasPublic ? "supabase" : "demo";
}

export function getServiceRoleKey(): string | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return key ? key : null;
}
