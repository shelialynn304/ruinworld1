import { gameState, applyState, getDefaultState } from "./state.js";

export const SAVE_KEY = "branch_and_bone_save_v2";
const LEGACY_SAVE_KEY = "branch_and_bone_save_v1";

export function hasSaveData() {
  return Boolean(localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY));
}

export function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY) ?? localStorage.getItem(LEGACY_SAVE_KEY);
  if (!raw) {
    return false;
  }

  try {
    const parsed = JSON.parse(raw);
    applyState(migrateSave(parsed));
    return true;
  } catch (error) {
    console.error("Failed to parse save data", error);
    applyState(getDefaultState());
    return false;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(LEGACY_SAVE_KEY);
}

function migrateSave(raw) {
  return {
    ...raw,
    playerPosition: raw.playerPosition || {
      x: Number(raw.playerX) || 96,
      y: Number(raw.playerY) || 360
    },
    currentArea: raw.currentArea || raw.area || "Blackgrave Cemetery",
    memoryState: raw.memoryState || "fractured"
  };
}
