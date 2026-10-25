import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

import {
  ACHIEVEMENTS,
} from "../system/achievements/achievementRegistry";

import type {
  AchievementDefinition,
  AchievementId,
} from "../system/achievements/types";

export {
  ACHIEVEMENTS,
};

export type {
  AchievementDefinition,
  AchievementId,
};

type AchievementStore = {
  unlockedAchievements:
    AchievementId[];

  unlockedAtById:
    Partial<
      Record<
        AchievementId,
        string
      >
    >;

  pendingNotifications:
    AchievementId[];

  unlockAchievement: (
    id: AchievementId,
  ) => void;

  dismissNotification:
    () => void;

  hasUnlocked: (
    id: AchievementId,
  ) => boolean;

  getUnlockedAt: (
    id: AchievementId,
  ) =>
    string |
    undefined;
};

export const useAchievementStore =
  create<AchievementStore>()(
    persist(
      (
        set,
        get,
      ) => ({
        unlockedAchievements:
          [],

        unlockedAtById:
          {},

        pendingNotifications:
          [],

        unlockAchievement: (
          id,
        ) => {
          const {
            unlockedAchievements,
          } =
            get();

          if (
            unlockedAchievements.includes(
              id,
            )
          ) {
            return;
          }

          const unlockedAt =
            new Date()
              .toISOString();

          set(
            (
              state,
            ) => ({
              unlockedAchievements:
                [
                  ...state.unlockedAchievements,
                  id,
                ],

              unlockedAtById:
                {
                  ...state.unlockedAtById,

                  [id]:
                    unlockedAt,
                },

              pendingNotifications:
                [
                  ...state.pendingNotifications,
                  id,
                ],
            }),
          );
        },

        dismissNotification:
          () => {
            set(
              (
                state,
              ) => ({
                pendingNotifications:
                  state.pendingNotifications.slice(
                    1,
                  ),
              }),
            );
          },

        hasUnlocked: (
          id,
        ) => {
          return get()
            .unlockedAchievements
            .includes(
              id,
            );
        },

        getUnlockedAt: (
          id,
        ) => {
          return get()
            .unlockedAtById[
              id
            ];
        },
      }),

      {
        name:
          "hossomii-os-achievements",

        /*
         * Mantemos a versão 1 porque a alteração
         * é aditiva.
         *
         * Estados antigos possuem
         * unlockedAchievements e continuam válidos.
         *
         * unlockedAtById simplesmente começa vazio
         * para conquistas desbloqueadas em versões
         * anteriores.
         */
        version:
          1,

        partialize: (
          state,
        ) => ({
          unlockedAchievements:
            state.unlockedAchievements,

          unlockedAtById:
            state.unlockedAtById,
        }),
      },
    ),
  );