import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/types/database";

/**
 * Refreshes a Supabase session when env vars are present.
 * Returns the original response unchanged when credentials are missing.
 */
export async function updateSession(request: NextRequest, response: NextResponse) {
  const env = getSupabaseEnv();
  if (!env) return response;

  const supabase = createServerClient<Database>(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    await supabase.auth.getUser();
  } catch {
    // Invalid or placeholder credentials must not block the app.
  }

  return response;
}
