import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useAchievementStore } from "../../stores/achievementStore";
import { useCriticalFileStore } from "../../stores/criticalFileStore";
import { useFileSystemStore } from "../../stores/filesystemStore";

type RecoveryEnvironmentProps = {
  targetId: string;
  targetName: string;
};

export function RecoveryEnvironment({
  targetId,
  targetName,
}: RecoveryEnvironmentProps) {
  const phase =
    useCriticalFileStore(
      (state) => state.phase
    );

  const markDiagnosed =
    useCriticalFileStore(
      (state) =>
        state.markDiagnosed
    );

  const markRestored =
    useCriticalFileStore(
      (state) =>
        state.markRestored
    );

  const markRecovered =
    useCriticalFileStore(
      (state) =>
        state.markRecovered
    );

  const resetFlow =
    useCriticalFileStore(
      (state) => state.resetFlow
    );

  const restoreItem =
    useFileSystemStore(
      (state) => state.restoreItem
    );

  const unlockAchievement =
    useAchievementStore(
      (state) =>
        state.unlockAchievement
    );

  const [command, setCommand] =
    useState("");

  const [output, setOutput] =
    useState<string[]>([
      "HOSSOMII Recovery Environment 1.0",
      "",
      "Sessão de recuperação iniciada.",
      "Digite 'ajuda' para visualizar os comandos disponíveis.",
      "",
    ]);

  useEffect(() => {
    if (phase !== "recovered") {
      return;
    }

    const timer = window.setTimeout(
      () => {
        unlockAchievement(
          "i-warned-you"
        );

        resetFlow();
      },
      2200
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    phase,
    resetFlow,
    unlockAchievement,
  ]);

  function appendOutput(
    ...lines: string[]
  ) {
    setOutput((currentOutput) => [
      ...currentOutput,
      ...lines,
    ]);
  }

  function handleHelp() {
    appendOutput(
      "Comandos disponíveis:",
      "",
      "  ajuda",
      "    Exibe esta lista.",
      "",
      "  status",
      "    Exibe o estado atual da recuperação.",
      "",
      "  diagnosticar",
      "    Executa diagnóstico do sistema.",
      "",
      `  restaurar ${targetName}`,
      "    Restaura o arquivo crítico.",
      "",
      "  iniciar shell",
      "    Tenta iniciar novamente o HOSSOMII OS.",
      ""
    );
  }

  function handleStatus() {
    if (
      phase ===
      "recovery-diagnostic"
    ) {
      appendOutput(
        "STATUS:",
        "Falha ainda não diagnosticada.",
        ""
      );

      return;
    }

    if (
      phase ===
      "recovery-restore"
    ) {
      appendOutput(
        "STATUS:",
        `${targetName} está ausente.`,
        "Restauração necessária.",
        ""
      );

      return;
    }

    if (
      phase ===
      "recovery-restart"
    ) {
      appendOutput(
        "STATUS:",
        `${targetName} restaurado.`,
        "Shell aguardando inicialização.",
        ""
      );

      return;
    }

    if (
      phase === "recovered"
    ) {
      appendOutput(
        "STATUS:",
        "Sistema recuperado.",
        ""
      );
    }
  }

  function handleDiagnostic() {
    if (
      phase ===
      "recovery-diagnostic"
    ) {
      appendOutput(
        "Iniciando diagnóstico...",
        "",
        "[OK] Disco virtual acessível",
        "[OK] Filesystem carregado",
        "[OK] Sessão de usuário encontrada",
        "[ERRO] Shell principal ausente",
        "",
        "CRITICAL_FILE_MISSING",
        "",
        `Arquivo ausente: C:\\Sistema\\${targetName}`,
        `Arquivo localizado: C:\\Lixeira\\${targetName}`,
        "",
        "Ação recomendada:",
        `restaurar ${targetName}`,
        ""
      );

      markDiagnosed();

      return;
    }

    appendOutput(
      "O diagnóstico já foi executado.",
      ""
    );
  }

  function handleRestore() {
    if (
      phase ===
      "recovery-diagnostic"
    ) {
      appendOutput(
        "ERRO:",
        "Execute 'diagnosticar' antes da restauração.",
        ""
      );

      return;
    }

    if (
      phase ===
        "recovery-restart" ||
      phase === "recovered"
    ) {
      appendOutput(
        `${targetName} já foi restaurado.`,
        ""
      );

      return;
    }

    if (
      phase !==
      "recovery-restore"
    ) {
      return;
    }

    const restored =
      restoreItem(targetId);

    if (!restored) {
      appendOutput(
        "ERRO:",
        "Não foi possível restaurar o arquivo.",
        ""
      );

      return;
    }

    appendOutput(
      `Restaurando ${targetName}...`,
      "",
      "[OK] Arquivo recuperado da Lixeira",
      "[OK] Arquivo devolvido para C:\\Sistema",
      "[OK] Integridade básica validada",
      "",
      "Arquivo restaurado com sucesso.",
      "",
      "Próxima ação:",
      "iniciar shell",
      ""
    );

    markRestored();
  }

  function handleStartShell() {
    if (
      phase ===
      "recovery-diagnostic"
    ) {
      appendOutput(
        "ERRO:",
        "O sistema ainda não foi diagnosticado.",
        ""
      );

      return;
    }

    if (
      phase ===
      "recovery-restore"
    ) {
      appendOutput(
        "ERRO:",
        `${targetName} continua ausente.`,
        "O shell não pode ser iniciado.",
        ""
      );

      return;
    }

    if (
      phase !==
      "recovery-restart"
    ) {
      return;
    }

    appendOutput(
      "Inicializando HOSSOMII Shell...",
      "",
      "[OK] Verificando arquivos críticos",
      "[OK] Carregando Explorer",
      "[OK] Carregando Window Manager",
      "[OK] Restaurando sessão",
      "",
      "SYSTEM INTEGRITY: OK",
      "",
      "HOSSOMII OS RECUPERADO",
      ""
    );

    markRecovered();
  }

  function handleCommand(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const rawCommand =
      command.trim();

    if (!rawCommand) {
      return;
    }

    const normalizedCommand =
      rawCommand.toLowerCase();

    appendOutput(
      `> ${rawCommand}`
    );

    setCommand("");

    if (
      normalizedCommand === "ajuda" ||
      normalizedCommand === "help"
    ) {
      handleHelp();
      return;
    }

    if (
      normalizedCommand ===
      "status"
    ) {
      handleStatus();
      return;
    }

    if (
      normalizedCommand ===
      "diagnosticar"
    ) {
      handleDiagnostic();
      return;
    }

    if (
      normalizedCommand ===
      `restaurar ${targetName.toLowerCase()}`
    ) {
      handleRestore();
      return;
    }

    if (
      normalizedCommand ===
      "iniciar shell"
    ) {
      handleStartShell();
      return;
    }

    appendOutput(
      `'${rawCommand}' não é reconhecido como comando de recuperação.`,
      "Digite 'ajuda' para visualizar os comandos disponíveis.",
      ""
    );
  }

  return (
    <div className="recovery-environment">
      <div className="recovery-terminal">
        <header className="recovery-header">
          <span>
            HOSSOMII Recovery Environment
          </span>

          <span>
            RECOVERY MODE
          </span>
        </header>

        <div
          className="recovery-output"
          aria-live="polite"
        >
          {output.map(
            (line, index) => (
              <div
                key={`${index}-${line}`}
                className={
                  line.includes(
                    "ERRO"
                  ) ||
                  line.includes(
                    "CRITICAL"
                  )
                    ? "recovery-error-line"
                    : ""
                }
              >
                {line || "\u00A0"}
              </div>
            )
          )}

          {phase ===
            "recovered" && (
            <div className="recovery-success">
              SISTEMA RECUPERADO
            </div>
          )}
        </div>

        {phase !==
          "recovered" && (
          <form
            className="recovery-command-line"
            onSubmit={
              handleCommand
            }
          >
            <span>
              recovery&gt;
            </span>

            <input
              type="text"
              value={command}
              onChange={(
                event
              ) =>
                setCommand(
                  event.target.value
                )
              }
              autoFocus
              autoComplete="off"
              spellCheck={false}
              aria-label="Comando de recuperação"
            />
          </form>
        )}

        <footer className="recovery-footer">
          {phase ===
          "recovered"
            ? "Reiniciando shell..."
            : "Digite ajuda caso precise de orientação."}
        </footer>
      </div>
    </div>
  );
}