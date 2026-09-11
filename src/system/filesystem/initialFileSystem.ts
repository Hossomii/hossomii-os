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
      "Bem-vindo ao HOSSOMII OS.\n\nEste computador pertence a Anthony.\nExplore os arquivos, projetos e aplicações para conhecer mais sobre seu trabalho.",

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
      "Anthony é desenvolvedor de software com interesse em desenvolvimento full stack, experiências digitais e construção de produtos interativos.",

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
    name: "TNT Basketball TESTE",
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

  // System

  {
    id: "hossomii-shell",
    name: "hossomii-shell.sys",
    type: "file",
    parentId: "system",

    extension: "sys",

    content:
      "HOSSOMII OS SHELL COMPONENT\nDO NOT DELETE",

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