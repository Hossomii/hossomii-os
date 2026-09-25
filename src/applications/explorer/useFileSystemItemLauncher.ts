import { useFileSystemStore } from "../../stores/filesystemStore";

import { useWindowStore } from "../../stores/windowStore";

import computerIcon from "../../assets/icons/computer.webp";
import documentsIcon from "../../assets/icons/documents.webp";
import projectsIcon from "../../assets/icons/projects.webp";
import terminalIcon from "../../assets/icons/terminal.webp";
import emptyTrashIcon from "../../assets/icons/empty-trash.webp";
import browserIcon from "../../assets/icons/browser.webp";

import { getFileSystemIcon } from "../../system/filesystem/iconRegistry";

import type { FileSystemItem } from "../../types/filesystem";

import type { WindowAppId } from "../../types/window";

type UseFileSystemItemLauncherParams = {
  navigateTo: (location: string) => void;
};

function getApplicationIcon(appId: WindowAppId) {
  switch (appId) {
    case "computer":
      return computerIcon;

    case "browser":
      return browserIcon;

    case "projects":
    case "project-viewer":
      return projectsIcon;

    case "documents":
    case "notepad":
    case "pdf-viewer":
    case "image-viewer":
      return documentsIcon;

    case "terminal":
      return terminalIcon;

    case "recycle-bin":
      return emptyTrashIcon;

    case "control-panel":
      return computerIcon;

    default:
      return documentsIcon;
  }
}

function getApplicationTitle(
  item: Extract<
    FileSystemItem,
    {
      type: "application";
    }
  >,
) {
  switch (item.appId) {
    case "terminal":
      return "Terminal - HOSSOMII OS";

    case "control-panel":
      return "Painel de Controle";

    default:
      return item.name;
  }
}

export function useFileSystemItemLauncher({
  navigateTo,
}: UseFileSystemItemLauncherParams) {
  const getItem = useFileSystemStore((state) => state.getItem);

  const openWindow = useWindowStore((state) => state.openWindow);

  function openItem(item: FileSystemItem) {
    if (item.type === "directory") {
      navigateTo(item.id);

      return;
    }

    if (item.type === "shortcut") {
      const targetItem = getItem(item.targetId);

      if (!targetItem) {
        return;
      }

      openItem(targetItem);

      return;
    }

    if (item.type === "application") {
      if (item.appId === "project-viewer") {
        const projectId = item.data?.projectId;

        if (!projectId) {
          return;
        }

        const project = getItem(projectId);

        const projectIcon = getFileSystemIcon(project?.iconId);

        openWindow({
          appId: "project-viewer",

          instanceId: item.instanceId ?? projectId,

          title: `${project?.name ?? "Projeto"} - HOSSOMII Portfolio`,

          icon: projectIcon ?? projectsIcon,

          data: {
            projectId,
          },
        });

        return;
      }

      openWindow({
        appId: item.appId,

        instanceId: item.instanceId,

        title: getApplicationTitle(item),

        icon: getApplicationIcon(item.appId),

        data: item.data,
      });

      return;
    }

    const extension = item.extension.toLowerCase();

    const imageExtensions = ["webp", "png", "jpg", "jpeg"];

    if (extension === "txt") {
      openWindow({
        appId: "notepad",

        instanceId: item.id,

        title: `${item.name} - Bloco de Notas`,

        icon: documentsIcon,

        data: {
          fileId: item.id,
        },
      });

      return;
    }

    if (extension === "pdf") {
      openWindow({
        appId: "pdf-viewer",

        instanceId: item.id,

        title: `${item.name} - Visualizador de PDF`,

        icon: documentsIcon,

        data: {
          fileId: item.id,
        },
      });

      return;
    }

    if (imageExtensions.includes(extension)) {
      openWindow({
        appId: "image-viewer",

        instanceId: item.id,

        title: `${item.name} - Visualizador de Imagens`,

        icon: documentsIcon,

        data: {
          fileId: item.id,
        },
      });

      return;
    }

    if (extension === "sys") {
      console.log(`Arquivo de sistema: ${item.name}`);

      return;
    }

    console.log(`Nenhum aplicativo associado a: ${item.name}`);
  }

  return {
    openItem,
  };
}
