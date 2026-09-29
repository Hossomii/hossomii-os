import { portfolioProjects } from "../../content/projects";

import { useWindowStore } from "../../stores/windowStore";

import { getFileSystemIcon } from "../../system/filesystem/iconRegistry";

import profileAvatar from "../../assets/profile-avatar.webp";
import documentsIcon from "../../assets/icons/documents.webp";
import projectsIcon from "../../assets/icons/projects.webp";

const currentFocus = [
  "Python",
  "Software Engineering",
  "Backend",
  "Systems",
  "Networks",
  "Cybersecurity",
];

const externalLinks = {
  github: "https://github.com/Hossomii",

  linkedin: "https://www.linkedin.com/in/anthony-hossomii-bugs/",
};

export function QuickViewApp() {
  const openWindow = useWindowStore((state) => state.openWindow);

  function openProject(projectId: string) {
    const project = portfolioProjects.find((item) => item.id === projectId);

    if (!project) {
      return;
    }

    const projectIcon = getFileSystemIcon(project.iconId ?? "projects");

    openWindow({
      appId: "project-viewer",

      instanceId: project.id,

      title: `${project.name} - HOSSOMII Portfolio`,

      icon: projectIcon ?? projectsIcon,

      data: {
        projectId: project.id,
      },
    });
  }

  function openProjects() {
    openWindow({
      appId: "projects",

      title: "Meus Projetos",

      icon: projectsIcon,
    });
  }

  function openResume() {
    openWindow({
      appId: "pdf-viewer",

      instanceId: "resume-file",

      title: "currículo.pdf - Visualizador de PDF",

      icon: documentsIcon,

      data: {
        fileId: "resume-file",
      },
    });
  }

  function openDocuments() {
    openWindow({
      appId: "documents",

      title: "Meus Documentos",

      icon: documentsIcon,
    });
  }

  return (
    <main className="quick-view-app">
      <header className="quick-view-hero">
        <img src={profileAvatar} alt="Anthony" draggable={false} />

        <div>
          <span className="quick-view-eyebrow">HOSSOMII QUICK VIEW</span>

          <h1>Anthony</h1>

          <p className="quick-view-role">
            Software Developer · Engenharia de Software
          </p>

          <p className="quick-view-summary">
            Desenvolvedor de software interessado em backend, sistemas, redes e
            cibersegurança. Gosto de entender como software funciona por dentro
            e transformar fundamentos técnicos em projetos práticos.
          </p>
        </div>
      </header>

      <nav className="quick-view-actions" aria-label="Acesso rápido">
        <button type="button" onClick={openProjects}>
          Meus Projetos
        </button>

        <button type="button" onClick={openResume}>
          Currículo
        </button>

        <button type="button" onClick={openDocuments}>
          Documentos
        </button>

        <a
          href={externalLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>

        <a
          href={externalLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </nav>

      <div className="quick-view-layout">
        <section className="quick-view-section">
          <header className="quick-view-section-header">
            <span>01</span>

            <h2>Foco atual</h2>
          </header>

          <div className="quick-view-focus">
            {currentFocus.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
        </section>

        <section className="quick-view-section">
          <header className="quick-view-section-header">
            <span>02</span>

            <h2>Projetos em destaque</h2>
          </header>

          <div className="quick-view-projects">
            {portfolioProjects.map((project) => (
              <article key={project.id} className="quick-view-project">
                <div className="quick-view-project-top">
                  <div>
                    <span>{project.category ?? "Software Project"}</span>

                    <h3>{project.name}</h3>
                  </div>

                  {project.status && (
                    <small>
                      {project.status === "completed"
                        ? "CONCLUÍDO"
                        : "EM DESENVOLVIMENTO"}
                    </small>
                  )}
                </div>

                <p>{project.summary}</p>

                <div className="quick-view-project-tech">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <button type="button" onClick={() => openProject(project.id)}>
                  Abrir project.exe
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="quick-view-section quick-view-section-wide">
          <header className="quick-view-section-header">
            <span>03</span>

            <h2>O que você encontra aqui</h2>
          </header>

          <div className="quick-view-system-map">
            <div>
              <strong>Projetos</strong>

              <span>Cases técnicos, decisões e demos</span>
            </div>

            <div>
              <strong>Documentos</strong>

              <span>Sobre mim e currículo</span>
            </div>

            <div>
              <strong>HOSSOMII Web</strong>

              <span>Perfil, links e experiências web</span>
            </div>

            <div>
              <strong>Terminal</strong>

              <span>Outra forma de explorar o sistema</span>
            </div>
          </div>
        </section>
      </div>

      <footer className="quick-view-footer">
        <span>QUICK VIEW // HOSSOMII OS</span>

        <span>explore_more.exe</span>
      </footer>
    </main>
  );
}
