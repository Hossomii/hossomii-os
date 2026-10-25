import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  useAchievementAlbumStore,
} from "../../stores/achievementAlbumStore";

import {
  useAchievementStore,
} from "../../stores/achievementStore";

import {
  pasteAchievementSticker,
} from "./achievementAlbumService";

describe(
  "achievementAlbumService",
  () => {
    beforeEach(
      () => {
        useAchievementStore.setState({
          unlockedAchievements:
            [],

          unlockedAtById:
            {},

          pendingNotifications:
            [],
        });

        useAchievementAlbumStore
          .getState()
          .resetAlbum();
      },
    );

    it(
      "does not paste a locked achievement",
      () => {
        expect(
          pasteAchievementSticker(
            "first-text-file",
          ),
        ).toBe(false);

        expect(
          useAchievementAlbumStore
            .getState()
            .hasPasted(
              "first-text-file",
            ),
        ).toBe(false);
      },
    );

    it(
      "pastes an unlocked achievement",
      () => {
        useAchievementStore
          .getState()
          .unlockAchievement(
            "first-text-file",
          );

        expect(
          pasteAchievementSticker(
            "first-text-file",
          ),
        ).toBe(true);

        expect(
          useAchievementAlbumStore
            .getState()
            .hasPasted(
              "first-text-file",
            ),
        ).toBe(true);
      },
    );

    it(
      "does not paste the same sticker twice",
      () => {
        useAchievementStore
          .getState()
          .unlockAchievement(
            "first-text-file",
          );

        expect(
          pasteAchievementSticker(
            "first-text-file",
          ),
        ).toBe(true);

        expect(
          pasteAchievementSticker(
            "first-text-file",
          ),
        ).toBe(false);
      },
    );

    it(
      "unlocks the collector achievement after the first paste",
      () => {
        useAchievementStore
          .getState()
          .unlockAchievement(
            "first-text-file",
          );

        pasteAchievementSticker(
          "first-text-file",
        );

        expect(
          useAchievementStore
            .getState()
            .hasUnlocked(
              "first-sticker-pasted",
            ),
        ).toBe(true);
      },
    );
  },
);