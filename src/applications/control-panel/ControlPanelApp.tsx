import {
  useSystemPreferencesStore,
  type SystemTheme,
  type WallpaperId,
} from "../../stores/systemPreferencesStore";

import wallpaperDefault from "../../assets/wallpapers/default.webp";
import wallpaper01 from "../../assets/wallpapers/wallpaper-01.webp";
import wallpaper02 from "../../assets/wallpapers/wallpaper-02.webp";
import wallpaper03 from "../../assets/wallpapers/wallpaper-03.webp";
import wallpaper04 from "../../assets/wallpapers/wallpaper-04.webp";
import wallpaper05 from "../../assets/wallpapers/wallpaper-05.webp";

type ThemeOption = {
  id: SystemTheme;
  name: string;
  description: string;
};

type WallpaperOption = {
  id: WallpaperId;
  name: string;
  image: string;
};

const THEMES: ThemeOption[] = [
  {
    id: "default",
    name: "HOSSOMII Default",
    description:
      "A aparência clássica azul do HOSSOMII OS.",
  },
  {
    id: "dark",
    name: "HOSSOMII Dark",
    description:
      "Azul-marinho, grafite e elementos escuros no estilo dos anos 2000.",
  },
  {
    id: "high-contrast",
    name: "Alto Contraste",
    description:
      "Preto, branco e cores fortes para máxima diferenciação visual.",
  },
];

const WALLPAPERS: WallpaperOption[] = [
  {
    id: "default",
    name: "HOSSOMII Original",
    image: wallpaperDefault,
  },
  {
    id: "wallpaper-01",
    name: "Wallpaper 01",
    image: wallpaper01,
  },
  {
    id: "wallpaper-02",
    name: "Wallpaper 02",
    image: wallpaper02,
  },
  {
    id: "wallpaper-03",
    name: "Wallpaper 03",
    image: wallpaper03,
  },
  {
    id: "wallpaper-04",
    name: "Wallpaper 04",
    image: wallpaper04,
  },
  {
    id: "wallpaper-05",
    name: "Wallpaper 05",
    image: wallpaper05,
  },
];

export function ControlPanelApp() {
  const theme =
    useSystemPreferencesStore(
      (state) => state.theme
    );

  const wallpaper =
    useSystemPreferencesStore(
      (state) => state.wallpaper
    );

  const setTheme =
    useSystemPreferencesStore(
      (state) => state.setTheme
    );

  const setWallpaper =
    useSystemPreferencesStore(
      (state) => state.setWallpaper
    );

  const resetPreferences =
    useSystemPreferencesStore(
      (state) =>
        state.resetPreferences
    );

  return (
    <div className="control-panel-app">
      <header className="control-panel-header">
        <div>
          <span className="control-panel-eyebrow">
            PAINEL DE CONTROLE
          </span>

          <h1>
            Aparência e temas
          </h1>

          <p>
            Personalize a aparência do
            HOSSOMII OS.
          </p>
        </div>
      </header>

      <div className="control-panel-content">
        <section className="control-panel-section">
          <header>
            <h2>
              Tema do sistema
            </h2>

            <p>
              Altere janelas, menus,
              Explorer e barra de
              tarefas.
            </p>
          </header>

          <div className="theme-options">
            {THEMES.map((option) => {
              const selected =
                theme === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={[
                    "theme-option",
                    `theme-option-${option.id}`,
                    selected
                      ? "theme-option-selected"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selected}
                  onClick={() =>
                    setTheme(
                      option.id
                    )
                  }
                >
                  <div className="theme-preview">
                    <div className="theme-preview-window">
                      <span />

                      <div />
                    </div>
                  </div>

                  <strong>
                    {option.name}
                  </strong>

                  <small>
                    {
                      option.description
                    }
                  </small>
                </button>
              );
            })}
          </div>
        </section>

        <section className="control-panel-section">
          <header>
            <h2>
              Plano de fundo
            </h2>

            <p>
              Escolha uma imagem para
              a área de trabalho.
            </p>
          </header>

          <div className="wallpaper-options">
            {WALLPAPERS.map((option) => {
              const selected =
                wallpaper === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={[
                    "wallpaper-option",
                    selected
                      ? "wallpaper-option-selected"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selected}
                  onClick={() =>
                    setWallpaper(
                      option.id
                    )
                  }
                >
                  <img
                    src={option.image}
                    alt=""
                  />

                  <span>
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="control-panel-reset">
          <button
            type="button"
            onClick={
              resetPreferences
            }
          >
            Restaurar padrão
          </button>

          <span>
            Restaura o tema e
            wallpaper originais.
          </span>
        </section>
      </div>
    </div>
  );
}