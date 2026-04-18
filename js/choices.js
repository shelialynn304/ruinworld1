window.CHOICE_HANDLERS = {
  beginNameEntry() {
    gameState.currentScene = "namePrompt";
  },
  confirmName() {
    const enteredName = getEnteredName();
    gameState.playerName = enteredName || "Wanderer";
    gameState.currentScene = "afterName";
  },
  temperamentReflective() {
    gameState.temperament = "reflective";
    gameState.mercy += 1;
    gameState.graveClue = "fresh shovel cuts around the open grave";
    gameState.currentScene = "memoryOrigin";
  },
  temperamentStoic() {
    gameState.temperament = "stoic";
    gameState.influence += 1;
    gameState.graveClue = "boot marks leading from the grave toward the chapel";
    gameState.currentScene = "memoryOrigin";
  },
  temperamentDefiant() {
    gameState.temperament = "defiant";
    gameState.corruption += 1;
    gameState.graveClue = "a broken grave marker carved with a crown sigil";
    gameState.currentScene = "memoryOrigin";
  },
  setOriginBellKeeper() {
    gameState.origin = "bell-keeper";
    gameState.memoryState = "stirring";
    gameState.devotion += 1;
    gameState.currentScene = "memoryMotive";
  },
  setOriginOathbound() {
    gameState.origin = "oathbound-soldier";
    gameState.memoryState = "stirring";
    gameState.influence += 1;
    gameState.currentScene = "memoryMotive";
  },
  setOriginScriptor() {
    gameState.origin = "forbidden-scriptor";
    gameState.memoryState = "stirring";
    gameState.corruption += 1;
    gameState.currentScene = "memoryMotive";
  },
  setMotiveRedemption() {
    gameState.motive = "redemption";
    gameState.mercy += 1;
    gameState.currentScene = "memoryProphecy";
  },
  setMotivePower() {
    gameState.motive = "power";
    gameState.corruption += 1;
    gameState.currentScene = "memoryProphecy";
  },
  setMotiveRevenge() {
    gameState.motive = "revenge";
    gameState.influence += 1;
    gameState.currentScene = "memoryProphecy";
  },
  setProphecyFaith() {
    gameState.prophecyStance = "faith";
    gameState.devotion += 1;
    gameState.currentScene = "chapelApproach";
  },
  setProphecyDefiance() {
    gameState.prophecyStance = "defiance";
    gameState.influence += 1;
    gameState.currentScene = "chapelApproach";
  },
  setProphecyManipulate() {
    gameState.prophecyStance = "manipulate";
    gameState.corruption += 1;
    gameState.currentScene = "chapelApproach";
  },
  circleChapel() {
    gameState.influence += 1;
    gameState.currentScene = "chapelExterior";
  },
  hailMaraFromPath() {
    gameState.devotion += 1;
    gameState.currentScene = "chapelExterior";
  },
  goToChapel() {
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
    if (!gameState.flags.approachedAltar) {
      gameState.devotion += 1;
      gameState.flags.approachedAltar = true;
    }
    gameState.currentScene = "chapelAltar";
  },
  inspectMural() {
    if (!gameState.flags.inspectedMural) {
      gameState.influence += 1;
      gameState.flags.inspectedMural = true;
    }
    gameState.currentScene = "chapelMural";
  },
  returnToMara() {
    gameState.currentScene = "chapelExterior";
  }
};

window.handleChoiceAction = async function (action) {
  const handler = window.CHOICE_HANDLERS[action];
  if (typeof handler === "function") {
    handler();
  } else {
    console.warn("Unknown choice action:", action);
  }

  updateStatsUI();
  await renderScene();
};

window.getStoryActions = function () {
  if (!window.STORY) return [];

  const actions = new Set();
  Object.values(STORY).forEach((scene) => {
    (scene?.choices || []).forEach((choice) => {
      if (choice?.action) actions.add(choice.action);
    });

    if (scene?.nameEntryAction) {
      actions.add(scene.nameEntryAction);
    }
  });

  return [...actions];
};

window.findMissingChoiceHandlers = function () {
  return getStoryActions().filter((action) => typeof window.CHOICE_HANDLERS[action] !== "function");
};

window.validateChoiceHandlers = function () {
  const missing = findMissingChoiceHandlers();
  if (missing.length > 0) {
    console.warn("Missing choice handlers:", missing.join(", "));
    return false;
  }
  return true;
};

window.getEnteredName = function () {
  const input = document.getElementById("name-entry-input");
  return input ? input.value.trim() : "";
};

function addRelic(relicName) {
  if (!Array.isArray(gameState.relics)) {
    gameState.relics = [];
  }

  if (!gameState.relics.includes(relicName)) {
    gameState.relics.push(relicName);
  }
}
