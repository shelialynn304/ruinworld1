export function createUI() {
  const elements = {
    titleScreen: document.getElementById("titleScreen"),
    gameScreen: document.getElementById("gameScreen"),
    areaLabel: document.getElementById("areaLabel"),
    speakerName: document.getElementById("speakerName"),
    dialogueText: document.getElementById("dialogueText"),
    choiceList: document.getElementById("choiceList"),
    statCorruption: document.getElementById("statCorruption"),
    statMercy: document.getElementById("statMercy"),
    statInfluence: document.getElementById("statInfluence"),
    statDevotion: document.getElementById("statDevotion"),
    statFollowers: document.getElementById("statFollowers"),
    statGold: document.getElementById("statGold"),
  };

  function showTitle() {
    elements.titleScreen.classList.remove("hidden");
    elements.gameScreen.classList.add("hidden");
  }

  function showGame() {
    elements.titleScreen.classList.add("hidden");
    elements.gameScreen.classList.remove("hidden");
  }

  function renderStats(stats) {
    elements.statCorruption.textContent = stats.corruption;
    elements.statMercy.textContent = stats.mercy;
    elements.statInfluence.textContent = stats.influence;
    elements.statDevotion.textContent = stats.devotion;
    elements.statFollowers.textContent = stats.followerCount;
    elements.statGold.textContent = stats.gold;
  }

  function renderScene(scene, state, onChoice) {
    elements.areaLabel.textContent = scene.area;
    elements.speakerName.textContent = scene.speaker;

    const activeLine = scene.lines[state.lineIndex] || "";
    elements.dialogueText.textContent = activeLine;

    elements.choiceList.innerHTML = "";

    const hasNextLine = state.lineIndex < scene.lines.length - 1;
    if (hasNextLine) {
      const continueButton = document.createElement("button");
      continueButton.textContent = "Continue";
      continueButton.addEventListener("click", () => onChoice({ action: "__next_line__" }));
      elements.choiceList.appendChild(continueButton);
      return;
    }

    scene.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.label;
      button.addEventListener("click", () => onChoice(choice));
      elements.choiceList.appendChild(button);
    });
  }

  return {
    showTitle,
    showGame,
    renderScene,
    renderStats,
  };
}
