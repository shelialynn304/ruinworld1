const SAVE_KEY = "hollow_star_save_1";

export function saveGame(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse save data:", err);
    return null;
  }
}

export function resetSave() {
  localStorage.removeItem(SAVE_KEY);
}
