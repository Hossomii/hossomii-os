import type { PortfolioProject } from "../../content/projects";

import type { FileSystemItem } from "../../types/filesystem";

function createAboutContent(project: PortfolioProject) {
  const highlights = project.highlights
    .map((highlight) => `- ${highlight}`)
    .join("\n");

  return [
    project.summary,

    `Minha participação:\n${project.role}`,

    `Principais atividades e entregas:\n${highlights}`,
  ].join("\n\n");
}

function createTechnologiesContent(project: PortfolioProject) {
  return [
    "Tecnologias utilizadas:",

    "",

    ...project.technologies.map((technology) => `- ${technology}`),
  ].join("\n");
}

function createLinksContent(project: PortfolioProject) {
  const links: string[] = ["Links relacionados ao projeto:", ""];

  if (project.githubUrl) {
    links.push(`GitHub: ${project.githubUrl}`);
  }

  if (project.demoUrl) {
    links.push(`Demo: ${project.demoUrl}`);
  }

  if (!project.githubUrl && !project.demoUrl) {
    links.push("Nenhum link externo disponível.");
  }

  return links.join("\n");
}

function getFileExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex === -1) {
    return "";
  }

  return fileName.slice(dotIndex + 1).toLowerCase();
}

export function createProjectFileSystemItems(
  project: PortfolioProject,
): FileSystemItem[] {
  const iconId = project.iconId ?? "projects";

  const directory: FileSystemItem = {
    id: project.id,

    name: project.name,

    type: "directory",

    parentId: "projects",

    iconId,

    hidden: false,

    deletable: false,

    critical: false,

    recoverable: false,

    trashed: false,

    originalParentId: null,
  };

  const application: FileSystemItem = {
    id: `${project.slug}-project-app`,

    name: "project.exe",

    type: "application",

    parentId: project.id,

    iconId,

    appId: "project-viewer",

    instanceId: project.id,

    data: {
      projectId: project.id,
    },

    hidden: false,

    deletable: false,

    critical: false,

    recoverable: false,

    trashed: false,

    originalParentId: null,
  };

  const aboutFile: FileSystemItem = {
    id: `${project.slug}-about`,

    name: "sobre-o-projeto.txt",

    type: "file",

    parentId: project.id,

    extension: "txt",

    content: createAboutContent(project),

    hidden: false,

    deletable: true,

    critical: false,

    recoverable: true,

    trashed: false,

    originalParentId: null,
  };

  const technologiesFile: FileSystemItem = {
    id: `${project.slug}-technologies`,

    name: "tecnologias.txt",

    type: "file",

    parentId: project.id,

    extension: "txt",

    content: createTechnologiesContent(project),

    hidden: false,

    deletable: true,

    critical: false,

    recoverable: true,

    trashed: false,

    originalParentId: null,
  };

  const linksFile: FileSystemItem = {
    id: `${project.slug}-links`,

    name: "links.txt",

    type: "file",

    parentId: project.id,

    extension: "txt",

    content: createLinksContent(project),

    hidden: false,

    deletable: true,

    critical: false,

    recoverable: true,

    trashed: false,

    originalParentId: null,
  };

  const screenshots: FileSystemItem[] = project.screenshots.map(
    (screenshot, index) => ({
      id: `${project.slug}-screenshot-${String(index + 1).padStart(2, "0")}`,

      name: screenshot.fileName,

      type: "file",

      parentId: project.id,

      extension: getFileExtension(screenshot.fileName),

      resourceUrl: `/projects/${project.slug}/${screenshot.fileName}`,

      hidden: false,

      deletable: true,

      critical: false,

      recoverable: true,

      trashed: false,

      originalParentId: null,
    }),
  );

  return [
    directory,
    application,
    aboutFile,
    technologiesFile,
    linksFile,
    ...screenshots,
  ];
}
