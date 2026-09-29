import profileAvatar from "../../../assets/profile-avatar.webp";

import { portfolioProjects } from "../../../content/projects";

type BrowserProfilePageProps = {
  onOpenExternal: (url: string) => void;
};

const PROFILE_TICKER_ITEMS = [
  "★ SOFTWARE",
  "♥ INTERNET",
  "✦ CYBERSECURITY",
  "★ PROJECTS",
  "☺ CURIOSITY",
  "✦ HOSSOMII OS",
];

export function BrowserProfilePage({
  onOpenExternal,
}: BrowserProfilePageProps) {
  const technologies = Array.from(
    new Set(portfolioProjects.flatMap((project) => project.technologies)),
  ).slice(0, 10);

  return (
    <main className="browser-profile">
      <div className="profile-site">
        <header className="profile-pop-header">
          <div className="profile-pop-logo">
            <span className="profile-pop-star">★</span>

            <div>
              <small>HOSSOMII NETWORK PRESENTS</small>

              <h1>Anthony Online!</h1>

              <p>my tiny corner of the internet ☆</p>
            </div>
          </div>

          <div className="profile-pop-status">
            <span>● ONLINE</span>

            <strong>anthony.exe</strong>

            <small>mood: building stuff</small>
          </div>
        </header>

        <div className="profile-pop-ticker">
          <div className="profile-pop-ticker-track">
            <div className="profile-pop-ticker-group">
              {PROFILE_TICKER_ITEMS.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="profile-pop-ticker-group" aria-hidden="true">
              {PROFILE_TICKER_ITEMS.map((item) => (
                <span key={`duplicate-${item}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <nav className="profile-pop-nav">
          <span>♡ home</span>
          <span>☆ about me</span>
          <span>✦ projects</span>
          <span>☁ links</span>
          <span>✉ guestbook</span>
        </nav>

        <div className="profile-pop-layout">
          <aside className="profile-pop-left">
            <section className="profile-widget profile-widget-pink">
              <h2>♡ my profile</h2>

              <div className="profile-pop-avatar">
                <div className="profile-avatar-decoration">★</div>

                <img src={profileAvatar} alt="Anthony" draggable={false} />

                <span>anthony.jpg</span>
              </div>

              <dl className="profile-pop-details">
                <div>
                  <dt>name</dt>

                  <dd>Anthony</dd>
                </div>

                <div>
                  <dt>status</dt>

                  <dd>online ★</dd>
                </div>

                <div>
                  <dt>occupation</dt>

                  <dd>developer</dd>
                </div>

                <div>
                  <dt>studying</dt>

                  <dd>software eng.</dd>
                </div>

                <div>
                  <dt>current mood</dt>

                  <dd>curious :)</dd>
                </div>
              </dl>
            </section>

            <section className="profile-widget profile-widget-yellow">
              <h2>☆ find me online</h2>

              <div className="profile-pop-links">
                <button
                  type="button"
                  onClick={() =>
                    onOpenExternal(
                      "https://www.linkedin.com/in/anthony-hossomii-bugs/",
                    )
                  }
                >
                  linkedin.exe ↗
                </button>

                <button
                  type="button"
                  onClick={() => onOpenExternal("https://github.com/Hossomii")}
                >
                  github.exe ↗
                </button>
              </div>
            </section>

            <div className="profile-sticker profile-sticker-lime">
              <strong>100%</strong>

              <span>
                INTERNET
                <br />
                USER
              </span>
            </div>
          </aside>

          <section className="profile-pop-main">
            <section className="profile-pop-welcome">
              <span className="profile-floating-star profile-floating-star-one">
                ★
              </span>

              <span className="profile-floating-star profile-floating-star-two">
                ✦
              </span>

              <span className="profile-welcome-label">WELCOME 2 MY PAGE!!</span>

              <h2>hi, internet! :)</h2>

              <p>
                Sou desenvolvedor de software e estudante de Engenharia de
                Software.
              </p>

              <p>
                Gosto de entender como sistemas funcionam, construir coisas,
                experimentar tecnologias e explorar segurança.
              </p>

              <p>
                Esta página é meu pequeno espaço digital dentro do HOSSOMII OS.
              </p>

              <div className="profile-welcome-signature">— Anthony ♡</div>
            </section>

            <section className="profile-pop-projects">
              <header>
                <div>
                  <span>✦</span>

                  <h2>cool stuff i've made</h2>
                </div>

                <strong>{portfolioProjects.length} PROJECTS</strong>
              </header>

              <div className="profile-pop-project-grid">
                {portfolioProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className={[
                      "profile-pop-project",
                      index % 2 === 0
                        ? "profile-pop-project-cyan"
                        : "profile-pop-project-purple",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="profile-project-number">0{index + 1}</div>

                    <span className="profile-project-sticker">NEW!</span>

                    <h3>{project.name}</h3>

                    <p>{project.summary}</p>

                    <div className="profile-pop-tech">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>

                    <div className="profile-pop-project-actions">
                      {project.githubUrl && (
                        <button
                          type="button"
                          onClick={() => onOpenExternal(project.githubUrl!)}
                        >
                          view source ↗
                        </button>
                      )}

                      {project.demoUrl && (
                        <button
                          type="button"
                          onClick={() => onOpenExternal(project.demoUrl!)}
                        >
                          visit site ↗
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="profile-pop-techbox">
              <div className="profile-techbox-title">
                <span>★</span>

                <h2>what's installed in my brain?</h2>
              </div>

              <div className="profile-pop-tech-cloud">
                {technologies.map((technology, index) => (
                  <span
                    key={technology}
                    className={`profile-tech-color-${(index % 5) + 1}`}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            <section className="profile-pop-guestbook">
              <div className="profile-guestbook-title">
                <span>✉</span>

                <h2>guestbook</h2>
              </div>

              <article>
                <strong>anthony wrote:</strong>

                <p>
                  se você encontrou essa página explorando o sistema, parabéns
                  pela curiosidade ♥
                </p>

                <small>posted from HOSSOMII-01</small>
              </article>
            </section>
          </section>

          <aside className="profile-pop-right">
            <section className="profile-widget profile-widget-cyan">
              <h2>✦ quick facts</h2>

              <ul>
                <li>software engineering</li>

                <li>backend</li>

                <li>cybersecurity</li>

                <li>systems</li>

                <li>weird web stuff</li>
              </ul>
            </section>

            <section className="profile-widget profile-widget-purple">
              <h2>♫ now doing</h2>

              <div className="profile-now-doing">
                <span>CURRENT ACTIVITY</span>

                <strong>HOSSOMII OS</strong>

                <p>
                  building a fake operating system because a normal portfolio
                  would be boring.
                </p>

                <div className="profile-progress">
                  <span />
                </div>
              </div>
            </section>

            <div className="profile-sticker profile-sticker-pink">
              <span>MADE WITH</span>

              <strong>♥</strong>

              <span>AND CODE</span>
            </div>

            <section className="profile-widget profile-widget-yellow profile-visitor-widget">
              <h2>★ visitor counter</h2>

              <div className="profile-visitor-counter">
                <strong>000042</strong>

                <span>lucky visitor!</span>
              </div>
            </section>

            <section className="profile-widget profile-widget-green">
              <h2>☺ web badges</h2>

              <div className="profile-mini-badges">
                <span>HTML</span>

                <span>CSS</span>

                <span>JS</span>

                <span>2000s</span>
              </div>
            </section>
          </aside>
        </div>

        <footer className="profile-pop-footer">
          <span>★ Anthony Online! © 2026 ★</span>

          <span>best viewed with curiosity enabled</span>

          <span>hosted somewhere inside HOSSOMII OS</span>
        </footer>
      </div>
    </main>
  );
}
