import type {
  FileSystemItem,
} from "../../types/filesystem";

const ROOT_ID = "drive-c";

export function normalizeValue(
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

export function getItemById(
  items: FileSystemItem[],
  id: string
) {
  return items.find(
    (item) =>
      item.id === id
  );
}

export function getChildren(
  items: FileSystemItem[],
  parentId: string | null,
  includeHidden = false
) {
  return items.filter(
    (item) => {
      if (item.trashed) {
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
    parentId
  ).find(
    (item) =>
      normalizeValue(
        item.name
      ) === normalizedName
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

export function formatPath(
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
    segments.length === 0
  ) {
    return "C:\\";
  }

  if (
    root.id !== ROOT_ID
  ) {
    return `C:\\${segments
      .map(
        (item) =>
          item.name
      )
      .join("\\")}`;
  }

  return `${root.name}\\${segments
    .map(
      (item) =>
        item.name
    )
    .join("\\")}`;
}

export function resolveItemPath(
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
    pathWithoutDrive === ""
  ) {
    return current;
  }

  const segments =
    pathWithoutDrive
      .split("\\")
      .filter(Boolean);

  for (
    const segment of segments
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
          current = parent;
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