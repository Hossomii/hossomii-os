import {
  useEffect,
  useState,
} from "react";

import {
  useSystemStore,
} from "../stores/systemStore";

import {
  useWindowStore,
} from "../stores/windowStore";

import {
  useFileSystemStore,
} from "../stores/filesystemStore";

import {
  useSystemPreferencesStore,
} from "../stores/systemPreferencesStore";

import {
  useAchievementAlbumStore,
} from "../stores/achievementAlbumStore";

import {
  AchievementNotification,
} from "./components/AchievementNotification";

import {
  DesktopIcon,
} from "./components/DesktopIcon";

import {
  DesktopWindow,
} from "./components/DesktopWindow";

import {
  StartMenu,
} from "./components/StartMenu";

import {
  Taskbar,
} from "./components/Taskbar";

import {
  CriticalDeleteFlow,
} from "../system/critical-file/CriticalDeleteFlow";

import {
  DESKTOP_APPLICATIONS,
  QUICK_LAUNCH_APPLICATIONS,
  getApplicationDefinition,
} from "../system/applications/applicationRegistry";

import {
  getAchievementAlbumPage,
} from "../system/achievements/achievementAlbumService";

import {
  playSound,
} from "../system/audio/audioService";

import type {
  WindowAppId,
} from "../types/window";

import type {
  AchievementId,
} from "../system/achievements/types";

import emptyTrashIcon from "../assets/icons/empty-trash.webp";
import defaultTrashIcon from "../assets/icons/default-trash.webp";

import wallpaperDefault from "../assets/wallpapers/default.webp";
import wallpaper01 from "../assets/wallpapers/wallpaper-01.webp";
import wallpaper02 from "../assets/wallpapers/wallpaper-02.webp";
import wallpaper03 from "../assets/wallpapers/wallpaper-03.webp";
import wallpaper04 from "../assets/wallpapers/wallpaper-04.webp";
import wallpaper05 from "../assets/wallpapers/wallpaper-05.webp";

import "../styles/desktop/index.css";

const WALLPAPERS = {
  default:
    wallpaperDefault,

  "wallpaper-01":
    wallpaper01,

  "wallpaper-02":
    wallpaper02,

  "wallpaper-03":
    wallpaper03,

  "wallpaper-04":
    wallpaper04,

  "wallpaper-05":
    wallpaper05,
} as const;

export function Desktop() {
  const restartSystem =
    useSystemStore(
      (
        state,
      ) =>
        state.restartSystem,
    );

  const shutdownSystem =
    useSystemStore(
      (
        state,
      ) =>
        state.shutdownSystem,
    );

  const windows =
    useWindowStore(
      (
        state,
      ) =>
        state.windows,
    );

  const openWindow =
    useWindowStore(
      (
        state,
      ) =>
        state.openWindow,
    );

  const restoreWindow =
    useWindowStore(
      (
        state,
      ) =>
        state.restoreWindow,
    );

  const focusWindow =
    useWindowStore(
      (
        state,
      ) =>
        state.focusWindow,
    );

  const minimizeWindow =
    useWindowStore(
      (
        state,
      ) =>
        state.minimizeWindow,
    );

  const resetWindows =
    useWindowStore(
      (
        state,
      ) =>
        state.resetWindows,
    );

  const fitWindowsToViewport =
    useWindowStore(
      (
        state,
      ) =>
        state.fitWindowsToViewport,
    );

  const fileSystemItems =
    useFileSystemStore(
      (
        state,
      ) =>
        state.items,
    );

  const theme =
    useSystemPreferencesStore(
      (
        state,
      ) =>
        state.theme,
    );

  const wallpaper =
    useSystemPreferencesStore(
      (
        state,
      ) =>
        state.wallpaper,
    );

  const setAchievementAlbumPage =
    useAchievementAlbumStore(
      (
        state,
      ) =>
        state.setCurrentPage,
    );

  const [
    selectedIcon,
    setSelectedIcon,
  ] =
    useState<
      | string
      | null
    >(
      null,
    );

  const [
    startMenuOpen,
    setStartMenuOpen,
  ] =
    useState(
      false,
    );

  useEffect(
    () => {
      function handleResize() {
        fitWindowsToViewport();
      }

      window.addEventListener(
        "resize",
        handleResize,
      );

      return () => {
        window.removeEventListener(
          "resize",
          handleResize,
        );
      };
    },
    [
      fitWindowsToViewport,
    ],
  );

  const trashIsEmpty =
    !fileSystemItems.some(
      (
        item,
      ) =>
        item.trashed,
    );

  const trashIcon =
    trashIsEmpty
      ? emptyTrashIcon
      : defaultTrashIcon;

  const wallpaperImage =
    WALLPAPERS[
      wallpaper
    ] ??
    wallpaperDefault;

  const activeWindow =
    windows
      .filter(
        (
          windowItem,
        ) =>
          !windowItem.minimized,
      )
      .sort(
        (
          first,
          second,
        ) =>
          second.zIndex -
          first.zIndex,
      )[
        0
      ] ??
    null;

  function getRuntimeApplicationIcon(
    id:
      WindowAppId,
  ) {
    if (
      id ===
      "recycle-bin"
    ) {
      return trashIcon;
    }

    return getApplicationDefinition(
      id,
    ).icon;
  }

  function handleOpenItem(
    id:
      WindowAppId,
  ) {
    setStartMenuOpen(
      false,
    );

    const application =
      getApplicationDefinition(
        id,
      );

    if (
      application.folderLike
    ) {
      void playSound(
        "ui-folder-open",
      );
    }

    openWindow({
      appId:
        id,

      title:
        application.windowTitle,

      icon:
        getRuntimeApplicationIcon(
          id,
        ),
    });
  }

  function handleOpenAchievementInAlbum(
    id:
      AchievementId,
  ) {
    setAchievementAlbumPage(
      getAchievementAlbumPage(
        id,
      ),
    );

    handleOpenItem(
      "achievement-album",
    );
  }

  function handleTaskbarWindowClick(
    id:
      (typeof windows)[number]["id"],
  ) {
    const windowItem =
      windows.find(
        (
          item,
        ) =>
          item.id ===
          id,
      );

    if (
      !windowItem
    ) {
      return;
    }

    if (
      windowItem.minimized
    ) {
      restoreWindow(
        id,
      );

      return;
    }

    if (
      activeWindow?.id ===
      id
    ) {
      minimizeWindow(
        id,
      );

      return;
    }

    focusWindow(
      id,
    );
  }

  function handleRestart() {
    setStartMenuOpen(
      false,
    );

    setSelectedIcon(
      null,
    );

    resetWindows();

    restartSystem();
  }

  function handleShutdown() {
    setStartMenuOpen(
      false,
    );

    setSelectedIcon(
      null,
    );

    void playSound(
      "system-shutdown",
    );

    resetWindows();

    shutdownSystem();
  }

  const desktopItems =
    DESKTOP_APPLICATIONS.map(
      (
        application,
      ) => ({
        id:
          application.id,

        label:
          application.desktopLabel ??
          application.name,

        icon:
          getRuntimeApplicationIcon(
            application.id,
          ),
      }),
    );

  const quickLaunchItems =
    QUICK_LAUNCH_APPLICATIONS.map(
      (
        application,
      ) => ({
        id:
          application.id,

        title:
          application.quickLaunchTitle ??
          application.name,

        icon:
          getRuntimeApplicationIcon(
            application.id,
          ),

        onOpen:
          () =>
            handleOpenItem(
              application.id,
            ),
      }),
    );

  return (
    <main
      className="desktop"
      data-theme={
        theme
      }
      data-wallpaper={
        wallpaper
      }
      style={{
        backgroundImage:
          `url(${wallpaperImage})`,
      }}
      onClick={() => {
        setSelectedIcon(
          null,
        );

        setStartMenuOpen(
          false,
        );
      }}
    >
      <div className="desktop-icons">
        {desktopItems.map(
          (
            item,
          ) => (
            <DesktopIcon
              key={
                item.id
              }
              id={
                item.id
              }
              label={
                item.label
              }
              icon={
                item.icon
              }
              selected={
                selectedIcon ===
                item.id
              }
              onSelect={
                setSelectedIcon
              }
              onOpen={() =>
                handleOpenItem(
                  item.id,
                )
              }
            />
          ),
        )}
      </div>

      {windows.map(
        (
          windowItem,
        ) => (
          <DesktopWindow
            key={
              windowItem.id
            }
            windowItem={
              windowItem
            }
          />
        ),
      )}

      <CriticalDeleteFlow />

      <AchievementNotification
        onOpenInAlbum={
          handleOpenAchievementInAlbum
        }
      />

      <StartMenu
        open={
          startMenuOpen
        }
        onRestart={
          handleRestart
        }
        onShutdown={
          handleShutdown
        }
        onOpenItem={
          handleOpenItem
        }
      />

      <Taskbar
        startMenuOpen={
          startMenuOpen
        }
        windows={
          windows
        }
        activeWindowId={
          activeWindow?.id ??
          null
        }
        quickLaunchItems={
          quickLaunchItems
        }
        onStartToggle={() =>
          setStartMenuOpen(
            (
              current,
            ) =>
              !current,
          )
        }
        onWindowClick={
          handleTaskbarWindowClick
        }
      />
    </main>
  );
}