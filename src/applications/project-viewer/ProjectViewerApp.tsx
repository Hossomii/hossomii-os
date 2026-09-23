import { useFileSystemStore } from "../../stores/filesystemStore";
import { useWindowStore } from "../../stores/windowStore";

import documentsIcon from "../../assets/icons/documents.webp";

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
  const items = useFileSystemStore(
    (state) => state.items
  );

  const openWindow = useWindowStore(
    (state) => state.openWindow
  );

  const project = items.find(
    (item) =>
      item.id === projectId &&
      item.type === "directory"
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

  const children = items.filter(
    (item) =>
      item.parentId === projectId &&
      !item.trashed &&
      !item.hidden
  );

  const aboutFile = children.find(
    (item) =>
      item.type === "file" &&
      item.name === "sobre-o-projeto.txt"
  );

  const technologiesFile =
    children.find(
      (item) =>
        item.type === "file" &&
        item.name === "tecnologias.txt"
    );

  const screenshots =
    children
      .filter(
        (item) =>
          item.type === "file" &&
          imageExtensions.includes(
            item.extension.toLowerCase()
          ) &&
          Boolean(item.resourceUrl)
      )
      .slice(0, 3);

  const about =
    aboutFile?.type === "file"
      ? aboutFile.content
      : undefined;

  const technologies =
    technologiesFile?.type === "file"
      ? technologiesFile.content
      : undefined;

  function openScreenshot(
    fileId: string,
    fileName: string
  ) {
    openWindow({
      appId: "image-viewer",

      instanceId: fileId,

      title: `${fileName} - Visualizador de Imagens`,

      icon: documentsIcon,

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

        <h1>{project.name}</h1>

        <p>
          Projeto armazenado em:
          {" "}
          C:\Usuários\Anthony\Projetos\
          {project.name}
        </p>
      </header>

      <div className="project-viewer-content">
        {screenshots.length > 0 && (
          <section className="project-viewer-section">
            <h2>Galeria</h2>

            <div className="project-viewer-gallery">
              {screenshots.map(
                (screenshot) => {
                  if (
                    screenshot.type !==
                      "file" ||
                    !screenshot.resourceUrl
                  ) {
                    return null;
                  }

                  return (
                    <button
                      key={screenshot.id}
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
                          screenshot.name
                        }
                        draggable={false}
                      />

                      <span>
                        {screenshot.name}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </section>
        )}

        <section className="project-viewer-section">
          <h2>Sobre o projeto</h2>

          <p className="project-viewer-description">
            {about ??
              "Informações sobre este projeto ainda não foram adicionadas."}
          </p>
        </section>

        <section className="project-viewer-section">
          <h2>Tecnologias e experiência</h2>

          <pre className="project-viewer-technologies">
            {technologies ??
              "Informações técnicas ainda não foram adicionadas."}
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