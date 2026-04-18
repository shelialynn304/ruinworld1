window.audioSystem = {
  musicEnabled: false,
  textSoundsEnabled: true,
  audioContext: null,
  textSoundCounter: 0,
  currentMusicOscillators: [],

  init() {
    this.updateMusicButton();
    this.updateTextSoundButton();
  },

  ensureContext() {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }

    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  },

  startMusic() {
    this.musicEnabled = true;
    this.updateMusicButton();
    this.ensureContext();
    this.stopMusic();
    this.playAmbientDrone();
  },

  stopMusic() {
    this.currentMusicOscillators.forEach((item) => {
      try {
        item.osc.stop();
      } catch (error) {
        console.warn("Music stop warning:", error);
      }
    });
    this.currentMusicOscillators = [];
  },

  toggleMusic() {
    this.ensureContext();

    if (this.musicEnabled) {
      this.musicEnabled = false;
      this.stopMusic();
    } else {
      this.musicEnabled = true;
      this.playAmbientDrone();
    }

    this.updateMusicButton();
  },

  toggleTextSounds() {
    this.textSoundsEnabled = !this.textSoundsEnabled;
    this.updateTextSoundButton();
  },

  updateMusicButton() {
    const btn = document.getElementById("music-toggle-btn");
    if (btn) {
      btn.textContent = `Music: ${this.musicEnabled ? "On" : "Off"}`;
    }
  },

  updateTextSoundButton() {
    const btn = document.getElementById("text-sound-toggle-btn");
    if (btn) {
      btn.textContent = `Text Sounds: ${this.textSoundsEnabled ? "On" : "Off"}`;
    }
  },

  handleTypedCharacter(char, speakerName) {
    if (!this.textSoundsEnabled) return;
    if (!char || /\s/.test(char)) return;

    this.textSoundCounter += 1;

    if (this.textSoundCounter % 3 !== 0) return;

    this.playDialogueBlip(speakerName);
  },

  playDialogueBlip(speakerName) {
    this.ensureContext();
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    const voice = this.getVoiceProfile(speakerName);
    osc.type = voice.wave;
    osc.frequency.value = voice.base + Math.random() * voice.variance;

    gain.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(voice.volume, this.audioContext.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + voice.duration);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + voice.duration + 0.01);
  },

  getVoiceProfile(speakerName) {
    const name = String(speakerName || "").toLowerCase();

    if (name.includes("old woman") || name.includes("mara")) {
      return { base: 180, variance: 22, volume: 0.015, duration: 0.06, wave: "square" };
    }

    if (name.includes("oracle")) {
      return { base: 320, variance: 40, volume: 0.012, duration: 0.08, wave: "triangle" };
    }

    if (name.includes("narrator")) {
      return { base: 210, variance: 18, volume: 0.01, duration: 0.05, wave: "triangle" };
    }

    return { base: 260, variance: 28, volume: 0.014, duration: 0.05, wave: "square" };
  },

  playAmbientDrone() {
    if (!this.musicEnabled) return;
    this.ensureContext();
    if (!this.audioContext) return;

    const notes = [110, 146.83, 164.81];
    this.currentMusicOscillators = notes.map((freq, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = index === 0 ? "triangle" : "sine";
      osc.frequency.value = freq;

      gain.gain.value = index === 0 ? 0.018 : 0.009;

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();

      return { osc, gain };
    });
  }
};
