export const npc = {
  x: 11 * 32,
  y: 9 * 32,
  width: 24,
  height: 24,
  interacted: false,
};

export function isNearNPC(player, npcObj) {
  const dx = player.x - npcObj.x;
  const dy = player.y - npcObj.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 42;
}

export function drawNPC(ctx, state) {
  ctx.fillStyle = state.corruption >= 10 ? "#f06a9b" : "#f0d36a";
  ctx.fillRect(npc.x, npc.y, npc.width, npc.height);

  ctx.fillStyle = "#111";
  ctx.fillRect(npc.x + 5, npc.y + 6, 4, 4);
  ctx.fillRect(npc.x + 15, npc.y + 6, 4, 4);
}
