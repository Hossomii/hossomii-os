import type { FileSystemItem } from "../../../types/filesystem";

import documentsIcon from "../../../assets/icons/documents.webp";
import projectsIcon from "../../../assets/icons/projects.webp";

type ExplorerDirectoryViewProps = {
  currentItem: FileSystemItem | undefined;
  currentChildren: FileSystemItem[];

  getChildren: (
    parentId: string | null,
    includeHidden?: boolean
  ) => FileSystemItem[];

  onOpenItem: (
    item: FileSystemItem
  ) => void;

  selectedItemId?: string | null;

  onSelectItem?: (
    item: FileSystemItem
  ) => void;
};

export function ExplorerDirectoryView({
  currentItem,
  currentChildren,
  getChildren,
  onOpenItem,
  selectedItemId = null,
  onSelectItem,
}: ExplorerDirectoryViewProps) {
  function getItemDescription(
    item: FileSystemItem
  ) {
    if (item.type === "directory") {
      const children =
        getChildren(item.id);

      return `${children.length} ${
        children.length === 1
          ? "item"
          : "itens"
      }`;
    }

    if (item.type === "file") {
      return `Arquivo ${item.extension.toUpperCase()}`;
    }

    if (item.type === "application") {
      return "Aplicativo";
    }

    return "Atalho";
  }

  function renderItemIcon(
    item: FileSystemItem
  ) {
    if (item.id === "documents") {
      return (
        <img
          src={documentsIcon}
          alt=""
        />
      );
    }

    if (
      item.id === "projects" ||
      item.parentId === "projects"
    ) {
      return (
        <img
          src={projectsIcon}
          alt=""
        />
      );
    }

    if (item.type === "directory") {
      return (
        <span
          className="
            explorer-generic-icon
            explorer-folder-icon
          "
          aria-hidden="true"
        />
      );
    }

    if (item.type === "file") {
      return (
        <span
          className="
            explorer-generic-icon
            explorer-file-icon
          "
          aria-hidden="true"
        >
          {item.extension.toUpperCase()}
        </span>
      );
    }

    if (item.type === "application") {
      return (
        <span
          className="
            explorer-generic-icon
            explorer-application-icon
          "
          aria-hidden="true"
        >
          &gt;_
        </span>
      );
    }

    return (
      <span
        className="
          explorer-generic-icon
          explorer-shortcut-icon
        "
        aria-hidden="true"
      >
        ↗
      </span>
    );
  }

  if (
    !currentItem ||
    currentItem.type !== "directory"
  ) {
    return (
      <p className="explorer-empty-state">
        Não foi possível abrir este local.
      </p>
    );
  }

  return (
    <section className="computer-section">
      <h2>{currentItem.name}</h2>

      {currentChildren.length === 0 ? (
        <p className="explorer-empty-state">
          Esta pasta está vazia.
        </p>
      ) : (
        <div className="computer-items">
          {currentChildren.map((item) => {
            const isSelected =
              selectedItemId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={
                  isSelected
                    ? "explorer-item-selected"
                    : ""
                }
                onClick={() =>
                  onSelectItem?.(item)
                }
                onDoubleClick={() =>
                  onOpenItem(item)
                }
                title="Clique duas vezes para abrir"
              >
                {renderItemIcon(item)}

                <span>
                  <strong>
                    {item.name}
                  </strong>

                  <small>
                    {getItemDescription(
                      item
                    )}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}