import { circleNearRect } from "./collision.js";
import { consumeInteractPress } from "./input.js";
import { openDialogue, isDialogueOpen } from "./dialogue.js";
import { getPlayerFeetPosition } from "./player.js";

export function getNearbyInteractable(player, map) {
  const feet = getPlayerFeetPosition(player);

  return map.interactables.find((interactable) =>
    circleNearRect({ x: feet.x, y: feet.y, radius: interactable.radius }, interactable)
  );
}

export function updateInteraction(player, map, onDialogueClosed) {
  const nearby = getNearbyInteractable(player, map);

  if (nearby && consumeInteractPress() && !isDialogueOpen()) {
    openDialogue(nearby.sceneId, onDialogueClosed);
  }

  return nearby;
}
