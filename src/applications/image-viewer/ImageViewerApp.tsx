import { useFileSystemStore } from "../../stores/filesystemStore";

type ImageViewerAppProps = {
  fileId: string;
};

export function ImageViewerApp({
  fileId,
}: ImageViewerAppProps) {
  const file = useFileSystemStore(
    (state) =>
      state.items.find(
        (item) => item.id === fileId
      )
  );

  if (
    !file ||
    file.type !== "file" ||
    !file.resourceUrl
  ) {
    return (
      <div className="image-viewer-app">
        <div className="image-viewer-error">
          Não foi possível abrir esta imagem.
        </div>
      </div>
    );
  }

  return (
    <div className="image-viewer-app">
      <div className="image-viewer-toolbar">
        <span>{file.name}</span>

        <a
          href={file.resourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          Abrir original
        </a>
      </div>

      <div className="image-viewer-canvas">
        <img
          src={file.resourceUrl}
          alt={file.name}
          draggable={false}
        />
      </div>
    </div>
  );
}