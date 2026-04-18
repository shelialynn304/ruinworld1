export const STORY = {
  intro_awakening: {
    id: "intro_awakening",
    area: "The Road to Ash",
    speaker: "Narrator",
    lines: [
      "The thirteenth bell never rang.",
      "Under a bruised sky, you wake beside the old royal road with cinders in your lungs.",
      "Somewhere ahead, a chapel waits with its doors open like a wound.",
    ],
    choices: [
      { label: "Walk toward the ruined chapel", action: "go_chapel_steps" },
      { label: "Search the roadside dead", action: "search_road" },
      { label: "Whisper a forbidden prayer", action: "road_prayer" },
    ],
  },

  road_search: {
    id: "road_search",
    area: "The Road to Ash",
    speaker: "Narrator",
    lines: [
      "In the mud you find a torn purse and a fingerbone charm etched with tiny suns.",
      "The kingdom taught you to bury such things. Your hands do not listen.",
    ],
    choices: [
      { label: "Take both and move on", action: "take_both" },
      { label: "Take coin only", action: "take_coin_only" },
      { label: "Leave the dead in peace", action: "leave_road_items" },
    ],
  },

  road_prayer: {
    id: "road_prayer",
    area: "The Road to Ash",
    speaker: "Narrator",
    lines: [
      "Your prayer drifts into the fog and returns as a colder wind.",
      "For a heartbeat, footsteps answer yours from nowhere.",
    ],
    choices: [
      { label: "Keep walking to the chapel", action: "go_chapel_steps" },
      { label: "Pray again, louder", action: "pray_again" },
    ],
  },

  chapel_steps: {
    id: "chapel_steps",
    area: "Ruined Chapel",
    speaker: "Mara",
    lines: [
      "A woman wrapped in grave-gray cloth waits on the steps.",
      "\"You are late, Chosen,\" she says. \"Late means doubtful. Doubt can be useful.\"",
    ],
    choices: [
      { label: "Who are you?", action: "ask_mara_name" },
      { label: "Why call me Chosen?", action: "ask_chosen" },
      { label: "Step aside.", action: "threaten_mara" },
    ],
  },

  first_vow: {
    id: "first_vow",
    area: "Ruined Chapel",
    speaker: "Mara",
    lines: [
      "\"Inside is a black altar and a kingdom's last lie,\" Mara says.",
      "\"Choose how you enter: as blade, shepherd, or witness. The world will remember.\"",
    ],
    choices: [
      { label: "Enter as blade (power first)", action: "vow_blade" },
      { label: "Enter as shepherd (people first)", action: "vow_shepherd" },
      { label: "Enter as witness (truth first)", action: "vow_witness" },
    ],
  },

  chapter_end: {
    id: "chapter_end",
    area: "Chapel Interior",
    speaker: "Narrator",
    lines: [
      "The doors seal behind you. Wax, smoke, and old prayers fill the dark.",
      "This is only the first chamber. Your path has begun.",
    ],
    choices: [{ label: "Return to title screen", action: "return_title" }],
  },
};
