import {
  DRILL_LEVELS,
  DRILL_TYPES,
  MOMENTS_OF_GAME,
  SKILL_LEVELS,
  type DrillLevel,
  type DrillTemplate,
  type DrillType,
  type MomentOfGame,
  type LicenseLevel,
  type PlayerCount,
  type SkillLevel,
} from "@/lib/club/catalog";

export { drillTitle } from "@/lib/club/catalog";
import { ageNumber } from "@/lib/club/age";
import { clubLibrary } from "@/lib/club/library";
import type { ClubDrill } from "@/lib/club/seed";

const OLD_LEVEL: Record<string, DrillLevel> = {
  Beginner: "Youth U9-12",
  Intermediate: "Youth U13-16",
  Professional: "Senior Amateur",
};

export function momentLabel(id: MomentOfGame) {
  return MOMENTS_OF_GAME.find((item) => item.id === id)?.label ?? id;
}

export function drillTypeLabel(id: DrillType) {
  return DRILL_TYPES.find((item) => item.id === id)?.label ?? id;
}

export function isMoment(value: string | undefined): value is MomentOfGame {
  return MOMENTS_OF_GAME.some((item) => item.id === value);
}

export function isDrillType(value: string | undefined): value is DrillType {
  return DRILL_TYPES.some((item) => item.id === value);
}

export function isDrillLevel(value: string | undefined): value is DrillLevel {
  return (DRILL_LEVELS as readonly string[]).includes(value ?? "");
}

export function isSkillLevel(value: string | undefined): value is SkillLevel {
  return (SKILL_LEVELS as readonly string[]).includes(value ?? "");
}

export function youthAgeOf(drill: { youthAge?: number; targetAgeGroup?: string; ageBand?: string }) {
  const direct = Number(drill.youthAge);
  if (direct >= 6 && direct <= 13) return direct;
  const named = ageNumber(drill.targetAgeGroup ?? "") ?? ageNumber(drill.ageBand ?? "");
  if (named !== null && named >= 6 && named <= 13) return named;
  return 13;
}

export function skillOf(drill: { skillLevel?: string; level?: string }): SkillLevel {
  if (isSkillLevel(drill.skillLevel)) return drill.skillLevel;
  if (drill.level === "Youth U13-16") return "Intermediate";
  if (drill.level === "Senior Amateur" || drill.level === "Pro") return "Professional";
  return "Beginner";
}

function oneSentence(text: string) {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  const first = trimmed.split(/(?<=[.!?])\s+/)[0] ?? trimmed;
  return /[.!?]$/.test(first) ? first : `${first}.`;
}

function setupSentence(pitchSetup?: string, dimensions?: string, playerSetup?: string) {
  const raw = (pitchSetup || [dimensions, playerSetup].filter(Boolean).join(", ")).trim();
  if (!raw) return "Set the players out on the pitch.";
  const bits = raw
    .split(/(?<=\.)\s+/)
    .map((bit) => bit.replace(/[.]+$/, "").trim())
    .filter(Boolean)
    .map((bit, index) => (index === 0 ? bit : `${bit.charAt(0).toLowerCase()}${bit.slice(1)}`));
  const joined = bits.join(", ");
  const body = `${joined.charAt(0).toLowerCase()}${joined.slice(1)}`;
  if (/^(a|an|the)\b/i.test(body)) return `Set this up as ${body}.`;
  return `Set this up as a ${body}.`;
}

function coachingSentence(point?: string) {
  const raw = (point || "Watch the first action").trim().replace(/[.]+$/, "");
  if (/^ball close when turning$/i.test(raw)) return "Keep the ball close when turning.";
  if (/^width before the switch$/i.test(raw)) return "Use width before the switch.";
  if (/^numbers beyond the ball$/i.test(raw)) return "Get numbers beyond the ball.";
  if (/^first pass forward$/i.test(raw)) return "Play the first pass forward.";
  const text = `${raw.charAt(0).toUpperCase()}${raw.slice(1)}`;
  return `${text}.`;
}

/** Three plain sentences a coach can read before opening the drill. */
export function plainDrillBlurb(drill: {
  instructions?: string;
  pitchSetup?: string;
  dimensions?: string;
  playerSetup?: string;
  coachingPoints?: string[];
}) {
  const action = oneSentence(drill.instructions || "Players work the pattern on the pitch.");
  const setup = setupSentence(drill.pitchSetup, drill.dimensions, drill.playerSetup);
  const point = coachingSentence(drill.coachingPoints?.[0]);
  return `${action} ${setup} ${point}`;
}

export function playerCountLine(players: PlayerCount) {
  return `Attackers ${players.attackers} · Defenders ${players.defenders} · Neutrals ${players.neutrals} · Goalkeepers ${players.goalkeepers}`;
}

export function withUefaDrills(saved: Partial<ClubDrill>[] | undefined, baseline: ClubDrill[]): ClubDrill[] {
  const source = saved?.length ? saved : baseline;
  const custom: ClubDrill[] = [];
  const officialById = new Map<string, ClubDrill>();
  for (const raw of source) {
    if (!raw?.id) continue;
    const catalogue = clubLibrary.find((item) => item.id === raw.id);
    if (catalogue) {
      officialById.set(raw.id, {
        ...catalogue,
        isClubOfficial: raw.isClubOfficial ?? true,
        durationSeconds: raw.durationSeconds ?? catalogue.defaultDurationSeconds,
        videoUrl: typeof raw.videoUrl === "string" ? raw.videoUrl : "",
        videoName: typeof raw.videoName === "string" ? raw.videoName : "",
      });
    } else if (!(raw.isClubOfficial !== false && /^dr-\d{2}$/.test(raw.id))) {
      custom.push(normalizeCustomDrill(raw));
    }
  }
  const official = clubLibrary.map((template) => {
    return (
      officialById.get(template.id) ?? {
        ...template,
        durationSeconds: template.defaultDurationSeconds,
        videoUrl: "",
        videoName: "",
      }
    );
  });
  return [...custom, ...official];
}

function count(value: unknown) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(22, Math.max(0, Math.round(number)));
}

function meters(value: unknown) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(120, Math.max(0, Math.round(number)));
}

function textList(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function normalizeCustomDrill(raw: Partial<ClubDrill> & { objectiveCategory?: string }): ClubDrill {
  const legacy = raw as Partial<ClubDrill> & { objectiveCategory?: string };
  const drillType = isDrillType(raw.drillType) ? raw.drillType : typeFromLegacy(legacy.objectiveCategory, raw.diagram, raw.title);
  const level = isDrillLevel(raw.level) ? raw.level : OLD_LEVEL[raw.level ?? ""] ?? "Youth U9-12";
  const moment = isMoment(raw.moment) ? raw.moment : momentFromLegacy(drillType, raw.title);
  const players = raw.players ?? { attackers: 0, defenders: 0, neutrals: 0, goalkeepers: 0 };
  const title = (raw.title ?? "TP - New drill").trim().slice(0, 60) || "TP - New drill";
  return {
    id: raw.id || `dr-${Date.now()}`,
    title,
    isClubOfficial: raw.isClubOfficial ?? false,
    targetAgeGroup: raw.targetAgeGroup || "All ages",
    moment,
    drillType,
    level,
    focus: raw.focus ?? "",
    playerSetup: raw.playerSetup ?? "",
    constraint: raw.constraint ?? "",
    dimensions: raw.dimensions ?? "",
    workRest: raw.workRest ?? "",
    repetitions: Math.min(30, Math.max(1, count(raw.repetitions) || 1)),
    players: {
      attackers: count(players.attackers),
      defenders: count(players.defenders),
      neutrals: count(players.neutrals),
      goalkeepers: count(players.goalkeepers),
    },
    equipment: textList(raw.equipment),
    diagram: raw.diagram ?? "square",
    pitchSetup: raw.pitchSetup ?? "",
    instructions: raw.instructions ?? "",
    coachingPoints: textList(raw.coachingPoints),
    progressions: textList(raw.progressions),
    tags: textList(raw.tags),
    licenseLevel: licenseOf(raw.licenseLevel),
    ageBand: raw.ageBand || raw.targetAgeGroup || "All ages",
    youthAge: youthAgeOf(raw),
    skillLevel: skillOf(raw),
    minPlayers: count(raw.minPlayers) || count(players.attackers) + count(players.defenders) + count(players.neutrals),
    maxPlayers: count(raw.maxPlayers) || count(players.attackers) + count(players.defenders) + count(players.neutrals),
    pitchLengthM: meters(raw.pitchLengthM),
    pitchWidthM: meters(raw.pitchWidthM),
    defaultDurationSeconds: raw.defaultDurationSeconds ?? raw.durationSeconds ?? 300,
    durationSeconds: raw.durationSeconds ?? raw.defaultDurationSeconds ?? 300,
    videoUrl: raw.videoUrl ?? "",
    videoName: raw.videoName ?? "",
  };
}

function licenseOf(value: unknown): LicenseLevel {
  return value === "Grassroots" || value === "UEFA C" || value === "UEFA B" || value === "UEFA A" || value === "UEFA Pro"
    ? value
    : "Grassroots";
}

function typeFromLegacy(category: string | undefined, diagram: DrillTemplate["diagram"] | undefined, title: string | undefined): DrillType {
  const name = (title ?? "").toLowerCase();
  if (diagram === "rondo" || name.includes("rondo")) return "Rondo";
  if (category === "Physical") return "Physical";
  if (category === "Set Piece") return "PoP";
  if (category === "Technical") return name.includes("1v1") || name.includes("cutback") ? "SP" : "TP";
  if (category === "Tactical") return name.includes("4v4") || name.includes("possession") ? "SSG" : "PoP";
  return "TP";
}

function momentFromLegacy(type: DrillType, title: string | undefined): MomentOfGame {
  const name = (title ?? "").toLowerCase();
  if (name.includes("counter")) return "T2A";
  if (name.includes("recover") || name.includes("rest defence") || name.includes("rest defense")) return "T2D";
  if (type === "Physical" && name.includes("press")) return "OOP";
  if (name.includes("press") || name.includes("defend")) return "OOP";
  return "IP";
}
