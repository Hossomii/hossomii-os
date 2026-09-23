type ProtectedItemDialogProps = {
  itemName: string;
  onClose: () => void;
};

export function ProtectedItemDialog({
  itemName,
  onClose,
}: ProtectedItemDialogProps) {
  return (
    <div
      className="system-dialog-backdrop"
      onClick={onClose}
    >
      <section
        className="system-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="protected-dialog-title"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <header className="system-dialog-titlebar">
          <span id="protected-dialog-title">
            Acesso negado
          </span>

          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
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
              Não é possível excluir:
            </p>

            <strong>
              {itemName}
            </strong>

            <p>
              Este item é necessário para
              o funcionamento do sistema.
            </p>
          </div>
        </div>

        <footer className="system-dialog-actions">
          <button
            type="button"
            onClick={onClose}
            autoFocus
          >
            OK
          </button>
        </footer>
      </section>
    </div>
  );
}