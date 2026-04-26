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
    if (obstacle.type === "chapel") {
      drawPixelRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
        base: "#2d2b32",
        shadow: "#1b1820",
        highlight: "#454150"
      });
    } else if (obstacle.type === "grave") {
      drawPixelRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
        base: "#5b5b65",
        shadow: "#3f4148",
        highlight: "#81808d"
      });
    } else if (obstacle.type === "tree") {
      drawPixelRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
        base: "#2a3d2f",
        shadow: "#1b2b20",
        highlight: "#3f5a45"
      });
    } else if (obstacle.type === "statue") {
      drawPixelRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
        base: "#2c2631",
        shadow: "#1a151f",
        highlight: "#44394d"
      });
    } else {
      drawPixelRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
        base: "#3b3533",
        shadow: "#26211f",
        highlight: "#5c5350"
      });
    }
  });

  const playerX = Math.round(player.x);
  const playerY = Math.round(player.y);

  // Player placeholder sprite.
  drawPixelRect(ctx, playerX, playerY, player.width, player.height, {
    base: "#d5d0c7",
    shadow: "#8b332f",
    highlight: "#f0ede7"
  });

  ctx.fillStyle = "#20150f";
  if (player.facing === "up") ctx.fillRect(playerX + 7, playerY + 1, 4, 3);
  else if (player.facing === "down") ctx.fillRect(playerX + 7, playerY + 14, 4, 3);
  else if (player.facing === "left") ctx.fillRect(playerX + 1, playerY + 8, 3, 4);
  else ctx.fillRect(playerX + 14, playerY + 8, 3, 4);

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
