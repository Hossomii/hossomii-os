import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { useWindowStore } from "../../stores/windowStore";

import type { OSWindow } from "../../types/window";

type WindowFrameProps = {
  windowItem: OSWindow;
  children: ReactNode;
};

type DragState = {
  active: boolean;

  offsetX: number;
  offsetY: number;
};

export function WindowFrame({
  windowItem,
  children,
}: WindowFrameProps) {
  const focusWindow = useWindowStore(
    (state) => state.focusWindow
  );

  const closeWindow = useWindowStore(
    (state) => state.closeWindow
  );

  const minimizeWindow = useWindowStore(
    (state) => state.minimizeWindow
  );

  const toggleMaximizeWindow =
    useWindowStore(
      (state) =>
        state.toggleMaximizeWindow
    );

  const moveWindow = useWindowStore(
    (state) => state.moveWindow
  );

  const dragState = useRef<DragState>({
    active: false,

    offsetX: 0,
    offsetY: 0,
  });

  function handleTitlePointerDown(
    event: ReactPointerEvent<HTMLElement>
  ) {
    if (
      event.button !== 0 ||
      windowItem.maximized
    ) {
      return;
    }

    focusWindow(windowItem.id);

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
    event: ReactPointerEvent<HTMLElement>
  ) {
    if (!dragState.current.active) {
      return;
    }

    const maxX =
      window.innerWidth -
      windowItem.width;

    const maxY =
      window.innerHeight -
      38 -
      30;

    const nextX = Math.max(
      0,
      Math.min(
        event.clientX -
          dragState.current.offsetX,

        maxX
      )
    );

    const nextY = Math.max(
      0,
      Math.min(
        event.clientY -
          dragState.current.offsetY,

        maxY
      )
    );

    moveWindow(
      windowItem.id,
      nextX,
      nextY
    );
  }

  function handleTitlePointerUp(
    event: ReactPointerEvent<HTMLElement>
  ) {
    dragState.current.active = false;

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

  if (windowItem.minimized) {
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
        left: windowItem.x,
        top: windowItem.y,

        width: windowItem.width,
        height: windowItem.height,

        zIndex: windowItem.zIndex,
      }}
      onPointerDown={() =>
        focusWindow(windowItem.id)
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
        onDoubleClick={() =>
          toggleMaximizeWindow(
            windowItem.id
          )
        }
      >
        <div className="window-title">
          <img
            src={windowItem.icon}
            alt=""
            draggable={false}
          />

          <span>
            {windowItem.title}
          </span>
        </div>

        <div
          className="window-controls"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
        >
          <button
            type="button"
            aria-label="Minimizar"
            onClick={(event) => {
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
            onClick={(event) => {
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
            onClick={(event) => {
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
    </section>
  );
}