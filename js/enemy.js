export function createEnemy(x, y) {
    startX: x,
    alive: true,
    respawnTimer: 0,
    touchDamageCooldown: 0,
    goldDrop: 12,
  };
}

export function updateEnemy(enemy, state) {
  if (!enemy.alive) {
    if (enemy.respawnTimer > 0) enemy.respawnTimer -= 1;
    if (enemy.respawnTimer <= 0) {
      enemy.alive = true;
      enemy.hp = enemy.maxHp;
      enemy.x = enemy.startX;
    }
    return;
  }

  const boost = state.corruption >= 10 ? 0.35 : 0;
  enemy.speed = 1 + boost;

  enemy.x += enemy.speed * enemy.direction;

  if (enemy.x > enemy.startX + enemy.patrolDistance) {
    enemy.direction = -1;
  }

  if (enemy.x < enemy.startX) {
    enemy.direction = 1;
  }

  if (enemy.touchDamageCooldown > 0) {
    enemy.touchDamageCooldown -= 1;
  }
}

export function drawEnemy(ctx, enemy, state) {
  if (!enemy.alive) return;

  ctx.fillStyle = state.corruption >= 10 ? "#b03f6b" : "#c85a3d";
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

  ctx.fillStyle = "#111";
  ctx.fillRect(enemy.x + 4, enemy.y + 5, 4, 4);
  ctx.fillRect(enemy.x + 14, enemy.y + 5, 4, 4);

  // tiny health bar
  ctx.fillStyle = "#111";
  ctx.fillRect(enemy.x, enemy.y - 6, enemy.width, 4);
  ctx.fillStyle = "#6fe36f";
  ctx.fillRect(enemy.x, enemy.y - 6, enemy.width * (enemy.hp / enemy.maxHp), 4);
}

export function intersects(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
