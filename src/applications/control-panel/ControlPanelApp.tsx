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
    description: "A aparência clássica azul do HOSSOMII OS.",
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
    name: "HOSSOMII Hills",
    image: wallpaperDefault,
  },
  {
    id: "wallpaper-01",
    name: "HOSSOMII Default",
    image: wallpaper01,
  },
  {
    id: "wallpaper-02",
    name: "Red Team Grid",
    image: wallpaper02,
  },
  {
    id: "wallpaper-03",
    name: "Retro Blue Abstract",
    image: wallpaper03,
  },
  {
    id: "wallpaper-04",
    name: "HOSSOMII Arcade",
    image: wallpaper04,
  },
  {
    id: "wallpaper-05",
    name: "Minimal Green",
    image: wallpaper05,
  },
];

export function ControlPanelApp() {
  const theme =
    useSystemPreferencesStore(
      (state) => state.theme,
    );

  const wallpaper =
    useSystemPreferencesStore(
      (state) => state.wallpaper,
    );

  const audioMuted =
    useSystemPreferencesStore(
      (state) =>
        state.audioMuted,
    );

  const audioVolume =
    useSystemPreferencesStore(
      (state) =>
        state.audioVolume,
    );

  const setTheme =
    useSystemPreferencesStore(
      (state) => state.setTheme,
    );

  const setWallpaper =
    useSystemPreferencesStore(
      (state) =>
        state.setWallpaper,
    );

  const setAudioMuted =
    useSystemPreferencesStore(
      (state) =>
        state.setAudioMuted,
    );

  const setAudioVolume =
    useSystemPreferencesStore(
      (state) =>
        state.setAudioVolume,
    );

  const resetPreferences =
    useSystemPreferencesStore(
      (state) =>
        state.resetPreferences,
    );

  const audioVolumePercent =
    Math.round(
      audioVolume * 100,
    );

  return (
    <div className="control-panel-app">
      <header className="control-panel-header">
        <div>
          <span className="control-panel-eyebrow">
            PAINEL DE CONTROLE
          </span>

          <h1>
            Personalização do sistema
          </h1>

          <p>
            Ajuste a aparência e o áudio do HOSSOMII OS.
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
              Altere janelas, menus, Explorer e barra de tarefas.
            </p>
          </header>

          <div className="theme-options">
            {THEMES.map(
              (option) => {
                const selected =
                  theme ===
                  option.id;

                return (
                  <button
                    key={
                      option.id
                    }
                    type="button"
                    className={[
                      "theme-option",
                      `theme-option-${option.id}`,
                      selected
                        ? "theme-option-selected"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(" ")}
                    aria-pressed={
                      selected
                    }
                    onClick={() =>
                      setTheme(
                        option.id,
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
                      {
                        option.name
                      }
                    </strong>

                    <small>
                      {
                        option.description
                      }
                    </small>
                  </button>
                );
              },
            )}
          </div>
        </section>

        <section className="control-panel-section">
          <header>
            <h2>
              Plano de fundo
            </h2>

            <p>
              Escolha uma imagem para a área de trabalho.
            </p>
          </header>

          <div className="wallpaper-options">
            {WALLPAPERS.map(
              (option) => {
                const selected =
                  wallpaper ===
                  option.id;

                return (
                  <button
                    key={
                      option.id
                    }
                    type="button"
                    className={[
                      "wallpaper-option",
                      selected
                        ? "wallpaper-option-selected"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(" ")}
                    aria-pressed={
                      selected
                    }
                    onClick={() =>
                      setWallpaper(
                        option.id,
                      )
                    }
                  >
                    <img
                      src={
                        option.image
                      }
                      alt=""
                    />

                    <span>
                      {
                        option.name
                      }
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </section>

        <section className="control-panel-section">
          <header>
            <h2>
              Som e áudio
            </h2>

            <p>
              Controle os sons e o volume geral do sistema.
            </p>
          </header>

          <div className="audio-settings">
            <div className="audio-setting-row">
              <div className="audio-setting-copy">
                <strong>
                  Sons do sistema
                </strong>

                <span>
                  Ative ou silencie os efeitos sonoros do HOSSOMII OS.
                </span>
              </div>

              <button
                type="button"
                className={[
                  "audio-toggle",
                  !audioMuted
                    ? "audio-toggle-enabled"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={
                  !audioMuted
                }
                onClick={() =>
                  setAudioMuted(
                    !audioMuted,
                  )
                }
              >
                {audioMuted
                  ? "Silenciado"
                  : "Ativado"}
              </button>
            </div>

            <div className="audio-volume-setting">
              <div className="audio-volume-heading">
                <label htmlFor="system-audio-volume">
                  Volume geral
                </label>

                <output
                  htmlFor="system-audio-volume"
                >
                  {
                    audioVolumePercent
                  }
                  %
                </output>
              </div>

              <input
                id="system-audio-volume"
                type="range"
                min="0"
                max="100"
                step="1"
                value={
                  audioVolumePercent
                }
                aria-valuetext={`${audioVolumePercent}%`}
                onChange={(
                  event,
                ) =>
                  setAudioVolume(
                    Number(
                      event
                        .currentTarget
                        .value,
                    ) /
                      100,
                  )
                }
              />

              <small>
                Define o volume máximo usado pelos sons da interface e do sistema.
              </small>
            </div>
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
            Restaura tema, wallpaper e preferências de áudio.
          </span>
        </section>
      </div>
    </div>
  );
}