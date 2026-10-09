# HOSSOMII OS

Interactive developer portfolio disguised as a fictional early-2000s operating system.

Instead of presenting projects through a traditional portfolio page, HOSSOMII OS turns them into an explorable desktop environment with applications, windows, files, a terminal, system states and hidden interactions.

Built with **React, TypeScript, Zustand, Vite and GSAP**.

> Interface language: Portuguese-BR.

---

## Overview

Visitors access a fictional workstation called:

```text
HOSSOMII-01
```

The main experience follows:

```text
Powered Off
     ↓
Power On
     ↓
Remote Access
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

The system also includes restart, shutdown, recovery and exploration-based achievements.

---

## Technical Highlights

HOSSOMII OS was built as more than a visual portfolio.

It includes:

- custom Window Manager
- shared virtual filesystem
- multiple desktop applications
- file associations
- Terminal connected to the same filesystem
- Recycle Bin with restoration
- persistent system preferences
- structured project data
- safe external navigation
- critical-file recovery flow
- persistent achievement system
- centralized audio system with typed sound cues
- persistent mute and master volume controls
- controlled audio concurrency and preload groups
- GSAP-based desktop motion
- responsive window constraints
- automated tests with Vitest

The goal is to simulate desktop behavior while keeping the project maintainable as a React application.

---

## Architecture

Shared state is managed mainly through Zustand.

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

Project information follows a single-source-of-truth approach:

```text
projects.ts
    ↓
projectFileSystem.ts
    ↓
Virtual File System
    ↓
Explorer / Quick View / Project Viewer
```

This allows the same project data to be reused throughout the operating-system interface.

More architectural details:

```text
docs/SYSTEM_OVERVIEW.md
```

---

## Main Applications

### Quick View

Fast professional overview with featured projects, résumé, documents and external profiles.

### My Computer

Filesystem explorer connected to the shared virtual disk.

### Projects

Projects appear as directories containing information, screenshots, technical documents and `project.exe`.

### Project Viewer

Dedicated case-study application with:

- Overview
- Build Log
- Gallery
- Tech information

### HOSSOMII Web

Internal browser containing:

- Anthony Online
- HOSSOMII News
- external resources

### Terminal

Connected directly to the same filesystem used by the graphical interface.

Supports navigation, file reading, application opening, deletion and basic system commands.

### Recycle Bin

Deleted files can be restored to their original location.

---

## Window Manager

Applications run inside a custom desktop Window Manager supporting:

- dragging
- resizing
- focus and z-index
- minimizing
- maximizing
- restoring
- closing
- multiple window instances
- viewport constraints

Opening, minimizing, restoring and closing windows use short GSAP transitions.

`prefers-reduced-motion` is respected.

Minimized applications remain mounted, preserving their internal state.

---

## Virtual File System

The system uses an in-memory filesystem shared between applications.

Example:

```text
C:\

├── Usuários\
│   └── Anthony\
│       ├── Área de Trabalho\
│       ├── Documentos\
│       └── Projetos\
│
├── Sistema\
└── Programas\
```

Supported associations include:

```text
.txt
→ Notepad

.pdf
→ PDF Viewer

.webp / .png / .jpg / .jpeg
→ Image Viewer

project.exe
→ Project Viewer
```

Filesystem rules such as protected and critical files are enforced at the state layer rather than only through the UI.

---

## Projects

### HOSSOMII OS

Interactive portfolio and fictional desktop environment.

Technical focus:

- React architecture
- TypeScript
- Zustand
- Window Manager
- virtual filesystem
- shared application state
- motion
- testing

### TNT Basketball

Arcade basketball game developed with **Unity and C#**.

Technical focus:

- gameplay systems
- scoring and combos
- power-ups
- state management
- WebGL

### Médicos & Dentistas

Fullstack web application built with:

- React
- Node.js
- Express
- PostgreSQL
- Prisma
- Zod
- Axios

---

## Tech Stack

### Frontend

- React 19
- TypeScript 6
- Vite 8

### State

- Zustand

### Motion

- GSAP

### Testing

- Vitest

### Tooling

- ESLint
- Git
- GitHub

---

## Running Locally

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Validation:

```bash
npm test
npm run lint
npm run build
```

---

## Development Status

```text
v0.3 — Filesystem / Explorer / Desktop Apps
COMPLETE

v0.4 — Portfolio Content
COMPLETE

v0.5 — Visual Polish / Motion
COMPLETE

v0.6 — Audio
COMPLETE

v0.7 — Narrative / Easter Eggs
NEXT

v0.8 — Mobile / Accessibility / Performance
PLANNED

v0.9 — Complete OS Experience
PLANNED

v1.0 — game.exe + Final Integration
PLANNED
```

---

## v0.5 — Visual Polish / Motion

The current version introduced:

- dedicated TXT and PDF icons
- physical Power screen
- HOSSOMII startup splash
- redesigned Remote Access interface
- redesigned Powered Off experience
- persistent exploration achievements
- centralized external navigation
- animated windows
- animated Start Menu
- animated achievement notifications
- reduced-motion support

Motion remains intentionally subtle to preserve the early-2000s desktop character.

---

## v0.6 — Audio

v0.6 introduced a centralized and optional audio layer across the operating-system experience.

Current system cues include:

```text
System
├── startup
├── login
├── shutdown
├── critical glitch
└── recovery

Interface
├── password keypress
├── authentication error
├── folder navigation
└── achievement notification
```

Audio preferences are available through the Control Panel:

```text
Audio
├── mute
└── master volume
```

Both settings persist between sessions.

The audio architecture separates interface events from playback implementation:

```text
React Components
       ↓
Audio Service
       ↓
Audio Manager
       ↓
Audio Registry
       ↓
Browser Audio
```

`systemPreferencesStore` remains the source of truth for user preferences.

```text
systemPreferencesStore
         ↓
Audio Preferences Sync
         ↓
Audio Manager
```

The registry also defines playback behavior for each cue.

Supported policies include:

```text
overlap
→ allows controlled simultaneous playback

restart
→ replaces an existing instance of the same cue

ignore
→ prevents duplicate playback while the cue is active
```

Rapid sounds such as password keypresses use a voice limit to prevent excessive overlapping audio.

System startup also preloads the main session sounds after the user's power interaction, helping respect browser autoplay restrictions while reducing first-play latency.

Authentication failures combine audio with a short visual error state, while `prefers-reduced-motion` continues to be respected.

---

## Next — v0.7 Narrative / Easter Eggs

The next phase will deepen the fictional system without introducing another major application.

The focus will be on subtle discoveries such as:

- unusual files and system messages
- rare Terminal responses
- HOSSOMII SYSTEMS references
- conditional anomalies
- environmental storytelling
- additional exploration rewards

The existing critical recovery flow remains the main hidden system event.

Narrative elements should remain subtle and avoid turning the interface into a generic glitch or cyberpunk experience.

## Documentation

For a deeper explanation of the filesystem, Window Manager, applications, recovery system and architecture:

```text
docs/SYSTEM_OVERVIEW.md
```

---

## Author

**Anthony Hossomii Bugs**

Software developer and Software Engineering student interested in backend development, systems, networks and cybersecurity.

GitHub:

https://github.com/Hossomii