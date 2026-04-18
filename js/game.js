import { keys } from "./input.js";
      ]
    );
  }

  function closeDialogue() {
    state.dialogueOpen = false;
    dialogueApi.hide();
    syncHud();
  }

  function drawPlayer() {
    const p = state.player;
    ctx.fillStyle = state.corruption >= 10 ? "#d66aa7" : "#6aa7d6";
    ctx.fillRect(p.x, p.y, p.width, p.height);

    ctx.fillStyle = "#111";
    ctx.fillRect(p.x + 4, p.y + 5, 4, 4);
    ctx.fillRect(p.x + 14, p.y + 5, 4, 4);
  }

  function drawShrineGlow() {
    ctx.fillStyle = state.corruption >= 10 ? "rgba(201, 76, 141, 0.2)" : "rgba(119, 100, 200, 0.2)";
    ctx.fillRect(18 * TILE_SIZE - 4, 1 * TILE_SIZE - 4, TILE_SIZE + 8, TILE_SIZE + 8);
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld(ctx, state);
    drawShrineGlow();
    drawNPC(ctx, state);
    drawPlayer();
  }

  function loop() {
    update();
    render();
    requestAnimationFrame(loop);
  }

  syncHud();
  loop();

  return {
    getState,
    setState,
    resetState() {
      state = structuredClone(defaultState);
      npc.interacted = false;
      syncHud();
    },
  };
}
