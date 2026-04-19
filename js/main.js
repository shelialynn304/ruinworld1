import { setupInput } from "./input.js";
import { Game } from "./game.js";
import { initDialogue, updateStats, closeDialogue } from "./dialogue.js";
import { saveGame, loadGame, clearSave, hasSaveData } from "./save.js";
import { resetState, gameState } from "./state.js";

function collectUI() {
  return {
    areaLabel: document.getElementById("area-label"),
    sceneTitle: document.getElementById("scene-title"),
    speakerName: document.getElementById("speaker-name"),
    dialogueText: document.getElementById("dialogue-text"),
    choicesContainer: document.getElementById("choices-container"),
    relicList: document.getElementById("relic-list"),
    statCorruption: document.getElementById("stat-corruption"),
    statMercy: document.getElementById("stat-mercy"),
    statInfluence: document.getElementById("stat-influence"),
    statDevotion: document.getElementById("stat-devotion"),
    statConviction: document.getElementById("stat-conviction"),
    statFear: document.getElementById("stat-fear"),
    statDoubt: document.getElementById("stat-doubt"),
    statFollowers: document.getElementById("stat-followers"),
    statGold: document.getElementById("stat-gold"),
    playerNameLabel: document.getElementById("player-name-label"),
    titleScreen: document.getElementById("title-screen"),
    gameScreen: document.getElementById("game-screen"),
    startGameBtn: document.getElementById("start-game-btn"),
    continueGameBtn: document.getElementById("continue-game-btn"),
    saveBtn: document.getElementById("save-btn"),
    loadBtn: document.getElementById("load-btn"),
    resetBtn: document.getElementById("reset-btn"),
    musicToggleBtn: document.getElementById("music-toggle-btn"),
    textSoundToggleBtn: document.getElementById("text-sound-toggle-btn"),
    introCopy: document.querySelector(".intro-copy"),
    canvas: document.getElementById("game-canvas"),
    interactionPrompt: document.getElementById("interaction-prompt")
  };
}

function getMissingElements(ui) {
  const required = [
    "canvas",
    "interactionPrompt",
    "titleScreen",
    "gameScreen",
    "startGameBtn",
    "continueGameBtn",
    "saveBtn",
    "loadBtn",
    "resetBtn",
    "areaLabel",
    "sceneTitle",
    "speakerName",
    "dialogueText",
    "choicesContainer",
    "relicList",
    "playerNameLabel",
    "statCorruption",
    "statMercy",
    "statInfluence",
    "statDevotion",
    "statConviction",
    "statFear",
    "statDoubt",
    "statFollowers",
    "statGold"
  ];

  return required.filter((name) => !ui[name]);
}

const ui = collectUI();
const missing = getMissingElements(ui);

if (missing.length > 0) {
  console.error("Game initialization failed. Missing required DOM elements:", missing.join(", "));
} else {
  const game = new Game(ui.canvas, ui.interactionPrompt);

  function setTitleMessage(message) {
    if (ui.introCopy) {
      ui.introCopy.textContent = message;
    }
  }

  function setLiveDialogue(message) {
    ui.speakerName.textContent = "Narrator";
    ui.sceneTitle.textContent = gameState.currentArea;
    ui.dialogueText.textContent = message;
    ui.choicesContainer.innerHTML = '<div class="footer-note">Approach an object and press E to trigger dialogue and choices.</div>';
  }

  function showTitle() {
    ui.titleScreen.classList.remove("hidden");
    ui.gameScreen.classList.add("hidden");
  }

  function showGame() {
    ui.titleScreen.classList.add("hidden");
    ui.gameScreen.classList.remove("hidden");
  }

  function updateContinueButtonState() {
    const hasSave = hasSaveData();
    ui.continueGameBtn.disabled = !hasSave;
    ui.continueGameBtn.classList.toggle("is-disabled", !hasSave);
    ui.continueGameBtn.title = hasSave ? "Continue from your saved storm" : "No save survives the storm";
  }

  function disableAudioButtons() {
    [ui.musicToggleBtn, ui.textSoundToggleBtn].forEach((btn) => {
      if (!btn) return;
      btn.disabled = true;
      btn.classList.add("is-disabled");
      btn.title = "Audio controls return in a later build";
      btn.setAttribute("aria-disabled", "true");
    });
  }

  function syncUIAfterStateChange() {
    updateStats(ui);
    setLiveDialogue("Lightning tears the sky above Blackgrave. Move with WASD or Arrow Keys.");
  }

  function startNewGame() {
    game.stop();
    resetState();
    game.resetPlayerPosition();
    closeDialogue();
    syncUIAfterStateChange();
    showGame();
    game.start();
    updateContinueButtonState();
  }

  function continueGame() {
    game.stop();
    const loaded = loadGame();

    if (!loaded) {
      showTitle();
      setTitleMessage("No save survives the storm.");
      updateContinueButtonState();
      return false;
    }

    game.restorePlayerPosition();
    closeDialogue();
    syncUIAfterStateChange();
    showGame();
    game.start();
    updateContinueButtonState();
    return true;
  }

  function handleReset() {
    game.stop();
    clearSave();
    resetState();
    game.resetPlayerPosition();
    closeDialogue();
    updateStats(ui);
    showTitle();
    setTitleMessage(
      "You wake in a storm-soaked graveyard, somewhere between memory and prophecy. Walk the cemetery, touch what should stay buried, and decide what kind of soul survives the night."
    );
    updateContinueButtonState();
  }

  function init() {
    setupInput();
    initDialogue(ui);
    disableAudioButtons();
    updateStats(ui);
    showTitle();
    updateContinueButtonState();

    ui.startGameBtn.addEventListener("click", startNewGame);
    ui.continueGameBtn.addEventListener("click", continueGame);

    ui.saveBtn.addEventListener("click", () => {
      saveGame();
      updateContinueButtonState();
      setLiveDialogue("The storm's memory is sealed in ash and glass.");
      updateStats(ui);
    });

    ui.loadBtn.addEventListener("click", () => {
      const loaded = continueGame();
      if (loaded) {
        setLiveDialogue("Old choices return with the rain.");
        updateStats(ui);
      }
    });

    ui.resetBtn.addEventListener("click", handleReset);
  }

  init();
}
