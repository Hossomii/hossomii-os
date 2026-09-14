import { useFileSystemStore } from "../../stores/filesystemStore";

type NotepadAppProps = {
  fileId: string;
};

export function NotepadApp({
  fileId,
}: NotepadAppProps) {
  const file = useFileSystemStore(
    (state) =>
      state.items.find(
        (item) => item.id === fileId
      )
  );

  if (
    !file ||
    file.type !== "file"
  ) {
    return (
      <div className="notepad-app">
        <div className="notepad-menu">
          <span>Arquivo</span>
          <span>Editar</span>
          <span>Formatar</span>
          <span>Exibir</span>
          <span>Ajuda</span>
        </div>

        <div className="notepad-error">
          Não foi possível abrir este arquivo.
        </div>
      </div>
    );
  }

  return (
    <div className="notepad-app">
      <div className="notepad-menu">
        <button type="button">
          Arquivo
        </button>

        <button type="button">
          Editar
        </button>

        <button type="button">
          Formatar
        </button>

        <button type="button">
          Exibir
        </button>

        <button type="button">
          Ajuda
        </button>
      </div>

      <textarea
        className="notepad-editor"
        value={
          file.content ??
          ""
        }
        readOnly
        spellCheck={false}
        aria-label={`Conteúdo de ${file.name}`}
      />
    </div>
  );
}