type CriticalItemDialogProps = {
  itemName: string;
  onClose: () => void;
};

export function CriticalItemDialog({
  itemName,
  onClose,
}: CriticalItemDialogProps) {
  return (
    <div
      className="system-dialog-backdrop"
      onClick={onClose}
    >
      <section
        className="system-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="critical-dialog-title"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <header className="system-dialog-titlebar">
          <span id="critical-dialog-title">
            Arquivo crítico
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
              O arquivo:
            </p>

            <strong>
              {itemName}
            </strong>

            <p>
              requer uma confirmação
              especial para ser excluído.
            </p>
          </div>
        </div>

        <footer className="system-dialog-actions">
          <button
            type="button"
            onClick={onClose}
            autoFocus
          >
            Entendi
          </button>
        </footer>
      </section>
    </div>
  );
}