"use client";

import { DRILL_LEVELS, DRILL_TYPES, MOMENTS_OF_GAME, drillTitle, type DrillLevel, type DrillType, type MomentOfGame } from "@/lib/club/catalog";
import { isDrillLevel, isDrillType, isMoment } from "@/lib/club/drill-record";

export type DrillRecordDraft = {
  title: string;
  moment: MomentOfGame;
  drillType: DrillType;
  level: DrillLevel;
  focus: string;
  playerSetup: string;
  constraint: string;
  dimensions: string;
  workRest: string;
  repetitions: number;
  attackers: number;
  defenders: number;
  neutrals: number;
  goalkeepers: number;
  equipment: string;
  progressions: string;
};

const inputClass = "mt-1 block h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-950";

export function DrillRecordFields({
  draft,
  titleTouched,
  onChange,
  onTitle,
}: {
  draft: DrillRecordDraft;
  titleTouched: boolean;
  onChange: (next: DrillRecordDraft, titleTouched: boolean) => void;
  onTitle: (title: string) => void;
}) {
  function patch(partial: Partial<DrillRecordDraft>, touchTitle = titleTouched) {
    const next = { ...draft, ...partial };
    if (!touchTitle) next.title = drillTitle(next.drillType, next.focus, next.playerSetup, next.constraint);
    onChange(next, touchTitle);
  }

  return (
    <div className="grid gap-3">
      <label className="block text-sm font-semibold text-slate-800">
        Name
        <input
          value={draft.title}
          maxLength={60}
          data-field="name"
          onChange={(event) => onTitle(event.target.value.slice(0, 60))}
          className={inputClass}
        />
      </label>
      <p className="text-xs font-medium text-slate-600">Type, focus, player setup, then constraint. 60 characters.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Moment of the game
          <select
            value={draft.moment}
            data-field="moment"
            onChange={(event) => {
              if (isMoment(event.target.value)) patch({ moment: event.target.value });
            }}
            className={inputClass}
          >
            {MOMENTS_OF_GAME.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Drill type
          <select
            value={draft.drillType}
            data-field="drill-type"
            onChange={(event) => {
              if (isDrillType(event.target.value)) patch({ drillType: event.target.value }, titleTouched);
            }}
            className={inputClass}
          >
            {DRILL_TYPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} · {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Focus
          <input
            value={draft.focus}
            data-field="focus"
            onChange={(event) => patch({ focus: event.target.value })}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Player setup
          <input
            value={draft.playerSetup}
            data-field="player-setup"
            onChange={(event) => patch({ playerSetup: event.target.value })}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Constraint
          <input
            value={draft.constraint}
            data-field="constraint"
            onChange={(event) => patch({ constraint: event.target.value })}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Difficulty
          <select
            value={draft.level}
            data-field="level"
            onChange={(event) => {
              if (isDrillLevel(event.target.value)) patch({ level: event.target.value });
            }}
            className={inputClass}
          >
            {DRILL_LEVELS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Pitch size
          <input
            value={draft.dimensions}
            data-field="dimensions"
            onChange={(event) => patch({ dimensions: event.target.value })}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Work and rest
          <input
            value={draft.workRest}
            data-field="work-rest"
            onChange={(event) => patch({ workRest: event.target.value })}
            className={inputClass}
          />
        </label>
        <Count label="Repetitions" field="repetitions" value={draft.repetitions} min={1} onChange={(repetitions) => patch({ repetitions })} />
        <Count label="Attackers" field="attackers" value={draft.attackers} onChange={(attackers) => patch({ attackers })} />
        <Count label="Defenders" field="defenders" value={draft.defenders} onChange={(defenders) => patch({ defenders })} />
        <Count label="Neutrals" field="neutrals" value={draft.neutrals} onChange={(neutrals) => patch({ neutrals })} />
        <Count label="Goalkeepers" field="goalkeepers" value={draft.goalkeepers} onChange={(goalkeepers) => patch({ goalkeepers })} />
      </div>
      <label className="block text-sm font-semibold text-slate-800">
        Equipment, separated by commas
        <input
          value={draft.equipment}
          data-field="equipment"
          onChange={(event) => patch({ equipment: event.target.value })}
          className={inputClass}
        />
      </label>
      <label className="block text-sm font-semibold text-slate-800">
        Progressions, one on each line
        <textarea
          value={draft.progressions}
          data-field="progressions"
          rows={2}
          onChange={(event) => patch({ progressions: event.target.value })}
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950"
        />
      </label>
    </div>
  );
}

function Count({
  label,
  field,
  value,
  min = 0,
  onChange,
}: {
  label: string;
  field: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="text-sm font-semibold text-slate-800">
      {label}
      <input
        type="number"
        min={min}
        max={22}
        value={value}
        data-field={field}
        onChange={(event) => onChange(Math.min(22, Math.max(min, Number(event.target.value) || 0)))}
        className={inputClass}
      />
    </label>
  );
}

export function draftFromDrill(drill: {
  title: string;
  moment: MomentOfGame;
  drillType: DrillType;
  level: DrillLevel;
  focus: string;
  playerSetup: string;
  constraint: string;
  dimensions: string;
  workRest: string;
  repetitions: number;
  players: { attackers: number; defenders: number; neutrals: number; goalkeepers: number };
  equipment: string[];
  progressions: string[];
}): DrillRecordDraft {
  return {
    title: drill.title,
    moment: drill.moment,
    drillType: drill.drillType,
    level: drill.level,
    focus: drill.focus,
    playerSetup: drill.playerSetup,
    constraint: drill.constraint,
    dimensions: drill.dimensions,
    workRest: drill.workRest,
    repetitions: drill.repetitions,
    attackers: drill.players.attackers,
    defenders: drill.players.defenders,
    neutrals: drill.players.neutrals,
    goalkeepers: drill.players.goalkeepers,
    equipment: drill.equipment.join(", "),
    progressions: drill.progressions.join("\n"),
  };
}

export function emptyDraft(): DrillRecordDraft {
  return {
    title: "",
    moment: "IP",
    drillType: "TP",
    level: "Youth U9-12",
    focus: "",
    playerSetup: "",
    constraint: "",
    dimensions: "",
    workRest: "",
    repetitions: 1,
    attackers: 0,
    defenders: 0,
    neutrals: 0,
    goalkeepers: 0,
    equipment: "",
    progressions: "",
  };
}

export function linesFrom(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function commasFrom(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
