import { useState } from "react";

import { openExternalUrl } from "../../system/navigation/externalNavigation";

import { type BrowserInternalPage } from "./browser-links";

import { BrowserHome } from "./components/BrowserHome";

import { BrowserProfilePage } from "./pages/BrowserProfilePage";

import { BrowserNewsPage } from "./pages/BrowserNewsPage";

export function BrowserApp() {
  const [currentPage, setCurrentPage] = useState<BrowserInternalPage>("home");

  function goHome() {
    setCurrentPage("home");
  }

  function goBack() {
    if (currentPage !== "home") {
      goHome();
    }
  }

  const currentTitle =
    currentPage === "profile"
      ? "Anthony Online"
      : currentPage === "news"
        ? "HOSSOMII News"
        : "HOSSOMII Web";

  return (
    <div className="browser-app">
      <header className="browser-toolbar">
        <button
          type="button"
          disabled={currentPage === "home"}
          aria-label="Voltar"
          onClick={goBack}
        >
          ←
        </button>

        <button type="button" disabled aria-label="Avançar">
          →
        </button>

        <button
          type="button"
          disabled={currentPage === "home"}
          onClick={goHome}
        >
          Início
        </button>

        <div className="browser-site-title">{currentTitle}</div>
      </header>

      {currentPage === "home" && (
        <BrowserHome
          onOpenInternal={setCurrentPage}
          onOpenExternal={openExternalUrl}
        />
      )}

      {currentPage === "profile" && (
        <BrowserProfilePage onOpenExternal={openExternalUrl} />
      )}

      {currentPage === "news" && (
        <BrowserNewsPage onOpenExternal={openExternalUrl} />
      )}
    </div>
  );
}
