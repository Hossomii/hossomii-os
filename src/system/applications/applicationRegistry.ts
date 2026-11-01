import type {
  WindowAppId,
} from "../../types/window";

import computerIcon from "../../assets/icons/computer.webp";
import projectsIcon from "../../assets/icons/projects.webp";
import documentsIcon from "../../assets/icons/documents.webp";
import terminalIcon from "../../assets/icons/terminal.webp";
import emptyTrashIcon from "../../assets/icons/empty-trash.webp";
import browserIcon from "../../assets/icons/browser.webp";

import profileAvatar from "../../assets/profile-avatar.webp";

import achievementAlbumIcon from "../../assets/achievements/icons/achievement-album.png";

export type ApplicationDefinition = {
  id: WindowAppId;

  name: string;

  windowTitle: string;

  icon: string;

  folderLike?: boolean;

  desktopOrder?: number;

  desktopLabel?: string;

  quickLaunchOrder?: number;

  quickLaunchTitle?: string;
};

export const APPLICATIONS: Record<
  WindowAppId,
  ApplicationDefinition
> = {
  "quick-view": {
    id: "quick-view",

    name: "Quick View",

    windowTitle:
      "Quick View - Anthony",

    icon:
      profileAvatar,

    desktopOrder:
      1,

    desktopLabel:
      "Quick View",

    quickLaunchOrder:
      1,

    quickLaunchTitle:
      "Quick View",
  },

  computer: {
    id: "computer",

    name:
      "Meu Computador",

    windowTitle:
      "Meu Computador",

    icon:
      computerIcon,

    folderLike:
      true,

    desktopOrder:
      2,

    desktopLabel:
      "Meu Computador",
  },

  projects: {
    id: "projects",

    name:
      "Meus Projetos",

    windowTitle:
      "Meus Projetos",

    icon:
      projectsIcon,

    folderLike:
      true,

    desktopOrder:
      3,

    desktopLabel:
      "Meus Projetos",
  },

  documents: {
    id: "documents",

    name:
      "Meus Documentos",

    windowTitle:
      "Meus Documentos",

    icon:
      documentsIcon,

    folderLike:
      true,

    desktopOrder:
      4,

    desktopLabel:
      "Meus Documentos",
  },

  browser: {
    id: "browser",

    name:
      "HOSSOMII Web",

    windowTitle:
      "HOSSOMII Web",

    icon:
      browserIcon,

    desktopOrder:
      5,

    desktopLabel:
      "HOSSOMII Web",

    quickLaunchOrder:
      2,

    quickLaunchTitle:
      "HOSSOMII Web",
  },

  "achievement-album": {
    id:
      "achievement-album",

    name:
      "Álbum de Conquistas",

    windowTitle:
      "Álbum de Conquistas",

    icon:
      achievementAlbumIcon,

    desktopOrder:
      6,

    desktopLabel:
      "Álbum de Conquistas",

    quickLaunchOrder:
      3,

    quickLaunchTitle:
      "Álbum de Conquistas",
  },

  terminal: {
    id: "terminal",

    name:
      "Terminal",

    windowTitle:
      "Terminal - HOSSOMII OS",

    icon:
      terminalIcon,

    desktopOrder:
      7,

    desktopLabel:
      "Terminal",
  },

  "recycle-bin": {
    id:
      "recycle-bin",

    name:
      "Lixeira",

    windowTitle:
      "Lixeira",

    icon:
      emptyTrashIcon,

    folderLike:
      true,

    desktopOrder:
      8,

    desktopLabel:
      "Lixeira",
  },

  "control-panel": {
    id:
      "control-panel",

    name:
      "Painel de Controle",

    windowTitle:
      "Painel de Controle",

    icon:
      computerIcon,
  },

  notepad: {
    id:
      "notepad",

    name:
      "Bloco de Notas",

    windowTitle:
      "Bloco de Notas",

    icon:
      documentsIcon,
  },

  "pdf-viewer": {
    id:
      "pdf-viewer",

    name:
      "Visualizador de PDF",

    windowTitle:
      "Visualizador de PDF",

    icon:
      documentsIcon,
  },

  "image-viewer": {
    id:
      "image-viewer",

    name:
      "Visualizador de Imagens",

    windowTitle:
      "Visualizador de Imagens",

    icon:
      documentsIcon,
  },

  "project-viewer": {
    id:
      "project-viewer",

    name:
      "Projeto",

    windowTitle:
      "Projeto - HOSSOMII Portfolio",

    icon:
      projectsIcon,
  },
};

export function getApplicationDefinition(
  id: WindowAppId,
) {
  return APPLICATIONS[
    id
  ];
}

export const DESKTOP_APPLICATIONS =
  Object.values(
    APPLICATIONS,
  )
    .filter(
      (
        application,
      ) =>
        application.desktopOrder !==
        undefined,
    )
    .sort(
      (
        first,
        second,
      ) =>
        (
          first.desktopOrder ??
          Number.MAX_SAFE_INTEGER
        ) -
        (
          second.desktopOrder ??
          Number.MAX_SAFE_INTEGER
        ),
    );

export const QUICK_LAUNCH_APPLICATIONS =
  Object.values(
    APPLICATIONS,
  )
    .filter(
      (
        application,
      ) =>
        application.quickLaunchOrder !==
        undefined,
    )
    .sort(
      (
        first,
        second,
      ) =>
        (
          first.quickLaunchOrder ??
          Number.MAX_SAFE_INTEGER
        ) -
        (
          second.quickLaunchOrder ??
          Number.MAX_SAFE_INTEGER
        ),
    );