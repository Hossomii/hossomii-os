import { useEffect, useState } from "react";
import { useSystemStore } from "../../stores/systemStore";
import profileAvatar from "../../assets/profile-avatar.webp";
import "../../styles/auth.css";

const authenticationSteps = [
  {
    title: "Verificando suas credenciais...",
    description: "Aguarde enquanto o computador valida as informações da conta.",
    technicalMessage: "",
    duration: 1700,
    status: "loading",
  },
  {
    title: "Não foi possível verificar a senha.",
    description: "O computador remoto recusou as credenciais informadas.",
    technicalMessage: "",
    duration: 1200,
    status: "error",
  },
  {
    title: "Recuperando sessão remota...",
    description: "Uma sessão anterior foi localizada neste computador.",
    technicalMessage: "SESSION_RECOVERY // AUTHORIZATION TOKEN FOUND",
    duration: 1800,
    status: "recovery",
  },
  {
    title: "Sessão autorizada.",
    description: "Preparando acesso ao computador HOSSOMII-01.",
    technicalMessage: "",
    duration: 1100,
    status: "success",
  },
];

export function AuthenticatingScreen() {
  const setPhase = useSystemStore((state) => state.setPhase);
  const [step, setStep] = useState(0);

  const currentStep = authenticationSteps[step];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (step === authenticationSteps.length - 1) {
        setPhase("booting");
        return;
      }

      setStep((currentStep) => currentStep + 1);
    }, currentStep.duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [step, currentStep.duration, setPhase]);

  return (
    <main className="auth-screen xp-session-screen">
      <section className="xp-session-shell">
        <div className="xp-top-band" />

        <div className="xp-session-content">
          <div className="xp-brand">
            <div>
              <strong>HOSSOMII OS</strong>
              <span>Acesso remoto</span>
            </div>
          </div>

          <div className="xp-session-divider" />

          <div className="xp-account-area">
            <div className="xp-user-row">
              <img
                className="xp-session-avatar"
                src={profileAvatar}
                alt="Avatar do usuário Anthony"
              />

              <div className="xp-session-user">
                <span>Anthony</span>
                <small>HOSSOMII-01</small>
              </div>
            </div>

            <div
              className={`xp-auth-message xp-auth-${currentStep.status}`}
              key={step}
            >
              <h1>{currentStep.title}</h1>

              <p>{currentStep.description}</p>

              {currentStep.status === "loading" && (
                <div className="xp-loader" aria-label="Carregando">
                  <div className="xp-loader-track">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {currentStep.technicalMessage && (
                <div className="xp-recovery-message">
                  &gt; {currentStep.technicalMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="xp-bottom-band">
          <span>HOSSOMII-01</span>
          <span>Conexão remota segura</span>
        </footer>
      </section>
    </main>
  );
}