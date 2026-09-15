import { useRef, useState, type FormEvent } from "react";
import { useSystemStore } from "../../stores/systemStore";
import profileAvatar from "../../assets/profile-avatar.webp";
import "../../styles/auth.css";

export function LoginScreen() {
  const setPhase = useSystemStore((state) => state.setPhase);

  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState(
    "Digite uma senha e pressione Enter para acessar"
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const password = passwordRef.current?.value ?? "";

    if (password.length === 0) {
      setMessage("Digite uma senha para acessar este computador");
      passwordRef.current?.focus();

      return;
    }

    setPhase("authenticating");
  }

  function handlePasswordChange() {
    const password = passwordRef.current?.value ?? "";

    if (password.length > 0) {
      setMessage("Pressione Enter para conectar");
    } else {
      setMessage("Digite uma senha e pressione Enter para acessar");
    }
  }

  return (
    <main className="auth-screen">
      <section className="access-window">
        <header className="access-titlebar">
          <div className="titlebar-left">
            <span>HOSSOMII - ACESSO REMOTO</span>
          </div>

          <div className="titlebar-controls" aria-hidden="true">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </header>

        <div className="access-content">
          <section className="machine-info">
            <p className="machine-section-title">
              COMPUTADOR REMOTO
            </p>

            <div className="computer-visual">
              <div className="computer-screen">
                <div className="computer-screen-desktop">
                  <div className="desktop-cloud desktop-cloud-one" />
                  <div className="desktop-cloud desktop-cloud-two" />

                  <div className="desktop-hill" />

                  <div className="desktop-taskbar">
                    <span>iniciar</span>
                  </div>
                </div>
              </div>

              <div className="computer-stand" />
            </div>

            <div className="machine-status">
              <span className="status-indicator" />

              <span>ONLINE</span>
            </div>

            <dl className="machine-details">
              <div>
                <dt>COMPUTADOR</dt>
                <dd>HOSSOMII-01</dd>
              </div>

              <div>
                <dt>TIPO</dt>
                <dd>Estação de trabalho pessoal</dd>
              </div>

              <div>
                <dt>REDE</dt>
                <dd>Rede local</dd>
              </div>

              <div>
                <dt>STATUS</dt>
                <dd>Disponível para conexão</dd>
              </div>
            </dl>
          </section>

          <section className="connection-panel">
            <div className="connection-heading">
              <span className="connection-eyebrow">
                CONEXÃO SEGURA
              </span>

              <h1>Acessar computador</h1>

              <p>
                Este computador está online. Identifique-se para
                iniciar uma sessão remota.
              </p>
            </div>

            <div className="user-card">
              <img
                className="user-avatar"
                src={profileAvatar}
                alt="Avatar do usuário Anthony"
              />

              <div className="user-information">
                <span className="field-label">
                  USUÁRIO
                </span>

                <strong>Anthony</strong>

                <span className="user-status">
                  Conta local
                </span>
              </div>
            </div>

            <form
              className="connection-form"
              onSubmit={handleSubmit}
            >
              <label
                className="field-label"
                htmlFor="system-password"
              >
                SENHA
              </label>

              <div className="password-field">
                <input
                  ref={passwordRef}
                  id="system-password"
                  type="password"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  autoFocus
                  onInput={handlePasswordChange}
                  aria-describedby="password-help"
                />

                <button
                  className="password-enter"
                  type="submit"
                  aria-label="Acessar computador"
                >
                  ENTRAR ↵
                </button>
              </div>

              <p
                id="password-help"
                className="connection-help"
              >
                {message}
              </p>
            </form>

            <div className="connection-notice">
              <span className="connection-notice-icon">
                i
              </span>

              <p>
                Você está prestes a iniciar uma sessão em
                <strong> HOSSOMII-01</strong>.
              </p>
            </div>
          </section>
        </div>

        <footer className="access-footer">
          <span>● Computador encontrado</span>

          <span>Conexão protegida</span>

          <span>HOST: HOSSOMII-01</span>
        </footer>
      </section>
    </main>
  );
}