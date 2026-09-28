import type {
  FileSystemIconId,
} from "../types/filesystem";

export type PortfolioProjectScreenshot = {
  fileName: string;

  alt: string;
};

export type PortfolioProject = {
  id: string;

  slug: string;

  name: string;

  summary: string;

  role: string;

  technologies: string[];

  highlights: string[];

  screenshots:
    PortfolioProjectScreenshot[];

  githubUrl?: string;
  demoUrl?: string;

  iconId?: FileSystemIconId;

  problem?: string;

  solution?: string;

  technicalDecisions?: string[];

  learnings?: string[];
};

export const portfolioProjects:
  PortfolioProject[] = [
    {
      id:
        "project-tnt-basketball",

      slug:
        "tnt-basketball",

      name:
        "TNT Basketball",

      summary:
        "Jogo desenvolvido em Unity e C# durante uma experiência prática de desenvolvimento colaborativo.",

      role:
        "Desenvolvimento de gameplay, lógica de sistemas e integração dentro da Unity.",

      technologies: [
        "C#",
        "Unity",
        "Git",
        "GitHub",
      ],

      highlights: [
        "Programação de gameplay",
        "Implementação de lógica de sistemas",
        "Integração de funcionalidades na Unity",
        "Desenvolvimento em equipe",
        "Polimento visual do jogo",
      ],

      screenshots: [
        {
          fileName:
            "screenshot-01.webp",

          alt:
            "Captura de tela do TNT Basketball",
        },

        {
          fileName:
            "screenshot-02.webp",

          alt:
            "Gameplay do TNT Basketball",
        },

        {
          fileName:
            "screenshot-03.webp",

          alt:
            "Interface do TNT Basketball",
        },
      ],

      githubUrl:
        "https://github.com/Hossomii/TNT-Basketball",

      demoUrl:
        "https://grupo-1.itch.io/tnt-basketball",

      iconId:
        "project-tnt-basketball",
    },

    {
      id:
        "project-medicos-dentistas",

      slug:
        "medicos-dentistas",

      name:
        "Médicos & Dentistas",

      summary:
        "Projeto web desenvolvido com foco em interface, organização de conteúdo, responsividade e experiência do usuário.",

      role:
        "Desenvolvimento front-end e construção da interface da aplicação.",

      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "SASS",
        "HTML",
        "CSS",
      ],

      highlights: [
        "Desenvolvimento de interface",
        "Componentização",
        "Responsividade",
        "Organização visual",
        "Experiência do usuário",
      ],

      screenshots: [
        {
          fileName:
            "screenshot-01.webp",

          alt:
            "Captura de tela do projeto Médicos & Dentistas",
        },
      ],

      githubUrl:
        "https://github.com/Hossomii/medicos-dentistas-fullstack",

      demoUrl:
        "https://medicos-e-dentistas-zeta.vercel.app/",

      iconId:
        "project-medicos-dentistas",
    },
  ];

export function getPortfolioProject(
  projectId: string
) {
  return portfolioProjects.find(
    (project) =>
      project.id ===
      projectId
  );
}