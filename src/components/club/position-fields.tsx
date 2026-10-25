import { ALL_ROUNDER, isPositionChoice, POSITION_CHOICES, STANDARD_POSITIONS, type PositionChoice, type StandardPosition } from "@/lib/club/positions";

export function PositionFields({
  role,
  roles,
  onRole,
  onToggle,
  field = "position",
}: {
  role: PositionChoice;
  roles: StandardPosition[];
  onRole: (role: PositionChoice) => void;
  onToggle: (role: StandardPosition) => void;
  field?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="block text-sm font-semibold text-slate-800">
        Position
        <select
          value={role}
          data-field={field}
          onChange={(event) => {
            if (isPositionChoice(event.target.value)) onRole(event.target.value);
          }}
          className="mt-1 block h-11 w-full min-w-44 rounded-md border border-slate-300 bg-white px-2 text-base"
        >
          {POSITION_CHOICES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      {role === ALL_ROUNDER ? (
        <fieldset className="mt-2 min-w-0">
          <legend className="text-sm font-semibold text-slate-800">Also plays</legend>
          <div className="mt-1 flex flex-wrap gap-1">
            {STANDARD_POSITIONS.map((item) => {
              const checked = roles.includes(item);
              return (
                <label key={item} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-300">
                  <input
                    type="checkbox"
                    data-field={`${field}-role`}
                    data-position={item}
                    checked={checked}
                    onChange={() => onToggle(item)}
                    className="size-4"
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}
