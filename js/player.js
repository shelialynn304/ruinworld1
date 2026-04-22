import { getMoveVector } from "./input.js";
import { collidesWithObstacles } from "./collision.js";

const PLAYER_SIZE = { width: 18, height: 18 };
const PLAYER_SPEED = 150;
const ANIMATION_INTERVAL_SECONDS = 0.15;
const SPRITE_FRAMES_PER_DIRECTION = 3;

const DIRECTION_TO_ROW = {
  down: 0,
  left: 1,
  right: 2,
  up: 3
};

export function createPlayer(startX, startY) {
  return {
    x: startX,
    y: startY,
    width: PLAYER_SIZE.width,
    height: PLAYER_SIZE.height,
    speed: PLAYER_SPEED,
    facing: "down",

    // sprite animation state
    spriteDirection: DIRECTION_TO_ROW.down, // 0=down, 1=left, 2=right, 3=up
    spriteFrame: 0,
    moving: false,
    frameTimer: 0
  };
}

export function updatePlayer(player, map, dtSeconds, canMove) {
  if (!canMove) {
    setIdle(player);
    return;
  }

  const move = getMoveVector();

  if (move.x === 0 && move.y === 0) {
    setIdle(player);
    return;
  }

  player.moving = true;
  updateDirection(player, move.x, move.y);

  const length = Math.hypot(move.x, move.y) || 1;
  const vx = (move.x / length) * player.speed * dtSeconds;
  const vy = (move.y / length) * player.speed * dtSeconds;

  attemptMoveX(player, vx, map);
  attemptMoveY(player, vy, map);

  player.frameTimer += dtSeconds;
  while (player.frameTimer >= ANIMATION_INTERVAL_SECONDS) {
    player.spriteFrame = (player.spriteFrame + 1) % SPRITE_FRAMES_PER_DIRECTION;
    player.frameTimer -= ANIMATION_INTERVAL_SECONDS;
  }
}

function setIdle(player) {
  player.moving = false;
  player.spriteFrame = 0;
  player.frameTimer = 0;
}

function updateDirection(player, moveX, moveY) {
  // Preserve expected behavior: dominant axis picks facing row.
  if (Math.abs(moveX) > Math.abs(moveY)) {
    if (moveX > 0) {
      player.facing = "right";
      player.spriteDirection = DIRECTION_TO_ROW.right;
      return;
    }

    if (moveX < 0) {
      player.facing = "left";
      player.spriteDirection = DIRECTION_TO_ROW.left;
      return;
    }
  }

  if (moveY > 0) {
    player.facing = "down";
    player.spriteDirection = DIRECTION_TO_ROW.down;
  } else if (moveY < 0) {
    player.facing = "up";
    player.spriteDirection = DIRECTION_TO_ROW.up;
  }
}

function attemptMoveX(player, dx, map) {
  if (dx === 0) return;

  const next = {
    x: player.x + dx,
    y: player.y,
    width: player.width,
    height: player.height
  };

  if (!isOutOfBounds(next, map) && !collidesWithObstacles(next, map.obstacles)) {
    player.x = next.x;
  }
}

function attemptMoveY(player, dy, map) {
  if (dy === 0) return;

  const next = {
    x: player.x,
    y: player.y + dy,
    width: player.width,
    height: player.height
  };

  if (!isOutOfBounds(next, map) && !collidesWithObstacles(next, map.obstacles)) {
    player.y = next.y;
  }
}

function isOutOfBounds(rect, map) {
  return (
    rect.x < 0 ||
    rect.y < 0 ||
    rect.x + rect.width > map.width ||
    rect.y + rect.height > map.height
  );
}
