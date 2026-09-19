import { useFileSystemStore } from "../../stores/filesystemStore";
import { useWindowStore } from "../../stores/windowStore";

import documentsIcon from "../../assets/icons/documents.webp";

import type { FileSystemItem } from "../../types/filesystem";

type UseFileSystemItemLauncherParams = {
  navigateTo: (location: string) => void;
};

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
      console.log(`Aplicativo ainda não conectado: ${item.appId}`);

      return;
    }

    const extension = item.extension.toLowerCase();

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
