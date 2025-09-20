# Brownfield Architecture Document — Alits Project

## Introduction

This document captures the **current brownfield state** of the Alits codebase, including existing technical structures, conventions, and areas of technical debt. It also outlines **planned integration points** for enhancements described in the PRD (e.g., Drum Key Remapper MVP), but it is not a forward-looking target architecture. The emphasis is on what exists today and how it positions us for planned development.

### Document Scope

The scope focuses on:

* Core library (`@alits/core`)
* CLI tooling (`@aptrn/maxmsp-ts` — external, temporary fork)
* Example test app (`apps/maxmsp-test`)
* Developer-owned experiment (`apps/kebricide` — not part of Alits proper)
* Supporting infrastructure (monorepo config, Docker devcontainers for Alits dev only)

### Change Log

| Date       | Version | Description                                                                                                               | Author              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 2025-09-20 | 1.0     | Initial brownfield architecture draft                                                                                     | Winston (Architect) |
| 2025-09-20 | 1.1     | Added note: `@aptrn/maxmsp-ts` is external, read-only, pending [PR #29](https://github.com/aptrn/maxmsp-ts/pull/29) merge | Winston (Architect) |
| 2025-09-20 | 1.2     | Clarified scope of `apps/kebricide`, infra usage, and observability as planned                                              | Winston (Architect) |

---

## Quick Reference — Key Files and Entry Points

### `@alits/core` (Core Library)

* `packages/alits-core/src/index.ts` → current entrypoint (`greet()` placeholder)
* `packages/alits-core/tests/example.test.ts` → Jest example test
* `packages/alits-core/rollup.config.js` → library bundling
* `packages/alits-core/tsconfig.json` → TypeScript config

### `@aptrn/maxmsp-ts` (External CLI Tool — Read-Only)

* Location: `packages/maxmsp-ts/`
* Purpose: CLI for transpiling TS → ES5 and injecting libraries into Max device projects.
* Status: **External package owned by @aptrn.**
  * This fork exists here **temporarily** until [PR #29](https://github.com/aptrn/maxmsp-ts/pull/29) merges upstream.
  * **Read-only**: Do not actively develop features in this repo copy.
  * Exception: Apply critical fixes only if project progress is blocked.
* Entrypoint: `packages/maxmsp-ts/src/index.ts`

### `apps/maxmsp-test` (Reference Device Project)

* `apps/maxmsp-test/src/Main.ts` → sample Max device entry
* `apps/maxmsp-test/maxmsp.config.json` → maps workspace libs to Max
* `apps/maxmsp-test/package.json` → dev/test setup

### `apps/kebricide` (Developer UAT Project)

* `apps/kebricide/src/kebricide.ts` → developer’s own prototype
* Purpose: **Not part of Alits project deliverables.** Used by developer as a personal project and as **UAT (User Acceptance Testing)** of Alits abstractions.
* The `Project/` directory contains compiled JS artifacts; not considered part of the core architecture.

### Documentation & Infrastructure

* `docs/prd.md` → Product Requirements Document (authoritative requirements)
* `docs/brief-*.md` → supporting briefs (drum key remapper, testing strategy, coding conventions, observability, etc.)
* `pnpm-workspace.yaml` → monorepo package config
* `turbo.json` → task runner config
* `Dockerfile`, `docker-compose.yml` → **for Alits development environment only** (VS Code DevContainer)

---

## High-Level Architecture

### Technical Summary

The system is a **pnpm monorepo** with each package acting as a distinct API surface:

* **Core Library (`@alits/core`)**
  * Provides abstractions over Ableton Live’s Live Object Model (LOM).
  * Targeted to support async/await, observables (RxJS), and MIDI utilities.
  * Currently minimal, with roadmap aligned to PRD (Tracks, Devices, Clips, DrumPads).

* **CLI Tool (`@aptrn/maxmsp-ts`)**
  * Provides build/dev pipeline for Max-compatible TypeScript.
  * **External package** maintained by @aptrn.
  * Repo copy is **temporary, read-only** until upstream merges PR.

* **Apps (`apps/maxmsp-test`)**
  * Serves as reference/test device.
  * Validates CLI + library integration inside Max for Live.
  * Houses manual testing fixtures for MVP.

* **Kebricide (developer UAT app)**
  * Out-of-scope for Alits deliverables.
  * Used by the developer as a proving ground for using Alits in real device development.

* **Docs**
  * Rich design briefs, PRD, and coding conventions.
  * Explicitly designed to be **AI-friendly scaffolding** (see `docs/brief.md`).

* **Infrastructure**
  * pnpm + Turbo for monorepo management.
  * Docker for reproducible environments, but **only for VS Code devcontainer support for Alits dev**.

### Actual Tech Stack

| Category     | Technology                         | Notes                                                          |
| ------------ | ---------------------------------- | -------------------------------------------------------------- |
| Runtime      | Node.js 22.x (Active LTS)          | For build/test; devices transpile down to ES5 runtime in Max 8 |
| Language     | TypeScript 5.6                     | Strict mode, type-safe, async/await support                    |
| Frameworks   | RxJS (planned)                     | Observables for Live object properties                         |
| Testing      | Jest + ts-jest                     | Unit testing of `@alits/core`                                  |
| Build System | Rollup                             | Bundles libraries for npm and device builds                    |
| CLI          | maxmsp-ts                          | Custom CLI for Max-compatible builds                           |
| Max Runtime  | Max 8 (ES5 JavaScript)             | Target runtime for `.amxd` devices                             |
| DAW          | Ableton Live 11.x                  | Host environment for Max for Live devices                      |
| Container    | Docker (VS Code devcontainer only) | Provides reproducible dev env for **Alits dev only**           |

---

## Data Models and APIs

### `@alits/core`

* **Current State**: Minimal (`greet()` placeholder).
* **Planned (per PRD + briefs)**:
  * LOM abstractions (`LiveSet`, `Track`, `Device`, `RackDevice`, `DrumPad`).
  * Async/await promise-based API.
  * RxJS observables (see `docs/brief-M4L-observability-and-rxjs.md`).
  * Utilities for MIDI note ↔ name conversion.
* **Relation to PRD**: Implements FR1–FR5 (core functional requirements).
* **Cross-Reference**: See [`docs/brief-M4L-drum-key-remapper-alits-example.md`](./brief-M4L-drum-key-remapper-alits-example.md).

### `@aptrn/maxmsp-ts`

* **Current State**: CLI with commands (`build`, `dev`, `init`, `add`, `rm`).
* **Status**: External, read-only fork.
* **Relation to PRD**: Critical for CR4 (ES5 runtime constraint).

### `apps/maxmsp-test`

* **Current State**: Example project using `@alits/core` + CLI.
* **Planned**: Becomes testbed for validating **manual testing fixtures** (see `docs/brief-manual-testing-fixtures.md`).

### `apps/kebricide`

* **Current State**: Developer-owned prototype.
* **Role**: Used as UAT; not an official part of the Alits product scope.

---

## Technical Debt and Known Issues

1. **External CLI Fork (`@aptrn/maxmsp-ts`)**
   * Risk: Divergence from upstream.
   * Plan: Treat as read-only; remove fork once PR merges.

2. **Minimal Core Library**
   * Risk: Cannot yet deliver PRD abstractions.
   * Plan: Incrementally expand per FR1–FR5.

3. **ES5 Runtime Constraint**
   * Risk: Async/await + TS features may need polyfills.
   * Plan: Validate with `tsc` target = ES5.

4. **Observables Not Yet Implemented**
   * Risk: Reactive workflows (auto renaming, etc.) blocked.
   * Plan: Add post-MVP; see observability brief.

5. **Testing Coverage Gap**
   * Risk: Unit coverage minimal; Live runtime untested.
   * Plan: Expand fixtures and automation; see `docs/brief-manual-testing-fixtures.md`.

6. **Documentation Duplication Risk**
   * Risk: Overlap between PRD and briefs.
   * Plan: PRD is authoritative; cross-reference briefs.

---

## Context for Non-Max Developers

* **Execution Environment**: Max uses an embedded ES5-only JS runtime (see `docs/c74___M4L___Concept___LiveAPI Overview for JS.md`).
* **Key Constraint**: No `let`, `const`, `async/await`, or ES6 classes natively. All TypeScript must transpile to ES5.
* **Entrypoints**: Max devices use `js` objects where functions like `function bang()` respond to messages.
* **Implication**: Alits must provide abstractions that hide ES5 limitations and expose modern async/observable APIs to developers.

---

## Testing Reality

* Current: Trivial Jest unit test only.
* Manual Fixtures: `.amxd` devices required for Live runtime verification. See `docs/brief-manual-testing-fixtures.md` for the authoritative workflow.
* Semi-Automation: Planned log-based verification (`[Alits/TEST] ...`).
* Known Gap: End-to-end coverage of CLI + core + app integration not yet present.

---

## Appendix — Useful Commands

**Monorepo**
* `pnpm install` → bootstrap deps
* `pnpm build` → build all packages
* `pnpm test` → run Jest tests

**CLI (`@aptrn/maxmsp-ts`)**
* `pnpm maxmsp build` → build Max project
* `pnpm maxmsp dev` → watch mode

**Docker (VS Code Devcontainer Only)**
* `docker compose up` → start container
* `docker compose run --rm app sh` → run inside container

