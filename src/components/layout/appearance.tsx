"use client";

const STORAGE_KEY = "rugga-appearance";

export function AppearanceToggle() {
  function toggle() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.appearance = dark ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      data-appearance-toggle
      onClick={toggle}
      className="btn-chrome min-h-11 rounded-lg px-3 text-sm font-bold"
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </button>
  );
}

export const appearanceScript = `try{var stored=localStorage.getItem("${STORAGE_KEY}");var dark=stored==="dark"||(stored!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);document.documentElement.dataset.appearance=dark?"dark":"light";}catch(e){}`;
