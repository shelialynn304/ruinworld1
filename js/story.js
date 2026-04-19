export const STORY = {
  chapelDoor: {
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "Rain hammers the chapel doors like fists from another age.",
      "A narrow seam of darkness breathes from the wood. The lock has been broken from the inside, not the outside.",
      "If the chapel opens tonight, it will not open for mercy."
    ],
    choices: [
      {
        text: "Touch the rotten handle and listen.",
        action: "markChapelTouched"
      },
      {
        text: "Step back and keep your distance.",
        action: "steadyResolve"
      }
    ]
  },
  darkStatue: {
    area: "Blackgrave Cemetery",
    speaker: "Whisper",
    text: [
      "The statue has no face, only a smooth void where features should be.",
      "When lightning flashes, you see your own silhouette carved into the stone instead.",
      "A whisper slips under the thunder: 'Remember, or be remade.'"
    ],
    choices: [
      {
        text: "Kneel and accept the whisper.",
        action: "acceptWhisper"
      },
      {
        text: "Spit at the stone and refuse it.",
        action: "rejectWhisper"
      }
    ]
  },
  ironGate: {
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "The iron gate trembles in the wind, chained but not secure.",
      "Beyond it waits the dead road, flooded with stormwater and moonless mud.",
      "Someone has tied a scrap of prayer-cloth to the bars, now black with rain."
    ],
    choices: [
      {
        text: "Take the prayer-cloth and keep it.",
        action: "takePrayerCloth"
      },
      {
        text: "Leave it and whisper a vow instead.",
        action: "leavePrayerCloth"
      }
    ]
  },
  graveCluster: {
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "Fresh earth. Fresh cuts. Too many graves for one week of rain.",
      "At the center, one marker is blank except for a shallow crown scratched by a shaking hand.",
      "The memory in your chest stirs like a wound reopening."
    ],
    choices: [
      {
        text: "Study the crowned grave until the memory sharpens.",
        action: "inspectCrownedGrave"
      },
      {
        text: "Walk away before the memory takes hold.",
        action: "retreatFromGraves"
      }
    ]
  }
};
