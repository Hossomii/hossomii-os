import type { FileSystemItem } from "../../types/filesystem";

import { portfolioProjects } from "../../content/projects";

import { createProjectFileSystemItems } from "./projectFileSystem";

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
      "Olá! Eu sou Anthony, desenvolvedor de software e estudante de Engenharia de Software.\n\nTenho interesse principalmente em engenharia de software, backend, sistemas e cibersegurança. Gosto de entender como aplicações funcionam por dentro, explorar fundamentos técnicos e transformar esse conhecimento em projetos práticos.\n\nAtualmente estudo principalmente Python, sistemas, redes e segurança, mantendo experiência prática com React, TypeScript, Node.js, PostgreSQL, C# e desenvolvimento de experiências interativas.\n\nNeste computador você pode explorar alguns dos meus projetos, documentos e experimentos. O próprio HOSSOMII OS também faz parte do portfólio: uma aplicação construída para transformar uma apresentação profissional tradicional em um sistema explorável.",

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
      "Sou Anthony, desenvolvedor de software e estudante de Engenharia de Software. Tenho interesse em backend, sistemas, redes e cibersegurança, com curiosidade especial por entender como software funciona por dentro e como diferentes componentes se conectam.\n\nMeus projetos passam por aplicações web fullstack, sistemas interativos, desenvolvimento de jogos e experimentos que combinam engenharia de software com identidade visual e experiência do usuário.\n\nAtualmente estou aprofundando meus estudos em Linux, estruturas de dados e algoritmos, com Python como linguagem principal de estudo e interesse também em C e C#.",

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

  ...portfolioProjects.flatMap(createProjectFileSystemItems),

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

    {
    id: "system-info-file",
    name: "system-info.txt",
    type: "file",
    parentId: "system",

    extension: "txt",

    content:
      "HOSSOMII SYSTEMS\n\nWorkstation: HOSSOMII-01\nEnvironment: Interactive Portfolio Workstation\nShell: hossomii-shell\nStatus: operational\n\nAlguns registros de manutenção não são indexados pela interface gráfica padrão.",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "system-archive",
    name: "Arquivo",
    type: "directory",
    parentId: "system",

    hidden: true,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "maintenance-record-file",
    name: "maintenance.log",
    type: "file",
    parentId: "system-archive",

    extension: "log",

    content:
      "HOSSOMII SYSTEMS // MAINTENANCE RECORD\n\nHOST: HOSSOMII-01\nSHELL: hossomii-shell\nRECOVERY IMAGE: AVAILABLE\nLAST INTEGRITY CHECK: PASS\n\n[OK] virtual filesystem mounted\n[OK] shell integrity verified\n[OK] recovery environment available\n[INFO] legacy session metadata retained outside the standard shell index.",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
  id: "operator-record-file",
  name: "operator.txt",
  type: "file",
  parentId: "system-archive",

  extension: "txt",

  content:
    "HOSSOMII SYSTEMS // OPERATOR RECORD\n\n" +
    "PROFILE: Anthony\n" +
    "WORKSTATION: HOSSOMII-01\n" +
    "STATUS: active\n\n" +
    "[ARCHIVED NOTES]\n\n" +
    "- Primeiro computador recebido aos 9 anos.\n" +
    "- Interesse atual concentrado em desenvolvimento de software, com uma rota cada vez mais próxima de cibersegurança.\n" +
    "- Houve uma fase de hiperfoco em edição de vídeo usando After Effects e Sony Vegas.\n" +
    "- Duas dachshunds fazem parte da identidade visual do sistema. Isso explica mais coisas do que deveria.\n" +
    "- Registros antigos indicam que pelo menos três computadores foram vítimas da curiosidade tecnológica do operador por volta de 2010.\n\n" +
    "NOTE: algumas decisões estéticas deste sistema provavelmente podem ser explicadas por computadores antigos, jogos de PS2 e excesso de curiosidade.",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

{
  id: "operator-media-history-file",
  name: "media-history.log",
  type: "file",
  parentId: "system-archive",

  extension: "log",

  content:
    "HOSSOMII SYSTEMS // MEDIA HISTORY\n\n" +
    "AUDIO ACTIVITY: HIGH\n" +
    "estimated daily music exposure: >= 50%\n\n" +
    "MUSIC PROFILE:\n" +
    "- música brasileira\n" +
    "- pop\n" +
    "- rock\n" +
    "- techno\n" +
    "- Rita Lee aparece nos registros\n\n" +
    "GAME ARCHIVE // SINGLEPLAYER\n" +
    "Resident Evil\n" +
    "Shadow of the Colossus\n" +
    "Guitar Hero\n" +
    "God Hand\n" +
    "God of War\n" +
    "Medal of Honor\n" +
    "Need for Speed\n" +
    "NBA Ballers Phenom\n" +
    "FIFA Street 2\n" +
    "Mortal Kombat\n" +
    "Call of Duty\n" +
    "Spider-Man\n" +
    "Jackass\n" +
    "Mario\n" +
    "Van Helsing\n" +
    "Darkwatch\n" +
    "Bully\n" +
    "Mega Man\n" +
    "Prince of Persia\n" +
    "The Matrix: Path of Neo\n" +
    "Turok\n" +
    "Bakugan Battle Brawlers\n" +
    "The Sims 2: Castaway\n" +
    "King Kong\n" +
    "Naruto Shippuden: Ultimate Ninja 5\n" +
    "Ben 10: Protector of Earth\n" +
    "Area 51\n" +
    "Star Wars: The Force Unleashed\n" +
    "007: Quantum of Solace\n" +
    "LEGO Batman\n" +
    "Ben 10: Alien Force\n" +
    "Total Overdose\n" +
    "Altered Beast\n" +
    "Iron Man\n" +
    "Transformers\n" +
    "Madagascar 2\n" +
    "Silent Hill\n\n" +
    "GAME ARCHIVE // MULTIPLAYER\n" +
    "Overwatch\n" +
    "League of Legends // unfortunately retained in history\n" +
    "Killing Floor 2\n" +
    "others selected according to current operator mood\n\n" +
    "SYSTEM NOTE:\n" +
    "A quantidade de títulos da era PS2 explica parcialmente a interface deste computador.",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
  id: "operator-preferences-file",
  name: "preferences.ini",
  type: "file",
  parentId: "system-archive",

  extension: "ini",

  content:
    "[operator.preferences]\n\n" +
    "primary_drink=water\n" +
    "secondary_drink=tea_if_mood_allows\n" +
    "healthy_food=preferred\n" +
    "sweet_and_savory=approved\n" +
    "spicy_food=approved\n" +
    "protein_bars=dependency_detected\n\n" +
    "[companions]\n" +
    "dachshunds=2\n" +
    "portfolio_visual_influence=critical\n\n" +
    "[current_interests]\n" +
    "software_development=primary\n" +
    "cybersecurity=growing\n\n" +
    "[system]\n" +
    "music_required=true",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  // Applications

  {
    id: "computer-application",
    name: "Meu Computador",
    type: "application",
    parentId: "programs",
    iconId: "computer",

    appId: "computer",

    hidden: false,

    deletable: false,
    critical: false,
    recoverable: false,

    trashed: false,
    originalParentId: null,
  },

  {
    id: "browser-application",
    name: "HOSSOMII Web",
    type: "application",
    parentId: "programs",

    iconId: "browser",

    appId: "browser",

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
    iconId: "terminal",

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
    iconId: "recycle-bin",

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
    id: "desktop-browser",
    name: "HOSSOMII Web",
    type: "shortcut",
    parentId: "desktop",

    targetId: "browser-application",

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
