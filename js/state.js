export const gameState = {
  playerName: "Wanderer",
  currentArea: "Blackgrave Cemetery",
  corruption: 0,
  mercy: 0,
  influence: 0,
  devotion: 0,
  conviction: 0,
  fear: 0,
  doubt: 0,
  followerCount: 0,
  gold: 0,
  relics: [],
  rewardedInteractions: [],
  memoryState: "fractured",
  graveClue: null,
  playerPosition: { x: 96, y: 360 },
  flags: {
    touchedChapelDoor: false,
    acceptedWhisper: false,
    rejectedWhisper: false,
    tookPrayerCloth: false,
    leftPrayerCloth: false,
    sawCrownedGrave: false,
    refusedCrownedGrave: false
  }
};

export function getDefaultState() {
  return {
    playerName: "Wanderer",
    currentArea: "Blackgrave Cemetery",
    corruption: 0,
    mercy: 0,
    influence: 0,
    devotion: 0,
    conviction: 0,
    fear: 0,
    doubt: 0,
    followerCount: 0,
    gold: 0,
    relics: [],
    rewardedInteractions: [],
    memoryState: "fractured",
    graveClue: null,
    playerPosition: { x: 96, y: 360 },
    flags: {
      touchedChapelDoor: false,
      acceptedWhisper: false,
      rejectedWhisper: false,
      tookPrayerCloth: false,
      leftPrayerCloth: false,
      sawCrownedGrave: false,
      refusedCrownedGrave: false
    }
  };
}

export function applyState(nextState) {
  Object.assign(gameState, getDefaultState(), nextState);
  gameState.flags = { ...getDefaultState().flags, ...(nextState.flags || {}) };
  gameState.relics = Array.isArray(nextState.relics) ? nextState.relics : [];
  gameState.rewardedInteractions = Array.isArray(nextState.rewardedInteractions) ? nextState.rewardedInteractions : [];
  gameState.playerPosition = {
    ...getDefaultState().playerPosition,
    ...(nextState.playerPosition || {})
  };
}

export function resetState() {
  applyState(getDefaultState());
}
