import startupSound from "../../assets/audio/system/startup.mp3";
import loginSound from "../../assets/audio/system/login.mp3";
import shutdownSound from "../../assets/audio/system/shutdown.mp3";
import recoverySound from "../../assets/audio/system/recovery.mp3";
import glitchSound from "../../assets/audio/system/glitch.mp3";

import keypressSound from "../../assets/audio/ui/keypress.mp3";
import errorSound from "../../assets/audio/ui/error.mp3";
import folderOpenSound from "../../assets/audio/ui/folder-open.mp3";

import type {
  AudioCueId,
  AudioDefinition,
} from "./types";

export const AUDIO_REGISTRY: Record<
  AudioCueId,
  AudioDefinition
> = {
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

  "ui-keypress": {
    id: "ui-keypress",
    channel: "ui",
    src: keypressSound,
    volume: 0.22,
  },

  "ui-error": {
    id: "ui-error",
    channel: "ui",
    src: errorSound,
    volume: 0.55,
  },

  "ui-notification": {
    id: "ui-notification",
    channel: "ui",
    src: null,
    volume: 0.5,
  },

  "ui-folder-open": {
    id: "ui-folder-open",
    channel: "ui",
    src: folderOpenSound,
    volume: 0.35,
  },

  "system-startup": {
    id: "system-startup",
    channel: "system",
    src: startupSound,
    volume: 0.7,
  },

  "system-login": {
    id: "system-login",
    channel: "system",
    src: loginSound,
    volume: 0.65,
  },

  "system-shutdown": {
    id: "system-shutdown",
    channel: "system",
    src: shutdownSound,
    volume: 0.7,
  },

  "system-recovery": {
    id: "system-recovery",
    channel: "system",
    src: recoverySound,
    volume: 0.65,
  },

  "system-glitch": {
    id: "system-glitch",
    channel: "system",
    src: glitchSound,
    volume: 0.6,
  },
};