import { keys } from "./input.js";
            closeDialogue();
          },
        },
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
    const flashing = p.invulnerableFrames > 0 && p.invulnerableFrames % 6 < 3;
    if (flashing) return;

    ctx.fillStyle = state.corruption >= 10 ? "#d66aa7" : "#6aa7d6";
    ctx.fillRect(p.x, p.y, p.width, p.height);

    ctx.fillStyle = "#111";
    ctx.fillRect(p.x + 4, p.y + 5, 4, 4);
    ctx.fillRect(p.x + 14, p.y + 5, 4, 4);
  }

  function drawAttackSlash() {
    if (state.player.attackCooldown < 12 && state.player.attackCooldown > 0) {
      const box = getAttackBox();
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(box.x, box.y, box.width, box.height);
    }
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
    drawEnemy(ctx, enemy, state);
    drawPlayer();
    drawAttackSlash();
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
      Object.assign(enemy, createEnemy(420, 240));
      npc.interacted = false;
      syncHud();
    },
  };
}
