import { STORY } from "./story.js";
import { runChoiceAction } from "./choices.js";
import { createInitialState } from "./state.js";
import { createUI } from "./ui.js";
import { hasSaveData, loadGame, saveGame } from "./save.js";
import {
  getAudioSettings,
  playDialogueBlipPlaceholder,
  setAudioSettings,
  startMusicLoopPlaceholder,
  toggleBlips,
  toggleMusic,
} from "./audio.js";

let state = createInitialState();
const ui = createUI();

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const musicToggle = document.getElementById("musicToggle");
const blipToggle = document.getElementById("blipToggle");

function render() {
  const scene = STORY[state.currentScene];
  if (!scene) {
    throw new Error(`Unknown scene: ${state.currentScene}`);
  }

  ui.renderStats(state.stats);
  ui.renderScene(scene, state, handleChoice);
  updateAudioToggleLabels();
  playDialogueBlipPlaceholder();
}

function goToScene(sceneId) {
  if (!STORY[sceneId]) {
    return;
  }

  state.currentScene = sceneId;
  state.lineIndex = 0;
  render();
}

function startNewGame() {
  state = createInitialState();
  setAudioSettings(state.settings);
  startMusicLoopPlaceholder();
  ui.showGame();
  render();
}

function continueGame() {
  const saveData = loadGame();
  if (!saveData) {
    startNewGame();
    return;
  }

  state = {
    ...createInitialState(),
    ...saveData,
    stats: {
      ...createInitialState().stats,
      ...(saveData.stats || {}),
    },
    flags: {
      ...createInitialState().flags,
      ...(saveData.flags || {}),
    },
    settings: {
      ...createInitialState().settings,
      ...(saveData.settings || {}),
    },
  };

  setAudioSettings(state.settings);
  if (state.settings.musicOn) {
    startMusicLoopPlaceholder();
  }

  ui.showGame();
  render();
}

function handleChoice(choice) {
  if (choice.action === "__next_line__") {
    state.lineIndex += 1;
    render();
    return;
  }

  const result = runChoiceAction(choice.action, { state, scene: STORY[state.currentScene], story: STORY });

  if (result.toTitle) {
    ui.showTitle();
    state = createInitialState();
    return;
  }

  if (result.nextScene) {
    goToScene(result.nextScene);
    return;
  }

  render();
}

function updateAudioToggleLabels() {
  const settings = getAudioSettings();
  musicToggle.textContent = `Music: ${settings.musicOn ? "On" : "Off"}`;
  blipToggle.textContent = `Blips: ${settings.blipsOn ? "On" : "Off"}`;
}

startButton.addEventListener("click", startNewGame);
continueButton.addEventListener("click", continueGame);

saveButton.addEventListener("click", () => {
  state.settings = getAudioSettings();
  saveGame(state);
});

loadButton.addEventListener("click", continueGame);

musicToggle.addEventListener("click", () => {
  const isMusicOn = toggleMusic();
  state.settings.musicOn = isMusicOn;
  updateAudioToggleLabels();
});

blipToggle.addEventListener("click", () => {
  const isBlipsOn = toggleBlips();
  state.settings.blipsOn = isBlipsOn;
  updateAudioToggleLabels();
});

continueButton.disabled = !hasSaveData();
ui.showTitle();
updateAudioToggleLabels();
