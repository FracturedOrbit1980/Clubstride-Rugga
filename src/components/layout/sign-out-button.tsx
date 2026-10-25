"use client";

import { useRole } from "@/components/auth/role-session";

export function SignOutButton() {
  const { signOut } = useRole();

  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="btn-chrome min-h-11 rounded-lg px-3 text-sm font-bold"
    >
      Sign out
    </button>
  );
}
