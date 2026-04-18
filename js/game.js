window.getCurrentScene = function () {
  if (!window.STORY || !window.gameState) return null;
  return STORY[gameState.currentScene] || null;
};

window.startNewGame = async function () {
  if (typeof resetGameState === "function") {
    resetGameState();
  } else {
    gameState.currentScene = "intro";
  }
  gameState.currentScene = getValidSceneId(gameState.currentScene);
  showGameScreen();
  updateStatsUI();

  if (window.audioSystem && typeof window.audioSystem.startMusic === "function") {
    window.audioSystem.startMusic();
  }

  await renderScene();
};

window.continueGame = async function () {
  const hadSave = Boolean(localStorage.getItem(SAVE_KEY));
  loadGame();
  gameState.currentScene = getValidSceneId(gameState.currentScene);
  showGameScreen();
  updateStatsUI();

  if (window.audioSystem && typeof window.audioSystem.startMusic === "function") {
    window.audioSystem.startMusic();
  }

  await renderScene();

  if (!hadSave) {
    ui.dialogueText.textContent = "No save was found. A new road has been prepared for you.";
  }
};

window.bindCoreButtons = function () {
  const startBtn = document.getElementById("start-game-btn");
  const continueBtn = document.getElementById("continue-game-btn");
  const saveBtn = document.getElementById("save-btn");
  const loadBtn = document.getElementById("load-btn");
  const resetBtn = document.getElementById("reset-btn");
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const textSoundToggleBtn = document.getElementById("text-sound-toggle-btn");

  startBtn.addEventListener("click", async () => {
    await startNewGame();
  });

  continueBtn.addEventListener("click", async () => {
    await continueGame();
  });

  saveBtn.addEventListener("click", () => {
    saveGame();
  });

  loadBtn.addEventListener("click", async () => {
    loadGame();
    showGameScreen();
    updateStatsUI();
    await renderScene();
  });

  resetBtn.addEventListener("click", async () => {
    localStorage.removeItem(SAVE_KEY);
    resetGameState();
    showTitleScreen();
    updateStatsUI();
    await renderScene();
  });

  musicToggleBtn.addEventListener("click", () => {
    if (window.audioSystem) {
      window.audioSystem.toggleMusic();
    }
  });

  textSoundToggleBtn.addEventListener("click", () => {
    if (window.audioSystem) {
      window.audioSystem.toggleTextSounds();
    }
  });
};

window.initializeGame = function () {
  cacheUIElements();
  bindCoreButtons();
  if (typeof validateChoiceHandlers === "function") {
    validateChoiceHandlers();
  }

  if (window.audioSystem && typeof window.audioSystem.init === "function") {
    window.audioSystem.init();
  }

  updateStatsUI();
  showTitleScreen();
};

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});
