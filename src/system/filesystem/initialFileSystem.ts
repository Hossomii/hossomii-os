import type { FileSystemItem } from "../../types/filesystem";

export const initialFileSystem: FileSystemItem[] = [
  {
    id: "drive-c",
    name: "C:",
    type: "directory",
    parentId: null,

    hidden: false,

    deletable: false,
    critical: true,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "users",
    name: "Usuários",
    type: "directory",
    parentId: "drive-c",

    hidden: false,

    deletable: false,
    critical: true,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "anthony",
    name: "Anthony",
    type: "directory",
    parentId: "users",

    hidden: false,

    deletable: false,
    critical: true,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "desktop",
    name: "Área de Trabalho",
    type: "directory",
    parentId: "anthony",

    hidden: false,

    deletable: false,
    critical: true,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "documents",
    name: "Documentos",
    type: "directory",
    parentId: "anthony",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "projects",
    name: "Projetos",
    type: "directory",
    parentId: "anthony",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "system",
    name: "Sistema",
    type: "directory",
    parentId: "drive-c",

    hidden: false,

    deletable: false,
    critical: true,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "programs",
    name: "Programas",
    type: "directory",
    parentId: "drive-c",

    hidden: false,

    deletable: false,
    critical: true,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  // Documents

  {
    id: "readme-file",
    name: "leia-me.txt",
    type: "file",
    parentId: "documents",

    extension: "txt",

    content:
      "Olá! Eu sou Anthony, desenvolvedor de software com formação em Análise e Desenvolvimento de Sistemas e estudante de Engenharia de Software.\n\nMeu foco profissional atual é desenvolvimento backend com C# e .NET, com interesse em construção de APIs, bancos de dados, arquitetura de software e sistemas confiáveis.\n\nTambém possuo experiência com desenvolvimento web, TypeScript, React, Node.js, PostgreSQL, Unity e C#.\n\nGosto especialmente de projetos que combinam engenharia de software, experiências interativas e identidade visual como o próprio HOSSOMII OS :)",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "about-file",
    name: "sobre-mim.txt",
    type: "file",
    parentId: "documents",

    extension: "txt",

    content:
      "Anthony é desenvolvedor de software com interesse em desenvolvimento full stack, experiências digitais e construção de produtos interativos e cybersegurança.",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-project-app",
    name: "project.exe",
    type: "application",
    parentId: "project-tnt-basketball",

    appId: "project-viewer",
    instanceId: "project-tnt-basketball",

    data: {
      projectId: "project-tnt-basketball",
    },

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-about",
    name: "sobre-o-projeto.txt",
    type: "file",
    parentId: "project-tnt-basketball",

    extension: "txt",

    content:
      "TNT Basketball é um jogo desenvolvido em Unity utilizando C#.\n\nO projeto foi criado durante uma experiência prática envolvendo desenvolvimento de um jogo publicitário e trabalho em equipe.\n\nMinha participação envolveu lógica de gameplay, programação e integração de sistemas dentro da Unity, além do polimento visual do jogo.",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-technologies",
    name: "tecnologias.txt",
    type: "file",
    parentId: "project-tnt-basketball",

    extension: "txt",

    content:
      "Tecnologias utilizadas:\n\n- C#\n- Unity\n- Git\n- GitHub\n\nÁreas trabalhadas:\n\n- Programação de gameplay\n- Lógica de sistemas\n- Desenvolvimento em equipe",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-links",
    name: "links.txt",
    type: "file",
    parentId: "project-tnt-basketball",

    extension: "txt",

    content:
      "Links relacionados ao projeto:\n\nGitHub: https://github.com/Hossomii/TNT-Basketball\nDemo: https://grupo-1.itch.io/tnt-basketball",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "medicos-project-app",
    name: "project.exe",
    type: "application",
    parentId: "project-medicos-dentistas",

    appId: "project-viewer",
    instanceId: "project-medicos-dentistas",

    data: {
      projectId: "project-medicos-dentistas",
    },

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "medicos-about",
    name: "sobre-o-projeto.txt",
    type: "file",
    parentId: "project-medicos-dentistas",

    extension: "txt",

    content:
      "Médicos & Dentistas é um projeto web desenvolvido com foco em interface, organização de conteúdo e experiência do usuário.\n\nO projeto faz parte da minha experiência com desenvolvimento front-end e construção de interfaces web.",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "medicos-technologies",
    name: "tecnologias.txt",
    type: "file",
    parentId: "project-medicos-dentistas",

    extension: "txt",

    content:
      "Tecnologias utilizadas:\n\n- React\n- JavaScript / TypeScript\n- SASS\n- HTML\n- CSS\n\nÁreas trabalhadas:\n\n- Desenvolvimento de interface\n- Componentização\n- Responsividade\n- Organização visual",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "medicos-links",
    name: "links.txt",
    type: "file",
    parentId: "project-medicos-dentistas",

    extension: "txt",

    content:
      "Links relacionados ao projeto:\n\nGitHub: https://github.com/Hossomii/medicos-dentistas-fullstack\nDemo: https://medicos-e-dentistas-zeta.vercel.app/",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "resume-file",
    name: "currículo.pdf",
    type: "file",
    parentId: "documents",

    extension: "pdf",

    resourceUrl: "/documents/curriculo.pdf",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  // Projects

  {
    id: "project-tnt-basketball",
    name: "TNT Basketball",
    type: "directory",
    parentId: "projects",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-screenshot-01",
    name: "screenshot-01.webp",
    type: "file",
    parentId: "project-tnt-basketball",

    extension: "webp",

    resourceUrl: "/projects/tnt-basketball/screenshot-01.webp",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-screenshot-02",
    name: "screenshot-02.webp",
    type: "file",
    parentId: "project-tnt-basketball",

    extension: "webp",

    resourceUrl: "/projects/tnt-basketball/screenshot-02.webp",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "tnt-screenshot-03",
    name: "screenshot-03.webp",
    type: "file",
    parentId: "project-tnt-basketball",

    extension: "webp",

    resourceUrl: "/projects/tnt-basketball/screenshot-03.webp",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "project-medicos-dentistas",
    name: "Médicos & Dentistas",
    type: "directory",
    parentId: "projects",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "medicos-screenshot-01",
    name: "screenshot-01.webp",
    type: "file",
    parentId: "project-medicos-dentistas",

    extension: "webp",

    resourceUrl: "/projects/medicos-dentistas/screenshot-01.webp",

    hidden: false,

    deletable: true,
    critical: false,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  // System

  {
    id: "hossomii-shell",
    name: "hossomii-shell.sys",
    type: "file",
    parentId: "system",

    extension: "sys",

    content: "HOSSOMII OS SHELL COMPONENT\nDO NOT DELETE",

    hidden: false,

    deletable: true,
    critical: true,
    recoverable: true,

    trashed: false,
    originalParentId: null,
  },

  // Applications

  {
    id: "computer-application",
    name: "Meu Computador",
    type: "application",
    parentId: "programs",

    appId: "computer",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "terminal-application",
    name: "Terminal",
    type: "application",
    parentId: "programs",

    appId: "terminal",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "recycle-bin-application",
    name: "Lixeira",
    type: "application",
    parentId: "programs",

    appId: "recycle-bin",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  // Desktop shortcuts

  {
    id: "desktop-computer",
    name: "Meu Computador",
    type: "shortcut",
    parentId: "desktop",

    targetId: "computer-application",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "desktop-projects",
    name: "Meus Projetos",
    type: "shortcut",
    parentId: "desktop",

    targetId: "projects",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "desktop-documents",
    name: "Meus Documentos",
    type: "shortcut",
    parentId: "desktop",

    targetId: "documents",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "desktop-terminal",
    name: "Terminal",
    type: "shortcut",
    parentId: "desktop",

    targetId: "terminal-application",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "desktop-recycle-bin",
    name: "Lixeira",
    type: "shortcut",
    parentId: "desktop",

    targetId: "recycle-bin-application",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },
];
