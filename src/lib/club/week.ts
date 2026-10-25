const SESSION_TODAY = isoFromDate(new Date());

function isoFromDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function sessionToday() {
  return SESSION_TODAY;
}

export function parseIso(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso: string, days: number) {
  const date = parseIso(iso);
  date.setDate(date.getDate() + days);
  return isoFromDate(date);
}

export function mondayOf(iso: string) {
  const day = parseIso(iso).getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(iso, diff);
}

export function weekDates(weekStart: string) {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

export function formatDay(iso: string) {
  return parseIso(iso).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
