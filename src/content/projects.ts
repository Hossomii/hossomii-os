import type { FileSystemIconId } from "../types/filesystem";

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

  screenshots: PortfolioProjectScreenshot[];

  githubUrl?: string;
  demoUrl?: string;

  iconId?: FileSystemIconId;

  challenge?: string;

  solution?: string;

  technicalDecisions?: string[];

  learnings?: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "project-tnt-basketball",

    slug: "tnt-basketball",

    name: "TNT Basketball",

    summary:
      "Jogo arcade de basquete desenvolvido em Unity e C# como projeto final de uma experiência prática de desenvolvimento de games em equipe.",

    role: "Tech Lead, com atuação em sistemas de gameplay, lógica de pontuação e combos, power-ups, integração de UI, responsividade e polimento do fluxo de jogo.",

    challenge:
      "Construir uma experiência arcade rápida e competitiva que fosse simples de aprender, visualmente clara e capaz de funcionar no navegador em diferentes tamanhos de tela. Um dos principais desafios técnicos foi manter sincronizados o feedback visual da gameplay, as animações e os efeitos temporários dos power-ups enquanto diferentes sistemas interagiam entre si.",

    solution:
      "A gameplay foi organizada em sistemas independentes para entrada, avaliação de arremessos, pontuação, combos, controle global da partida, power-ups, timer, áudio e feedback visual. Os efeitos temporários foram isolados em sistemas próprios e integrados ao restante da gameplay, enquanto a interface recebeu adaptações para diferentes tamanhos de tela e execução via WebGL.",

    technologies: ["C#", "Unity 6", "WebGL", "TextMeshPro", "Git", "GitHub"],

    highlights: [
      "Desenvolvimento de sistemas de gameplay",
      "Implementação de pontuação, combos e multiplicadores",
      "Sistema de power-ups com efeitos temporários",
      "Controle de estados e bloqueio global da gameplay",
      "Integração entre input, animação, áudio e feedback visual",
      "Adaptação da interface para desktop, notebook e mobile landscape",
      "Desenvolvimento e integração em equipe",
    ],

    technicalDecisions: [
      "Separação da gameplay em componentes com responsabilidades específicas, evitando concentrar toda a lógica em um único GameManager.",
      "Uso de um GameplayLockSystem para representar o estado global de bloqueio da partida e permitir que outros sistemas reajam a eventos de lock e unlock.",
      "Separação entre multiplicador de combo e multiplicadores externos de power-ups dentro do sistema de pontuação.",
      "Implementação dos efeitos temporários dos power-ups com coroutines e restauração explícita do estado ao finalizar cada efeito.",
      "Validação do estado da partida antes de aceitar novos inputs, evitando múltiplas resoluções de arremesso simultâneas.",
      "Suporte de entrada para mouse e touchscreen utilizando o Input System da Unity.",
    ],

    learnings: [
      "Integrar feedback visual, animações e efeitos temporários de power-ups exige sincronizar corretamente a lógica da gameplay com o estado visual apresentado ao jogador.",

      "Em um MVP, manter o escopo sob controle não impede um alto nível de acabamento; o projeto conseguiu ir além do resultado inicialmente esperado sem perder o foco na experiência principal.",

      "Uma boa entrega em equipe depende tanto da qualidade do código quanto de comunicação clara entre as pessoas envolvidas, especialmente quando diferentes sistemas e responsabilidades precisam ser integrados.",
    ],

    screenshots: [
      {
        fileName: "screenshot-01.webp",

        alt: "Captura de tela do TNT Basketball",
      },

      {
        fileName: "screenshot-02.webp",

        alt: "Gameplay do TNT Basketball",
      },

      {
        fileName: "screenshot-03.webp",

        alt: "Interface do TNT Basketball",
      },
    ],

    githubUrl: "https://github.com/Hossomii/TNT-Basketball",

    demoUrl: "https://grupo-1.itch.io/tnt-basketball",

    iconId: "project-tnt-basketball",
  },

  {
    id: "project-medicos-dentistas",

    slug: "medicos-dentistas",

    name: "Médicos & Dentistas",

    summary:
      "Projeto web desenvolvido com foco em interface, organização de conteúdo, responsividade e experiência do usuário.",

    role: "Desenvolvimento front-end e construção da interface da aplicação.",

    technologies: ["React", "TypeScript", "JavaScript", "SASS", "HTML", "CSS"],

    highlights: [
      "Desenvolvimento de interface",
      "Componentização",
      "Responsividade",
      "Organização visual",
      "Experiência do usuário",
    ],

    screenshots: [
      {
        fileName: "screenshot-01.webp",

        alt: "Captura de tela do projeto Médicos & Dentistas",
      },
    ],

    githubUrl: "https://github.com/Hossomii/medicos-dentistas-fullstack",

    demoUrl: "https://medicos-e-dentistas-zeta.vercel.app/",

    iconId: "project-medicos-dentistas",
  },
];

export function getPortfolioProject(projectId: string) {
  return portfolioProjects.find((project) => project.id === projectId);
}
