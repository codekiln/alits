# Brownfield Architecture Document — Alits Project

## Introduction

This document captures the **current state** of the Alits codebase, including existing technical structures, conventions, and areas of technical debt. It also outlines integration strategies for enhancements planned in the PRD (Drum Key Remapper MVP and beyond).

### Document Scope

The scope focuses on:

* Core library (`@alits/core`)
* CLI tooling (`@aptrn/maxmsp-ts`)
* Max for Live test apps (`apps/maxmsp-test`, `apps/kebricide`)
* Supporting infrastructure (monorepo config, Docker for VS Code devcontainers)

This document emphasizes **how new Alits abstractions will integrate** with the existing Max for Live JS/TypeScript toolchain.

### Change Log

| Date       | Version | Description                                                                                                               | Author              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 2025-09-20 | 1.0     | Initial brownfield architecture draft                                                                                     | Winston (Architect) |
| 2025-09-20 | 1.1     | Added note: `@aptrn/maxmsp-ts` is external, read-only, pending [PR #29](https://github.com/aptrn/maxmsp-ts/pull/29) merge | Winston (Architect) |

---

## Quick Reference — Key Files and Entry Points

### `@alits/core` (Core Library)

* `packages/alits-core/src/index.ts` → current entrypoint (`greet()`)
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

### `apps/maxmsp-test` (Example Device Project)

* `apps/maxmsp-test/src/Main.ts` → sample Max device entry
* `apps/maxmsp-test/maxmsp.config.json` → maps workspace libs to Max
* `apps/maxmsp-test/package.json` → dev/test setup

### `apps/kebricide` (Prototype Device Project)

* `apps/kebricide/src/kebricide.ts` → prototype entrypoint

### Documentation & Infrastructure

* `docs/prd.md` → Product Requirements Document
* `docs/brief-*.md` → supporting briefs (drum key remapper, testing strategy, coding conventions)
* `pnpm-workspace.yaml` → monorepo package config
* `turbo.json` → task runner config
* `Dockerfile`, `docker-compose.yml` → VS Code devcontainer support only

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
  * This repo carries a fork solely to patch gaps until [PR #29](https://github.com/aptrn/maxmsp-ts/pull/29) is accepted.
  * **Should be considered read-only** unless a critical blocker arises.
  * Future direction: rely on upstream release and remove local fork.

* **Apps (`apps/maxmsp-test`, `apps/kebricide`)**

  * Serve as reference/test devices.
  * Validate CLI + library integration inside Max for Live.
  * House manual testing fixtures for MVP (Drum Key Remapper).

* **Docs**

  * Rich design briefs, PRD, and coding conventions drive planning.
  * Provide AI-friendly scaffolding for vibe coding.

* **Infrastructure**

  * pnpm + Turbo for monorepo management.
  * Docker for reproducible environments, but **only for VS Code devcontainer support**.

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
| Container    | Docker (VS Code devcontainer only) | Provides reproducible dev env, not used for runtime testing    |

### Repository Structure Reality Check

* **Type**: pnpm monorepo
* **Primary Units**: `@alits/core`, `@aptrn/maxmsp-ts`, device apps
* **Notable Constraint**: All device code must compile to ES5 for Max runtime

---

## Source Tree and Module Organization

### Project Structure (Actual)

```
project-root/
├── apps/
│   ├── kebricide/                # Experimental device project
│   │   └── src/kebricide.ts
│   └── maxmsp-test/              # Example Max for Live test device
│       ├── src/Main.ts
│       ├── maxmsp.config.json
│       └── package.json
├── packages/
│   ├── alits-core/               # Core abstractions library
│   │   ├── src/index.ts
│   │   ├── tests/example.test.ts
│   │   └── rollup.config.js
│   └── maxmsp-ts/                # CLI tool (external, read-only fork)
│       ├── src/index.ts
│       ├── tsconfig.json
│       └── README.md
├── docs/                         # Design docs, PRD, briefs
│   ├── prd.md
│   ├── brief-*.md
│   └── c74___M4L___*.md
├── Dockerfile
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

### Key Modules and Their Purpose

* **`@alits/core`** → foundation for type-safe Ableton Live API abstractions. Currently minimal, intended to expand into Tracks, Devices, Clips, DrumPads.
* **`@aptrn/maxmsp-ts`** → CLI ensuring TypeScript projects can build into Max JS runtime (`tsc` + post-build rewrites). External, read-only.
* **`apps/maxmsp-test`** → Minimal Max for Live test project proving out CLI integration.
* **`apps/kebricide`** → Device prototype project (currently placeholder).
* **`docs/`** → Rich documentation layer capturing PRD, design briefs, conventions, and Ableton Live API notes.

---

## Data Models and APIs

### Package-Level APIs

#### 1. `@alits/core`

* **Current State**

  * Very minimal: `greet()` function (placeholder).
* **Planned (per PRD + briefs)**

  * **LOM Abstractions**: `LiveSet`, `Track`, `Device`, `RackDevice`, `DrumPad` as strongly-typed classes.
  * **Async/Await Support**: All API calls promise-based.
  * **Observables (RxJS)**: Real-time property/event streams (`observeName()`, `observeNote()`).
  * **Utilities**: MIDI note ↔ name conversion.
* **Relation to PRD**

  * Directly implements **FR1–FR5**.
  * Enables AI-friendly scaffolding for devices.

#### 2. `@aptrn/maxmsp-ts` (External, Read-Only)

* **Current State**

  * CLI with commands: `build`, `dev`, `init`, `add`, `rm`.
  * Handles transpilation + require path rewrites for Max runtime.
* **Status**

  * External project: [aptrn/maxmsp-ts](https://github.com/aptrn/maxmsp-ts).
  * This repo’s copy is **temporary** and tracks pending [PR #29](https://github.com/aptrn/maxmsp-ts/pull/29).
  * **Do not extend or evolve** here except for emergency patches.
* **Relation to PRD**

  * Critical for **CR4** (ES5 runtime constraint).
  * Provides infrastructure layer, but not a core domain surface.

#### 3. `apps/maxmsp-test`

* **Current State**

  * Example project using `@alits/core` + CLI to run in Max.
  * Single entrypoint: `Main.ts` → calls `mylib.greet()`.
* **Planned**

  * Becomes testbed for validating **manual testing fixtures**.
* **Relation to PRD**

  * Delivers **FR6/FR7** (Drum Key Remapper MVP + fixtures).

#### 4. `apps/kebricide`

* **Current State**

  * Prototype device project with placeholder code.
* **Planned**

  * Serves as experimental device space for post-MVP features (e.g., reactive auto-renaming).
* **Relation to PRD**

  * Not explicitly required, but aligns with “AI vibe coding” exploratory use case.

---

## Technical Debt and Known Issues

### 1. External CLI Fork (`@aptrn/maxmsp-ts`)

* **Issue**: Temporary fork of external package.
* **Risk**: Divergence from upstream; maintenance burden.
* **Plan**: Treat as **read-only**; only patch if critical. Remove fork once PR merges.

### 2. Minimal Core Library

* **Issue**: `@alits/core` only has `greet()` placeholder.
* **Risk**: Cannot yet deliver PRD abstractions.
* **Plan**: Incrementally expand per FR1–FR5.

### 3. ES5 Runtime Constraint

* **Issue**: Max requires ES5 JavaScript.
* **Risk**: Async/await + TS features may need polyfills.
* **Plan**: Validate with `tsc` target = ES5; audit dependencies.

### 4. Observables Not Yet Implemented

* **Issue**: RxJS integration pending.
* **Risk**: Limits reactivity (e.g., auto-pad renaming).
* **Plan**: Add post-MVP.

### 5. Testing Coverage Gap

* **Issue**: Jest coverage minimal.
* **Risk**: Low confidence in core APIs.
* **Plan**: Expand automated + manual fixture testing.

### 6. Documentation Duplication Risk

* **Issue**: Briefs + PRD overlap.
* **Risk**: Drift and inconsistency.
* **Plan**: Use PRD as authoritative; cross-reference briefs.

---

## Integration Points and External Dependencies

### External Services and Tooling

* **Ableton Live 11 + Max 8**

  * Host runtime; requires ES5.
* **@aptrn/maxmsp-ts**

  * CLI tool, external ownership.
  * Fork here is read-only; pending PR merge.
* **pnpm + Turbo**

  * Package + task management.
* **Docker**

  * For **VS Code devcontainer only**.

### Internal Integration Points

* **Core Library → Apps**

  * Apps consume `@alits/core`.
* **Apps → CLI**

  * Device builds depend on CLI for Max compatibility.
* **Docs → Dev Workflow**

  * PRD + briefs guide dev; PRD is authoritative.

---

## Development and Deployment

### Local Development Setup

1. Install Node.js 22.x and pnpm.
2. Run `pnpm build` to compile libraries.
3. Use `pnpm maxmsp build` / `pnpm maxmsp dev` for device projects.
4. Run tests with `pnpm test`.
5. Manual testing with `.amxd` fixtures in Live.

### Build and Deployment Process

* `pnpm build` compiles libs and apps.
* Devices exported as `.amxd` (manual step).
* Deployment targets: `.amxd` for end users; npm libs for devs.
* **Docker (VS Code Devcontainer Only)**

  * Provides reproducible Node + pnpm environment.
  * Not required for local dev.
  * Cannot replicate Live/Max runtime; manual testing mandatory.

### Environment Configuration

* **TypeScript**: Strict, ES5 target.
* **pnpm Workspaces**: Monorepo dependencies.
* **Turbo**: Task orchestration.

### Known Deployment Constraints

* ES5 only runtime.
* `.amxd` export manual.
* CLI fork read-only until upstream PR closes.

---

## Testing Reality

### Current Test Coverage

* Unit: trivial (`greet()` test).
* Integration: none yet.
* Manual fixtures: `.amxd` devices created in Live.

### Manual Fixture Workflow

* Fixtures: `/tests/manual/fixtures/*.amxd`
* Scripts: `/tests/manual/scripts/*.md`
* Results: `/tests/manual/results/*.yaml`
* Artifacts: `/tests/manual/artifacts/*`

### Semi-Automated Verification

* Structured console logs `[Alits/TEST] ...`
* Export logs → analyze for pass/fail.

### Known Testing Gaps

* Observables not covered.
* No end-to-end CLI + core + app tests.
* Live runtime cannot be CI-automated.

### QA Practices (Planned)

* Traceability matrix.
* Regression testing before releases.
* Defect logging with links to fixture + result.

---

## Appendix — Useful Commands and Troubleshooting

### Frequently Used Commands

**Monorepo**

* `pnpm install` → bootstrap deps
* `pnpm build` → build all packages
* `pnpm test` → run Jest tests

**CLI (`@aptrn/maxmsp-ts`)**

* `pnpm maxmsp build` → build Max project
* `pnpm maxmsp dev` → watch mode
* `pnpm maxmsp add <pkg>` / `pnpm maxmsp rm <pkg>`

**Docker (VS Code Devcontainer Only)**

* Not required for normal dev.
* Used for Remote - Containers in VS Code.
* `docker compose up` → start container
* `docker compose run --rm app sh` → run inside container

---

### Debugging and Troubleshooting

* **Max Console**

  * Use `post()` for logs; filter by patcher.
* **Require Path Errors**

  * Fix with `pnpm maxmsp build`.
* **ES5 Compatibility**

  * Ensure `tsconfig.json` targets ES5.
* **Fixture Loading Errors**

  * Rebuild with CLI; re-save in Live.

---

### Known Gotchas

* **CLI Fork**: Read-only until PR merge.
* **Manual `.amxd` Exports**: Required step in Live.
* **Observables**: Not yet available.

---

### Environment Notes

* **Node.js**: 22.x
* **TypeScript**: 5.6
* **Ableton Live**: 11.x + Max 8
* **Cross-Platform**: Devcontainer (optional), but runtime requires Windows/macOS with Live.

```
```
