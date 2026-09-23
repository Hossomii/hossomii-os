import { useState } from "react";

import { useFileSystemStore } from "../../stores/filesystemStore";

export function useExplorerNavigation(
  initialLocation: string
) {
  const items = useFileSystemStore(
    (state) => state.items
  );

  const getItem = useFileSystemStore(
    (state) => state.getItem
  );

  const getChildren = useFileSystemStore(
    (state) => state.getChildren
  );

  const getPath = useFileSystemStore(
    (state) => state.getPath
  );

  const [currentLocation, setCurrentLocation] =
    useState(initialLocation);

  const [history, setHistory] =
    useState<string[]>([]);

  /*
   * Mantém o hook reagindo a alterações no filesystem.
   *
   * Futuramente, se um arquivo for excluído ou restaurado,
   * os componentes que usam este hook serão renderizados
   * novamente.
   */
  void items;

  const currentItem =
    currentLocation === "computer"
      ? undefined
      : getItem(currentLocation);

  const currentChildren =
    currentLocation === "computer"
      ? []
      : getChildren(currentLocation);

  const canGoBack =
    history.length > 0;

  function navigateTo(
    location: string
  ) {
    if (
      location === currentLocation
    ) {
      return;
    }

    setHistory((currentHistory) => [
      ...currentHistory,
      currentLocation,
    ]);

    setCurrentLocation(location);
  }

  function goBack() {
    if (!canGoBack) {
      return;
    }

    const previousLocation =
      history[history.length - 1];

    setHistory((currentHistory) =>
      currentHistory.slice(0, -1)
    );

    setCurrentLocation(
      previousLocation
    );
  }

  function getAddress() {
    if (
      currentLocation === "computer"
    ) {
      return "Meu Computador";
    }

    return getPath(currentLocation)
      .map((item) => item.name)
      .join("\\");
  }

  return {
    currentLocation,
    currentItem,
    currentChildren,

    canGoBack,

    navigateTo,
    goBack,

    address: getAddress(),

    getItem,
    getChildren,
  };
}