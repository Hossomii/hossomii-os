import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { useFileSystemStore } from "../../stores/filesystemStore";

import {
  formatPath,
  getChildren,
  getItemById,
  normalizeValue,
  resolveItemPath,
} from "../../system/filesystem/pathUtils";

import { useCriticalFileStore } from "../../stores/criticalFileStore";

import { useFileSystemItemLauncher } from "../explorer/useFileSystemItemLauncher";

import type { FileSystemItem } from "../../types/filesystem";

type TerminalLineKind = "normal" | "command" | "error" | "muted" | "accent";

type TerminalLine = {
  id: number;

  kind: TerminalLineKind;

  text: string;
};

const HOME_ID = "anthony";

const COMMANDS = [
  "ajuda",
  "dir",
  "cd",
  "pwd",
  "type",
  "open",
  "del",
  "cls",
  "whoami",
  "hostname",
  "ver",
] as const;

function tokenizeCommand(command: string) {
  const matches = command.match(/"[^"]*"|\S+/g) ?? [];

  return matches.map((token) => {
    if (token.startsWith('"') && token.endsWith('"')) {
      return token.slice(1, -1);
    }

    return token;
  });
}

function getTypeLabel(item: FileSystemItem) {
  switch (item.type) {
    case "directory":
      return "<DIR>";

    case "application":
      return "<APP>";

    case "shortcut":
      return "<LNK>";

    case "file":
      return "     ";

    default:
      return "     ";
  }
}

function sortItems(items: FileSystemItem[]) {
  const priority: Record<FileSystemItem["type"], number> = {
    directory: 0,
    application: 1,
    shortcut: 2,
    file: 3,
  };

  return [...items].sort((a, b) => {
    const typeDifference = priority[a.type] - priority[b.type];

    if (typeDifference !== 0) {
      return typeDifference;
    }

    return a.name.localeCompare(b.name, "pt-BR");
  });
}

export function TerminalApp() {
  const items = useFileSystemStore((state) => state.items);

  const trashItem = useFileSystemStore((state) => state.trashItem);

  const startCriticalDelete = useCriticalFileStore((state) => state.startFlow);

  const [currentDirectoryId, setCurrentDirectoryId] = useState(HOME_ID);

  const { openItem } = useFileSystemItemLauncher({
    navigateTo: (location) => {
      setCurrentDirectoryId(location);
    },
  });

  const [input, setInput] = useState("");

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,

      kind: "accent",

      text: "HOSSOMII OS Command Terminal",
    },

    {
      id: 2,

      kind: "muted",

      text: 'Digite "ajuda" para exibir os comandos disponíveis.',
    },

    {
      id: 3,

      kind: "normal",

      text: "",
    },
  ]);

  const [history, setHistory] = useState<string[]>([]);

  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const nextLineId = useRef(4);

  const terminalOutputRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentPath = useMemo(
    () => formatPath(items, currentDirectoryId),
    [items, currentDirectoryId],
  );

  useEffect(() => {
    const output = terminalOutputRef.current;

    if (!output) {
      return;
    }

    output.scrollTop = output.scrollHeight;
  }, [lines, currentDirectoryId]);

  function createLine(
    text: string,
    kind: TerminalLineKind = "normal",
  ): TerminalLine {
    const line = {
      id: nextLineId.current,

      kind,

      text,
    };

    nextLineId.current += 1;

    return line;
  }

  function appendLines(...nextLines: TerminalLine[]) {
    setLines((currentLines) => [...currentLines, ...nextLines]);
  }

  function printError(message: string) {
    appendLines(createLine(message, "error"));
  }

  function handleHelp() {
    appendLines(
      createLine("Comandos disponíveis:", "accent"),

      createLine(""),

      createLine("  ajuda              Exibe esta ajuda."),

      createLine("  dir [caminho]      Lista arquivos e diretórios."),

      createLine("  cd [caminho]       Altera o diretório atual."),

      createLine("  pwd                Exibe o caminho atual."),

      createLine(
        "  type <arquivo>     Exibe o conteúdo de um arquivo de texto.",
      ),

      createLine(
        "  open <item>        Abre arquivos, aplicações, atalhos ou diretórios.",
      ),

      createLine("  del <arquivo>         Move um arquivo para a Lixeira."),

      createLine("  cls                Limpa o terminal."),

      createLine("  whoami             Exibe o usuário atual."),

      createLine("  hostname           Exibe o nome do computador."),

      createLine("  ver                Exibe informações do sistema."),

      createLine(""),

      createLine("Atalhos:", "accent"),

      createLine("  ↑ / ↓              Histórico de comandos."),

      createLine("  Tab                Autocomplete."),

      createLine(""),

      createLine(
        "Dica: caminhos com espaços podem ser escritos entre aspas.",
        "muted",
      ),
    );
  }

  function handleDir(rawPath?: string) {
    const target = rawPath
      ? resolveItemPath(items, currentDirectoryId, rawPath)
      : getItemById(items, currentDirectoryId);

    if (!target) {
      printError("O sistema não pode encontrar o caminho especificado.");

      return;
    }

    if (target.type !== "directory") {
      printError("O caminho especificado não é um diretório.");

      return;
    }

    const children = sortItems(getChildren(items, target.id));

    appendLines(
      createLine(` Diretório de ${formatPath(items, target.id)}`, "accent"),

      createLine(""),
    );

    if (children.length === 0) {
      appendLines(createLine("  <diretório vazio>", "muted"));

      return;
    }

    appendLines(
      ...children.map((item) =>
        createLine(`${getTypeLabel(item).padEnd(7, " ")} ${item.name}`),
      ),
    );
  }

  function handleCd(rawPath?: string) {
    if (!rawPath) {
      appendLines(createLine(currentPath));

      return;
    }

    const target = resolveItemPath(items, currentDirectoryId, rawPath);

    if (!target) {
      printError("O sistema não pode encontrar o caminho especificado.");

      return;
    }

    if (target.type !== "directory") {
      printError("O destino não é um diretório.");

      return;
    }

    setCurrentDirectoryId(target.id);
  }

  function handleType(rawPath?: string) {
    if (!rawPath) {
      printError("Uso: type <arquivo>");

      return;
    }

    const target = resolveItemPath(items, currentDirectoryId, rawPath);

    if (!target) {
      printError("Arquivo não encontrado.");

      return;
    }

    if (target.type !== "file") {
      printError("O item especificado não é um arquivo.");

      return;
    }

    if (typeof target.content !== "string") {
      appendLines(
        createLine(
          "Este arquivo não possui conteúdo de texto exibível no terminal.",
          "muted",
        ),
      );

      return;
    }

    const contentLines = target.content.split("\n");

    appendLines(...contentLines.map((contentLine) => createLine(contentLine)));
  }

  function handleOpen(rawPath?: string) {
    if (!rawPath) {
      printError("Uso: open <item>");

      return;
    }

    const target = resolveItemPath(items, currentDirectoryId, rawPath);

    if (!target) {
      printError("O sistema não pode encontrar o item especificado.");

      return;
    }

    if (target.type === "file" && target.extension.toLowerCase() === "sys") {
      printError("Arquivos de sistema não podem ser abertos por este comando.");

      return;
    }

    openItem(target);
  }

  function handleDelete(rawPath?: string) {
    if (!rawPath) {
      printError("Uso: del <arquivo>");

      return;
    }

    const target = resolveItemPath(items, currentDirectoryId, rawPath);

    if (!target) {
      printError("O sistema não pode encontrar o arquivo especificado.");

      return;
    }

    if (target.type === "directory") {
      printError("O comando del não remove diretórios.");

      return;
    }

    if (target.type !== "file") {
      printError("O item especificado não é um arquivo.");

      return;
    }

    if (!target.deletable) {
      printError("Acesso negado. Este arquivo está protegido.");

      return;
    }

    if (target.critical) {
      appendLines(
        createLine(`${target.name} requer confirmação adicional.`, "muted"),
      );

      startCriticalDelete({
        id: target.id,
        name: target.name,
      });

      return;
    }

    const deleted = trashItem(target.id);

    if (!deleted) {
      printError("Não foi possível excluir o arquivo.");

      return;
    }

    appendLines(
      createLine(`${target.name} foi movido para a Lixeira.`, "accent"),
    );
  }

  function handleAutocomplete() {
    const rawInput = input;

    const trimmedStart = rawInput.trimStart();

    if (!trimmedStart) {
      return;
    }

    const firstWhitespace = trimmedStart.search(/\s/);

    if (firstWhitespace === -1) {
      const normalizedInput = normalizeValue(trimmedStart);

      const matches = COMMANDS.filter((command) =>
        normalizeValue(command).startsWith(normalizedInput),
      );

      if (matches.length === 1) {
        setInput(`${matches[0]} `);

        return;
      }

      if (matches.length > 1) {
        appendLines(createLine(matches.join("    "), "muted"));
      }

      return;
    }

    const commandText = trimmedStart.slice(0, firstWhitespace);

    const command = normalizeValue(commandText);

    const supportedCommands = ["cd", "dir", "type", "open", "del"];

    if (!supportedCommands.includes(command)) {
      return;
    }

    let rawArgument = trimmedStart.slice(firstWhitespace).trimStart();

    if (rawArgument.startsWith('"')) {
      rawArgument = rawArgument.slice(1);
    }

    if (rawArgument.endsWith('"')) {
      rawArgument = rawArgument.slice(0, -1);
    }

    const normalizedPath = rawArgument.replace(/\//g, "\\");

    const lastSeparatorIndex = normalizedPath.lastIndexOf("\\");

    let parentDirectory: FileSystemItem | null;

    let basePath = "";

    let partialName = normalizedPath;

    if (lastSeparatorIndex >= 0) {
      basePath = normalizedPath.slice(0, lastSeparatorIndex + 1);

      partialName = normalizedPath.slice(lastSeparatorIndex + 1);

      parentDirectory = resolveItemPath(items, currentDirectoryId, basePath);
    } else {
      parentDirectory = getItemById(items, currentDirectoryId) ?? null;
    }

    if (!parentDirectory || parentDirectory.type !== "directory") {
      return;
    }

    const normalizedPartial = normalizeValue(partialName);

    const children = getChildren(items, parentDirectory.id);

    const matches = children.filter((item) => {
      if (command === "cd" && item.type !== "directory") {
        return false;
      }

      if (command === "type" && item.type !== "file") {
        return false;
      }

      if (command === "dir" && item.type !== "directory") {
        return false;
      }

      if (command === "del" && item.type !== "file") {
        return false;
      }

      return normalizeValue(item.name).startsWith(normalizedPartial);
    });

    if (matches.length === 0) {
      return;
    }

    if (matches.length > 1) {
      appendLines(
        createLine(matches.map((item) => item.name).join("    "), "muted"),
      );

      return;
    }

    const match = matches[0];

    const completedPath = `${basePath}${match.name}`;

    const requiresQuotes = /\s/.test(completedPath);

    setInput(
      requiresQuotes
        ? `${commandText} "${completedPath}"`
        : `${commandText} ${completedPath}`,
    );
  }

  function executeCommand(rawCommand: string) {
    const trimmedCommand = rawCommand.trim();

    if (!trimmedCommand) {
      appendLines(createLine(`${currentPath}>`, "command"));

      return;
    }

    appendLines(createLine(`${currentPath}> ${trimmedCommand}`, "command"));

    const tokens = tokenizeCommand(trimmedCommand);

    const command = normalizeValue(tokens[0] ?? "");

    const argument = tokens.slice(1).join(" ");

    switch (command) {
      case "ajuda":
      case "help":
        handleHelp();
        break;

      case "dir":
      case "ls":
        handleDir(argument || undefined);
        break;

      case "cd":
        handleCd(argument || undefined);
        break;

      case "pwd":
        appendLines(createLine(currentPath));
        break;

      case "type":
      case "cat":
        handleType(argument || undefined);
        break;

      case "open":
        handleOpen(argument || undefined);
        break;

      case "del":
        handleDelete(argument || undefined);
        break;

      case "cls":
      case "clear":
        setLines([]);
        break;

      case "whoami":
        appendLines(createLine("HOSSOMII-01\\Anthony"));
        break;

      case "hostname":
        appendLines(createLine("HOSSOMII-01"));
        break;

      case "ver":
        appendLines(
          createLine("HOSSOMII OS"),

          createLine("Command Terminal"),

          createLine("Virtual File System: online", "accent"),

          createLine("Ambiente de portfólio executado no navegador.", "muted"),
        );
        break;

      default:
        printError(
          `'${tokens[0]}' não é reconhecido como um comando interno do HOSSOMII OS.`,
        );
        break;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input;

    if (command.trim()) {
      setHistory((currentHistory) => [...currentHistory, command]);
    }

    setHistoryIndex(null);

    setInput("");

    executeCommand(command);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();

      handleAutocomplete();

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (history.length === 0) {
        return;
      }

      const nextIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);

      setInput(history[nextIndex]);

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === null) {
        return;
      }

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(null);

        setInput("");

        return;
      }

      setHistoryIndex(nextIndex);

      setInput(history[nextIndex]);
    }
  }

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div
        ref={terminalOutputRef}
        className="terminal-output"
        role="log"
        aria-live="polite"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`terminal-line terminal-line-${line.kind}`}
          >
            {line.text || "\u00A0"}
          </div>
        ))}

        <form className="terminal-prompt" onSubmit={handleSubmit}>
          <label htmlFor="terminal-command-input">
            {currentPath}
            &gt;
          </label>

          <input
            ref={inputRef}
            id="terminal-command-input"
            type="text"
            value={input}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Comando do terminal"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
