import { useFileSystemStore } from "../../stores/filesystemStore";

import type { FileSystemItem } from "../../types/filesystem";

import documentsIcon from "../../assets/icons/documents.webp";
import projectsIcon from "../../assets/icons/projects.webp";

import { useExplorerNavigation } from "../explorer/useExplorerNavigation";

export function ComputerApp() {
  const fileSystemItems =
    useFileSystemStore(
      (state) => state.items
    );

  const {
    currentLocation,
    currentItem,
    currentChildren,

    canGoBack,

    navigateTo,
    goBack,

    address,

    getItem,
    getChildren,
  } = useExplorerNavigation("computer");

  /*
   * Garante atualização dos contadores da tela inicial
   * quando o filesystem mudar futuramente.
   */
  void fileSystemItems;

  const documentItems =
    getChildren("documents");

  const projectItems =
    getChildren("projects");

  function handleOpenItem(
    item: FileSystemItem
  ) {
    if (
      item.type === "directory"
    ) {
      navigateTo(item.id);

      return;
    }

    if (
      item.type === "shortcut"
    ) {
      const targetItem =
        getItem(item.targetId);

      if (!targetItem) {
        return;
      }

      handleOpenItem(targetItem);

      return;
    }

    if (
      item.type === "application"
    ) {
      console.log(
        `Aplicativo solicitado: ${item.appId}`
      );

      return;
    }

    if (
      item.type === "file"
    ) {
      console.log(
        `Arquivo solicitado: ${item.name}`
      );
    }
  }

  function getItemDescription(
    item: FileSystemItem
  ) {
    if (
      item.type === "directory"
    ) {
      const children =
        getChildren(item.id);

      return `${children.length} ${
        children.length === 1
          ? "item"
          : "itens"
      }`;
    }

    if (
      item.type === "file"
    ) {
      return `Arquivo ${item.extension.toUpperCase()}`;
    }

    if (
      item.type === "application"
    ) {
      return "Aplicativo";
    }

    return "Atalho";
  }

  function renderItemIcon(
    item: FileSystemItem
  ) {
    if (
      item.id === "documents"
    ) {
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

    if (
      item.type === "directory"
    ) {
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

    if (
      item.type === "file"
    ) {
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

  function renderComputerHome() {
    return (
      <>
        <section className="computer-section">
          <h2>
            Arquivos armazenados neste
            computador
          </h2>

          <div className="computer-items">
            <button
              type="button"
              onDoubleClick={() =>
                navigateTo("documents")
              }
              title="Clique duas vezes para abrir"
            >
              <img
                src={documentsIcon}
                alt=""
              />

              <span>
                <strong>
                  Meus Documentos
                </strong>

                <small>
                  {documentItems.length}{" "}
                  {documentItems.length === 1
                    ? "item"
                    : "itens"}
                </small>
              </span>
            </button>

            <button
              type="button"
              onDoubleClick={() =>
                navigateTo("projects")
              }
              title="Clique duas vezes para abrir"
            >
              <img
                src={projectsIcon}
                alt=""
              />

              <span>
                <strong>
                  Meus Projetos
                </strong>

                <small>
                  {projectItems.length}{" "}
                  {projectItems.length === 1
                    ? "projeto"
                    : "projetos"}
                </small>
              </span>
            </button>
          </div>
        </section>

        <section className="computer-section">
          <h2>
            Unidades de disco rígido
          </h2>

          <div className="computer-items">
            <button
              type="button"
              onDoubleClick={() =>
                navigateTo("drive-c")
              }
              title="Clique duas vezes para abrir"
            >
              <span className="hard-drive-icon">
                <span />
              </span>

              <span>
                <strong>
                  Disco local (C:)
                </strong>

                <small>
                  Sistema HOSSOMII
                </small>
              </span>
            </button>
          </div>
        </section>
      </>
    );
  }

  function renderDirectory() {
    if (
      !currentItem ||
      currentItem.type !==
        "directory"
    ) {
      return (
        <p className="explorer-empty-state">
          Não foi possível abrir este
          local.
        </p>
      );
    }

    return (
      <section className="computer-section">
        <h2>
          {currentItem.name}
        </h2>

        {currentChildren.length ===
        0 ? (
          <p className="explorer-empty-state">
            Esta pasta está vazia.
          </p>
        ) : (
          <div className="computer-items">
            {currentChildren.map(
              (item) => (
                <button
                  key={item.id}
                  type="button"
                  onDoubleClick={() =>
                    handleOpenItem(item)
                  }
                  title="Clique duas vezes para abrir"
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
    );
  }

  return (
    <div className="computer-app">
      <div className="explorer-toolbar">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={goBack}
        >
          ← Voltar
        </button>

        <span className="explorer-toolbar-separator" />

        <span className="explorer-address-label">
          Endereço
        </span>

        <div className="explorer-address">
          {address}
        </div>
      </div>

      <div className="computer-app-content">
        <aside className="computer-sidebar">
          <section>
            <h2>
              Tarefas do sistema
            </h2>

            <button type="button">
              Exibir informações do sistema
            </button>

            <button type="button">
              Alterar uma configuração
            </button>
          </section>

          <section>
            <h2>
              Outros locais
            </h2>

            <button
              type="button"
              onClick={() =>
                navigateTo("computer")
              }
            >
              Meu Computador
            </button>

            <button
              type="button"
              onClick={() =>
                navigateTo("documents")
              }
            >
              Meus Documentos
            </button>

            <button
              type="button"
              onClick={() =>
                navigateTo("projects")
              }
            >
              Meus Projetos
            </button>
          </section>
        </aside>

        <div className="computer-main">
          {currentLocation ===
          "computer"
            ? renderComputerHome()
            : renderDirectory()}
        </div>
      </div>
    </div>
  );
}