export type WindowAppId =
  | "computer"
  | "projects"
  | "documents"
  | "terminal"
  | "recycle-bin";

export type WindowBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type OSWindow = {
  id: WindowAppId;
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

  restoreBounds: WindowBounds | null;
};

export type OpenWindowConfig = {
  appId: WindowAppId;
  title: string;
  icon: string;
};