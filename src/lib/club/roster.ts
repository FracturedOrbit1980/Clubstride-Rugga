import { ageNumber } from "@/lib/club/age";

export const SQUAD_TEAM_ID = "tm-u12-2015";

export interface RosterRow {
  name: string;
  squadNumber: number;
}

export const U12_SQUAD: RosterRow[] = [
  { name: "HUDSON ANTHONY MINNIE", squadNumber: 4 },
  { name: "LUNGELO MNQOBI MLUNGWANE", squadNumber: 12 },
  { name: "KAYDEN METZER", squadNumber: 41 },
  { name: "FABIO DE ABREU", squadNumber: 17 },
  { name: "JOSHUA JORDAN HELENA", squadNumber: 8 },
  { name: "DIEGO FERDINAND MASSYN", squadNumber: 9 },
  { name: "MPHO QUINTON MALATJI", squadNumber: 11 },
  { name: "RILEY MACKINLAY", squadNumber: 33 },
  { name: "CARTER SEVIRON DORMEHL", squadNumber: 1 },
  { name: "NOAH LEE EL SAMRANI", squadNumber: 7 },
  { name: "ETHAN DELPORT", squadNumber: 10 },
  { name: "MASUNGULO TLAKA", squadNumber: 5 },
];

export function playerId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `p-${slug || "player"}`;
}

type PremTeam = { id: string; name: string; division?: string };

export function placeOnU12Prem<G extends { name: string; teams: PremTeam[] }, P extends { name: string; teamId: string }>(
  groups: G[],
  players: P[],
): { ageGroups: G[]; players: P[]; teamId: string } {
  const squadNames = new Set(U12_SQUAD.map((player) => player.name.trim().toLowerCase()));
  const u12 = groups.find((group) => ageNumber(group.name) === 12);
  const prem = u12?.teams.find((team) => team.division === "Prem" || team.name === "Prem");
  const squad = u12?.teams.find((team) => team.id === SQUAD_TEAM_ID);
  const teamId = prem?.id ?? squad?.id ?? SQUAD_TEAM_ID;
  const ageGroups = groups.map((group) => {
    if (ageNumber(group.name) !== 12) return group;
    const teams = group.teams
      .filter((team) => team.id === teamId || (team.id !== SQUAD_TEAM_ID && team.division && team.division !== "Prem"))
      .map((team) => (team.id === teamId ? { ...team, name: "Prem", division: "Prem" } : team));
    if (!teams.some((team) => team.id === teamId)) {
      teams.unshift({ id: teamId, name: "Prem", division: "Prem" });
    }
    return { ...group, teams };
  });
  const ordered = [...players].sort((left, right) => Number(right.teamId === teamId) - Number(left.teamId === teamId));
  const seen = new Set<string>();
  const nextPlayers: P[] = [];
  for (const player of ordered) {
    const key = player.name.trim().toLowerCase();
    const belongs = squadNames.has(key) || player.teamId === SQUAD_TEAM_ID || player.teamId === teamId;
    if (!belongs) {
      nextPlayers.push(player);
      continue;
    }
    if (seen.has(key)) continue;
    seen.add(key);
    nextPlayers.push({ ...player, teamId });
  }
  return { ageGroups, players: nextPlayers, teamId };
}

export function parseRoster(text: string): { rows: RosterRow[]; errors: string[] } {
  const rows: RosterRow[] = [];
  const errors: string[] = [];
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!line.trim()) return;
    const cells = splitRow(line);
    if (isHeader(cells)) return;
    const parsed = interpretRow(cells);
    if ("error" in parsed) errors.push(`Line ${index + 1}: ${parsed.error}`);
    else rows.push(parsed);
  });
  return { rows, errors };
}

function splitRow(line: string) {
  if (line.includes("\t")) return line.split("\t").map((cell) => cell.trim()).filter((cell, index, all) => cell.length > 0 || index < all.length - 1);
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          current += '"';
          index += 1;
        } else quoted = false;
      } else current += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      cells.push(current.trim());
      current = "";
    } else current += char;
  }
  cells.push(current.trim());
  if (cells.filter(Boolean).length > 1) return cells.map((cell) => cell.trim());
  return [line.trim()];
}

function isHeader(cells: string[]) {
  const first = cells[0]?.trim().toLowerCase() ?? "";
  return first === "name" || first === "player" || first === "player name";
}

function interpretRow(cells: string[]): RosterRow | { error: string } {
  const filled = cells.map((cell) => cell.trim()).filter(Boolean);
  if (filled.length === 1) {
    const dated = filled[0].match(/^(.+?)\s+(\d{1,2}\/\d{1,2}\/\d{4})\s+(\d{1,2})$/);
    if (dated) return rowFrom(dated[1], dated[3]);
    const numbered = filled[0].match(/^(.+?)\s+(\d{1,2})$/);
    if (numbered) return rowFrom(numbered[1], numbered[2]);
    return { error: "Add the player name and shirt number." };
  }
  const [name, second, third] = filled;
  if (!name) return { error: "Add the player name." };
  if (isDate(second) && third && isShirt(third)) return rowFrom(name, third);
  if (isShirt(second)) return rowFrom(name, second);
  return { error: "Use the player name and shirt number." };
}

function rowFrom(name: string, shirt: string): RosterRow | { error: string } {
  const squadNumber = Number(shirt);
  if (!isShirt(shirt)) return { error: "Shirt number must be from 1 to 99." };
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return { error: "Add the player name." };
  return { name: trimmed, squadNumber };
}

function isShirt(value: string) {
  return /^\d{1,2}$/.test(value.trim()) && Number(value) >= 1 && Number(value) <= 99;
}

function isDate(value: string) {
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value.trim());
}
