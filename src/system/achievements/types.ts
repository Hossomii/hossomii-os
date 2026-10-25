export type AchievementId =
  | "first-text-file"
  | "first-pdf-file"
  | "first-delete"
  | "first-external-link"
  | "i-warned-you"
  | "hidden-archive"
  | "operator-archive"
  | "first-sticker-pasted";

export type AchievementRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "special"
  | "secret";

export type AchievementDefinition = {
  id: AchievementId;

  number: number;

  order: number;

  title: string;

  description: string;

  rarity: AchievementRarity;
};