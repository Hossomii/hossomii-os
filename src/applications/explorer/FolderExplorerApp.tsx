import { useState } from "react";

import { useFileSystemStore } from "../../stores/filesystemStore";

import type { FileSystemItem } from "../../types/filesystem";

import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";
import { ExplorerDirectoryView } from "./components/ExplorerDirectoryView";
import { ExplorerToolbar } from "./components/ExplorerToolbar";
import { useExplorerNavigation } from "./useExplorerNavigation";

import { useWindowStore } from "../../stores/windowStore";
import documentsIcon from "../../assets/icons/documents.webp";

type FolderExplorerAppProps = {
  initialLocation: string;
};

export function FolderExplorerApp({ initialLocation }: FolderExplorerAppProps) {
  const trashItem = useFileSystemStore((state) => state.trashItem);

  const openWindow = useWindowStore((state) => state.openWindow);

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

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [deleteCandidate, setDeleteCandidate] = useState<FileSystemItem | null>(
    null,
  );

  const selectedItem = selectedItemId ? getItem(selectedItemId) : undefined;

  function handleOpenItem(item: FileSystemItem) {
    setSelectedItemId(null);

    if (item.type === "directory") {
      navigateTo(item.id);
      return;
    }

    if (item.type === "shortcut") {
      const targetItem = getItem(item.targetId);

      if (!targetItem) {
        return;
      }

      handleOpenItem(targetItem);
      return;
    }

    if (item.type === "application") {
      console.log(`Aplicativo solicitado: ${item.appId}`);

      return;
    }

    if (item.type === "file") {
      if (item.extension === "txt") {
        openWindow({
          appId: "notepad",

          instanceId: item.id,

          title: `${item.name} - Bloco de Notas`,

          icon: documentsIcon,

          data: {
            fileId: item.id,
          },
        });

        return;
      }

      console.log(`Ainda não existe aplicativo para abrir: ${item.name}`);
    }
  }

  function handleNavigate(location: string) {
    setSelectedItemId(null);

    navigateTo(location);
  }

  function handleBack() {
    setSelectedItemId(null);

    goBack();
  }

  function handleDeleteRequest() {
    if (!selectedItem) {
      return;
    }

    if (!selectedItem.deletable) {
      return;
    }

    setDeleteCandidate(selectedItem);
  }

  function handleConfirmDelete() {
    if (!deleteCandidate) {
      return;
    }

    const deleted = trashItem(deleteCandidate.id);

    if (deleted) {
      setSelectedItemId(null);
    }

    setDeleteCandidate(null);
  }

  return (
    <div className="computer-app">
      <ExplorerToolbar
        address={address}
        canGoBack={canGoBack}
        onBack={handleBack}
      />

      <div className="computer-app-content">
        <aside className="computer-sidebar">
          <section>
            <h2>Tarefas de arquivo</h2>

            <button
              type="button"
              disabled={!selectedItem || !selectedItem.deletable}
              onClick={handleDeleteRequest}
            >
              Excluir este item
            </button>
          </section>

          <section>
            <h2>Outros locais</h2>

            <button type="button" onClick={() => handleNavigate("documents")}>
              Meus Documentos
            </button>

            <button type="button" onClick={() => handleNavigate("projects")}>
              Meus Projetos
            </button>
          </section>
        </aside>

        <div className="computer-main">
          <ExplorerDirectoryView
            currentItem={currentItem}
            currentChildren={currentChildren}
            getChildren={getChildren}
            onOpenItem={handleOpenItem}
            selectedItemId={selectedItemId}
            onSelectItem={(item) => setSelectedItemId(item.id)}
          />
        </div>
      </div>

      {deleteCandidate && (
        <DeleteConfirmationDialog
          itemName={deleteCandidate.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteCandidate(null)}
        />
      )}
    </div>
  );
}
