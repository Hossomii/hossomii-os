import documentsIcon from "../../assets/icons/documents.webp";
import projectsIcon from "../../assets/icons/projects.webp";

export function ComputerApp() {
  return (
    <div className="computer-app">
      <div className="explorer-toolbar">
        <button
          type="button"
          disabled
        >
          ← Voltar
        </button>

        <span className="explorer-toolbar-separator" />

        <span className="explorer-address-label">
          Endereço
        </span>

        <div className="explorer-address">
          Meu Computador
        </div>
      </div>

      <div className="computer-app-content">
        <aside className="computer-sidebar">
          <section>
            <h2>Tarefas do sistema</h2>

            <button type="button">
              Exibir informações do sistema
            </button>

            <button type="button">
              Alterar uma configuração
            </button>
          </section>

          <section>
            <h2>Outros locais</h2>

            <button type="button">
              Meus Documentos
            </button>

            <button type="button">
              Meus Projetos
            </button>
          </section>
        </aside>

        <div className="computer-main">
          <section className="computer-section">
            <h2>
              Arquivos armazenados neste
              computador
            </h2>

            <div className="computer-items">
              <button type="button">
                <img
                  src={documentsIcon}
                  alt=""
                />

                <span>
                  <strong>
                    Meus Documentos
                  </strong>

                  <small>
                    Documentos de Anthony
                  </small>
                </span>
              </button>

              <button type="button">
                <img
                  src={projectsIcon}
                  alt=""
                />

                <span>
                  <strong>
                    Meus Projetos
                  </strong>

                  <small>
                    Projetos de software
                  </small>
                </span>
              </button>
            </div>
          </section>

          <section className="computer-section">
            <h2>Unidades de disco rígido</h2>

            <div className="computer-items">
              <button type="button">
                <span className="hard-drive-icon">
                  <span />
                </span>

                <span>
                  <strong>
                    Disco local (C:)
                  </strong>

                  <small>
                    Sistema HOSSOMII
                  </small>
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}