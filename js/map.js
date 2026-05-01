export const GRAVEYARD_MAP = {
  id: "blackgrave_graveyard",
  name: "Blackgrave Cemetery",
  width: 3072,
  height: 1536,
  playerStart: { x: 224, y: 1328 },
  obstacles: [
    { x: 140, y: 1296, width: 160, height: 64, type: "gate" },

    { x: 0, y: 0, width: 540, height: 80, type: "cliff" },
    { x: 612, y: 0, width: 440, height: 80, type: "cliff" },
    { x: 1120, y: 0, width: 620, height: 80, type: "cliff" },
    { x: 1812, y: 0, width: 520, height: 80, type: "cliff" },
    { x: 2408, y: 0, width: 664, height: 80, type: "cliff" },

    { x: 0, y: 1456, width: 460, height: 80, type: "brush" },
    { x: 536, y: 1456, width: 324, height: 80, type: "brush" },
    { x: 960, y: 1456, width: 520, height: 80, type: "brush" },
    { x: 1580, y: 1456, width: 488, height: 80, type: "brush" },
    { x: 2164, y: 1456, width: 420, height: 80, type: "brush" },
    { x: 2676, y: 1456, width: 396, height: 80, type: "brush" },

    { x: 0, y: 88, width: 72, height: 380, type: "tree" },
    { x: 0, y: 548, width: 72, height: 400, type: "tree" },
    { x: 0, y: 1022, width: 72, height: 322, type: "tree" },

    { x: 3000, y: 100, width: 72, height: 420, type: "tree" },
    { x: 3000, y: 590, width: 72, height: 430, type: "tree" },
    { x: 3000, y: 1090, width: 72, height: 354, type: "tree" },

    { x: 2370, y: 164, width: 292, height: 228, type: "mausoleum" },
    { x: 2144, y: 352, width: 40, height: 104, type: "statue" },
    { x: 1132, y: 560, width: 84, height: 162, type: "dead_tree" },

    { x: 412, y: 1180, width: 32, height: 20, type: "grave_plot" },
    { x: 508, y: 1180, width: 32, height: 20, type: "grave_plot" },
    { x: 604, y: 1180, width: 32, height: 20, type: "grave_plot" },
    { x: 700, y: 1180, width: 32, height: 20, type: "grave_plot" },
    { x: 412, y: 1084, width: 32, height: 20, type: "grave_plot" },
    { x: 508, y: 1084, width: 32, height: 20, type: "grave_plot" },
    { x: 604, y: 1084, width: 32, height: 20, type: "grave_plot" },
    { x: 700, y: 1084, width: 32, height: 20, type: "grave_plot" },

    { x: 980, y: 1060, width: 32, height: 20, type: "grave_plot" },
    { x: 1076, y: 1060, width: 32, height: 20, type: "grave_plot" },
    { x: 1172, y: 1060, width: 32, height: 20, type: "grave_plot" },
    { x: 1268, y: 1060, width: 32, height: 20, type: "grave_plot" },
    { x: 980, y: 964, width: 32, height: 20, type: "grave_plot" },
    { x: 1076, y: 964, width: 32, height: 20, type: "grave_plot" },
    { x: 1172, y: 964, width: 32, height: 20, type: "grave_plot" },
    { x: 1268, y: 964, width: 32, height: 20, type: "grave_plot" },

    { x: 1652, y: 878, width: 32, height: 20, type: "grave_plot" },
    { x: 1748, y: 878, width: 32, height: 20, type: "grave_plot" },
    { x: 1844, y: 878, width: 32, height: 20, type: "grave_plot" },
    { x: 1940, y: 878, width: 32, height: 20, type: "grave_plot" },

    { x: 420, y: 1164, width: 16, height: 16, type: "headstone" },
    { x: 516, y: 1164, width: 16, height: 16, type: "broken_stone" },
    { x: 612, y: 1164, width: 16, height: 16, type: "headstone" },
    { x: 708, y: 1164, width: 16, height: 16, type: "headstone" },

    { x: 888, y: 1210, width: 22, height: 20, type: "unique_grave" },
    { x: 1350, y: 906, width: 22, height: 20, type: "unique_grave" },

    { x: 780, y: 704, width: 32, height: 128, type: "broken_wall" },
    { x: 1544, y: 542, width: 32, height: 160, type: "broken_wall" },
    { x: 2600, y: 838, width: 32, height: 164, type: "broken_wall" },

    { x: 2660, y: 1090, width: 82, height: 180, type: "dead_tree" },
    { x: 2480, y: 1180, width: 46, height: 84, type: "statue" },
    { x: 2250, y: 1220, width: 120, height: 48, type: "broken_wall" },
    { x: 2040, y: 1280, width: 160, height: 56, type: "brush" },
    { x: 1840, y: 1300, width: 96, height: 36, type: "unique_grave" },
  ],
  interactables: [
    { id: "chapel-door", label: "Mausoleum Door", x: 2460, y: 392, width: 110, height: 36, radius: 70, sceneId: "chapelDoor" },
    { id: "dark-statue", label: "Dark Statue", x: 2128, y: 352, width: 64, height: 104, radius: 72, sceneId: "darkStatue" },
    { id: "iron-gate", label: "Iron Gate", x: 140, y: 1290, width: 170, height: 74, radius: 84, sceneId: "ironGate" },
    { id: "grave-cluster", label: "Fresh Graves", x: 380, y: 1030, width: 380, height: 210, radius: 80, sceneId: "graveCluster" }
  ]
};
