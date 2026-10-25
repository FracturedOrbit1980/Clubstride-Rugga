import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/types/database";

export function createClient() {
  const env = getSupabaseEnv();
  if (!env) return null;
  return createBrowserClient<Database>(env.url, env.anonKey);
}
