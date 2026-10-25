import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

import type {
  AchievementId,
} from "../system/achievements/types";

type AchievementAlbumStore = {
  pastedAchievements:
    AchievementId[];

  pastedAtById:
    Partial<
      Record<
        AchievementId,
        string
      >
    >;

  markPasted: (
    id: AchievementId,
  ) => boolean;

  hasPasted: (
    id: AchievementId,
  ) => boolean;

  getPastedAt: (
    id: AchievementId,
  ) =>
    string |
    undefined;

  resetAlbum:
    () => void;
};

export const useAchievementAlbumStore =
  create<AchievementAlbumStore>()(
    persist(
      (
        set,
        get,
      ) => ({
        pastedAchievements:
          [],

        pastedAtById:
          {},

        markPasted: (
          id,
        ) => {
          if (
            get()
              .pastedAchievements
              .includes(
                id,
              )
          ) {
            return false;
          }

          const pastedAt =
            new Date()
              .toISOString();

          set(
            (
              state,
            ) => ({
              pastedAchievements:
                [
                  ...state.pastedAchievements,
                  id,
                ],

              pastedAtById:
                {
                  ...state.pastedAtById,

                  [id]:
                    pastedAt,
                },
            }),
          );

          return true;
        },

        hasPasted: (
          id,
        ) => {
          return get()
            .pastedAchievements
            .includes(
              id,
            );
        },

        getPastedAt: (
          id,
        ) => {
          return get()
            .pastedAtById[
              id
            ];
        },

        resetAlbum:
          () => {
            set({
              pastedAchievements:
                [],

              pastedAtById:
                {},
            });
          },
      }),

      {
        name:
          "hossomii-os-achievement-album",

        version:
          1,

        partialize: (
          state,
        ) => ({
          pastedAchievements:
            state.pastedAchievements,

          pastedAtById:
            state.pastedAtById,
        }),
      },
    ),
  );