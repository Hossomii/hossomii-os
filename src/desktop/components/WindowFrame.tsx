import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import {
  useWindowStore,
} from "../../stores/windowStore";

import type {
  OSWindow,
  WindowBounds,
  WindowResizeDirection,
} from "../../types/window";

type WindowFrameProps = {
  windowItem: OSWindow;

  children: ReactNode;
};

type DragState = {
  active: boolean;

  offsetX: number;
  offsetY: number;
};

type ResizeState = {
  active: boolean;

  direction:
    WindowResizeDirection | null;

  pointerId: number | null;

  startX: number;
  startY: number;

  startBounds:
    WindowBounds;
};

const RESIZE_DIRECTIONS:
  WindowResizeDirection[] = [
    "n",
    "ne",
    "e",
    "se",
    "s",
    "sw",
    "w",
    "nw",
  ];

export function WindowFrame({
  windowItem,
  children,
}: WindowFrameProps) {
  const focusWindow =
    useWindowStore(
      (state) =>
        state.focusWindow
    );

  const closeWindow =
    useWindowStore(
      (state) =>
        state.closeWindow
    );

  const minimizeWindow =
    useWindowStore(
      (state) =>
        state.minimizeWindow
    );

  const toggleMaximizeWindow =
    useWindowStore(
      (state) =>
        state.toggleMaximizeWindow
    );

  const moveWindow =
    useWindowStore(
      (state) =>
        state.moveWindow
    );

  const resizeWindow =
    useWindowStore(
      (state) =>
        state.resizeWindow
    );

  const dragState =
    useRef<DragState>({
      active: false,

      offsetX: 0,
      offsetY: 0,
    });

  const resizeState =
    useRef<ResizeState>({
      active: false,

      direction: null,

      pointerId: null,

      startX: 0,
      startY: 0,

      startBounds: {
        x: 0,
        y: 0,

        width: 0,
        height: 0,
      },
    });

  function handleTitlePointerDown(
    event:
      ReactPointerEvent<HTMLElement>
  ) {
    if (
      event.button !== 0 ||
      windowItem.maximized
    ) {
      return;
    }

    focusWindow(
      windowItem.id
    );

    dragState.current = {
      active: true,

      offsetX:
        event.clientX -
        windowItem.x,

      offsetY:
        event.clientY -
        windowItem.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function handleTitlePointerMove(
    event:
      ReactPointerEvent<HTMLElement>
  ) {
    if (
      !dragState.current.active
    ) {
      return;
    }

    const nextX =
      event.clientX -
      dragState.current.offsetX;

    const nextY =
      event.clientY -
      dragState.current.offsetY;

    moveWindow(
      windowItem.id,
      nextX,
      nextY
    );
  }

  function handleTitlePointerUp(
    event:
      ReactPointerEvent<HTMLElement>
  ) {
    dragState.current.active =
      false;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  }

  function handleResizePointerDown(
    direction:
      WindowResizeDirection,
    event:
      ReactPointerEvent<HTMLSpanElement>
  ) {
    if (
      event.button !== 0 ||
      windowItem.maximized
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    focusWindow(
      windowItem.id
    );

    resizeState.current = {
      active: true,

      direction,

      pointerId:
        event.pointerId,

      startX:
        event.clientX,

      startY:
        event.clientY,

      startBounds: {
        x:
          windowItem.x,

        y:
          windowItem.y,

        width:
          windowItem.width,

        height:
          windowItem.height,
      },
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function handleResizePointerMove(
    event:
      ReactPointerEvent<HTMLSpanElement>
  ) {
    const state =
      resizeState.current;

    if (
      !state.active ||
      !state.direction
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      state.startX;

    const deltaY =
      event.clientY -
      state.startY;

    const nextBounds:
      WindowBounds = {
        ...state.startBounds,
      };

    if (
      state.direction.includes(
        "e"
      )
    ) {
      nextBounds.width =
        state.startBounds.width +
        deltaX;
    }

    if (
      state.direction.includes(
        "s"
      )
    ) {
      nextBounds.height =
        state.startBounds.height +
        deltaY;
    }

    if (
      state.direction.includes(
        "w"
      )
    ) {
      nextBounds.x =
        state.startBounds.x +
        deltaX;

      nextBounds.width =
        state.startBounds.width -
        deltaX;
    }

    if (
      state.direction.includes(
        "n"
      )
    ) {
      nextBounds.y =
        state.startBounds.y +
        deltaY;

      nextBounds.height =
        state.startBounds.height -
        deltaY;
    }

    resizeWindow(
      windowItem.id,
      nextBounds
    );
  }

  function handleResizePointerUp(
    event:
      ReactPointerEvent<HTMLSpanElement>
  ) {
    resizeState.current.active =
      false;

    resizeState.current.direction =
      null;

    resizeState.current.pointerId =
      null;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  }

  if (
    windowItem.minimized
  ) {
    return null;
  }

  return (
    <section
      className={`os-window ${
        windowItem.maximized
          ? "os-window-maximized"
          : ""
      }`}
      style={{
        left:
          windowItem.x,

        top:
          windowItem.y,

        width:
          windowItem.width,

        height:
          windowItem.height,

        zIndex:
          windowItem.zIndex,
      }}
      onPointerDown={() =>
        focusWindow(
          windowItem.id
        )
      }
    >
      <header
        className="window-titlebar"
        onPointerDown={
          handleTitlePointerDown
        }
        onPointerMove={
          handleTitlePointerMove
        }
        onPointerUp={
          handleTitlePointerUp
        }
        onPointerCancel={
          handleTitlePointerUp
        }
        onDoubleClick={() =>
          toggleMaximizeWindow(
            windowItem.id
          )
        }
      >
        <div className="window-title">
          <img
            src={
              windowItem.icon
            }
            alt=""
            draggable={false}
          />

          <span>
            {
              windowItem.title
            }
          </span>
        </div>

        <div
          className="window-controls"
          onPointerDown={(
            event
          ) =>
            event.stopPropagation()
          }
        >
          <button
            type="button"
            aria-label="Minimizar"
            onClick={(
              event
            ) => {
              event.stopPropagation();

              minimizeWindow(
                windowItem.id
              );
            }}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              windowItem.maximized
                ? "Restaurar"
                : "Maximizar"
            }
            onClick={(
              event
            ) => {
              event.stopPropagation();

              toggleMaximizeWindow(
                windowItem.id
              );
            }}
          >
            {windowItem.maximized
              ? "❐"
              : "□"}
          </button>

          <button
            className="window-close-button"
            type="button"
            aria-label="Fechar"
            onClick={(
              event
            ) => {
              event.stopPropagation();

              closeWindow(
                windowItem.id
              );
            }}
          >
            ×
          </button>
        </div>
      </header>

      <div className="window-body">
        {children}
      </div>

      {!windowItem.maximized &&
        RESIZE_DIRECTIONS.map(
          (
            direction
          ) => (
            <span
              key={
                direction
              }
              className={`window-resize-handle window-resize-${direction}`}
              aria-hidden="true"
              onPointerDown={(
                event
              ) =>
                handleResizePointerDown(
                  direction,
                  event
                )
              }
              onPointerMove={
                handleResizePointerMove
              }
              onPointerUp={
                handleResizePointerUp
              }
              onPointerCancel={
                handleResizePointerUp
              }
            />
          )
        )}
    </section>
  );
}