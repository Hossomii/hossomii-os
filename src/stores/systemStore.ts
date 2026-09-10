import { create } from "zustand";
import type { SystemPhase } from "../types/system";

type SystemStore = {
  phase: SystemPhase;
  setPhase: (phase: SystemPhase) => void;
  resetSystem: () => void;
};

export const useSystemStore = create<SystemStore>((set) => ({
  phase: "login",

  setPhase: (phase) => {
    set({ phase });
  },

  resetSystem: () => {
    set({ phase: "login" });
  },
}));