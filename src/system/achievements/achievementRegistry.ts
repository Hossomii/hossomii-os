import type {
  AchievementDefinition,
  AchievementId,
} from "./types";

export const ACHIEVEMENTS:
  Record<
    AchievementId,
    AchievementDefinition
  > = {
    "first-text-file": {
      id:
        "first-text-file",

      number:
        1,

      order:
        1,

      title:
        "Leitura obrigatória",

      description:
        "Abra um arquivo de texto pela primeira vez.",

      rarity:
        "common",
    },

    "first-pdf-file": {
      id:
        "first-pdf-file",

      number:
        2,

      order:
        2,

      title:
        "Papelada digital",

      description:
        "Abra um documento PDF pela primeira vez.",

      rarity:
        "common",
    },

    "first-delete": {
      id:
        "first-delete",

      number:
        3,

      order:
        3,

      title:
        "Sem apego",

      description:
        "Mova seu primeiro arquivo para a Lixeira.",

      rarity:
        "common",
    },

    "first-external-link": {
      id:
        "first-external-link",

      number:
        4,

      order:
        4,

      title:
        "Saindo da rede",

      description:
        "Abra um link externo pela primeira vez.",

      rarity:
        "uncommon",
    },

    "i-warned-you": {
      id:
        "i-warned-you",

      number:
        5,

      order:
        5,

      title:
        "Eu avisei.",

      description:
        "Recupere o HOSSOMII OS depois de excluir um arquivo crítico.",

      rarity:
        "special",
    },

    "hidden-archive": {
      id:
        "hidden-archive",

      number:
        6,

      order:
        6,

      title:
        "Fora do índice",

      description:
        "Encontre uma área que a interface gráfica prefere não mostrar.",

      rarity:
        "secret",
    },

    "operator-archive": {
      id:
        "operator-archive",

      number:
        7,

      order:
        7,

      title:
        "Arquivo do Operador",

      description:
        "Descubra registros pessoais preservados no arquivo do sistema.",

      rarity:
        "secret",
    },

    "first-sticker-pasted": {
      id:
        "first-sticker-pasted",

      number:
        8,

      order:
        8,

      title:
        "Colecionador",

      description:
        "Cole sua primeira figurinha no Álbum de Conquistas.",

      rarity:
        "uncommon",
    },
  };

export const ACHIEVEMENT_LIST =
  Object.values(
    ACHIEVEMENTS,
  ).sort(
    (
      first,
      second,
    ) =>
      first.order -
      second.order,
  );