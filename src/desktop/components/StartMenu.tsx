import profileAvatar from "../../assets/profile-avatar.webp";
import projectsIcon from "../../assets/icons/projects.webp";
import terminalIcon from "../../assets/icons/terminal.webp";

import type {
  WindowAppId,
} from "../../types/window";

type StartMenuProps = {
  open: boolean;

  onRestart:
    () => void;

  onOpenItem: (
    id: WindowAppId
  ) => void;
};

export function StartMenu({
  open,
  onRestart,
  onOpenItem,
}: StartMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <section
      id="hossomii-start-menu"
      className="start-menu"
      onClick={(
        event
      ) =>
        event.stopPropagation()
      }
    >
      <header className="start-menu-header">
        <img
          src={
            profileAvatar
          }
          alt="Avatar de Anthony"
        />

        <strong>
          Anthony
        </strong>
      </header>

      <div className="start-menu-content">
        <div className="start-menu-primary">
          <button
            type="button"
            onClick={() =>
              onOpenItem(
                "terminal"
              )
            }
          >
            <img
              className="start-menu-program-image"
              src={
                terminalIcon
              }
              alt=""
            />

            <span>
              <strong>
                Terminal
              </strong>

              <small>
                Acessar o sistema
              </small>
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              onOpenItem(
                "projects"
              )
            }
          >
            <img
              className="start-menu-program-image"
              src={
                projectsIcon
              }
              alt=""
            />

            <span>
              <strong>
                Meus Projetos
              </strong>

              <small>
                Trabalhos selecionados
              </small>
            </span>
          </button>
        </div>

        <div className="start-menu-secondary">
          <button
            type="button"
            onClick={() =>
              onOpenItem(
                "documents"
              )
            }
          >
            Meus Documentos
          </button>

          <button
            type="button"
            onClick={() =>
              onOpenItem(
                "computer"
              )
            }
          >
            Meu Computador
          </button>

          <button
            type="button"
          >
            Painel de Controle
          </button>

          <div className="start-menu-separator" />

          <button
            type="button"
          >
            Ajuda e suporte
          </button>
        </div>
      </div>

      <footer className="start-menu-footer">
        <button
          type="button"
          onClick={
            onRestart
          }
        >
          Reiniciar
        </button>

        <button
          type="button"
        >
          Desligar
        </button>
      </footer>
    </section>
  );
}