import {
  DEFAULT_OPPONENT_COLOR,
  DEFAULT_PITCH_COLOR,
  DEFAULT_PLAYER_COLOR,
  boardHasPattern,
  type BoardFrame,
  type BoardMark,
  type BoardPiece,
  type DrillBoard,
  type MarkKind,
  type SessionPhase,
} from "@/lib/club/board";
import type { DrillType, MomentOfGame } from "@/lib/club/catalog";
import { clubLibrary } from "@/lib/club/library";

function player(id: string, x: number, y: number, label: string, team: "player" | "opponent" = "player"): BoardPiece {
  return { id, kind: "player", x, y, label, team };
}

function keeper(id: string, x: number, y: number): BoardPiece {
  return { id, kind: "keeper", x, y, label: "GK", team: "player" };
}

function cone(id: string, x: number, y: number): BoardPiece {
  return { id, kind: "cone", x, y, label: "" };
}

function line(id: string, x1: number, y1: number, x2: number, y2: number, kind: MarkKind): BoardMark {
  return { id, kind, points: [{ x: x1, y: y1 }, { x: x2, y: y2 }] };
}

function slide(id: string, pieces: BoardPiece[], marks: BoardMark[]): BoardFrame {
  return { id, pieces, marks };
}

function phaseFor(id: string): SessionPhase {
  if (id.endsWith("_wu")) return "Warm-up";
  if (id.endsWith("_tp")) return "Technical";
  if (id.endsWith("_sp") || id.endsWith("094")) return "Skill";
  if (id.endsWith("_ssg")) return "Small-sided game";
  return "Game";
}

function pairs(nudge: number): BoardFrame[] {
  const y = 26 + (nudge % 3) * 3;
  return [
    slide(
      "slide-1",
      [player("a", 24, y, "1"), player("b", 70, y, "2"), cone("c1", 18, y + 10), cone("c2", 78, y + 10)],
      [line("pass", 28, y, 64, y, "pass"), line("run", 70, y + 4, 78, y - 8, "run")],
    ),
    slide(
      "slide-2",
      [player("a", 46, y - 12, "1"), player("b", 58, y + 12, "2"), cone("c1", 18, y + 10), cone("c2", 78, y + 10)],
      [line("pass", 56, y + 8, 46, y - 8, "pass"), line("run", 46, y - 6, 30, y - 16, "run")],
    ),
    slide(
      "slide-3",
      [player("a", 72, y, "1"), player("b", 26, y + 4, "2"), cone("c1", 18, y + 10), cone("c2", 78, y + 10)],
      [line("pass", 66, y, 32, y + 2, "pass"), line("run", 26, y, 18, y - 8, "run")],
    ),
  ];
}

function lineShape(nudge: number): BoardFrame[] {
  const x = 28 + (nudge % 2) * 4;
  return [
    slide(
      "slide-1",
      [player("a", x, 16, "1"), player("b", x, 32, "2"), player("c", x, 48, "3"), cone("c1", x + 16, 16), cone("c2", x + 16, 48)],
      [line("press", x + 6, 14, x + 6, 50, "press"), line("run", x + 4, 32, x + 14, 32, "run")],
    ),
    slide(
      "slide-2",
      [player("a", x + 22, 14, "1"), player("b", x + 22, 32, "2"), player("c", x + 22, 50, "3"), cone("c1", x + 16, 16), cone("c2", x + 16, 48)],
      [line("press", x + 28, 12, x + 28, 52, "press"), line("run", x + 22, 32, x + 36, 24, "run")],
    ),
    slide(
      "slide-3",
      [player("a", x + 40, 16, "1"), player("b", x + 40, 32, "2"), player("c", x + 40, 48, "3"), cone("c1", x + 16, 16), cone("c2", x + 16, 48)],
      [line("press", x + 46, 14, x + 46, 50, "press"), line("run", x + 40, 32, x + 54, 20, "run")],
    ),
  ];
}

function boxPass(): BoardFrame[] {
  return [
    slide(
      "slide-1",
      [player("a", 28, 18, "1"), player("b", 72, 18, "2"), player("c", 72, 46, "3"), player("d", 28, 46, "4"), cone("c1", 36, 32)],
      [line("pass", 32, 20, 66, 20, "pass"), line("run", 72, 22, 72, 40, "run")],
    ),
    slide(
      "slide-2",
      [player("a", 36, 24, "1"), player("b", 64, 24, "2"), player("c", 64, 42, "3"), player("d", 36, 42, "4"), cone("c1", 36, 32)],
      [line("pass", 64, 28, 64, 38, "pass"), line("run", 60, 42, 40, 42, "run")],
    ),
    slide(
      "slide-3",
      [player("a", 30, 46, "1"), player("b", 48, 18, "2"), player("c", 74, 28, "3"), player("d", 52, 46, "4"), cone("c1", 36, 32)],
      [line("pass", 70, 32, 54, 44, "pass"), line("run", 48, 46, 32, 46, "run")],
    ),
  ];
}

function pressAngle(): BoardFrame[] {
  return [
    slide(
      "slide-1",
      [player("a", 30, 32, "1"), player("b", 68, 20, "2", "opponent"), cone("c1", 22, 20), cone("c2", 22, 44)],
      [line("pass", 34, 30, 52, 28, "dribble"), line("press", 64, 22, 48, 30, "press")],
    ),
    slide(
      "slide-2",
      [player("a", 42, 34, "1"), player("b", 52, 28, "2", "opponent"), cone("c1", 22, 20), cone("c2", 22, 44)],
      [line("pass", 40, 36, 28, 40, "dribble"), line("press", 50, 26, 40, 34, "press")],
    ),
    slide(
      "slide-3",
      [player("a", 22, 44, "1"), player("b", 34, 38, "2", "opponent"), cone("c1", 22, 20), cone("c2", 22, 44)],
      [line("pass", 24, 42, 16, 48, "dribble"), line("press", 32, 36, 22, 42, "press")],
    ),
  ];
}

function attack(): BoardFrame[] {
  return [
    slide(
      "slide-1",
      [
        player("a", 22, 20, "1"),
        player("b", 22, 44, "2"),
        player("c", 38, 32, "3"),
        player("d", 62, 22, "4", "opponent"),
        player("e", 62, 44, "5", "opponent"),
        keeper("gk", 88, 32),
      ],
      [line("pass", 26, 22, 36, 30, "pass"), line("run", 38, 28, 54, 18, "run")],
    ),
    slide(
      "slide-2",
      [
        player("a", 48, 16, "1"),
        player("b", 40, 46, "2"),
        player("c", 58, 32, "3"),
        player("d", 72, 24, "4", "opponent"),
        player("e", 74, 42, "5", "opponent"),
        keeper("gk", 90, 32),
      ],
      [line("pass", 50, 18, 58, 30, "pass"), line("run", 58, 28, 78, 28, "run")],
    ),
    slide(
      "slide-3",
      [
        player("a", 72, 14, "1"),
        player("b", 56, 48, "2"),
        player("c", 76, 30, "3"),
        player("d", 82, 20, "4", "opponent"),
        player("e", 84, 42, "5", "opponent"),
        keeper("gk", 92, 32),
      ],
      [line("pass", 74, 28, 88, 30, "pass"), line("run", 72, 16, 86, 22, "run")],
    ),
  ];
}

function rondo(): BoardFrame[] {
  return [
    slide(
      "slide-1",
      [
        player("a", 28, 16, "1"),
        player("b", 72, 16, "2"),
        player("c", 72, 48, "3"),
        player("d", 28, 48, "4"),
        player("e", 44, 28, "5", "opponent"),
        player("f", 56, 36, "6", "opponent"),
      ],
      [line("pass", 32, 18, 66, 18, "pass"), line("press", 46, 30, 58, 22, "press")],
    ),
    slide(
      "slide-2",
      [
        player("a", 30, 18, "1"),
        player("b", 70, 22, "2"),
        player("c", 68, 46, "3"),
        player("d", 32, 46, "4"),
        player("e", 52, 20, "5", "opponent"),
        player("f", 58, 30, "6", "opponent"),
      ],
      [line("pass", 68, 24, 66, 42, "pass"), line("press", 54, 22, 66, 28, "press")],
    ),
    slide(
      "slide-3",
      [
        player("a", 34, 22, "1"),
        player("b", 66, 16, "2"),
        player("c", 64, 46, "3"),
        player("d", 30, 46, "4"),
        player("e", 48, 32, "5", "opponent"),
        player("f", 56, 34, "6", "opponent"),
      ],
      [line("pass", 60, 44, 36, 44, "pass"), line("press", 50, 30, 40, 40, "press")],
    ),
  ];
}

function smallSided(): BoardFrame[] {
  return [
    slide(
      "slide-1",
      [
        player("a", 24, 18, "1"),
        player("b", 24, 34, "2"),
        player("c", 36, 46, "3"),
        player("d", 70, 18, "4", "opponent"),
        player("e", 78, 34, "5", "opponent"),
        player("f", 66, 48, "6", "opponent"),
        cone("c1", 50, 12),
        cone("c2", 50, 52),
      ],
      [line("pass", 28, 20, 46, 16, "pass"), line("run", 36, 42, 52, 36, "run")],
    ),
    slide(
      "slide-2",
      [
        player("a", 42, 16, "1"),
        player("b", 40, 32, "2"),
        player("c", 54, 44, "3"),
        player("d", 78, 22, "4", "opponent"),
        player("e", 84, 36, "5", "opponent"),
        player("f", 74, 50, "6", "opponent"),
        cone("c1", 50, 12),
        cone("c2", 50, 52),
      ],
      [line("pass", 44, 18, 58, 28, "pass"), line("run", 54, 40, 72, 30, "run")],
    ),
    slide(
      "slide-3",
      [
        player("a", 64, 14, "1"),
        player("b", 60, 28, "2"),
        player("c", 72, 40, "3"),
        player("d", 86, 16, "4", "opponent"),
        player("e", 90, 32, "5", "opponent"),
        player("f", 84, 48, "6", "opponent"),
        cone("c1", 50, 12),
        cone("c2", 50, 52),
      ],
      [line("pass", 66, 16, 80, 18, "pass"), line("run", 72, 36, 84, 28, "run")],
    ),
  ];
}

function block(): BoardFrame[] {
  return [
    slide(
      "slide-1",
      [
        player("a", 30, 16, "1"),
        player("b", 30, 32, "2"),
        player("c", 30, 48, "3"),
        player("d", 48, 24, "4"),
        player("e", 62, 18, "5", "opponent"),
        player("f", 66, 34, "6", "opponent"),
        player("g", 62, 50, "7", "opponent"),
      ],
      [line("pass", 34, 32, 46, 26, "pass"), line("run", 48, 20, 58, 16, "run")],
    ),
    slide(
      "slide-2",
      [
        player("a", 46, 14, "1"),
        player("b", 44, 32, "2"),
        player("c", 46, 50, "3"),
        player("d", 60, 28, "4"),
        player("e", 74, 20, "5", "opponent"),
        player("f", 78, 36, "6", "opponent"),
        player("g", 74, 50, "7", "opponent"),
      ],
      [line("pass", 48, 30, 62, 22, "pass"), line("run", 60, 24, 74, 18, "run")],
    ),
    slide(
      "slide-3",
      [
        player("a", 60, 12, "1"),
        player("b", 58, 30, "2"),
        player("c", 60, 48, "3"),
        player("d", 74, 22, "4"),
        player("e", 86, 16, "5", "opponent"),
        player("f", 90, 34, "6", "opponent"),
        player("g", 86, 50, "7", "opponent"),
      ],
      [line("pass", 62, 28, 78, 18, "pass"), line("run", 74, 20, 88, 14, "run")],
    ),
  ];
}

function hashId(id: string) {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 33 + id.charCodeAt(index)) >>> 0;
  return hash;
}

function clamp(value: number, low: number, high: number) {
  return Math.max(low, Math.min(high, value));
}

function place(id: string, x: number, y: number, label: string, team: "player" | "opponent" = "player") {
  return player(id, clamp(x, 8, 92), clamp(y, 8, 56), label, team);
}

/** Three slides for a catalogue drill that is not one of the hand-built previews. */
function storyFrames(id: string, moment: MomentOfGame): BoardFrame[] {
  const hash = hashId(id);
  const attackers = 3 + (hash % 2);
  const defenders = moment === "IP" ? hash % 5 : 1 + ((hash >> 4) % 2);
  const baseX = 18 + (hash % 10);
  const baseY = 14 + ((hash >> 6) % 8);
  const coneA = cone("c0", clamp(baseX + 4, 8, 92), clamp(baseY + 22, 8, 56));
  const coneB = cone("c1", clamp(baseX + 34, 8, 92), clamp(baseY + 6, 8, 56));
  const frames: BoardFrame[] = [];

  for (let step = 0; step < 3; step += 1) {
    const pieces: BoardPiece[] = [];
    for (let index = 0; index < attackers; index += 1) {
      let x = baseX + index * 12;
      let y = baseY + (index % 2) * 14;
      if (moment === "IP") {
        x = baseX + ((index + step) % attackers) * 16;
        y = baseY + ((index + step * 2) % 3) * 12;
      } else if (moment === "T2A") {
        x = baseX + step * 16 + index * 7;
        y = baseY + (index % 2) * 12 - step * 3;
      } else if (moment === "OOP") {
        x = baseX + step * 8 + (index === 0 ? step * 6 : 0);
        y = baseY + index * 11;
      } else {
        x = baseX + (index === 0 ? step * 12 : -step * 5) + index * 8;
        y = baseY + index * 10 + (index === 0 ? step * 2 : -step);
      }
      pieces.push(place(`p${index}`, x, y, String(index + 1)));
    }
    for (let index = 0; index < defenders; index += 1) {
      let x = 72 - step * 8 + index * 10;
      let y = 18 + index * 14;
      if (moment === "T2A") {
        x = 80 - step * 4 + index * 6;
        y = 20 + index * 14;
      } else if (moment === "T2D") {
        x = 64 - step * 14 + index * 8;
        y = 22 + index * 12 - step * 2;
      } else if (moment === "OOP") {
        x = 46 + step * 10 + index * 6;
        y = 16 + index * 16;
      }
      pieces.push(place(`o${index}`, x, y, String(attackers + index + 1), "opponent"));
    }
    pieces.push(coneA, coneB);

    const lead = pieces.find((piece) => piece.id === "p0")!;
    const next = pieces.find((piece) => piece.id === "p1")!;
    const target = pieces.find((piece) => piece.id === (moment === "IP" ? "p2" : "o0")) ?? next;
    const travel: MarkKind = moment === "OOP" || moment === "T2D" ? "press" : "pass";
    const support: MarkKind = moment === "IP" ? "pass" : moment === "T2A" ? "run" : "press";
    frames.push(
      slide(`slide-${step + 1}`, pieces, [
        line("m1", lead.x + 2, lead.y, next.x - 2, next.y, travel),
        line("m2", next.x, next.y + 2, target.x, target.y - 2, support),
      ]),
    );
  }
  return frames;
}

function phaseFromType(type: DrillType): SessionPhase {
  if (type === "WU") return "Warm-up";
  if (type === "TP") return "Technical";
  if (type === "SP" || type === "Rondo") return "Skill";
  if (type === "SSG") return "Small-sided game";
  return "Game";
}

function framesFor(id: string, index: number): BoardFrame[] {
  if (id === "drill_uefa_oop_wu") return lineShape(index);
  if (id === "drill_uefa_oop_tp") return pressAngle();
  if (id === "drill_uefa_att_094") return rondo();
  if (id.endsWith("_wu")) return pairs(index);
  if (id.endsWith("_tp")) return boxPass();
  if (id.endsWith("_sp")) return attack();
  if (id.endsWith("_ssg")) return smallSided();
  return block();
}

const LIBRARY_IDS = [
  "drill_uefa_ip_wu",
  "drill_uefa_ip_tp",
  "drill_uefa_ip_sp",
  "drill_uefa_ip_pop",
  "drill_uefa_ip_ssg",
  "drill_uefa_ip_11",
  "drill_uefa_oop_wu",
  "drill_uefa_oop_tp",
  "drill_uefa_oop_sp",
  "drill_uefa_oop_pop",
  "drill_uefa_oop_ssg",
  "drill_uefa_oop_11",
  "drill_uefa_t2a_wu",
  "drill_uefa_t2a_tp",
  "drill_uefa_t2a_sp",
  "drill_uefa_t2a_pop",
  "drill_uefa_t2a_ssg",
  "drill_uefa_t2a_11",
  "drill_uefa_t2d_wu",
  "drill_uefa_t2d_tp",
  "drill_uefa_att_094",
  "drill_uefa_t2d_pop",
  "drill_uefa_t2d_ssg",
  "drill_uefa_t2d_11",
] as const;

const HAND_BUILT = new Set<string>(LIBRARY_IDS);

export const libraryBoards: Record<string, DrillBoard> = Object.fromEntries(
  clubLibrary.map((item, index) => {
    const frames = HAND_BUILT.has(item.id) ? framesFor(item.id, index) : storyFrames(item.id, item.moment);
    if (frames.length < 3) throw new Error(`${item.id} needs three slides`);
    return [
      item.id,
      {
        view: "full" as const,
        phase: HAND_BUILT.has(item.id) ? phaseFor(item.id) : phaseFromType(item.drillType),
        speed: 1,
        playerColor: DEFAULT_PLAYER_COLOR,
        opponentColor: DEFAULT_OPPONENT_COLOR,
        pitchColor: DEFAULT_PITCH_COLOR,
        frames,
      },
    ];
  }),
);

function isGeneratedPreview(board: DrillBoard | undefined) {
  if (!boardHasPattern(board)) return true;
  return board!.frames.every((frame) => /^slide-\d+$/.test(frame.id)) && board!.frames.length < 3;
}

/** Keep a coach's saved layout. Refresh a generated library preview that is still shorter than three slides. */
export function mergeLibraryBoards(saved: Record<string, DrillBoard> | undefined) {
  const next = { ...(saved ?? {}) };
  for (const [id, board] of Object.entries(libraryBoards)) {
    if (isGeneratedPreview(next[id])) next[id] = board;
  }
  return next;
}
