export const GRAVEYARD_MAP = {
  id: "blackgrave_graveyard",
  name: "Blackgrave Cemetery",
  width: 896,
  height: 448,
  playerStart: { x: 96, y: 360 },
  obstacles: [
    { x: 690, y: 72, width: 160, height: 180, type: "chapel" },
    { x: 40, y: 398, width: 816, height: 14, type: "fence" },
    { x: 40, y: 34, width: 816, height: 14, type: "fence" },
    { x: 34, y: 40, width: 12, height: 372, type: "fence" },
    { x: 850, y: 40, width: 12, height: 372, type: "fence" },
    { x: 404, y: 32, width: 84, height: 26, type: "gate" },

    { x: 180, y: 150, width: 24, height: 36, type: "grave" },
    { x: 236, y: 182, width: 24, height: 36, type: "grave" },
    { x: 300, y: 148, width: 24, height: 36, type: "grave" },
    { x: 360, y: 204, width: 24, height: 36, type: "grave" },
    { x: 446, y: 170, width: 24, height: 36, type: "grave" },

    { x: 534, y: 108, width: 42, height: 56, type: "statue" },

    { x: 82, y: 90, width: 52, height: 66, type: "tree" },
    { x: 118, y: 246, width: 52, height: 66, type: "tree" },
    { x: 602, y: 282, width: 52, height: 66, type: "tree" }
  ],
  interactables: [
    {
      id: "chapel-door",
      label: "Chapel Door",
      x: 726,
      y: 248,
      width: 48,
      height: 20,
      radius: 48,
      sceneId: "chapelDoor"
    },
    {
      id: "dark-statue",
      label: "Dark Statue",
      x: 532,
      y: 96,
      width: 46,
      height: 70,
      radius: 46,
      sceneId: "darkStatue"
    },
    {
      id: "iron-gate",
      label: "Iron Gate",
      x: 406,
      y: 18,
      width: 78,
      height: 40,
      radius: 40,
      sceneId: "ironGate"
    },
    {
      id: "grave-cluster",
      label: "Fresh Graves",
      x: 224,
      y: 140,
      width: 170,
      height: 110,
      radius: 52,
      sceneId: "graveCluster"
    }
  ]
};
