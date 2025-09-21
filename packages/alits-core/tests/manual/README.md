# Manual Testing Fixtures for @alits/core

This directory contains manual testing fixtures for the `@alits/core` package. These fixtures are designed to validate functionality within the Max for Live runtime environment, complementing the automated unit tests.

**📋 Standards**: All fixtures follow the [Manual Test Fixture Structure Standards](../../../docs/manual-test-fixture-standards.md) defined in the root docs folder.

## Directory Structure

```
manual/
├── fixtures/           # .amxd device files (created in Ableton Live)
├── scripts/            # Human-readable test scripts (.md)
├── creation/           # Step-by-step creation guides (.md)
├── results/            # Recorded test results (.yaml/.md)
└── artifacts/          # Screenshots, screencasts, log exports
```

## Available Fixtures

### 1. LiveSet Basic Functionality
- **Device**: `LiveSetBasicTest.amxd`
- **Script**: `liveset-basic.js`
- **Creation Guide**: `creation/liveset-basic.md`
- **Test Script**: `scripts/liveset-basic.md`
- **Purpose**: Tests core LiveSet functionality including initialization, track access, and error handling

### 2. MIDI Utilities
- **Device**: `MidiUtilsTest.amxd`
- **Script**: `midi-utils-test.js`
- **Creation Guide**: `creation/midi-utils.md`
- **Test Script**: `scripts/midi-utils.md`
- **Purpose**: Tests MIDI note ↔ name conversion utilities and validation functions

### 3. Observable Helper
- **Device**: `ObservableHelperTest.amxd`
- **Script**: `observable-helper-test.js`
- **Creation Guide**: `creation/observable-helper.md`
- **Test Script**: `scripts/observable-helper.md`
- **Purpose**: Tests `observeProperty<T>()` helper functionality and RxJS integration

## Usage Instructions

### For Testers
1. Follow the creation guides in `creation/` to create `.amxd` devices in Ableton Live
2. Load the devices and follow the test scripts in `scripts/`
3. Record results in `results/` directory
4. Save any artifacts (screenshots, logs) in `artifacts/`

### For Developers
1. Use the creation guides to understand how fixtures are built
2. Modify test scripts when functionality changes
3. Update creation guides if device structure changes
4. Review test results to identify runtime issues

## Test Execution

Each fixture includes:
- **Automated Test Execution**: Tests run automatically when device loads
- **Console Logging**: All test results logged to Max console with `[Alits/TEST]` prefix
- **Pass/Fail Status**: Clear indication of test success or failure
- **Detailed Error Messages**: Specific error information for debugging

## Result Recording

Test results should be recorded in YAML format:

```yaml
test_run:
  date: "YYYY-MM-DD"
  tester: "Tester Name"
  device: "DeviceName.amxd"
  environment: "Ableton Live [version], Max for Live [version]"
  
  results:
    test_name: "PASS|FAIL|SKIP"
    
  summary:
    total_tests: X
    passed: Y
    failed: Z
    skipped: W
    
  notes: "Additional observations"
```

## Maintenance

- Update fixtures when core functionality changes
- Add new fixtures for new features
- Review and update test scripts regularly
- Archive old test results for historical reference

## Integration with CI/CD

While these are manual tests, they can be integrated into development workflows:
- Run fixtures before major releases
- Use fixtures for regression testing
- Include fixture validation in code review process
- Document fixture results in release notes
