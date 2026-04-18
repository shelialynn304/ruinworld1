window.SAVE_KEY = "branch_and_bone_save_v1";

window.getValidSceneId = function (sceneId) {
  if (sceneId && window.STORY && STORY[sceneId]) {
    return sceneId;
  }

  return "intro";
};

window.getDefaultGameState = function () {
  return {
    playerName: "Wanderer",
    currentScene: "intro",
    corruption: 0,
    mercy: 0,
    influence: 0,
    devotion: 0,
    followerCount: 0,
    gold: 0,
    relics: [],
    origin: null,
    motive: null,
    prophecyStance: null,
    temperament: "uncertain",
    memoryState: "fractured",
    graveClue: null,
    flags: {
      prayedAtRoad: false,
      foundBoneCharm: false,
      tookRoadCoins: false,
      threatenedMara: false,
      trustedMara: false,
      insultedMara: false
    }
  };
};

window.saveGame = function () {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    console.log("Game saved.");
  } catch (error) {
    console.error("Failed to save game:", error);
  }
};

window.loadGame = function () {
  try {
    const raw = localStorage.getItem(SAVE_KEY);

    if (!raw) {
      console.log("No save found. Using default state.");
      resetGameState();
      return;
    }

    const parsed = JSON.parse(raw);
    const defaults = getDefaultGameState();

    window.gameState = {
      ...defaults,
      ...parsed,
      currentScene: getValidSceneId(parsed.currentScene),
      flags: {
        ...defaults.flags,
        ...(parsed.flags || {})
      },
      relics: Array.isArray(parsed.relics) ? parsed.relics : []
    };

    console.log("Game loaded.");
  } catch (error) {
    console.error("Failed to load save. Resetting state:", error);
    resetGameState();
  }
};

window.resetGameState = function () {
  window.gameState = getDefaultGameState();
  window.gameState.currentScene = getValidSceneId(window.gameState.currentScene);
};
