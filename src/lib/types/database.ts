import type { UserRole } from "@/lib/auth/roles";

export type { UserRole };

export type MatchStatus = "SCHEDULED" | "LIVE" | "COMPLETED";

export type Club = {
  id: string;
  name: string;
  created_at: string;
}

export type AgeGroup = {
  id: string;
  club_id: string | null;
  name: string;
  display_order: number;
}

export type Team = {
  id: string;
  age_group_id: string | null;
  name: string;
  created_at: string;
}

export type Profile = {
  id: string;
  full_name: string;
  role: UserRole;
  team_id: string | null;
  created_at: string;
}

export type PlayerDetails = {
  id: string;
  user_id: string | null;
  team_id: string | null;
  squad_number: number | null;
  preferred_position: string | null;
  created_at: string;
}

export type Drill = {
  id: string;
  title: string;
  is_club_official: boolean;
  created_by: string | null;
  target_age_group: string | null;
  objective_category: string | null;
  diagram_url: string | null;
  pitch_setup: string | null;
  instructions: string | null;
  coaching_points: string[] | null;
  default_duration_seconds: number;
  created_at: string;
}

export type PlayerEvaluation = {
  id: string;
  player_id: string | null;
  evaluated_by: string | null;
  evaluation_date: string;
  technical_score: number;
  tactical_score: number;
  physical_score: number;
  mental_score: number;
  notes: string | null;
}

export type MatchSession = {
  id: string;
  team_id: string | null;
  opponent: string;
  match_date: string;
  status: MatchStatus | string;
}

export type MatchPlayerMinutes = {
  id: string;
  match_id: string | null;
  player_id: string | null;
  minutes_played: number;
  is_on_pitch: boolean;
}

type Table<Row extends Record<string, unknown>> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      clubs: Table<Club>;
      age_groups: Table<AgeGroup>;
      teams: Table<Team>;
      profiles: Table<Profile>;
      player_details: Table<PlayerDetails>;
      drills: Table<Drill>;
      player_evaluations: Table<PlayerEvaluation>;
      match_sessions: Table<MatchSession>;
      match_player_minutes: Table<MatchPlayerMinutes>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
    };
    CompositeTypes: Record<string, never>;
  };
}
