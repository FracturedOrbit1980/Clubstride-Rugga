import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/types/database";
import { getServiceRoleKey, getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Service-role client for maintenance scripts. Request handlers do not use it:
 * club writes go through the signed-in user so row level security stays in force.
 * Returns null when the server-only key or the public URL is missing.
 */
export function createServiceClient() {
  const env = getSupabaseEnv();
  const serviceRoleKey = getServiceRoleKey();
  if (!env || !serviceRoleKey) return null;

  return createClient<Database>(env.url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
