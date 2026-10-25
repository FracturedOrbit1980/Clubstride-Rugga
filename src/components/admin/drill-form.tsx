"use client";

import { useState, type ReactNode } from "react";

import { DrillRecordFields, commasFrom, emptyDraft, linesFrom, type DrillRecordDraft } from "@/components/drills/drill-record-fields";
import { Button } from "@/components/ui/button";
import { ageLabel, ageNumber, sortByAge } from "@/lib/club/age";
import { SETUP_DIAGRAMS, type SetupDiagram } from "@/lib/club/catalog";
import { useClubStore } from "@/stores/club-store";

export function DrillForm() {
  const ageGroups = sortByAge(useClubStore((state) => state.ageGroups));
  const addDrill = useClubStore((state) => state.addDrill);
  const [draft, setDraft] = useState<DrillRecordDraft>(emptyDraft);
  const [titleTouched, setTitleTouched] = useState(false);
  const [age, setAge] = useState("All ages");
  const [minutes, setMinutes] = useState(5);
  const [diagram, setDiagram] = useState<SetupDiagram>("square");
  const [pitchSetup, setPitchSetup] = useState("");
  const [instructions, setInstructions] = useState("");
  const [points, setPoints] = useState("");
  const [official, setOfficial] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="mb-6 grid gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-300"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.title.trim() || !pitchSetup.trim()) return;
        addDrill({
          title: draft.title.trim(),
          moment: draft.moment,
          drillType: draft.drillType,
          level: draft.level,
          focus: draft.focus.trim(),
          playerSetup: draft.playerSetup.trim(),
          constraint: draft.constraint.trim(),
          dimensions: draft.dimensions.trim(),
          workRest: draft.workRest.trim(),
          repetitions: draft.repetitions,
          players: {
            attackers: draft.attackers,
            defenders: draft.defenders,
            neutrals: draft.neutrals,
            goalkeepers: draft.goalkeepers,
          },
          equipment: commasFrom(draft.equipment),
          progressions: linesFrom(draft.progressions),
          targetAgeGroup: age,
          durationSeconds: Math.min(30, Math.max(1, minutes)) * 60,
          diagram,
          pitchSetup: pitchSetup.trim(),
          instructions: instructions.trim() || "Coach to add the detail on the field.",
          coachingPoints: points
            .split(",")
            .map((point) => point.trim())
            .filter(Boolean),
          isClubOfficial: official,
        });
        setDraft(emptyDraft());
        setTitleTouched(false);
        setDiagram("square");
        setPitchSetup("");
        setInstructions("");
        setPoints("");
        setSaved(true);
      }}
    >
      <h2 className="text-lg font-bold text-slate-950">Add a club drill</h2>
      <DrillRecordFields
        draft={draft}
        titleTouched={titleTouched}
        onChange={(next, touched) => {
          setDraft(next);
          setTitleTouched(touched);
        }}
        onTitle={(title) => {
          setTitleTouched(true);
          setDraft((current) => ({ ...current, title }));
        }}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Under">
          <select value={age} data-field="drill-age" onChange={(event) => setAge(event.target.value)} className={inputClass}>
            <option value="All ages">All ages</option>
            {ageGroups.map((group) => (
              <option key={group.id} value={ageLabel(group.name)}>
                {ageNumber(group.name) ?? ageLabel(group.name)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Setup diagram">
          <select value={diagram} onChange={(event) => setDiagram(event.target.value as SetupDiagram)} className={inputClass}>
            {SETUP_DIAGRAMS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Minutes">
          <input
            type="number"
            min={1}
            max={30}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Pitch setup">
        <input value={pitchSetup} onChange={(event) => setPitchSetup(event.target.value)} className={inputClass} required />
      </Field>
      <Field label="Instructions">
        <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} className={`${inputClass} h-20 py-2`} />
      </Field>
      <Field label="Coaching points, separated by commas">
        <input value={points} onChange={(event) => setPoints(event.target.value)} className={inputClass} />
      </Field>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <input type="checkbox" checked={official} onChange={(event) => setOfficial(event.target.checked)} />
        Official club drill
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" className="h-11">
          Save drill
        </Button>
        {saved ? <p className="text-sm font-semibold text-emerald-800">Saved in this browser.</p> : null}
      </div>
    </form>
  );
}

const inputClass = "mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-950";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      {label}
      {children}
    </label>
  );
}
