import type {
  ReactNode,
} from "react";

import type {
  OSWindow,
} from "../../types/window";

import {
  WindowFrame,
} from "./WindowFrame";

import {
  QuickViewApp,
} from "../../applications/quick-view/QuickViewApp";

import {
  ComputerApp,
} from "../../applications/computer/ComputerApp";

import {
  BrowserApp,
} from "../../applications/browser/BrowserApp";

import {
  DocumentsApp,
} from "../../applications/documents/DocumentsApp";

import {
  ProjectsApp,
} from "../../applications/projects/ProjectsApp";

import {
  RecycleBinApp,
} from "../../applications/recycle-bin/RecycleBinApp";

import {
  ControlPanelApp,
} from "../../applications/control-panel/ControlPanelApp";

import {
  NotepadApp,
} from "../../applications/notepad/NotepadApp";

import {
  AchievementAlbumApp,
} from "../../applications/achievement-album/AchievementAlbumApp";

import {
  TerminalApp,
} from "../../applications/terminal/TerminalApp";

import {
  PdfViewerApp,
} from "../../applications/pdf/PdfViewerApp";

import {
  ImageViewerApp,
} from "../../applications/image-viewer/ImageViewerApp";

import {
  ProjectViewerApp,
} from "../../applications/project-viewer/ProjectViewerApp";

type DesktopWindowProps = {
  windowItem:
    OSWindow;
};

function getWindowContent(
  windowItem:
    OSWindow,
):
  ReactNode {
  switch (
    windowItem.appId
  ) {
    case "quick-view":
      return (
        <QuickViewApp />
      );

    case "computer":
      return (
        <ComputerApp />
      );

    case "browser":
      return (
        <BrowserApp />
      );

    case "documents":
      return (
        <DocumentsApp />
      );

    case "projects":
      return (
        <ProjectsApp />
      );

    case "recycle-bin":
      return (
        <RecycleBinApp />
      );

    case "control-panel":
      return (
        <ControlPanelApp />
      );

    case "achievement-album":
      return (
        <AchievementAlbumApp />
      );

    case "terminal":
      return (
        <TerminalApp />
      );

    case "notepad": {
      const fileId =
        windowItem.data
          ?.fileId;

      return fileId
        ? (
            <NotepadApp
              fileId={
                fileId
              }
            />
          )
        : null;
    }

    case "pdf-viewer": {
      const fileId =
        windowItem.data
          ?.fileId;

      return fileId
        ? (
            <PdfViewerApp
              fileId={
                fileId
              }
            />
          )
        : null;
    }

    case "image-viewer": {
      const fileId =
        windowItem.data
          ?.fileId;

      return fileId
        ? (
            <ImageViewerApp
              fileId={
                fileId
              }
            />
          )
        : null;
    }

    case "project-viewer": {
      const projectId =
        windowItem.data
          ?.projectId;

      return projectId
        ? (
            <ProjectViewerApp
              projectId={
                projectId
              }
            />
          )
        : null;
    }

    default:
      return null;
  }
}

export function DesktopWindow({
  windowItem,
}: DesktopWindowProps) {
  const content =
    getWindowContent(
      windowItem,
    );

  if (
    !content
  ) {
    return null;
  }

  return (
    <WindowFrame
      windowItem={
        windowItem
      }
    >
      {
        content
      }
    </WindowFrame>
  );
}