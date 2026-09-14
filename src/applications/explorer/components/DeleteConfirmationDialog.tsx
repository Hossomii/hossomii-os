type DeleteConfirmationDialogProps = {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmationDialog({
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmationDialogProps) {
  return (
    <div
      className="system-dialog-backdrop"
      onClick={onCancel}
    >
      <section
        className="system-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <header className="system-dialog-titlebar">
          <span id="delete-dialog-title">
            Confirmar exclusão de arquivo
          </span>

          <button
            type="button"
            aria-label="Fechar"
            onClick={onCancel}
          >
            ×
          </button>
        </header>

        <div className="system-dialog-content">
          <div
            className="system-dialog-warning"
            aria-hidden="true"
          >
            !
          </div>

          <div>
            <p>
              Tem certeza de que deseja
              enviar:
            </p>

            <strong>
              {itemName}
            </strong>

            <p>
              para a Lixeira?
            </p>
          </div>
        </div>

        <footer className="system-dialog-actions">
          <button
            type="button"
            onClick={onConfirm}
            autoFocus
          >
            Sim
          </button>

          <button
            type="button"
            onClick={onCancel}
          >
            Não
          </button>
        </footer>
      </section>
    </div>
  );
}