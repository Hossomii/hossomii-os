import { useState } from "react";

import { useSystemStore } from "../stores/systemStore";
import { useWindowStore } from "../stores/windowStore";
import { useFileSystemStore } from "../stores/filesystemStore";

import type { WindowAppId } from "../types/window";

import computerIcon from "../assets/icons/computer.webp";
import projectsIcon from "../assets/icons/projects.webp";
import documentsIcon from "../assets/icons/documents.webp";
import terminalIcon from "../assets/icons/terminal.webp";
import emptyTrashIcon from "../assets/icons/empty-trash.webp";
import defaultTrashIcon from "../assets/icons/default-trash.webp";

import { ComputerApp } from "../applications/computer/ComputerApp";
import { DocumentsApp } from "../applications/documents/DocumentsApp";
import { ProjectsApp } from "../applications/projects/ProjectsApp";
import { RecycleBinApp } from "../applications/recycle-bin/RecycleBinApp";

import { DesktopIcon } from "./components/DesktopIcon";
import { StartMenu } from "./components/StartMenu";
import { Taskbar } from "./components/Taskbar";
import { WindowFrame } from "./components/WindowFrame";

import { NotepadApp } from "../applications/notepad/NotepadApp";
import { PdfViewerApp } from "../applications/pdf/PdfViewerApp";
import { ImageViewerApp } from "../applications/image-viewer/ImageViewerApp";
import { ProjectViewerApp } from "../applications/project-viewer/ProjectViewerApp";

import "../styles/desktop.css";

export function Desktop() {
  const resetSystem = useSystemStore((state) => state.resetSystem);

  const windows = useWindowStore((state) => state.windows);

  const openWindow = useWindowStore((state) => state.openWindow);

  const restoreWindow = useWindowStore((state) => state.restoreWindow);

  const focusWindow = useWindowStore((state) => state.focusWindow);

  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);

  const resetWindows = useWindowStore((state) => state.resetWindows);

  const fileSystemItems = useFileSystemStore((state) => state.items);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const trashIsEmpty = !fileSystemItems.some((item) => item.trashed);

  const trashIcon = trashIsEmpty ? emptyTrashIcon : defaultTrashIcon;

  const desktopItems = [
    {
      id: "computer",
      label: "Meu Computador",
      icon: computerIcon,
    },
    {
      id: "projects",
      label: "Meus Projetos",
      icon: projectsIcon,
    },
    {
      id: "documents",
      label: "Meus Documentos",
      icon: documentsIcon,
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: terminalIcon,
    },
    {
      id: "recycle-bin",
      label: "Lixeira",
      icon: trashIcon,
    },
  ] as const;

  const activeWindow =
    windows
      .filter((windowItem) => !windowItem.minimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0] ?? null;

  function handleDesktopClick() {
    setSelectedIcon(null);
    setStartMenuOpen(false);
  }

  function handleOpenItem(id: WindowAppId) {
    setStartMenuOpen(false);

    if (id === "computer") {
      openWindow({
        appId: "computer",
        title: "Meu Computador",
        icon: computerIcon,
      });

      return;
    }

    if (id === "documents") {
      openWindow({
        appId: "documents",
        title: "Meus Documentos",
        icon: documentsIcon,
      });

      return;
    }

    if (id === "projects") {
      openWindow({
        appId: "projects",
        title: "Meus Projetos",
        icon: projectsIcon,
      });

      return;
    }

    if (id === "recycle-bin") {
      openWindow({
        appId: "recycle-bin",
        title: "Lixeira",
        icon: trashIcon,
      });

      return;
    }

    console.log(`Abrindo: ${id}`);
  }

  function handleTaskbarWindowClick(id: (typeof windows)[number]["id"]) {
    const windowItem = windows.find((item) => item.id === id);

    if (!windowItem) {
      return;
    }

    if (windowItem.minimized) {
      restoreWindow(id);
      return;
    }

    if (activeWindow?.id === id) {
      minimizeWindow(id);
      return;
    }

    focusWindow(id);
  }

  function handleRestart() {
    setStartMenuOpen(false);
    setSelectedIcon(null);

    resetWindows();
    resetSystem();
  }

  return (
    <main className="desktop" onClick={handleDesktopClick}>
      <div className="desktop-icons">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            selected={selectedIcon === item.id}
            onSelect={setSelectedIcon}
            onOpen={() => handleOpenItem(item.id)}
          />
        ))}
      </div>

      {windows.map((windowItem) => {
        if (windowItem.appId === "computer") {
          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <ComputerApp />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "documents") {
          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <DocumentsApp />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "projects") {
          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <ProjectsApp />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "recycle-bin") {
          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <RecycleBinApp />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "notepad") {
          const fileId = windowItem.data?.fileId;

          if (!fileId) {
            return null;
          }

          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <NotepadApp fileId={fileId} />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "pdf-viewer") {
          const fileId = windowItem.data?.fileId;

          if (!fileId) {
            return null;
          }

          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <PdfViewerApp fileId={fileId} />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "image-viewer") {
          const fileId = windowItem.data?.fileId;

          if (!fileId) {
            return null;
          }

          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <ImageViewerApp fileId={fileId} />
            </WindowFrame>
          );
        }

        if (windowItem.appId === "project-viewer") {
          const projectId = windowItem.data?.projectId;

          if (!projectId) {
            return null;
          }

          return (
            <WindowFrame key={windowItem.id} windowItem={windowItem}>
              <ProjectViewerApp projectId={projectId} />
            </WindowFrame>
          );
        }

        return null;
      })}

      <StartMenu
        open={startMenuOpen}
        onRestart={handleRestart}
        onOpenItem={handleOpenItem}
      />

      <Taskbar
        startMenuOpen={startMenuOpen}
        windows={windows}
        activeWindowId={activeWindow?.id ?? null}
        onStartToggle={() => setStartMenuOpen((currentState) => !currentState)}
        onWindowClick={handleTaskbarWindowClick}
      />
    </main>
  );
}
