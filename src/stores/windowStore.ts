import { create } from "zustand";

import type {
  OpenWindowConfig,
  OSWindow,
  WindowBounds,
} from "../types/window";

type WindowStore = {
  windows: OSWindow[];

  topZIndex: number;

  openWindow: (
    config: OpenWindowConfig
  ) => void;

  closeWindow: (
    id: OSWindow["id"]
  ) => void;

  minimizeWindow: (
    id: OSWindow["id"]
  ) => void;

  restoreWindow: (
    id: OSWindow["id"]
  ) => void;

  toggleMaximizeWindow: (
    id: OSWindow["id"]
  ) => void;

  focusWindow: (
    id: OSWindow["id"]
  ) => void;

  moveWindow: (
    id: OSWindow["id"],
    x: number,
    y: number
  ) => void;

  resizeWindow: (
    id: OSWindow["id"],
    bounds: WindowBounds
  ) => void;

  fitWindowsToViewport:
    () => void;

  resetWindows:
    () => void;
};

const DEFAULT_TASKBAR_HEIGHT =
  38;

const MIN_WINDOW_WIDTH =
  340;

const MIN_WINDOW_HEIGHT =
  220;

const WINDOW_MARGIN =
  8;

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

function getTaskbarHeight() {
  if (
    typeof document ===
    "undefined"
  ) {
    return (
      DEFAULT_TASKBAR_HEIGHT
    );
  }

  const rawValue =
    getComputedStyle(
      document.documentElement
    ).getPropertyValue(
      "--taskbar-height"
    );

  const parsedValue =
    Number.parseFloat(
      rawValue
    );

  if (
    Number.isNaN(
      parsedValue
    )
  ) {
    return (
      DEFAULT_TASKBAR_HEIGHT
    );
  }

  return parsedValue;
}

function getWorkspaceSize() {
  const width =
    Math.max(
      0,
      window.innerWidth
    );

  const height =
    Math.max(
      0,
      window.innerHeight -
        getTaskbarHeight()
    );

  return {
    width,
    height,
  };
}

function constrainWindowBounds(
  bounds: WindowBounds
): WindowBounds {
  const workspace =
    getWorkspaceSize();

  const availableWidth =
    Math.max(
      1,
      workspace.width
    );

  const availableHeight =
    Math.max(
      1,
      workspace.height
    );

  const minimumWidth =
    Math.min(
      MIN_WINDOW_WIDTH,
      availableWidth
    );

  const minimumHeight =
    Math.min(
      MIN_WINDOW_HEIGHT,
      availableHeight
    );

  const width =
    clamp(
      bounds.width,
      minimumWidth,
      availableWidth
    );

  const height =
    clamp(
      bounds.height,
      minimumHeight,
      availableHeight
    );

  const maxX =
    Math.max(
      0,
      availableWidth -
        width
    );

  const maxY =
    Math.max(
      0,
      availableHeight -
        height
    );

  return {
    x: clamp(
      bounds.x,
      0,
      maxX
    ),

    y: clamp(
      bounds.y,
      0,
      maxY
    ),

    width,
    height,
  };
}

function getInitialWindowBounds():
  WindowBounds {
  const workspace =
    getWorkspaceSize();

  const width =
    Math.min(
      760,
      Math.max(
        1,
        workspace.width -
          WINDOW_MARGIN * 4
      )
    );

  const height =
    Math.min(
      520,
      Math.max(
        1,
        workspace.height -
          WINDOW_MARGIN * 4
      )
    );

  return constrainWindowBounds({
    x:
      Math.round(
        (
          workspace.width -
          width
        ) / 2
      ),

    y:
      Math.round(
        (
          workspace.height -
          height
        ) / 2
      ),

    width,
    height,
  });
}

export const useWindowStore =
  create<WindowStore>(
    (set, get) => ({
      windows: [],

      topZIndex: 100,

      openWindow: (
        config
      ) => {
        const windowId =
          config.instanceId
            ? `${config.appId}:${config.instanceId}`
            : config.appId;

        const existingWindow =
          get().windows.find(
            (
              windowItem
            ) =>
              windowItem.id ===
              windowId
          );

        const nextZIndex =
          get().topZIndex +
          1;

        if (
          existingWindow
        ) {
          set((state) => ({
            topZIndex:
              nextZIndex,

            windows:
              state.windows.map(
                (
                  windowItem
                ) => {
                  if (
                    windowItem.id !==
                    windowId
                  ) {
                    return (
                      windowItem
                    );
                  }

                  return {
                    ...windowItem,

                    title:
                      config.title,

                    icon:
                      config.icon,

                    data:
                      config.data ??
                      windowItem.data,

                    minimized:
                      false,

                    zIndex:
                      nextZIndex,
                  };
                }
              ),
          }));

          return;
        }

        const bounds =
          getInitialWindowBounds();

        set((state) => ({
          topZIndex:
            nextZIndex,

          windows: [
            ...state.windows,

            {
              id: windowId,

              appId:
                config.appId,

              title:
                config.title,

              icon:
                config.icon,

              x:
                bounds.x,

              y:
                bounds.y,

              width:
                bounds.width,

              height:
                bounds.height,

              minimized:
                false,

              maximized:
                false,

              zIndex:
                nextZIndex,

              restoreBounds:
                null,

              data:
                config.data,
            },
          ],
        }));
      },

      closeWindow: (
        id
      ) => {
        set((state) => ({
          windows:
            state.windows.filter(
              (
                windowItem
              ) =>
                windowItem.id !==
                id
            ),
        }));
      },

      minimizeWindow: (
        id
      ) => {
        set((state) => ({
          windows:
            state.windows.map(
              (
                windowItem
              ) =>
                windowItem.id ===
                id
                  ? {
                      ...windowItem,

                      minimized:
                        true,
                    }
                  : windowItem
            ),
        }));
      },

      restoreWindow: (
        id
      ) => {
        set((state) => {
          const nextZIndex =
            state.topZIndex +
            1;

          return {
            topZIndex:
              nextZIndex,

            windows:
              state.windows.map(
                (
                  windowItem
                ) =>
                  windowItem.id ===
                  id
                    ? {
                        ...windowItem,

                        minimized:
                          false,

                        zIndex:
                          nextZIndex,
                      }
                    : windowItem
              ),
          };
        });
      },

      focusWindow: (
        id
      ) => {
        set((state) => {
          const nextZIndex =
            state.topZIndex +
            1;

          return {
            topZIndex:
              nextZIndex,

            windows:
              state.windows.map(
                (
                  windowItem
                ) =>
                  windowItem.id ===
                  id
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

      moveWindow: (
        id,
        x,
        y
      ) => {
        set((state) => ({
          windows:
            state.windows.map(
              (
                windowItem
              ) => {
                if (
                  windowItem.id !==
                    id ||
                  windowItem.maximized
                ) {
                  return (
                    windowItem
                  );
                }

                const bounds =
                  constrainWindowBounds(
                    {
                      x,
                      y,

                      width:
                        windowItem.width,

                      height:
                        windowItem.height,
                    }
                  );

                return {
                  ...windowItem,

                  x:
                    bounds.x,

                  y:
                    bounds.y,
                };
              }
            ),
        }));
      },

      resizeWindow: (
        id,
        bounds
      ) => {
        set((state) => ({
          windows:
            state.windows.map(
              (
                windowItem
              ) => {
                if (
                  windowItem.id !==
                    id ||
                  windowItem.maximized
                ) {
                  return (
                    windowItem
                  );
                }

                const nextBounds =
                  constrainWindowBounds(
                    bounds
                  );

                return {
                  ...windowItem,

                  ...nextBounds,
                };
              }
            ),
        }));
      },

      fitWindowsToViewport:
        () => {
          set((state) => {
            const workspace =
              getWorkspaceSize();

            return {
              windows:
                state.windows.map(
                  (
                    windowItem
                  ) => {
                    if (
                      windowItem.maximized
                    ) {
                      const restoreBounds =
                        windowItem.restoreBounds
                          ? constrainWindowBounds(
                              windowItem.restoreBounds
                            )
                          : null;

                      return {
                        ...windowItem,

                        x: 0,
                        y: 0,

                        width:
                          workspace.width,

                        height:
                          workspace.height,

                        restoreBounds,
                      };
                    }

                    return {
                      ...windowItem,

                      ...constrainWindowBounds(
                        {
                          x:
                            windowItem.x,

                          y:
                            windowItem.y,

                          width:
                            windowItem.width,

                          height:
                            windowItem.height,
                        }
                      ),
                    };
                  }
                ),
            };
          });
        },

      resetWindows: () => {
        set({
          windows: [],
          topZIndex: 100,
        });
      },

      toggleMaximizeWindow:
        (id) => {
          set((state) => {
            const nextZIndex =
              state.topZIndex +
              1;

            const workspace =
              getWorkspaceSize();

            return {
              topZIndex:
                nextZIndex,

              windows:
                state.windows.map(
                  (
                    windowItem
                  ) => {
                    if (
                      windowItem.id !==
                      id
                    ) {
                      return (
                        windowItem
                      );
                    }

                    if (
                      windowItem.maximized
                    ) {
                      const restoreBounds =
                        windowItem.restoreBounds;

                      if (
                        !restoreBounds
                      ) {
                        return (
                          windowItem
                        );
                      }

                      return {
                        ...windowItem,

                        ...constrainWindowBounds(
                          restoreBounds
                        ),

                        maximized:
                          false,

                        restoreBounds:
                          null,

                        zIndex:
                          nextZIndex,
                      };
                    }

                    const restoreBounds:
                      WindowBounds =
                        {
                          x:
                            windowItem.x,

                          y:
                            windowItem.y,

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
                        workspace.width,

                      height:
                        workspace.height,

                      maximized:
                        true,

                      restoreBounds,

                      zIndex:
                        nextZIndex,
                    };
                  }
                ),
            };
          });
        },
    })
  );