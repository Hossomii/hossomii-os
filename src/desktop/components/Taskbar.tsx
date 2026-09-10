type TaskbarProps = {
  startMenuOpen: boolean;
  onStartToggle: () => void;
};

export function Taskbar({
  startMenuOpen,
  onStartToggle,
}: TaskbarProps) {
  const currentTime = new Intl.DateTimeFormat(
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
          startMenuOpen ? "start-button-active" : ""
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

      <div className="taskbar-applications" />

      <div className="system-tray">
        <span
          className="tray-status"
          title="Sistema conectado"
        >
          ●
        </span>

        <time>{currentTime}</time>
      </div>
    </footer>
  );
}