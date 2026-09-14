import documentsIcon from "../../assets/icons/documents.webp";
import projectsIcon from "../../assets/icons/projects.webp";

import { ExplorerDirectoryView } from "../explorer/components/ExplorerDirectoryView";
import { ExplorerToolbar } from "../explorer/components/ExplorerToolbar";

import { useExplorerNavigation } from "../explorer/useExplorerNavigation";
import { useFileSystemItemLauncher } from "../explorer/useFileSystemItemLauncher";

export function ComputerApp() {
  const {
    currentLocation,
    currentItem,
    currentChildren,

    canGoBack,

    navigateTo,
    goBack,

    address,

    getChildren,
  } = useExplorerNavigation(
    "computer"
  );

  const { openItem } =
    useFileSystemItemLauncher({
      navigateTo,
    });

  const documentItems =
    getChildren("documents");

  const projectItems =
    getChildren("projects");

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

  return (
    <div className="computer-app">
      <ExplorerToolbar
        address={address}
        canGoBack={canGoBack}
        onBack={goBack}
      />

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
          "computer" ? (
            renderComputerHome()
          ) : (
            <ExplorerDirectoryView
              currentItem={
                currentItem
              }
              currentChildren={
                currentChildren
              }
              getChildren={
                getChildren
              }
              onOpenItem={
                openItem
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}