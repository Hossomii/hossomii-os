import { create } from "zustand";

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
  theme: SystemTheme;

  wallpaper: WallpaperId;

  setTheme: (
    theme: SystemTheme
  ) => void;

  setWallpaper: (
    wallpaper: WallpaperId
  ) => void;

  resetPreferences:
    () => void;
};

const THEME_STORAGE_KEY =
  "hossomii-os-theme";

const WALLPAPER_STORAGE_KEY =
  "hossomii-os-wallpaper";

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

function getStoredTheme():
  SystemTheme {
  if (
    typeof window ===
    "undefined"
  ) {
    return "default";
  }

  const storedTheme =
    window.localStorage.getItem(
      THEME_STORAGE_KEY
    );

  if (
    VALID_THEMES.includes(
      storedTheme as SystemTheme
    )
  ) {
    return (
      storedTheme as SystemTheme
    );
  }

  return "default";
}

function getStoredWallpaper():
  WallpaperId {
  if (
    typeof window ===
    "undefined"
  ) {
    return "default";
  }

  const storedWallpaper =
    window.localStorage.getItem(
      WALLPAPER_STORAGE_KEY
    );

  if (
    VALID_WALLPAPERS.includes(
      storedWallpaper as WallpaperId
    )
  ) {
    return (
      storedWallpaper as WallpaperId
    );
  }

  return "default";
}

export const useSystemPreferencesStore =
  create<SystemPreferencesStore>(
    (set) => ({
      theme:
        getStoredTheme(),

      wallpaper:
        getStoredWallpaper(),

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

      resetPreferences:
        () => {
          window.localStorage.removeItem(
            THEME_STORAGE_KEY
          );

          window.localStorage.removeItem(
            WALLPAPER_STORAGE_KEY
          );

          set({
            theme:
              "default",

            wallpaper:
              "default",
          });
        },
    })
  );