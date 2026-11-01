import {
  useAchievementAlbumStore,
} from "../../stores/achievementAlbumStore";

import {
  useAchievementStore,
} from "../../stores/achievementStore";

import {
  ACHIEVEMENT_LIST,
} from "./achievementRegistry";

import type {
  AchievementId,
} from "./types";

export const ACHIEVEMENT_STICKERS_PER_PAGE =
  3;

export function getAchievementAlbumPage(
  id:
    AchievementId,
) {
  const achievementIndex =
    ACHIEVEMENT_LIST.findIndex(
      (
        achievement,
      ) =>
        achievement.id ===
        id,
    );

  if (
    achievementIndex <
    0
  ) {
    return 0;
  }

  return Math.floor(
    achievementIndex /
      ACHIEVEMENT_STICKERS_PER_PAGE,
  );
}

export function pasteAchievementSticker(
  id:
    AchievementId,
) {
  const achievementState =
    useAchievementStore.getState();

  if (
    !achievementState.hasUnlocked(
      id,
    )
  ) {
    return false;
  }

  const pasted =
    useAchievementAlbumStore
      .getState()
      .markPasted(
        id,
      );

  if (
    !pasted
  ) {
    return false;
  }

  achievementState.unlockAchievement(
    "first-sticker-pasted",
  );

  return true;
}