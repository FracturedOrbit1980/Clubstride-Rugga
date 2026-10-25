import { isUserRole, type UserRole } from "@/lib/auth/roles";
import { getAuthMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export interface SessionProfile {
  id: string;
  fullName: string;
  role: UserRole;
  teamId: string | null;
}

export async function getCurrentProfile(): Promise<SessionProfile | null> {
  if (getAuthMode() !== "supabase") return null;

  const supabase = await createClient();
  if (!supabase) return null;

  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, role, team_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!data || !isUserRole(data.role)) return null;

  return {
    id: data.id,
    fullName: data.full_name,
    role: data.role,
    teamId: data.team_id,
  };
}
