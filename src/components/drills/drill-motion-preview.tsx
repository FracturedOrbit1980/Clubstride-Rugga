"use client";

import { useId, useState } from "react";

import { MarkShape, PieceShape, PitchLines } from "@/components/drills/drill-board";
import { useSlideTravel } from "@/components/drills/slide-motion";
import { blendFrames, boardColors, pitchFill, PITCH_WINDOW, type DrillBoard } from "@/lib/club/board";

export function DrillMotionPreview({
  board,
  size = "sm",
}: {
  board: DrillBoard;
  size?: "sm" | "md";
}) {
  const markerId = `preview-${useId().replace(/:/g, "")}`;
  const frames = board.frames.length > 0 ? board.frames : [{ id: "empty", pieces: [], marks: [] }];
  const moving = frames.length > 1;
  const [slide, setSlide] = useState(0);
  const travel = useSlideTravel(moving, board.speed, () => {
    setSlide((current) => (current + 1) % frames.length);
  });

  const index = Math.min(slide, frames.length - 1);
  const from = frames[index] ?? frames[0];
  const to = frames[(index + 1) % frames.length] ?? from;
  const shown = moving ? blendFrames(from, to, travel) : from;
  const windowBox = PITCH_WINDOW[board.view];
  const box = size === "sm" ? "h-16 w-24" : "h-28 w-44";

  return (
    <svg
      viewBox={`${windowBox.x} ${windowBox.y} ${windowBox.width} ${windowBox.height}`}
      data-preview="drill"
      data-playing={moving ? "true" : "false"}
      data-frame-count={frames.length}
      data-frame={index}
      role="img"
      aria-hidden="true"
      className={`pointer-events-none shrink-0 rounded-lg ${box}`}
      style={{ backgroundColor: pitchFill(board) }}
      data-pitch-color={pitchFill(board)}
    >
      <defs>
        <marker id={markerId} markerWidth="2.2" markerHeight="2.2" refX="1.8" refY="1.1" orient="auto">
          <path d="M0 0 L2.2 1.1 L0 2.2 Z" fill="#f8fafc" />
        </marker>
      </defs>
      <PitchLines view={board.view} />
      {shown.marks.map((mark) => (
        <g key={mark.id} data-mark-kind={mark.kind}>
          <MarkShape mark={mark} markerId={markerId} />
        </g>
      ))}
      {shown.pieces.map((piece) => (
        <g key={piece.id} data-piece-id={piece.id} transform={`translate(${piece.x} ${piece.y})`}>
          <PieceShape
            piece={{ ...piece, x: 0, y: 0 }}
            colors={boardColors(board)}
            selected={false}
            onPointerDown={() => undefined}
          />
        </g>
      ))}
    </svg>
  );
}
