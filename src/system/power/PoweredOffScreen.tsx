import { useSystemStore } from "../../stores/systemStore";

import { ExternalLink } from "../../components/ExternalLink";

import {
  playSound,
  preloadAudioGroup,
} from "../audio/audioService";

const GITHUB_URL = "https://github.com/Hossomii";

const LINKEDIN_URL = "https://www.linkedin.com/in/anthony-hossomii-bugs/";

export function PoweredOffScreen() {
  const powerOnSystem = useSystemStore((state) => state.powerOnSystem);

  function handlePowerOn() {
    preloadAudioGroup("session");

    void playSound("system-startup");

    powerOnSystem();
  }
  return (
    <main className="powered-off-screen">
      <div
        className="powered-off-decoration powered-off-star-one"
        aria-hidden="true"
      >
        ★
      </div>

      <div
        className="powered-off-decoration powered-off-star-two"
        aria-hidden="true"
      >
        ✦
      </div>

      <div
        className="powered-off-decoration powered-off-heart"
        aria-hidden="true"
      >
        ♡
      </div>

      <section className="powered-off-card">
        <header className="powered-off-card-header">
          <span>HOSSOMII-01</span>

          <span className="powered-off-offline">● OFFLINE</span>
        </header>

        <div className="powered-off-content">
          <div className="powered-off-sticker" aria-hidden="true">
            BYE!
          </div>

          <span className="powered-off-eyebrow">SESSION ENDED</span>

          <h1>HOSSOMII OS</h1>

          <p className="powered-off-message">Sessão encerrada com sucesso!</p>

          <p className="powered-off-subtitle">
            Agora é seguro fechar esta janela.
            <br />
            ...ou ficar mais um pouco :)
          </p>

          <nav className="powered-off-links" aria-label="Links externos">
            <ExternalLink href={GITHUB_URL}>
              <span className="powered-off-link-icon powered-off-github-icon">
                GH
              </span>

              <span>
                <strong>GitHub</strong>

                <small>código + projetos</small>
              </span>

              <span className="powered-off-link-arrow" aria-hidden="true">
                ↗
              </span>
            </ExternalLink>

            <ExternalLink href={LINKEDIN_URL}>
              <span className="powered-off-link-icon powered-off-linkedin-icon">
                in
              </span>

              <span>
                <strong>LinkedIn</strong>

                <small>vamos conectar?</small>
              </span>

              <span className="powered-off-link-arrow" aria-hidden="true">
                ↗
              </span>
            </ExternalLink>
          </nav>

          <button
            className="powered-off-power"
            type="button"
            onClick={handlePowerOn}
          >
            <span aria-hidden="true">⏻</span>
            Ligar novamente
          </button>

          <div className="powered-off-ticker" aria-hidden="true">
            <span>★ THANKS FOR VISITING ★</span>

            <span>HOSSOMII-01</span>

            <span>SEE YOU SOON :)</span>
          </div>
        </div>

        <footer className="powered-off-card-footer">
          <span>HOSSOMII SYSTEMS</span>

          <span>SESSION_STATUS: CLOSED</span>
        </footer>
      </section>
    </main>
  );
}
