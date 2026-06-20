# AGENTS.md

## Project

TripKin is a mobile H5 travel companion demo built with React, Vite, TypeScript, React Router, Less, and CSS Modules. The repository also has a minimal TypeScript Express backend under `server/` for mock API handoff work.

## Read First

Before editing code, read:

- `README.md`
- `docs/coding-guide.md`
- `docs/collaboration-guide.md`

If the user explicitly asks for testing, `webapp-testing`, Playwright, automated verification, screenshot verification, or repeatable browser checks, also read:

- `docs/webapp-testing-guide.md`

## Local Context

If `.local-docs/rules.md` exists, you may read it as workspace-local context for the current task.

`.local-docs/rules.md` is not a formal team rule and should not be copied directly into repository docs. It cannot override `AGENTS.md` or the confirmed docs under `docs/`.

If `.local-docs/` contains reference images, ask how they should be used before implementing against them:

- strict recreation
- style reference
- specific-part reference

## Current Scope

The current version focuses on frontend demo pages and route flow, plus a minimal `server/` TypeScript mock API chain when explicitly requested.

Do not add these unless explicitly requested:

- database
- login system
- real AI API
- new UI component library
- complex CI
- test framework

Do not add uncertain product ideas, future plans, or unconfirmed technical choices to repository docs.

## Webapp Testing

Do not use `webapp-testing` by default.

Use it only when the user explicitly asks for testing, `webapp-testing`, Playwright, automated verification, screenshot verification, or repeatable browser checks.

Before using it, read `docs/webapp-testing-guide.md`.

Do not copy a local AI skill directory into this repository. If `webapp-testing` is unavailable in the current AI environment, explain that and guide the user to install or enable it in their own AI tool environment.

All temporary Playwright scripts, screenshots, traces, logs, and browser artifacts must stay under ignored `.venv/` paths.

## Code Placement Rules

- Routed pages go in `src/pages`.
- Page-internal feature blocks go in `src/modules`.
- Cross-page reusable UI goes in `src/components`.
- Request and data-access code goes in `src/services`.
- Shared Zustand state goes in `src/store`.
- Pure helpers go in `src/utils`.
- Minimal backend code goes in `server`.

Keep ordinary page-local code close to the page until reuse is clear.

Prefer confirmed shared styles and shared components when they already exist.

Do not create shared components for speculative reuse. Do not modify confirmed shared components or global styles for a page-local need unless explicitly requested.

## Mobile Layout Rules

The layout baseline is 375px width.

Do not create fixed 375px page canvases. Use fluid width, `min-height: 100svh`, and natural vertical scrolling.

The app is mobile-first. Keep page content usable at 375px width and avoid horizontal overflow.

Do not introduce rem/vw scaling systems, Tailwind, or mobile adaptation libraries unless explicitly requested.

## Documentation Sync

When changing project structure, scripts, routes, global styles, engineering workflow, or shared components, update the related documentation in the same change.

When shared component or global style changes affect collaboration, update `docs/decision-notes/README.md`.

Use these sources:

- `README.md`: quick start, confirmed scripts, confirmed routes, document index
- `docs/coding-guide.md`: code placement, naming, style rules
- `docs/collaboration-guide.md`: collaboration and commit workflow
- `docs/decision-notes/README.md`: decisions that affect multiple people

Do not write decision notes for ordinary page-local changes.

## Commit Message Rules

Use only these formats:

- `type: subject`
- `type(scope): subject`

Do not use empty scope parentheses.

Bad:

```txt
feat(): subject
```

Allowed types are defined in `commitlint.config.cjs`.

## Verification

Before claiming completion, run:

```bash
npm run lint
npm run build
```

If documentation formatting changed, also run:

```bash
npm run format:check
```
