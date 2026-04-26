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
  statConviction: null,
  statFear: null,
  statDoubt: null,
  statFollowers: null,
  statGold: null,
  playerNameLabel: null,
  titleScreen: null,
  gameScreen: null,
  activeRenderToken: 0
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
  ui.statConviction = document.getElementById("stat-conviction");
  ui.statFear = document.getElementById("stat-fear");
  ui.statDoubt = document.getElementById("stat-doubt");
  ui.statFollowers = document.getElementById("stat-followers");
  ui.statGold = document.getElementById("stat-gold");
  ui.playerNameLabel = document.getElementById("player-name-label");

  ui.titleScreen = document.getElementById("title-screen");
  ui.gameScreen = document.getElementById("gameScreen");
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
  ui.statConviction.textContent = gameState.conviction;
  ui.statFear.textContent = gameState.fear;
  ui.statDoubt.textContent = gameState.doubt;
  ui.statFollowers.textContent = gameState.followerCount;
  ui.statGold.textContent = gameState.gold;

  if (ui.playerNameLabel) {
    ui.playerNameLabel.textContent = gameState.playerName || "Wanderer";
  }

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

window.renderChoices = function (scene) {
  ui.choicesContainer.innerHTML = "";

  if (scene?.nameEntry) {
    renderNameEntry(scene);
    return;
  }

  const choices = scene?.choices || [];

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
      if (ui.isTypingSceneText) return;
      if (typeof handleChoiceAction === "function") {
        handleChoiceAction(choice.action);
      }
    });
    ui.choicesContainer.appendChild(btn);
  });
};

window.renderNameEntry = function (scene) {
  const wrapper = document.createElement("div");
  wrapper.className = "name-entry-wrap";

  const label = document.createElement("label");
  label.className = "name-entry-label";
  label.setAttribute("for", "name-entry-input");
  label.textContent = scene.nameEntryLabel || "Name";

  const input = document.createElement("input");
  input.id = "name-entry-input";
  input.className = "name-entry-input";
  input.type = "text";
  input.maxLength = 24;
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = "Wanderer";

  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.className = "choice-btn";
  submitBtn.textContent = "Speak it into the rain.";
  submitBtn.addEventListener("click", () => {
    if (ui.isTypingSceneText) return;
    if (typeof handleChoiceAction === "function") {
      handleChoiceAction(scene.nameEntryAction || "confirmName");
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtn.click();
    }
  });

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.appendChild(submitBtn);
  ui.choicesContainer.appendChild(wrapper);
  input.focus();
};

window.renderScene = async function () {
  const renderToken = Date.now();
  ui.activeRenderToken = renderToken;
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
  await typeSceneText(scene.text || [], renderToken);
  if (ui.activeRenderToken !== renderToken) return;
  renderChoices(scene);
};

window.typeSceneText = async function (textLines, renderToken) {
  const fullText = Array.isArray(textLines) ? textLines.join("\n\n") : String(textLines || "");
  ui.dialogueText.textContent = "";
  ui.isTypingSceneText = true;

  try {
    for (let i = 0; i < fullText.length; i += 1) {
      if (ui.activeRenderToken !== renderToken) return;
      const char = fullText[i];
      ui.dialogueText.textContent += char;

      if (window.audioSystem && typeof window.audioSystem.handleTypedCharacter === "function") {
        window.audioSystem.handleTypedCharacter(char, getCurrentScene()?.speaker || "Narrator");
      }

      const delay = getTypingDelay(char);
      await sleep(delay);
    }
  } finally {
    if (ui.activeRenderToken === renderToken) {
      ui.isTypingSceneText = false;
    }
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
