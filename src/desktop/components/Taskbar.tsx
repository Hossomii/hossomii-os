import type { OSWindow } from "../../types/window";

type TaskbarProps = {
  startMenuOpen: boolean;

  windows: OSWindow[];

  onStartToggle: () => void;

  onWindowClick: (
    id: OSWindow["id"]
  ) => void;
};

export function Taskbar({
  startMenuOpen,
  windows,
  onStartToggle,
  onWindowClick,
}: TaskbarProps) {
  const currentTime =
    new Intl.DateTimeFormat(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date());

  return (
    <footer className="taskbar">
      <button
        className={`start-button ${
          startMenuOpen
            ? "start-button-active"
            : ""
        }`}
        type="button"
        onClick={(event) => {
          event.stopPropagation();

          onStartToggle();
        }}
      >
        <span className="start-logo">
          H
        </span>

        <span>iniciar</span>
      </button>

      <div className="taskbar-applications">
        {windows.map((windowItem) => (
          <button
            key={windowItem.id}
            className={`taskbar-window-button ${
              windowItem.minimized
                ? "taskbar-window-minimized"
                : ""
            }`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              onWindowClick(
                windowItem.id
              );
            }}
          >
            <img
              src={windowItem.icon}
              alt=""
            />

            <span>
              {windowItem.title}
            </span>
          </button>
        ))}
      </div>

      <div className="system-tray">
        <span
          className="tray-status"
          title="Sistema conectado"
        >
          ●
        </span>

        <time>
          {currentTime}
        </time>
      </div>
    </footer>
  );
}