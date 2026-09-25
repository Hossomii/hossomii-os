export function BrowserApp() {
  return (
    <div className="browser-app">
      <header className="browser-toolbar">
        <button type="button" disabled aria-label="Voltar">
          ←
        </button>

        <button type="button" disabled aria-label="Avançar">
          →
        </button>

        <button type="button" disabled>
          Início
        </button>

        <div className="browser-site-title">HOSSOMII Web</div>
      </header>

      <main className="browser-home-placeholder">
        <div className="browser-home-panel">
          <span className="browser-home-eyebrow">
            HOSSOMII INTERNET SERVICE
          </span>

          <h1>Bem-vindo à Internet</h1>

          <p>Seus sites favoritos estarão disponíveis aqui.</p>

          <div className="browser-connection-status">● Conectado</div>
        </div>
      </main>
    </div>
  );
}
