import {
  useState,
} from "react";

import {
  getPortfolioProject,
} from "../../content/projects";

import {
  useFileSystemStore,
} from "../../stores/filesystemStore";

import {
  useWindowStore,
} from "../../stores/windowStore";

import {
  getFileSystemIcon,
} from "../../system/filesystem/iconRegistry";

import documentsIcon from "../../assets/icons/documents.webp";

import type {
  FileSystemFile,
} from "../../types/filesystem";

type ProjectViewerAppProps = {
  projectId: string;
};

type ProjectViewerTab =
  | "overview"
  | "build-log"
  | "gallery"
  | "tech";

const imageExtensions = [
  "webp",
  "png",
  "jpg",
  "jpeg",
];

const projectTabs: {
  id: ProjectViewerTab;
  label: string;
}[] = [
  {
    id: "overview",
    label: "OVERVIEW",
  },
  {
    id: "build-log",
    label: "BUILD LOG",
  },
  {
    id: "gallery",
    label: "GALLERY",
  },
  {
    id: "tech",
    label: "TECH",
  },
];

export function ProjectViewerApp({
  projectId,
}: ProjectViewerAppProps) {
  const [
    activeTab,
    setActiveTab,
  ] =
    useState<ProjectViewerTab>(
      "overview"
    );

  const [
    selectedScreenshotId,
    setSelectedScreenshotId,
  ] =
    useState<string | null>(
      null
    );

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

  if (!project) {
    return (
      <div className="project-viewer-app">
        <div className="project-viewer-error">
          Não foi possível carregar este projeto.
        </div>
      </div>
    );
  }

  const projectPath =
    `C:\\Usuários\\Anthony\\Projetos\\${project.name}`;

  const projectIcon =
    getFileSystemIcon(
      project.iconId ??
        "projects"
    );

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

  const heroScreenshot =
    screenshots[0];

  const heroMetadata =
    heroScreenshot
      ? project.screenshots.find(
          (
            screenshot
          ) =>
            screenshot.fileName ===
            heroScreenshot.name
        )
      : undefined;

  const selectedScreenshot =
    screenshots.find(
      (
        screenshot
      ) =>
        screenshot.id ===
        selectedScreenshotId
    ) ??
    screenshots[0];

  const selectedScreenshotMetadata =
    selectedScreenshot
      ? project.screenshots.find(
          (
            screenshot
          ) =>
            screenshot.fileName ===
            selectedScreenshot.name
        )
      : undefined;

  const statusLabel =
    project.status ===
    "in-development"
      ? "EM DESENVOLVIMENTO"
      : project.status ===
          "completed"
        ? "CONCLUÍDO"
        : undefined;

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
        <div className="project-viewer-identity">
          {projectIcon && (
            <img
              className="project-viewer-project-icon"
              src={
                projectIcon
              }
              alt=""
              draggable={
                false
              }
            />
          )}

          <div className="project-viewer-title-area">
            <span className="project-viewer-label">
              HOSSOMII PORTFOLIO
            </span>

            <h1>
              {
                project.name
              }
            </h1>

            <div className="project-viewer-meta">
              {project.category && (
                <span>
                  {
                    project.category
                  }
                </span>
              )}

              {project.year && (
                <span>
                  {
                    project.year
                  }
                </span>
              )}

              {statusLabel && (
                <span className="project-viewer-status">
                  ●{" "}
                  {
                    statusLabel
                  }
                </span>
              )}
            </div>
          </div>
        </div>

        {(project.githubUrl ||
          project.demoUrl) && (
          <div className="project-viewer-header-actions">
            {project.githubUrl && (
              <a
                href={
                  project.githubUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            )}

            {project.demoUrl && (
              <a
                href={
                  project.demoUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir projeto ↗
              </a>
            )}
          </div>
        )}
      </header>

      {heroScreenshot &&
        heroScreenshot.resourceUrl && (
          <section className="project-viewer-hero">
            <button
              type="button"
              onClick={() =>
                openScreenshot(
                  heroScreenshot.id,
                  heroScreenshot.name
                )
              }
            >
              <img
                src={
                  heroScreenshot.resourceUrl
                }
                alt={
                  heroMetadata?.alt ??
                  heroScreenshot.name
                }
                draggable={
                  false
                }
              />

              <span className="project-viewer-hero-overlay">
                <strong>
                  {
                    heroMetadata?.caption ??
                    project.name
                  }
                </strong>

                <small>
                  Clique para ampliar
                </small>
              </span>
            </button>
          </section>
        )}

      <nav
        className="project-viewer-tabs"
        aria-label="Seções do projeto"
      >
        {projectTabs.map(
          (
            tab
          ) => (
            <button
              key={
                tab.id
              }
              type="button"
              className={
                activeTab ===
                tab.id
                  ? "is-active"
                  : undefined
              }
              aria-pressed={
                activeTab ===
                tab.id
              }
              onClick={() =>
                setActiveTab(
                  tab.id
                )
              }
            >
              {
                tab.label
              }
            </button>
          )
        )}
      </nav>

      <div className="project-viewer-content">
        {activeTab ===
          "overview" && (
          <div className="project-viewer-tab-panel">
            <section className="project-viewer-intro">
              <span>
                PROJECT OVERVIEW
              </span>

              <h2>
                Sobre o projeto
              </h2>

              <p>
                {
                  project.summary
                }
              </p>
            </section>

            {(project.challenge ||
              project.solution) && (
              <div className="project-viewer-overview-grid">
                {project.challenge && (
                  <section className="project-viewer-card">
                    <span className="project-viewer-card-index">
                      01
                    </span>

                    <h3>
                      Desafio
                    </h3>

                    <p>
                      {
                        project.challenge
                      }
                    </p>
                  </section>
                )}

                {project.solution && (
                  <section className="project-viewer-card">
                    <span className="project-viewer-card-index">
                      02
                    </span>

                    <h3>
                      Solução
                    </h3>

                    <p>
                      {
                        project.solution
                      }
                    </p>
                  </section>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab ===
          "build-log" && (
          <div className="project-viewer-tab-panel">
            <section className="project-viewer-section">
              <span className="project-viewer-section-label">
                ROLE
              </span>

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
              <span className="project-viewer-section-label">
                CONTRIBUTIONS
              </span>

              <h2>
                Principais atividades
              </h2>

              <ul className="project-viewer-list">
                {project.highlights.map(
                  (
                    highlight
                  ) => (
                    <li
                      key={
                        highlight
                      }
                    >
                      {
                        highlight
                      }
                    </li>
                  )
                )}
              </ul>
            </section>

            {project.technicalDecisions &&
              project.technicalDecisions.length >
                0 && (
                <section className="project-viewer-section">
                  <span className="project-viewer-section-label">
                    ENGINEERING NOTES
                  </span>

                  <h2>
                    Build Log
                  </h2>

                  <ol className="project-viewer-build-log">
                    {project.technicalDecisions.map(
                      (
                        decision
                      ) => (
                        <li
                          key={
                            decision
                          }
                        >
                          <span>
                            {
                              decision
                            }
                          </span>
                        </li>
                      )
                    )}
                  </ol>
                </section>
              )}

            {project.learnings &&
              project.learnings.length >
                0 && (
                <section className="project-viewer-section">
                  <span className="project-viewer-section-label">
                    POST-MORTEM
                  </span>

                  <h2>
                    Aprendizados
                  </h2>

                  <ul className="project-viewer-list">
                    {project.learnings.map(
                      (
                        learning
                      ) => (
                        <li
                          key={
                            learning
                          }
                        >
                          {
                            learning
                          }
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}
          </div>
        )}

        {activeTab ===
          "gallery" && (
          <div className="project-viewer-tab-panel">
            {selectedScreenshot &&
            selectedScreenshot.resourceUrl ? (
              <>
                <button
                  type="button"
                  className="project-viewer-gallery-main"
                  onClick={() =>
                    openScreenshot(
                      selectedScreenshot.id,
                      selectedScreenshot.name
                    )
                  }
                >
                  <img
                    src={
                      selectedScreenshot.resourceUrl
                    }
                    alt={
                      selectedScreenshotMetadata?.alt ??
                      selectedScreenshot.name
                    }
                    draggable={
                      false
                    }
                  />

                  <span>
                    {
                      selectedScreenshotMetadata?.caption ??
                      selectedScreenshot.name
                    }
                  </span>
                </button>

                <div className="project-viewer-gallery-thumbnails">
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
                          className={
                            selectedScreenshot.id ===
                            screenshot.id
                              ? "is-active"
                              : undefined
                          }
                          aria-pressed={
                            selectedScreenshot.id ===
                            screenshot.id
                          }
                          onClick={() =>
                            setSelectedScreenshotId(
                              screenshot.id
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
                              metadata?.caption ??
                              screenshot.name
                            }
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </>
            ) : (
              <div className="project-viewer-empty">
                Nenhuma imagem disponível para este projeto.
              </div>
            )}
          </div>
        )}

        {activeTab ===
          "tech" && (
          <div className="project-viewer-tab-panel">
            <section className="project-viewer-section">
              <span className="project-viewer-section-label">
                STACK
              </span>

              <h2>
                Tecnologias
              </h2>

              <div className="project-viewer-tags">
                {project.technologies.map(
                  (
                    technology
                  ) => (
                    <span
                      key={
                        technology
                      }
                    >
                      {
                        technology
                      }
                    </span>
                  )
                )}
              </div>
            </section>

            <section className="project-viewer-section">
              <span className="project-viewer-section-label">
                PROJECT INFO
              </span>

              <h2>
                Informações
              </h2>

              <dl className="project-viewer-info">
                {project.category && (
                  <div>
                    <dt>
                      Categoria
                    </dt>

                    <dd>
                      {
                        project.category
                      }
                    </dd>
                  </div>
                )}

                {project.year && (
                  <div>
                    <dt>
                      Ano
                    </dt>

                    <dd>
                      {
                        project.year
                      }
                    </dd>
                  </div>
                )}

                {statusLabel && (
                  <div>
                    <dt>
                      Status
                    </dt>

                    <dd>
                      {
                        statusLabel
                      }
                    </dd>
                  </div>
                )}

                <div>
                  <dt>
                    Localização
                  </dt>

                  <dd>
                    {
                      projectPath
                    }
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        )}

        <footer className="project-viewer-footer">
          <span>
            HOSSOMII PROJECT DATABASE
          </span>

          <span>
            {
              projectPath
            }
          </span>
        </footer>
      </div>
    </div>
  );
}