import { useState } from "react";

import { useFileSystemStore } from "../../stores/filesystemStore";

import type { FileSystemItem } from "../../types/filesystem";

export function useExplorerSelection() {
  const items = useFileSystemStore(
    (state) => state.items
  );

  const [
    selectedItemId,
    setSelectedItemId,
  ] = useState<string | null>(null);

  const selectedItem =
    selectedItemId
      ? items.find(
          (item) =>
            item.id === selectedItemId
        )
      : undefined;

  function selectItem(
    item: FileSystemItem
  ) {
    setSelectedItemId(item.id);
  }

  function clearSelection() {
    setSelectedItemId(null);
  }

  return {
    selectedItemId,
    selectedItem,

    selectItem,
    clearSelection,
  };
}