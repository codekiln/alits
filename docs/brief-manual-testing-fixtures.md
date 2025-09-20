## Project Brief: Manual Testing Fixtures for Max for Live

### Purpose

While TypeScript and unit testing provide confidence in code correctness, they cannot guarantee behavior within Ableton Live’s Max for Live runtime. This brief outlines a strategy for building **manual testing fixtures** that coexist alongside automated tests in the monorepo. These fixtures consist of:

1. Minimal Max for Live devices that exercise specific features.
2. Human-readable test scripts detailing setup and execution steps.
3. Systematic methods for recording test results in the repository.

The goal is to minimize the feedback loop between code changes and real-world verification inside Ableton Live.

---

### Principles

* **Clear Separation**: Automated unit tests and manual testing fixtures both live within each package (`/packages/*/tests/` and `/packages/*/tests/manual/` respectively).
* **Rapid Setup**: Each manual fixture should be a small, focused `.amxd` device that demonstrates one feature. To begin with, these devices must be created and saved manually in Ableton Live’s Max for Live UI (due to licensing restrictions), then added to the repo for use as fixtures.
* **Clarity**: Test scripts must use step-by-step instructions suitable for non-developer testers.
* **Traceability**: Every manual test run should be logged with results, dates, and tester identity.
* **Reusability**: Fixtures should be reusable across regression tests.
* **AI-Friendly**: AI can generate test scripts and placeholder fixture code, but humans must create and save `.amxd` files in Ableton Live.

---

### Fixture Structure in the Monorepo (Turborepo Workspaces)

```
/packages
  ├── alits-core/
  │   ├── src/                # Source TypeScript files
  │   └── tests/              # All tests for this package
  │       ├── *.test.ts       # Automated unit tests
  │       └── manual/         # Manual testing fixtures (Turborepo workspaces)
  │           ├── liveset-basic/          # Individual test workspace
  │           │   ├── src/
  │           │   │   └── LiveSetBasicTest.ts
  │           │   ├── fixtures/          # Compiled output + .amxd files
  │           │   │   ├── LiveSetBasicTest.js
  │           │   │   ├── LiveSetBasicTest.amxd
  │           │   │   └── alits_core_index.js
  │           │   ├── creation-guide.md
  │           │   ├── test-script.md
  │           │   ├── results/
  │           │   ├── package.json        # Workspace package
  │           │   ├── tsconfig.json       # Individual TS config
  │           │   └── maxmsp.config.json  # Individual dependency config
  │           ├── midi-utils/             # Individual test workspace
  │           │   ├── src/
  │           │   ├── fixtures/
  │           │   ├── creation-guide.md
  │           │   ├── test-script.md
  │           │   ├── results/
  │           │   ├── package.json
  │           │   ├── tsconfig.json
  │           │   └── maxmsp.config.json
  │           └── observable-helper/      # Individual test workspace
  │               └── ... (same structure)
  ├── alits-tracks/
  │   ├── src/
  │   └── tests/
  │       ├── *.test.ts
  │       └── manual/
  │           └── ...
  └── ...
```

Each manual test fixture includes:

* **Individual Workspace**: Each test is a Turborepo workspace with its own configuration
* **TypeScript Source**: A `.ts` file in the `src/` directory with test logic
* **Compiled Output**: ES5 JavaScript files in the `fixtures/` directory
* **Fixture Device**: A `.amxd` file in the `fixtures/` directory (human-created)
* **Bundled Dependencies**: Local package dependencies bundled by maxmsp-ts
* **Documentation**: Creation guides and test scripts co-located with the test
* **Results**: Test execution results stored in the `results/` directory
* **Configuration**: Individual `package.json`, `tsconfig.json`, and `maxmsp.config.json`

Both automated unit tests and manual testing fixtures are co-located within each package.

---

### TypeScript Fixture Workflow

Manual testing fixtures use Max for Live's built-in TypeScript compilation system. This allows AI to generate fully-validated TypeScript code that compiles directly in the Max environment.

#### Key Principles:

1. **Co-located Files**: Each `.amxd` device has a corresponding `.ts` file in the same directory
2. **Max TypeScript Compilation**: The `.ts` file uses Max's built-in TypeScript compiler (no external build step needed)
3. **Import Support**: Fixtures can import from the package's compiled source using standard ES modules
4. **AI Validation**: AI can validate TypeScript syntax, imports, and logic before human creates the `.amxd`

#### TypeScript Fixture Template:

```typescript
// Example: packages/alits-core/tests/manual/fixtures/LiveSetBasicTest.ts
import { LiveSet } from '@alits/core';

// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

class LiveSetBasicTest {
    private liveSet: LiveSet | null = null;

    async initialize(): Promise<void> {
        try {
            const liveApiSet = new LiveAPI('live_set');
            this.liveSet = new LiveSet(liveApiSet);
            await this.liveSet.initializeLiveSet();
            
            post('[Alits/TEST] LiveSet initialized successfully\n');
            post(`[Alits/TEST] Tempo: ${this.liveSet.getTempo()}\n`);
        } catch (error) {
            post(`[Alits/TEST] Error: ${error.message}\n`);
        }
    }

    // Test functions exposed to Max
    async testTempoChange(newTempo: number): Promise<void> {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }
        
        try {
            await this.liveSet.getLiveObject().set('tempo', newTempo);
            post(`[Alits/TEST] Tempo changed to: ${newTempo}\n`);
        } catch (error) {
            post(`[Alits/TEST] Failed to change tempo: ${error.message}\n`);
        }
    }
}

// Initialize test instance
const testApp = new LiveSetBasicTest();

// Expose functions to Max for Live
function bang() {
    testApp.initialize();
}

function test_tempo(tempo: number) {
    testApp.testTempoChange(tempo);
}

// Required for Max TypeScript compilation
let module = {};
export = {};
```

#### Compilation Pipeline (Turborepo + maxmsp-ts):

**Using Turborepo for Build Orchestration**
```bash
# Build all manual tests in parallel
turbo run build --filter="@alits/core-manual-test-*"

# Build specific test
turbo run build --filter="@alits/core-manual-test-liveset-basic"

# Build with caching
turbo run build --filter="@alits/core-manual-test-*" --cache-dir=".turbo"
```

**Individual Workspace Configuration:**
- `package.json` - Workspace package with build scripts
- `tsconfig.json` - Individual TypeScript config extending root config
- `maxmsp.config.json` - Individual dependency resolution config

**Output Structure:**
```
packages/alits-core/tests/manual/liveset-basic/
├── src/                     # TypeScript source files
│   └── LiveSetBasicTest.ts
├── fixtures/                # Compiled output + .amxd files
│   ├── LiveSetBasicTest.js  # Compiled from src/
│   ├── LiveSetBasicTest.amxd # Human-created device
│   └── alits_core_index.js  # Bundled @alits/core library
├── creation-guide.md        # Co-located documentation
├── test-script.md          # Co-located test instructions
├── results/                # Test execution results
├── package.json            # Workspace package config
├── tsconfig.json           # Individual TS config
└── maxmsp.config.json      # Individual dependency config
```

#### Human Workflow:

1. **AI generates** the TypeScript fixture file (`.ts`) with full validation, imports, and test logic
2. **AI sets up** individual Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
3. **AI compiles** TypeScript + dependencies to ES5 JavaScript bundles using Turborepo
4. **AI generates** simplified creation guide focusing only on Max device setup
5. **AI generates** test execution script with expected console output
6. **Human creates** the `.amxd` device in Ableton Live (5 minutes) following the creation guide
7. **Human runs** the test script, exports logs, and records results in the test's `results/` directory
8. **Repository history** shows evidence of manual verification alongside automated test coverage

This approach maximizes AI contribution (full TypeScript generation, validation, compilation, and dependency bundling) while minimizing human effort (simple Max device setup).

---

### Example Fixture Creation Guide

**Creation Guide: `/packages/alits-core/tests/manual/creation/liveSetBasic.md`**

```markdown
# Fixture Creation: LiveSet Basic Test

## Purpose
To create a fixture device that tests basic LiveSet functionality in Max for Live.

## Prerequisites
- AI has generated `LiveSetBasicTest.ts` in `/packages/alits-core/tests/manual/liveset-basic/src/`
- AI has set up Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
- AI has compiled `LiveSetBasicTest.js` to `/packages/alits-core/tests/manual/liveset-basic/fixtures/`
- JavaScript file is ES5 compatible for Max 8 runtime
- Dependencies bundled (e.g., `alits_core_index.js`)

## Steps
1. In Ableton Live, create a new Max MIDI Effect device
2. Add a `[js]` object to the Max device
3. Set the `[js]` object to reference `LiveSetBasicTest.js` in the fixtures directory
4. Save the device as `LiveSetBasicTest.amxd` in the fixtures directory

## Verification of Fixture Creation
- Confirm the `.amxd` loads in Ableton without JavaScript errors
- Confirm Max console shows `[Alits/TEST]` messages when device initializes
- Confirm test functions are accessible from Max (e.g., via `[button]` objects)
```

---

### Example Test Fixture

**Test Script: `/packages/alits-core/tests/manual/scripts/drumPadRename.md`**

```markdown
# Test: Drum Pad Rename

## Preconditions
- Ableton Live 11 Suite
- Max 8 installed
- A Drum Rack with at least one sample loaded
- `DrumPadRename.amxd` fixture created

## Setup
1. Create a new Live set.
2. Add a MIDI track.
3. Insert a Drum Rack and load a sample on C1.
4. Drag the `DrumPadRename.amxd` device onto the track.

## Actions
1. Press the "Rename Pads" button in the device.
2. Observe the Drum Rack pad names.

## Expected Results
- The pad on C1 should be renamed to "C1".
- Unused pads remain unchanged.

## Verification
- [ ] Pad renamed correctly
- [ ] No errors in Max console
```

**Result Log: `/packages/alits-core/tests/manual/results/drumPadRename-2025-09-09.yaml`**

```yaml
test: Drum Pad Rename
date: 2025-09-09
tester: AB
status: pass
notes: Works as expected on Live 11.3.25
```

---

### Semi-Automated Manual Testing

Manual testing can incorporate automatic components by capturing Max console output:

* **Console Logging**: Device actions should emit structured log entries with prefixes (e.g., `[Alits/TEST] Pad renamed to C1`).
* **Log Export**: Testers can copy/paste or export the console log to a `.txt` file in `/packages/*/tests/manual/artifacts/`.
* **Analysis**: Scripts can parse exported logs to confirm expected messages appear.

**Example Log-Based Verification:**

```txt
[Alits/INFO] Device loaded
[Alits/TEST] Pad C1 renamed
[Alits/TEST] Verification passed
```

A companion script in `/packages/*/tests/manual/automated/` could scan for `[Alits/TEST]` markers to automatically mark tests as pass/fail, bridging manual execution with automated validation.

---

### Recording Results

* Use **date-stamped files** for each test run.
* Store results in `/packages/*/tests/manual/results/`.
* Prefer YAML for machine-readability, Markdown for human notes.
* Require at least one log entry before merging major changes.

---

### QA-Inspired Practices

* **Traceability Matrix**: Map features → fixtures → result logs.
* **Regression Testing**: Re-run all fixtures before release.
* **Defect Logging**: If a test fails, log defect as issue referencing fixture and result file.
* **Reviewable Evidence**: Store screenshots, screencasts, or exported logs in `/packages/*/tests/manual/artifacts/`.

---

### AI Coding Workflow

1. **AI generates** the TypeScript fixture file (`.ts`) with full validation, imports, and test logic
2. **AI sets up** individual Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
3. **AI compiles** TypeScript + dependencies to ES5 JavaScript bundles using Turborepo
4. **AI generates** simplified creation guide focusing only on Max device setup
5. **AI generates** test execution script with expected console output
6. **Human creates** the `.amxd` device in Ableton Live (5 minutes) following the creation guide
7. **Human runs** the test script, exports logs, and records results in the test's `results/` directory
8. **Repository history** shows evidence of manual verification alongside automated test coverage

#### Benefits of This Workflow:
- **AI handles** all complex TypeScript generation, validation, and compilation
- **AI handles** local dependency bundling (e.g., `@alits/core` → `alits_core_index.js`)
- **AI handles** Turborepo workspace setup and build orchestration
- **Human effort** minimized to simple Max device creation
- **Type safety** maintained through AI validation of imports and syntax
- **Max compatibility** ensured through ES5 CommonJS compilation
- **Scalable** through individual test workspaces
- **Best practices** using Turborepo for monorepo build management
- **Parallel builds** and caching through Turborepo

---

### Summary

Manual testing fixtures are co-located with automated test suites within each package in the monorepo. Fixtures include `.amxd` devices, creation guides, human-readable scripts, structured results, and optional log-based artifacts. This layered approach ensures clarity, traceability, and QA discipline while also allowing semi-automated validation using exported Max logs.
