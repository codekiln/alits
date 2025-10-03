## Project Brief: Manual Testing Fixtures for Max for Live

### Purpose

While TypeScript and unit testing provide confidence in code correctness, they cannot guarantee behavior within Ableton Live's Max for Live runtime. This brief outlines a strategy for building **manual testing fixtures** that coexist alongside automated tests in the monorepo. These fixtures consist of:

1. Minimal Max for Live devices that exercise specific features.
2. Human-readable test scripts detailing setup and execution steps.
3. Systematic methods for recording test results in the repository.

The goal is to minimize the feedback loop between code changes and real-world verification inside Ableton Live.

**Related Documentation**: For detailed implementation guidance on creating Max for Live test fixtures, see [Research Brief: Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md).

---

### Principles

* **Clear Separation**: Automated unit tests and manual testing fixtures both live within each package (`/packages/*/tests/` and `/packages/*/tests/manual/` respectively).
* **Single-Bang Testing**: Each manual fixture must be completely self-contained and test all functionality with a single bang message. No additional message objects or manual intervention should be required to execute the complete test suite.
* **Rapid Setup**: Each manual fixture should be a small, focused `.amxd` device that demonstrates one feature. To begin with, these devices must be created and saved manually in Ableton Live's Max for Live UI (due to licensing restrictions), then added to the repo for use as fixtures.
* **Comprehensive Output**: Test fixtures must provide detailed, structured console output with clear pass/fail indicators for each test step, enabling AI verification without human interpretation.
* **Clarity**: Test scripts must use step-by-step instructions suitable for non-developer testers.
* **Traceability**: Every manual test run should be logged with results, dates, and tester identity.
* **Reusability**: Fixtures should be reusable across regression tests.
* **AI-Friendly**: AI can generate test scripts and placeholder fixture code, but humans must create and save `.amxd` files in Ableton Live.

---

### Fixture Structure in the Monorepo (Turborepo Workspaces)

**Note**: This section aligns with the detailed implementation guide in [Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md#file-structure-requirements).

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
  │           │   │   ├── LiveSetBasicFixture.als  # Live Set file
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
* **Live Set File**: A `.als` file in the `fixtures/` directory (human-created)
* **Bundled Dependencies**: Local package dependencies bundled by maxmsp-ts
* **Documentation**: Creation guides and test scripts co-located with the test
* **Results**: Test execution results stored in the `results/` directory
* **Configuration**: Individual `package.json`, `tsconfig.json`, and `maxmsp.config.json`

Both automated unit tests and manual testing fixtures are co-located within each package.

---

### TypeScript Fixture Workflow

Manual testing fixtures use Max for Live's built-in TypeScript compilation system. This allows AI to generate fully-validated TypeScript code that compiles directly in the Max environment.

**Implementation Details**: For comprehensive guidance on JavaScript integration, LiveAPI usage, and js object configuration, see [Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md#phase-3-javascript-integration).

#### Key Principles:

1. **Single-Bang Testing**: Each fixture must execute the complete test suite with a single bang message. No additional message objects, buttons, or manual intervention should be required.
2. **Comprehensive Output**: Test fixtures must provide detailed, structured console output with clear pass/fail indicators for each test step, enabling AI verification without human interpretation.
3. **Co-located Files**: Each `.amxd` device has a corresponding `.ts` file in the same directory
4. **Max TypeScript Compilation**: The `.ts` file uses Max's built-in TypeScript compiler (no external build step needed)
5. **Import Support**: Fixtures can import from the package's compiled source using standard ES modules
6. **AI Validation**: AI can validate TypeScript syntax, imports, and logic before human creates the `.amxd`
7. **Live Set Integration**: Each fixture includes both `.amxd` device and `.als` Live Set file

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

// SINGLE-BANG TESTING: Complete test suite runs on one bang
function bang() {
    post('[Alits/TEST] ===========================================\n');
    post('[Alits/TEST] LiveSet Basic Test Suite Starting\n');
    post('[Alits/TEST] ===========================================\n');
    
    // Run complete test suite
    runCompleteTestSuite().catch((error: any) => {
        post(`[Alits/TEST] Test suite error: ${error.message}\n`);
        post('[Alits/TEST] ===========================================\n');
        post('[Alits/TEST] Test Suite FAILED\n');
        post('[Alits/TEST] ===========================================\n');
    });
}

// ...

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
4. **AI generates** comprehensive creation guide including:
   - Ableton Live Set creation and configuration
   - Max for Live device setup and js object configuration
   - Control interface setup for test functions
   - File saving and organization instructions
5. **AI generates** test execution script with expected console output
6. **Human creates** the Live Set and `.amxd` device in Ableton Live (5 minutes) following the creation guide
7. **Human runs** the test script, exports logs, and records results in the test's `results/` directory
8. **Human reports** any test script issues back to AI for fixes (never modifies TypeScript/JavaScript files directly)
9. **Repository history** shows evidence of manual verification alongside automated test coverage

**Detailed Setup Instructions**: For step-by-step guidance on Live Set creation, Max device configuration, and js object setup, see [Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md#detailed-implementation-guide).

This approach maximizes AI contribution (full TypeScript generation, validation, compilation, dependency bundling, and comprehensive setup guides) while minimizing human effort (following detailed creation guides for Live Set and Max device setup).

---

### Example Fixture Creation Guide

**Creation Guide: `/packages/alits-core/tests/manual/liveset-basic/creation-guide.md`**

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
1. In Ableton Live, create a new Live Set and save as `LiveSetBasicFixture.als` in fixtures directory
2. Add a MIDI track to the Live Set
3. Create a new Max MIDI Effect device and drag onto the track
4. Add a `[js]` object to the Max device
5. Configure the `[js]` object with filename argument: `LiveSetBasicTest.js 1 1`
6. Save the device as `LiveSetBasicTest.amxd` in the fixtures directory

## Verification of Fixture Creation
- Confirm the `.amxd` loads in Ableton without JavaScript errors
- Confirm Max console shows `[Alits/TEST]` messages when device initializes
- Confirm test functions are accessible from Max (e.g., via `[button]` objects)
- Confirm Live Set file is properly saved and references the device

**Detailed Instructions**: For comprehensive setup guidance including js object configuration, LiveAPI integration, and troubleshooting, see [Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md#phase-2-max-for-live-device-creation).
```

---

### Example Test Fixture

**Test Script: `/packages/alits-core/tests/manual/liveset-basic/test-script.md`**

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

**Result Log: `/packages/alits-core/tests/manual/liveset-basic/results/liveset-basic-test-2025-09-09.yaml`**

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
* **Log Export**: Testers can copy/paste or export the console log to a `.txt` file in `/packages/*/tests/manual/{fixture-name}/results/`.
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
* Store results in `/packages/*/tests/manual/{fixture-name}/results/`.
* Prefer YAML for machine-readability, Markdown for human notes.
* Require at least one log entry before merging major changes.

---

### QA-Inspired Practices

* **Traceability Matrix**: Map features → fixtures → result logs.
* **Regression Testing**: Re-run all fixtures before release.
* **Defect Logging**: If a test fails, log defect as issue referencing fixture and result file.
* **Reviewable Evidence**: Store screenshots, screencasts, or exported logs in `/packages/*/tests/manual/{fixture-name}/results/`.

---

### AI Coding Workflow

1. **AI generates** the TypeScript fixture file (`.ts`) with full validation, imports, and test logic
2. **AI sets up** individual Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
3. **AI compiles** TypeScript + dependencies to ES5 JavaScript bundles using Turborepo
4. **AI generates** comprehensive creation guide including:
   - Ableton Live Set creation and configuration
   - Max for Live device setup and js object configuration
   - Control interface setup for test functions
   - File saving and organization instructions
5. **AI generates** test execution script with expected console output
6. **Human creates** the Live Set and `.amxd` device in Ableton Live (5 minutes) following the creation guide
7. **Human runs** the test script, exports logs, and records results in the test's `results/` directory
8. **Repository history** shows evidence of manual verification alongside automated test coverage

**Implementation Reference**: For detailed technical guidance on LiveAPI usage, js object configuration, and error handling, see [Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md#javascript-api-usage).

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

Manual testing fixtures are co-located with automated test suites within each package in the monorepo. Fixtures include `.amxd` devices, `.als` Live Set files, creation guides, human-readable scripts, structured results, and optional log-based artifacts. This layered approach ensures clarity, traceability, and QA discipline while also allowing semi-automated validation using exported Max logs.

**Complete Implementation Guide**: For comprehensive technical details, troubleshooting, and best practices, refer to [Research Brief: Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md).

---

## Related Documentation

### Implementation Guides
- **[Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md)** - Comprehensive technical implementation guide
- **[Foundation Core Package Setup](../stories/1.1.foundation-core-package-setup.md)** - Core package structure and setup

### Key Technical References
- **[MaxMSP 8 js Object Documentation](https://docs.cycling74.com/max8/refpages/js)** - Complete js object reference
- **[LiveAPI Reference](https://docs.cycling74.com/max8/refpages/liveapi)** - LiveAPI object documentation
- **[Max for Live Device Creation](https://docs.cycling74.com/max8/vignettes/live_creatingdevices)** - Official device creation guide

### Community Resources
- **[JavaScript in Ableton Live: The Live API](https://adammurray.link/max-for-live/js-in-live/live-api/)** - Comprehensive LiveAPI tutorial
- **[Max for Live Learning Resources](https://help.ableton.com/hc/en-us/articles/360003276080-Max-for-Live-learning-resources)** - Official learning materials
- **[Building Max Devices Pack](https://www.ableton.com/en/packs/building-max-devices/)** - Free Ableton pack with examples
