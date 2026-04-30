import { getMoveVector } from "./input.js";
import { collidesWithObstacles } from "./collision.js";

const PLAYER_SIZE = { width: 32, height: 32 };

export const PLAYER_COLLISION_WIDTH = 18;
export const PLAYER_COLLISION_HEIGHT = 14;
export const PLAYER_COLLISION_OFFSET_X = 7;
export const PLAYER_COLLISION_OFFSET_Y = 18;
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
    spriteDirection: DIRECTION_TO_ROW.down,
    spriteFrame: 0,
    moving: false,
    frameTimer: 0,
    collisionWidth: PLAYER_COLLISION_WIDTH,
    collisionHeight: PLAYER_COLLISION_HEIGHT,
    collisionOffsetX: PLAYER_COLLISION_OFFSET_X,
    collisionOffsetY: PLAYER_COLLISION_OFFSET_Y
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

  const nextX = player.x + dx;
  const nextCollision = getPlayerCollisionRect(player, nextX, player.y);

  if (!isOutOfBounds(nextCollision, map) && !collidesWithObstacles(nextCollision, map.obstacles)) {
    player.x = nextX;
  }
}

function attemptMoveY(player, dy, map) {
  if (dy === 0) return;

  const nextY = player.y + dy;
  const nextCollision = getPlayerCollisionRect(player, player.x, nextY);

  if (!isOutOfBounds(nextCollision, map) && !collidesWithObstacles(nextCollision, map.obstacles)) {
    player.y = nextY;
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


export function getPlayerCollisionRect(player, x = player.x, y = player.y) {
  return {
    x: x + player.collisionOffsetX,
    y: y + player.collisionOffsetY,
    width: player.collisionWidth,
    height: player.collisionHeight
  };
}

export function getPlayerFeetPosition(player) {
  const collision = getPlayerCollisionRect(player);
  return {
    x: collision.x + collision.width / 2,
    y: collision.y + collision.height
  };
}
