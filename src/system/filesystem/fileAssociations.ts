import type {
  WindowAppId,
} from "../../types/window";

type FileAssociationAppId =
  Extract<
    WindowAppId,
    | "notepad"
    | "pdf-viewer"
    | "image-viewer"
  >;

export type FileAssociation = {
  appId:
    FileAssociationAppId;

  titleSuffix:
    string;
};

const FILE_ASSOCIATIONS:
  Record<
    string,
    FileAssociation
  > = {
    txt: {
      appId:
        "notepad",

      titleSuffix:
        "Bloco de Notas",
    },

    log: {
      appId:
        "notepad",

      titleSuffix:
        "Bloco de Notas",
    },

    ini: {
      appId:
        "notepad",

      titleSuffix:
        "Bloco de Notas",
    },

    pdf: {
      appId:
        "pdf-viewer",

      titleSuffix:
        "Visualizador de PDF",
    },

    webp: {
      appId:
        "image-viewer",

      titleSuffix:
        "Visualizador de Imagens",
    },

    png: {
      appId:
        "image-viewer",

      titleSuffix:
        "Visualizador de Imagens",
    },

    jpg: {
      appId:
        "image-viewer",

      titleSuffix:
        "Visualizador de Imagens",
    },

    jpeg: {
      appId:
        "image-viewer",

      titleSuffix:
        "Visualizador de Imagens",
    },
  };

export function getFileAssociation(
  extension:
    string,
) {
  return (
    FILE_ASSOCIATIONS[
      extension.toLowerCase()
    ] ??
    null
  );
}