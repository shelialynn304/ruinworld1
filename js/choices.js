window.handleChoiceAction = async function (action) {
  const handlers = {
    searchRoad() {
      gameState.currentScene = "roadSearch";
    },
    prayAtRoad() {
      gameState.flags.prayedAtRoad = true;
      gameState.devotion += 1;
      gameState.currentScene = "roadPrayer";
    },
    prayAgain() {
      gameState.flags.prayedAtRoad = true;
      gameState.devotion += 1;
      gameState.influence += 1;
      gameState.currentScene = "chapelExterior";
    },
    goToChapel() {
      gameState.currentScene = "chapelExterior";
    },
    takeCoinsAndCharm() {
      gameState.gold += 12;
      gameState.flags.tookRoadCoins = true;
      gameState.flags.foundBoneCharm = true;
      addRelic("Bone Charm");
      gameState.currentScene = "chapelExterior";
    },
    takeCoinsOnly() {
      gameState.gold += 12;
      gameState.flags.tookRoadCoins = true;
      gameState.currentScene = "chapelExterior";
    },
    leaveRoadItems() {
      gameState.mercy += 1;
      gameState.currentScene = "chapelExterior";
    },
    askOldWomanIdentity() {
      gameState.currentScene = "oldWomanIdentity";
    },
    askOldWomanExpectation() {
      gameState.currentScene = "oldWomanExpectation";
    },
    threatenOldWoman() {
      gameState.flags.threatenedMara = true;
      gameState.corruption += 1;
      gameState.currentScene = "oldWomanThreatened";
    },
    backDownToMara() {
      gameState.mercy += 1;
      gameState.currentScene = "oldWomanIdentity";
    },
    doubleThreatenMara() {
      gameState.flags.threatenedMara = true;
      gameState.corruption += 1;
      gameState.currentScene = "oldWomanThreatened";
    },
    askWhyHere() {
      gameState.currentScene = "chapelEntry";
    },
    askMaraHelp() {
      gameState.flags.trustedMara = true;
      gameState.devotion += 1;
      gameState.currentScene = "chapelEntry";
    },
    insultMara() {
      gameState.flags.insultedMara = true;
      gameState.corruption += 1;
      gameState.currentScene = "chapelEntry";
    },
    tryToLeave() {
      gameState.mercy += 1;
      gameState.currentScene = "chapelEntry";
    },
    acceptStrangeness() {
      gameState.devotion += 1;
      gameState.currentScene = "chapelEntry";
    },
    approachAltar() {
      gameState.devotion += 1;
    },
    inspectMural() {
      gameState.influence += 1;
    },
    returnToMara() {
      gameState.currentScene = "chapelExterior";
    }
  };

  const handler = handlers[action];
  if (typeof handler === "function") {
    handler();
  } else {
    console.warn("Unknown choice action:", action);
  }

  updateStatsUI();
  await renderScene();
};

function addRelic(relicName) {
  if (!Array.isArray(gameState.relics)) {
    gameState.relics = [];
  }

  if (!gameState.relics.includes(relicName)) {
    gameState.relics.push(relicName);
  }
}
