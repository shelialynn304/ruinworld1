const SCRIPT_ORDER = [
  "js/state.js",
  "js/story.js",
  "js/choices.js",
  "js/save.js",
  "js/audio.js",
  "js/ui.js",
  "js/game.js"
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

async function bootstrap() {
  for (const src of SCRIPT_ORDER) {
    await loadScript(src);
  }

  if (typeof window.initializeGame === "function") {
    window.initializeGame();
  }
}

bootstrap().catch((error) => {
  console.error("Game bootstrap failed:", error);
});
