import type { WindowAppId } from "./window";

export type FileSystemItemType =
  | "file"
  | "directory"
  | "application"
  | "shortcut";

type BaseFileSystemItem = {
  id: string;
  name: string;
  parentId: string | null;

  hidden: boolean;

  deletable: boolean;
  critical: boolean;
  recoverable: boolean;

  trashed: boolean;
  originalParentId: string | null;
};

export type FileSystemFile =
  BaseFileSystemItem & {
    type: "file";

    extension: string;
    content?: string;
  };

export type FileSystemDirectory =
  BaseFileSystemItem & {
    type: "directory";
  };

export type FileSystemApplication =
  BaseFileSystemItem & {
    type: "application";

    appId: WindowAppId;
  };

export type FileSystemShortcut =
  BaseFileSystemItem & {
    type: "shortcut";

    targetId: string;
  };

export type FileSystemItem =
  | FileSystemFile
  | FileSystemDirectory
  | FileSystemApplication
  | FileSystemShortcut;