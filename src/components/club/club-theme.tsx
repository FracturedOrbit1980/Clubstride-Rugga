"use client";

import { useEffect } from "react";

import { activeClub, useClubLibrary } from "@/stores/club-library";

export function ClubTheme() {
  const clubs = useClubLibrary((state) => state.clubs);
  const activeId = useClubLibrary((state) => state.activeId);

  useEffect(() => {
    const theme = activeClub(clubs, activeId)?.theme ?? "red";
    document.documentElement.dataset.clubTheme = theme;
  }, [clubs, activeId]);

  return null;
}
