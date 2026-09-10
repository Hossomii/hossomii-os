import { useState } from "react";

import { useSystemStore } from "../stores/systemStore";

import computerIcon from "../assets/icons/computer.webp";
import projectsIcon from "../assets/icons/projects.webp";
import documentsIcon from "../assets/icons/documents.webp";
import terminalIcon from "../assets/icons/terminal.webp";
import emptyTrashIcon from "../assets/icons/empty-trash.webp";

import { DesktopIcon } from "./components/DesktopIcon";
import { StartMenu } from "./components/StartMenu";
import { Taskbar } from "./components/Taskbar";

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
];

export function Desktop() {
  const resetSystem = useSystemStore(
    (state) => state.resetSystem
  );

  const [selectedIcon, setSelectedIcon] =
    useState<string | null>(null);

  const [startMenuOpen, setStartMenuOpen] =
    useState(false);

  function handleDesktopClick() {
    setSelectedIcon(null);
    setStartMenuOpen(false);
  }

  function handleOpenItem(id: string) {
    console.log(`Abrindo: ${id}`);
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
            selected={selectedIcon === item.id}
            onSelect={setSelectedIcon}
            onOpen={() => handleOpenItem(item.id)}
          />
        ))}
      </div>

      <StartMenu
        open={startMenuOpen}
        onRestart={resetSystem}
      />

      <Taskbar
        startMenuOpen={startMenuOpen}
        onStartToggle={() =>
          setStartMenuOpen(
            (currentState) => !currentState
          )
        }
      />
    </main>
  );
}