# HOSSOMII OS

Interactive developer portfolio disguised as a fictional early-2000s operating system.

HOSSOMII OS turns a traditional portfolio into an explorable desktop environment where projects, documents, applications and hidden interactions behave as parts of the same virtual computer.

The project is built with **React, TypeScript, Zustand and Vite** and focuses on state management, reusable application architecture, interactive UI and a custom virtual filesystem.

> The interface is currently presented in Portuguese-BR.

---

## Overview

Instead of scrolling through traditional portfolio sections, visitors remotely access a fictional workstation:

```text
HOSSOMII-01
```

The experience follows a complete system flow:

```text
Remote Login
      ↓
Authentication
      ↓
Boot
      ↓
Desktop
      ↓
Applications
      ↓
Virtual File System
```

From the desktop, visitors can explore projects, documents and applications as if they were navigating an operating system.

---

## Current Features

### Desktop environment

- remote access login
- authentication sequence
- boot / welcome sequence
- desktop icons
- Start Menu
- taskbar
- live clock
- shutdown and restart flows
- multiple wallpapers
- multiple visual themes

### Window Manager

Windows support:

- dragging
- resizing
- minimizing
- maximizing
- restoring
- closing
- focus management
- z-index management
- viewport constraints
- multiple instances of the same application

For example, multiple text files can be opened simultaneously in separate Notepad windows.

---

## Virtual File System

HOSSOMII OS contains its own in-memory filesystem.

Current structure:

```text
C:\
│
├── Usuários\
│   └── Anthony\
│       ├── Área de Trabalho\
│       │
│       ├── Documentos\
│       │   ├── leia-me.txt
│       │   ├── sobre-mim.txt
│       │   └── currículo.pdf
│       │
│       └── Projetos\
│           ├── TNT Basketball\
│           └── Médicos & Dentistas\
│
├── Sistema\
│
└── Programas\
    ├── Meu Computador
    ├── Terminal
    └── Lixeira
```

Filesystem items may represent:

- files
- directories
- applications
- shortcuts

The filesystem is shared between applications instead of being independently simulated by each interface.

---

## Shared System State

One of the main architectural ideas behind HOSSOMII OS is that applications interact with the same underlying state.

```text
                   Virtual File System
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
       Explorer        Terminal       Recycle Bin
          │               │               │
          └───────────────┼───────────────┘
                          │
                          ▼
                    Shared State
```

Deleting a file from one application immediately affects the others.

For example:

```text
Explorer
   ↓
Delete file
   ↓
filesystemStore
   ↓
File disappears from Explorer
   ↓
File appears in Recycle Bin
```

---

## Applications

Current applications include:

### My Computer

Main filesystem explorer.

Allows visitors to navigate through the virtual disk and open directories, files and applications.

### Documents

Provides access to portfolio documents such as:

- introduction
- developer information
- résumé

### Projects

Projects are represented as directories inside the filesystem.

Each project can contain:

- project information
- technologies
- links
- screenshots
- `project.exe`

### Project Viewer

`project.exe` opens a dedicated project presentation application.

The viewer currently supports project descriptions, technologies and image galleries.

The next portfolio milestone will expand it into a more complete engineering case-study format.

### Notepad

Read-only text viewer associated with `.txt` files.

### PDF Viewer

Used to open PDF documents inside the simulated desktop.

### Image Viewer

Supports:

- WebP
- PNG
- JPG
- JPEG

### Recycle Bin

Deleted files are moved to a shared Recycle Bin instead of disappearing immediately.

Supported behavior includes:

- moving files to trash
- dynamic empty/full icon
- restoring files to their original location

### Control Panel

Allows visitors to customize the system appearance.

Available themes:

- Default
- Dark
- High Contrast

Wallpaper preferences are also persisted locally.

---

## Terminal

The Terminal is connected to the same filesystem used by the graphical Explorer.

It is intentionally not designed to simulate a complete real-world shell.

Its purpose is to provide another way to explore the HOSSOMII OS environment.

Current commands include:

```text
ajuda
help

dir
ls

cd
pwd

type
cat

open

del

cls
clear

whoami
hostname
ver
```

It also supports:

- command history
- Tab autocomplete
- relative paths
- absolute paths
- `/` and `\`
- case-insensitive path resolution
- accent-insensitive path resolution
- paths containing spaces

---

## File Associations

File opening behavior is centralized.

Current associations:

```text
.txt
→ Notepad

.pdf
→ PDF Viewer

.webp / .png / .jpg / .jpeg
→ Image Viewer

project.exe
→ Project Viewer

directory
→ Explorer

shortcut
→ target item
```

This allows the graphical Explorer and Terminal to use the same application-opening rules.

---

## System Recovery

HOSSOMII OS contains an interactive recovery flow connected to the virtual filesystem.

Certain system interactions can trigger a failure sequence followed by a dedicated recovery environment.

The exact trigger and complete sequence are intentionally not documented here.

Exploration is part of the experience.

---

## Architecture

Simplified architecture:

```text
src/
│
├── applications/
│   ├── computer/
│   ├── control-panel/
│   ├── documents/
│   ├── explorer/
│   ├── image-viewer/
│   ├── notepad/
│   ├── pdf/
│   ├── project-viewer/
│   ├── projects/
│   ├── recycle-bin/
│   └── terminal/
│
├── desktop/
│   └── desktop shell and window UI
│
├── stores/
│   ├── achievementStore
│   ├── criticalFileStore
│   ├── filesystemStore
│   ├── systemPreferencesStore
│   ├── systemStore
│   └── windowStore
│
├── system/
│   ├── auth/
│   ├── boot/
│   ├── critical-file/
│   ├── filesystem/
│   └── power/
│
├── styles/
│
└── types/
```

More detailed architectural information is available in:

```text
docs/SYSTEM_OVERVIEW.md
```

---

## Tech Stack

### Frontend

- React 19
- TypeScript 6
- Vite 8

### State Management

- Zustand

### Motion

- GSAP

### Testing

- Vitest

### Development

- ESLint
- Git
- GitHub

---

## Tests

The project currently includes automated tests for important filesystem behavior.

Examples include:

- path normalization
- absolute path resolution
- relative path resolution
- accent-insensitive paths
- normal file deletion
- protected file behavior
- critical filesystem protection
- file restoration
- duplicate deletion prevention

Run:

```bash
npm test
```

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/Hossomii/hossomii-os.git
```

Enter the project directory:

```bash
cd hossomii-os
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Tests:

```bash
npm test
```

---

## Project Philosophy

### Exploration instead of scrolling

Portfolio information should be discovered through interaction rather than presented only as traditional webpage sections.

### Functionality before decoration

Interfaces should work whenever possible.

If there is an Explorer, it should navigate.

If there is a Recycle Bin, it should restore files.

If there is a Terminal, it should interact with the same filesystem.

### Shared state

Applications should not maintain isolated copies of the same information.

### Safe internal rules

Important filesystem rules are enforced at the state layer rather than only through UI restrictions.

### Nostalgia without direct imitation

The project references early-2000s operating systems while maintaining its own visual identity.

### Surprises without trapping the visitor

Easter eggs and narrative events can alter the experience, but they should not permanently prevent visitors from continuing.

---

## Current Development Status

```text
v0.3 — Filesystem / Explorer / Desktop Apps
COMPLETE

v0.4 — Portfolio Content
IN DEVELOPMENT

v0.5 — Visual Polish / Motion
PLANNED

v0.6 — Audio
PLANNED

v0.7 — Narrative / Easter Eggs
PLANNED

v0.8 — Mobile / Accessibility / Performance
PLANNED

v0.9 — Complete OS Experience
PLANNED

v1.0 — Final Major Application + Integration
PLANNED
```

The current development focus is improving the portfolio content and transforming project presentations into stronger technical case studies.

---

## Current Portfolio Projects

### TNT Basketball

Unity / C# project focused on gameplay programming, system logic and collaborative development.

### Médicos & Dentistas

Web project focused on frontend development, componentization, responsive interfaces and user experience.

More projects will be selected based on what they contribute to the overall portfolio rather than simply increasing project count.

---

## Inspiration

HOSSOMII OS takes inspiration from:

- early-2000s desktop interfaces
- Windows XP-era software
- remote access interfaces
- diegetic game interfaces
- investigative software experiences
- The Operator
- Watch Dogs

These references are used as design direction rather than being reproduced literally.

---

## Roadmap

The next major development phase focuses on the actual portfolio content.

Planned work includes:

- structured project data
- improved Project Viewer
- engineering case studies
- GitHub and live-demo actions
- professional content review
- additional selected projects
- Quick View for recruiters
- visual polish
- audio
- accessibility
- performance optimization
- additional narrative interactions

A larger application is planned for the final stage of the project and will only be developed after the rest of HOSSOMII OS is close to completion.

---

## Documentation

Public system overview:

```text
docs/SYSTEM_OVERVIEW.md
```

The repository also uses private development documentation for internal project tracking.

---

## Author

**Anthony Hossomii Bugs**

Software developer focused on software engineering, backend development and interactive products.

GitHub:

https://github.com/Hossomii