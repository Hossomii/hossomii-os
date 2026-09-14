import type { FileSystemItem } from "../../types/filesystem";

import { ExplorerDirectoryView } from "./components/ExplorerDirectoryView";
import { ExplorerToolbar } from "./components/ExplorerToolbar";
import { useExplorerNavigation } from "./useExplorerNavigation";

type FolderExplorerAppProps = {
  initialLocation: string;
};

export function FolderExplorerApp({
  initialLocation,
}: FolderExplorerAppProps) {
  const {
    currentItem,
    currentChildren,

    canGoBack,

    navigateTo,
    goBack,

    address,

    getItem,
    getChildren,
  } = useExplorerNavigation(initialLocation);

  function handleOpenItem(
    item: FileSystemItem
  ) {
    if (item.type === "directory") {
      navigateTo(item.id);
      return;
    }

    if (item.type === "shortcut") {
      const targetItem =
        getItem(item.targetId);

      if (!targetItem) {
        return;
      }

      handleOpenItem(targetItem);
      return;
    }

    if (item.type === "application") {
      console.log(
        `Aplicativo solicitado: ${item.appId}`
      );

      return;
    }

    if (item.type === "file") {
      console.log(
        `Arquivo solicitado: ${item.name}`
      );
    }
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
            <h2>Outros locais</h2>

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
          <ExplorerDirectoryView
            currentItem={currentItem}
            currentChildren={
              currentChildren
            }
            getChildren={getChildren}
            onOpenItem={
              handleOpenItem
            }
          />
        </div>
      </div>
    </div>
  );
}