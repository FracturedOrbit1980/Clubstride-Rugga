"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

import { MannequinFigure } from "@/components/pitch/mannequin-figure";
import { DEFAULT_PITCH_COLOR, DEFAULT_PLAYER_COLOR } from "@/lib/club/board";
import { positionNumber } from "@/lib/club/positions";
import type { CustomFormation } from "@/lib/club/seed";
import type { PlayerMatchState } from "@/stores/match-store";

export const FORMATIONS = ["Standard XV", "12-a-side", "10-a-side", "7-a-side"] as const;

export type FormationName = (typeof FORMATIONS)[number];

export const FORMATION_GROUPS: {
  id: string;
  label: string;
  formations: FormationName[];
}[] = [
  { id: "senior", label: "U14 and older · 15-a-side", formations: ["Standard XV"] },
  { id: "u12-u13", label: "U12 and U13 · 12-a-side", formations: ["12-a-side"] },
  { id: "u10-u11", label: "U10 and U11 · 10-a-side", formations: ["10-a-side"] },
  { id: "u6-u9", label: "U6 to U9 · 7-a-side", formations: ["7-a-side"] },
];

/** Slots follow the numbered jersey order: forwards first, then the backline. */
const SLOTS: Record<FormationName, { x: number; y: number }[]> = {
  "Standard XV": [
    { x: 58, y: 27 },
    { x: 55, y: 32 },
    { x: 58, y: 37 },
    { x: 63, y: 24 },
    { x: 63, y: 40 },
    { x: 68, y: 19 },
    { x: 68, y: 45 },
    { x: 72, y: 32 },
    { x: 50, y: 32 },
    { x: 44, y: 32 },
    { x: 30, y: 52 },
    { x: 37, y: 40 },
    { x: 37, y: 24 },
    { x: 30, y: 12 },
    { x: 19, y: 32 },
  ],
  "12-a-side": [
    { x: 58, y: 27 },
    { x: 55, y: 32 },
    { x: 58, y: 37 },
    { x: 63, y: 24 },
    { x: 63, y: 40 },
    { x: 69, y: 32 },
    { x: 50, y: 32 },
    { x: 43, y: 32 },
    { x: 36, y: 40 },
    { x: 36, y: 24 },
    { x: 28, y: 52 },
    { x: 28, y: 12 },
  ],
  "10-a-side": [
    { x: 58, y: 27 },
    { x: 55, y: 32 },
    { x: 58, y: 37 },
    { x: 63, y: 24 },
    { x: 63, y: 40 },
    { x: 50, y: 32 },
    { x: 42, y: 32 },
    { x: 34, y: 32 },
    { x: 26, y: 52 },
    { x: 26, y: 12 },
  ],
  "7-a-side": [
    { x: 57, y: 27 },
    { x: 54, y: 32 },
    { x: 57, y: 37 },
    { x: 50, y: 32 },
    { x: 42, y: 32 },
    { x: 34, y: 26 },
    { x: 24, y: 40 },
  ],
};

export function placeOnPitch(players: PlayerMatchState[], formation: FormationName) {
  return placeInSlots(players, SLOTS[formation] ?? []);
}

function lineUpOrder(player: PlayerMatchState) {
  const jersey = positionNumber(player.position);
  return jersey > 0 ? jersey : 100 + player.squadNumber;
}

export function placeInSlots(players: PlayerMatchState[], slots: { x: number; y: number }[]) {
  const ordered = players
    .filter((player) => player.isOnPitch)
    .sort((a, b) => lineUpOrder(a) - lineUpOrder(b) || a.squadNumber - b.squadNumber);
  return ordered.slice(0, slots.length).flatMap((player, index) => {
    const slot = slots[index];
    return slot ? [{ player, x: slot.x, y: slot.y }] : [];
  });
}

export function nextCustomFormationName(formations: { name: string }[]) {
  const used = new Set(formations.map((formation) => formation.name.toLowerCase()));
  let count = 1;
  while (used.has(`custom shape ${count}`)) count += 1;
  return `Custom shape ${count}`;
}

export function isFormationName(value: string): value is FormationName {
  return (FORMATIONS as readonly string[]).includes(value);
}

export function FormationPitch({
  formation,
  players,
  emptyMessage,
  positions,
  onMove,
  fieldColor = DEFAULT_PITCH_COLOR,
}: {
  formation: string;
  players: PlayerMatchState[];
  emptyMessage: string | null;
  positions?: { playerId: string; x: number; y: number }[];
  onMove?: (playerId: string, x: number, y: number) => void;
  fieldColor?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragId = useRef<string | null>(null);
  const base = isFormationName(formation) ? placeOnPitch(players, formation) : [];
  const placed = (positions ?? base.map((item) => ({ playerId: item.player.playerId, x: item.x, y: item.y })))
    .map((spot) => {
      const player = players.find((item) => item.playerId === spot.playerId && item.isOnPitch);
      return player ? { player, x: spot.x, y: spot.y } : null;
    })
    .filter((item): item is { player: PlayerMatchState; x: number; y: number } => item !== null);

  function pointFrom(event: ReactPointerEvent<SVGElement>) {
    const svg = svgRef.current;
    if (!svg) return null;
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    const raw = svg.createSVGPoint();
    raw.x = event.clientX;
    raw.y = event.clientY;
    const point = raw.matrixTransform(matrix.inverse());
    return {
      x: Math.min(98, Math.max(2, point.x)),
      y: Math.min(62, Math.max(2, point.y)),
    };
  }

  return (
    <div className="flex min-w-0 flex-col">
      <svg
        ref={svgRef}
        viewBox="0 0 100 64"
        className="match-pitch-svg h-auto w-full max-w-full rounded-lg"
        style={{ backgroundColor: fieldColor }}
        data-pitch="match"
        data-pitch-color={fieldColor}
        role="img"
        aria-label={`${formation} line-up`}
        data-formation={formation}
        data-placed={placed.length}
        onPointerMove={(event) => {
          if (!dragId.current || !onMove) return;
          const point = pointFrom(event);
          if (!point) return;
          onMove(dragId.current, point.x, point.y);
        }}
        onPointerUp={() => {
          dragId.current = null;
        }}
        onPointerCancel={() => {
          dragId.current = null;
        }}
      >
        <g fill="none" stroke="#fff6f5" strokeWidth="0.6">
          <rect x="1" y="1" width="98" height="62" />
          <rect x="1" y="1" width="7" height="62" fill="#fff6f5" fillOpacity="0.06" stroke="none" />
          <rect x="92" y="1" width="7" height="62" fill="#fff6f5" fillOpacity="0.06" stroke="none" />
          <line x1="8" y1="1" x2="8" y2="63" />
          <line x1="92" y1="1" x2="92" y2="63" />
          <line x1="50" y1="1" x2="50" y2="63" />
          <line x1="26.5" y1="1" x2="26.5" y2="63" />
          <line x1="73.5" y1="1" x2="73.5" y2="63" />
          <g strokeDasharray="1.2 1" strokeOpacity="0.8">
            <line x1="41.6" y1="1" x2="41.6" y2="63" />
            <line x1="58.4" y1="1" x2="58.4" y2="63" />
            <line x1="8" y1="5" x2="92" y2="5" />
            <line x1="8" y1="59" x2="92" y2="59" />
          </g>
          <g strokeWidth="0.8">
            <path d="M8 28 v8 M6.4 28 h1.6 M6.4 36 h1.6" />
            <path d="M92 28 v8 M93.6 28 h-1.6 M93.6 36 h-1.6" />
          </g>
        </g>
        {placed.map(({ player, x, y }) => (
          <g
            key={player.playerId}
            data-player-id={player.playerId}
            data-x={x}
            data-y={y}
            transform={`translate(${x} ${y})`}
            className="cursor-grab touch-none"
            onPointerDown={(event) => {
              if (!onMove) return;
              event.preventDefault();
              event.stopPropagation();
              dragId.current = player.playerId;
              try {
                event.currentTarget.setPointerCapture(event.pointerId);
              } catch {
                /* the field still follows the pointer */
              }
            }}
            onPointerMove={(event) => {
              if (dragId.current !== player.playerId || !onMove) return;
              const point = pointFrom(event);
              if (!point) return;
              onMove(player.playerId, point.x, point.y);
            }}
            onPointerUp={() => {
              if (dragId.current === player.playerId) dragId.current = null;
            }}
          >
            <circle r="4" fill="transparent" />
            <MannequinFigure
              fill={DEFAULT_PLAYER_COLOR}
              ring="#ffffff"
              label={String(player.squadNumber)}
            />
          </g>
        ))}
      </svg>
      {emptyMessage ? <p className="mt-2 text-sm font-semibold text-slate-800">{emptyMessage}</p> : null}
    </div>
  );
}

export type { CustomFormation };
