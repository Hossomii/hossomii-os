type ExplorerToolbarProps = {
  address: string;
  canGoBack: boolean;
  onBack: () => void;
};

export function ExplorerToolbar({
  address,
  canGoBack,
  onBack,
}: ExplorerToolbarProps) {
  return (
    <div className="explorer-toolbar">
      <button
        type="button"
        disabled={!canGoBack}
        onClick={onBack}
      >
        ← Voltar
      </button>

      <span className="explorer-toolbar-separator" />

      <span className="explorer-address-label">
        Endereço
      </span>

      <div className="explorer-address">
        {address}
      </div>
    </div>
  );
}