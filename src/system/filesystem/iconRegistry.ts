import computerIcon from "../../assets/icons/computer.webp";
import emptyTrashIcon from "../../assets/icons/empty-trash.webp";
import terminalIcon from "../../assets/icons/terminal.webp";
import browserIcon from "../../assets/icons/browser.webp";
import projectsIcon from "../../assets/icons/projects.webp";

import textFileIcon from "../../assets/icons/files/text-file.webp";
import pdfFileIcon from "../../assets/icons/files/pdf-file.webp";

import medicosDentistasIcon from "../../assets/icons/projects/medicos-dentistas.webp";
import tntBasketballIcon from "../../assets/icons/projects/tnt-basketball.webp";

import type {
  FileSystemIconId,
} from "../../types/filesystem";

const ICONS: Partial<
  Record<
    FileSystemIconId,
    string
  >
> = {
  computer:
    computerIcon,

  projects:
    projectsIcon,

  terminal:
    terminalIcon,

  browser:
    browserIcon,

  "recycle-bin":
    emptyTrashIcon,

  "project-tnt-basketball":
    tntBasketballIcon,

  "project-medicos-dentistas":
    medicosDentistasIcon,
};

const FILE_EXTENSION_ICONS:
  Record<
    string,
    string
  > = {
    txt:
      textFileIcon,

    pdf:
      pdfFileIcon,
  };

export function getFileSystemIcon(
  iconId?: FileSystemIconId
) {
  if (!iconId) {
    return undefined;
  }

  return ICONS[
    iconId
  ];
}

export function getFileExtensionIcon(
  extension?: string
) {
  if (!extension) {
    return undefined;
  }

  return FILE_EXTENSION_ICONS[
    extension.toLowerCase()
  ];
}