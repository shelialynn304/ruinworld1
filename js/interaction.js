import { circleNearRect } from "./collision.js";
import { consumeInteractPress } from "./input.js";
import { openDialogue, isDialogueOpen } from "./dialogue.js";

export function getNearbyInteractable(player, map) {
  const center = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2
  };

  return map.interactables.find((interactable) =>
    circleNearRect(
      { x: center.x, y: center.y, radius: interactable.radius },
      interactable
    )
  );
}

export function updateInteraction(player, map, onDialogueClosed) {
  const nearby = getNearbyInteractable(player, map);

  if (nearby && consumeInteractPress() && !isDialogueOpen()) {
    openDialogue(nearby.sceneId, onDialogueClosed);
  }

  return nearby;
}
