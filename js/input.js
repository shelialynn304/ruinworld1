export const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  interact: false,
};

export function setupInput() {
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = true;
    if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = true;
    if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = true;
    if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = true;
    if (["e", "E"].includes(e.key)) keys.interact = true;
  });

  window.addEventListener("keyup", (e) => {
    if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = false;
    if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = false;
    if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = false;
    if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = false;
    if (["e", "E"].includes(e.key)) keys.interact = false;
  });
}
