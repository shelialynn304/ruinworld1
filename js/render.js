import { getPlayerCollisionRect } from "./player.js";

const SPRITE_FRAME_SIZE = 32;
const PLAYER_DRAW_SCALE = 2;
const PLAYER_DRAW_SIZE = SPRITE_FRAME_SIZE * PLAYER_DRAW_SCALE;
const PLAYER_FEET_OFFSET = 6;

const CHARACTER_START_COLUMN = 3;
const CHARACTER_START_ROW = 0;

const DEBUG_PLAYER_RENDER = false;

const TILE_SIZE = 32;
const GROUND_START_RATIO = 0.34;
const CAMERA_ZOOM = 1.0;

const playerSprite = new Image();
playerSprite.src = "assets/images/rogues.png";

const tileSprite = new Image();
tileSprite.src = "assets/images/tiles.png";

const spookyTreeImage = new Image();
spookyTreeImage.addEventListener("error", () => {
  console.warn("Failed to load environment prop image: assets/images/spookytree1.png");
});
spookyTreeImage.src = "assets/images/spookytree1.png";

// Tiles are disabled for now because the current coordinates were pulling ugly/broken tiles.
const GROUND_BASE_TILE = null;
const GROUND_VARIANTS = [];
const PATH_TILE = null;
const CRACK_TILE = null;
const WEED_TILE = null;
const PUDDLE_TILE = null;

function tileNoise(x, y, seed = 0) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

function toRenderInteger(value) {
  return Math.round(value);
}

export function disableCanvasImageSmoothing(ctx) {
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
}

function drawTile(ctx, tile, dx, dy, size = TILE_SIZE) {
  if (!tile || !tileSprite.complete || tileSprite.naturalWidth === 0) {
    return false;
  }

  const drawX = toRenderInteger(dx);
  const drawY = toRenderInteger(dy);
  const drawSize = toRenderInteger(size);

  ctx.drawImage(
    tileSprite,
    tile.col * TILE_SIZE,
    tile.row * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE,
    drawX,
    drawY,
    drawSize,
    drawSize
  );

  return true;
}

function drawFallbackTile(ctx, x, y, baseColor, accentColor = null) {
  ctx.fillStyle = baseColor;
  ctx.fillRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);

  if (accentColor) {
    ctx.fillStyle = accentColor;
    ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, 2);
  }
}

function isMainPathTile(col, row, cols) {
  const center = Math.floor(cols / 2);

  const diagonalPath = Math.abs(row - (42 - col * 0.46)) < 2.2;
  const chapelApproach = Math.abs(col - center) < 2 && row > 7 && row < 32;
  const lowerCurve = row > 30 && col > 4 && col < 28 && Math.abs(row - (42 - col * 0.35)) < 3;

  return diagonalPath || chapelApproach || lowerCurve;
}

function isPuddleTile(col, row) {
  const clusterA = Math.abs(col - 22) < 4 && Math.abs(row - 38) < 3;
  const clusterB = Math.abs(col - 55) < 3 && Math.abs(row - 30) < 2;
  const clusterC = Math.abs(col - 84) < 4 && Math.abs(row - 20) < 2;

  return clusterA || clusterB || clusterC;
}

function drawGround(ctx, map) {
  const groundStartY = Math.floor(map.height * GROUND_START_RATIO);
  const groundHeight = map.height - groundStartY;

  const cols = Math.ceil(map.width / TILE_SIZE);
  const rows = Math.ceil(groundHeight / TILE_SIZE);

  ctx.fillStyle = "#11131a";
  ctx.fillRect(0, 0, map.width, map.height);

  const skyGradient = ctx.createLinearGradient(0, 0, 0, groundStartY + 120);
  skyGradient.addColorStop(0, "#0c0f14");
  skyGradient.addColorStop(0.55, "#151a18");
  skyGradient.addColorStop(1, "#1a211d");

  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, map.width, groundStartY + 160);

  ctx.fillStyle = "#151a17";
  ctx.fillRect(0, groundStartY, map.width, groundHeight);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * TILE_SIZE;
      const y = groundStartY + row * TILE_SIZE;

      const n1 = tileNoise(col, row, 4);
      const n2 = tileNoise(col, row, 8);
      const n3 = tileNoise(col, row, 12);

      const path = isMainPathTile(col, row, cols);
      const puddle = isPuddleTile(col, row);

      drawFallbackTile(ctx, x, y, "#1c221d");

      if (n1 > 0.96) {
        ctx.fillStyle = "#22261f";
        ctx.fillRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      }

      if (n2 > 0.94) {
        ctx.fillStyle = "#262b23";
        ctx.fillRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      }

      if (n3 > 0.96) {
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(x + 4, y + 12, 20, 2);
      }

      if (n2 > 0.97) {
        ctx.fillStyle = "rgba(30, 30, 25, 0.4)";
        ctx.beginPath();
        ctx.ellipse(x + 16, y + 16, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (path) {
        ctx.fillStyle = "rgba(48, 38, 28, 0.55)";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      }

      if (!path && puddle && n3 > 0.35) {
        ctx.fillStyle = "rgba(35, 45, 55, 0.38)";
        ctx.beginPath();
        ctx.ellipse(x + 16, y + 19, 12, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(120, 140, 155, 0.16)";
        ctx.fillRect(x + 9, y + 17, 10, 1);
      }
    }
  }

  ctx.fillStyle = "rgba(8, 10, 14, 0.28)";
  ctx.fillRect(0, groundStartY, map.width, groundHeight);

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, groundStartY, map.width, 40);
  ctx.fillRect(0, map.height - 40, map.width, 40);

  const transition = ctx.createLinearGradient(0, groundStartY - 96, 0, groundStartY + 96);
  transition.addColorStop(0, "rgba(70, 98, 82, 0.24)");
  transition.addColorStop(0.55, "rgba(36, 50, 42, 0.12)");
  transition.addColorStop(1, "rgba(70, 98, 82, 0)");

  ctx.fillStyle = transition;
  ctx.fillRect(0, groundStartY - 96, map.width, 192);
}

function drawRain(ctx, width, height, timeMs) {
  ctx.save();

  ctx.strokeStyle = "rgba(180, 190, 220, 0.22)";
  ctx.lineWidth = 1;

  for (let i = 0; i < 95; i += 1) {
    const x = (i * 23 + timeMs * 0.12) % width;
    const y = (i * 41 + timeMs * 0.24) % height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 4, y + 12);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSpookyTreeProp(ctx, obstacle) {
  if (!spookyTreeImage.complete || spookyTreeImage.naturalWidth === 0) {
    return;
  }

  const width = toRenderInteger(obstacle.drawWidth || spookyTreeImage.naturalWidth);
  const height = toRenderInteger(obstacle.drawHeight || spookyTreeImage.naturalHeight);
  const x = toRenderInteger(obstacle.x + obstacle.width / 2 - width / 2);
  const y = toRenderInteger(obstacle.y + obstacle.height - height);

  ctx.save();

  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(
    toRenderInteger(obstacle.x + obstacle.width / 2),
    toRenderInteger(obstacle.y + obstacle.height - 1),
    Math.max(10, obstacle.width * 1.5),
    Math.max(4, obstacle.height * 0.35),
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.drawImage(spookyTreeImage, x, y, width, height);

  ctx.restore();
}

function drawObstacle(ctx, obstacle) {
  if (obstacle.type === "spookytree1") {
    drawSpookyTreeProp(ctx, obstacle);
    return;
  }

  const palette = {
    grave_plot: { base: "#2c2a28", shadow: "#1f1d1b", highlight: "#3a3532" },
    headstone: { base: "#4a4643", shadow: "#2b2826", highlight: "#615a56" },
    broken_stone: { base: "#3b3735", shadow: "#242120", highlight: "#55504c" },
    fence: { base: "#40352f", shadow: "#2a221e", highlight: "#564840" },
    chapel: { base: "#352f33", shadow: "#221f24", highlight: "#48424a" },
    statue: { base: "#4b4742", shadow: "#2d2a27", highlight: "#64605a" },
    gate: { base: "#3a3531", shadow: "#25211f", highlight: "#4a433f" },
    tree: { base: "#292b21", shadow: "#1d1f17", highlight: "#3a3d2e" },
    dead_tree: { base: "#3e342d", shadow: "#271f1a", highlight: "#584a3d" },
    brush: { base: "#2b3328", shadow: "#1d241b", highlight: "#3b4537" },
    cliff: { base: "#2d2e31", shadow: "#1d1f22", highlight: "#3f4145" },
    broken_wall: { base: "#3f3a38", shadow: "#272321", highlight: "#57504d" },
    mausoleum: { base: "#353237", shadow: "#232127", highlight: "#4b474f" },
    unique_grave: { base: "#575147", shadow: "#353026", highlight: "#786f61" }
  };

  const colors = palette[obstacle.type] || {
    base: "#3b3533",
    shadow: "#26211f",
    highlight: "#5c5350"
  };

  const x = toRenderInteger(obstacle.x);
  const y = toRenderInteger(obstacle.y);
  const width = toRenderInteger(obstacle.width);
  const height = toRenderInteger(obstacle.height);

  ctx.save();

  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height - 1, width * 0.48, Math.max(3, height * 0.12), 0, 0, Math.PI * 2);
  ctx.fill();

  if (obstacle.type === "headstone" || obstacle.type === "unique_grave") {
    drawHeadstone(ctx, x, y, width, height, colors);
  } else if (obstacle.type === "tree" || obstacle.type === "dead_tree") {
    drawTree(ctx, x, y, width, height, colors, obstacle.type === "dead_tree");
  } else if (obstacle.type === "fence" || obstacle.type === "gate") {
    drawFenceOrGate(ctx, x, y, width, height, colors, obstacle.type === "gate");
  } else if (obstacle.type === "chapel" || obstacle.type === "mausoleum") {
    drawBuildingBlock(ctx, x, y, width, height, colors);
  } else {
    drawSimpleBlock(ctx, x, y, width, height, colors);
  }

  ctx.restore();
}

function drawSimpleBlock(ctx, x, y, width, height, colors) {
  ctx.fillStyle = colors.base;
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = colors.shadow;
  ctx.fillRect(x, y + height - 4, width, 4);

  ctx.fillStyle = colors.highlight;
  ctx.fillRect(x, y, width, 2);
}

function drawHeadstone(ctx, x, y, width, height, colors) {
  const radius = Math.min(width / 2, 10);

  ctx.fillStyle = colors.base;
  ctx.beginPath();
  ctx.moveTo(x, y + height);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + width / 2, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = colors.highlight;
  ctx.fillRect(x + 4, y + 5, Math.max(2, width - 8), 2);

  ctx.fillStyle = colors.shadow;
  ctx.fillRect(x + 3, y + height - 5, width - 6, 4);

  ctx.fillStyle = "rgba(20, 18, 16, 0.35)";
  ctx.fillRect(x + width * 0.35, y + height * 0.38, width * 0.3, 2);
  ctx.fillRect(x + width * 0.47, y + height * 0.26, 2, height * 0.28);
}

function drawTree(ctx, x, y, width, height, colors, isDeadTree) {
  const trunkWidth = Math.max(8, width * 0.25);
  const trunkX = x + width / 2 - trunkWidth / 2;

  ctx.fillStyle = colors.shadow;
  ctx.fillRect(trunkX + 2, y + height * 0.22, trunkWidth, height * 0.78);

  ctx.fillStyle = colors.base;
  ctx.fillRect(trunkX, y + height * 0.18, trunkWidth, height * 0.82);

  ctx.strokeStyle = colors.highlight;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(x + width / 2, y + height * 0.3);
  ctx.lineTo(x + width * 0.18, y + height * 0.05);
  ctx.moveTo(x + width / 2, y + height * 0.35);
  ctx.lineTo(x + width * 0.8, y + height * 0.08);
  ctx.moveTo(x + width / 2, y + height * 0.5);
  ctx.lineTo(x + width * 0.28, y + height * 0.28);
  ctx.moveTo(x + width / 2, y + height * 0.48);
  ctx.lineTo(x + width * 0.74, y + height * 0.3);
  ctx.stroke();

  if (!isDeadTree) {
    ctx.fillStyle = "rgba(34, 48, 32, 0.65)";
    ctx.beginPath();
    ctx.ellipse(x + width * 0.5, y + height * 0.22, width * 0.42, height * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFenceOrGate(ctx, x, y, width, height, colors, isGate) {
  const postCount = Math.max(2, Math.floor(width / 18));

  ctx.fillStyle = colors.shadow;
  ctx.fillRect(x, y + height * 0.62, width, 4);

  ctx.fillStyle = colors.base;
  ctx.fillRect(x, y + height * 0.35, width, 4);

  for (let i = 0; i < postCount; i += 1) {
    const px = x + (i / Math.max(1, postCount - 1)) * (width - 5);

    ctx.fillStyle = colors.base;
    ctx.fillRect(px, y, 5, height);

    ctx.fillStyle = colors.highlight;
    ctx.fillRect(px, y, 5, 2);
  }

  if (isGate) {
    ctx.strokeStyle = colors.highlight;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 3, y + 3, width - 6, height - 6);

    ctx.fillStyle = colors.highlight;
    ctx.fillRect(x + width / 2 - 1, y + 4, 2, height - 8);
  }
}

function drawBuildingBlock(ctx, x, y, width, height, colors) {
  ctx.fillStyle = colors.shadow;
  ctx.fillRect(x + 5, y + 5, width, height);

  ctx.fillStyle = colors.shadow;
  ctx.beginPath();
  ctx.moveTo(x - 4, y);
  ctx.lineTo(x + width + 4, y);
  ctx.lineTo(x + width / 2, y - height * 0.25);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = colors.base;
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = colors.highlight;
  ctx.fillRect(x, y, width, 3);

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(x - 3, y + height - 2, width + 6, 4);

  ctx.fillStyle = "rgba(5, 5, 8, 0.9)";
  ctx.fillRect(x + width * 0.42, y + height * 0.55, width * 0.16, height * 0.45);

  const flicker = 0.04 + Math.sin(Date.now() * 0.01) * 0.02;

  ctx.fillStyle = `rgba(200, 140, 60, ${flicker})`;
  ctx.fillRect(x + width * 0.44, y + height * 0.6, width * 0.12, height * 0.35);

  ctx.fillStyle = "rgba(218, 196, 128, 0.12)";
  ctx.fillRect(x + width * 0.18, y + height * 0.28, width * 0.13, height * 0.16);
  ctx.fillRect(x + width * 0.69, y + height * 0.28, width * 0.13, height * 0.16);
}

function getPlayerSpriteDrawMetrics(player) {
  const drawX = toRenderInteger(player.x + player.width / 2 - PLAYER_DRAW_SIZE / 2);
  const drawY = toRenderInteger(player.y + player.height - PLAYER_DRAW_SIZE + PLAYER_FEET_OFFSET);

  return { drawX, drawY };
}

function drawPlayerSprite(ctx, player) {
  const metrics = getPlayerSpriteDrawMetrics(player);

  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.ellipse(
    metrics.drawX + PLAYER_DRAW_SIZE / 2,
    metrics.drawY + PLAYER_DRAW_SIZE - 6,
    12,
    5,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  if (playerSprite.complete && playerSprite.naturalWidth > 0) {
    ctx.drawImage(
      playerSprite,
      CHARACTER_START_COLUMN * SPRITE_FRAME_SIZE,
      CHARACTER_START_ROW * SPRITE_FRAME_SIZE,
      SPRITE_FRAME_SIZE,
      SPRITE_FRAME_SIZE,
      metrics.drawX,
      metrics.drawY,
      PLAYER_DRAW_SIZE,
      PLAYER_DRAW_SIZE
    );
  } else {
    ctx.fillStyle = "#b8a46f";
    const fallbackX = toRenderInteger(player.x);
    const fallbackY = toRenderInteger(player.y);
    const fallbackWidth = toRenderInteger(player.width);
    const fallbackHeight = toRenderInteger(player.height);

    ctx.fillRect(fallbackX, fallbackY, fallbackWidth, fallbackHeight);

    ctx.fillStyle = "#111";
    ctx.fillRect(fallbackX + 6, fallbackY + 8, 4, 4);
    ctx.fillRect(fallbackX + fallbackWidth - 10, fallbackY + 8, 4, 4);
  }

  if (DEBUG_PLAYER_RENDER) {
    const collision = getPlayerCollisionRect(player);

    ctx.strokeStyle = "rgba(60, 255, 120, 0.95)";
    ctx.lineWidth = 1;
    ctx.strokeRect(collision.x + 0.5, collision.y + 0.5, collision.width, collision.height);

    ctx.strokeStyle = "rgba(255, 220, 80, 0.95)";
    ctx.strokeRect(metrics.drawX + 0.5, metrics.drawY + 0.5, PLAYER_DRAW_SIZE, PLAYER_DRAW_SIZE);
  }
}

function drawFogBanks(ctx, map, timeMs) {
  const drift = Math.sin(timeMs * 0.0002) * 14;

  ctx.save();

  ctx.fillStyle = "rgba(170, 180, 185, 0.08)";
  ctx.beginPath();
  ctx.ellipse(500 + drift, 1220, 340, 90, 0, 0, Math.PI * 2);
  ctx.ellipse(1680 - drift * 0.6, 980, 420, 110, 0, 0, Math.PI * 2);
  ctx.ellipse(2550 + drift * 0.8, 700, 360, 96, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(100, 110, 120, 0.06)";
  ctx.fillRect(0, 0, map.width, 96);
  ctx.fillRect(0, map.height - 96, map.width, 96);

  ctx.restore();
}

function drawVignette(ctx, map) {
  const gradient = ctx.createRadialGradient(
    map.width / 2,
    map.height / 2,
    Math.min(map.width, map.height) * 0.2,
    map.width / 2,
    map.height / 2,
    Math.max(map.width, map.height) * 0.62
  );

  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.42)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, map.width, map.height);
}

function getCamera(canvasWidth, canvasHeight, map, player) {
  const visibleWidth = canvasWidth / CAMERA_ZOOM;
  const visibleHeight = canvasHeight / CAMERA_ZOOM;

  const rawCameraX = player.x + player.width / 2 - visibleWidth / 2;
  const rawCameraY = player.y + player.height / 2 - visibleHeight / 2;

  const maxCameraX = Math.max(0, map.width - visibleWidth);
  const maxCameraY = Math.max(0, map.height - visibleHeight);

  const cameraX = Math.max(0, Math.min(rawCameraX, maxCameraX));
  const cameraY = Math.max(0, Math.min(rawCameraY, maxCameraY));

  const offsetX = map.width < visibleWidth ? (canvasWidth - map.width * CAMERA_ZOOM) / 2 : 0;
  const offsetY = map.height < visibleHeight ? (canvasHeight - map.height * CAMERA_ZOOM) / 2 : 0;

  return {
    cameraX: toRenderInteger(cameraX),
    cameraY: toRenderInteger(cameraY),
    offsetX: toRenderInteger(offsetX),
    offsetY: toRenderInteger(offsetY)
  };
}


function drawInteractableHighlight(ctx, nearbyInteractable) {
  if (!nearbyInteractable) return;

  const pulse = 0.6 + Math.sin(Date.now() * 0.008) * 0.25;

  ctx.save();

  // outer glow fill
  ctx.fillStyle = `rgba(222, 204, 145, ${pulse * 0.08})`;
  ctx.fillRect(
    nearbyInteractable.x - 2,
    nearbyInteractable.y - 2,
    nearbyInteractable.width + 4,
    nearbyInteractable.height + 4
  );

  // main outline
  ctx.strokeStyle = `rgba(222, 204, 145, ${pulse})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(
    nearbyInteractable.x - 2,
    nearbyInteractable.y - 2,
    nearbyInteractable.width + 4,
    nearbyInteractable.height + 4
  );

  // inner highlight (adds polish)
  ctx.strokeStyle = `rgba(255, 240, 180, ${pulse * 0.6})`;
  ctx.lineWidth = 1;
  ctx.strokeRect(
    nearbyInteractable.x,
    nearbyInteractable.y,
    nearbyInteractable.width,
    nearbyInteractable.height
  );

  ctx.restore();
}
  
export function renderScene(ctx, map, player, nearbyInteractable, timeMs = 0) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  const { cameraX, cameraY, offsetX, offsetY } = getCamera(canvasWidth, canvasHeight, map, player);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  disableCanvasImageSmoothing(ctx);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "#090b10";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const renderOffsetX = toRenderInteger(offsetX - cameraX * CAMERA_ZOOM);
  const renderOffsetY = toRenderInteger(offsetY - cameraY * CAMERA_ZOOM);

  ctx.setTransform(
    CAMERA_ZOOM,
    0,
    0,
    CAMERA_ZOOM,
    renderOffsetX,
    renderOffsetY
  );

  drawGround(ctx, map);

  const playerDepth = player.y + player.height;
  const obstacles = Array.isArray(map.obstacles) ? map.obstacles : [];

  obstacles
    .filter((obstacle) => obstacle.y + obstacle.height <= playerDepth)
    .sort((a, b) => a.y + a.height - (b.y + b.height))
    .forEach((obstacle) => drawObstacle(ctx, obstacle));

  drawPlayerSprite(ctx, player);

  obstacles
    .filter((obstacle) => obstacle.y + obstacle.height > playerDepth)
    .sort((a, b) => a.y + a.height - (b.y + b.height))
    .forEach((obstacle) => drawObstacle(ctx, obstacle));

  drawInteractableHighlight(ctx, nearbyInteractable);

  drawRain(ctx, map.width, map.height, timeMs);
  drawFogBanks(ctx, map, timeMs);
  drawVignette(ctx, map);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
