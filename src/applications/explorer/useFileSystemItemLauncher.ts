import { useFileSystemStore } from "../../stores/filesystemStore";

import { useWindowStore } from "../../stores/windowStore";

import projectsIcon from "../../assets/icons/projects.webp";
import documentsIcon from "../../assets/icons/documents.webp";

import {
  getFileExtensionIcon,
  getFileSystemIcon,
} from "../../system/filesystem/iconRegistry";

import {
  getApplicationDefinition,
} from "../../system/applications/applicationRegistry";

import {
  getFileAssociation,
} from "../../system/filesystem/fileAssociations";

import {
  evaluateNarrative,
} from "../../system/narrative/narrativeService";

import type {
  FileSystemItem,
} from "../../types/filesystem";

type UseFileSystemItemLauncherParams = {
  navigateTo: (
    location: string,
  ) => void;
};

function registerFileOpened(
  itemId: string,
) {
  void evaluateNarrative({
    trigger:
      "file-opened",

    itemId,
  });
}

export function useFileSystemItemLauncher({
  navigateTo,
}: UseFileSystemItemLauncherParams) {
  const getItem =
    useFileSystemStore(
      (
        state,
      ) =>
        state.getItem,
    );

  const openWindow =
    useWindowStore(
      (
        state,
      ) =>
        state.openWindow,
    );

  function openItem(
    item:
      FileSystemItem,
  ) {
    if (
      item.type ===
      "directory"
    ) {
      navigateTo(
        item.id,
      );

      return;
    }

    if (
      item.type ===
      "shortcut"
    ) {
      const targetItem =
        getItem(
          item.targetId,
        );

      if (!targetItem) {
        return;
      }

      openItem(
        targetItem,
      );

      return;
    }

    if (
      item.type ===
      "application"
    ) {
      if (
        item.appId ===
        "project-viewer"
      ) {
        const projectId =
          item.data
            ?.projectId;

        if (!projectId) {
          return;
        }

        const project =
          getItem(
            projectId,
          );

        const projectIcon =
          getFileSystemIcon(
            project?.iconId,
          );

        openWindow({
          appId:
            "project-viewer",

          instanceId:
            item.instanceId ??
            projectId,

          title:
            `${project?.name ?? "Projeto"} - HOSSOMII Portfolio`,

          icon:
            projectIcon ??
            projectsIcon,

          data: {
            projectId,
          },
        });

        return;
      }

      const application =
        getApplicationDefinition(
          item.appId,
        );

      openWindow({
        appId:
          item.appId,

        instanceId:
          item.instanceId,

        title:
          application.windowTitle,

        icon:
          application.icon,

        data:
          item.data,
      });

      return;
    }

    const extension =
      item.extension.toLowerCase();

    const association =
      getFileAssociation(
        extension,
      );

    if (
      association
    ) {
      registerFileOpened(
        item.id,
      );

      openWindow({
        appId:
          association.appId,

        instanceId:
          item.id,

        title:
          `${item.name} - ${association.titleSuffix}`,

        icon:
          getFileExtensionIcon(
            extension,
          ) ??
          documentsIcon,

        data: {
          fileId:
            item.id,
        },
      });

      return;
    }

    if (
      extension ===
      "sys"
    ) {
      console.log(
        `Arquivo de sistema: ${item.name}`,
      );

      return;
    }

    console.log(
      `Nenhum aplicativo associado a: ${item.name}`,
    );
  }

  return {
    openItem,
  };
}