export const STANDARD_POSITIONS = [
  "Goalkeeper",
  "Right back",
  "Centre back",
  "Left back",
  "Defensive midfielder",
  "Central midfielder",
  "Attacking midfielder",
  "Right winger",
  "Left winger",
  "Striker",
] as const;

export const ALL_ROUNDER = "All-rounder";

export const POSITION_CHOICES = [...STANDARD_POSITIONS, ALL_ROUNDER] as const;

export type StandardPosition = (typeof STANDARD_POSITIONS)[number];
export type PositionChoice = (typeof POSITION_CHOICES)[number];

const LEGACY: Record<string, StandardPosition> = {
  GK: "Goalkeeper",
  RB: "Right back",
  CB: "Centre back",
  LB: "Left back",
  DM: "Defensive midfielder",
  CDM: "Defensive midfielder",
  CM: "Central midfielder",
  AM: "Attacking midfielder",
  CAM: "Attacking midfielder",
  RW: "Right winger",
  LW: "Left winger",
  ST: "Striker",
};

export function isStandardPosition(value: string): value is StandardPosition {
  return (STANDARD_POSITIONS as readonly string[]).includes(value);
}

export function isPositionChoice(value: string): value is PositionChoice {
  return (POSITION_CHOICES as readonly string[]).includes(value);
}

export function normalizePositions(
  position: string,
  positions?: string[],
): { position: PositionChoice; positions: StandardPosition[] } {
  if (position === ALL_ROUNDER || position.startsWith(`${ALL_ROUNDER} (`)) {
    const inside = position.startsWith(`${ALL_ROUNDER} (`) ? position.slice(ALL_ROUNDER.length + 2, -1) : "";
    const parsed = inside.split(",").map((item) => item.trim()).filter(isStandardPosition);
    const chosen = new Set([...(positions ?? []), ...parsed]);
    return { position: ALL_ROUNDER, positions: STANDARD_POSITIONS.filter((item) => chosen.has(item)) };
  }
  if (isStandardPosition(position)) return { position, positions: [] as StandardPosition[] };
  const legacy = LEGACY[position.trim().toUpperCase()];
  return { position: legacy ?? "Central midfielder", positions: [] as StandardPosition[] };
}

export function formatPosition(player: { position: string; positions?: string[] }) {
  const stored = normalizePositions(player.position, player.positions);
  if (stored.position === ALL_ROUNDER && stored.positions.length > 0) {
    return `${ALL_ROUNDER} (${stored.positions.join(", ")})`;
  }
  return stored.position;
}

export function playsInGoal(position: string, positions?: string[]) {
  const stored = normalizePositions(position, positions);
  return stored.position === "Goalkeeper" || stored.positions.includes("Goalkeeper");
}
