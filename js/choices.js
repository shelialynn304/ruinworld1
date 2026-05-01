import { gameState } from "./state.js";

export const CHOICE_HANDLERS = {
  markChapelTouched() {
    gameState.flags.touchedChapelDoor = true;
    gameState.corruption += 1;
    gameState.conviction += 1;
  },
  steadyResolve() {
    gameState.mercy += 1;
    gameState.fear = Math.max(0, gameState.fear - 1);
  },
  acceptWhisper() {
    gameState.flags.acceptedWhisper = true;
    gameState.memoryState = "stirring";
    gameState.corruption += 1;
    gameState.devotion += 1;
  },
  rejectWhisper() {
    gameState.flags.rejectedWhisper = true;
    gameState.conviction += 1;
    gameState.doubt += 1;
  },
  takePrayerCloth() {
    gameState.flags.tookPrayerCloth = true;
    gameState.relics = gameState.relics || [];
    if (!gameState.relics.includes("Drowned Prayer-Cloth")) {
      gameState.relics.push("Drowned Prayer-Cloth");
    }
    gameState.devotion += 1;
  },
  leavePrayerCloth() {
    gameState.flags.leftPrayerCloth = true;
    gameState.mercy += 1;
    gameState.influence += 1;
  },
  inspectCrownedGrave() {
    gameState.flags.sawCrownedGrave = true;
    gameState.memoryState = "awakening";
    gameState.graveClue = "a crown carved in fresh stone";
    gameState.doubt += 1;
    gameState.influence += 1;
  },
  retreatFromGraves() {
    gameState.flags.refusedCrownedGrave = true;
    gameState.fear += 1;
    gameState.mercy += 1;
  }
};


function hasRewardedInteraction(interactionId) {
  if (!interactionId) return false;
  return Array.isArray(gameState.rewardedInteractions) && gameState.rewardedInteractions.includes(interactionId);
}

function markInteractionRewarded(interactionId) {
  if (!interactionId) return;
  if (!Array.isArray(gameState.rewardedInteractions)) {
    gameState.rewardedInteractions = [];
  }
  if (!gameState.rewardedInteractions.includes(interactionId)) {
    gameState.rewardedInteractions.push(interactionId);
  }
}

export function runChoiceAction(action, interactionId = null) {
  const handler = CHOICE_HANDLERS[action];
  if (typeof handler !== "function") return;

  if (hasRewardedInteraction(interactionId)) return;

  handler();
  markInteractionRewarded(interactionId);
}
