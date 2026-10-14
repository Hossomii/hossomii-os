import type {
  NarrativeEventDefinition,
} from "./types";

export const NARRATIVE_REGISTRY:
  NarrativeEventDefinition[] = [
    {
      id:
        "operator-record-discovered",

      trigger:
        "file-opened",

      once:
        true,

      condition: (
        context,
      ) => {
        return (
          context.itemId ===
          "operator-record-file"
        );
      },

      effect: () => {
        return {
          type:
            "none",
        };
      },
    },

    {
      id:
        "maintenance-record-discovered",

      trigger:
        "file-opened",

      once:
        true,

      condition: (
        context,
      ) => {
        return (
          context.itemId ===
          "maintenance-record-file"
        );
      },

      effect: () => {
        return {
          type:
            "none",
        };
      },
    },

    {
      id:
        "operator-identity-acknowledged",

      trigger:
        "terminal-command",

      once:
        true,

      condition: (
        context,
        snapshot,
      ) => {
        return (
          context.command ===
            "whoami" &&
          snapshot.discoveredEvents.includes(
            "operator-record-discovered",
          )
        );
      },

      effect: () => {
        return {
          type:
            "terminal-lines",

          lines: [
            "[archive] perfil do operador vinculado à sessão atual.",
          ],
        };
      },
    },

    {
      id:
        "maintenance-version-acknowledged",

      trigger:
        "terminal-command",

      once:
        true,

      condition: (
        context,
        snapshot,
      ) => {
        return (
          context.command ===
            "ver" &&
          snapshot.discoveredEvents.includes(
            "maintenance-record-discovered",
          )
        );
      },

      effect: () => {
        return {
          type:
            "terminal-lines",

          lines: [
            "[archive] metadados de manutenção disponíveis fora do índice padrão.",
          ],
        };
      },
    },
  ];