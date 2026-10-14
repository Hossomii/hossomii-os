import {
  describe,
  expect,
  it,
} from "vitest";

import {
  initialFileSystem,
} from "./initialFileSystem";

import type {
  FileSystemItem,
} from "../../types/filesystem";

import {
  formatPath,
  getChildren,
  getItemById,
  normalizeValue,
  resolveItemPath,
} from "./pathUtils";

const hiddenTestFile:
  FileSystemItem = {
    id:
      "hidden-test-file",

    name:
      "segredo.txt",

    type:
      "file",

    parentId:
      "documents",

    extension:
      "txt",

    content:
      "hidden",

    hidden:
      true,

    deletable:
      false,

    critical:
      false,

    recoverable:
      false,

    trashed:
      false,

    originalParentId:
      null,
  };

const fileSystemWithHidden =
  [
    ...initialFileSystem,
    hiddenTestFile,
  ];

describe(
  "virtual filesystem path utilities",
  () => {
    it(
      "does not list hidden children by default",
      () => {
        const children =
          getChildren(
            fileSystemWithHidden,
            "documents",
          );

        expect(
          children.some(
            (item) =>
              item.id ===
              "hidden-test-file",
          ),
        ).toBe(false);
      },
    );

    it(
      "lists hidden children when explicitly requested",
      () => {
        const children =
          getChildren(
            fileSystemWithHidden,
            "documents",
            true,
          );

        expect(
          children.some(
            (item) =>
              item.id ===
              "hidden-test-file",
          ),
        ).toBe(true);
      },
    );

    it(
      "does not resolve hidden items by default",
      () => {
        expect(
          resolveItemPath(
            fileSystemWithHidden,
            "documents",
            "segredo.txt",
          ),
        ).toBeNull();
      },
    );

    it(
      "resolves hidden items when explicitly allowed",
      () => {
        expect(
          resolveItemPath(
            fileSystemWithHidden,
            "documents",
            "segredo.txt",
            {
              includeHidden:
                true,
            },
          )?.id,
        ).toBe(
          "hidden-test-file",
        );
      },
    );

    it(
      "normalizes case and diacritics",
      () => {
        expect(
          normalizeValue(
            "Usuários"
          )
        ).toBe(
          "usuarios"
        );

        expect(
          normalizeValue(
            "MÉDICOS"
          )
        ).toBe(
          "medicos"
        );
      }
    );

    it(
      "finds an item by id",
      () => {
        const item =
          getItemById(
            initialFileSystem,
            "documents"
          );

        expect(
          item?.name
        ).toBe(
          "Documentos"
        );
      }
    );

    it(
      "returns visible children from a directory",
      () => {
        const children =
          getChildren(
            initialFileSystem,
            "documents"
          );

        expect(
          children.some(
            (item) =>
              item.id ===
              "readme-file"
          )
        ).toBe(true);

        expect(
          children.some(
            (item) =>
              item.id ===
              "resume-file"
          )
        ).toBe(true);
      }
    );

    it(
      "formats a virtual filesystem path",
      () => {
        expect(
          formatPath(
            initialFileSystem,
            "documents"
          )
        ).toBe(
          "C:\\Usuários\\Anthony\\Documentos"
        );
      }
    );

    it(
      "resolves a relative path",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "anthony",
            "Documentos"
          );

        expect(
          item?.id
        ).toBe(
          "documents"
        );
      }
    );

    it(
      "resolves an absolute path",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "anthony",
            "C:\\Sistema"
          );

        expect(
          item?.id
        ).toBe(
          "system"
        );
      }
    );

    it(
      "accepts forward slashes",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "anthony",
            "C:/Usuarios/Anthony/Projetos"
          );

        expect(
          item?.id
        ).toBe(
          "projects"
        );
      }
    );

    it(
      "resolves paths without requiring accents",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "drive-c",
            "Usuarios\\Anthony\\Documentos"
          );

        expect(
          item?.id
        ).toBe(
          "documents"
        );
      }
    );

    it(
      "supports parent directory navigation",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "documents",
            ".."
          );

        expect(
          item?.id
        ).toBe(
          "anthony"
        );
      }
    );

    it(
      "supports current directory notation",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "documents",
            "."
          );

        expect(
          item?.id
        ).toBe(
          "documents"
        );
      }
    );

    it(
      "returns null for an invalid path",
      () => {
        const item =
          resolveItemPath(
            initialFileSystem,
            "anthony",
            "NaoExiste"
          );

        expect(
          item
        ).toBeNull();
      }
    );
  }
);