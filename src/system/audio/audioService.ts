import {
  audioManager,
} from "./audioManager";

import type {
  AudioCueId,
  PlayAudioOptions,
} from "./types";

const AUDIO_PRELOAD_GROUPS = {
  session: [
    "ui-keypress",
    "ui-error",
    "ui-folder-open",
    "ui-notification",
    "system-login",
    "system-shutdown",
    "system-recovery",
    "system-glitch",
  ],
} as const satisfies Record<
  string,
  readonly AudioCueId[]
>;

export type AudioPreloadGroup =
  keyof typeof AUDIO_PRELOAD_GROUPS;

export function playSound(
  cueId: AudioCueId,
  options?: PlayAudioOptions,
) {
  return audioManager.play(
    cueId,
    options,
  );
}

export function preloadAudioGroup(
  group: AudioPreloadGroup,
) {
  audioManager.preload(
    AUDIO_PRELOAD_GROUPS[
      group
    ],
  );
}

export function stopAllSounds() {
  audioManager.stopAll();
}