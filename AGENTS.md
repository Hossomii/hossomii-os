HOSSOMII OS — Agent Instructions

Project

HOSSOMII OS is an interactive developer portfolio presented as a fictional early-2000s desktop operating system.

The interface language is Portuguese-BR.

Main stack:

React

TypeScript

Vite

Zustand

GSAP

Vitest

ESLint

The project is intentionally more than a visual portfolio. It contains a shared virtual filesystem, Window Manager, desktop applications, achievements, narrative systems, audio, recovery flows and persistent preferences.

Required context

Before broad architectural work, read:

docs/SYSTEM_OVERVIEW.md

docs/PROJECT_STATUS.md

For focused tasks, inspect the relevant implementation before changing it.

Do not assume documentation is more current than the code. If code and documentation disagree, report the discrepancy before making architectural changes.

Development principles

Preserve the operating-system illusion.

Prefer extending the existing architecture instead of replacing it.

Keep changes scoped to the requested task.

Do not perform unrelated cleanup, redesigns or refactors unless explicitly requested.

Preserve existing behavior unless the task explicitly requires changing it.

Prefer the existing source of truth instead of duplicating state or data.

Important rules belong in system/state layers rather than only in UI components.

Shared concepts must remain shared between applications.

Do not introduce a new dependency without explicit approval.

Do not replace an existing architectural approach merely because another approach is more modern.

The early-2000s visual language is intentional. Do not modernize the UI unless explicitly requested.

Existing architecture

State

Shared application state is mainly managed with Zustand.

Important stores include:

filesystem

windows

system state

system preferences

achievements

achievement album

narrative

critical-file recovery

Do not create parallel state for data that already has an existing source of truth.

Virtual filesystem

Explorer, Terminal, Recycle Bin and file viewers operate on the same virtual filesystem.

Filesystem behavior must remain centralized.

File associations are centralized through the filesystem/application infrastructure.

Do not implement independent file-opening rules inside individual applications when a shared association already exists.

Window Manager

Desktop applications run through the existing Window Manager.

Window rendering is centralized through DesktopWindow.

Preserve:

dragging

resizing

focus

z-index

minimizing

maximizing

restoring

multiple application instances

viewport constraints

Do not bypass the Window Manager for normal desktop applications.

Portfolio data

Project information should continue following the project's single-source-of-truth approach.

Avoid duplicating project information across Quick View, Explorer and Project Viewer.

Audio

Use the existing centralized audio architecture.

UI components must not create unrelated direct audio implementations when the existing audio service can represent the event.

Narrative

Narrative behavior belongs in the existing narrative system.

Use the narrative registry/service/store rather than scattering hidden-event conditions throughout unrelated UI components.

Achievements

Achievement definitions belong in the achievement registry.

Achievement album behavior should continue using its existing service/store architecture.

Do not duplicate achievement definitions inside UI components.

Frozen feature — Critical Failure + Recovery

The Critical Failure + Recovery experience is approved and considered complete.

Expected flow:

critical file deletion
→ open windows close
→ colored pixel/glitch corruption
→ screen shutdown/collapse
→ blackout
→ recovery boot
→ blue HOSSOMII Recovery Console
→ diagnostic
→ restore
→ restart/recovery completion

Relevant implementation includes the critical-file system, CriticalFailureTransition, RecoveryEnvironment and associated styles/state.

Do not redesign, refactor, retime, rewrite or visually modify this experience unless the user explicitly requests that the frozen feature be changed.

Changes elsewhere must not regress this flow.

Scope discipline

Before editing, inspect the relevant implementation and understand the existing data flow.

For a focused task, modify only files necessary for that task.

If solving the task appears to require a broad architectural change, stop and explain why before implementing it.

Do not silently expand the task.

When uncertain between preserving approved behavior and introducing a new behavior, preserve the approved behavior.

Git safety

Never run destructive Git operations unless explicitly requested.

Do not run:

git reset --hard

git clean -fd

force push

destructive rebases

branch deletion

Do not commit automatically unless explicitly requested.

Do not push automatically unless explicitly requested.

Do not merge automatically unless explicitly requested.

Do not modify unrelated user changes.

Validation

For meaningful code changes, run:

npm test
npm run lint
npm run build

A task is not considered technically complete if these validations fail because of the change.

If a validation failure existed before the task, report it separately instead of hiding it.

For visual or interaction changes, automated validation does not replace manual browser verification.

Accessibility and motion

Preserve existing accessibility behavior.

Continue respecting prefers-reduced-motion.

Do not remove ARIA labels, keyboard behavior, visible focus or high-contrast support without an explicit reason.

Assets

Prefer existing optimized project asset formats and conventions.

Do not add duplicate assets unnecessarily.

Do not replace approved visual assets unless the task explicitly requires it.

Working style

For each task:

inspect the relevant code;

identify the smallest safe change;

implement only that change;

run appropriate validation;

summarize what changed and which files were affected;

report anything that still requires manual verification.

Do not continue automatically into the next roadmap item.

One task should end before another begins.