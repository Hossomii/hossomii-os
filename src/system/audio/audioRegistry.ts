import type { AudioCueId, AudioDefinition } from "./types";

export const AUDIO_REGISTRY: Record<AudioCueId, AudioDefinition> = {
  "ui-click": {
    id: "ui-click",

    channel: "ui",

    src: null,

    volume: 0.45,
  },

  "ui-hover": {
    id: "ui-hover",

    channel: "ui",

    src: null,

    volume: 0.25,
  },

  "ui-error": {
    id: "ui-error",

    channel: "ui",

    src: null,

    volume: 0.6,
  },

  "ui-notification": {
    id: "ui-notification",

    channel: "ui",

    src: null,

    volume: 0.5,
  },

  "system-startup": {
    id: "system-startup",

    channel: "system",

    src: null,

    volume: 0.7,
  },

  "system-login": {
    id: "system-login",

    channel: "system",

    src: null,

    volume: 0.65,
  },

  "system-shutdown": {
    id: "system-shutdown",

    channel: "system",

    src: null,

    volume: 0.7,
  },

  "system-recovery": {
    id: "system-recovery",

    channel: "system",

    src: null,

    volume: 0.65,
  },
};
