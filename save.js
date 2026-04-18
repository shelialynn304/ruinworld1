const SAVE_KEY = "hollow_star_save_v1";

export function saveGame(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Save file was invalid.", error);
    return null;
  }
}

export function hasSaveData() {
  return Boolean(localStorage.getItem(SAVE_KEY));
}
