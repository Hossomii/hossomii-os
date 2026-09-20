import { create } from "zustand";

export type AchievementId =
  | "i-warned-you";

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
};

type AchievementStore = {
  unlockedAchievements: AchievementId[];

  pendingNotifications: AchievementId[];

  unlockAchievement: (
    id: AchievementId
  ) => void;

  dismissNotification: () => void;

  hasUnlocked: (
    id: AchievementId
  ) => boolean;
};

export const useAchievementStore =
  create<AchievementStore>(
    (set, get) => ({
      unlockedAchievements: [],

      pendingNotifications: [],

      unlockAchievement: (id) => {
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

        set((state) => ({
          unlockedAchievements: [
            ...state.unlockedAchievements,
            id,
          ],

          pendingNotifications: [
            ...state.pendingNotifications,
            id,
          ],
        }));
      },

      dismissNotification: () => {
        set((state) => ({
          pendingNotifications:
            state.pendingNotifications.slice(
              1
            ),
        }));
      },

      hasUnlocked: (id) => {
        return get().unlockedAchievements.includes(
          id
        );
      },
    })
  );