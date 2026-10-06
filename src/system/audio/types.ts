export type AudioChannel =
  | "ui"
  | "system";

export type AudioCueId =
  | "ui-click"
  | "ui-hover"
  | "ui-keypress"
  | "ui-error"
  | "ui-notification"
  | "ui-folder-open"
  | "system-startup"
  | "system-login"
  | "system-shutdown"
  | "system-recovery"
  | "system-glitch";

export type AudioDefinition = {
  id: AudioCueId;

  channel: AudioChannel;

  src: string | null;

  volume: number;
};

export type PlayAudioOptions = {
  volume?: number;

  playbackRate?: number;
};