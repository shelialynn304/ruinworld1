import { setupInput } from "./input.js";
import { createGame } from "./game.js";
import { loadGame, resetSave, saveGame } from "./save.js";
import { npc } from "./npc.js";

const canvas = document.getElementById("gameCanvas");
const dialogueBox = document.getElementById("dialogueBox");
const dialogueText = document.getElementById("dialogueText");
const choiceButtons = document.getElementById("choiceButtons");

const dialogueApi = {
  show(text, choices) {
    dialogueText.textContent = text;
    choiceButtons.innerHTML = "";

    choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice.label;
      btn.addEventListener("click", choice.action);
      choiceButtons.appendChild(btn);
    });

    dialogueBox.classList.remove("hidden");
  },
  hide() {
    dialogueBox.classList.add("hidden");
    dialogueText.textContent = "";
    choiceButtons.innerHTML = "";
  },
};

setupInput();
const game = createGame(canvas, dialogueApi);

const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const resetBtn = document.getElementById("resetBtn");

saveBtn.addEventListener("click", () => {
  saveGame(game.getState());
  alert("Game saved.");
});

loadBtn.addEventListener("click", () => {
  const data = loadGame();
  if (!data) {
    alert("No save found.");
    return;
  }

  game.setState(data);
  npc.interacted = Boolean(data.flags?.choseRitual || data.flags?.helpedSeer);
  dialogueApi.hide();
  alert("Game loaded.");
});

resetBtn.addEventListener("click", () => {
  resetSave();
  game.resetState();
  dialogueApi.hide();
  alert("Save reset and state cleared.");
});
