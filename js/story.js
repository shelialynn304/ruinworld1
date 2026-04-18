window.STORY = {
  intro: {
    id: "intro",
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "Cold dirt clings to your hands.",
      "You wake between leaning gravestones beneath a sky gone nearly black, the air thick and metallic. An open grave yawns nearby. Beyond the cemetery, the chapel stands dark against the hills, like a hand raised to a sky that has forgotten how to answer.",
      "Thunder rolls somewhere far off. Then closer.",
      "The graveyard does not answer when you call into it.\nPerhaps it is waiting for you to remember who is speaking.",
      "What name still belongs to you?"
    ],
    choices: [
      {
        text: "Speak the name that still answers inside you.",
        action: "beginNameEntry"
      }
    ]
  },

  namePrompt: {
    id: "namePrompt",
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "Your tongue hesitates, as if your own life were written in a hand you no longer recognize.",
      "Say your name into the storm before it takes the chance from you."
    ],
    nameEntry: true,
    nameEntryLabel: "Name",
    nameEntryAction: "confirmName"
  },

  afterName: {
    id: "afterName",
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "The name feels strange in your mouth, but not false.",
      "Wind moves through the cemetery grass and makes the crooked markers whisper to one another.",
      "The first drops of rain strike stone and skin. Lightning briefly reshapes the graveyard into bone-white lines and broken shadows.",
      "The storm is almost here.",
      "Some part of your memory stirs, jagged and incomplete. You choose what kind of self survives first."
    ],
    choices: [
      {
        text: "Kneel at the open grave and read what the soil remembers.",
        action: "temperamentReflective"
      },
      {
        text: "Stand and watch the chapel through the rain, measuring the path.",
        action: "temperamentStoic"
      },
      {
        text: "Call into the dark again, daring whatever listens to answer.",
        action: "temperamentDefiant"
      }
    ]
  },

  memoryOrigin: {
    id: "memoryOrigin",
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "A memory fragment catches, then tears free.",
      "It could be true. It could be a lie you have lived too long. Choose the shard that feels least wrong."
    ],
    choices: [
      {
        text: "A village bell-rope burned your palms before the bells went silent.",
        action: "setOriginBellKeeper"
      },
      {
        text: "You marched under a lord's banner until the banner drowned in mud.",
        action: "setOriginOathbound"
      },
      {
        text: "You copied forbidden verses by candlelight in a locked scriptorium.",
        action: "setOriginScriptor"
      }
    ]
  },

  memoryMotive: {
    id: "memoryMotive",
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "Another shard surfaces, sharper than the first.",
      "Why did you come this far into dead ground?"
    ],
    choices: [
      {
        text: "To find someone you failed and drag them back from the dark.",
        action: "setMotiveRedemption"
      },
      {
        text: "To claim the power whispered beneath ruined chapels.",
        action: "setMotivePower"
      },
      {
        text: "To learn who arranged your death and walk back into their fire.",
        action: "setMotiveRevenge"
      }
    ]
  },

  memoryProphecy: {
    id: "memoryProphecy",
    area: "Blackgrave Cemetery",
    speaker: "Narrator",
    text: [
      "A final fragment arrives with the thunder: a warning about a crowned shadow and a chapel door.",
      "Prophecy has teeth. Decide whether you offer it your throat."
    ],
    choices: [
      {
        text: "Accept it. Fate may be cruel, but it still points somewhere.",
        action: "setProphecyFaith"
      },
      {
        text: "Resist it. Prophecy is a chain dressed as guidance.",
        action: "setProphecyDefiance"
      },
      {
        text: "Use it. Let others fear fate while you learn to steer it.",
        action: "setProphecyManipulate"
      }
    ]
  },

  chapelApproach: {
    id: "chapelApproach",
    area: "Path to the Chapel",
    speaker: "Narrator",
    text: [
      "Rain hardens. The wind drives you between toppled stones toward the chapel hill.",
      "Each flash of lightning remakes the path, but the door remains: black, patient, waiting.",
      "A lone figure stands at the chapel steps as if she has been expecting your footsteps in this storm."
    ],
    choices: [
      {
        text: "Climb the hill and face the waiting woman.",
        action: "goToChapel"
      },
      {
        text: "Circle the chapel first, searching for another way in.",
        action: "circleChapel"
      },
      {
        text: "Call to the woman and demand her name before you get closer.",
        action: "hailMaraFromPath"
      }
    ]
  },

  chapelExterior: {
    id: "chapelExterior",
    area: "Ruined Chapel",
    speaker: "Old Woman",
    text: [
      "The chapel leans like a dying thing, one bell tower split down the middle.",
      "An old woman waits on the steps, rain beading on gray cloth and eyes that do not blink away the lightning.",
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
