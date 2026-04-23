const SPRITE_FRAME_SIZE = 32;
const PLAYER_DRAW_SCALE = 2;
const PLAYER_DRAW_SIZE = SPRITE_FRAME_SIZE * PLAYER_DRAW_SCALE;
const PLAYER_FEET_OFFSET = 6;

const CHARACTER_START_COLUMN = 3;
const CHARACTER_START_ROW = 0;

const DEBUG_PLAYER_RENDER = false;

const TILE_SIZE = 32;

// Tiles are intentionally centralized so art coordinates can be swapped quickly later.
const TILE_COORDS = {
  darkGroundA: { col: 0, row: 11 },
  darkGroundB: { col: 1, row: 11 },
  darkGroundC: { col: 2, row: 11 },
  darkGroundD: { col: 0, row: 12 },
  graveMarkerA: { col: 0, row: 21 },
  graveMarkerB: { col: 1, row: 21 },
  graveMarkerC: { col: 2, row: 21 },
  deadShrubA: { col: 0, row: 18 },
  deadShrubB: { col: 1, row: 18 },
  deadShrubC: { col: 2, row: 18 },
  chapelWall: { col: 0, row: 15 },
  chapelRoof: { col: 0, row: 14 },
  chapelDoor: { col: 2, row: 15 },
  fenceA: { col: 0, row: 0 },
  fenceB: { col: 1, row: 0 },
  gate: { col: 2, row: 1 },
  statue: { col: 3, row: 21 }
};

const GROUND_DETAIL_TILES = [
  TILE_COORDS.darkGroundA,
  TILE_COORDS.darkGroundB,
  TILE_COORDS.darkGroundC,
  TILE_COORDS.darkGroundD
];

const SHRUB_TILES = [
  TILE_COORDS.deadShrubA,
  TILE_COORDS.deadShrubB,
  TILE_COORDS.deadShrubC
];

const GRAVE_TILES = [
  TILE_COORDS.graveMarkerA,
  TILE_COORDS.graveMarkerB,
  TILE_COORDS.graveMarkerC
];

const playerSprite = new Image();
playerSprite.src = "assets/images/rogues.png";

const tileSprite = new Image();
tileSprite.src = "assets/images/tiles.png";

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

  const SPRITE_SIZE = 32;
  const DRAW_SIZE = 64;

  const sx = CHARACTER_START_COLUMN * SPRITE_SIZE;
  const sy = CHARACTER_START_ROW * SPRITE_SIZE;

  const drawX = Math.round(player.x + player.width / 2 - DRAW_SIZE / 2);
  const drawY = Math.round(player.y + player.height - DRAW_SIZE + 6);

  ctx.drawImage(
    playerSprite,
    sx,
    sy,
    SPRITE_SIZE,
    SPRITE_SIZE,
    drawX,
    drawY,
    DRAW_SIZE,
    DRAW_SIZE
  );

  if (DEBUG_PLAYER_RENDER) {
    const metrics = getPlayerSpriteDrawMetrics(player);
    drawPlayerDebug(ctx, player, metrics);
  }
}

function drawTile(ctx, tile, dx, dy, dw = TILE_SIZE, dh = TILE_SIZE) {
  if (!tileSprite.complete || tileSprite.naturalWidth === 0) return;
  ctx.drawImage(
    tileSprite,
    tile.col * TILE_SIZE,
    tile.row * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE,
    Math.round(dx),
    Math.round(dy),
    Math.round(dw),
    Math.round(dh)
  );
}

function drawTiledArea(ctx, tile, x, y, width, height) {
  for (let py = y; py < y + height; py += TILE_SIZE) {
    const tileHeight = Math.min(TILE_SIZE, y + height - py);
    for (let px = x; px < x + width; px += TILE_SIZE) {
      const tileWidth = Math.min(TILE_SIZE, x + width - px);
      drawTile(ctx, tile, px, py, tileWidth, tileHeight);
    }
  }
}

function drawGroundDetails(ctx, map) {
  if (!tileSprite.complete || tileSprite.naturalWidth === 0) return;

  const startY = Math.round(map.height * 0.34);
  for (let y = startY; y < map.height; y += TILE_SIZE) {
    for (let x = 0; x < map.width; x += TILE_SIZE) {
      const hash = ((x / TILE_SIZE) * 13 + (y / TILE_SIZE) * 7) % 17;
      if (hash < 4) {
        const tile = GROUND_DETAIL_TILES[hash % GROUND_DETAIL_TILES.length];
        drawTile(ctx, tile, x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

function drawObstacleSprite(ctx, obstacle) {
  switch (obstacle.type) {
    case "fence": {
      for (let x = obstacle.x; x < obstacle.x + obstacle.width; x += TILE_SIZE) {
        const tile = ((x / TILE_SIZE) % 2 === 0) ? TILE_COORDS.fenceA : TILE_COORDS.fenceB;
        drawTile(ctx, tile, x, obstacle.y, Math.min(TILE_SIZE, obstacle.x + obstacle.width - x), obstacle.height);
      }
      break;
    }
    case "gate": {
      drawTiledArea(ctx, TILE_COORDS.gate, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      break;
    }
    case "chapel": {
      drawTiledArea(ctx, TILE_COORDS.chapelWall, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      drawTiledArea(ctx, TILE_COORDS.chapelRoof, obstacle.x, obstacle.y, obstacle.width, Math.min(TILE_SIZE * 2, obstacle.height));
      const doorWidth = Math.min(TILE_SIZE * 2, obstacle.width * 0.35);
      const doorX = obstacle.x + (obstacle.width - doorWidth) / 2;
      const doorY = obstacle.y + obstacle.height - TILE_SIZE;
      drawTile(ctx, TILE_COORDS.chapelDoor, doorX, doorY, doorWidth, TILE_SIZE);
      break;
    }
    case "grave": {
      const tileIndex = Math.floor((obstacle.x + obstacle.y) / TILE_SIZE) % GRAVE_TILES.length;
      const tile = GRAVE_TILES[tileIndex];
      drawTile(ctx, tile, obstacle.x - 4, obstacle.y - 2, obstacle.width + 8, obstacle.height + 2);
      break;
    }
    case "tree": {
      const tileIndex = Math.floor((obstacle.x + obstacle.y) / TILE_SIZE) % SHRUB_TILES.length;
      const tile = SHRUB_TILES[tileIndex];
      drawTile(ctx, tile, obstacle.x - 2, obstacle.y - 2, obstacle.width + 6, obstacle.height + 4);
      break;
    }
    case "statue": {
      drawTile(ctx, TILE_COORDS.statue, obstacle.x - 2, obstacle.y - 2, obstacle.width + 4, obstacle.height + 6);
      break;
    }
    default: {
      drawTiledArea(ctx, TILE_COORDS.darkGroundA, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
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

  ctx.fillStyle = "#1b2120";
  ctx.fillRect(0, map.height * 0.4, map.width, map.height * 0.6);

  drawGroundDetails(ctx, map);

  map.obstacles.forEach((obstacle) => {
    drawObstacleSprite(ctx, obstacle);
  });

  ctx.fillStyle = "rgba(8, 10, 15, 0.28)";
  ctx.fillRect(0, 0, map.width, map.height);

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
