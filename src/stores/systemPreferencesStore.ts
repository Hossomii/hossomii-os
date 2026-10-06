import {
  create,
} from "zustand";

import {
  audioManager,
} from "../system/audio/audioManager";

export type SystemTheme =
  | "default"
  | "dark"
  | "high-contrast";

export type WallpaperId =
  | "default"
  | "wallpaper-01"
  | "wallpaper-02"
  | "wallpaper-03"
  | "wallpaper-04"
  | "wallpaper-05";

type SystemPreferencesStore = {
  theme:
    SystemTheme;

  wallpaper:
    WallpaperId;

  audioMuted:
    boolean;

  audioVolume:
    number;

  setTheme: (
    theme:
      SystemTheme
  ) => void;

  setWallpaper: (
    wallpaper:
      WallpaperId
  ) => void;

  setAudioMuted: (
    muted:
      boolean
  ) => void;

  setAudioVolume: (
    volume:
      number
  ) => void;

  resetPreferences:
    () => void;
};

const THEME_STORAGE_KEY =
  "hossomii-os-theme";

const WALLPAPER_STORAGE_KEY =
  "hossomii-os-wallpaper";

const AUDIO_MUTED_STORAGE_KEY =
  "hossomii-os-audio-muted";

const AUDIO_VOLUME_STORAGE_KEY =
  "hossomii-os-audio-volume";

const DEFAULT_THEME:
  SystemTheme =
    "default";

const DEFAULT_WALLPAPER:
  WallpaperId =
    "wallpaper-01";

const DEFAULT_AUDIO_MUTED =
  false;

const DEFAULT_AUDIO_VOLUME =
  0.7;

const VALID_THEMES:
  SystemTheme[] = [
    "default",
    "dark",
    "high-contrast",
  ];

const VALID_WALLPAPERS:
  WallpaperId[] = [
    "default",
    "wallpaper-01",
    "wallpaper-02",
    "wallpaper-03",
    "wallpaper-04",
    "wallpaper-05",
  ];

function clamp(
  value: number,
  minimum: number,
  maximum: number
) {
  return Math.min(
    Math.max(
      value,
      minimum
    ),
    maximum
  );
}

function getStoredTheme():
  SystemTheme {
  if (
    typeof window ===
    "undefined"
  ) {
    return DEFAULT_THEME;
  }

  const storedTheme =
    window.localStorage.getItem(
      THEME_STORAGE_KEY
    );

  if (
    VALID_THEMES.includes(
      storedTheme as
        SystemTheme
    )
  ) {
    return (
      storedTheme as
        SystemTheme
    );
  }

  return DEFAULT_THEME;
}

function getStoredWallpaper():
  WallpaperId {
  if (
    typeof window ===
    "undefined"
  ) {
    return DEFAULT_WALLPAPER;
  }

  const storedWallpaper =
    window.localStorage.getItem(
      WALLPAPER_STORAGE_KEY
    );

  if (
    VALID_WALLPAPERS.includes(
      storedWallpaper as
        WallpaperId
    )
  ) {
    return (
      storedWallpaper as
        WallpaperId
    );
  }

  return DEFAULT_WALLPAPER;
}

function getStoredAudioMuted() {
  if (
    typeof window ===
    "undefined"
  ) {
    return (
      DEFAULT_AUDIO_MUTED
    );
  }

  const storedValue =
    window.localStorage.getItem(
      AUDIO_MUTED_STORAGE_KEY
    );

  if (
    storedValue ===
    "true"
  ) {
    return true;
  }

  if (
    storedValue ===
    "false"
  ) {
    return false;
  }

  return (
    DEFAULT_AUDIO_MUTED
  );
}

function getStoredAudioVolume() {
  if (
    typeof window ===
    "undefined"
  ) {
    return (
      DEFAULT_AUDIO_VOLUME
    );
  }

  const storedValue =
    window.localStorage.getItem(
      AUDIO_VOLUME_STORAGE_KEY
    );

  if (
    storedValue ===
    null
  ) {
    return (
      DEFAULT_AUDIO_VOLUME
    );
  }

  const parsedValue =
    Number.parseFloat(
      storedValue
    );

  if (
    Number.isNaN(
      parsedValue
    )
  ) {
    return (
      DEFAULT_AUDIO_VOLUME
    );
  }

  return clamp(
    parsedValue,
    0,
    1
  );
}

const initialTheme =
  getStoredTheme();

const initialWallpaper =
  getStoredWallpaper();

const initialAudioMuted =
  getStoredAudioMuted();

const initialAudioVolume =
  getStoredAudioVolume();

audioManager.setMuted(
  initialAudioMuted
);

audioManager.setMasterVolume(
  initialAudioVolume
);

export const useSystemPreferencesStore =
  create<SystemPreferencesStore>(
    (
      set
    ) => ({
      theme:
        initialTheme,

      wallpaper:
        initialWallpaper,

      audioMuted:
        initialAudioMuted,

      audioVolume:
        initialAudioVolume,

      setTheme: (
        theme
      ) => {
        window.localStorage.setItem(
          THEME_STORAGE_KEY,
          theme
        );

        set({
          theme,
        });
      },

      setWallpaper: (
        wallpaper
      ) => {
        window.localStorage.setItem(
          WALLPAPER_STORAGE_KEY,
          wallpaper
        );

        set({
          wallpaper,
        });
      },

      setAudioMuted: (
        muted
      ) => {
        window.localStorage.setItem(
          AUDIO_MUTED_STORAGE_KEY,
          String(
            muted
          )
        );

        audioManager.setMuted(
          muted
        );

        set({
          audioMuted:
            muted,
        });
      },

      setAudioVolume: (
        volume
      ) => {
        const nextVolume =
          clamp(
            volume,
            0,
            1
          );

        window.localStorage.setItem(
          AUDIO_VOLUME_STORAGE_KEY,
          String(
            nextVolume
          )
        );

        audioManager.setMasterVolume(
          nextVolume
        );

        set({
          audioVolume:
            nextVolume,
        });
      },

      resetPreferences:
        () => {
          window.localStorage.removeItem(
            THEME_STORAGE_KEY
          );

          window.localStorage.removeItem(
            WALLPAPER_STORAGE_KEY
          );

          window.localStorage.removeItem(
            AUDIO_MUTED_STORAGE_KEY
          );

          window.localStorage.removeItem(
            AUDIO_VOLUME_STORAGE_KEY
          );

          audioManager.setMuted(
            DEFAULT_AUDIO_MUTED
          );

          audioManager.setMasterVolume(
            DEFAULT_AUDIO_VOLUME
          );

          set({
            theme:
              DEFAULT_THEME,

            wallpaper:
              DEFAULT_WALLPAPER,

            audioMuted:
              DEFAULT_AUDIO_MUTED,

            audioVolume:
              DEFAULT_AUDIO_VOLUME,
          });
        },
    })
  );