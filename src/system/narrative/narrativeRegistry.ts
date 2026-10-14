import type { NarrativeEventDefinition } from "./types";

export const NARRATIVE_REGISTRY: NarrativeEventDefinition[] = [
  {
    id: "placeholder-terminal-event",

    trigger: "terminal-command",

    once: true,

    condition: () => {
      return false;
    },

    effect: () => {
      return {
        type: "none",
      };
    },
  },
];
