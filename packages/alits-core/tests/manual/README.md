# Manual Testing Fixtures for @alits/core

This directory contains manual testing fixtures for the `@alits/core` package. These fixtures are designed to validate functionality within the Max for Live runtime environment, complementing the automated unit tests.

**📋 Standards**: All fixtures follow the [Manual Test Fixture Structure Standards](../../../docs/manual-test-fixture-standards.md) defined in the root docs folder.

## Directory Structure

```
manual/
├── AGENTS.md                    # Agent guidelines for manual testing
├── README.md                    # This overview document
├── liveset-basic/               # LiveSet basic functionality test
│   ├── README.md               # Fixture-specific documentation
│   ├── creation-guide.md       # Step-by-step creation instructions
│   ├── test-script.md          # Detailed test execution instructions
│   ├── package.json            # Turborepo workspace configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── maxmsp.config.json      # MaxMSP build configuration
│   ├── src/                    # TypeScript source files
│   │   └── LiveSetBasicTest.ts # Main test implementation
│   ├── fixtures/               # Compiled JavaScript and device files
│   │   ├── liveset-basic.amxd  # Max for Live device file
│   │   ├── LiveSetBasicTest.js # Compiled JavaScript test
│   │   ├── alits_debug.js      # Debug build of @alits/core
│   │   ├── alits_production.js # Production build of @alits/core
│   │   └── liveset-basic.als   # Live set file
│   ├── results/                # Test execution results
│   │   └── liveset-basic-test-YYYY-MM-DD.yaml
│   └── node_modules/           # Dependencies (if any)
├── midi-utils/                 # MIDI utilities test
│   ├── README.md               # Fixture-specific documentation
│   ├── creation-guide.md       # Step-by-step creation instructions
│   ├── test-script.md          # Detailed test execution instructions
│   ├── package.json            # Turborepo workspace configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── maxmsp.config.json      # MaxMSP build configuration
│   ├── src/                    # TypeScript source files
│   │   └── MidiUtilsTest.ts    # Main test implementation
│   ├── fixtures/               # Compiled JavaScript and device files
│   │   ├── midi-utils.amxd     # Max for Live device file
│   │   ├── MidiUtilsTest.js    # Compiled JavaScript test
│   │   ├── alits_debug.js      # Debug build of @alits/core
│   │   ├── alits_production.js # Production build of @alits/core
│   │   └── midi-utils.als      # Live set file
│   ├── results/                # Test execution results
│   │   └── midi-utils-test-YYYY-MM-DD.yaml
│   └── node_modules/           # Dependencies (if any)
├── observable-helper/           # Observable helper test
│   ├── README.md               # Fixture-specific documentation
│   ├── creation-guide.md       # Step-by-step creation instructions
│   ├── test-script.md          # Detailed test execution instructions
│   ├── package.json            # Turborepo workspace configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── maxmsp.config.json      # MaxMSP build configuration
│   ├── src/                    # TypeScript source files
│   │   └── ObservableHelperTest.ts # Main test implementation
│   ├── fixtures/               # Compiled JavaScript and device files
│   │   ├── observable-helper.amxd # Max for Live device file
│   │   ├── ObservableHelperTest.js # Compiled JavaScript test
│   │   ├── alits_debug.js      # Debug build of @alits/core
│   │   ├── alits_production.js # Production build of @alits/core
│   │   └── observable-helper.als # Live set file
│   ├── results/                # Test execution results
│   │   └── observable-helper-test-YYYY-MM-DD.yaml
│   └── node_modules/           # Dependencies (if any)
└── global-methods-test/         # Global methods test
    ├── README.md               # Fixture-specific documentation
    ├── creation-guide.md       # Step-by-step creation instructions
    ├── test-script.md          # Detailed test execution instructions
    ├── package.json            # Turborepo workspace configuration
    ├── tsconfig.json           # TypeScript configuration
    ├── maxmsp.config.json      # MaxMSP build configuration
    ├── src/                    # TypeScript source files
    │   └── GlobalMethodsTest.ts # Main test implementation
    ├── fixtures/               # Compiled JavaScript and device files
    │   ├── global-methods-test.amxd # Max for Live device file
    │   ├── GlobalMethodsTest.js # Compiled JavaScript test
    │   ├── SimpleTypeofTest.js # Simple typeof test
    │   ├── alits_debug.js      # Debug build of @alits/core
    │   ├── alits_production.js # Production build of @alits/core
    │   └── global-methods-test.als # Live set file
    ├── results/                # Test execution results
    │   └── global-methods-test-YYYY-MM-DD.yaml
    └── node_modules/           # Dependencies (if any)
```

## Available Fixtures

### 1. LiveSet Basic Functionality (`liveset-basic/`)
- **Purpose**: Tests core LiveSet functionality including initialization, track access, and error handling
- **Device**: `liveset-basic.amxd`
- **Script**: `LiveSetBasicTest.js`
- **Documentation**: See `liveset-basic/README.md`

### 2. MIDI Utilities (`midi-utils/`)
- **Purpose**: Tests MIDI note ↔ name conversion utilities and validation functions
- **Device**: `midi-utils.amxd`
- **Script**: `MidiUtilsTest.js`
- **Documentation**: See `midi-utils/README.md`

### 3. Observable Helper (`observable-helper/`)
- **Purpose**: Tests `observeProperty<T>()` helper functionality and RxJS integration
- **Device**: `observable-helper.amxd`
- **Script**: `ObservableHelperTest.js`
- **Documentation**: See `observable-helper/README.md`

### 4. Global Methods Test (`global-methods-test/`)
- **Purpose**: Tests availability and behavior of JavaScript global methods in Max 8
- **Device**: `global-methods-test.amxd`
- **Script**: `GlobalMethodsTest.js`
- **Documentation**: See `global-methods-test/README.md`

## Usage Instructions

### For Testers
1. Navigate to the specific fixture directory (e.g., `liveset-basic/`)
2. Follow `creation-guide.md` to create the `.amxd` device in Ableton Live
3. Follow `test-script.md` to execute tests
4. Record results in `results/` directory

### For Developers
1. Each fixture is self-contained with its own build configuration
2. Use `maxmsp-ts` workflow for TypeScript compilation and dependency management
3. Follow the standardized structure defined in the root docs
4. Update fixture-specific documentation when functionality changes

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
