import { getMoveVector } from "./input.js";
import { collidesWithObstacles } from "./collision.js";

const PLAYER_SIZE = { width: 18, height: 18 };
const PLAYER_SPEED = 150;

export function createPlayer(startX, startY) {
  return {
    x: startX,
    y: startY,
    width: PLAYER_SIZE.width,
    height: PLAYER_SIZE.height,
    speed: PLAYER_SPEED,
    facing: "down",

    // sprite animation
    spriteDirection: 0, // 0=down, 1=left, 2=right, 3=up
    spriteFrame: 0,
    moving: false,
    frameTimer: 0
  };
}

export function updatePlayer(player, map, dtSeconds, canMove) {
  if (!canMove) {
    player.moving = false;
    player.spriteFrame = 0;
    player.frameTimer = 0;
    return;
  }

  const move = getMoveVector();

  if (move.x === 0 && move.y === 0) {
    player.moving = false;
    player.spriteFrame = 0;
    player.frameTimer = 0;
    return;
  }

  player.moving = true;

  const length = Math.hypot(move.x, move.y) || 1;
  const vx = (move.x / length) * player.speed * dtSeconds;
  const vy = (move.y / length) * player.speed * dtSeconds;

  // Direction based on strongest axis
  if (Math.abs(move.x) > Math.abs(move.y)) {
    if (move.x > 0) {
      player.facing = "right";
      player.spriteDirection = 2;
    } else if (move.x < 0) {
      player.facing = "left";
      player.spriteDirection = 1;
    }
  } else {
    if (move.y > 0) {
      player.facing = "down";
      player.spriteDirection = 0;
    } else if (move.y < 0) {
      player.facing = "up";
      player.spriteDirection = 3;
    }
  }

  attemptMoveX(player, vx, map);
  attemptMoveY(player, vy, map);

  player.frameTimer += dtSeconds;
  if (player.frameTimer >= 0.15) {
    player.spriteFrame = (player.spriteFrame + 1) % 3;
    player.frameTimer = 0;
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
