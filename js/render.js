const SPRITE_FRAME_SIZE = 32;
const PLAYER_DRAW_SCALE = 2;
const PLAYER_DRAW_SIZE = SPRITE_FRAME_SIZE * PLAYER_DRAW_SCALE;
const PLAYER_FEET_OFFSET = 6;

const CHARACTER_START_COLUMN = 3;
const CHARACTER_START_ROW = 0;

const DEBUG_PLAYER_RENDER = false;
const TILE_SIZE = 32;
const GROUND_START_RATIO = 0.4;

const playerSprite = new Image();
playerSprite.src = "assets/images/rogues.png";

const tileSprite = new Image();
tileSprite.src = "assets/images/tiles.png";

const GROUND_TILES = [
  { col: 0, row: 11 },
  { col: 1, row: 11 },
  { col: 2, row: 11 },
  { col: 0, row: 12 }
];

const DETAIL_TILES = [
  { col: 5, row: 15 },
  { col: 6, row: 15 },
  { col: 7, row: 15 },
  { col: 0, row: 10 },
  { col: 1, row: 10 }
];

function tileNoise(x, y, seed = 0) {
  const n = Math.sin((x * 12.9898 + y * 78.233 + seed * 37.719) * 0.053);
  return n - Math.floor(n);
}

function drawTile(ctx, tile, dx, dy, size = TILE_SIZE) {
  if (!tileSprite.complete || tileSprite.naturalWidth === 0) return false;

  const sx = tile.col * TILE_SIZE;
  const sy = tile.row * TILE_SIZE;
  ctx.drawImage(tileSprite, sx, sy, TILE_SIZE, TILE_SIZE, dx, dy, size, size);
  return true;
}

function drawGround(ctx, map) {
  const groundStartY = Math.floor(map.height * GROUND_START_RATIO);
  const groundHeight = map.height - groundStartY;

  ctx.fillStyle = "#1c2320";
  ctx.fillRect(0, groundStartY, map.width, groundHeight);

  if (!tileSprite.complete || tileSprite.naturalWidth === 0) return;

  const cols = Math.ceil(map.width / TILE_SIZE);
  const rows = Math.ceil(groundHeight / TILE_SIZE);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * TILE_SIZE;
      const y = groundStartY + row * TILE_SIZE;

      const baseIndex = Math.floor(tileNoise(col, row, 1) * GROUND_TILES.length);
      const baseTile = GROUND_TILES[baseIndex];
      drawTile(ctx, baseTile, x, y, TILE_SIZE);

      const detailChance = tileNoise(col, row, 2);
      if (detailChance > 0.94) {
        const detailIndex = Math.floor(tileNoise(col, row, 3) * DETAIL_TILES.length);
        const detailTile = DETAIL_TILES[detailIndex];
        drawTile(ctx, detailTile, x, y, TILE_SIZE);
      }
    }
  }

  ctx.fillStyle = "rgba(10, 12, 16, 0.24)";
  ctx.fillRect(0, groundStartY, map.width, groundHeight);
}

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

  drawGround(ctx, map);

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
}
