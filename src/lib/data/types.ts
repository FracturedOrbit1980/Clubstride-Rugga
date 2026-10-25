import type { UserRole } from "@/lib/auth/roles";

export interface ClubTeam {
  id: string;
  name: string;
}

export interface ClubAgeGroup {
  id: string;
  name: string;
  displayOrder: number;
  teams: ClubTeam[];
}

export interface ClubStat {
  label: string;
  value: string;
}

export interface DrillView {
  id: string;
  title: string;
  isClubOfficial: boolean;
  targetAgeGroup: string;
  moment: string;
  drillType: string;
  pitchSetup: string;
  instructions: string;
  coachingPoints: string[];
  defaultDurationSeconds: number;
}

export interface RosterPlayer {
  playerId: string;
  name: string;
  squadNumber: number;
  position: string;
  isOnPitch: boolean;
  minutesPlayed: number;
}

export interface PlayerScores {
  technical: number;
  tactical: number;
  physical: number;
  mental: number;
}

export interface PlayerHome {
  name: string;
  squadNumber: string;
  position: string;
  teamName: string;
  ageGroup: string;
  notes: string;
  scores: PlayerScores | null;
}

export interface AttendanceItem {
  id: string;
  when: string;
  detail: string;
  status: string;
}

export interface PersonRecord {
  id: string;
  fullName: string;
  role: UserRole;
  teamId: string | null;
}

export interface CoachHome {
  teamId: string | null;
  teamName: string;
  roster: RosterPlayer[];
}
