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
    facing: "down"
  };
}

export function updatePlayer(player, map, dtSeconds, canMove) {
  if (!canMove) return;

  const move = getMoveVector();
  if (move.x === 0 && move.y === 0) return;

  const length = Math.hypot(move.x, move.y) || 1;
  const vx = (move.x / length) * player.speed * dtSeconds;
  const vy = (move.y / length) * player.speed * dtSeconds;

  if (move.x > 0) player.facing = "right";
  else if (move.x < 0) player.facing = "left";
  else if (move.y > 0) player.facing = "down";
  else if (move.y < 0) player.facing = "up";

  attemptMoveX(player, vx, map);
  attemptMoveY(player, vy, map);
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
