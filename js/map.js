export const GRAVEYARD_MAP = {
  id: "blackgrave_graveyard",
  name: "Blackgrave Cemetery",
  width: 3072,
  height: 1536,
  playerStart: { x: 160, y: 1320 },
  obstacles: [
    { x: 0, y: 0, width: 480, height: 96, type: "fence" },
    { x: 544, y: 0, width: 384, height: 96, type: "fence" },
    { x: 992, y: 0, width: 448, height: 96, type: "fence" },
    { x: 1536, y: 0, width: 416, height: 96, type: "fence" },
    { x: 2016, y: 0, width: 480, height: 96, type: "fence" },
    { x: 2560, y: 0, width: 512, height: 96, type: "fence" },

    { x: 0, y: 1440, width: 384, height: 96, type: "fence" },
    { x: 448, y: 1440, width: 320, height: 96, type: "fence" },
    { x: 864, y: 1440, width: 352, height: 96, type: "fence" },
    { x: 1280, y: 1440, width: 352, height: 96, type: "fence" },
    { x: 1696, y: 1440, width: 384, height: 96, type: "fence" },
    { x: 2144, y: 1440, width: 448, height: 96, type: "fence" },
    { x: 2656, y: 1440, width: 416, height: 96, type: "fence" },

    { x: 0, y: 96, width: 96, height: 448, type: "fence" },
    { x: 0, y: 640, width: 96, height: 416, type: "fence" },
    { x: 0, y: 1120, width: 96, height: 320, type: "fence" },
    { x: 2976, y: 96, width: 96, height: 448, type: "fence" },
    { x: 2976, y: 608, width: 96, height: 416, type: "fence" },
    { x: 2976, y: 1088, width: 96, height: 352, type: "fence" },

    { x: 2240, y: 160, width: 256, height: 224, type: "chapel" },
    { x: 2336, y: 128, width: 64, height: 32, type: "gate" },
    { x: 1984, y: 352, width: 32, height: 96, type: "statue" },

    { x: 320, y: 1160, width: 32, height: 20, type: "grave_plot" },
    { x: 416, y: 1160, width: 32, height: 20, type: "grave_plot" },
    { x: 512, y: 1160, width: 32, height: 20, type: "grave_plot" },
    { x: 608, y: 1160, width: 32, height: 20, type: "grave_plot" },
    { x: 320, y: 1064, width: 32, height: 20, type: "grave_plot" },
    { x: 416, y: 1064, width: 32, height: 20, type: "grave_plot" },
    { x: 512, y: 1064, width: 32, height: 20, type: "grave_plot" },
    { x: 608, y: 1064, width: 32, height: 20, type: "grave_plot" },

    { x: 896, y: 1024, width: 32, height: 20, type: "grave_plot" },
    { x: 992, y: 1024, width: 32, height: 20, type: "grave_plot" },
    { x: 1088, y: 1024, width: 32, height: 20, type: "grave_plot" },
    { x: 1184, y: 1024, width: 32, height: 20, type: "grave_plot" },
    { x: 896, y: 928, width: 32, height: 20, type: "grave_plot" },
    { x: 992, y: 928, width: 32, height: 20, type: "grave_plot" },
    { x: 1088, y: 928, width: 32, height: 20, type: "grave_plot" },
    { x: 1184, y: 928, width: 32, height: 20, type: "grave_plot" },

    { x: 1648, y: 864, width: 32, height: 20, type: "grave_plot" },
    { x: 1744, y: 864, width: 32, height: 20, type: "grave_plot" },
    { x: 1840, y: 864, width: 32, height: 20, type: "grave_plot" },
    { x: 1936, y: 864, width: 32, height: 20, type: "grave_plot" },
    { x: 1648, y: 768, width: 32, height: 20, type: "grave_plot" },
    { x: 1744, y: 768, width: 32, height: 20, type: "grave_plot" },
    { x: 1840, y: 768, width: 32, height: 20, type: "grave_plot" },
    { x: 1936, y: 768, width: 32, height: 20, type: "grave_plot" },

    { x: 328, y: 1144, width: 16, height: 16, type: "headstone" },
    { x: 424, y: 1144, width: 16, height: 16, type: "broken_stone" },
    { x: 520, y: 1144, width: 16, height: 16, type: "headstone" },
    { x: 616, y: 1144, width: 16, height: 16, type: "headstone" },
    { x: 904, y: 1008, width: 16, height: 16, type: "headstone" },
    { x: 1000, y: 1008, width: 16, height: 16, type: "headstone" },
    { x: 1096, y: 1008, width: 16, height: 16, type: "broken_stone" },
    { x: 1192, y: 1008, width: 16, height: 16, type: "headstone" },
    { x: 1656, y: 848, width: 16, height: 16, type: "headstone" },
    { x: 1752, y: 848, width: 16, height: 16, type: "broken_stone" },
    { x: 1848, y: 848, width: 16, height: 16, type: "headstone" },
    { x: 1944, y: 848, width: 16, height: 16, type: "headstone" },

    { x: 736, y: 640, width: 32, height: 128, type: "fence" },
    { x: 1440, y: 512, width: 32, height: 160, type: "fence" },
    { x: 2576, y: 800, width: 32, height: 160, type: "fence" }
  ],
  interactables: [
    { id: "chapel-door", label: "Chapel Door", x: 2320, y: 352, width: 96, height: 32, radius: 64, sceneId: "chapelDoor" },
    { id: "dark-statue", label: "Dark Statue", x: 1968, y: 352, width: 64, height: 96, radius: 72, sceneId: "darkStatue" },
    { id: "iron-gate", label: "Iron Gate", x: 2320, y: 112, width: 96, height: 48, radius: 56, sceneId: "ironGate" },
    { id: "grave-cluster", label: "Fresh Graves", x: 280, y: 1024, width: 384, height: 192, radius: 80, sceneId: "graveCluster" }
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
