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
  completedInteractions: {},
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
    completedInteractions: {},
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
  const completedInteractions = nextState.completedInteractions ?? nextState.rewardedInteractions;
  if (Array.isArray(completedInteractions)) {
    gameState.completedInteractions = completedInteractions.reduce((acc, interactionId) => {
      acc[String(interactionId)] = true;
      return acc;
    }, {});
  } else if (completedInteractions && typeof completedInteractions === "object") {
    gameState.completedInteractions = Object.fromEntries(
      Object.entries(completedInteractions).map(([interactionId, completed]) => [String(interactionId), Boolean(completed)])
    );
  } else {
    gameState.completedInteractions = {};
  }
  gameState.playerPosition = {
    ...getDefaultState().playerPosition,
    ...(nextState.playerPosition || {})
  };
}

export function resetState() {
  applyState(getDefaultState());
}
