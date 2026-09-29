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

The current experience follows this flow:

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

The system also includes restart, shutdown and recovery flows.

From the desktop, visitors can explore professional information as if they were navigating an actual computer.

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
- shutdown flow
- restart transition
- multiple wallpapers
- Default, Dark and High Contrast themes
- persistent visual preferences

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
- multiple instances of supported applications

For example, multiple text files can be opened simultaneously in separate Notepad windows.

---

## Quick View

Quick View provides a faster route through the portfolio for visitors who do not want to explore the entire operating system.

It includes:

- professional introduction
- current areas of focus
- featured projects
- résumé access
- documents
- GitHub
- LinkedIn

Project information is read from the same structured portfolio data used by the rest of the system.

Visitors can open a full `project.exe` directly from Quick View when they want to explore a project in more depth.

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
│           ├── HOSSOMII OS\
│           ├── TNT Basketball\
│           └── Médicos & Dentistas\
│
├── Sistema\
│
└── Programas\
    ├── Meu Computador
    ├── HOSSOMII Web
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

## Structured Portfolio Data

Project content is centralized in a portfolio catalog.

```text
projects.ts
    ↓
projectFileSystem.ts
    ↓
Virtual File System
    ↓
Project Viewer / Quick View / Explorer
```

This allows project information to be stored once and presented in multiple parts of the system.

Each project may contain:

- summary
- role
- category
- year
- status
- technologies
- highlights
- challenge
- solution
- technical decisions
- learnings
- screenshots
- GitHub URL
- live demo URL

The virtual project directories are generated automatically from this data.

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

### Quick View

Compact professional overview designed for fast portfolio exploration.

### My Computer

Main filesystem explorer.

Allows visitors to navigate through the virtual disk and open directories, files and applications.

### Documents

Provides access to:

- introduction
- developer information
- résumé

### Projects

Projects are represented as directories inside the filesystem.

Each generated project directory can contain:

- project information
- technologies
- links
- screenshots
- `project.exe`

### Project Viewer

`project.exe` opens a dedicated case-study application.

The current Project Viewer includes:

- Project Dossier
- project metadata
- hero screenshot
- role and core stack
- GitHub and demo actions
- Overview tab
- Build Log
- Gallery
- Tech information

The Build Log presents technical decisions and project learnings as development records inside the fictional operating system.

The viewer uses the same generic structure for every project rather than project-specific layouts.

### HOSSOMII Web

Internal browser application with its own early-web identity.

Current experiences include:

- browser home
- Anthony Online
- HOSSOMII News
- external resource links

#### Anthony Online

A colorful personal profile inspired by creative websites and online communities from the early 2000s.

It includes:

- professional introduction
- selected projects
- technology badges
- external links
- profile widgets
- guestbook-style content
- retro web microinteractions

#### HOSSOMII News

Retro news portal backed by an external public news feed.

The news layer includes:

- normalized article data
- loading and error states
- memory cache
- request timeout
- request cancellation
- safe external navigation
- lazy-loaded images
- image fallbacks

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

- HOSSOMII Default
- HOSSOMII Dark
- High Contrast

Available wallpapers currently include:

- HOSSOMII Hills
- HOSSOMII Default
- Red Team Grid
- Retro Blue Abstract
- HOSSOMII Arcade
- Minimal Green

`HOSSOMII Default` is the default wallpaper.

Visual preferences are persisted using local storage.

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

Certain system interactions can trigger a critical failure followed by a dedicated recovery environment.

The recovery console interacts with the same underlying filesystem used by the desktop applications.

The exact trigger and complete sequence are intentionally not documented here.

Exploration is part of the experience.

---

## Achievements

HOSSOMII OS contains a small achievement system used to reward exploration.

Achievement notifications are queued and displayed inside the desktop.

Some unlock conditions are intentionally undocumented.

The achievement system will be expanded in a future version.

---

## Power Flow

The system supports shutdown and restart states.

Shutdown currently follows:

```text
Desktop
   ↓
Saving settings
   ↓
Shutting down
   ↓
Powered Off
```

Restart follows:

```text
Desktop
   ↓
Restarting
   ↓
Remote Login
```

The powered-off experience and system startup flow will receive additional visual and interaction work in the next development phase.

---

## Architecture

Simplified architecture:

```text
src/
│
├── applications/
│   ├── browser/
│   ├── computer/
│   ├── control-panel/
│   ├── documents/
│   ├── explorer/
│   ├── image-viewer/
│   ├── notepad/
│   ├── pdf/
│   ├── project-viewer/
│   ├── projects/
│   ├── quick-view/
│   ├── recycle-bin/
│   └── terminal/
│
├── content/
│   └── structured portfolio data
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

Automated tests currently cover important filesystem behavior.

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

Production validation also includes:

```bash
npm run build
npm run lint
```

---

## Current Portfolio Projects

### HOSSOMII OS

Interactive portfolio and fictional desktop operating-system experience.

Technical areas include:

- React architecture
- TypeScript
- Zustand
- custom Window Manager
- virtual filesystem
- application integration
- interactive UI
- testing

### TNT Basketball

Arcade basketball game developed with Unity and C#.

Technical areas include:

- gameplay systems
- score and combo logic
- power-ups
- gameplay state
- responsive UI
- WebGL

### Médicos & Dentistas

Fullstack healthcare-themed web application that originally started as a frontend project and was later expanded into a complete frontend/backend architecture.

Technical areas include:

- React
- Node.js
- Express
- REST API
- PostgreSQL
- Prisma
- Zod
- Axios

---

## Project Philosophy

### Exploration instead of scrolling

Portfolio information should be discovered through interaction rather than presented only as traditional webpage sections.

### Fast access without removing exploration

Visitors who need information quickly can use Quick View, while the complete operating system remains available for deeper exploration.

### Functionality before decoration

Interfaces should work whenever possible.

If there is an Explorer, it should navigate.

If there is a Recycle Bin, it should restore files.

If there is a Terminal, it should interact with the same filesystem.

### Shared state

Applications should not maintain isolated copies of the same information.

### Single source of truth

Portfolio project data should be stored once and transformed for the interfaces that need it.

### Safe internal rules

Important filesystem rules are enforced at the state layer rather than only through UI restrictions.

### Nostalgia without direct imitation

The project references early-2000s operating systems while maintaining its own visual identity.

### Surprises without trapping the visitor

Easter eggs and narrative events can alter the experience, but they should not permanently prevent visitors from continuing.

---

## Inspiration

HOSSOMII OS takes inspiration from:

- early-2000s desktop interfaces
- Windows XP-era software
- early personal websites
- remote access interfaces
- diegetic game interfaces
- investigative software experiences
- The Operator
- Watch Dogs

These references are used as design direction rather than being reproduced literally.

---

## Development Status

```text
v0.3 — Filesystem / Explorer / Desktop Apps
COMPLETE

v0.4 — Portfolio Content
COMPLETE

v0.5 — Visual Polish / Motion
NEXT

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

---

## Next Phase — v0.5

The next development phase focuses on visual polish and stronger system feedback.

Planned work currently includes:

- dedicated TXT file icon
- dedicated PDF file icon
- improved powered-off screen
- initial Power screen before remote login
- first-use achievements
- achievement persistence
- centralized external-link handling
- additional system microinteractions
- motion polish

Planned first-use achievements include:

- opening a text file
- opening a PDF
- deleting an item
- opening an external link

Audio remains reserved for v0.6.

---

## Final Major Application

A larger interactive application is planned for the final stage of the project.

It will only be developed when the rest of HOSSOMII OS is close to completion.

The game will remain architecturally independent from the operating-system implementation while being accessible from inside the fictional desktop.

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

Software developer and Software Engineering student interested in backend development, systems, networks and cybersecurity.

GitHub:

https://github.com/Hossomii