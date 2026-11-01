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

  currentPage:
    number;

  markPasted: (
    id:
      AchievementId,
  ) => boolean;

  hasPasted: (
    id:
      AchievementId,
  ) => boolean;

  getPastedAt: (
    id:
      AchievementId,
  ) =>
    | string
    | undefined;

  setCurrentPage: (
    page:
      number,
  ) => void;

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

        currentPage:
          0,

        markPasted: (
          id,
        ) => {
          if (
            get().pastedAchievements.includes(
              id,
            )
          ) {
            return false;
          }

          const pastedAt =
            new Date().toISOString();

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
        ) =>
          get().pastedAchievements.includes(
            id,
          ),

        getPastedAt: (
          id,
        ) =>
          get().pastedAtById[
            id
          ],

        setCurrentPage: (
          page,
        ) => {
          set({
            currentPage:
              Math.max(
                0,
                Math.floor(
                  page,
                ),
              ),
          });
        },

        resetAlbum:
          () => {
            set({
              pastedAchievements:
                [],

              pastedAtById:
                {},

              currentPage:
                0,
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