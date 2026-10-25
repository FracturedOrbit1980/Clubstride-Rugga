"use client";

import { useState } from "react";

import { DrillBoard } from "@/components/drills/drill-board";
import { DrillStopwatch } from "@/components/drills/drill-stopwatch";
import { Button } from "@/components/ui/button";
import { useCoachTeam } from "@/components/coach/team-picker";
import { useClubStore } from "@/stores/club-store";

export function SessionPlanner() {
  const drills = useClubStore((state) => state.drills);
  const sessions = useClubStore((state) => state.sessions);
  const saveSession = useClubStore((state) => state.saveSession);
  const setDrillDuration = useClubStore((state) => state.setDrillDuration);
  const { team } = useCoachTeam();
  const [picked, setPicked] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [activeId, setActiveId] = useState("");
  const [saved, setSaved] = useState(false);

  const chosen = picked
    .map((id) => drills.find((drill) => drill.id === id))
    .filter((drill) => drill !== undefined);
  const totalSeconds = chosen.reduce((sum, drill) => sum + drill.durationSeconds, 0);
  const active = drills.find((drill) => drill.id === activeId) ?? chosen[0];

  function toggle(id: string) {
    setPicked((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current, id];
    });
    setActiveId(id);
    setSaved(false);
  }

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div>
        <div className="flex flex-wrap gap-2">
          {drills.map((drill) => {
            const on = picked.includes(drill.id);
            return (
              <button
                key={drill.id}
                type="button"
                onClick={() => toggle(drill.id)}
                className={`rounded-full px-3 py-2 text-sm font-semibold ${on ? "btn-shade" : "btn-quiet"}`}
              >
                {drill.title}
              </button>
            );
          })}
        </div>
        <form
          className="mt-4 flex flex-wrap items-end gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim() || picked.length === 0 || !team) return;
            saveSession(team.id, title.trim(), picked);
            setSaved(true);
          }}
        >
          <label className="text-sm font-semibold text-slate-800">
            Session name
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1 block h-11 rounded-md border border-slate-300 px-3 text-base" />
          </label>
          <Button type="submit" size="lg" className="h-11">
            Save plan
          </Button>
          <p className="text-sm font-semibold text-slate-700">{Math.round(totalSeconds / 60)} min planned</p>
          {saved ? <p className="text-sm font-semibold text-emerald-800">Plan saved.</p> : null}
        </form>
        <ul className="mt-4 space-y-2">
          {sessions
            .filter((session) => session.teamId === team?.id)
            .map((session) => (
              <li key={session.id}>
                <button
                  type="button"
                  onClick={() => {
                    setPicked(session.drillIds);
                    setTitle(session.title);
                    setActiveId(session.drillIds[0] ?? "");
                  }}
                  className="w-full rounded-lg bg-white px-3 py-3 text-left ring-1 ring-slate-300"
                >
                  <span className="block font-semibold text-slate-950">{session.title}</span>
                  <span className="text-sm text-slate-600">
                    {session.savedOn} · {session.drillIds.length} drills
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>
      {active ? (
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <DrillBoard drillId={active.id} setup={active.pitchSetup} durationSeconds={active.durationSeconds} />
          <DrillStopwatch
            drillTitle={active.title}
            targetSeconds={active.durationSeconds}
            suggestedSeconds={active.defaultDurationSeconds}
            onTargetSecondsChange={(seconds) => setDrillDuration(active.id, seconds)}
          />
        </div>
      ) : null}
    </div>
  );
}
