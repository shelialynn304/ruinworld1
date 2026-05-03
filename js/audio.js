const MUSIC_PREF_KEY = "branch_and_bone_music_enabled";
const EFFECTS_PREF_KEY = "branch_and_bone_effects_enabled";

const AUDIO_PATHS = {
  sfx: {
    "menu-click": "assets/audio/sfx/menu-click.mp3",
    "text-blip": "assets/audio/sfx/text-blip.mp3",
    interact: "assets/audio/sfx/interact.mp3",
    "save-success": "assets/audio/sfx/save-success.mp3",
    "load-success": "assets/audio/sfx/load-success.mp3",
    thunder1: "assets/audio/ambience/thunder-1.mp3"
  },
  ambience: {
    rain: "assets/audio/ambience/rain-loop.mp3"
  },
  music: {
    title: "assets/audio/music/title-theme.mp3",
    graveyard: "assets/audio/music/graveyard-loop.mp3"
  }
};

const warnedMissingPaths = new Set();
const ambiencePlayers = new Map();

let musicEnabled = true;
let effectsEnabled = true;
let audioUnlocked = false;
let audioContext = null;

function readPreference(key, fallback = true) {
  const stored = localStorage.getItem(key);
  if (stored === "false") return false;
  if (stored === "true") return true;
  return fallback;
}

function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  }
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
}

function resolveAudioPath(soundKey, kind) {
  const group = AUDIO_PATHS[kind] || {};
  return group[soundKey] || null;
}

function warnMissing(path) {
  if (!path || warnedMissingPaths.has(path)) return;
  warnedMissingPaths.add(path);
  console.warn(`[audio] Missing audio file: ${path}`);
}

function createAudio(path, loop = false) {
  const audio = new Audio(path);
  audio.loop = loop;
  audio.preload = "none";
  audio.addEventListener("error", () => warnMissing(path), { once: true });
  return audio;
}

function initAudio() {
  musicEnabled = readPreference(MUSIC_PREF_KEY, true);
  effectsEnabled = readPreference(EFFECTS_PREF_KEY, true);
  updateAudioButtons();
}

function unlockAudio() {
  audioUnlocked = true;
  ensureAudioContext();
}

function setMusicEnabled(enabled) {
  musicEnabled = Boolean(enabled);
  localStorage.setItem(MUSIC_PREF_KEY, musicEnabled ? "true" : "false");
  if (!musicEnabled) stopAllAmbience();
  updateAudioButtons();
}

function setEffectsEnabled(enabled) {
  effectsEnabled = Boolean(enabled);
  localStorage.setItem(EFFECTS_PREF_KEY, effectsEnabled ? "true" : "false");
  updateAudioButtons();
}

function isMusicEnabled() {
  return musicEnabled;
}

function isEffectsEnabled() {
  return effectsEnabled;
}

function playSound(soundKey) {
  if (!effectsEnabled || !audioUnlocked) return;
  const path = resolveAudioPath(soundKey, "sfx");
  if (!path) return;

  const audio = createAudio(path);
  audio.play().catch(() => warnMissing(path));
}

function playAmbience(ambienceKey) {
  if (!musicEnabled || !audioUnlocked) return;
  if (ambiencePlayers.has(ambienceKey)) return;

  const path = resolveAudioPath(ambienceKey, "ambience") || resolveAudioPath(ambienceKey, "music");
  if (!path) return;

  const audio = createAudio(path, true);
  ambiencePlayers.set(ambienceKey, audio);
  audio.play().catch(() => {
    warnMissing(path);
    ambiencePlayers.delete(ambienceKey);
  });
}

function stopAmbience(ambienceKey) {
  const audio = ambiencePlayers.get(ambienceKey);
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  ambiencePlayers.delete(ambienceKey);
}

function stopAllAmbience() {
  for (const key of ambiencePlayers.keys()) stopAmbience(key);
}

function updateAudioButtons() {
  const musicBtn = document.getElementById("music-toggle-btn");
  const effectsBtn = document.getElementById("text-sound-toggle-btn");

  if (musicBtn) {
    musicBtn.disabled = false;
    musicBtn.classList.remove("is-disabled");
    musicBtn.removeAttribute("aria-disabled");
    musicBtn.textContent = `Music: ${musicEnabled ? "On" : "Off"}`;
    musicBtn.title = "Toggle music";
  }

  if (effectsBtn) {
    effectsBtn.disabled = false;
    effectsBtn.classList.remove("is-disabled");
    effectsBtn.removeAttribute("aria-disabled");
    effectsBtn.textContent = `Effects: ${effectsEnabled ? "On" : "Off"}`;
    effectsBtn.title = "Toggle effects";
  }
}

window.audioSystem = {
  initAudio,
  unlockAudio,
  setMusicEnabled,
  setEffectsEnabled,
  isMusicEnabled,
  isEffectsEnabled,
  playSound,
  playAmbience,
  stopAmbience,
  stopAllAmbience,
  handleTypedCharacter(char) {
    if (!char || /\s/.test(char)) return;
    if (Math.random() > 0.35) return;
    playSound("text-blip");
  }
};

export {
  initAudio,
  unlockAudio,
  setMusicEnabled,
  setEffectsEnabled,
  isMusicEnabled,
  isEffectsEnabled,
  playSound,
  playAmbience,
  stopAmbience,
  stopAllAmbience
};
