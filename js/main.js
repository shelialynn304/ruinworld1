import { setupInput, setVirtualDirection, triggerVirtualInteract, releaseVirtualInteract, clearInputState } from "./input.js";
import { Game } from "./game.js";
import { initDialogue, updateStats, closeDialogue } from "./dialogue.js";
import { saveGame, loadGame, clearSave, hasSaveData } from "./save.js";
import { resetState } from "./state.js";

const INTRO_LINES = [
  "You wake on wet earth between broken graves, your name split like glass.",
  "Memory comes in splinters: a bell that never finished ringing, a prayer that turned to ash.",
  "Stormlight rakes the cemetery. Every thunderclap feels like something searching for you.",
  "Beyond the headstones, the chapel waits with its door half-open to the dark."
];

function collectUI() {
  return {
    areaLabel: document.getElementById("area-label"),
    sceneTitle: document.getElementById("scene-title"),
    speakerName: document.getElementById("speaker-name"),
    dialogueText: document.getElementById("dialogue-text"),
    dialoguePanel: document.getElementById("dialogue-panel"),
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
    introScreen: document.getElementById("intro-screen"),
    introSequenceText: document.getElementById("intro-sequence-text"),
    introNextBtn: document.getElementById("intro-next-btn"),
    gameScreen: document.getElementById("gameScreen"),
    statsOverlay: document.getElementById("stats-overlay"),
    statsToggleBtn: document.getElementById("stats-toggle-btn"),
    closeStatsBtn: document.getElementById("close-stats-btn"),
    startGameBtn: document.getElementById("start-game-btn"),
    continueGameBtn: document.getElementById("continue-game-btn"),
    saveBtn: document.getElementById("save-btn"),
    loadBtn: document.getElementById("load-btn"),
    resetBtn: document.getElementById("reset-btn"),
    musicToggleBtn: document.getElementById("music-toggle-btn"),
    textSoundToggleBtn: document.getElementById("text-sound-toggle-btn"),
    canvas: document.getElementById("gameCanvas"),
    interactionPrompt: document.getElementById("interaction-prompt"),
    pauseToggleBtn: document.getElementById("pause-toggle-btn"),
    pauseOverlay: document.getElementById("pause-overlay"),
    pauseResumeBtn: document.getElementById("pause-resume-btn"),
    pauseSaveBtn: document.getElementById("pause-save-btn"),
    pauseLoadBtn: document.getElementById("pause-load-btn"),
    pauseResetBtn: document.getElementById("pause-reset-btn"),
    pauseArea: document.getElementById("pause-area"),
    pauseStatCorruption: document.getElementById("pause-stat-corruption"),
    pauseStatMercy: document.getElementById("pause-stat-mercy"),
    pauseStatInfluence: document.getElementById("pause-stat-influence"),
    pauseStatDevotion: document.getElementById("pause-stat-devotion"),
    pauseStatConviction: document.getElementById("pause-stat-conviction"),
    pauseStatFear: document.getElementById("pause-stat-fear"),
    pauseStatDoubt: document.getElementById("pause-stat-doubt"),
    pauseStatFollowers: document.getElementById("pause-stat-followers"),
    pauseStatGold: document.getElementById("pause-stat-gold"),
    mobileControls: document.getElementById("mobile-controls")
  };
}

function getMissingElements(ui) {
  const required = [
    "canvas", "interactionPrompt", "titleScreen", "introScreen", "gameScreen", "dialoguePanel",
    "startGameBtn", "continueGameBtn", "saveBtn", "loadBtn", "resetBtn", "introNextBtn",
    "statsToggleBtn", "closeStatsBtn", "statsOverlay", "areaLabel", "sceneTitle", "speakerName",
    "dialogueText", "choicesContainer", "relicList", "playerNameLabel", "statCorruption", "statMercy",
    "statInfluence", "statDevotion", "statConviction", "statFear", "statDoubt", "statFollowers", "statGold",
    "pauseToggleBtn", "pauseOverlay", "pauseResumeBtn", "pauseSaveBtn", "pauseLoadBtn", "pauseResetBtn",
    "pauseArea", "pauseStatCorruption", "pauseStatMercy", "pauseStatInfluence", "pauseStatDevotion", "mobileControls",
    "pauseStatConviction", "pauseStatFear", "pauseStatDoubt", "pauseStatFollowers", "pauseStatGold"
  ];

  return required.filter((name) => !ui[name]);
}

const ui = collectUI();
const missing = getMissingElements(ui);

if (missing.length > 0) {
  console.error("Game initialization failed. Missing required DOM elements:", missing.join(", "));
} else {
  const game = new Game(ui.canvas, ui.interactionPrompt);
  let introIndex = 0;

  let pauseMenuOpen = false;

  function renderPauseStats() {
    updateStats(ui);
    ui.pauseArea.textContent = ui.sceneTitle.textContent || "Blackgrave Cemetery";
    ui.pauseStatCorruption.textContent = ui.statCorruption.textContent;
    ui.pauseStatMercy.textContent = ui.statMercy.textContent;
    ui.pauseStatInfluence.textContent = ui.statInfluence.textContent;
    ui.pauseStatDevotion.textContent = ui.statDevotion.textContent;
    ui.pauseStatConviction.textContent = ui.statConviction.textContent;
    ui.pauseStatFear.textContent = ui.statFear.textContent;
    ui.pauseStatDoubt.textContent = ui.statDoubt.textContent;
    ui.pauseStatFollowers.textContent = ui.statFollowers.textContent;
    ui.pauseStatGold.textContent = ui.statGold.textContent;
  }

  function closePauseMenu() {
    if (!pauseMenuOpen) return;
    clearInputState();
    pauseMenuOpen = false;
    ui.pauseOverlay.classList.add("hidden");
    game.start();
    refreshMobileControls();
  }

  function openPauseMenu() {
    if (pauseMenuOpen || ui.gameScreen.classList.contains("hidden")) return;
    clearInputState();
    pauseMenuOpen = true;
    renderPauseStats();
    ui.pauseOverlay.classList.remove("hidden");
    game.stop();
    refreshMobileControls();
  }

  function togglePauseMenu(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !pauseMenuOpen;
    if (shouldOpen) {
      openPauseMenu();
    } else {
      closePauseMenu();
    }
  }

  function resizeCanvas() {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function setScreen(screenName) {
    ui.titleScreen.classList.toggle("hidden", screenName !== "title");
    ui.introScreen.classList.toggle("hidden", screenName !== "intro");
    ui.gameScreen.classList.toggle("hidden", screenName !== "game");
    if (screenName !== "game") {
      clearInputState();
      ui.statsOverlay.classList.add("hidden");
      pauseMenuOpen = false;
      ui.pauseOverlay.classList.add("hidden");
      game.stop();
    }
    refreshMobileControls();
  }

  function isMobileGameplayActive() {
    return !ui.gameScreen.classList.contains("hidden") && !pauseMenuOpen;
  }

  function showMobileControls() {
    ui.mobileControls.classList.remove("hidden");
  }

  function hideMobileControls() {
    ui.mobileControls.classList.add("hidden");
  }

  function refreshMobileControls() {
    if (isMobileGameplayActive()) {
      showMobileControls();
    } else {
      hideMobileControls();
    }
  }

  let mobileControlsBound = false;
  function bindMobileControlsOnce() {
    if (mobileControlsBound) return;
    mobileControlsBound = true;

    const activePointers = new Map();
    const clearVirtualInput = () => {
      activePointers.clear();
      clearInputState();
    };

    const releasePointer = (pointerId) => {
      const control = activePointers.get(pointerId);
      if (!control) return;
      if (control === "interact") releaseVirtualInteract();
      if (control === "up" || control === "down" || control === "left" || control === "right") {
        setVirtualDirection(control, false);
      }
      activePointers.delete(pointerId);
    };

    ui.mobileControls.addEventListener("pointerdown", (event) => {
      const button = event.target.closest("[data-control]");
      if (!button || !isMobileGameplayActive()) return;
      event.preventDefault();
      const control = button.dataset.control;
      activePointers.set(event.pointerId, control);
      button.setPointerCapture?.(event.pointerId);

      if (control === "interact") {
        triggerVirtualInteract();
      } else if (control === "pause") {
        togglePauseMenu(true);
      } else {
        setVirtualDirection(control, true);
      }
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      ui.mobileControls.addEventListener(eventName, (event) => {
        event.preventDefault();
        releasePointer(event.pointerId);
      });
    });

    window.addEventListener("blur", clearVirtualInput);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearVirtualInput();
    });
  }

  function updateContinueButtonState() {
    const hasSave = hasSaveData();
    ui.continueGameBtn.disabled = !hasSave;
    ui.continueGameBtn.classList.toggle("is-disabled", !hasSave);
    ui.continueGameBtn.title = hasSave ? "Continue from your saved storm" : "No save survives the storm";

    ui.resetBtn.classList.toggle("hidden", !hasSave);
  }

  function disableAudioButtons() {
    [ui.musicToggleBtn, ui.textSoundToggleBtn].forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("is-disabled");
      btn.title = "Audio controls return in a later build";
      btn.setAttribute("aria-disabled", "true");
    });
  }

  function syncUIAfterStateChange() {
    updateStats(ui);
  }

  function beginGameplay() {
    document.body.requestFullscreen?.().catch(() => {});
    closeDialogue({ force: true, suppressCallback: true });
    syncUIAfterStateChange();
    setScreen("game");
    pauseMenuOpen = false;
    ui.pauseOverlay.classList.add("hidden");
    game.start();
    updateContinueButtonState();
  }

  function advanceIntro() {
    if (introIndex >= INTRO_LINES.length) {
      beginGameplay();
      return;
    }

    ui.introSequenceText.textContent = INTRO_LINES[introIndex];
    introIndex += 1;
    ui.introNextBtn.textContent = introIndex >= INTRO_LINES.length ? "Enter the Graveyard" : "Continue";
  }

  function startNewGame() {
    game.stop();
    resetState();
    game.resetPlayerPosition();
    closeDialogue({ force: true, suppressCallback: true });
    syncUIAfterStateChange();

    introIndex = 0;
    setScreen("intro");
    advanceIntro();
  }

  function continueGame() {
    game.stop();
    return handleLoadToGameplay();
  }

  function handleReset() {
    game.stop();
    clearInputState();
    clearSave();
    resetState();
    game.resetPlayerPosition();
    closeDialogue({ force: true, suppressCallback: true });
    syncUIAfterStateChange();
    setScreen("title");
    updateContinueButtonState();
  }

  function handleSave() {
    saveGame();
    updateContinueButtonState();
  }

  function handleLoadToGameplay({ onFailure } = {}) {
    const loaded = loadGame();
    if (!loaded) {
      if (typeof onFailure === "function") {
        onFailure();
      } else {
        setScreen("title");
      }
      updateContinueButtonState();
      return false;
    }

    game.restorePlayerPosition();
    beginGameplay();
    return true;
  }

  function toggleRecords(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : ui.statsOverlay.classList.contains("hidden");
    ui.statsOverlay.classList.toggle("hidden", !shouldOpen);
    if (shouldOpen) {
      updateStats(ui);
    }
  }

  function init() {
    setupInput();
    bindMobileControlsOnce();
    initDialogue(ui);
    disableAudioButtons();
    syncUIAfterStateChange();
    closeDialogue({ force: true, suppressCallback: true });
    setScreen("title");
    updateContinueButtonState();

    ui.startGameBtn.addEventListener("click", startNewGame);
    ui.continueGameBtn.addEventListener("click", continueGame);
    ui.introNextBtn.addEventListener("click", advanceIntro);

    ui.saveBtn.addEventListener("click", handleSave);

    ui.loadBtn.addEventListener("click", () => {
      continueGame();
    });

    ui.resetBtn.addEventListener("click", handleReset);
    ui.statsToggleBtn.addEventListener("click", () => toggleRecords());
    ui.closeStatsBtn.addEventListener("click", () => toggleRecords(false));

    ui.pauseToggleBtn.addEventListener("click", () => togglePauseMenu());
    ui.pauseResumeBtn.addEventListener("click", () => closePauseMenu());
    ui.pauseSaveBtn.addEventListener("click", () => {
      handleSave();
      renderPauseStats();
    });
    ui.pauseLoadBtn.addEventListener("click", () => {
      const loaded = handleLoadToGameplay({ onFailure: () => {} });
      if (!loaded) return;
      closePauseMenu();
    });
    ui.pauseResetBtn.addEventListener("click", () => {
      handleReset();
      closePauseMenu();
    });

    window.addEventListener("keydown", (event) => {
      if (event.repeat) return;
      if (event.key === "p" || event.key === "P") {
        event.preventDefault();
        togglePauseMenu();
      } else if (event.key === "Escape" && pauseMenuOpen) {
        event.preventDefault();
        closePauseMenu();
      }
    });
  }

  init();
}
