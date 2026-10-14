import { create } from "zustand";

import { persist } from "zustand/middleware";

import type {
  NarrativeEventId,
  NarrativeTriggerId,
} from "../system/narrative/types";

type NarrativeStore = {
  discoveredEvents: NarrativeEventId[];

  triggerCounts: Partial<Record<NarrativeTriggerId, number>>;

  markDiscovered: (id: NarrativeEventId) => void;

  recordTrigger: (trigger: NarrativeTriggerId) => void;

  hasDiscovered: (id: NarrativeEventId) => boolean;

  getTriggerCount: (trigger: NarrativeTriggerId) => number;

  resetNarrative: () => void;
};

export const useNarrativeStore = create<NarrativeStore>()(
  persist(
    (set, get) => ({
      discoveredEvents: [],

      triggerCounts: {},

      markDiscovered: (id) => {
        if (get().discoveredEvents.includes(id)) {
          return;
        }

        set((state) => ({
          discoveredEvents: [...state.discoveredEvents, id],
        }));
      },

      recordTrigger: (trigger) => {
        set((state) => ({
          triggerCounts: {
            ...state.triggerCounts,

            [trigger]: (state.triggerCounts[trigger] ?? 0) + 1,
          },
        }));
      },

      hasDiscovered: (id) => {
        return get().discoveredEvents.includes(id);
      },

      getTriggerCount: (trigger) => {
        return get().triggerCounts[trigger] ?? 0;
      },

      resetNarrative: () => {
        set({
          discoveredEvents: [],

          triggerCounts: {},
        });
      },
    }),
    {
      name: "hossomii-os-narrative",

      version: 1,

      partialize: (state) => ({
        discoveredEvents: state.discoveredEvents,

        triggerCounts: state.triggerCounts,
      }),
    },
  ),
);
