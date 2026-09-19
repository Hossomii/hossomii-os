import { useFileSystemStore } from "../../stores/filesystemStore";

type PdfViewerAppProps = {
  fileId: string;
};

export function PdfViewerApp({
  fileId,
}: PdfViewerAppProps) {
  const file = useFileSystemStore(
    (state) =>
      state.items.find(
        (item) => item.id === fileId
      )
  );

  if (
    !file ||
    file.type !== "file" ||
    file.extension.toLowerCase() !==
      "pdf"
  ) {
    return (
      <div className="pdf-viewer-app">
        <div className="pdf-viewer-error">
          Não foi possível abrir este PDF.
        </div>
      </div>
    );
  }

  if (!file.resourceUrl) {
    return (
      <div className="pdf-viewer-app">
        <div className="pdf-viewer-error">
          O arquivo PDF não possui um
          recurso associado.
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-app">
      <div className="pdf-viewer-toolbar">
        <span>
          {file.name}
        </span>

        <a
          href={file.resourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          Abrir externamente
        </a>
      </div>

      <iframe
        className="pdf-viewer-frame"
        src={file.resourceUrl}
        title={file.name}
      />
    </div>
  );
}