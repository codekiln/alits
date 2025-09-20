# Product Requirements Document (PRD) — Alits

## Goals & Background Context
- Deliver a modern **TypeScript-first framework** for Ableton Live device development.  
- Replace fragile **Max for Live JavaScript LiveAPI code** with **Alits typed abstractions**.  
- Provide **developer ergonomics**: async/await, Observables, RxJS integration.  
- Ensure **AI-readiness**: Type definitions and strong docs enable AI agents to generate and refactor code confidently.  
- Enable **maintainability and testability**: automated tests + manual testing fixtures.  
- Support **MVP use case**: the **Drum Key Remapper** device (see [brief-M4L-drum-key-remapper-alits-example.md](./brief-M4L-drum-key-remapper-alits-example.md)).  
- **Empower non-coders**: Improve the coding situation for Max for Live so **Ableton users without coding experience can use AI to “vibe code” devices**. TypeScript and first-class abstractions provide a clean, AI-friendly interface that is easier for generative models to understand and extend than today’s raw LiveAPI.  

**Background Context**
- Current Max for Live development is limited to **Max 8 JavaScript (ES5 only)**, which lacks modern language features and strong typing (see [c74___M4L___Concept___LiveAPI Overview for JS.md](./c74___M4L___Concept___LiveAPI%20Overview%20for%20JS.md)).  
- The **Alits approach** provides a modern abstraction layer, replacing fragile string paths with type-safe objects (see [c74___M4L___Idea___Alits.md](./c74___M4L___Idea___Alits.md)).  
- Early testing strategy includes both **automated unit tests** and **manual testing fixtures** to validate devices in the Ableton Live runtime (see [brief-manual-testing-fixtures.md](./brief-manual-testing-fixtures.md)).  
- Coding standards and conventions are documented to ensure consistency across modules (see [brief-coding-conventions.md](./brief-coding-conventions.md)).  

**Change Log**  
| Date       | Version | Description                               | Author |
| ---------- | ------- | ----------------------------------------- | ------ |
| 2025-09-10 | 0.1     | Initial PRD draft (goals/context)         | PM (John) |
| 2025-09-10 | 0.2     | Expanded goals with AI vibe coding use case | PM (John) |

---

## Requirements

**Functional Requirements (FR)**  
1. **FR1**: Provide a TypeScript-first API for interacting with Ableton Live’s Live Object Model (LOM).  
2. **FR2**: Enable device developers to build Max for Live devices using strongly typed abstractions instead of string-based LiveAPI calls.  
3. **FR3**: Support asynchronous workflows (`async/await`).  
4. **FR4**: Expose RxJS Observables for real-time event streams.  
5. **FR5**: Provide core utilities for MIDI handling, including note-to-name conversion.  
6. **FR6**: Deliver the **Drum Key Remapper** MVP device.  
7. **FR7**: Offer reusable manual testing fixtures.  
8. **FR8**: Provide an **AI-usable interface** so that non-coders can create functional Max for Live devices via AI code generation with minimal manual coding.  

**Non-Functional Requirements (NFR)**  
1. **NFR1**: Devices must run within Ableton Live 11 Suite + Max 8.  
2. **NFR2**: API must maintain compatibility with **TypeScript 5.6** and the **current Node.js Active LTS version** (as of 2025-09-10, Node.js 22.x).  
3. **NFR3**: Developer experience should prioritize readability, maintainability, and AI agent usability.  
4. **NFR4**: Manual test fixtures should be small, reusable `.amxd` devices.  
5. **NFR5**: Framework should support **unit test coverage of ≥90%** for core abstractions.  
   - *Note: Early MVP iterations may temporarily fall short until stabilized.*  

**Compatibility Requirements (CR)**  
1. **CR1**: Must maintain compatibility with Ableton Live 11.x LOM structure.  
2. **CR2**: Project must remain file-based, stateful via Ableton Live API only.  
3. **CR3**: Device UIs must remain compatible with Max’s `js`/`jsui` objects.  
4. **CR4**: Bundled code must run in ES5-only runtime.  
5. **CR5**: Aim for forward-compatibility with future Ableton Live/Max versions where feasible.  

**Change Log**  
| Date       | Version | Description                       | Author |
| ---------- | ------- | --------------------------------- | ------ |
| 2025-09-10 | 0.3     | Added Requirements draft          | PM (John) |
| 2025-09-10 | 0.4     | Added FR8, CR5, clarified NFR5    | PM (John) |

---

## UI/UX Design Goals

**Overall UX Vision**  
- Seamless Max for Live device experience, native to Ableton Live.  
- Controls must be minimal and self-explanatory.  
- AI vibe-coding workflow: interfaces should be predictable and easy for AI to scaffold.  
- Simple, musician-friendly feedback messages (“Pads renamed successfully!”).  
- Graceful error handling with plain-language guidance.  

**Key Interaction Paradigms**  
- **One-click operations** (e.g., “Rename Pads”).  
- **Passive observability** with optional logs (RxJS).  
- **Reactive updates** (auto-renaming as post-MVP).  
- **Consistency with Max UI idioms**.  

**Core Screens and Views**  
- Main Panel: rename button + status text + error messages.  
- Optional observability/logs view for advanced debugging.  

**Accessibility**  
- High-contrast visuals, consistent with Live’s light/dark modes.  
- Fonts aligned with Ableton UI.  

**Branding**  
- Neutral Ableton-style, optional subtle Alits branding.  

**Target Platforms**  
- Ableton Live 11 Suite, Max 8 runtime, Windows + macOS.  

---

## Technical Assumptions

- **Repo Structure**: pnpm monorepo with `packages/` (libraries) and `apps/` (devices/tests).  
- **Service Architecture**: monolith + libraries (no distributed services).  
- **Testing Requirements**: Jest for unit tests, `.amxd` fixtures for runtime validation. Target coverage ≥90%.  
- **Integration Requirements**:  
  - API via LiveAPI in Max for Live.  
  - Device UIs via Max `js/jsui`.  
  - Compiled and packaged via `maxmsp-ts` CLI (external dependency, patched until PR #29 merges).  
- **Code Organization**: `src/` → `dist/` per package, device scripts in `apps/*/src/`.  
- **Standards**: See [brief-coding-conventions.md](./brief-coding-conventions.md).  
- **Deployment**: `pnpm build`, devices distributed as `.amxd`, libraries to npm.  
- **Risks**: ES5-only runtime limits, fragile LOM integration, forward-compatibility uncertainty.  

---

## Epic List (Phases = Epics)

### Epic 1: **Foundation**  
- **Packages**: `@alits/core`, `@alits/test-utils`, `@alits/logging`  
- **Infrastructure**: TS setup, RxJS, Jest, CI/CD  
- **Cross-Cutting**: AI methodology, initial `.amxd` fixtures, ≥90% test coverage  

### Epic 2: **Track & Scene Basics**  
- **Packages**: `@alits/tracks`, `@alits/scenes`  
- **Functional**: type-safe APIs, Observable patterns, VisibleTracks/SelectedTrack  
- **Cross-Cutting**: docs, fixtures, QA traceability  

### Epic 3: **Clip Layer**  
- **Packages**: `@alits/clips`  
- **Functional**: clip creation/deletion, properties, observations  
- **Cross-Cutting**: docs, fixtures, QA  

### Epic 4: **Device Layer**  
- **Packages**: `@alits/devices`  
- **Functional**: parameters, view, IO, MaxDevice  
- **Cross-Cutting**: docs, fixtures, logs, structured tests  

### Epic 5: **Advanced Devices**  
- **Packages**: `@alits/racks`, `@alits/drums`  
- **Functional**: racks, chains, drum pads, mixers  
- **MVP**: Drum Key Remapper  
- **Cross-Cutting**: docs, fixture device, semi-automated logs  

### Epic 6: **Specialized Libraries**  
- **Packages**: `@alits/simpler`, `@alits/stock-devices`, `@alits/control-surface`, `@alits/cue-points`, `@alits/groove`, `@alits/tuning`, `@alits` meta  
- **Functional**: specialized devices + secondary objects  
- **Cross-Cutting**: full docs, regression QA, AI vibe-coding validation  

---

## Checklist Results

### 1. Scope Clarity  
- ✅ Clear articulation of **Goals & Background Context**.  
- ✅ Requirements separated into **FR / NFR / CR** with numbering.  
- ✅ Epics aligned with Phases; no dual-system confusion.  

### 2. Completeness  
- ✅ UI/UX goals included (with user-facing clarity + AI coding perspective).  
- ✅ Technical assumptions capture repo layout, build/deployment, risks.  
- ✅ Functional scope covers MVP (Drum Key Remapper) plus long-term expansion.  
- ⚠️ Open Question: Non-functional requirements mention test coverage, but no explicit **performance requirements** (e.g. latency under X ms). Might need to add later.  

### 3. Traceability  
- ✅ Each Epic maps directly to a package name (`@alits/*`) from the brief.  
- ✅ Cross-cutting deliverables (docs, QA, AI vibe coding) are captured inside epics.  
- ✅ MVP validation path (Drum Key Remapper) clearly linked to Epic 5.  

### 4. Risks & Assumptions  
- ✅ Risks identified: ES5-only runtime, fragile LiveAPI integration, dependency on external `maxmsp-ts`.  
- ✅ Mitigation strategies included: test coverage, fixtures, structured logs.  
- ⚠️ Assumption: Ableton Live 11.x + Max 8 will remain stable for project lifetime — not guaranteed.  

### 5. Actionability  
- ✅ Each epic has actionable deliverables that could be broken into stories.  
- ✅ Acceptance criteria can be derived directly from requirements + epic deliverables.  
- ✅ No ambiguity between Phases vs Epics.  

**Overall Result:** ✅ **Checklist Passed**  
- The PRD is **sufficiently complete and internally consistent** for execution.  
- A few **future refinements** (performance SLAs, Live version compatibility strategy) could be added, but they don’t block implementation.  