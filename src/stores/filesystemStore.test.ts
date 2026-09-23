import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  useFileSystemStore,
} from "./filesystemStore";

describe(
  "filesystemStore",
  () => {
    beforeEach(() => {
      useFileSystemStore
        .getState()
        .resetFileSystem();
    });

    it(
      "moves a normal deletable file to the recycle bin",
      () => {
        const store =
          useFileSystemStore
            .getState();

        const deleted =
          store.trashItem(
            "readme-file"
          );

        expect(
          deleted
        ).toBe(true);

        const item =
          useFileSystemStore
            .getState()
            .getItem(
              "readme-file"
            );

        expect(
          item?.trashed
        ).toBe(true);

        expect(
          item?.parentId
        ).toBeNull();

        expect(
          item?.originalParentId
        ).toBe(
          "documents"
        );
      }
    );

    it(
      "refuses to delete a protected item",
      () => {
        const deleted =
          useFileSystemStore
            .getState()
            .trashItem(
              "documents"
            );

        expect(
          deleted
        ).toBe(false);

        const item =
          useFileSystemStore
            .getState()
            .getItem(
              "documents"
            );

        expect(
          item?.trashed
        ).toBe(false);
      }
    );

    it(
      "refuses to delete a critical item through the normal delete operation",
      () => {
        const deleted =
          useFileSystemStore
            .getState()
            .trashItem(
              "hossomii-shell"
            );

        expect(
          deleted
        ).toBe(false);

        const item =
          useFileSystemStore
            .getState()
            .getItem(
              "hossomii-shell"
            );

        expect(
          item?.trashed
        ).toBe(false);
      }
    );

    it(
      "allows the dedicated critical operation to delete a critical item",
      () => {
        const deleted =
          useFileSystemStore
            .getState()
            .trashCriticalItem(
              "hossomii-shell"
            );

        expect(
          deleted
        ).toBe(true);

        const item =
          useFileSystemStore
            .getState()
            .getItem(
              "hossomii-shell"
            );

        expect(
          item?.trashed
        ).toBe(true);

        expect(
          item?.originalParentId
        ).toBe(
          "system"
        );
      }
    );

    it(
      "refuses to use the critical delete operation on a normal file",
      () => {
        const deleted =
          useFileSystemStore
            .getState()
            .trashCriticalItem(
              "readme-file"
            );

        expect(
          deleted
        ).toBe(false);

        const item =
          useFileSystemStore
            .getState()
            .getItem(
              "readme-file"
            );

        expect(
          item?.trashed
        ).toBe(false);
      }
    );

    it(
      "restores a deleted file to its original directory",
      () => {
        const store =
          useFileSystemStore
            .getState();

        expect(
          store.trashItem(
            "readme-file"
          )
        ).toBe(true);

        const restored =
          useFileSystemStore
            .getState()
            .restoreItem(
              "readme-file"
            );

        expect(
          restored
        ).toBe(true);

        const item =
          useFileSystemStore
            .getState()
            .getItem(
              "readme-file"
            );

        expect(
          item?.trashed
        ).toBe(false);

        expect(
          item?.parentId
        ).toBe(
          "documents"
        );

        expect(
          item?.originalParentId
        ).toBeNull();
      }
    );

    it(
      "does not delete the same item twice",
      () => {
        expect(
          useFileSystemStore
            .getState()
            .trashItem(
              "readme-file"
            )
        ).toBe(true);

        expect(
          useFileSystemStore
            .getState()
            .trashItem(
              "readme-file"
            )
        ).toBe(false);
      }
    );

    it(
      "does not restore an item that is not in the recycle bin",
      () => {
        const restored =
          useFileSystemStore
            .getState()
            .restoreItem(
              "readme-file"
            );

        expect(
          restored
        ).toBe(false);
      }
    );
  }
);