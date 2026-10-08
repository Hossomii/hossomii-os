import { AUDIO_REGISTRY } from "./audioRegistry";

import type { AudioCueId, PlayAudioOptions } from "./types";

type ActiveAudio = {
  cueId: AudioCueId;

  localVolume: number;

  cleanup: () => void;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export class AudioManager {
  private muted = false;

  private masterVolume = 1;

  private templates = new Map<AudioCueId, HTMLAudioElement>();

  private activeAudio = new Map<HTMLAudioElement, ActiveAudio>();

  setMuted(muted: boolean) {
    this.muted = muted;

    for (const audio of this.activeAudio.keys()) {
      audio.muted = muted;
    }
  }

  isMuted() {
    return this.muted;
  }

  setMasterVolume(volume: number) {
    this.masterVolume = clamp(volume, 0, 1);

    for (const [audio, active] of this.activeAudio) {
      audio.volume = this.calculateVolume(active.localVolume);
    }
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  preload(
    cueIds: readonly AudioCueId[] = Object.keys(AUDIO_REGISTRY) as AudioCueId[],
  ) {
    if (typeof Audio === "undefined") {
      return;
    }

    for (const cueId of cueIds) {
      this.getTemplate(cueId);
    }
  }

  async play(cueId: AudioCueId, options: PlayAudioOptions = {}) {
    if (typeof Audio === "undefined" || this.muted || this.masterVolume <= 0) {
      return false;
    }

    const definition = AUDIO_REGISTRY[cueId];

    if (!definition.src) {
      return false;
    }

    const activeForCue = this.getActiveAudioForCue(cueId);

    const playbackMode = definition.playbackMode ?? "overlap";

    if (playbackMode === "ignore" && activeForCue.length > 0) {
      return false;
    }

    if (playbackMode === "restart") {
      for (const audio of activeForCue) {
        this.stopAudio(audio);
      }
    }

    if (playbackMode === "overlap") {
      const maxVoices = Math.max(
        1,
        Math.floor(definition.maxVoices ?? Number.POSITIVE_INFINITY),
      );

      while (activeForCue.length >= maxVoices) {
        const oldestAudio = activeForCue.shift();

        if (!oldestAudio) {
          break;
        }

        this.stopAudio(oldestAudio);
      }
    }

    const template = this.getTemplate(cueId);

    if (!template) {
      return false;
    }

    const audio = template.cloneNode(true) as HTMLAudioElement;

    const requestedVolume = clamp(options.volume ?? 1, 0, 1);

    const localVolume = clamp(definition.volume * requestedVolume, 0, 1);

    audio.volume = this.calculateVolume(localVolume);

    audio.muted = this.muted;

    audio.playbackRate = clamp(options.playbackRate ?? 1, 0.5, 2);

    const cleanup = () => {
      this.activeAudio.delete(audio);

      audio.removeEventListener("ended", cleanup);

      audio.removeEventListener("error", cleanup);
    };

    this.activeAudio.set(audio, {
      cueId,

      localVolume,

      cleanup,
    });

    audio.addEventListener("ended", cleanup);

    audio.addEventListener("error", cleanup);

    try {
      await audio.play();

      return true;
    } catch {
      cleanup();

      return false;
    }
  }

  stopAll() {
    const active = Array.from(this.activeAudio.keys());

    for (const audio of active) {
      this.stopAudio(audio);
    }
  }

  private stopAudio(audio: HTMLAudioElement) {
    const active = this.activeAudio.get(audio);

    audio.pause();

    audio.currentTime = 0;

    active?.cleanup();
  }

  private getActiveAudioForCue(cueId: AudioCueId) {
    const result: HTMLAudioElement[] = [];

    for (const [audio, active] of this.activeAudio) {
      if (active.cueId === cueId) {
        result.push(audio);
      }
    }

    return result;
  }

  private getTemplate(cueId: AudioCueId) {
    const existing = this.templates.get(cueId);

    if (existing) {
      return existing;
    }

    const definition = AUDIO_REGISTRY[cueId];

    if (!definition.src || typeof Audio === "undefined") {
      return null;
    }

    const audio = new Audio(definition.src);

    audio.preload = "auto";

    this.templates.set(cueId, audio);

    return audio;
  }

  private calculateVolume(localVolume: number) {
    return clamp(localVolume * this.masterVolume, 0, 1);
  }
}

export const audioManager = new AudioManager();
