import { useState } from "react";

import { useFileSystemStore } from "../../stores/filesystemStore";

import type { FileSystemItem } from "../../types/filesystem";

import emptyTrashIcon from "../../assets/icons/empty-trash.webp";

export function RecycleBinApp() {
  const items = useFileSystemStore(
    (state) => state.items
  );

  const restoreItem =
    useFileSystemStore(
      (state) => state.restoreItem
    );

  const [
    selectedItemId,
    setSelectedItemId,
  ] = useState<string | null>(null);

  const trashedItems =
    items.filter(
      (item) => item.trashed
    );

  const selectedItem =
    trashedItems.find(
      (item) =>
        item.id === selectedItemId
    );

  function handleRestore() {
    if (!selectedItem) {
      return;
    }

    const restored =
      restoreItem(
        selectedItem.id
      );

    if (restored) {
      setSelectedItemId(null);
    }
  }

  function getItemDescription(
    item: FileSystemItem
  ) {
    if (item.type === "file") {
      return `Arquivo ${item.extension.toUpperCase()}`;
    }

    if (item.type === "directory") {
      return "Pasta";
    }

    if (item.type === "application") {
      return "Aplicativo";
    }

    return "Atalho";
  }

  function renderItemIcon(
    item: FileSystemItem
  ) {
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

    if (
      item.type === "application"
    ) {
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

  return (
    <div className="computer-app">
      <div className="explorer-toolbar">
        <button
          type="button"
          disabled
        >
          ← Voltar
        </button>

        <span className="explorer-toolbar-separator" />

        <span className="explorer-address-label">
          Endereço
        </span>

        <div className="explorer-address">
          Lixeira
        </div>
      </div>

      <div className="computer-app-content">
        <aside className="computer-sidebar">
          <section>
            <h2>
              Tarefas da Lixeira
            </h2>

            <button
              type="button"
              disabled={
                !selectedItem ||
                !selectedItem.recoverable
              }
              onClick={
                handleRestore
              }
            >
              Restaurar item
            </button>

            <button
              type="button"
              disabled
            >
              Esvaziar Lixeira
            </button>
          </section>

          <section>
            <h2>Detalhes</h2>

            <p>
              {trashedItems.length}{" "}
              {trashedItems.length === 1
                ? "item"
                : "itens"}
            </p>
          </section>
        </aside>

        <div className="computer-main">
          <section className="computer-section">
            <h2>Lixeira</h2>

            {trashedItems.length ===
            0 ? (
              <div className="recycle-bin-empty">
                <img
                  src={emptyTrashIcon}
                  alt=""
                />

                <div>
                  <strong>
                    A Lixeira está vazia.
                  </strong>

                  <p>
                    Os arquivos excluídos
                    aparecerão aqui.
                  </p>
                </div>
              </div>
            ) : (
              <div className="computer-items">
                {trashedItems.map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={
                        selectedItemId ===
                        item.id
                          ? "explorer-item-selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedItemId(
                          item.id
                        )
                      }
                    >
                      {renderItemIcon(
                        item
                      )}

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
                  )
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}