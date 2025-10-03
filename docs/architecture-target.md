# Target Architecture Document — Alits Project

## Introduction

This document describes the **planned technical architecture** for the Alits project — the future-state design that builds on the current brownfield repo. Where the brownfield doc reflects "what exists," this target architecture reflects "what we are building toward."

### Purpose
* Provide a clear reference for the intended abstractions, data models, and integration workflows.
* Serve as a blueprint for implementation of PRD requirements (Drum Key Remapper MVP and beyond).
* Establish design principles to guide incremental refactoring from brownfield to target.
* Enable AI-assisted development through comprehensive type definitions and clear patterns.

### Scope
* Multi-package library ecosystem (`@alits/*` packages per PRD Epics)
* CLI tooling (via upstream `maxmsp-ts` once PR merged)
* Test/reference apps (`apps/maxmsp-test`)
* Developer workflows (dual-layer testing: Jest + manual fixtures)
* Observability + reactive patterns (RxJS with generalized helpers)
* Out-of-scope: personal UAT projects (e.g., `apps/kebricide`)

---

## Design Principles

1. **Type-Safe Abstractions** — Strongly typed TypeScript classes for Live Object Model (LOM).
2. **Async & Reactive** — Promise-based async calls and RxJS Observables for reactivity.
3. **Modular Package Architecture** — Multi-package ecosystem aligned with PRD Epics for maintainability.
4. **Separation of Concerns** — Core library abstractions distinct from CLI build pipeline and from device apps.
5. **Max Runtime Compatibility** — All code compiled to ES5 for Max 8 runtime.
6. **Dual-Layer Testing** — Jest unit tests + manual fixtures for comprehensive validation.
7. **AI-Friendly Scaffolding** — Docs and type definitions optimized for code assistant usage.
8. **Minimal External Forks** — Depend on upstream CLI; avoid maintaining forks.
9. **MVP-Driven Development** — Architecture supports incremental delivery of Drum Key Remapper MVP.

---

## High-Level System Overview

```mermaid
flowchart TD
  subgraph Packages[Alits Package Ecosystem]
    subgraph Epic1[Epic 1: Foundation]
      CORE[@alits/core]
      TEST[@alits/test-utils]
      LOG[@alits/logging]
    end
    
    subgraph Epic2[Epic 2: Track & Scene Basics]
      TRACKS[@alits/tracks]
      SCENES[@alits/scenes]
    end
    
    subgraph Epic3[Epic 3: Clip Layer]
      CLIPS[@alits/clips]
    end
    
    subgraph Epic4[Epic 4: Device Layer]
      DEVICES[@alits/devices]
    end
    
    subgraph Epic5[Epic 5: Advanced Devices - MVP]
      RACKS[@alits/racks]
      DRUMS[@alits/drums]
    end
    
    subgraph Epic6[Epic 6: Specialized Libraries]
      SIMPLER[@alits/simpler]
      STOCK[@alits/stock-devices]
      CONTROL[@alits/control-surface]
      CUE[@alits/cue-points]
      GROOVE[@alits/groove]
      TUNING[@alits/tuning]
      META[@alits]
    end
  end

  subgraph CLI[MaxMSP-TS CLI]
    BLD[Build]
    DEV[Dev]
    INIT[Init]
  end

  subgraph Apps[Test & Fixtures]
    TESTAPP[MaxMsp Test]
    FIXT[.amxd Fixtures]
    MANUAL[Manual Test Scripts]
  end

  CORE --> TRACKS --> CLIPS --> DEVICES --> RACKS --> DRUMS
  TEST --> CORE
  LOG --> CORE
  CLI --> TESTAPP
  TESTAPP --> FIXT
  TESTAPP --> MANUAL
  Packages --> TESTAPP
```

**Explanation:**
* Multi-package ecosystem organized by PRD Epics
* Foundation packages (`@alits/core`, `@alits/test-utils`, `@alits/logging`) support all others
* Progressive dependency chain: Core → Tracks → Clips → Devices → Racks → Drums
* MVP (Drum Key Remapper) delivered in Epic 5 via `@alits/drums` + `@alits/racks`
* CLI compiles TS → ES5 and injects libraries
* Test app and fixtures consume packages to validate correctness

---

## Package Ecosystem Architecture

### Foundation Packages (Epic 1)

#### `@alits/core`
* **Root abstractions**: `LiveSet`, `Application`, `Song`
* **Core utilities**: MIDI note ↔ name conversion, error handling
* **Observability foundation**: Generalized `observeProperty<T>()` helper
* **Entry point**: `import { LiveSet, Track, RackDevice, DrumPad } from '@alits/core'`

#### `@alits/test-utils`
* **Shared testing utilities**: Mock LiveAPI implementations, test data factories
* **Observable testing helpers**: RxJS testing utilities
* **Manual fixture support**: Utilities for `.amxd` fixture creation and validation
* **TypeScript assertion utilities**: Type-safe test helpers

#### `@alits/logging`
* **Centralized logging**: `alitsLogger` with structured log levels
* **Max console integration**: Routes to `post()` and `error()` with prefixes
* **Conditional debugging**: Runtime enable/disable for debug logs
* **Structured output**: `[Alits/INFO]`, `[Alits/TEST]` markers for semi-automation

### Progressive Layer Packages

#### `@alits/tracks` (Epic 2)
* **Track abstractions**: `Track`, `Track.View`, `Track.ClipSlots`, `Track.Devices`
* **Special tracks**: `Song.VisibleTracks`, `Song.SelectedTrack`, `Track.GroupTrack`
* **Observable properties**: `track.observeMute()`, `track.observeSolo()`, etc.

#### `@alits/scenes` (Epic 2)
* **Scene management**: `Scene`, `Scene.ClipSlots`
* **Scene operations**: Launch, stop, selection

#### `@alits/clips` (Epic 3)
* **Clip abstractions**: `Clip`, `ClipSlot`, `Clip.View`
* **Clip operations**: Play, stop, loop, quantization
* **Observable properties**: `clip.observePlaying()`, `clip.observeLooping()`

#### `@alits/devices` (Epic 4)
* **Device abstractions**: `Device`, `Device.Parameters`, `Device.View`
* **Device I/O**: `Device.AudioInputs`, `Device.MidiInputs`, etc.
* **Parameter management**: `DeviceParameter` with observable values

#### `@alits/racks` (Epic 5 - MVP Component)
* **Rack abstractions**: `RackDevice`, `Chain`, `Chain.Devices`
* **Rack operations**: Chain management, device routing
* **Observable properties**: `rack.observeSelectedChain()`

#### `@alits/drums` (Epic 5 - MVP Component)
* **Drum abstractions**: `DrumPad`, `DrumChain`, `DrumCellDevice`
* **MVP functionality**: Drum pad renaming, note assignment
* **Key methods**: `pad.getNote()`, `pad.setName()`, `pad.hasChain()`
* **Observable properties**: `pad.observeNote()`, `pad.observeName()`

### Specialized Packages (Epic 6)
* `@alits/simpler` — Simpler device abstractions
* `@alits/stock-devices` — Stock device wrappers (EQ8, Compressor, etc.)
* `@alits/control-surface` — Control surface integration
* `@alits/cue-points` — Cue point management
* `@alits/groove` — Groove pool integration
* `@alits/tuning` — Tuning system support
* `@alits` — Meta package with re-exports

---

## CLI Tooling (`maxmsp-ts`)

### Current State & Transition Plan
* **Current**: Using temporary fork of `@aptrn/maxmsp-ts` (read-only)
* **Target**: Depend on upstream `@aptrn/maxmsp-ts` post-[PR #29](https://github.com/aptrn/maxmsp-ts/pull/29) merge
* **Timeline**: Remove fork once upstream PR merges and stabilizes

### CLI Commands
* `build` → transpile TS → ES5 and rewrite imports for Max runtime
* `dev` → hot-reload/watch mode for development
* `init` → scaffold new device project with Alits integration
* `add` / `rm` → manage dependencies within Max projects

### Integration with Package Ecosystem
* CLI automatically injects `@alits/*` packages into Max device builds
* Ensures consistent ES5 output with strict `tsconfig.json` configuration
* Supports workspace references for internal package dependencies

---

## Testing Architecture

### Dual-Layer Testing Strategy

#### Layer 1: Automated Unit Tests (Jest)
* **Framework**: Jest + ts-jest with Turborepo integration
* **Coverage Target**: ≥90% for core abstractions (per PRD NFR5)
* **Mock Strategy**: Comprehensive LiveAPI test doubles
* **Package-Level**: Each `@alits/*` package has individual Jest configuration
* **Shared Utilities**: Common testing utilities in `@alits/test-utils`

#### Layer 2: Manual Testing Fixtures
* **Purpose**: Validate behavior within Ableton Live's Max for Live runtime
* **Structure**: Co-located within each package at `/packages/*/tests/manual/`
* **Components**:
  * `.amxd` device fixtures in `{fixture-name}/fixtures/`
  * Creation guides in `{fixture-name}/creation-guide.md` (step-by-step `.amxd` creation)
  * Test scripts in `{fixture-name}/test-script.md` (human-readable validation steps)
  * Result logs in `{fixture-name}/results/` (YAML/Markdown with timestamps)
  * Self-contained structure with package.json, tsconfig.json, maxmsp.config.json

### Semi-Automated Validation
* **Structured Logging**: `[Alits/TEST]` markers for automated parsing
* **Log Export**: Testers export Max console logs for analysis
* **Verification Scripts**: Parse exported logs to confirm expected behavior
* **Traceability**: Map features → fixtures → result logs for QA

### `apps/maxmsp-test`
* **Role**: Reference integration project demonstrating package usage
* **Purpose**: Validates CLI + package integration within Max for Live
* **MVP Focus**: Houses Drum Key Remapper manual testing fixtures

---

## Observability & Reactive Patterns

### Generalized Observability Helper
* **Core Pattern**: `observeProperty<T>(path: string, prop: string): Observable<T>`
* **Purpose**: Systematically expose all `observe`-able LOM properties as RxJS streams
* **Implementation**: Wraps LiveAPI property observers with proper cleanup
* **Usage**: Higher-level classes call this helper for all observable properties

### Observable API Design
* **Naming Convention**: `observeX()` methods for all mutable properties
* **Examples**: 
  * `track.observeMute(): Observable<boolean>`
  * `pad.observeNote(): Observable<number>`
  * `clip.observePlaying(): Observable<boolean>`
* **Composition**: Encourage `combineLatest`, `merge`, `map`, `filter` for reactive orchestration

### Reactive Use Cases
* **Auto-renaming**: Drum pads automatically rename when samples change
* **Live monitoring**: Real-time device parameter observation
* **Reactive logging**: Observable-based test harnesses with `[Alits/TEST]` markers
* **UI synchronization**: Reactive updates for device interfaces

### Resource Management
* **Unsubscription**: All observables provide teardown logic to stop LiveAPI observers
* **Memory Management**: Proper cleanup prevents memory leaks in Max runtime
* **Error Handling**: Observable error streams for graceful failure handling

---

## MVP Implementation Path

### Drum Key Remapper MVP (Epic 5)
* **Target Packages**: `@alits/drums` + `@alits/racks` + `@alits/core`
* **Core Functionality**: Automatically rename drum pads to their MIDI note names
* **Key Implementation**:
  ```typescript
  import { LiveSet, Track, RackDevice, DrumPad } from '@alits/core';
  
  const liveSet = new LiveSet();
  const track = await liveSet.getTrackForThisDevice();
  const devices = await track.getDevices();
  const drumRack = devices.find(d => d instanceof RackDevice && d.isDrumRack());
  const pads: DrumPad[] = await drumRack.getDrumPads();
  
  for (const pad of pads) {
    if (!(await pad.hasChain())) continue;
    const noteNumber = await pad.getNote();
    const noteName = midiNoteToName(noteNumber);
    await pad.setName(noteName);
  }
  ```

### MVP Validation
* **Manual Fixtures**: `.amxd` device in `apps/maxmsp-test` for Live runtime validation
* **Test Scripts**: Step-by-step validation procedures
* **Result Logging**: `[Alits/TEST]` markers for semi-automated verification
* **Coverage**: Unit tests + manual fixtures ensure comprehensive validation

---

## Infrastructure & Dev Workflow

### Monorepo Architecture (Turborepo + pnpm)
* **Package Manager**: pnpm workspaces for efficient dependency management
* **Build System**: Turborepo for parallel task execution and caching
* **Package Structure**: Consistent layout across all `@alits/*` packages
* **Shared Configuration**: Base Jest, TypeScript, ESLint configs at root level

### Development Commands
* **Root Level**: `pnpm build`, `pnpm test`, `pnpm test:watch`, `pnpm lint`
* **Package-Specific**: `pnpm --filter @alits/core test`, `pnpm --filter @alits/drums build`
* **Turborepo Tasks**: Automatic dependency ordering and selective execution

### CI/CD Integration
* **Selective Testing**: Only run tests for changed packages
* **Parallel Execution**: Tests run in parallel across packages
* **Caching**: Build and test results cached for unchanged packages
* **Dependency Graph**: Tests run in dependency order (core before tracks, etc.)

### Toolchain
* **Runtime**: Node.js 22.x (Active LTS), TypeScript 5.6, Rollup
* **Target**: ES5 (Max 8 runtime compatibility)
* **Docker**: VS Code DevContainer only (not part of runtime or product)

---

## Future Considerations

* **Cross-App Reuse** — Core abstractions usable beyond drum pad renaming.
* **Plugin Ecosystem** — Potential npm-distributed packages built on Alits.
* **AI Integration** — Autocomplete + scaffolding patterns for device developers.
* **Extended Testing** — Simulated LOM for CI-friendly integration tests.

---

## Summary

The target architecture establishes Alits as a **modern, type-safe, reactive abstraction layer** for Ableton Live's LOM, organized as a multi-package ecosystem aligned with PRD Epics. Built on TypeScript and RxJS with generalized observability patterns, compiled to Max-compatible ES5, and validated through dual-layer testing (Jest + manual fixtures). The architecture supports incremental delivery of the Drum Key Remapper MVP while enabling comprehensive AI-assisted development workflows through comprehensive type definitions and clear architectural patterns.

### Key Architectural Achievements
* **Multi-package ecosystem** organized by PRD Epics for maintainability
* **Dual-layer testing strategy** ensuring both unit test coverage and Live runtime validation
* **Generalized observability patterns** with RxJS for reactive device development
* **MVP-focused delivery path** through Epic 5 packages (`@alits/drums` + `@alits/racks`)
* **AI-friendly scaffolding** with comprehensive type definitions and clear patterns
* **Turborepo integration** for efficient monorepo management and CI/CD optimization

