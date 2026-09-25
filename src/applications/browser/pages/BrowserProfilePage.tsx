import profileAvatar from "../../../assets/profile-avatar.webp";

import {
  portfolioProjects,
} from "../../../content/projects";

type BrowserProfilePageProps = {
  onOpenExternal: (
    url: string
  ) => void;
};

export function BrowserProfilePage({
  onOpenExternal,
}: BrowserProfilePageProps) {
  const technologies =
    Array.from(
      new Set(
        portfolioProjects.flatMap(
          (project) =>
            project.technologies
        )
      )
    ).slice(
      0,
      10
    );

  return (
    <main className="browser-profile">
      <div className="profile-site">
        <header className="profile-masthead">
          <div>
            <span className="profile-network-label">
              HOSSOMII NETWORK
            </span>

            <h1>
              Anthony Online!
            </h1>

            <p>
              software • projetos • internet • coisas estranhas
            </p>
          </div>

          <div className="profile-login-status">
            <strong>
              ● ONLINE
            </strong>

            <span>
              user: anthony
            </span>
          </div>
        </header>

        <nav className="profile-nav">
          <span>HOME</span>
          <span>PROFILE</span>
          <span>PROJECTS</span>
          <span>NETWORK</span>
          <span>GUESTBOOK</span>
        </nav>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <section className="profile-card">
              <h2>
                Anthony
              </h2>

              <div className="profile-avatar-frame">
                <img
                  src={
                    profileAvatar
                  }
                  alt="Anthony"
                  draggable={
                    false
                  }
                />
              </div>

              <dl className="profile-info-list">
                <div>
                  <dt>
                    Status
                  </dt>

                  <dd>
                    online
                  </dd>
                </div>

                <div>
                  <dt>
                    Área
                  </dt>

                  <dd>
                    Software
                  </dd>
                </div>

                <div>
                  <dt>
                    Interesse
                  </dt>

                  <dd>
                    Engenharia
                  </dd>
                </div>

                <div>
                  <dt>
                    Mood
                  </dt>

                  <dd>
                    construindo
                  </dd>
                </div>
              </dl>
            </section>

            <section className="profile-card">
              <h2>
                Contact.exe
              </h2>

              <div className="profile-side-actions">
                <button
                  type="button"
                  onClick={() =>
                    onOpenExternal(
                      "https://www.linkedin.com/in/anthony-hossomii-bugs/"
                    )
                  }
                >
                  LinkedIn ↗
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenExternal(
                      "https://github.com/Hossomii"
                    )
                  }
                >
                  GitHub ↗
                </button>
              </div>
            </section>

            <section className="profile-card">
              <h2>
                Web Status
              </h2>

              <div className="profile-status-box">
                <strong>
                  CURRENT ACTIVITY
                </strong>

                <p>
                  Construindo o HOSSOMII OS e explorando
                  novas formas de criar software.
                </p>
              </div>
            </section>
          </aside>

          <section className="profile-main">
            <section className="profile-welcome">
              <div className="profile-welcome-title">
                <span>
                  ★
                </span>

                <h2>
                  Bem-vindo ao meu canto da internet!
                </h2>
              </div>

              <p>
                Sou desenvolvedor de software e estudante
                de Engenharia de Software.
              </p>

              <p>
                Gosto de construir sistemas, entender como
                as coisas funcionam, explorar segurança e
                transformar ideias em produtos interativos.
              </p>

              <p>
                Este perfil faz parte do HOSSOMII OS e foi
                criado como uma interpretação divertida das
                páginas pessoais e comunidades da web dos
                anos 2000.
              </p>
            </section>

            <section className="profile-section">
              <header>
                <h2>
                  :: Projetos recentes
                </h2>

                <span>
                  {portfolioProjects.length} ONLINE
                </span>
              </header>

              <div className="profile-project-list">
                {portfolioProjects.map(
                  (
                    project
                  ) => (
                    <article
                      key={
                        project.id
                      }
                      className="profile-project"
                    >
                      <div className="profile-project-heading">
                        <strong>
                          {
                            project.name
                          }
                        </strong>

                        <span>
                          PROJECT
                        </span>
                      </div>

                      <p>
                        {
                          project.summary
                        }
                      </p>

                      <div className="profile-project-tech">
                        {project.technologies
                          .slice(
                            0,
                            5
                          )
                          .map(
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

                      <div className="profile-project-actions">
                        {project.githubUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenExternal(
                                project.githubUrl!
                              )
                            }
                          >
                            código ↗
                          </button>
                        )}

                        {project.demoUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenExternal(
                                project.demoUrl!
                              )
                            }
                          >
                            visitar ↗
                          </button>
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>

            <section className="profile-section">
              <header>
                <h2>
                  :: Tech Box
                </h2>

                <span>
                  INSTALLED
                </span>
              </header>

              <div className="profile-tech-cloud">
                {technologies.map(
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

            <section className="profile-message-board">
              <h2>
                MESSAGE BOARD
              </h2>

              <div>
                <strong>
                  anthony:
                </strong>

                <p>
                  Se você chegou até aqui explorando o
                  sistema, obrigado pela curiosidade. :)
                </p>
              </div>
            </section>
          </section>

          <aside className="profile-rightbar">
            <section>
              <h2>
                Quick Profile
              </h2>

              <ul>
                <li>
                  Software Engineering
                </li>

                <li>
                  Backend
                </li>

                <li>
                  Cybersecurity
                </li>

                <li>
                  Systems
                </li>

                <li>
                  Interactive Web
                </li>
              </ul>
            </section>

            <section>
              <h2>
                My Network
              </h2>

              <button
                type="button"
                onClick={() =>
                  onOpenExternal(
                    "https://github.com/Hossomii"
                  )
                }
              >
                GitHub
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenExternal(
                    "https://www.linkedin.com/in/anthony-hossomii-bugs/"
                  )
                }
              >
                LinkedIn
              </button>
            </section>

            <section className="profile-notice">
              <h2>
                NOTICE
              </h2>

              <p>
                Esta página é melhor visualizada dentro do
                HOSSOMII Web.
              </p>
            </section>

            <section className="profile-web-badge">
              <span>
                BUILT WITH
              </span>

              <strong>
                HTML
              </strong>

              <small>
                probably
              </small>
            </section>
          </aside>
        </div>

        <footer className="profile-footer">
          <span>
            Anthony Online © 2026
          </span>

          <span>
            hosted by HOSSOMII Internet Service
          </span>
        </footer>
      </div>
    </main>
  );
}