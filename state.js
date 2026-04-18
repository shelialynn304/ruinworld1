export function createInitialState() {
  return {
    currentScene: "intro_awakening",
    lineIndex: 0,
    stats: {
      corruption: 0,
      mercy: 0,
      influence: 0,
      devotion: 0,
      followerCount: 0,
      gold: 10,
    },
    flags: {},
    settings: {
      musicOn: true,
      blipsOn: true,
    },
  };
}

export function applyEffects(state, effects = {}) {
  const next = state;

  if (effects.stats) {
    for (const [key, value] of Object.entries(effects.stats)) {
      if (typeof next.stats[key] === "number") {
        next.stats[key] += value;
      }
    }
  }

  if (effects.setFlags) {
    for (const [key, value] of Object.entries(effects.setFlags)) {
      next.flags[key] = value;
    }
  }

  return next;
}
