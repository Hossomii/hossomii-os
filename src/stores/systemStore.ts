import { create } from "zustand";

import type {
  SystemPhase,
} from "../types/system";

type SystemStore = {
  phase: SystemPhase;

  setPhase: (
    phase: SystemPhase
  ) => void;

  shutdownSystem:
    () => void;

  completeShutdown:
    () => void;

  resetSystem:
    () => void;
};

export const useSystemStore =
  create<SystemStore>(
    (set) => ({
      phase: "login",

      setPhase: (
        phase
      ) => {
        set({
          phase,
        });
      },

      shutdownSystem:
        () => {
          set({
            phase:
              "shutting-down",
          });
        },

      completeShutdown:
        () => {
          set({
            phase:
              "powered-off",
          });
        },

      resetSystem:
        () => {
          set({
            phase:
              "login",
          });
        },
    })
  );