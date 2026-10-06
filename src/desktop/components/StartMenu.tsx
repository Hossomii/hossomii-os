import {
  useLayoutEffect,
  useRef,
} from "react";

import {
  gsap,
} from "gsap";

import profileAvatar from "../../assets/profile-avatar.webp";
import projectsIcon from "../../assets/icons/projects.webp";
import terminalIcon from "../../assets/icons/terminal.webp";

import type {
  WindowAppId,
} from "../../types/window";

type StartMenuProps = {
  open: boolean;

  onRestart: () => void;

  onShutdown: () => void;

  onOpenItem: (
    id: WindowAppId
  ) => void;
};

export function StartMenu({
  open,
  onRestart,
  onShutdown,
  onOpenItem,
}: StartMenuProps) {
  const menuRef =
    useRef<HTMLElement>(
      null
    );

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const element =
      menuRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (
      prefersReducedMotion
    ) {
      return;
    }

    const animation =
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 10,
          scaleX: 0.985,
          scaleY: 0.965,

          transformOrigin:
            "left bottom",
        },
        {
          opacity: 1,
          y: 0,
          scaleX: 1,
          scaleY: 1,

          duration: 0.15,

          ease:
            "power2.out",

          clearProps:
            "transform,opacity,transformOrigin",
        }
      );

    return () => {
      animation.kill();
    };
  }, [
    open,
  ]);

  if (!open) {
    return null;
  }

  return (
    <section
      ref={menuRef}
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
                "quick-view"
              )
            }
          >
            <img
              className="start-menu-program-image"
              src={
                profileAvatar
              }
              alt=""
            />

            <span>
              <strong>
                Quick View
              </strong>

              <small>
                Resumo profissional
              </small>
            </span>
          </button>

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
            onClick={() =>
              onOpenItem(
                "control-panel"
              )
            }
          >
            Painel de Controle
          </button>

          <div className="start-menu-separator" />

          <button type="button">
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
          onClick={
            onShutdown
          }
        >
          Desligar
        </button>
      </footer>
    </section>
  );
}