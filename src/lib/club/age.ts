import type { ClubAgeGroup } from "@/lib/club/catalog";

export const YOUTH_AGES = [13, 12, 11, 10, 9, 8, 7, 6] as const;

export function ageNumber(name: string) {
  const trimmed = name.trim();
  const prefixed = trimmed.match(/^(?:u|under)\s*(\d{1,2})$/i);
  if (prefixed) return Number(prefixed[1]);
  if (/^\d{1,2}$/.test(trimmed)) return Number(trimmed);
  return null;
}

export function ageLabel(name: string) {
  const number = ageNumber(name);
  return number === null ? name : `U${number}`;
}

export function ensureYouthAges(groups: ClubAgeGroup[]) {
  const next = [...groups];
  for (const age of YOUTH_AGES) {
    if (next.some((group) => ageNumber(group.name) === age)) continue;
    next.push({ id: `ag-u${age}`, name: `U${age}`, displayOrder: age, teams: [] });
  }
  return sortByAge(
    next.map((group) => {
      const number = ageNumber(group.name);
      return number === null ? group : { ...group, name: `U${number}`, displayOrder: number };
    }),
  );
}

export function sortByAge<T extends { name: string }>(groups: T[]) {
  return [...groups].sort((left, right) => {
    const older = ageNumber(left.name);
    const younger = ageNumber(right.name);
    if (older !== null && younger !== null && older !== younger) return younger - older;
    if (older !== null) return -1;
    if (younger !== null) return 1;
    return left.name.localeCompare(right.name);
  });
}
