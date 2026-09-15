import type { FileSystemItem } from "../../types/filesystem";

import { CriticalItemDialog } from "./components/CriticalItemDialog";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";
import { ExplorerDirectoryView } from "./components/ExplorerDirectoryView";
import { ExplorerToolbar } from "./components/ExplorerToolbar";
import { ProtectedItemDialog } from "./components/ProtectedItemDialog";

import { useExplorerActions } from "./useExplorerActions";
import { useExplorerNavigation } from "./useExplorerNavigation";
import { useExplorerSelection } from "./useExplorerSelection";
import { useFileSystemItemLauncher } from "./useFileSystemItemLauncher";

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

    getChildren,
  } = useExplorerNavigation(
    initialLocation
  );

  const {
    selectedItemId,
    selectedItem,

    selectItem,
    clearSelection,
  } = useExplorerSelection();

  const {
    deleteAction,

    requestDelete,
    confirmNormalDelete,
    cancelDelete,
  } = useExplorerActions();

  const { openItem } =
    useFileSystemItemLauncher({
      navigateTo,
    });

  function handleOpenItem(
    item: FileSystemItem
  ) {
    clearSelection();

    openItem(item);
  }

  function handleNavigate(
    location: string
  ) {
    clearSelection();

    navigateTo(location);
  }

  function handleBack() {
    clearSelection();

    goBack();
  }

  function handleDeleteRequest() {
    if (!selectedItem) {
      return;
    }

    requestDelete(selectedItem);
  }

  function handleConfirmNormalDelete() {
    const deleted =
      confirmNormalDelete();

    if (deleted) {
      clearSelection();
    }
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
            <h2>
              Tarefas de arquivo
            </h2>

            <button
              type="button"
              disabled={!selectedItem}
              onClick={
                handleDeleteRequest
              }
            >
              Excluir este item
            </button>
          </section>

          <section>
            <h2>
              Outros locais
            </h2>

            <button
              type="button"
              onClick={() =>
                handleNavigate(
                  "documents"
                )
              }
            >
              Meus Documentos
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate(
                  "projects"
                )
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
            getChildren={
              getChildren
            }
            onOpenItem={
              handleOpenItem
            }
            selectedItemId={
              selectedItemId
            }
            onSelectItem={
              selectItem
            }
          />
        </div>
      </div>

      {deleteAction?.type ===
        "normal" && (
        <DeleteConfirmationDialog
          itemName={
            deleteAction.item.name
          }
          onConfirm={
            handleConfirmNormalDelete
          }
          onCancel={
            cancelDelete
          }
        />
      )}

      {deleteAction?.type ===
        "protected" && (
        <ProtectedItemDialog
          itemName={
            deleteAction.item.name
          }
          onClose={
            cancelDelete
          }
        />
      )}

      {deleteAction?.type ===
        "critical" && (
        <CriticalItemDialog
          itemName={
            deleteAction.item.name
          }
          onClose={
            cancelDelete
          }
        />
      )}
    </div>
  );
}