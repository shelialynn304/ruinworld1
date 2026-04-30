export const GRAVEYARD_MAP = {
  id: "blackgrave_graveyard",
  name: "Blackgrave Cemetery",
  width: 896,
  height: 448,
  playerStart: { x: 96, y: 352 },
  obstacles: [
    { x: 672, y: 64, width: 160, height: 160, type: "chapel" },
    { x: 32, y: 384, width: 832, height: 32, type: "fence" },
    { x: 32, y: 32, width: 832, height: 32, type: "fence" },
    { x: 32, y: 32, width: 32, height: 384, type: "fence" },
    { x: 832, y: 32, width: 32, height: 384, type: "fence" },
    { x: 384, y: 32, width: 128, height: 32, type: "gate" },

    { x: 160, y: 128, width: 32, height: 20, type: "grave_plot" },
    { x: 224, y: 128, width: 32, height: 20, type: "grave_plot" },
    { x: 288, y: 128, width: 32, height: 20, type: "grave_plot" },
    { x: 352, y: 128, width: 32, height: 20, type: "grave_plot" },

    { x: 160, y: 192, width: 32, height: 20, type: "grave_plot" },
    { x: 224, y: 192, width: 32, height: 20, type: "grave_plot" },
    { x: 288, y: 192, width: 32, height: 20, type: "grave_plot" },
    { x: 352, y: 192, width: 32, height: 20, type: "grave_plot" },

    { x: 168, y: 112, width: 16, height: 16, type: "headstone" },
    { x: 232, y: 112, width: 16, height: 16, type: "headstone" },
    { x: 296, y: 112, width: 16, height: 16, type: "broken_stone" },
    { x: 360, y: 112, width: 16, height: 16, type: "headstone" },

    { x: 168, y: 176, width: 16, height: 16, type: "headstone" },
    { x: 232, y: 176, width: 16, height: 16, type: "broken_stone" },
    { x: 296, y: 176, width: 16, height: 16, type: "headstone" },
    { x: 360, y: 176, width: 16, height: 16, type: "headstone" },

    { x: 544, y: 96, width: 32, height: 64, type: "statue" },
    { x: 576, y: 256, width: 32, height: 96, type: "fence" }
  ],
  interactables: [
    {
      id: "chapel-door",
      label: "Chapel Door",
      x: 720,
      y: 224,
      width: 64,
      height: 32,
      radius: 48,
      sceneId: "chapelDoor"
    },
    {
      id: "dark-statue",
      label: "Dark Statue",
      x: 536,
      y: 96,
      width: 40,
      height: 64,
      radius: 46,
      sceneId: "darkStatue"
    },
    {
      id: "iron-gate",
      label: "Iron Gate",
      x: 392,
      y: 16,
      width: 112,
      height: 48,
      radius: 40,
      sceneId: "ironGate"
    },
    {
      id: "grave-cluster",
      label: "Fresh Graves",
      x: 144,
      y: 96,
      width: 272,
      height: 128,
      radius: 52,
      sceneId: "graveCluster"
    }
  ]
};
