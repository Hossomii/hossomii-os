const OKSURF_ENDPOINT =
  "https://ok.surf/api/v1/cors/news-feed";

const REQUEST_TIMEOUT_MS =
  8000;

const CACHE_TTL_MS =
  5 * 60 * 1000;

const PREFERRED_SECTIONS = [
  "Technology",
  "Science",
  "World",
  "Business",
];

type OkSurfArticle = {
  title?: string;
  link?: string;

  og?: string;

  source?: string;
  source_icon?: string;
};

type OkSurfFeed =
  Record<
    string,
    OkSurfArticle[]
  >;

type OkSurfResponse =
  | OkSurfArticle[]
  | OkSurfFeed;

export type NewsArticle = {
  id: string;

  title: string;
  url: string;

  imageUrl?: string;
  sourceIconUrl?: string;

  source: string;
  category?: string;
};

type NewsCache = {
  articles: NewsArticle[];
  expiresAt: number;
};

let newsCache:
  NewsCache | null =
    null;

function isSafeExternalUrl(
  value: string
) {
  try {
    const url =
      new URL(
        value
      );

    return (
      url.protocol ===
      "https:"
    );
  } catch {
    return false;
  }
}

function getFeedEntries(
  data: OkSurfResponse
) {
  if (
    Array.isArray(
      data
    )
  ) {
    return data.map(
      (
        article
      ) => ({
        article,
        category:
          undefined,
      })
    );
  }

  const sections = [
    ...PREFERRED_SECTIONS.filter(
      (
        section
      ) =>
        Array.isArray(
          data[
            section
          ]
        )
    ),

    ...Object.keys(
      data
    ).filter(
      (
        section
      ) =>
        !PREFERRED_SECTIONS.includes(
          section
        )
    ),
  ];

  return sections.flatMap(
    (
      section
    ) =>
      (
        data[
          section
        ] ??
        []
      ).map(
        (
          article
        ) => ({
          article,
          category:
            section,
        })
      )
  );
}

function getCachedNews() {
  if (
    !newsCache
  ) {
    return null;
  }

  if (
    Date.now() >
    newsCache.expiresAt
  ) {
    newsCache =
      null;

    return null;
  }

  return newsCache.articles;
}

export async function fetchLatestNews(
  signal?: AbortSignal
): Promise<
  NewsArticle[]
> {
  const cachedNews =
    getCachedNews();

  if (
    cachedNews
  ) {
    return cachedNews;
  }

  const requestController =
    new AbortController();

  const abortRequest =
    () => {
      requestController.abort();
    };

  if (
    signal?.aborted
  ) {
    requestController.abort();
  } else {
    signal?.addEventListener(
      "abort",
      abortRequest,
      {
        once: true,
      }
    );
  }

  const timeoutId =
    globalThis.setTimeout(
      () => {
        requestController.abort();
      },
      REQUEST_TIMEOUT_MS
    );

  try {
    const response =
      await fetch(
        OKSURF_ENDPOINT,
        {
          signal:
            requestController.signal,
        }
      );

    if (
      !response.ok
    ) {
      throw new Error(
        `OKSURF request failed: ${response.status}`
      );
    }

    const data =
      (await response.json()) as
        OkSurfResponse;

    const entries =
      getFeedEntries(
        data
      );

    const seenUrls =
      new Set<string>();

    const articles:
      NewsArticle[] = [];

    for (
      const [
        index,
        entry,
      ] of
        entries.entries()
    ) {
      const {
        article,
        category,
      } =
        entry;

      if (
        !article.title ||
        !article.link
      ) {
        continue;
      }

      if (
        !isSafeExternalUrl(
          article.link
        )
      ) {
        continue;
      }

      if (
        seenUrls.has(
          article.link
        )
      ) {
        continue;
      }

      seenUrls.add(
        article.link
      );

      articles.push({
        id:
          `${category ?? "news"}-${index}`,

        title:
          article.title,

        url:
          article.link,

        source:
          article.source ??
          "Fonte desconhecida",

        category,

        imageUrl:
          article.og &&
          isSafeExternalUrl(
            article.og
          )
            ? article.og
            : undefined,

        sourceIconUrl:
          article.source_icon &&
          isSafeExternalUrl(
            article.source_icon
          )
            ? article.source_icon
            : undefined,
      });

      if (
        articles.length >=
        20
      ) {
        break;
      }
    }

    newsCache = {
      articles,

      expiresAt:
        Date.now() +
        CACHE_TTL_MS,
    };

    return articles;
  } finally {
    globalThis.clearTimeout(
      timeoutId
    );

    signal?.removeEventListener(
      "abort",
      abortRequest
    );
  }
}