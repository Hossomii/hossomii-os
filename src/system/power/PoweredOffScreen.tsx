import {
  useSystemStore,
} from "../../stores/systemStore";

const GITHUB_URL =
  "https://github.com/Hossomii";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/anthony-hossomii-bugs/";

export function PoweredOffScreen() {
  const resetSystem =
    useSystemStore(
      (state) =>
        state.resetSystem
    );

  return (
    <main className="powered-off-screen">
      <section className="powered-off-content">
        <div className="powered-off-mark">
          H
        </div>

        <h1>
          HOSSOMII OS
        </h1>

        <p className="powered-off-message">
          Agora é seguro fechar esta janela.
        </p>

        <p className="powered-off-subtitle">
          Ou você pode continuar explorando outros lugares.
        </p>

        <nav
          className="powered-off-links"
          aria-label="Links externos"
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="powered-off-link-icon">
              GH
            </span>

            <span>
              <strong>
                GitHub
              </strong>

              <small>
                Ver código e projetos
              </small>
            </span>
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="powered-off-link-icon">
              in
            </span>

            <span>
              <strong>
                LinkedIn
              </strong>

              <small>
                Conectar profissionalmente
              </small>
            </span>
          </a>
        </nav>

        <button
          className="powered-off-restart"
          type="button"
          onClick={
            resetSystem
          }
        >
          Reiniciar HOSSOMII OS
        </button>

        <span className="powered-off-hint">
          HOSSOMII-01 • SESSION ENDED
        </span>
      </section>
    </main>
  );
}