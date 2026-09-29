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
      "Sou Anthony, desenvolvedor de software e estudante de Engenharia de Software. Tenho interesse em backend, sistemas, redes e cibersegurança, com curiosidade especial por entender como software funciona por dentro e como diferentes componentes se conectam.\n\nMeus projetos passam por aplicações web fullstack, sistemas interativos, desenvolvimento de jogos e experimentos que combinam engenharia de software com identidade visual e experiência do usuário. Atualmente estou aprofundando meus estudos em Linux, Data Structure e Algoritmos[C/C# e Python são as linguagens de programação que me chamam mais atenção]",

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
