const SPRITE_SIZE = 32;

const playerSprite = new Image();
playerSprite.src = "assets/images/spritesheet.png";

function drawRain(ctx, width, height, timeMs) {
  ctx.strokeStyle = "rgba(180, 190, 220, 0.22)";
  ctx.lineWidth = 1;

  for (let i = 0; i < 70; i += 1) {
    const x = (i * 17 + timeMs * 0.12) % width;
    const y = (i * 37 + timeMs * 0.24) % height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 4, y + 12);
    ctx.stroke();
  }
}

function drawPixelRect(ctx, x, y, w, h, colors) {
  ctx.fillStyle = colors.base;
  ctx.fillRect(x, y, w, h);

  if (colors.shadow) {
    ctx.fillStyle = colors.shadow;
    ctx.fillRect(x, y + h - 3, w, 3);
  }

  if (colors.highlight) {
    ctx.fillStyle = colors.highlight;
    ctx.fillRect(x, y, w, 2);
  }
}

function drawPlayerSprite(ctx, player) {
  if (!playerSprite.complete) return;

  const sx = player.spriteFrame * SPRITE_SIZE;
  const sy = player.spriteDirection * SPRITE_SIZE;

  ctx.drawImage(
    playerSprite,
    sx,
    sy,
    SPRITE_SIZE,
    SPRITE_SIZE,
    Math.round(player.x - 4),
    Math.round(player.y - 2),
    SPRITE_SIZE,
    SPRITE_SIZE
  );
}

export function renderScene(ctx, map, player, nearbyInteractable, timeMs) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, map.width, map.height);

  ctx.fillStyle = "#11131a";
  ctx.fillRect(0, 0, map.width, map.height);

  ctx.fillStyle = "#1c2320";
  ctx.fillRect(0, map.height * 0.4, map.width, map.height * 0.6);

  map.obstacles.forEach((obstacle) => {
    drawPixelRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
      base: "#3b3533",
      shadow: "#26211f",
      highlight: "#5c5350"
    });
  });

  // 👇 THIS is your real player now
  drawPlayerSprite(ctx, player);

  drawRain(ctx, map.width, map.height, timeMs);

  if (nearbyInteractable) {
    ctx.strokeStyle = "rgba(222, 204, 145, 0.7)";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      nearbyInteractable.x - 2,
      nearbyInteractable.y - 2,
      nearbyInteractable.width + 4,
      nearbyInteractable.height + 4
    );
  }
}
