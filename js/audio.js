const AUDIO_PREF_KEY = "branch_and_bone_audio_enabled";

const AUDIO_PATHS = {
  sfx: {
    "menu-click": "assets/audio/sfx/menu-click.mp3",
    "text-blip": "assets/audio/sfx/text-blip.mp3",
    interact: "assets/audio/sfx/interact.mp3",
    "save-success": "assets/audio/sfx/save-success.mp3",
    "load-success": "assets/audio/sfx/load-success.mp3"
  },
  ambience: {
    rain: "assets/audio/ambience/rain-loop.mp3",
    thunder1: "assets/audio/ambience/thunder-1.mp3"
  },
  music: {
    title: "assets/audio/music/title-theme.mp3",
    graveyard: "assets/audio/music/graveyard-loop.mp3"
  }
};

const warnedMissingPaths = new Set();
const ambiencePlayers = new Map();

let audioEnabled = true;
let audioUnlocked = false;
let audioContext = null;

function readAudioPreference() {
  const stored = localStorage.getItem(AUDIO_PREF_KEY);
  if (stored === "false") return false;
  if (stored === "true") return true;
  return true;
}

function writeAudioPreference(enabled) {
  localStorage.setItem(AUDIO_PREF_KEY, enabled ? "true" : "false");
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
  audioEnabled = readAudioPreference();
  updateAudioButtons();
}

function unlockAudio() {
  audioUnlocked = true;
  ensureAudioContext();
}

function setAudioEnabled(enabled) {
  audioEnabled = Boolean(enabled);
  writeAudioPreference(audioEnabled);

  if (!audioEnabled) {
    stopAllAmbience();
  }

  updateAudioButtons();
}

function isAudioEnabled() {
  return audioEnabled;
}

function playSound(soundKey) {
  if (!audioEnabled || !audioUnlocked) return;

  const path = resolveAudioPath(soundKey, "sfx");
  if (!path) return;

  const audio = createAudio(path);
  audio.play().catch(() => warnMissing(path));
}

function playAmbience(ambienceKey) {
  if (!audioEnabled || !audioUnlocked) return;
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
  for (const key of ambiencePlayers.keys()) {
    stopAmbience(key);
  }
}

function updateAudioButtons() {
  const musicBtn = document.getElementById("music-toggle-btn");
  const textBtn = document.getElementById("text-sound-toggle-btn");
  const label = `Audio: ${audioEnabled ? "On" : "Off"}`;

  [musicBtn, textBtn].forEach((btn) => {
    if (!btn) return;
    btn.disabled = false;
    btn.classList.remove("is-disabled");
    btn.removeAttribute("aria-disabled");
    btn.textContent = label;
    btn.title = "Toggle audio";
  });
}

window.audioSystem = {
  initAudio,
  unlockAudio,
  setAudioEnabled,
  isAudioEnabled,
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
  setAudioEnabled,
  isAudioEnabled,
  playSound,
  playAmbience,
  stopAmbience,
  stopAllAmbience
};
