import { useEffect, useRef, useState, type FormEvent } from "react";

import { useAchievementStore } from "../../stores/achievementStore";
import { useCriticalFileStore } from "../../stores/criticalFileStore";
import { useFileSystemStore } from "../../stores/filesystemStore";

type RecoveryEnvironmentProps = {
  targetId: string;
  targetName: string;
};

type RecoveryTokenType =
  | "text"
  | "status"
  | "ok"
  | "error"
  | "path"
  | "file"
  | "command"
  | "muted"
  | "accent"
  | "prompt";

type RecoveryToken = {
  type: RecoveryTokenType;
  value: string;
};

type RecoveryLineKind = "normal" | "section" | "prompt" | "activity" | "note";

type RecoveryLine = {
  id: number;
  kind: RecoveryLineKind;
  tokens: RecoveryToken[];
};

type RecoveryLineInput = Omit<RecoveryLine, "id">;

function token(type: RecoveryTokenType, value: string): RecoveryToken {
  return {
    type,
    value,
  };
}

const INITIAL_RECOVERY_OUTPUT: RecoveryLine[] = [
  {
    id: 1,
    kind: "section",
    tokens: [token("accent", "HOSSOMII RECOVERY CONSOLE")],
  },
  {
    id: 2,
    kind: "normal",
    tokens: [token("muted", "Machine        "), token("text", "HOSSOMII-01")],
  },
  {
    id: 3,
    kind: "normal",
    tokens: [token("muted", "Session        "), token("text", "RECOVERY")],
  },
  {
    id: 4,
    kind: "normal",
    tokens: [token("muted", "Subsystem      "), token("text", "loaded")],
  },
  {
    id: 5,
    kind: "note",
    tokens: [
      token("muted", "Digite "),
      token("command", "ajuda"),
      token("muted", " caso precise de orientação."),
    ],
  },
  {
    id: 6,
    kind: "section",
    tokens: [token("accent", "RECOVERY_STAGE 01/03")],
  },
  {
    id: 7,
    kind: "normal",
    tokens: [
      token("muted", "STATUS         "),
      token("text", "WAITING_FOR_DIAGNOSTIC"),
    ],
  },
];

function wait(milliseconds: number) {
  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, reducedMotion ? 0 : milliseconds);
  });
}

export function RecoveryEnvironment({
  targetId,
  targetName,
}: RecoveryEnvironmentProps) {
  const phase = useCriticalFileStore((state) => state.phase);

  const markDiagnosed = useCriticalFileStore((state) => state.markDiagnosed);

  const markRestored = useCriticalFileStore((state) => state.markRestored);

  const markRecovered = useCriticalFileStore((state) => state.markRecovered);

  const resetFlow = useCriticalFileStore((state) => state.resetFlow);

  const restoreItem = useFileSystemStore((state) => state.restoreItem);

  const unlockAchievement = useAchievementStore(
    (state) => state.unlockAchievement,
  );

  const [command, setCommand] = useState("");

  const [isBusy, setIsBusy] = useState(false);

  const [output, setOutput] = useState<RecoveryLine[]>(INITIAL_RECOVERY_OUTPUT);

  const lineIdRef = useRef(INITIAL_RECOVERY_OUTPUT.length);

  const invalidAttemptsRef = useRef(0);

  const outputRef = useRef<HTMLDivElement>(null);

  function createLine(line: RecoveryLineInput): RecoveryLine {
    lineIdRef.current += 1;

    return {
      id: lineIdRef.current,
      ...line,
    };
  }

  function getStageHeaderLines(): RecoveryLineInput[] {
    if (phase === "recovery-diagnostic") {
      return [
        {
          kind: "section",
          tokens: [token("accent", "RECOVERY_STAGE 01/03")],
        },
        {
          kind: "normal",
          tokens: [
            token("muted", "STATUS         "),
            token("text", "WAITING_FOR_DIAGNOSTIC"),
          ],
        },
      ];
    }

    if (phase === "recovery-restore") {
      return [
        {
          kind: "section",
          tokens: [token("accent", "RECOVERY_STAGE 02/03")],
        },
        {
          kind: "normal",
          tokens: [
            token("muted", "STATUS         "),
            token("text", "COMPONENT_RESTORE_REQUIRED"),
          ],
        },
      ];
    }

    return [
      {
        kind: "section",
        tokens: [token("accent", "RECOVERY_STAGE 03/03")],
      },
      {
        kind: "normal",
        tokens: [
          token("muted", "STATUS         "),
          token("text", "SHELL_READY"),
        ],
      },
    ];
  }

  useEffect(() => {
    const element = outputRef.current;

    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }, [output]);

  useEffect(() => {
    if (phase !== "recovered") {
      return;
    }

    const timer = window.setTimeout(() => {
      unlockAchievement("i-warned-you");

      resetFlow();
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase, resetFlow, unlockAchievement]);

  function appendLine(line: RecoveryLineInput) {
    const createdLine = createLine(line);

    setOutput((current) => [...current, createdLine]);

    return createdLine.id;
  }

  function appendLines(...lines: RecoveryLineInput[]) {
    const createdLines = lines.map(createLine);

    setOutput((current) => [...current, ...createdLines]);
  }

  function replaceLine(id: number, line: RecoveryLineInput) {
    setOutput((current) =>
      current.map((currentLine) =>
        currentLine.id === id
          ? {
              id,
              ...line,
            }
          : currentLine,
      ),
    );
  }

  async function runActivity(
    initialTokens: RecoveryToken[],
    finalTokens: RecoveryToken[],
    delay = 220,
  ) {
    const id = appendLine({
      kind: "activity",
      tokens: initialTokens,
    });

    await wait(delay);

    replaceLine(id, {
      kind: "normal",
      tokens: finalTokens,
    });
  }

  function appendPrompt(rawCommand: string) {
    appendLine({
      kind: "prompt",
      tokens: [
        token("path", "C:\\RECOVERY"),
        token("text", "> "),
        token("command", rawCommand),
      ],
    });
  }

  function resetInvalidAttempts() {
    invalidAttemptsRef.current = 0;
  }

  function registerInvalidAttempt() {
    invalidAttemptsRef.current += 1;

    if (invalidAttemptsRef.current < 2) {
      return;
    }

    invalidAttemptsRef.current = 0;

    if (phase === "recovery-diagnostic") {
      appendLine({
        kind: "note",
        tokens: [
          token("accent", "SYSTEM NOTE  "),
          token(
            "muted",
            "Talvez seja melhor descobrir o que quebrou primeiro. Tente ",
          ),
          token("command", "diagnosticar"),
          token("muted", "."),
        ],
      });

      return;
    }

    if (phase === "recovery-restore") {
      appendLine({
        kind: "note",
        tokens: [
          token("accent", "SYSTEM NOTE  "),
          token("file", targetName),
          token(
            "muted",
            " já foi localizado. Talvez seja hora de restaurá-lo.",
          ),
        ],
      });

      return;
    }

    if (phase === "recovery-restart") {
      appendLine({
        kind: "note",
        tokens: [
          token("accent", "SYSTEM NOTE  "),
          token("muted", "O componente está de volta. Experimente "),
          token("command", "iniciar shell"),
          token("muted", "."),
        ],
      });
    }
  }

  function handleHelp() {
    appendLines(
      {
        kind: "section",
        tokens: [token("accent", "AVAILABLE COMMANDS")],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "diagnosticar"),
          token("muted", "   analisar falha"),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "status"),
          token("muted", "         estado atual"),
        ],
      },
      {
        kind: "normal",
        tokens: [token("command", `restaurar ${targetName}`)],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "iniciar shell"),
          token("muted", "  iniciar ambiente gráfico"),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "dir"),
          token("muted", "            listar diretórios"),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "lixeira"),
          token("muted", "        inspecionar lixeira"),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "whoami"),
          token("muted", "         sessão atual"),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "versao"),
          token("muted", "         versão do recovery"),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("command", "cls"),
          token("muted", " / "),
          token("command", "clear"),
        ],
      },
    );
  }

  function handleStatus() {
    if (phase === "recovery-diagnostic") {
      appendLine({
        kind: "normal",
        tokens: [
          token("status", "[WAIT]"),
          token("text", " diagnóstico ainda não executado"),
        ],
      });

      return;
    }

    if (phase === "recovery-restore") {
      appendLines(
        {
          kind: "normal",
          tokens: [
            token("error", "[FAIL]"),
            token("text", " componente crítico ausente"),
          ],
        },
        {
          kind: "normal",
          tokens: [token("path", "C:\\Sistema\\"), token("file", targetName)],
        },
      );

      return;
    }

    if (phase === "recovery-restart") {
      appendLine({
        kind: "normal",
        tokens: [
          token("ok", "[ OK ]"),
          token("text", " shell aguardando inicialização"),
        ],
      });

      return;
    }

    appendLine({
      kind: "normal",
      tokens: [token("ok", "[ OK ]"), token("text", " sistema recuperado")],
    });
  }

  async function handleDiagnostic() {
    if (phase !== "recovery-diagnostic") {
      appendLine({
        kind: "normal",
        tokens: [
          token("status", "[INFO]"),
          token("muted", " diagnóstico já concluído"),
        ],
      });

      return;
    }

    setIsBusy(true);

    await runActivity(
      [token("status", "[SCAN]"), token("text", " DISK_00")],
      [token("ok", "[ OK ]"), token("text", " disco virtual acessível")],
    );

    await runActivity(
      [token("status", "[SCAN]"), token("text", " filesystem")],
      [token("ok", "[ OK ]"), token("text", " filesystem carregado")],
    );

    await runActivity(
      [token("status", "[SCAN]"), token("text", " sessão de usuário")],
      [token("ok", "[ OK ]"), token("text", " sessão Anthony localizada")],
    );

    await runActivity(
      [token("status", "[SCAN]"), token("text", " componente principal")],
      [token("error", "[FAIL]"), token("text", " shell principal ausente")],
      300,
    );

    appendLines(
      {
        kind: "normal",
        tokens: [token("error", "CRITICAL_FILE_MISSING")],
      },
      {
        kind: "normal",
        tokens: [
          token("muted", "Expected  "),
          token("path", "C:\\Sistema\\"),
          token("file", targetName),
        ],
      },
    );

    await runActivity(
      [token("status", "[SCAN]"), token("text", " recycle storage")],
      [
        token("status", "[FOUND]"),
        token("text", " "),
        token("path", "C:\\Lixeira\\"),
        token("file", targetName),
      ],
      340,
    );

    appendLine({
      kind: "note",
      tokens: [token("muted", "Curioso. Foi exatamente onde você o deixou.")],
    });

    appendLines(
      {
        kind: "section",
        tokens: [token("accent", "RECOVERY_STAGE 02/03")],
      },
      {
        kind: "normal",
        tokens: [
          token("muted", "STATUS         "),
          token("text", "COMPONENT_RESTORE_REQUIRED"),
        ],
      },
    );

    setIsBusy(false);

    resetInvalidAttempts();

    markDiagnosed();
  }

  async function handleRestore() {
    if (phase === "recovery-diagnostic") {
      appendLines(
        {
          kind: "normal",
          tokens: [
            token("error", "[FAIL]"),
            token("text", " nenhum diagnóstico disponível"),
          ],
        },
        {
          kind: "note",
          tokens: [
            token(
              "muted",
              "O Recovery prefere saber o que está consertando antes de mover arquivos.",
            ),
          ],
        },
      );

      registerInvalidAttempt();

      return;
    }

    if (phase === "recovery-restart" || phase === "recovered") {
      appendLine({
        kind: "normal",
        tokens: [
          token("ok", "[ OK ]"),
          token("file", targetName),
          token("text", " já está restaurado"),
        ],
      });

      return;
    }

    if (phase !== "recovery-restore") {
      return;
    }

    setIsBusy(true);

    await runActivity(
      [
        token("status", "[SCAN]"),
        token("text", " "),
        token("path", "C:\\Lixeira\\"),
      ],
      [
        token("status", "[FOUND]"),
        token("text", " "),
        token("path", "C:\\Lixeira\\"),
        token("file", targetName),
      ],
      260,
    );

    const restored = restoreItem(targetId);

    if (!restored) {
      appendLine({
        kind: "normal",
        tokens: [
          token("error", "[FAIL]"),
          token("text", " não foi possível restaurar o componente"),
        ],
      });

      setIsBusy(false);

      return;
    }

    await runActivity(
      [
        token("status", "[COPY]"),
        token("text", " "),
        token("path", "C:\\Lixeira\\"),
        token("file", targetName),
      ],
      [token("ok", "[ OK ]"), token("text", " arquivo recuperado")],
      320,
    );

    appendLines(
      {
        kind: "normal",
        tokens: [
          token("muted", "Target    "),
          token("path", "C:\\Sistema\\"),
          token("file", targetName),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("ok", "[ OK ]"),
          token("text", " integridade básica validada"),
        ],
      },
      {
        kind: "note",
        tokens: [
          token(
            "muted",
            "Bom. O coração do sistema voltou para onde deveria estar.",
          ),
        ],
      },
      {
        kind: "section",
        tokens: [token("accent", "RECOVERY_STAGE 03/03")],
      },
      {
        kind: "normal",
        tokens: [
          token("muted", "STATUS         "),
          token("text", "SHELL_READY"),
        ],
      },
    );

    setIsBusy(false);

    resetInvalidAttempts();

    markRestored();
  }

  async function handleStartShell() {
    if (phase === "recovery-diagnostic") {
      appendLines(
        {
          kind: "normal",
          tokens: [
            token("error", "[FAIL]"),
            token("text", " causa da falha ainda desconhecida"),
          ],
        },
        {
          kind: "note",
          tokens: [token("muted", "Começar pelo diagnóstico costuma ajudar.")],
        },
      );

      registerInvalidAttempt();

      return;
    }

    if (phase === "recovery-restore") {
      appendLines(
        {
          kind: "normal",
          tokens: [
            token("error", "[FAIL]"),
            token("text", " "),
            token("file", targetName),
            token("text", " continua ausente"),
          ],
        },
        {
          kind: "note",
          tokens: [
            token(
              "muted",
              "Computadores geralmente funcionam melhor quando seus arquivos críticos existem.",
            ),
          ],
        },
      );

      registerInvalidAttempt();

      return;
    }

    if (phase !== "recovery-restart") {
      return;
    }

    setIsBusy(true);

    await runActivity(
      [token("status", "[BOOT]"), token("text", " verifying critical files")],
      [token("ok", "[ OK ]"), token("text", " arquivos críticos íntegros")],
    );

    await runActivity(
      [token("status", "[LOAD]"), token("text", " Explorer")],
      [token("ok", "[ OK ]"), token("text", " Explorer carregado")],
    );

    await runActivity(
      [token("status", "[LOAD]"), token("text", " Window Manager")],
      [token("ok", "[ OK ]"), token("text", " Window Manager carregado")],
    );

    await runActivity(
      [token("status", "[LOAD]"), token("text", " user session")],
      [token("ok", "[ OK ]"), token("text", " sessão restaurada")],
    );

    appendLines(
      {
        kind: "normal",
        tokens: [
          token("accent", "SYSTEM INTEGRITY"),
          token("text", "  "),
          token("ok", "OK"),
        ],
      },
      {
        kind: "normal",
        tokens: [token("ok", "HOSSOMII OS RECUPERADO")],
      },
    );

    setIsBusy(false);

    markRecovered();
  }

  function handleWhoAmI() {
    appendLines(
      {
        kind: "normal",
        tokens: [token("muted", "USER       "), token("text", "visitor")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "ACCESS     "), token("text", "restricted")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "SESSION    "), token("text", "recovery")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "MACHINE    "), token("text", "HOSSOMII-01")],
      },
      {
        kind: "note",
        tokens: [token("muted", "Trust level: questionable.")],
      },
    );
  }

  function handleVersion() {
    appendLines(
      {
        kind: "normal",
        tokens: [token("accent", "HOSSOMII Recovery Console")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "Version    "), token("text", "2.2")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "Host       "), token("text", "HOSSOMII-01")],
      },
      {
        kind: "note",
        tokens: [
          token(
            "muted",
            "Nenhuma garantia oferecida contra decisões questionáveis.",
          ),
        ],
      },
    );
  }

  function handleDir() {
    appendLines(
      {
        kind: "normal",
        tokens: [token("muted", "Directory "), token("path", "C:\\")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "Mode       Name")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "----       ----")],
      },
      {
        kind: "normal",
        tokens: [token("status", "d----"), token("text", "Sistema")],
      },
      {
        kind: "normal",
        tokens: [token("status", "d----"), token("text", "Usuários")],
      },
      {
        kind: "normal",
        tokens: [token("status", "d----"), token("text", "Programas")],
      },
      {
        kind: "normal",
        tokens: [token("status", "d----"), token("text", "Lixeira")],
      },
    );
  }

  function handleTrash() {
    appendLines(
      {
        kind: "normal",
        tokens: [token("muted", "Directory "), token("path", "C:\\Lixeira\\")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "Mode       Name")],
      },
      {
        kind: "normal",
        tokens: [token("muted", "----       ----")],
      },
    );

    if (phase === "recovery-diagnostic" || phase === "recovery-restore") {
      appendLines(
        {
          kind: "normal",
          tokens: [token("status", "-a---"), token("file", targetName)],
        },
        {
          kind: "normal",
          tokens: [token("muted", "1 arquivo")],
        },
        {
          kind: "note",
          tokens: [token("muted", "Isso parece importante.")],
        },
      );

      return;
    }

    appendLine({
      kind: "normal",
      tokens: [token("muted", "0 arquivos")],
    });
  }

  function clearTerminal() {
    const clearedLines: RecoveryLineInput[] = [
      {
        kind: "section",
        tokens: [token("accent", "HOSSOMII RECOVERY CONSOLE")],
      },
      {
        kind: "normal",
        tokens: [
          token("muted", "Machine        "),
          token("text", "HOSSOMII-01"),
        ],
      },
      {
        kind: "normal",
        tokens: [token("muted", "Session        "), token("text", "RECOVERY")],
      },
      ...getStageHeaderLines(),
    ];

    const createdLines = clearedLines.map(createLine);

    setOutput(createdLines);

    resetInvalidAttempts();
  }

  async function handleCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    const rawCommand = command.trim();

    if (!rawCommand) {
      return;
    }

    const normalizedCommand = rawCommand.toLowerCase();

    appendPrompt(rawCommand);

    setCommand("");

    if (normalizedCommand === "ajuda" || normalizedCommand === "help") {
      handleHelp();
      return;
    }

    if (normalizedCommand === "status") {
      handleStatus();
      return;
    }

    if (normalizedCommand === "diagnosticar") {
      await handleDiagnostic();
      return;
    }

    if (normalizedCommand === `restaurar ${targetName.toLowerCase()}`) {
      await handleRestore();
      return;
    }

    if (normalizedCommand === "iniciar shell") {
      await handleStartShell();
      return;
    }

    if (normalizedCommand === "whoami") {
      handleWhoAmI();
      return;
    }

    if (normalizedCommand === "dir") {
      handleDir();
      return;
    }

    if (normalizedCommand === "lixeira") {
      handleTrash();
      return;
    }

    if (normalizedCommand === "versao" || normalizedCommand === "versão") {
      handleVersion();
      return;
    }

    if (normalizedCommand === "cls" || normalizedCommand === "clear") {
      clearTerminal();
      return;
    }

    appendLines(
      {
        kind: "normal",
        tokens: [
          token("error", "COMMAND_NOT_FOUND"),
          token("text", "  "),
          token("command", rawCommand),
        ],
      },
      {
        kind: "normal",
        tokens: [
          token("muted", "Digite "),
          token("command", "ajuda"),
          token("muted", " para consultar os comandos disponíveis."),
        ],
      },
    );

    registerInvalidAttempt();
  }

  return (
    <div className="recovery-environment">
      <div className="recovery-terminal">
        <header className="recovery-header">
          <span className="recovery-title-badge">
            HOSSOMII RECOVERY CONSOLE SUBSYSTEM
          </span>
        </header>

        <div ref={outputRef} className="recovery-output" aria-live="polite">
          {output.map((line) => (
            <div
              key={line.id}
              className={`recovery-line recovery-line-${line.kind}`}
            >
              {line.tokens.map((lineToken, index) => (
                <span
                  key={`${line.id}-${index}`}
                  className={`recovery-token recovery-token-${lineToken.type}`}
                >
                  {lineToken.value}
                </span>
              ))}

              {line.kind === "activity" && (
                <span className="recovery-inline-spinner" aria-hidden="true" />
              )}
            </div>
          ))}

          {phase === "recovered" && (
            <div className="recovery-restored-message">
              <strong>Session restored.</strong>

              <span>Retornando ao ambiente gráfico...</span>
            </div>
          )}
        </div>

        {phase !== "recovered" && (
          <form className="recovery-command-line" onSubmit={handleCommand}>
            <span className="recovery-prompt-path">C:\RECOVERY</span>

            <span className="recovery-prompt-chevron">&gt;</span>

            <input
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              disabled={isBusy}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              aria-label="Comando de recuperação"
            />
          </form>
        )}

        <footer className="recovery-footer">
          <span>HELP: ajuda</span>

          <span
            className={
              isBusy ? "recovery-status-busy" : "recovery-status-ready"
            }
          >
            {isBusy ? "SYS BUSY" : "SYS READY"}
          </span>
        </footer>
      </div>
    </div>
  );
}
