import {
  useEffect,
  useState,
} from "react";

import { useCriticalFileStore } from "../../stores/criticalFileStore";
import { useFileSystemStore } from "../../stores/filesystemStore";

import { RecoveryEnvironment } from "./RecoveryEnvironment";

const REQUIRED_PHRASE =
  "eu sei o que estou fazendo";

type DialogPosition = {
  x: number;
  y: number;
};

export function CriticalDeleteFlow() {
  const phase =
    useCriticalFileStore(
      (state) => state.phase
    );

  const target =
    useCriticalFileStore(
      (state) => state.target
    );

  const showSecondConfirmation =
    useCriticalFileStore(
      (state) =>
        state.showSecondConfirmation
    );

  const showTypedConfirmation =
    useCriticalFileStore(
      (state) =>
        state.showTypedConfirmation
    );

  const triggerFailure =
    useCriticalFileStore(
      (state) =>
        state.triggerFailure
    );

  const startRecovery =
    useCriticalFileStore(
      (state) =>
        state.startRecovery
    );

  const resetFlow =
    useCriticalFileStore(
      (state) => state.resetFlow
    );

  const trashItem =
    useFileSystemStore(
      (state) => state.trashItem
    );

  const [
    confirmationText,
    setConfirmationText,
  ] = useState("");

  const [
    secondDialogPosition,
    setSecondDialogPosition,
  ] = useState<DialogPosition>({
    x: 100,
    y: 100,
  });

  useEffect(() => {
    if (
      phase !==
      "second-confirmation"
    ) {
      return;
    }

    const dialogWidth = 380;
    const dialogHeight = 220;

    const maxX = Math.max(
      20,
      window.innerWidth -
        dialogWidth -
        20
    );

    const maxY = Math.max(
      20,
      window.innerHeight -
        dialogHeight -
        60
    );

    const x =
      20 +
      Math.random() *
        Math.max(
          0,
          maxX - 20
        );

    const y =
      20 +
      Math.random() *
        Math.max(
          0,
          maxY - 20
        );

    setSecondDialogPosition({
      x,
      y,
    });
  }, [phase]);

  useEffect(() => {
    if (
      phase !==
      "typed-confirmation"
    ) {
      setConfirmationText("");
    }
  }, [phase]);

  if (
    phase === "idle" ||
    !target
  ) {
    return null;
  }

  const activeTarget = target;

  function handleFinalDelete() {
    const normalizedText =
      confirmationText
        .trim()
        .toLowerCase();

    if (
      normalizedText !==
      REQUIRED_PHRASE
    ) {
      return;
    }

    const deleted =
      trashItem(
        activeTarget.id
      );

    if (!deleted) {
      resetFlow();
      return;
    }

    triggerFailure();
  }

  if (
    phase ===
    "recovery-diagnostic" ||
    phase ===
    "recovery-restore" ||
    phase ===
    "recovery-restart" ||
    phase ===
    "recovered"
  ) {
    return (
      <RecoveryEnvironment
        targetId={
          activeTarget.id
        }
        targetName={
          activeTarget.name
        }
      />
    );
  }

  if (
    phase ===
    "first-confirmation"
  ) {
    return (
      <div className="critical-flow-layer critical-flow-centered">
        <section
          className="system-dialog"
          role="alertdialog"
          aria-modal="true"
        >
          <header className="system-dialog-titlebar">
            <span>
              Confirmar exclusão
            </span>

            <button
              type="button"
              aria-label="Fechar"
              onClick={resetFlow}
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
                Tem certeza de que deseja
                excluir:
              </p>

              <strong>
                {activeTarget.name}
              </strong>

              <p>
                Este arquivo parece
                importante.
              </p>
            </div>
          </div>

          <footer className="system-dialog-actions">
            <button
              type="button"
              onClick={
                showSecondConfirmation
              }
            >
              Sim
            </button>

            <button
              type="button"
              onClick={resetFlow}
              autoFocus
            >
              Não
            </button>
          </footer>
        </section>
      </div>
    );
  }

  if (
    phase ===
    "second-confirmation"
  ) {
    return (
      <div className="critical-flow-layer">
        <section
          className="
            system-dialog
            critical-floating-dialog
          "
          style={{
            left:
              secondDialogPosition.x,
            top:
              secondDialogPosition.y,
          }}
          role="alertdialog"
          aria-modal="true"
        >
          <header className="system-dialog-titlebar">
            <span>
              Só para confirmar...
            </span>

            <button
              type="button"
              aria-label="Fechar"
              onClick={resetFlow}
            >
              ×
            </button>
          </header>

          <div className="system-dialog-content">
            <div
              className="system-dialog-warning"
              aria-hidden="true"
            >
              ?
            </div>

            <div>
              <p>
                Você acabou de confirmar
                isso.
              </p>

              <strong>
                {activeTarget.name}
              </strong>

              <p>
                Quer mesmo insistir?
              </p>
            </div>
          </div>

          <footer className="system-dialog-actions">
            <button
              type="button"
              onClick={
                showTypedConfirmation
              }
            >
              Sim, continuar
            </button>

            <button
              type="button"
              onClick={resetFlow}
            >
              Pensando bem, não
            </button>
          </footer>
        </section>
      </div>
    );
  }

  if (
    phase ===
    "typed-confirmation"
  ) {
    const phraseMatches =
      confirmationText
        .trim()
        .toLowerCase() ===
      REQUIRED_PHRASE;

    return (
      <div className="critical-flow-layer critical-flow-centered">
        <section
          className="
            system-dialog
            critical-typed-dialog
          "
          role="alertdialog"
          aria-modal="true"
        >
          <header className="system-dialog-titlebar">
            <span>
              Última confirmação
            </span>

            <button
              type="button"
              aria-label="Fechar"
              onClick={resetFlow}
            >
              ×
            </button>
          </header>

          <div className="critical-typed-content">
            <p>
              Certo. Para provar que sabe
              exatamente o que está fazendo,
              digite:
            </p>

            <strong>
              {REQUIRED_PHRASE}
            </strong>

            <input
              type="text"
              value={confirmationText}
              onChange={(event) =>
                setConfirmationText(
                  event.target.value
                )
              }
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />

            <small>
              Não diga que o sistema não
              tentou avisar.
            </small>
          </div>

          <footer className="system-dialog-actions">
            <button
              type="button"
              disabled={!phraseMatches}
              onClick={
                handleFinalDelete
              }
            >
              Excluir mesmo assim
            </button>

            <button
              type="button"
              onClick={resetFlow}
            >
              Cancelar
            </button>
          </footer>
        </section>
      </div>
    );
  }

  if (
    phase === "failure"
  ) {
    return (
      <div
        className="critical-system-failure"
        role="alert"
      >
        <div className="critical-failure-content">
          <h1>
            HOSSOMII OS
          </h1>

          <p>
            O sistema encontrou um problema
            crítico e interrompeu a sessão
            para evitar danos adicionais.
          </p>

          <pre>
{`CRITICAL_FILE_MISSING

Arquivo ausente:
C:\\Sistema\\${activeTarget.name}

STATUS:
0xH0550M11

> verificando componentes...
> shell principal não encontrado
> arquivo localizado na Lixeira
> recuperação necessária`}
          </pre>

          <p className="critical-failure-comment">
            Você ignorou todos os avisos.
            Impressionante.
          </p>

          <button
            type="button"
            onClick={
              startRecovery
            }
          >
            Iniciar ambiente de recuperação
          </button>

          <small>
            Recovery Environment disponível
          </small>
        </div>
      </div>
    );
  }

  return null;
}