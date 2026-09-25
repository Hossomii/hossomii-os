import type {
  WindowAppId,
  WindowData,
} from "./window";

export type FileSystemItemType =
  | "file"
  | "directory"
  | "application"
  | "shortcut";

  export type FileSystemIconId =
  | "computer"
  | "terminal"
  | "recycle-bin"
  | "project-tnt-basketball"
  | "project-medicos-dentistas"
  | "browser";

type BaseFileSystemItem = {
  id: string;
  name: string;
  parentId: string | null;

  iconId?: FileSystemIconId;

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

    resourceUrl?: string;
  };

export type FileSystemDirectory =
  BaseFileSystemItem & {
    type: "directory";
  };

export type FileSystemApplication =
  BaseFileSystemItem & {
    type: "application";

    appId: WindowAppId;

    instanceId?: string;
    data?: WindowData;
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