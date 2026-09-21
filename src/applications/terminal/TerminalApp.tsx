import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import {
  useFileSystemStore,
} from "../../stores/filesystemStore";

import type {
  FileSystemItem,
} from "../../types/filesystem";

type TerminalLineKind =
  | "normal"
  | "command"
  | "error"
  | "muted"
  | "accent";

type TerminalLine = {
  id: number;
  kind: TerminalLineKind;
  text: string;
};

const ROOT_ID = "drive-c";
const HOME_ID = "anthony";

function normalizeValue(
  value: string
) {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .trim()
    .toLocaleLowerCase(
      "pt-BR"
    );
}

function tokenizeCommand(
  command: string
) {
  const matches =
    command.match(
      /"[^"]*"|\S+/g
    ) ?? [];

  return matches.map(
    (token) => {
      if (
        token.startsWith(
          "\""
        ) &&
        token.endsWith(
          "\""
        )
      ) {
        return token.slice(
          1,
          -1
        );
      }

      return token;
    }
  );
}

function getItemById(
  items: FileSystemItem[],
  id: string
) {
  return items.find(
    (item) =>
      item.id === id
  );
}

function getChildren(
  items: FileSystemItem[],
  parentId: string | null,
  includeHidden = false
) {
  return items.filter(
    (item) => {
      if (
        item.trashed
      ) {
        return false;
      }

      if (
        item.parentId !==
        parentId
      ) {
        return false;
      }

      if (
        !includeHidden &&
        item.hidden
      ) {
        return false;
      }

      return true;
    }
  );
}

function findChildByName(
  items: FileSystemItem[],
  parentId: string | null,
  name: string
) {
  const normalizedName =
    normalizeValue(name);

  return getChildren(
    items,
    parentId,
    false
  ).find(
    (item) =>
      normalizeValue(
        item.name
      ) ===
      normalizedName
  );
}

function getPathItems(
  items: FileSystemItem[],
  id: string
) {
  const path:
    FileSystemItem[] = [];

  const visited =
    new Set<string>();

  let current =
    getItemById(
      items,
      id
    );

  while (current) {
    if (
      visited.has(
        current.id
      )
    ) {
      break;
    }

    visited.add(
      current.id
    );

    path.unshift(
      current
    );

    if (
      current.parentId ===
      null
    ) {
      break;
    }

    current =
      getItemById(
        items,
        current.parentId
      );
  }

  return path;
}

function formatPath(
  items: FileSystemItem[],
  id: string
) {
  const path =
    getPathItems(
      items,
      id
    );

  if (
    path.length === 0
  ) {
    return "C:\\";
  }

  const [
    root,
    ...segments
  ] = path;

  if (
    root.id !== ROOT_ID
  ) {
    return segments.length
      ? `C:\\${segments
          .map(
            (item) =>
              item.name
          )
          .join("\\")}`
      : "C:\\";
  }

  if (
    segments.length === 0
  ) {
    return "C:\\";
  }

  return `${root.name}\\${segments
    .map(
      (item) =>
        item.name
    )
    .join("\\")}`;
}

function resolveItemPath(
  items: FileSystemItem[],
  currentDirectoryId: string,
  rawPath: string
): FileSystemItem | null {
  const trimmedPath =
    rawPath.trim();

  if (
    !trimmedPath ||
    trimmedPath === "."
  ) {
    return (
      getItemById(
        items,
        currentDirectoryId
      ) ?? null
    );
  }

  const normalizedSeparators =
    trimmedPath.replace(
      /\//g,
      "\\"
    );

  const absolute =
    normalizedSeparators.startsWith(
      "\\"
    ) ||
    normalizeValue(
      normalizedSeparators
    ).startsWith(
      "c:"
    );

  let current =
    getItemById(
      items,
      absolute
        ? ROOT_ID
        : currentDirectoryId
    );

  if (!current) {
    return null;
  }

  let pathWithoutDrive =
    normalizedSeparators;

  if (
    normalizeValue(
      pathWithoutDrive
    ).startsWith(
      "c:"
    )
  ) {
    pathWithoutDrive =
      pathWithoutDrive.slice(
        2
      );
  }

  pathWithoutDrive =
    pathWithoutDrive.replace(
      /^\\+/,
      ""
    );

  if (
    pathWithoutDrive ===
    ""
  ) {
    return (
      absolute
        ? getItemById(
            items,
            ROOT_ID
          )
        : current
    ) ?? null;
  }

  const segments =
    pathWithoutDrive
      .split("\\")
      .filter(Boolean);

  for (
    const segment
    of segments
  ) {
    if (
      segment === "."
    ) {
      continue;
    }

    if (
      segment === ".."
    ) {
      if (
        current.parentId
      ) {
        const parent =
          getItemById(
            items,
            current.parentId
          );

        if (parent) {
          current =
            parent;
        }
      }

      continue;
    }

    if (
      current.type !==
      "directory"
    ) {
      return null;
    }

    const child =
      findChildByName(
        items,
        current.id,
        segment
      );

    if (!child) {
      return null;
    }

    current = child;
  }

  return current;
}

function getTypeLabel(
  item: FileSystemItem
) {
  switch (
    item.type
  ) {
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

function sortItems(
  items: FileSystemItem[]
) {
  const priority:
    Record<
      FileSystemItem["type"],
      number
    > = {
      directory: 0,
      application: 1,
      shortcut: 2,
      file: 3,
    };

  return [
    ...items,
  ].sort(
    (a, b) => {
      const typeDifference =
        priority[a.type] -
        priority[b.type];

      if (
        typeDifference !==
        0
      ) {
        return typeDifference;
      }

      return a.name.localeCompare(
        b.name,
        "pt-BR"
      );
    }
  );
}

export function TerminalApp() {
  const items =
    useFileSystemStore(
      (state) =>
        state.items
    );

  const [
    currentDirectoryId,
    setCurrentDirectoryId,
  ] =
    useState(
      HOME_ID
    );

  const [
    input,
    setInput,
  ] =
    useState("");

  const [
    lines,
    setLines,
  ] =
    useState<
      TerminalLine[]
    >([
      {
        id: 1,
        kind: "accent",
        text:
          "HOSSOMII OS Command Terminal",
      },
      {
        id: 2,
        kind: "muted",
        text:
          "Digite \"ajuda\" para exibir os comandos disponíveis.",
      },
      {
        id: 3,
        kind: "normal",
        text: "",
      },
    ]);

  const [
    history,
    setHistory,
  ] =
    useState<string[]>(
      []
    );

  const [
    historyIndex,
    setHistoryIndex,
  ] =
    useState<number | null>(
      null
    );

  const nextLineId =
    useRef(4);

  const terminalOutputRef =
    useRef<HTMLDivElement>(
      null
    );

  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const currentPath =
    useMemo(
      () =>
        formatPath(
          items,
          currentDirectoryId
        ),
      [
        items,
        currentDirectoryId,
      ]
    );

  useEffect(() => {
    const output =
      terminalOutputRef.current;

    if (!output) {
      return;
    }

    output.scrollTop =
      output.scrollHeight;
  }, [
    lines,
    currentDirectoryId,
  ]);

  function createLine(
    text: string,
    kind:
      TerminalLineKind =
        "normal"
  ): TerminalLine {
    const line = {
      id:
        nextLineId.current,
      kind,
      text,
    };

    nextLineId.current +=
      1;

    return line;
  }

  function appendLines(
    ...nextLines:
      TerminalLine[]
  ) {
    setLines(
      (currentLines) => [
        ...currentLines,
        ...nextLines,
      ]
    );
  }

  function printError(
    message: string
  ) {
    appendLines(
      createLine(
        message,
        "error"
      )
    );
  }

  function handleHelp() {
    appendLines(
      createLine(
        "Comandos disponíveis:",
        "accent"
      ),
      createLine(
        ""
      ),
      createLine(
        "  ajuda              Exibe esta ajuda."
      ),
      createLine(
        "  dir [caminho]      Lista arquivos e diretórios."
      ),
      createLine(
        "  cd [caminho]       Altera o diretório atual."
      ),
      createLine(
        "  pwd                Exibe o caminho atual."
      ),
      createLine(
        "  type <arquivo>     Exibe o conteúdo de um arquivo de texto."
      ),
      createLine(
        "  cls                Limpa o terminal."
      ),
      createLine(
        "  whoami             Exibe o usuário atual."
      ),
      createLine(
        "  hostname           Exibe o nome do computador."
      ),
      createLine(
        "  ver                Exibe informações do sistema."
      ),
      createLine(
        ""
      ),
      createLine(
        "Dica: nomes com espaços podem ser escritos entre aspas.",
        "muted"
      )
    );
  }

  function handleDir(
    rawPath?: string
  ) {
    const target =
      rawPath
        ? resolveItemPath(
            items,
            currentDirectoryId,
            rawPath
          )
        : getItemById(
            items,
            currentDirectoryId
          );

    if (!target) {
      printError(
        "O sistema não pode encontrar o caminho especificado."
      );

      return;
    }

    if (
      target.type !==
      "directory"
    ) {
      printError(
        "O caminho especificado não é um diretório."
      );

      return;
    }

    const children =
      sortItems(
        getChildren(
          items,
          target.id
        )
      );

    appendLines(
      createLine(
        ` Diretório de ${formatPath(
          items,
          target.id
        )}`,
        "accent"
      ),
      createLine("")
    );

    if (
      children.length ===
      0
    ) {
      appendLines(
        createLine(
          "  <diretório vazio>",
          "muted"
        )
      );

      return;
    }

    appendLines(
      ...children.map(
        (item) =>
          createLine(
            `${getTypeLabel(
              item
            ).padEnd(
              7,
              " "
            )} ${item.name}`
          )
      )
    );
  }

  function handleCd(
    rawPath?: string
  ) {
    if (!rawPath) {
      appendLines(
        createLine(
          currentPath
        )
      );

      return;
    }

    const target =
      resolveItemPath(
        items,
        currentDirectoryId,
        rawPath
      );

    if (!target) {
      printError(
        "O sistema não pode encontrar o caminho especificado."
      );

      return;
    }

    if (
      target.type !==
      "directory"
    ) {
      printError(
        "O destino não é um diretório."
      );

      return;
    }

    setCurrentDirectoryId(
      target.id
    );
  }

  function handleType(
    rawPath?: string
  ) {
    if (!rawPath) {
      printError(
        "Uso: type <arquivo>"
      );

      return;
    }

    const target =
      resolveItemPath(
        items,
        currentDirectoryId,
        rawPath
      );

    if (!target) {
      printError(
        "Arquivo não encontrado."
      );

      return;
    }

    if (
      target.type !==
      "file"
    ) {
      printError(
        "O item especificado não é um arquivo."
      );

      return;
    }

    if (
      typeof target.content !==
      "string"
    ) {
      appendLines(
        createLine(
          "Este arquivo não possui conteúdo de texto exibível no terminal.",
          "muted"
        )
      );

      return;
    }

    const contentLines =
      target.content.split(
        "\n"
      );

    appendLines(
      ...contentLines.map(
        (contentLine) =>
          createLine(
            contentLine
          )
      )
    );
  }

  function executeCommand(
    rawCommand: string
  ) {
    const trimmedCommand =
      rawCommand.trim();

    if (
      !trimmedCommand
    ) {
      appendLines(
        createLine(
          `${currentPath}>`,
          "command"
        )
      );

      return;
    }

    appendLines(
      createLine(
        `${currentPath}> ${trimmedCommand}`,
        "command"
      )
    );

    const tokens =
      tokenizeCommand(
        trimmedCommand
      );

    const command =
      normalizeValue(
        tokens[0] ?? ""
      );

    const argument =
      tokens
        .slice(1)
        .join(" ");

    switch (
      command
    ) {
      case "ajuda":
      case "help":
        handleHelp();
        break;

      case "dir":
      case "ls":
        handleDir(
          argument ||
            undefined
        );
        break;

      case "cd":
        handleCd(
          argument ||
            undefined
        );
        break;

      case "pwd":
        appendLines(
          createLine(
            currentPath
          )
        );
        break;

      case "type":
      case "cat":
        handleType(
          argument ||
            undefined
        );
        break;

      case "cls":
      case "clear":
        setLines([]);
        break;

      case "whoami":
        appendLines(
          createLine(
            "HOSSOMII-01\\Anthony"
          )
        );
        break;

      case "hostname":
        appendLines(
          createLine(
            "HOSSOMII-01"
          )
        );
        break;

      case "ver":
        appendLines(
          createLine(
            "HOSSOMII OS"
          ),
          createLine(
            "Terminal subsystem ativo."
          ),
          createLine(
            "Ambiente de portfólio executado no navegador.",
            "muted"
          )
        );
        break;

      case "open":
        appendLines(
          createLine(
            "O comando open será habilitado na próxima atualização do terminal.",
            "muted"
          )
        );
        break;

      default:
        printError(
          `'${tokens[0]}' não é reconhecido como um comando interno do HOSSOMII OS.`
        );
        break;
    }
  }

  function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const command =
      input;

    if (
      command.trim()
    ) {
      setHistory(
        (
          currentHistory
        ) => [
          ...currentHistory,
          command,
        ]
      );
    }

    setHistoryIndex(
      null
    );

    setInput("");

    executeCommand(
      command
    );
  }

  function handleInputKeyDown(
    event:
      KeyboardEvent<HTMLInputElement>
  ) {
    if (
      event.key ===
      "ArrowUp"
    ) {
      event.preventDefault();

      if (
        history.length ===
        0
      ) {
        return;
      }

      const nextIndex =
        historyIndex ===
        null
          ? history.length -
            1
          : Math.max(
              0,
              historyIndex -
                1
            );

      setHistoryIndex(
        nextIndex
      );

      setInput(
        history[nextIndex]
      );

      return;
    }

    if (
      event.key ===
      "ArrowDown"
    ) {
      event.preventDefault();

      if (
        historyIndex ===
        null
      ) {
        return;
      }

      const nextIndex =
        historyIndex + 1;

      if (
        nextIndex >=
        history.length
      ) {
        setHistoryIndex(
          null
        );

        setInput("");

        return;
      }

      setHistoryIndex(
        nextIndex
      );

      setInput(
        history[nextIndex]
      );
    }
  }

  return (
    <div
      className="terminal-app"
      onClick={() =>
        inputRef.current?.focus()
      }
    >
      <div
        ref={
          terminalOutputRef
        }
        className="terminal-output"
        role="log"
        aria-live="polite"
      >
        {lines.map(
          (line) => (
            <div
              key={
                line.id
              }
              className={`terminal-line terminal-line-${line.kind}`}
            >
              {line.text ||
                "\u00A0"}
            </div>
          )
        )}

        <form
          className="terminal-prompt"
          onSubmit={
            handleSubmit
          }
        >
          <label
            htmlFor="terminal-command-input"
          >
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
            onChange={(
              event
            ) =>
              setInput(
                event.target.value
              )
            }
            onKeyDown={
              handleInputKeyDown
            }
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}