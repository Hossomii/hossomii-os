import { AUDIO_REGISTRY } from "./audioRegistry";

import type { AudioCueId, PlayAudioOptions } from "./types";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

class AudioManager {
  private muted = false;

  private masterVolume = 1;

  private templates = new Map<AudioCueId, HTMLAudioElement>();

  private activeAudio = new Map<HTMLAudioElement, number>();

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

    for (const [audio, localVolume] of this.activeAudio) {
      audio.volume = this.calculateVolume(localVolume);
    }
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  preload(cueIds: AudioCueId[] = Object.keys(AUDIO_REGISTRY) as AudioCueId[]) {
    if (typeof Audio === "undefined") {
      return;
    }

    for (const cueId of cueIds) {
      this.getTemplate(cueId);
    }
  }

  async play(cueId: AudioCueId, options: PlayAudioOptions = {}) {
    if (typeof Audio === "undefined") {
      return false;
    }

    const definition = AUDIO_REGISTRY[cueId];

    if (!definition.src) {
      return false;
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

    this.activeAudio.set(audio, localVolume);

    const cleanup = () => {
      this.activeAudio.delete(audio);

      audio.removeEventListener("ended", cleanup);

      audio.removeEventListener("error", cleanup);
    };

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
    for (const audio of this.activeAudio.keys()) {
      audio.pause();

      audio.currentTime = 0;
    }

    this.activeAudio.clear();
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
