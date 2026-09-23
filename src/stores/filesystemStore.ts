import { create } from "zustand";

import { initialFileSystem } from "../system/filesystem/initialFileSystem";

import type { FileSystemItem } from "../types/filesystem";

type FileSystemStore = {
  items: FileSystemItem[];

  getItem: (id: string) => FileSystemItem | undefined;

  getChildren: (
    parentId: string | null,
    includeHidden?: boolean
  ) => FileSystemItem[];

  getTrashedItems: () => FileSystemItem[];

  getPath: (id: string) => FileSystemItem[];

  trashItem: (id: string) => boolean;

  trashCriticalItem: (id: string) => boolean;

  restoreItem: (id: string) => boolean;

  resetFileSystem: () => void;
};

function createInitialItems(): FileSystemItem[] {
  return initialFileSystem.map((item) => ({
    ...item,
  }));
}

function moveItemToTrash(
  items: FileSystemItem[],
  id: string
): FileSystemItem[] {
  return items.map((currentItem) => {
    if (currentItem.id !== id) {
      return currentItem;
    }

    return {
      ...currentItem,

      originalParentId:
        currentItem.parentId,

      parentId: null,

      trashed: true,
    };
  });
}

export const useFileSystemStore =
  create<FileSystemStore>((set, get) => ({
    items: createInitialItems(),

    getItem: (id) => {
      return get().items.find(
        (item) => item.id === id
      );
    },

    getChildren: (
      parentId,
      includeHidden = false
    ) => {
      return get().items.filter((item) => {
        if (item.trashed) {
          return false;
        }

        if (item.parentId !== parentId) {
          return false;
        }

        if (
          !includeHidden &&
          item.hidden
        ) {
          return false;
        }

        return true;
      });
    },

    getTrashedItems: () => {
      return get().items.filter(
        (item) => item.trashed
      );
    },

    getPath: (id) => {
      const items = get().items;

      const path: FileSystemItem[] = [];

      const visitedIds =
        new Set<string>();

      let currentItem =
        items.find(
          (item) =>
            item.id === id
        );

      while (currentItem) {
        if (
          visitedIds.has(
            currentItem.id
          )
        ) {
          break;
        }

        visitedIds.add(
          currentItem.id
        );

        path.unshift(
          currentItem
        );

        if (
          currentItem.parentId ===
          null
        ) {
          break;
        }

        currentItem =
          items.find(
            (item) =>
              item.id ===
              currentItem?.parentId
          );
      }

      return path;
    },

    trashItem: (id) => {
      const item =
        get().items.find(
          (currentItem) =>
            currentItem.id === id
        );

      if (!item) {
        return false;
      }

      if (!item.deletable) {
        return false;
      }

      /*
       * Critical items must never
       * be deleted through the
       * normal filesystem path.
       *
       * They are handled by the
       * critical deletion flow.
       */
      if (item.critical) {
        return false;
      }

      if (item.trashed) {
        return false;
      }

      set((state) => ({
        items:
          moveItemToTrash(
            state.items,
            id
          ),
      }));

      return true;
    },

    trashCriticalItem: (id) => {
      const item =
        get().items.find(
          (currentItem) =>
            currentItem.id === id
        );

      if (!item) {
        return false;
      }

      if (!item.deletable) {
        return false;
      }

      /*
       * This operation is intentionally
       * restricted to items explicitly
       * marked as critical.
       */
      if (!item.critical) {
        return false;
      }

      if (item.trashed) {
        return false;
      }

      set((state) => ({
        items:
          moveItemToTrash(
            state.items,
            id
          ),
      }));

      return true;
    },

    restoreItem: (id) => {
      const item =
        get().items.find(
          (currentItem) =>
            currentItem.id === id
        );

      if (!item) {
        return false;
      }

      if (!item.trashed) {
        return false;
      }

      if (!item.recoverable) {
        return false;
      }

      set((state) => ({
        items:
          state.items.map(
            (currentItem) => {
              if (
                currentItem.id !==
                id
              ) {
                return currentItem;
              }

              return {
                ...currentItem,

                parentId:
                  currentItem.originalParentId,

                originalParentId:
                  null,

                trashed:
                  false,
              };
            }
          ),
      }));

      return true;
    },

    resetFileSystem: () => {
      set({
        items:
          createInitialItems(),
      });
    },
  }));