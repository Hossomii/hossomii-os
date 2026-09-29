import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

export type AchievementId =
  | "i-warned-you"
  | "first-text-file"
  | "first-pdf-file"
  | "first-delete"
  | "first-external-link";

export type AchievementDefinition = {
  id: AchievementId;

  title: string;

  description: string;
};

export const ACHIEVEMENTS: Record<
  AchievementId,
  AchievementDefinition
> = {
  "i-warned-you": {
    id: "i-warned-you",

    title: "Eu avisei.",

    description:
      "Recupere o HOSSOMII OS depois de excluir um arquivo crítico.",
  },

  "first-text-file": {
    id: "first-text-file",

    title:
      "Leitura obrigatória",

    description:
      "Abra um arquivo de texto pela primeira vez.",
  },

  "first-pdf-file": {
    id: "first-pdf-file",

    title:
      "Papelada digital",

    description:
      "Abra um documento PDF pela primeira vez.",
  },

  "first-delete": {
    id: "first-delete",

    title:
      "Sem apego",

    description:
      "Mova seu primeiro arquivo para a Lixeira.",
  },

  "first-external-link": {
    id: "first-external-link",

    title:
      "Saindo da rede",

    description:
      "Abra um link externo pela primeira vez.",
  },
};

type AchievementStore = {
  unlockedAchievements:
    AchievementId[];

  pendingNotifications:
    AchievementId[];

  unlockAchievement: (
    id: AchievementId
  ) => void;

  dismissNotification:
    () => void;

  hasUnlocked: (
    id: AchievementId
  ) => boolean;
};

export const useAchievementStore =
  create<AchievementStore>()(
    persist(
      (
        set,
        get
      ) => ({
        unlockedAchievements:
          [],

        pendingNotifications:
          [],

        unlockAchievement: (
          id
        ) => {
          const {
            unlockedAchievements,
          } = get();

          if (
            unlockedAchievements.includes(
              id
            )
          ) {
            return;
          }

          set(
            (
              state
            ) => ({
              unlockedAchievements:
                [
                  ...state.unlockedAchievements,
                  id,
                ],

              pendingNotifications:
                [
                  ...state.pendingNotifications,
                  id,
                ],
            })
          );
        },

        dismissNotification:
          () => {
            set(
              (
                state
              ) => ({
                pendingNotifications:
                  state.pendingNotifications.slice(
                    1
                  ),
              })
            );
          },

        hasUnlocked: (
          id
        ) => {
          return get().unlockedAchievements.includes(
            id
          );
        },
      }),
      {
        name:
          "hossomii-os-achievements",

        version: 1,

        partialize: (
          state
        ) => ({
          unlockedAchievements:
            state.unlockedAchievements,
        }),
      }
    )
  );