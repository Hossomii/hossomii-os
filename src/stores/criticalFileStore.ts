import { create } from "zustand";

export type CriticalFilePhase =
  | "idle"
  | "first-confirmation"
  | "second-confirmation"
  | "typed-confirmation"
  | "failure";

type CriticalFileTarget = {
  id: string;
  name: string;
};

type CriticalFileStore = {
  phase: CriticalFilePhase;

  target: CriticalFileTarget | null;

  startFlow: (
    target: CriticalFileTarget
  ) => void;

  showSecondConfirmation: () => void;

  showTypedConfirmation: () => void;

  triggerFailure: () => void;

  resetFlow: () => void;
};

export const useCriticalFileStore =
  create<CriticalFileStore>((set) => ({
    phase: "idle",

    target: null,

    startFlow: (target) => {
      set({
        phase: "first-confirmation",
        target,
      });
    },

    showSecondConfirmation: () => {
      set({
        phase: "second-confirmation",
      });
    },

    showTypedConfirmation: () => {
      set({
        phase: "typed-confirmation",
      });
    },

    triggerFailure: () => {
      set({
        phase: "failure",
      });
    },

    resetFlow: () => {
      set({
        phase: "idle",
        target: null,
      });
    },
  }));