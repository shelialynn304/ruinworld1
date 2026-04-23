const SPRITE_FRAME_SIZE = 32;
const PLAYER_DRAW_SCALE = 2;
const PLAYER_DRAW_SIZE = SPRITE_FRAME_SIZE * PLAYER_DRAW_SCALE;
const PLAYER_FEET_OFFSET = 6;

const CHARACTER_START_COLUMN = 3;
const CHARACTER_START_ROW = 0;

const DEBUG_PLAYER_RENDER = false;

const playerSprite = new Image();
playerSprite.src = "assets/images/rogues.png";

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

function getPlayerSpriteDrawMetrics(player) {
  const drawX = Math.round(player.x + player.width / 2 - PLAYER_DRAW_SIZE / 2);
  const drawY = Math.round(player.y + player.height - PLAYER_DRAW_SIZE + PLAYER_FEET_OFFSET);
  const feetX = Math.round(player.x + player.width / 2);
  const feetY = Math.round(player.y + player.height);

  return { drawX, drawY, feetX, feetY };
}

function drawPlayerDebug(ctx, player, metrics) {
  ctx.strokeStyle = "rgba(60, 255, 120, 0.95)";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    Math.round(player.x) + 0.5,
    Math.round(player.y) + 0.5,
    Math.round(player.width),
    Math.round(player.height)
  );

  ctx.strokeStyle = "rgba(255, 80, 220, 0.95)";
  ctx.strokeRect(
    metrics.drawX + 0.5,
    metrics.drawY + 0.5,
    PLAYER_DRAW_SIZE,
    PLAYER_DRAW_SIZE
  );

  ctx.strokeStyle = "rgba(255, 235, 80, 1)";
  ctx.beginPath();
  ctx.moveTo(metrics.feetX - 3, metrics.feetY + 0.5);
  ctx.lineTo(metrics.feetX + 3, metrics.feetY + 0.5);
  ctx.moveTo(metrics.feetX + 0.5, metrics.feetY - 3);
  ctx.lineTo(metrics.feetX + 0.5, metrics.feetY + 3);
  ctx.stroke();
}

function drawPlayerSprite(ctx, player) {
  if (!playerSprite.complete || playerSprite.naturalWidth === 0) return;

  const sx = CHARACTER_START_COLUMN * SPRITE_FRAME_SIZE;
  const sy = CHARACTER_START_ROW * SPRITE_FRAME_SIZE;

  const metrics = getPlayerSpriteDrawMetrics(player);

  ctx.drawImage(
    playerSprite,
    sx,
    sy,
    SPRITE_FRAME_SIZE,
    SPRITE_FRAME_SIZE,
    metrics.drawX,
    metrics.drawY,
    PLAYER_DRAW_SIZE,
    PLAYER_DRAW_SIZE
  );

  if (DEBUG_PLAYER_RENDER) {
    drawPlayerDebug(ctx, player, metrics);
  }
}
export function renderScene(ctx, map, player, nearbyInteractable, timeMs) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const scaleX = canvasWidth / map.width;
  const scaleY = canvasHeight / map.height;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

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

  ctx.setTransform(1, 0, 0, 1, 0, 0);


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

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
