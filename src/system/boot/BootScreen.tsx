import { useEffect } from "react";
import { useSystemStore } from "../../stores/systemStore";
import profileAvatar from "../../assets/profile-avatar.webp";
import "../../styles/auth.css";

export function BootScreen() {
  const setPhase = useSystemStore((state) => state.setPhase);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setPhase("desktop");
    }, 3200);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, [setPhase]);

  return (
    <main className="auth-screen xp-session-screen">
      <section className="xp-session-shell xp-welcome-shell">
        <div className="xp-top-band" />

        <div className="xp-session-content xp-welcome-content">
          <div className="xp-brand">
            <div>
              <strong>HOSSOMII OS</strong>
              <span>Estação de trabalho pessoal</span>
            </div>
          </div>

          <div className="xp-session-divider" />

          <div className="xp-welcome-area">
            <img
              className="xp-session-avatar xp-welcome-avatar"
              src={profileAvatar}
              alt=""
            />

            <div className="xp-welcome-message">
              <span>Anthony</span>

              <h1>Bem-vindo</h1>

              <p>
                Carregando suas configurações pessoais...
              </p>

              <div className="xp-loader xp-welcome-loader">
                <div className="xp-loader-track">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="xp-bottom-band">
          <span>HOSSOMII-01</span>
          <span>Iniciando sessão...</span>
        </footer>
      </section>
    </main>
  );
}