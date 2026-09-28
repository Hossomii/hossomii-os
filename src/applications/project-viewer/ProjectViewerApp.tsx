import {
  getPortfolioProject,
} from "../../content/projects";

import {
  useFileSystemStore,
} from "../../stores/filesystemStore";

import {
  useWindowStore,
} from "../../stores/windowStore";

import documentsIcon from "../../assets/icons/documents.webp";

import type {
  FileSystemFile,
} from "../../types/filesystem";

type ProjectViewerAppProps = {
  projectId: string;
};

const imageExtensions = [
  "webp",
  "png",
  "jpg",
  "jpeg",
];

export function ProjectViewerApp({
  projectId,
}: ProjectViewerAppProps) {
  const items =
    useFileSystemStore(
      (state) =>
        state.items
    );

  const openWindow =
    useWindowStore(
      (state) =>
        state.openWindow
    );

  const project =
    getPortfolioProject(
      projectId
    );

  if (
    !project
  ) {
    return (
      <div className="project-viewer-app">
        <div className="project-viewer-error">
          Não foi possível carregar este projeto.
        </div>
      </div>
    );
  }

  const screenshots =
    items
      .filter(
        (
          item
        ): item is FileSystemFile =>
          item.parentId ===
            projectId &&
          item.type ===
            "file" &&
          !item.trashed &&
          !item.hidden &&
          imageExtensions.includes(
            item.extension.toLowerCase()
          ) &&
          Boolean(
            item.resourceUrl
          )
      )
      .slice(
        0,
        3
      );

  function openScreenshot(
    fileId: string,
    fileName: string
  ) {
    openWindow({
      appId:
        "image-viewer",

      instanceId:
        fileId,

      title:
        `${fileName} - Visualizador de Imagens`,

      icon:
        documentsIcon,

      data: {
        fileId,
      },
    });
  }

  return (
    <div className="project-viewer-app">
      <header className="project-viewer-header">
        <span className="project-viewer-label">
          HOSSOMII PORTFOLIO
        </span>

        <h1>
          {project.name}
        </h1>

        <p>
          Projeto armazenado em:
          {" "}
          C:\Usuários\Anthony\Projetos\
          {project.name}
        </p>
      </header>

      <div className="project-viewer-content">
        {screenshots.length >
          0 && (
          <section className="project-viewer-section">
            <h2>
              Galeria
            </h2>

            <div className="project-viewer-gallery">
              {screenshots.map(
                (
                  screenshot
                ) => {
                  const metadata =
                    project.screenshots.find(
                      (
                        item
                      ) =>
                        item.fileName ===
                        screenshot.name
                    );

                  return (
                    <button
                      key={
                        screenshot.id
                      }
                      type="button"
                      onClick={() =>
                        openScreenshot(
                          screenshot.id,
                          screenshot.name
                        )
                      }
                    >
                      <img
                        src={
                          screenshot.resourceUrl
                        }
                        alt={
                          metadata?.alt ??
                          screenshot.name
                        }
                        draggable={
                          false
                        }
                      />

                      <span>
                        {
                          screenshot.name
                        }
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </section>
        )}

        <section className="project-viewer-section">
          <h2>
            Sobre o projeto
          </h2>

          <p className="project-viewer-description">
            {
              project.summary
            }
          </p>
        </section>

        <section className="project-viewer-section">
          <h2>
            Minha participação
          </h2>

          <p className="project-viewer-description">
            {
              project.role
            }
          </p>
        </section>

        <section className="project-viewer-section">
          <h2>
            Tecnologias
          </h2>

          <pre className="project-viewer-technologies">
            {project.technologies
              .map(
                (
                  technology
                ) =>
                  `- ${technology}`
              )
              .join(
                "\n"
              )}
          </pre>
        </section>

        <section className="project-viewer-section">
          <h2>
            Principais atividades
          </h2>

          <pre className="project-viewer-technologies">
            {project.highlights
              .map(
                (
                  highlight
                ) =>
                  `- ${highlight}`
              )
              .join(
                "\n"
              )}
          </pre>
        </section>

        <footer className="project-viewer-footer">
          <span>
            Os arquivos originais continuam disponíveis
            dentro da pasta do projeto.
          </span>
        </footer>
      </div>
    </div>
  );
}