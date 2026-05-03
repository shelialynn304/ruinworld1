import { gameState, applyState, getDefaultState } from "./state.js";

export const SAVE_KEY = "branch_and_bone_save_v2";
const LEGACY_SAVE_KEY = "branch_and_bone_save_v1";

export function hasSaveData() {
  return Boolean(localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY));
}

export function saveGame() {
  const payload = {
    version: 1,
    stats: {
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
    completedInteractions: gameState.completedInteractions || {}
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
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
  const stats = raw.stats || raw;

  return {
    corruption: Number(stats.corruption) || 0,
    mercy: Number(stats.mercy) || 0,
    influence: Number(stats.influence) || 0,
    devotion: Number(stats.devotion) || 0,
    conviction: Number(stats.conviction) || 0,
    fear: Number(stats.fear) || 0,
    doubt: Number(stats.doubt) || 0,
    followerCount: Number(stats.followerCount) || 0,
    gold: Number(stats.gold) || 0,
    completedInteractions: raw.completedInteractions || raw.rewardedInteractions || {}
  };
}
