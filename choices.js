const TO_CHAPEL = { nextScene: "chapel_steps" };

export const CHOICE_ACTIONS = {
  go_chapel_steps: () => TO_CHAPEL,

  search_road: ({ state }) => {
    state.flags.lookedAtRoad = true;
    return { nextScene: "road_search" };
  },

  road_prayer: ({ state }) => {
    state.flags.prayedAtRoad = true;
    return { nextScene: "road_prayer" };
  },

  take_both: ({ state }) => {
    state.stats.gold += 5;
    state.stats.corruption += 1;
    return TO_CHAPEL;
  },

  take_coin_only: ({ state }) => {
    state.stats.gold += 5;
    return TO_CHAPEL;
  },

  leave_road_items: ({ state }) => {
    state.stats.mercy += 1;
    state.stats.devotion += 1;
    return TO_CHAPEL;
  },

  pray_again: ({ state }) => {
    state.stats.devotion += 2;
    state.flags.heardWhisper = true;
    return TO_CHAPEL;
  },

  ask_mara_name: ({ state }) => {
    state.stats.influence += 1;
    return { nextScene: "first_vow" };
  },

  ask_chosen: ({ state }) => {
    state.stats.devotion += 1;
    return { nextScene: "first_vow" };
  },

  threaten_mara: ({ state }) => {
    state.stats.corruption += 2;
    state.stats.influence += 1;
    return { nextScene: "first_vow" };
  },

  vow_blade: ({ state }) => {
    state.stats.corruption += 1;
    state.stats.influence += 2;
    state.stats.followerCount += 1;
    return { nextScene: "chapter_end" };
  },

  vow_shepherd: ({ state }) => {
    state.stats.mercy += 2;
    state.stats.devotion += 1;
    state.stats.followerCount += 2;
    return { nextScene: "chapter_end" };
  },

  vow_witness: ({ state }) => {
    state.stats.devotion += 1;
    state.stats.influence += 1;
    state.stats.gold += 3;
    return { nextScene: "chapter_end" };
  },

  return_title: () => ({ nextScene: "intro_awakening", toTitle: true }),
};

export function runChoiceAction(actionName, context) {
  const action = CHOICE_ACTIONS[actionName];
  if (!action) {
    return { nextScene: context.state.currentScene };
  }

  return action(context) || { nextScene: context.state.currentScene };
}
