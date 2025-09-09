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

### Fixture Structure in the Monorepo

```
/packages
  ├── alits-core/
  │   ├── src/                # Source TypeScript files
  │   └── tests/              # All tests for this package
  │       ├── *.test.ts       # Automated unit tests
  │       └── manual/         # Manual testing fixtures
  │           ├── fixtures/   # .amxd files created in Ableton Live
  │           ├── scripts/    # Human-readable test scripts (.md)
  │           ├── creation/   # Step-by-step creation guides (.md)
  │           ├── results/    # Recorded test results (.yaml/.md)
  │           └── artifacts/  # Screenshots, screencasts, log exports
  ├── alits-tracks/
  │   ├── src/
  │   └── tests/
  │       ├── *.test.ts
  │       └── manual/
  │           └── ...
  └── ...
```

Each manual test fixture includes:

* **Fixture Device**: A `.amxd` file in `/packages/*/tests/manual/fixtures/`.
* **Test Script**: Markdown file in `/packages/*/tests/manual/scripts/`.
* **Creation Guide**: Markdown file in `/packages/*/tests/manual/creation/` with exact steps for first-time fixture creation.
* **Result Log**: YAML or Markdown file in `/packages/*/tests/manual/results/`.
* **Optional Artifacts**: Screenshots, screencasts, or exported logs in `/packages/*/tests/manual/artifacts/`.

Both automated unit tests and manual testing fixtures are co-located within each package.

---

### Example Fixture Creation Guide

**Creation Guide: `/packages/alits-core/tests/manual/creation/drumPadRename.md`**

```markdown
# Fixture Creation: Drum Pad Rename

## Purpose
To create a fixture device that renames Drum Rack pads to their MIDI note names.

## Steps
1. In Ableton Live, create a new Max MIDI Effect device.
2. Add a `js` object and point it to a new file `drumPadRename.js`.
3. Paste the generated code from `@alits/examples/drumPadRename`.
4. Save the device as `DrumPadRename.amxd` inside the repo at `/packages/alits-core/tests/manual/fixtures/`.

## Verification of Fixture Creation
- Confirm the `.amxd` loads in Ableton without errors.
- Confirm pressing the button inside the device executes the script.
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

1. AI generates feature code, fixture creation guide, and test script scaffolding.
2. Human tester creates the `.amxd` fixture in Ableton Live following the creation guide and saves it in `/packages/*/tests/manual/fixtures/`.
3. Tester runs the test script, exports logs, and records results in `/packages/*/tests/manual/results/`.
4. Repository history shows evidence of manual verification alongside automated test coverage.

---

### Summary

Manual testing fixtures are co-located with automated test suites within each package in the monorepo. Fixtures include `.amxd` devices, creation guides, human-readable scripts, structured results, and optional log-based artifacts. This layered approach ensures clarity, traceability, and QA discipline while also allowing semi-automated validation using exported Max logs.
