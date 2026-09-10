type DesktopIconProps = {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
  onSelect: (id: string) => void;
  onOpen: () => void;
};

export function DesktopIcon({
  id,
  label,
  icon,
  selected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  return (
    <button
      className={`desktop-icon ${
        selected ? "desktop-icon-selected" : ""
      }`}
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
    >
      <img
        className="desktop-icon-image"
        src={icon}
        alt=""
        draggable={false}
      />

      <span>{label}</span>
    </button>
  );
}