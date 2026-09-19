import { useState } from "react";

import { useCriticalFileStore } from "../../stores/criticalFileStore";
import { useFileSystemStore } from "../../stores/filesystemStore";

import type { FileSystemItem } from "../../types/filesystem";

type DeleteActionState =
  | {
      type: "normal";
      item: FileSystemItem;
    }
  | {
      type: "protected";
      item: FileSystemItem;
    }
  | null;

export function useExplorerActions() {
  const trashItem = useFileSystemStore(
    (state) => state.trashItem
  );

  const startCriticalDelete =
    useCriticalFileStore(
      (state) => state.startFlow
    );

  const [
    deleteAction,
    setDeleteAction,
  ] = useState<DeleteActionState>(
    null
  );

  function requestDelete(
    item: FileSystemItem
  ) {
    if (!item.deletable) {
      setDeleteAction({
        type: "protected",
        item,
      });

      return;
    }

    if (item.critical) {
      startCriticalDelete({
        id: item.id,
        name: item.name,
      });

      return;
    }

    setDeleteAction({
      type: "normal",
      item,
    });
  }

  function confirmNormalDelete() {
    if (
      !deleteAction ||
      deleteAction.type !== "normal"
    ) {
      return false;
    }

    const deleted =
      trashItem(
        deleteAction.item.id
      );

    setDeleteAction(null);

    return deleted;
  }

  function cancelDelete() {
    setDeleteAction(null);
  }

  return {
    deleteAction,

    requestDelete,
    confirmNormalDelete,
    cancelDelete,
  };
}