import { getPlayerCollisionRect } from "./player.js";

const SPRITE_FRAME_SIZE = 32;
const PLAYER_DRAW_SCALE = 2;
const PLAYER_DRAW_SIZE = SPRITE_FRAME_SIZE * PLAYER_DRAW_SCALE;
const PLAYER_FEET_OFFSET = 6;

const CHARACTER_START_COLUMN = 3;
const CHARACTER_START_ROW = 0;

const DEBUG_PLAYER_RENDER = false;
const TILE_SIZE = 32;
const GROUND_START_RATIO = 0;
const CAMERA_ZOOM = 1.0;

const playerSprite = new Image();
playerSprite.src = "assets/images/rogues.png";

const tileSprite = new Image();
tileSprite.src = "assets/images/tiles.png";

const GROUND_BASE_TILE = { col: 1, row: 11 };
const GROUND_VARIANTS = [{ col: 0, row: 11 }, { col: 2, row: 11 }, { col: 0, row: 12 }];
const PATH_TILE = { col: 0, row: 10 };
const CRACK_TILE = { col: 6, row: 15 };
const WEED_TILE = { col: 7, row: 15 };
const PUDDLE_TILE = { col: 5, row: 15 };

function tileNoise(x, y, seed = 0) {
  const n = Math.sin((x * 12.9898 + y * 78.233 + seed * 37.719) * 0.053);
  return n - Math.floor(n);
}

function drawTile(ctx, tile, dx, dy, size = TILE_SIZE) {
  if (!tileSprite.complete || tileSprite.naturalWidth === 0) return false;
  ctx.drawImage(tileSprite, tile.col * TILE_SIZE, tile.row * TILE_SIZE, TILE_SIZE, TILE_SIZE, dx, dy, size, size);
  return true;
}

function isPathTile(col, row) {
  const center = 7;
  const rowBand = row > 1 && row < 7;
  return rowBand && (Math.abs(col - center) <= 1 || (row > 4 && col > 8 && col < 13));
}

function isPlotTile(col, row) {
  const plotRows = [2, 4, 6, 8];
  return plotRows.includes(row) && col >= 2 && col <= 15 && col % 2 === 0;
}

function drawGround(ctx, map) {
  const groundStartY = Math.floor(map.height * GROUND_START_RATIO);
  const groundHeight = map.height - groundStartY;
  const cols = Math.ceil(map.width / TILE_SIZE);
  const rows = Math.ceil(groundHeight / TILE_SIZE);

  ctx.fillStyle = "#1b201d";
  ctx.fillRect(0, groundStartY, map.width, groundHeight);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * TILE_SIZE;
      const y = groundStartY + row * TILE_SIZE;
      drawTile(ctx, GROUND_BASE_TILE, x, y);

      if (tileNoise(col, row, 4) > 0.9) {
        drawTile(ctx, GROUND_VARIANTS[Math.floor(tileNoise(col, row, 8) * GROUND_VARIANTS.length)], x, y);
      }
      if (isPathTile(col, row)) drawTile(ctx, PATH_TILE, x, y);
      if (isPlotTile(col, row) && tileNoise(col, row, 5) > 0.35) drawTile(ctx, CRACK_TILE, x, y);
      if (tileNoise(col, row, 6) > 0.95) drawTile(ctx, WEED_TILE, x, y);
      if (row > 5 && tileNoise(col, row, 7) > 0.975) drawTile(ctx, PUDDLE_TILE, x, y);
    }
  }

  ctx.fillStyle = "rgba(10, 12, 16, 0.28)";
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

function drawObstacle(ctx, obstacle) {
  const palette = {
    grave_plot: { base: "#2c2a28", shadow: "#1f1d1b", highlight: "#3a3532" },
    headstone: { base: "#4a4643", shadow: "#2b2826", highlight: "#615a56" },
    broken_stone: { base: "#3b3735", shadow: "#242120", highlight: "#55504c" },
    fence: { base: "#40352f", shadow: "#2a221e", highlight: "#564840" },
    chapel: { base: "#352f33", shadow: "#221f24", highlight: "#48424a" },
    statue: { base: "#4b4742", shadow: "#2d2a27", highlight: "#64605a" },
    gate: { base: "#3a3531", shadow: "#25211f", highlight: "#4a433f" }
  };

  const colors = palette[obstacle.type] || { base: "#3b3533", shadow: "#26211f", highlight: "#5c5350" };
  ctx.fillStyle = colors.base;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  ctx.fillStyle = colors.shadow;
  ctx.fillRect(obstacle.x, obstacle.y + obstacle.height - 3, obstacle.width, 3);
  ctx.fillStyle = colors.highlight;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 2);
}

function getPlayerSpriteDrawMetrics(player) {
  const drawX = Math.round(player.x + player.width / 2 - PLAYER_DRAW_SIZE / 2);
  const drawY = Math.round(player.y + player.height - PLAYER_DRAW_SIZE + PLAYER_FEET_OFFSET);
  return { drawX, drawY };
}

function drawPlayerSprite(ctx, player) {
  if (!playerSprite.complete || playerSprite.naturalWidth === 0) return;
  const metrics = getPlayerSpriteDrawMetrics(player);

  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.ellipse(metrics.drawX + PLAYER_DRAW_SIZE / 2, metrics.drawY + PLAYER_DRAW_SIZE - 6, 12, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.drawImage(playerSprite, CHARACTER_START_COLUMN * SPRITE_FRAME_SIZE, CHARACTER_START_ROW * SPRITE_FRAME_SIZE, SPRITE_FRAME_SIZE, SPRITE_FRAME_SIZE, metrics.drawX, metrics.drawY, PLAYER_DRAW_SIZE, PLAYER_DRAW_SIZE);

  if (DEBUG_PLAYER_RENDER) {
    const collision = getPlayerCollisionRect(player);
    ctx.strokeStyle = "rgba(60, 255, 120, 0.95)";
    ctx.strokeRect(collision.x + 0.5, collision.y + 0.5, collision.width, collision.height);
  }
}

export function renderScene(ctx, map, player, nearbyInteractable, timeMs) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  const rawCameraX = player.x - canvasWidth / (2 * CAMERA_ZOOM);
  const rawCameraY = player.y - canvasHeight / (2 * CAMERA_ZOOM);
  const maxCameraX = Math.max(0, map.width - canvasWidth / CAMERA_ZOOM);
  const maxCameraY = Math.max(0, map.height - canvasHeight / CAMERA_ZOOM);
  const cameraX = Math.max(0, Math.min(rawCameraX, maxCameraX));
  const cameraY = Math.max(0, Math.min(rawCameraY, maxCameraY));

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.setTransform(
    CAMERA_ZOOM, 0,
    0, CAMERA_ZOOM,
    -cameraX * CAMERA_ZOOM,
    -cameraY * CAMERA_ZOOM
  );

  ctx.fillStyle = "#11131a";
  ctx.fillRect(0, 0, map.width, map.height);
  drawGround(ctx, map);

  const playerDepth = player.y + player.height;
  map.obstacles.filter((o) => o.y + o.height <= playerDepth).forEach((o) => drawObstacle(ctx, o));
  drawPlayerSprite(ctx, player);
  map.obstacles.filter((o) => o.y + o.height > playerDepth).forEach((o) => drawObstacle(ctx, o));

  drawRain(ctx, map.width, map.height, timeMs);

  if (nearbyInteractable) {
    ctx.strokeStyle = "rgba(222, 204, 145, 0.7)";
    ctx.lineWidth = 1;
    ctx.strokeRect(nearbyInteractable.x - 2, nearbyInteractable.y - 2, nearbyInteractable.width + 4, nearbyInteractable.height + 4);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
