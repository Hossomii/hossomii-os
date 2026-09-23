import {
  useEffect,
  useState,
} from "react";

import type {
  OSWindow,
} from "../../types/window";

import profileAvatar from "../../assets/profile-avatar.webp";

type TaskbarProps = {
  startMenuOpen:
    boolean;

  windows:
    OSWindow[];

  activeWindowId:
    OSWindow["id"] | null;

  onStartToggle:
    () => void;

  onWindowClick: (
    id: OSWindow["id"]
  ) => void;
};

export function Taskbar({
  startMenuOpen,
  windows,
  activeWindowId,
  onStartToggle,
  onWindowClick,
}: TaskbarProps) {
  const [
    currentTime,
    setCurrentTime,
  ] =
    useState(
      new Date()
    );

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setCurrentTime(
            new Date()
          );
        },
        1000
      );

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, []);

  const formattedTime =
    new Intl.DateTimeFormat(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(
      currentTime
    );

  const formattedDate =
    new Intl.DateTimeFormat(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ).format(
      currentTime
    );

  return (
    <footer className="taskbar">
      <button
        type="button"
        className={[
          "start-button",

          startMenuOpen
            ? "start-button-active"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={
          startMenuOpen
        }
        aria-controls="hossomii-start-menu"
        onClick={(event) => {
          /*
           * Important:
           * prevents Desktop's click
           * handler from immediately
           * closing the menu.
           */
          event.stopPropagation();

          onStartToggle();
        }}
      >
        <img
          src={
            profileAvatar
          }
          alt=""
          className="start-button-avatar"
        />

        <span>
          Iniciar
        </span>
      </button>

      <div className="taskbar-applications">
        {windows.map(
          (
            windowItem
          ) => {
            const isActive =
              activeWindowId ===
                windowItem.id &&
              !windowItem.minimized;

            return (
              <button
                key={
                  windowItem.id
                }
                className={[
                  "taskbar-window-button",

                  windowItem.minimized
                    ? "taskbar-window-minimized"
                    : "",

                  isActive
                    ? "taskbar-window-active"
                    : "",
                ]
                  .filter(
                    Boolean
                  )
                  .join(" ")}
                type="button"
                onClick={(
                  event
                ) => {
                  event.stopPropagation();

                  onWindowClick(
                    windowItem.id
                  );
                }}
              >
                <img
                  src={
                    windowItem.icon
                  }
                  alt=""
                />

                <span>
                  {
                    windowItem.title
                  }
                </span>
              </button>
            );
          }
        )}
      </div>

      <div className="system-tray">
        <span
          className="tray-status"
          title="Sistema conectado"
        >
          ●
        </span>

        <time
          dateTime={
            currentTime.toISOString()
          }
          title={
            formattedDate
          }
        >
          {formattedTime}
        </time>
      </div>
    </footer>
  );
}