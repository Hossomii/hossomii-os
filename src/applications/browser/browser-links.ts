export type BrowserInternalPage = "home" | "profile" | "news";

export type BrowserLink =
  | {
      id: string;
      label: string;
      description: string;
      type: "internal";
      page: BrowserInternalPage;
    }
  | {
      id: string;
      label: string;
      description: string;
      type: "external";
      url: string;
    };

export const browserLinks: BrowserLink[] = [
  {
    id: "profile",
    label: "Anthony Online",
    description:
      "Perfil profissional, projetos, experiência e um pouco sobre mim.",
    type: "internal",
    page: "profile",
  },
  {
    id: "news",
    label: "HOSSOMII News",
    description:
      "Notícias da web em uma experiência inspirada nos portais dos anos 2000.",
    type: "internal",
    page: "news",
  },
  {
    id: "github",
    label: "GitHub",
    description: "Projetos, código-fonte e experimentos.",
    type: "external",
    url: "https://github.com/Hossomii",
  },
  {
    id: "freecodecamp",
    label: "freeCodeCamp",
    description: "Aprenda, pratique e continue construindo.",
    type: "external",
    url: "https://www.freecodecamp.org/",
  },
];
