import computerIcon from "../../assets/icons/computer.webp";
import emptyTrashIcon from "../../assets/icons/empty-trash.webp";
import terminalIcon from "../../assets/icons/terminal.webp";
import medicosDentistasIcon from "../../assets/icons/projects/medicos-dentistas.webp";
import tntBasketballIcon from "../../assets/icons/projects/tnt-basketball.webp";
import browserIcon from "../../assets/icons/browser.webp";

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