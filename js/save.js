import { gameState, applyState, getDefaultState } from "./state.js";

export const SAVE_KEY = "branch_and_bone_save_v2";
const LEGACY_SAVE_KEY = "branch_and_bone_save_v1";

export function hasSaveData() {
  return Boolean(localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY));
}

export function saveGame() {
  const saveData = {
    playerName: gameState.playerName,
    currentArea: gameState.currentArea,
    corruption: gameState.corruption,
    mercy: gameState.mercy,
    influence: gameState.influence,
    devotion: gameState.devotion,
    conviction: gameState.conviction,
    fear: gameState.fear,
    doubt: gameState.doubt,
    followerCount: gameState.followerCount,
    gold: gameState.gold,
    rewardedInteractions: Array.isArray(gameState.rewardedInteractions) ? [...gameState.rewardedInteractions] : []
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
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
  const completedInteractions = Array.isArray(raw.completedInteractions) ? raw.completedInteractions : [];
  const rewardedInteractions = Array.isArray(raw.rewardedInteractions) ? raw.rewardedInteractions : [];
  return {
    playerName: raw.playerName || "Wanderer",
    currentArea: raw.currentArea || raw.area || "Blackgrave Cemetery",
    corruption: Number(raw.corruption) || 0,
    mercy: Number(raw.mercy) || 0,
    influence: Number(raw.influence) || 0,
    devotion: Number(raw.devotion) || 0,
    conviction: Number(raw.conviction) || 0,
    fear: Number(raw.fear) || 0,
    doubt: Number(raw.doubt) || 0,
    followerCount: Number(raw.followerCount) || 0,
    gold: Number(raw.gold) || 0,
    rewardedInteractions: rewardedInteractions.length ? rewardedInteractions : completedInteractions
  };
}
