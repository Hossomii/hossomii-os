import { create } from "zustand";

export type CriticalFilePhase =
  | "idle"
  | "first-confirmation"
  | "second-confirmation"
  | "typed-confirmation"
  | "failure"
  | "recovery-diagnostic"
  | "recovery-restore"
  | "recovery-restart"
  | "recovered";

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

  startRecovery: () => void;

  markDiagnosed: () => void;

  markRestored: () => void;

  markRecovered: () => void;

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

    startRecovery: () => {
      set({
        phase: "recovery-diagnostic",
      });
    },

    markDiagnosed: () => {
      set({
        phase: "recovery-restore",
      });
    },

    markRestored: () => {
      set({
        phase: "recovery-restart",
      });
    },

    markRecovered: () => {
      set({
        phase: "recovered",
      });
    },

    resetFlow: () => {
      set({
        phase: "idle",
        target: null,
      });
    },
  }));