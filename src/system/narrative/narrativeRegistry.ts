import type { NarrativeEventDefinition } from "./types";

export const NARRATIVE_REGISTRY: NarrativeEventDefinition[] = [
  {
    id: "operator-record-discovered",

    trigger: "file-opened",

    once: true,

    condition: (context) => {
      return context.itemId === "operator-record-file";
    },

    effect: () => {
      return {
        type: "none",
      };
    },
  },

  {
    id: "maintenance-record-discovered",

    trigger: "file-opened",

    once: true,

    condition: (context) => {
      return context.itemId === "maintenance-record-file";
    },

    effect: () => {
      return {
        type: "none",
      };
    },
  },

  {
    id: "operator-identity-acknowledged",

    trigger: "terminal-command",

    once: true,

    condition: (context, snapshot) => {
      return (
        context.command === "whoami" &&
        snapshot.discoveredEvents.includes("operator-record-discovered")
      );
    },

    effect: () => {
      return {
        type: "terminal-lines",

        lines: ["[archive] perfil do operador vinculado à sessão atual."],
      };
    },
  },

  {
    id: "maintenance-version-acknowledged",

    trigger: "terminal-command",

    once: true,

    condition: (context, snapshot) => {
      return (
        context.command === "ver" &&
        snapshot.discoveredEvents.includes("maintenance-record-discovered")
      );
    },

    effect: () => {
      return {
        type: "terminal-lines",

        lines: [
          "[archive] metadados de manutenção disponíveis fora do índice padrão.",
        ],
      };
    },
  },
  {
    id: "recovery-completed",

    trigger: "system-recovered",

    once: true,

    condition: () => {
      return true;
    },

    effect: () => {
      return {
        type: "none",
      };
    },
  },

  {
    id: "recovery-host-acknowledged",

    trigger: "terminal-command",

    once: true,

    condition: (context, snapshot) => {
      return (
        context.command === "hostname" &&
        snapshot.discoveredEvents.includes("recovery-completed")
      );
    },

    effect: () => {
      return {
        type: "terminal-lines",

        lines: [
          "[recovery] registro de falha de integridade associado a este host.",
        ],
      };
    },
  },
];
