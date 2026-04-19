import { STORY } from "./story.js";
import { runChoiceAction } from "./choices.js";
import { gameState } from "./state.js";

let ui = null;
let open = false;
let onCloseCallback = null;

export function initDialogue(dialogueUI) {
  ui = dialogueUI;
}

export function isDialogueOpen() {
  return open;
}

export function openDialogue(sceneId, onClose) {
  const scene = STORY[sceneId];
  if (!scene || !ui) return;

  open = true;
  onCloseCallback = onClose;

  ui.speakerName.textContent = scene.speaker;
  ui.sceneTitle.textContent = scene.area;
  ui.dialogueText.textContent = scene.text.join("\n\n");
  ui.choicesContainer.innerHTML = "";

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      runChoiceAction(choice.action);
      closeDialogue();
    });
    ui.choicesContainer.appendChild(button);
  });

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "ghost-btn choice-btn close-dialogue-btn";
  closeButton.textContent = "Leave";
  closeButton.addEventListener("click", closeDialogue);
  ui.choicesContainer.appendChild(closeButton);

  updateStats(ui);
}

export function closeDialogue() {
  if (!open) return;
  open = false;
  if (typeof onCloseCallback === "function") {
    onCloseCallback();
  }
  onCloseCallback = null;
  if (ui) {
    ui.speakerName.textContent = "Narrator";
    ui.dialogueText.textContent = "Rain and thunder swallow the graveyard once more.";
    ui.choicesContainer.innerHTML = "<div class=\"footer-note\">Walk to an object and press E to interact.</div>";
    updateStats(ui);
  }
}

export function updateStats(uiRef) {
  if (!uiRef) return;
  uiRef.areaLabel.textContent = gameState.currentArea;
  uiRef.statCorruption.textContent = gameState.corruption;
  uiRef.statMercy.textContent = gameState.mercy;
  uiRef.statInfluence.textContent = gameState.influence;
  uiRef.statDevotion.textContent = gameState.devotion;
  uiRef.statConviction.textContent = gameState.conviction;
  uiRef.statFear.textContent = gameState.fear;
  uiRef.statDoubt.textContent = gameState.doubt;
  uiRef.statFollowers.textContent = gameState.followerCount;
  uiRef.statGold.textContent = gameState.gold;
  uiRef.playerNameLabel.textContent = gameState.playerName;

  uiRef.relicList.innerHTML = "";
  if (!gameState.relics.length) {
    uiRef.relicList.innerHTML = "<li>None</li>";
  } else {
    gameState.relics.forEach((relic) => {
      const li = document.createElement("li");
      li.textContent = relic;
      uiRef.relicList.appendChild(li);
    });
  }
}
