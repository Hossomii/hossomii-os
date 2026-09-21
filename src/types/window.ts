export type WindowAppId =
  | "computer"
  | "projects"
  | "documents"
  | "terminal"
  | "recycle-bin"
  | "notepad"
  | "pdf-viewer"
  | "image-viewer"
  | "project-viewer";

export type WindowBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowResizeDirection =
  | "n"
  | "ne"
  | "e"
  | "se"
  | "s"
  | "sw"
  | "w"
  | "nw";

export type WindowData = {
  fileId?: string;

  projectId?: string;
};

export type OSWindow = {
  id: string;

  appId: WindowAppId;

  title: string;
  icon: string;

  x: number;
  y: number;

  width: number;
  height: number;

  minimized: boolean;
  maximized: boolean;

  zIndex: number;

  restoreBounds:
    WindowBounds | null;

  data?: WindowData;
};

export type OpenWindowConfig = {
  appId: WindowAppId;

  title: string;
  icon: string;

  /*
   * Diferencia várias janelas
   * da mesma aplicação.
   *
   * Exemplo:
   * notepad:about-file
   * notepad:readme-file
   */
  instanceId?: string;

  /*
   * Informações que a aplicação
   * precisa para saber o que
   * deve exibir.
   */
  data?: WindowData;
};