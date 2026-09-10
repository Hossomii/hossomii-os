import { useState } from "react";

import { useSystemStore } from "../stores/systemStore";
import { useWindowStore } from "../stores/windowStore";

import type { WindowAppId } from "../types/window";

import computerIcon from "../assets/icons/computer.webp";
import projectsIcon from "../assets/icons/projects.webp";
import documentsIcon from "../assets/icons/documents.webp";
import terminalIcon from "../assets/icons/terminal.webp";
import emptyTrashIcon from "../assets/icons/empty-trash.webp";

import { ComputerApp } from "../applications/computer/ComputerApp";

import { DesktopIcon } from "./components/DesktopIcon";
import { StartMenu } from "./components/StartMenu";
import { Taskbar } from "./components/Taskbar";
import { WindowFrame } from "./components/WindowFrame";

import "../styles/desktop.css";

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
    icon: emptyTrashIcon,
  },
] as const;

export function Desktop() {
  const resetSystem = useSystemStore(
    (state) => state.resetSystem
  );

  const windows = useWindowStore(
    (state) => state.windows
  );

  const openWindow = useWindowStore(
    (state) => state.openWindow
  );

  const restoreWindow = useWindowStore(
    (state) => state.restoreWindow
  );

  const focusWindow = useWindowStore(
    (state) => state.focusWindow
  );

  const minimizeWindow = useWindowStore(
    (state) => state.minimizeWindow
  );

  const resetWindows = useWindowStore(
    (state) => state.resetWindows
  );

  const [selectedIcon, setSelectedIcon] =
    useState<string | null>(null);

  const [startMenuOpen, setStartMenuOpen] =
    useState(false);

  const activeWindow =
    windows
      .filter(
        (windowItem) =>
          !windowItem.minimized
      )
      .sort(
        (a, b) =>
          b.zIndex - a.zIndex
      )[0] ?? null;

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

    console.log(`Abrindo: ${id}`);
  }

  function handleTaskbarWindowClick(
    id: (typeof windows)[number]["id"]
  ) {
    const windowItem = windows.find(
      (item) => item.id === id
    );

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
    <main
      className="desktop"
      onClick={handleDesktopClick}
    >
      <div className="desktop-icons">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            selected={
              selectedIcon === item.id
            }
            onSelect={setSelectedIcon}
            onOpen={() =>
              handleOpenItem(item.id)
            }
          />
        ))}
      </div>

      {windows.map((windowItem) => {
        if (
          windowItem.appId === "computer"
        ) {
          return (
            <WindowFrame
              key={windowItem.id}
              windowItem={windowItem}
            >
              <ComputerApp />
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
        activeWindowId={
          activeWindow?.id ?? null
        }
        onStartToggle={() =>
          setStartMenuOpen(
            (currentState) =>
              !currentState
          )
        }
        onWindowClick={
          handleTaskbarWindowClick
        }
      />
    </main>
  );
}