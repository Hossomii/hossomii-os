import type { AchievementDefinition, AchievementId } from "./types";

import firstTextFileIcon from "../../assets/achievements/icons/first-text-file.webp";
import firstTextFileSticker from "../../assets/achievements/stickers/first-text-file.webp";

import firstPdfFileIcon from "../../assets/achievements/icons/first-pdf-file.webp";
import firstPdfFileSticker from "../../assets/achievements/stickers/first-pdf-file.webp";

import firstDeleteIcon from "../../assets/achievements/icons/first-delete.webp";
import firstDeleteSticker from "../../assets/achievements/stickers/first-delete.webp";

import firstExternalLinkIcon from "../../assets/achievements/icons/first-external-link.webp";
import firstExternalLinkSticker from "../../assets/achievements/stickers/first-external-link.webp";

import iWarnedYouIcon from "../../assets/achievements/icons/i-warned-you.webp";
import iWarnedYouSticker from "../../assets/achievements/stickers/i-warned-you.webp";

import hiddenArchiveIcon from "../../assets/achievements/icons/hidden-archive.webp";
import hiddenArchiveSticker from "../../assets/achievements/stickers/hidden-archive.webp";

import operatorArchiveIcon from "../../assets/achievements/icons/operator-archive.webp";
import operatorArchiveSticker from "../../assets/achievements/stickers/operator-archive.webp";

import firstStickerPastedIcon from "../../assets/achievements/icons/first-sticker-pasted.webp";
import firstStickerPastedSticker from "../../assets/achievements/stickers/first-sticker-pasted.webp";

export const ACHIEVEMENTS: Record<AchievementId, AchievementDefinition> = {
  "first-text-file": {
    id: "first-text-file",

    number: 1,

    order: 1,

    title: "Leitura obrigatória",

    description: "Abra um arquivo de texto pela primeira vez.",

    rarity: "common",

    icon: firstTextFileIcon,

    stickerImage: firstTextFileSticker,
  },

  "first-pdf-file": {
    id: "first-pdf-file",

    number: 2,

    order: 2,

    title: "Papelada digital",

    description: "Abra um documento PDF pela primeira vez.",

    rarity: "common",

    icon: firstPdfFileIcon,

    stickerImage: firstPdfFileSticker,
  },

  "first-delete": {
    id: "first-delete",

    number: 3,

    order: 3,

    title: "Sem apego",

    description: "Mova seu primeiro arquivo para a Lixeira.",

    rarity: "common",

    icon: firstDeleteIcon,

    stickerImage: firstDeleteSticker,
  },

  "first-external-link": {
    id: "first-external-link",

    number: 4,

    order: 4,

    title: "Saindo da rede",

    description: "Abra um link externo pela primeira vez.",

    rarity: "uncommon",

    icon: firstExternalLinkIcon,

    stickerImage: firstExternalLinkSticker,
  },

  "i-warned-you": {
    id: "i-warned-you",

    number: 5,

    order: 5,

    title: "Eu avisei.",

    description: "Recupere o HOSSOMII OS depois de excluir um arquivo crítico.",

    rarity: "special",

    icon: iWarnedYouIcon,

    stickerImage: iWarnedYouSticker,
  },

  "hidden-archive": {
    id: "hidden-archive",

    number: 6,

    order: 6,

    title: "Fora do índice",

    description:
      "Encontre uma área que a interface gráfica prefere não mostrar.",

    rarity: "secret",

    icon: hiddenArchiveIcon,

    stickerImage: hiddenArchiveSticker,
  },

  "operator-archive": {
    id: "operator-archive",

    number: 7,

    order: 7,

    title: "Arquivo do Operador",

    description:
      "Descubra registros pessoais preservados no arquivo do sistema.",

    rarity: "secret",

    icon: operatorArchiveIcon,

    stickerImage: operatorArchiveSticker,
  },

  "first-sticker-pasted": {
    id: "first-sticker-pasted",

    number: 8,

    order: 8,

    title: "Colecionador",

    description: "Cole sua primeira figurinha no Álbum de Conquistas.",

    rarity: "uncommon",

    icon: firstStickerPastedIcon,

    stickerImage: firstStickerPastedSticker,
  },
};

export const ACHIEVEMENT_LIST = Object.values(ACHIEVEMENTS).sort(
  (first, second) => first.order - second.order,
);
