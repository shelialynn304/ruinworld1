// 0 = grass, 1 = wall/tree/rock, 2 = ritual tile, 3 = house floor
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
  [1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,3,3,3,0,1,0,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,3,3,3,0,1,0,0,0,1],
  [1,0,0,0,0,0,1,1,1,0,0,3,3,3,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
  [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

export function isBlocked(x, y) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);

  if (row < 0 || row >= mapData.length || col < 0 || col >= mapData[0].length) {
    return true;
  }

  return mapData[row][col] === 1;
}

export function getTileAt(x, y) {
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= mapData.length || col < 0 || col >= mapData[0].length) return 1;
  return mapData[row][col];
}

export function drawWorld(ctx, state) {
  const corruption = state.corruption;

  for (let row = 0; row < mapData.length; row++) {
    for (let col = 0; col < mapData[row].length; col++) {
      const tile = mapData[row][col];
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;

      if (tile === 0) {
        ctx.fillStyle = corruption >= 10 ? "#4d3250" : "#467a4a";
      } else if (tile === 1) {
        ctx.fillStyle = corruption >= 10 ? "#2f1f30" : "#2e5d34";
      } else if (tile === 2) {
        ctx.fillStyle = corruption >= 10 ? "#8b2f6e" : "#7864c8";
      } else if (tile === 3) {
        ctx.fillStyle = corruption >= 10 ? "#544049" : "#7d6a54";
      }

      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }
}
