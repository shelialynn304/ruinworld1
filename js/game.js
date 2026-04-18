import { keys } from "./input.js";
import { drawWorld, getTileAt, isBlocked, TILE_SIZE } from "./world.js";
import { drawNPC, isNearNPC, npc } from "./npc.js";
import { createEnemy, drawEnemy, intersects, updateEnemy } from "./enemy.js";
import { addItem } from "./inventory.js";

export const defaultState = {
  player: {
    x: 64,
    y: 64,
    width: 22,
    height: 22,
    speed: 2.2,
    hp: 10,
    maxHp: 10,
    gold: 25,
    facing: "down",
    attackCooldown: 0,
    invulnerableFrames: 0,
  },
  corruption: 0,
  area: "Starter Field",
  flags: {
    choseRitual: false,
    helpedSeer: false,
  },
  inventory: {
    items: [],
  },
  chest: {
    opened: false,
  },
  dialogueOpen: false,
};

export function createGame(canvas, dialogueApi) {
  const ctx = canvas.getContext("2d");

  let state = structuredClone(defaultState);

  const enemy = createEnemy(420, 240);

  const chest = {
    x: 300,
    y: 200,
    width: 20,
    height: 20,
    opened: false,
  };

  function setState(newState) {
    state = {
      ...structuredClone(defaultState),
      ...newState,
      player: {
        ...structuredClone(defaultState.player),
        ...(newState.player || {}),
      },
      flags: {
        ...structuredClone(defaultState.flags),
        ...(newState.flags || {}),
      },
      inventory: {
        ...structuredClone(defaultState.inventory),
        ...(newState.inventory || {}),
      },
      chest: {
        ...structuredClone(defaultState.chest),
        ...(newState.chest || {}),
      },
    };

    if (!Array.isArray(state.inventory.items)) {
      state.inventory.items = [];
    }

    if (newState.enemy) {
      Object.assign(enemy, newState.enemy);
    } else {
      Object.assign(enemy, createEnemy(420, 240));
    }

    chest.opened = Boolean(state.chest?.opened);
    npc.interacted = Boolean(state.flags?.choseRitual || state.flags?.helpedSeer);

    syncHud();
  }

  function getState() {
    return {
      ...structuredClone(state),
      chest: {
        opened: chest.opened,
      },
      enemy: {
        x: enemy.x,
        y: enemy.y,
        width: enemy.width,
        height: enemy.height,
        hp: enemy.hp,
        maxHp: enemy.maxHp,
        speed: enemy.speed,
        direction: enemy.direction,
        patrolDistance: enemy.patrolDistance,
        startX: enemy.startX,
        alive: enemy.alive,
        respawnTimer: enemy.respawnTimer,
        touchDamageCooldown: enemy.touchDamageCooldown,
        goldDrop: enemy.goldDrop,
      },
    };
  }

  function syncHud() {
    const hpEl = document.getElementById("hp");
    const goldEl = document.getElementById("gold");
    const corruptionEl = document.getElementById("corruption");
    const areaEl = document.getElementById("area");
    const invText = document.getElementById("invText");

    if (hpEl) hpEl.textContent = `${state.player.hp}/${state.player.maxHp}`;
    if (goldEl) goldEl.textContent = state.player.gold;
    if (corruptionEl) corruptionEl.textContent = state.corruption;
    if (areaEl) areaEl.textContent = state.area;

    if (invText) {
      invText.textContent = state.inventory.items.length
        ? state.inventory.items.map((item) => `${item.name} x${item.qty}`).join(", ")
        : "Empty";
    }
  }

  function tryMove(dx, dy) {
    const nextX = state.player.x + dx;
    const nextY = state.player.y + dy;

    const corners = [
      { x: nextX, y: nextY },
      { x: nextX + state.player.width, y: nextY },
      { x: nextX, y: nextY + state.player.height },
      { x: nextX + state.player.width, y: nextY + state.player.height },
    ];

    const blocked = corners.some((corner) => isBlocked(corner.x, corner.y));

    if (!blocked) {
      state.player.x = nextX;
      state.player.y = nextY;
    }
  }

  function getAttackBox() {
    const p = state.player;
    const size = 20;

    if (p.facing === "up") {
      return {
        x: p.x + 1,
        y: p.y - size,
        width: p.width - 2,
        height: size,
      };
    }

    if (p.facing === "down") {
      return {
        x: p.x + 1,
        y: p.y + p.height,
        width: p.width - 2,
        height: size,
      };
    }

    if (p.facing === "left") {
      return {
        x: p.x - size,
        y: p.y + 1,
        width: size,
        height: p.height - 2,
      };
    }

    return {
      x: p.x + p.width,
      y: p.y + 1,
      width: size,
      height: p.height - 2,
    };
  }

  function doAttack() {
    if (state.player.attackCooldown > 0) return;

    state.player.attackCooldown = 18;
    const attackBox = getAttackBox();

    if (enemy.alive && intersects(attackBox, enemy)) {
      enemy.hp -= 1;

      if (enemy.hp <= 0) {
        enemy.alive = false;
        enemy.respawnTimer = 360;
        state.player.gold += enemy.goldDrop;
      }
    }

    syncHud();
  }

  function damagePlayer(amount) {
    if (state.player.invulnerableFrames > 0) return;

    state.player.hp = Math.max(0, state.player.hp - amount);
    state.player.invulnerableFrames = 45;

    if (state.player.hp <= 0) {
      state.player.hp = state.player.maxHp;
      state.player.x = 64;
      state.player.y = 64;
      state.player.gold = Math.max(0, state.player.gold - 15);
    }

    syncHud();
  }

  function openChest() {
    if (chest.opened) return;

    chest.opened = true;
    state.chest.opened = true;

    const roll = Math.random();

    if (roll < 0.7) {
      state.player.gold += 25;
    } else {
      addItem(state.inventory, {
        id: "rare_blade",
        name: "Rare Blade",
        qty: 1,
      });
    }

    syncHud();
  }

  function updatePlayerStateFromInput() {
    let dx = 0;
    let dy = 0;

    if (keys.up) {
      dy -= state.player.speed;
      state.player.facing = "up";
    }
    if (keys.down) {
      dy += state.player.speed;
      state.player.facing = "down";
    }
    if (keys.left) {
      dx -= state.player.speed;
      state.player.facing = "left";
    }
    if (keys.right) {
      dx += state.player.speed;
      state.player.facing = "right";
    }

    if (dx !== 0) tryMove(dx, 0);
    if (dy !== 0) tryMove(0, dy);

    if (keys.attack) {
      doAttack();
      keys.attack = false;
    }

    if (keys.interact && isNearNPC(state.player, npc) && !npc.interacted) {
      openSeerDialogue();
      keys.interact = false;
      return;
    }

    if (keys.interact && !chest.opened && intersects(state.player, chest)) {
      openChest();
      keys.interact = false;
      return;
    }

    if (keys.interact) {
      keys.interact = false;
    }
  }

  function updateCombatState() {
    updateEnemy(enemy, state);

    if (enemy.alive && intersects(state.player, enemy) && enemy.touchDamageCooldown <= 0) {
      const damage = state.corruption >= 10 ? 2 : 1;
      damagePlayer(damage);
      enemy.touchDamageCooldown = 40;
    }

    if (state.player.attackCooldown > 0) state.player.attackCooldown -= 1;
    if (state.player.invulnerableFrames > 0) state.player.invulnerableFrames -= 1;
  }

  function update() {
    if (!state.dialogueOpen) {
      updatePlayerStateFromInput();
      updateCombatState();
    }

    const standingTile = getTileAt(
      state.player.x + state.player.width / 2,
      state.player.y + state.player.height / 2
    );

    if (standingTile === 2) {
      state.area = state.corruption >= 10 ? "Ritual Ground" : "Silent Shrine";
    } else {
      state.area = "Starter Field";
    }
  }

  function openSeerDialogue() {
    state.dialogueOpen = true;

    dialogueApi.show(
      "The Seer whispers: 'The world is weak. Feed the old altar and power will answer. Refuse, and the land remains safer... but poorer.'",
      [
        {
          label: "Perform the ritual (+10 corruption, +50 gold)",
          action: () => {
            state.corruption += 10;
            state.player.gold += 50;
            state.flags.choseRitual = true;
            npc.interacted = true;
            closeDialogue();
          },
        },
        {
          label: "Refuse and help the village (-5 corruption, +10 gold)",
          action: () => {
            state.corruption = Math.max(0, state.corruption - 5);
            state.player.gold += 10;
            state.flags.helpedSeer = true;
            npc.interacted = true;
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
    ctx.fillStyle =
      state.corruption >= 10
        ? "rgba(201, 76, 141, 0.2)"
        : "rgba(119, 100, 200, 0.2)";

    ctx.fillRect(18 * TILE_SIZE - 4, 1 * TILE_SIZE - 4, TILE_SIZE + 8, TILE_SIZE + 8);
  }

  function drawChest() {
    ctx.fillStyle = chest.opened ? "#555" : "#c9a23a";
    ctx.fillRect(chest.x, chest.y, chest.width, chest.height);

    ctx.strokeStyle = "#111";
    ctx.strokeRect(chest.x, chest.y, chest.width, chest.height);
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld(ctx, state);
    drawShrineGlow();
    drawChest();
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
      chest.opened = false;
      npc.interacted = false;
      syncHud();
    },
  };
}
