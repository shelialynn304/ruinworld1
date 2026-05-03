import { gameState, applyState, getDefaultState } from "./state.js";

export const SAVE_KEY = "branch_and_bone_save_v2";
const LEGACY_SAVE_KEY = "branch_and_bone_save_v1";

export function hasSaveData() {
  return Boolean(localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY));
}

export function saveGame() {
  const saveData = {
    version: 1,
    stats: {
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
      gold: gameState.gold
    },
    completedInteractions: gameState.completedInteractions && typeof gameState.completedInteractions === "object"
      ? { ...gameState.completedInteractions }
      : {}
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
  const stats = raw.stats && typeof raw.stats === "object" ? raw.stats : raw;
  const completedInteractions = Array.isArray(raw.completedInteractions) ? raw.completedInteractions : [];
  const rewardedInteractions = Array.isArray(raw.rewardedInteractions) ? raw.rewardedInteractions : [];
  const completedMap = raw.completedInteractions && typeof raw.completedInteractions === "object" && !Array.isArray(raw.completedInteractions)
    ? raw.completedInteractions
    : Object.fromEntries((rewardedInteractions.length ? rewardedInteractions : completedInteractions).map((id) => [String(id), true]));
  return {
    playerName: stats.playerName || "Wanderer",
    currentArea: stats.currentArea || raw.area || "Blackgrave Cemetery",
    corruption: Number(stats.corruption) || 0,
    mercy: Number(stats.mercy) || 0,
    influence: Number(stats.influence) || 0,
    devotion: Number(stats.devotion) || 0,
    conviction: Number(stats.conviction) || 0,
    fear: Number(stats.fear) || 0,
    doubt: Number(stats.doubt) || 0,
    followerCount: Number(stats.followerCount) || 0,
    gold: Number(stats.gold) || 0,
    completedInteractions: completedMap
  };
}
