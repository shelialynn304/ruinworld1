let musicEnabled = true;
let blipsEnabled = true;
let musicPlaying = false;

export function startMusicLoopPlaceholder() {
  // Placeholder for looped BGM integration with an asset file.
  // Example later: audio.src = "assets/audio/road_theme.mp3"; audio.loop = true; audio.play();
  if (!musicEnabled) return;
  musicPlaying = true;
}

export function stopMusicLoopPlaceholder() {
  musicPlaying = false;
}

export function toggleMusic() {
  musicEnabled = !musicEnabled;
  if (!musicEnabled) {
    stopMusicLoopPlaceholder();
  }
  return musicEnabled;
}

export function toggleBlips() {
  blipsEnabled = !blipsEnabled;
  return blipsEnabled;
}

export function setAudioSettings(settings) {
  musicEnabled = settings.musicOn;
  blipsEnabled = settings.blipsOn;

  if (musicEnabled && !musicPlaying) {
    startMusicLoopPlaceholder();
  }

  if (!musicEnabled && musicPlaying) {
    stopMusicLoopPlaceholder();
  }
}

export function playDialogueBlipPlaceholder() {
  // Placeholder for retro dialogue beeps.
  // Keeps integration point without forcing external files.
  if (!blipsEnabled) return;
}

export function getAudioSettings() {
  return {
    musicOn: musicEnabled,
    blipsOn: blipsEnabled,
  };
}
