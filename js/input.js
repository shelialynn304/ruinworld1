const keys = {
  up: false,
  down: false,
  left: false,
  right: false
};

let interactPressed = false;
let interactJustPressed = false;
let inputBound = false;

const UP_KEYS = new Set(["ArrowUp", "w", "W"]);
const DOWN_KEYS = new Set(["ArrowDown", "s", "S"]);
const LEFT_KEYS = new Set(["ArrowLeft", "a", "A"]);
const RIGHT_KEYS = new Set(["ArrowRight", "d", "D"]);
const INTERACT_KEYS = new Set(["e", "E"]);

export function setupInput() {
  if (inputBound) return;
  inputBound = true;

  window.addEventListener("keydown", (event) => {
    const { key } = event;

    if (UP_KEYS.has(key)) {
      keys.up = true;
      event.preventDefault();
    }
    if (DOWN_KEYS.has(key)) {
      keys.down = true;
      event.preventDefault();
    }
    if (LEFT_KEYS.has(key)) {
      keys.left = true;
      event.preventDefault();
    }
    if (RIGHT_KEYS.has(key)) {
      keys.right = true;
      event.preventDefault();
    }

    if (INTERACT_KEYS.has(key)) {
      if (!interactPressed) {
        interactJustPressed = true;
      }
      interactPressed = true;
      event.preventDefault();
    }
  });

  window.addEventListener("keyup", (event) => {
    const { key } = event;

    if (UP_KEYS.has(key)) keys.up = false;
    if (DOWN_KEYS.has(key)) keys.down = false;
    if (LEFT_KEYS.has(key)) keys.left = false;
    if (RIGHT_KEYS.has(key)) keys.right = false;
    if (INTERACT_KEYS.has(key)) interactPressed = false;
  });
}

export function setVirtualDirection(direction, isPressed) {
  if (!(direction in keys)) return;
  keys[direction] = !!isPressed;
}

export function triggerVirtualInteract() {
  if (!interactPressed) {
    interactJustPressed = true;
  }
  interactPressed = true;
}

export function releaseVirtualInteract() {
  interactPressed = false;
}

export function clearInputState() {
  keys.up = false;
  keys.down = false;
  keys.left = false;
  keys.right = false;
  interactPressed = false;
  interactJustPressed = false;
}

export function getMoveVector() {
  const x = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  const y = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
  return { x, y };
}

export function consumeInteractPress() {
  if (!interactJustPressed) return false;
  interactJustPressed = false;
  return true;
}
