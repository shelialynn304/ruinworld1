import { GRAVEYARD_MAP } from "./map.js";
import { createPlayer, updatePlayer } from "./player.js";
import { disableCanvasImageSmoothing, renderScene } from "./render.js";
import { updateInteraction } from "./interaction.js";
import { isDialogueOpen } from "./dialogue.js";
import { gameState } from "./state.js";

export class Game {
  constructor(canvas, interactionPrompt) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    disableCanvasImageSmoothing(this.ctx);
    this.map = GRAVEYARD_MAP;
    this.player = createPlayer(gameState.playerPosition.x, gameState.playerPosition.y);
    this.interactionPrompt = interactionPrompt;
    this.lastTime = 0;
    this.running = false;
    this.currentNearby = null;
    this.rafId = null;

  }

  start() {
    this.stop();
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame((time) => this.loop(time));
  }

  stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.currentNearby = null;
    this.updatePrompt();
  }

  restorePlayerPosition() {
    this.player.x = gameState.playerPosition.x;
    this.player.y = gameState.playerPosition.y;
  }

  resetPlayerPosition() {
    this.player.x = this.map.playerStart.x;
    this.player.y = this.map.playerStart.y;
    gameState.playerPosition = { x: this.player.x, y: this.player.y };
  }

  loop(timeMs) {
    if (!this.running) return;

    const dt = Math.min((timeMs - this.lastTime) / 1000, 0.033);
    this.lastTime = timeMs;

    updatePlayer(this.player, this.map, dt, !isDialogueOpen());
    this.currentNearby = updateInteraction(this.player, this.map, () => {
      this.currentNearby = null;
      this.updatePrompt();
    });

    gameState.playerPosition = {
      x: Math.round(this.player.x),
      y: Math.round(this.player.y)
    };

    this.updatePrompt();
    renderScene(this.ctx, this.map, this.player, this.currentNearby, timeMs);

    this.rafId = requestAnimationFrame((nextTime) => this.loop(nextTime));
  }

  updatePrompt() {
    if (!this.interactionPrompt) return;
    if (this.currentNearby && !isDialogueOpen() && this.running) {
      this.interactionPrompt.textContent = `Press E — ${this.currentNearby.label}`;
      this.interactionPrompt.classList.remove("hidden");
    } else {
      this.interactionPrompt.classList.add("hidden");
    }
  }
}
