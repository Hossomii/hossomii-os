export type AudioChannel = "ui" | "system";

export type AudioCueId =
  | "ui-click"
  | "ui-hover"
  | "ui-error"
  | "ui-notification"
  | "system-startup"
  | "system-login"
  | "system-shutdown"
  | "system-recovery";

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
