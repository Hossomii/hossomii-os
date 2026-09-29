import {
  useEffect,
  useState,
} from "react";

import {
  fetchLatestNews,
  type NewsArticle,
} from "../news/newsService";

type BrowserNewsPageProps = {
  onOpenExternal: (
    url: string
  ) => void;
};

function NewsImage({
  article,
  className,
  eager = false,
}: {
  article: NewsArticle;
  className: string;
  eager?: boolean;
}) {
  return (
    <div
      className={
        className
      }
    >
      <span
        className="news-image-fallback"
        aria-hidden="true"
      >
        HN
      </span>

      {article.imageUrl && (
        <img
          src={
            article.imageUrl
          }
          alt=""
          loading={
            eager
              ? "eager"
              : "lazy"
          }
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(
            event
          ) => {
            event.currentTarget.style.display =
              "none";
          }}
        />
      )}
    </div>
  );
}

export function BrowserNewsPage({
  onOpenExternal,
}: BrowserNewsPageProps) {
  const [
    articles,
    setArticles,
  ] =
    useState<
      NewsArticle[]
    >(
      []
    );

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    );

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(
      null
    );

  useEffect(() => {
    const controller =
      new AbortController();

    async function loadNews() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        const result =
          await fetchLatestNews(
            controller.signal
          );

        setArticles(
          result
        );
      } catch (
        requestError
      ) {
        if (
          controller
            .signal
            .aborted
        ) {
          return;
        }

        console.error(
          requestError
        );

        setError(
          "Não foi possível carregar as notícias."
        );
      } finally {
        if (
          !controller
            .signal
            .aborted
        ) {
          setLoading(
            false
          );
        }
      }
    }

    void loadNews();

    return () => {
      controller.abort();
    };
  }, []);

  if (
    loading
  ) {
    return (
      <main className="browser-internal-page">
        <div className="browser-placeholder-page">
          <span>
            HOSSOMII NEWS NETWORK
          </span>

          <h1>
            Conectando à redação...
          </h1>

          <p>
            Recebendo as últimas notícias da rede.
          </p>
        </div>
      </main>
    );
  }

  if (
    error
  ) {
    return (
      <main className="browser-internal-page">
        <div className="browser-placeholder-page">
          <span>
            HOSSOMII NEWS NETWORK
          </span>

          <h1>
            Falha de conexão
          </h1>

          <p>
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (
    articles.length ===
    0
  ) {
    return (
      <main className="browser-internal-page">
        <div className="browser-placeholder-page">
          <span>
            HOSSOMII NEWS NETWORK
          </span>

          <h1>
            Nenhuma notícia disponível
          </h1>

          <p>
            A redação está online, mas não recebeu
            matérias neste momento.
          </p>
        </div>
      </main>
    );
  }

  const leadArticle =
    articles[0];

  const featuredArticles =
    articles.slice(
      1,
      5
    );

  const latestArticles =
    articles.slice(
      5
    );

  const categories =
    Array.from(
      new Set(
        articles
          .map(
            (
              article
            ) =>
              article.category
          )
          .filter(
            (
              category
            ): category is string =>
              Boolean(
                category
              )
          )
      )
    );

  return (
    <main className="browser-news">
      <div className="news-site">
        <header className="news-masthead">
          <div>
            <span>
              HOSSOMII NEWS NETWORK
            </span>

            <h1>
              HOSSOMII NEWS
            </h1>

            <p>
              informação em tempo real na sua internet
            </p>
          </div>

          <div className="news-live-status">
            <strong>
              ● LIVE
            </strong>

            <span>
              {articles.length} matérias
            </span>
          </div>
        </header>

        <nav className="news-navigation">
          <span>CAPA</span>

          {categories
            .slice(
              0,
              5
            )
            .map(
              (
                category
              ) => (
                <span
                  key={
                    category
                  }
                >
                  {
                    category.toUpperCase()
                  }
                </span>
              )
            )}
        </nav>

        <div className="news-breaking">
          <strong>
            ÚLTIMA HORA
          </strong>

          <span>
            {leadArticle.title}
          </span>
        </div>

        <div className="news-layout">
          <section className="news-main-column">
            <article className="news-lead-story">
              <NewsImage
                article={
                  leadArticle
                }
                className="news-lead-image"
                eager
              />

              <span className="news-category">
                {leadArticle.category ??
                  "DESTAQUE"}
              </span>

              <button
                type="button"
                onClick={() =>
                  onOpenExternal(
                    leadArticle.url
                  )
                }
              >
                {
                  leadArticle.title
                }
              </button>

              <p>
                Fonte:
                {" "}
                <strong>
                  {
                    leadArticle.source
                  }
                </strong>
              </p>
            </article>

            <section className="news-featured-section">
              <h2>
                Mais notícias
              </h2>

              <div className="news-featured-grid">
                {featuredArticles.map(
                  (
                    article
                  ) => (
                    <article
                      key={
                        article.id
                      }
                      className="news-featured-card"
                    >
                      <NewsImage
                        article={
                          article
                        }
                        className="news-featured-image"
                      />

                      <span>
                        {article.category ??
                          "NEWS"}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          onOpenExternal(
                            article.url
                          )
                        }
                      >
                        {
                          article.title
                        }
                      </button>

                      <small>
                        {
                          article.source
                        }
                      </small>
                    </article>
                  )
                )}
              </div>
            </section>
          </section>

          <aside className="news-sidebar">
            <section>
              <h2>
                Últimas notícias
              </h2>

              <ol>
                {latestArticles.map(
                  (
                    article
                  ) => (
                    <li
                      key={
                        article.id
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onOpenExternal(
                            article.url
                          )
                        }
                      >
                        {
                          article.title
                        }
                      </button>

                      <span>
                        {
                          article.source
                        }
                      </span>
                    </li>
                  )
                )}
              </ol>
            </section>

            <section className="news-network-box">
              <h2>
                HNN Network
              </h2>

              <p>
                Notícias recebidas automaticamente
                através da rede.
              </p>

              <dl>
                <div>
                  <dt>
                    status
                  </dt>

                  <dd>
                    ONLINE
                  </dd>
                </div>

                <div>
                  <dt>
                    cache
                  </dt>

                  <dd>
                    5 MIN
                  </dd>
                </div>

                <div>
                  <dt>
                    conexão
                  </dt>

                  <dd>
                    SECURE
                  </dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>

        <footer className="news-footer">
          <span>
            HOSSOMII News Network © 2026
          </span>

          <span>
            notícias fornecidas por fontes externas
          </span>
        </footer>
      </div>
    </main>
  );
}