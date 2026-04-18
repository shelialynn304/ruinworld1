window.ui = {
  areaLabel: null,
  sceneTitle: null,
  speakerName: null,
  dialogueText: null,
  choicesContainer: null,
  relicList: null,
  statCorruption: null,
  statMercy: null,
  statInfluence: null,
  statDevotion: null,
  statFollowers: null,
  statGold: null,
  titleScreen: null,
  gameScreen: null
};

window.cacheUIElements = function () {
  ui.areaLabel = document.getElementById("area-label");
  ui.sceneTitle = document.getElementById("scene-title");
  ui.speakerName = document.getElementById("speaker-name");
  ui.dialogueText = document.getElementById("dialogue-text");
  ui.choicesContainer = document.getElementById("choices-container");
  ui.relicList = document.getElementById("relic-list");

  ui.statCorruption = document.getElementById("stat-corruption");
  ui.statMercy = document.getElementById("stat-mercy");
  ui.statInfluence = document.getElementById("stat-influence");
  ui.statDevotion = document.getElementById("stat-devotion");
  ui.statFollowers = document.getElementById("stat-followers");
  ui.statGold = document.getElementById("stat-gold");

  ui.titleScreen = document.getElementById("title-screen");
  ui.gameScreen = document.getElementById("game-screen");
};

window.showTitleScreen = function () {
  ui.titleScreen.classList.remove("hidden");
  ui.gameScreen.classList.add("hidden");
};

window.showGameScreen = function () {
  ui.titleScreen.classList.add("hidden");
  ui.gameScreen.classList.remove("hidden");
};

window.updateStatsUI = function () {
  if (!window.gameState) return;

  ui.areaLabel.textContent = getCurrentScene()?.area || "Unknown";
  ui.statCorruption.textContent = gameState.corruption;
  ui.statMercy.textContent = gameState.mercy;
  ui.statInfluence.textContent = gameState.influence;
  ui.statDevotion.textContent = gameState.devotion;
  ui.statFollowers.textContent = gameState.followerCount;
  ui.statGold.textContent = gameState.gold;

  renderRelics();
};

window.renderRelics = function () {
  ui.relicList.innerHTML = "";

  if (!gameState.relics || gameState.relics.length === 0) {
    const li = document.createElement("li");
    li.textContent = "None";
    ui.relicList.appendChild(li);
    return;
  }

  gameState.relics.forEach((relic) => {
    const li = document.createElement("li");
    li.textContent = relic;
    ui.relicList.appendChild(li);
  });
};

window.renderChoices = function (choices) {
  ui.choicesContainer.innerHTML = "";

  if (!choices || choices.length === 0) {
    const endNote = document.createElement("div");
    endNote.className = "footer-note";
    endNote.textContent = "No choices available.";
    ui.choicesContainer.appendChild(endNote);
    return;
  }

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => {
      if (typeof handleChoiceAction === "function") {
        handleChoiceAction(choice.action);
      }
    });
    ui.choicesContainer.appendChild(btn);
  });
};

window.renderScene = async function () {
  const scene = getCurrentScene();

  if (!scene) {
    ui.sceneTitle.textContent = "Broken Road";
    ui.speakerName.textContent = "Narrator";
    ui.dialogueText.textContent = "The scene failed to load. Your code has offended the chapel.";
    ui.choicesContainer.innerHTML = "";
    return;
  }

  ui.sceneTitle.textContent = scene.area || "Unknown";
  ui.speakerName.textContent = scene.speaker || "Narrator";
  ui.dialogueText.textContent = "";

  updateStatsUI();
  await typeSceneText(scene.text || []);
  renderChoices(scene.choices || []);
};

window.typeSceneText = async function (textLines) {
  const fullText = Array.isArray(textLines) ? textLines.join("\n\n") : String(textLines || "");
  ui.dialogueText.textContent = "";

  for (let i = 0; i < fullText.length; i += 1) {
    const char = fullText[i];
    ui.dialogueText.textContent += char;

    if (window.audioSystem && typeof window.audioSystem.handleTypedCharacter === "function") {
      window.audioSystem.handleTypedCharacter(char, getCurrentScene()?.speaker || "Narrator");
    }

    const delay = getTypingDelay(char);
    await sleep(delay);
  }
};

window.getTypingDelay = function (char) {
  if (char === ".") return 45;
  if (char === ",") return 30;
  if (char === "\n") return 80;
  if (char === " ") return 12;
  return 18;
};

window.sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
