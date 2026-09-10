import { create } from "zustand";

import type {
  OpenWindowConfig,
  OSWindow,
  WindowBounds,
} from "../types/window";

type WindowStore = {
  windows: OSWindow[];
  topZIndex: number;

  openWindow: (config: OpenWindowConfig) => void;

  closeWindow: (id: OSWindow["id"]) => void;

  minimizeWindow: (id: OSWindow["id"]) => void;

  restoreWindow: (id: OSWindow["id"]) => void;

  toggleMaximizeWindow: (id: OSWindow["id"]) => void;

  focusWindow: (id: OSWindow["id"]) => void;

  moveWindow: (
    id: OSWindow["id"],
    x: number,
    y: number
  ) => void;
};

const TASKBAR_HEIGHT = 38;

function getInitialWindowBounds(): WindowBounds {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const width = Math.min(
    760,
    viewportWidth - 32
  );

  const height = Math.min(
    520,
    viewportHeight - TASKBAR_HEIGHT - 32
  );

  return {
    x: Math.max(
      8,
      Math.round((viewportWidth - width) / 2)
    ),

    y: Math.max(
      8,
      Math.round(
        (viewportHeight - TASKBAR_HEIGHT - height) / 2
      )
    ),

    width,
    height,
  };
}

export const useWindowStore =
  create<WindowStore>((set) => ({
    windows: [],

    topZIndex: 100,

    openWindow: (config) => {
      set((state) => {
        const existingWindow =
          state.windows.find(
            (windowItem) =>
              windowItem.id === config.appId
          );

        const nextZIndex =
          state.topZIndex + 1;

        if (existingWindow) {
          return {
            topZIndex: nextZIndex,

            windows: state.windows.map(
              (windowItem) =>
                windowItem.id === config.appId
                  ? {
                      ...windowItem,

                      minimized: false,

                      zIndex: nextZIndex,
                    }
                  : windowItem
            ),
          };
        }

        const bounds =
          getInitialWindowBounds();

        const newWindow: OSWindow = {
          id: config.appId,
          appId: config.appId,

          title: config.title,
          icon: config.icon,

          ...bounds,

          minimized: false,
          maximized: false,

          zIndex: nextZIndex,

          restoreBounds: null,
        };

        return {
          windows: [
            ...state.windows,
            newWindow,
          ],

          topZIndex: nextZIndex,
        };
      });
    },

    closeWindow: (id) => {
      set((state) => ({
        windows: state.windows.filter(
          (windowItem) =>
            windowItem.id !== id
        ),
      }));
    },

    minimizeWindow: (id) => {
      set((state) => ({
        windows: state.windows.map(
          (windowItem) =>
            windowItem.id === id
              ? {
                  ...windowItem,
                  minimized: true,
                }
              : windowItem
        ),
      }));
    },

    restoreWindow: (id) => {
      set((state) => {
        const nextZIndex =
          state.topZIndex + 1;

        return {
          topZIndex: nextZIndex,

          windows: state.windows.map(
            (windowItem) =>
              windowItem.id === id
                ? {
                    ...windowItem,

                    minimized: false,

                    zIndex:
                      nextZIndex,
                  }
                : windowItem
          ),
        };
      });
    },

    focusWindow: (id) => {
      set((state) => {
        const nextZIndex =
          state.topZIndex + 1;

        return {
          topZIndex: nextZIndex,

          windows: state.windows.map(
            (windowItem) =>
              windowItem.id === id
                ? {
                    ...windowItem,

                    zIndex:
                      nextZIndex,
                  }
                : windowItem
          ),
        };
      });
    },

    moveWindow: (id, x, y) => {
      set((state) => ({
        windows: state.windows.map(
          (windowItem) =>
            windowItem.id === id &&
            !windowItem.maximized
              ? {
                  ...windowItem,
                  x,
                  y,
                }
              : windowItem
        ),
      }));
    },

    toggleMaximizeWindow: (id) => {
      set((state) => {
        const nextZIndex =
          state.topZIndex + 1;

        return {
          topZIndex: nextZIndex,

          windows: state.windows.map(
            (windowItem) => {
              if (windowItem.id !== id) {
                return windowItem;
              }

              if (windowItem.maximized) {
                const restoreBounds =
                  windowItem.restoreBounds;

                if (!restoreBounds) {
                  return windowItem;
                }

                return {
                  ...windowItem,

                  ...restoreBounds,

                  maximized: false,

                  restoreBounds: null,

                  zIndex: nextZIndex,
                };
              }

              const restoreBounds: WindowBounds = {
                x: windowItem.x,
                y: windowItem.y,
                width:
                  windowItem.width,
                height:
                  windowItem.height,
              };

              return {
                ...windowItem,

                x: 0,
                y: 0,

                width:
                  window.innerWidth,

                height:
                  window.innerHeight -
                  TASKBAR_HEIGHT,

                maximized: true,

                restoreBounds,

                zIndex: nextZIndex,
              };
            }
          ),
        };
      });
    },
  }));