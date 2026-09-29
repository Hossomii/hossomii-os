import {
  browserLinks,
  type BrowserInternalPage,
} from "../browser-links";

type BrowserHomeProps = {
  onOpenInternal: (
    page: BrowserInternalPage
  ) => void;

  onOpenExternal: (
    url: string
  ) => void;
};

export function BrowserHome({
  onOpenInternal,
  onOpenExternal,
}: BrowserHomeProps) {
  return (
    <main className="browser-home">
      <div className="browser-page">
        <header className="browser-home-header">
          <div>
            <span className="browser-home-kicker">
              HOSSOMII INTERNET SERVICE
            </span>

            <h1>
              HOSSOMII Web
            </h1>

            <p>
              Seu ponto de partida para explorar
              a web.
            </p>
          </div>

          <div className="browser-home-status">
            <strong>ONLINE</strong>
            <span>56K CONNECTION</span>
          </div>
        </header>

        <nav className="browser-home-nav">
          <span>HOME</span>
          <span>FAVORITOS</span>
          <span>COMUNIDADE</span>
          <span>WEB LINKS</span>
        </nav>

        <div className="browser-home-layout">
          <aside className="browser-home-sidebar">
            <section>
              <h2>Quick Links</h2>

              <ul>
                <li>Minha página</li>
                <li>Notícias</li>
                <li>Desenvolvimento</li>
                <li>Estudos</li>
              </ul>
            </section>

            <section>
              <h2>Status</h2>

              <p>
                4 sites disponíveis
              </p>

              <p>
                conexão estável
              </p>
            </section>
          </aside>

          <section className="browser-home-main">
            <div className="browser-welcome-box">
              <h2>
                Bem-vindo à Internet!
              </h2>

              <p>
                Escolha um dos destinos abaixo.
                Alguns sites são executados dentro
                do HOSSOMII OS e outros abrem na
                web real.
              </p>
            </div>

            <div className="browser-link-grid">
              {browserLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className="browser-link-card"
                  onClick={() => {
                    if (
                      link.type ===
                      "internal"
                    ) {
                      onOpenInternal(
                        link.page
                      );

                      return;
                    }

                    onOpenExternal(
                      link.url
                    );
                  }}
                >
                  <strong>
                    {link.label}
                  </strong>

                  <span>
                    {link.description}
                  </span>

                  <small>
                    {link.type ===
                    "internal"
                      ? "Abrir no HOSSOMII Web"
                      : "Abrir em nova aba ↗"}
                  </small>
                </button>
              ))}
            </div>

            <section className="browser-home-featured">
              <h2>
                ★ Site em destaque
              </h2>

              <div>
                <strong>
                  freeCodeCamp
                </strong>

                <p>
                  Aprender programação depende
                  de prática. Continue estudando,
                  construindo e quebrando coisas.
                </p>
              </div>
            </section>
          </section>

          <aside className="browser-home-right">
            <section>
              <h2>Web Notice</h2>

              <p>
                Algumas páginas do navegador ainda
                estão em construção.
              </p>
            </section>

            <section>
              <h2>Última atualização</h2>

              <p>
                HOSSOMII Web Beta
              </p>
            </section>
          </aside>
        </div>

        <footer className="browser-home-footer">
          <span>
            HOSSOMII Web © 2000–2026
          </span>

          <span>
            Best viewed on HOSSOMII OS
          </span>
        </footer>
      </div>
    </main>
  );
}