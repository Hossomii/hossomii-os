export type AudioChannel =
  | "ui"
  | "system";

export type AudioPlaybackMode =
  | "overlap"
  | "restart"
  | "ignore";

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

  playbackMode?: AudioPlaybackMode;

  maxVoices?: number;
};

export type PlayAudioOptions = {
  volume?: number;

  playbackRate?: number;
};

// overlap = pode tocar várias instâncias simultaneamente

// restart = se já estiver tocando, interrompe e começa novamente

// ignore = se já estiver tocando, ignora o novo pedido