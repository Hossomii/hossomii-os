import {
  useEffect,
  useState,
} from "react";

import {
  fetchLatestNews,
  type NewsArticle,
} from "../news/newsService";

export function BrowserNewsPage() {
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

  return (
    <main className="browser-internal-page">
      <div className="browser-placeholder-page">
        <span>
          HOSSOMII NEWS NETWORK
        </span>

        <h1>
          Redação Online
        </h1>

        <p>
          {articles.length}
          {" "}
          notícias recebidas.
        </p>

        <ul>
          {articles
            .slice(
              0,
              5
            )
            .map(
              (
                article
              ) => (
                <li
                  key={
                    article.id
                  }
                >
                  {
                    article.title
                  }

                  {" — "}

                  {
                    article.source
                  }
                </li>
              )
            )}
        </ul>
      </div>
    </main>
  );
}