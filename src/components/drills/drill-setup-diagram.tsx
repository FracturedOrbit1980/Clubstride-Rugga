import { MannequinFigure } from "@/components/pitch/mannequin-figure";
import { DEFAULT_OPPONENT_COLOR, DEFAULT_PLAYER_COLOR } from "@/lib/club/board";
import type { SetupDiagram } from "@/lib/club/catalog";

type DiagramProps = {
  diagram: SetupDiagram;
  pitchSetup: string;
  size?: "sm" | "md";
};

const frame = {
  sm: { width: 96, height: 64 },
  md: { width: 176, height: 112 },
};

export function DrillSetupDiagram({ diagram, pitchSetup, size = "md" }: DiagramProps) {
  const box = frame[size];
  return (
    <svg
      viewBox="0 0 160 100"
      width={box.width}
      height={box.height}
      role="img"
      aria-label={`Setup diagram. ${pitchSetup}`}
      className="shrink-0 rounded-lg bg-emerald-50 ring-1 ring-emerald-700"
    >
      <rect x="1" y="1" width="158" height="98" rx="8" fill="#ecfaf8" stroke="#0f766e" strokeWidth="2" />
      <SetupShape diagram={diagram} />
    </svg>
  );
}

function SetupShape({ diagram }: { diagram: SetupDiagram }) {
  switch (diagram) {
    case "ruck":
      return <Ruck />;
    case "maul":
      return <Maul />;
    case "scrum":
      return <Scrum />;
    case "lineout":
      return <Lineout />;
    case "backline":
      return <Backline />;
    case "kickoff":
      return <Kickoff />;
    case "gates":
      return <Gates />;
    case "lanes":
      return <Lanes />;
  }
}

function Cone({ x, y }: { x: number; y: number }) {
  return <polygon points={`${x},${y + 8} ${x - 6},${y + 16} ${x + 6},${y + 16}`} fill="#d97706" stroke="#78350f" strokeWidth="1" />;
}

function Player({ x, y, dark = false }: { x: number; y: number; dark?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(4.2)`}>
      <MannequinFigure fill={dark ? DEFAULT_OPPONENT_COLOR : DEFAULT_PLAYER_COLOR} ring="#ffffff" label="" />
    </g>
  );
}

function Ball({ x, y }: { x: number; y: number }) {
  return <ellipse cx={x} cy={y} rx="4.5" ry="2.8" fill="#fff" stroke="#0f172a" strokeWidth="1" transform={`rotate(-20 ${x} ${y})`} />;
}

function Ruck() {
  return (
    <g>
      <rect x="24" y="16" width="112" height="70" fill="none" stroke="#047857" strokeWidth="1.5" strokeDasharray="3 2" />
      <Ball x={80} y={54} />
      <Player x={68} y={46} />
      <Player x={88} y={50} />
      <Player x={76} y={72} dark />
      <Cone x={54} y={24} />
      <Cone x={100} y={24} />
      <path d="M58 62 C64 58 68 56 72 54" fill="none" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M100 70 C94 66 90 60 88 56" fill="none" stroke="#0f172a" strokeWidth="1.5" />
    </g>
  );
}

function Maul() {
  return (
    <g>
      <rect x="26" y="14" width="108" height="72" fill="none" stroke="#047857" strokeWidth="1.5" />
      <Player x={60} y={36} />
      <Player x={60} y={54} />
      <Player x={60} y={72} />
      <Ball x={72} y={54} />
      <Player x={92} y={36} dark />
      <Player x={92} y={54} dark />
      <Player x={92} y={72} dark />
      <path d="M70 46 H88" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M70 62 H88" stroke="#0f172a" strokeWidth="1.5" />
    </g>
  );
}

function Scrum() {
  return (
    <g>
      <rect x="18" y="18" width="124" height="64" fill="none" stroke="#047857" strokeWidth="1.5" />
      <Player x={62} y={32} />
      <Player x={62} y={50} />
      <Player x={62} y={68} />
      <Player x={82} y={32} dark />
      <Player x={82} y={50} dark />
      <Player x={82} y={68} dark />
      <Ball x={92} y={74} />
      <Player x={104} y={74} />
      <path d="M68 50 H78" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M68 66 H78" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M88 72 C90 72 91 73 92 74" fill="none" stroke="#0f172a" strokeWidth="1.2" />
    </g>
  );
}

function Lineout() {
  return (
    <g>
      <rect x="16" y="14" width="128" height="72" fill="none" stroke="#047857" strokeWidth="1.5" />
      <line x1="46" y1="20" x2="46" y2="82" stroke="#047857" strokeWidth="1.5" strokeDasharray="4 3" />
      <Player x={46} y={26} />
      <Player x={46} y={48} />
      <Player x={46} y={70} />
      <Player x={108} y={26} dark />
      <Player x={108} y={48} dark />
      <Player x={108} y={70} dark />
      <Ball x={60} y={50} />
      <path d="M60 50 C74 34 90 30 104 28" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="2 2" />
      <Cone x={22} y={76} />
    </g>
  );
}

function Backline() {
  return (
    <g>
      <rect x="12" y="14" width="136" height="72" fill="none" stroke="#047857" strokeWidth="1.5" />
      <Player x={30} y={50} />
      <Player x={54} y={34} />
      <Player x={78} y={50} />
      <Player x={102} y={34} />
      <Player x={126} y={50} />
      <Ball x={40} y={48} />
      <path d="M40 48 L50 36" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M60 34 C68 34 70 46 74 48" fill="none" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M84 50 C92 50 94 38 98 36" fill="none" stroke="#0f172a" strokeWidth="1.5" />
      <Player x={50} y={74} dark />
      <Player x={74} y={74} dark />
    </g>
  );
}

function Kickoff() {
  return (
    <g>
      <rect x="14" y="14" width="132" height="72" fill="none" stroke="#047857" strokeWidth="1.5" />
      <line x1="80" y1="14" x2="80" y2="86" stroke="#047857" strokeWidth="1.5" strokeDasharray="4 3" />
      <Player x={54} y={50} />
      <Ball x={64} y={46} />
      <path d="M66 46 C82 22 98 22 112 32" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="2 2" />
      <Player x={112} y={34} dark />
      <Player x={72} y={68} />
      <Player x={92} y={72} />
      <Cone x={118} y={74} />
    </g>
  );
}

function Gates() {
  return (
    <g>
      <path d="M36 28 v44 M52 28 v44" stroke="#d97706" strokeWidth="3" />
      <path d="M108 28 v44 M124 28 v44" stroke="#d97706" strokeWidth="3" />
      <path d="M52 50 H108" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
      <Player x={64} y={50} />
      <Ball x={76} y={50} />
      <Player x={94} y={50} dark />
    </g>
  );
}

function Lanes() {
  return (
    <g>
      {[28, 58, 88, 118].map((x) => (
        <g key={x}>
          <rect x={x} y="18" width="16" height="64" fill="none" stroke="#047857" strokeWidth="1.5" />
          <Player x={x + 8} y={70} />
        </g>
      ))}
      <Ball x={156} y={70} />
    </g>
  );
}
