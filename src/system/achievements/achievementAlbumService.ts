import {
  useAchievementAlbumStore,
} from "../../stores/achievementAlbumStore";

import {
  useAchievementStore,
} from "../../stores/achievementStore";

import type {
  AchievementId,
} from "./types";

export function pasteAchievementSticker(
  id: AchievementId,
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