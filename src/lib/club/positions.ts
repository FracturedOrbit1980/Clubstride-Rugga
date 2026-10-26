export const STANDARD_POSITIONS = [
  "Loosehead prop",
  "Hooker",
  "Tighthead prop",
  "Lock",
  "Blindside flanker",
  "Openside flanker",
  "No. 8",
  "Scrum-half",
  "Fly-half",
  "Left wing",
  "Inside centre",
  "Outside centre",
  "Right wing",
  "Fullback",
] as const;

export const ALL_ROUNDER = "Utility";

export const DEFAULT_POSITION = "Fly-half";

export const POSITION_CHOICES = [...STANDARD_POSITIONS, ALL_ROUNDER] as const;

export type StandardPosition = (typeof STANDARD_POSITIONS)[number];
export type PositionChoice = (typeof POSITION_CHOICES)[number];

const JERSEY: Record<StandardPosition, number> = {
  "Loosehead prop": 1,
  Hooker: 2,
  "Tighthead prop": 3,
  Lock: 4,
  "Blindside flanker": 6,
  "Openside flanker": 7,
  "No. 8": 8,
  "Scrum-half": 9,
  "Fly-half": 10,
  "Left wing": 11,
  "Inside centre": 12,
  "Outside centre": 13,
  "Right wing": 14,
  Fullback: 15,
};

const POSITION_BY_NUMBER: Record<number, StandardPosition> = {
  1: "Loosehead prop",
  2: "Hooker",
  3: "Tighthead prop",
  4: "Lock",
  5: "Lock",
  6: "Blindside flanker",
  7: "Openside flanker",
  8: "No. 8",
  9: "Scrum-half",
  10: "Fly-half",
  11: "Left wing",
  12: "Inside centre",
  13: "Outside centre",
  14: "Right wing",
  15: "Fullback",
};

const LEGACY: Record<string, StandardPosition> = {
  GK: "Fullback",
  Goalkeeper: "Fullback",
  RB: "Right wing",
  "Right back": "Right wing",
  CB: "Inside centre",
  "Centre back": "Inside centre",
  LB: "Left wing",
  "Left back": "Left wing",
  DM: "Fly-half",
  CDM: "Fly-half",
  "Defensive midfielder": "Fly-half",
  CM: "Fly-half",
  "Central midfielder": "Fly-half",
  AM: "Fly-half",
  CAM: "Fly-half",
  "Attacking midfielder": "Fly-half",
  RW: "Right wing",
  "Right winger": "Right wing",
  LW: "Left wing",
  "Left winger": "Left wing",
  ST: "Inside centre",
  Striker: "Inside centre",
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
  const legacy = LEGACY[position.trim()];
  return { position: legacy ?? DEFAULT_POSITION, positions: [] as StandardPosition[] };
}

export function formatPosition(player: { position: string; positions?: string[] }) {
  const stored = normalizePositions(player.position, player.positions);
  if (stored.position === ALL_ROUNDER && stored.positions.length > 0) {
    return `${ALL_ROUNDER} (${stored.positions.join(", ")})`;
  }
  return stored.position;
}

/** Rugby jersey number for a position, used to order the match-day line-up. */
export function positionNumber(position: string, positions?: string[]) {
  const stored = normalizePositions(position, positions);
  if (stored.position === ALL_ROUNDER) return 0;
  return JERSEY[stored.position];
}

/** Starting position for a jersey number, used when a roster is imported by shirt number. */
export function positionForNumber(number: number) {
  return POSITION_BY_NUMBER[number];
}
