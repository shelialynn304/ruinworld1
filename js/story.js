window.STORY = {
  intro: {
    id: "intro",
    area: "The Road to Ash",
    speaker: "Narrator",
    text: [
      "The bells have been silent for thirteen nights.",
      "The roads are empty now, except for the desperate and the chosen.",
      "At the edge of a dead village, beneath a sky the color of old bruises, your journey begins."
    ],
    choices: [
      {
        text: "Walk toward the ruined chapel.",
        action: "goToChapel"
      },
      {
        text: "Search the road for anything useful.",
        action: "searchRoad"
      },
      {
        text: "Whisper a prayer to whatever still listens.",
        action: "prayAtRoad"
      }
    ]
  },

  roadSearch: {
    id: "roadSearch",
    area: "The Road to Ash",
    speaker: "Narrator",
    text: [
      "You crouch beside the cracked stones and sift through mud, ash, and rotten cloth.",
      "Most of the dead were stripped before burial. Or after.",
      "Your fingers close around a small pouch of coins and a thin charm carved from bone."
    ],
    choices: [
      {
        text: "Take both.",
        action: "takeCoinsAndCharm"
      },
      {
        text: "Take only the coins.",
        action: "takeCoinsOnly"
      },
      {
        text: "Leave them. The dead can keep their things.",
        action: "leaveRoadItems"
      }
    ]
  },

  roadPrayer: {
    id: "roadPrayer",
    area: "The Road to Ash",
    speaker: "Narrator",
    text: [
      "You lower your head and speak softly into the cold air.",
      "No answer comes.",
      "But the wind shifts, and for a moment it feels as if something noticed you."
    ],
    choices: [
      {
        text: "Continue to the chapel.",
        action: "goToChapel"
      },
      {
        text: "Stand and say the prayer again, louder.",
        action: "prayAgain"
      }
    ]
  },

  chapelExterior: {
    id: "chapelExterior",
    area: "Ruined Chapel",
    speaker: "Old Woman",
    text: [
      "The chapel leans like a dying thing, one bell tower split down the middle.",
      "An old woman waits on the steps, wrapped in gray cloth and watching you without fear.",
      "\"You took your time,\" she says. \"That usually means doubt. Or brains. Both are rare.\""
    ],
    choices: [
      {
        text: "\"Who are you?\"",
        action: "askOldWomanIdentity"
      },
      {
        text: "\"You were expecting me?\"",
        action: "askOldWomanExpectation"
      },
      {
        text: "\"Move.\"",
        action: "threatenOldWoman"
      }
    ]
  },

  oldWomanIdentity: {
    id: "oldWomanIdentity",
    area: "Ruined Chapel",
    speaker: "Old Woman",
    text: [
      "\"Names are expensive,\" she says. \"You may call me Mara, if it comforts you to name things before they ruin you.\"",
      "She studies your face like she already knows the worst thing you might become."
    ],
    choices: [
      {
        text: "\"Why am I here?\"",
        action: "askWhyHere"
      },
      {
        text: "\"You talk too much.\"",
        action: "insultMara"
      },
      {
        text: "\"Can you help me?\"",
        action: "askMaraHelp"
      }
    ]
  },

  oldWomanExpectation: {
    id: "oldWomanExpectation",
    area: "Ruined Chapel",
    speaker: "Old Woman",
    text: [
      "\"Of course,\" she says.",
      "\"Every dying kingdom starts looking for a chosen soul when the blood reaches the floorboards.\"",
      "\"The question is not whether you were expected. The question is whether you are foolish enough to stay.\""
    ],
    choices: [
      {
        text: "\"Then tell me what you know.\"",
        action: "askWhyHere"
      },
      {
        text: "\"I'm leaving.\"",
        action: "tryToLeave"
      },
      {
        text: "\"Maybe I am foolish enough.\"",
        action: "acceptStrangeness"
      }
    ]
  },

  oldWomanThreatened: {
    id: "oldWomanThreatened",
    area: "Ruined Chapel",
    speaker: "Old Woman",
    text: [
      "The old woman does not move.",
      "\"That tone works on the living,\" she says. \"Barely.\"",
      "\"Try again. Or don't. But choose what sort of creature you plan to be.\""
    ],
    choices: [
      {
        text: "Back down.",
        action: "backDownToMara"
      },
      {
        text: "Double down and threaten her again.",
        action: "doubleThreatenMara"
      },
      {
        text: "Ask what she means.",
        action: "askWhyHere"
      }
    ]
  },

  chapelEntry: {
    id: "chapelEntry",
    area: "Ruined Chapel",
    speaker: "Narrator",
    text: [
      "The chapel doors groan open.",
      "Inside, melted candles line the walls like old teeth.",
      "At the far end of the room stands a black stone altar, and behind it, a cracked mural of a crowned figure with no face."
    ],
    choices: [
      {
        text: "Approach the altar.",
        action: "approachAltar"
      },
      {
        text: "Inspect the mural.",
        action: "inspectMural"
      },
      {
        text: "Turn back and speak to Mara again.",
        action: "returnToMara"
      }
    ]
  }
};
