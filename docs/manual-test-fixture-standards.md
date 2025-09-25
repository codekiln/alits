# Manual Test Fixture Structure Standards

## Overview

This document defines the standardized structure for all manual test fixtures across the entire Alits project. All fixtures in any package (`@alits/core`, `@alits/tracks`, `@alits/scenes`, etc.) must follow this structure to ensure consistency, maintainability, and effective human-AI collaboration.

**Canonical Reference**: This is the authoritative document for manual test fixture standards. All packages should reference this document rather than maintaining their own copies.

## Directory Structure

Every manual test fixture must follow this exact directory structure (aligned with the Manual Testing Fixtures Brief):

```
packages/{package-name}/tests/manual/
├── AGENTS.md                           # Agent guidelines for manual testing (references root docs)
├── README.md                           # Overview of all fixtures for this package
├── {fixture-name}/                     # Individual fixture directory (lowercase, hyphenated)
│   ├── README.md                       # Fixture-specific documentation (REQUIRED per brief)
│   ├── creation-guide.md               # Step-by-step creation instructions
│   ├── test-script.md                  # Detailed test execution instructions
│   ├── package.json                    # Turborepo workspace configuration
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── maxmsp.config.json              # MaxMSP build configuration
│   ├── src/                            # TypeScript source files
│   │   └── {FixtureName}Test.ts        # Main test implementation
│   ├── fixtures/                       # Compiled JavaScript and device files
│   │   ├── {fixture-name}.amxd         # Max for Live device file (lowercase, hyphenated)
│   │   ├── {FixtureName}Test.js        # Compiled JavaScript test
│   │   ├── {package-name}_debug.js     # Debug build of @alits/{package-name}
│   │   ├── {package-name}_production.js # Production build of @alits/{package-name}
│   │   ├── {fixture-name}.als          # Live set file (per brief requirements)
│   │   └── {fixture-name}-project/     # Additional project files (optional)
│   │       ├── Icon                    # Project icon
│   │       └── Ableton Project Info/   # Project metadata
│   ├── results/                        # Test execution results
│   │   └── {fixture-name}-test-YYYY-MM-DD.yaml
│   └── node_modules/                    # Dependencies (if any)
└── {additional-fixture}/               # Additional fixtures as needed
    ├── README.md                       # Fixture-specific documentation
    ├── creation-guide.md               # Step-by-step creation instructions
    ├── test-script.md                  # Detailed test execution instructions
    ├── package.json                    # Turborepo workspace configuration
    ├── tsconfig.json                   # TypeScript configuration
    ├── maxmsp.config.json              # MaxMSP build configuration
    ├── src/                            # TypeScript source files
    │   └── GlobalMethodsTest.ts        # Main test implementation
    ├── fixtures/                       # Compiled JavaScript and device files
    │   ├── global-methods-test.amxd    # Max for Live device file
    │   ├── GlobalMethodsTest.js        # Compiled JavaScript test
    │   ├── SimpleTypeofTest.js         # Simple typeof test
    │   ├── alits_debug.js              # Debug build of @alits/core
    │   ├── alits_production.js         # Production build of @alits/core
    │   └── global-methods-test.als     # Live set file
    ├── results/                        # Test execution results
    │   └── global-methods-test-YYYY-MM-DD.yaml
    └── node_modules/                    # Dependencies (if any)
```

**Note**: This structure aligns with the Manual Testing Fixtures Brief requirements for:
- Individual Turborepo workspaces
- Co-located documentation
- Live Set file integration (`.als` files)
- Structured results recording
- AI-friendly workflow support

## File Naming Conventions

### Directory Names
- **Fixture directories**: `{feature-name}` (lowercase, hyphenated)
- **Source directories**: `src` (always lowercase)
- **Fixture directories**: `fixtures` (always lowercase)
- **Results directories**: `results` (always lowercase)

### File Names
- **TypeScript files**: `{FixtureName}Test.ts` (PascalCase)
- **JavaScript files**: `{FixtureName}Test.js` (PascalCase)
- **Device files**: `{fixture-name}.amxd` (lowercase, hyphenated)
- **Live sets**: `{fixture-name}.als` (lowercase, hyphenated)
- **Results**: `{fixture-name}-test-YYYY-MM-DD.yaml` (lowercase, hyphenated)

### Examples
- **Fixture**: `liveset-basic`
- **TypeScript**: `LiveSetBasicTest.ts`
- **JavaScript**: `LiveSetBasicTest.js`
- **Device**: `liveset-basic.amxd`
- **Live Set**: `liveset-basic.als`

## Required Files

### 1. README.md (Fixture Level) - REQUIRED per Brief
Every fixture must have a README.md with this structure (this is explicitly required by the Manual Testing Fixtures Brief):

```markdown
# {Fixture Name} Manual Test

## Overview
Brief description of what this fixture tests and its purpose within the @alits/core package.

## Prerequisites
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- [Specific dependencies or setup requirements]
- [Any required Live Set configuration]

## Quick Start
1. Follow `creation-guide.md` to create the Max for Live device
2. Follow `test-script.md` to execute tests
3. Record results in `results/` directory

## Files
- `{fixture-name}.amxd` - Max for Live device file
- `{FixtureName}Test.js` - Compiled JavaScript test implementation
- `alits_debug.js` - Debug build of @alits/core package
- `alits_production.js` - Production build of @alits/core package
- `{fixture-name}.als` - Live Set file for testing

## Test Coverage
This fixture tests:
- [Specific functionality 1]
- [Specific functionality 2]
- [Error scenarios and edge cases]

## Expected Console Output
When tests run successfully, you should see:
```
[BUILD] Entrypoint: {FixtureName}Test
[BUILD] Git: v1.0.0-5-g1234567
[BUILD] Timestamp: 2025-01-12T10:15:00Z
[BUILD] Source: @alits/core debug build (non-minified)
[BUILD] Max 8 Compatible: Yes
[Alits/TEST] {Fixture Name} initialized successfully
[Alits/TEST] [Specific test output]
```

## Troubleshooting
- **JavaScript errors**: Check that `{FixtureName}Test.js` and `alits_debug.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **Runtime errors**: Ensure Ableton Live is running and LiveAPI is available
- **Max 8 compatibility**: Check console for build identification and compatibility messages

## Related Documentation
- [Manual Testing Fixtures Brief](../brief-manual-testing-fixtures.md)
- [Max for Live Test Fixture Setup](../brief-max-for-live-fixture-setup.md)
- [Foundation Core Package Setup](../stories/1.1.foundation-core-package-setup.md)
```

### 2. creation-guide.md
Every fixture must have a creation guide with this structure:

```markdown
# Fixture Creation: {Fixture Name}

## Purpose
Clear statement of what this fixture tests.

## Prerequisites
- AI has generated `{FixtureName}Test.ts` in `src/` directory
- AI has set up Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
- AI has compiled TypeScript + dependencies to ES5 JavaScript bundles
- JavaScript files are ES5 compatible for Max 8 runtime
- Dependencies bundled (e.g., `alits_debug.js`)

## Build Process (AI Completed)
The following build process has been completed by AI:

1. **TypeScript Compilation**: `{FixtureName}Test.ts` → `{FixtureName}Test.js`
2. **Dependency Bundling**: `@alits/core` → `alits_debug.js`
3. **ES5 Compatibility**: All code compiled for Max 8 runtime
4. **Output Location**: All files in `fixtures/` directory

## Human Steps (5 minutes)

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "{Fixture Name}"

### 2. Add JavaScript Object
1. Add a `[js]` object to the Max device
2. Set the file path to `{FixtureName}Test.js` (reference the fixtures directory)
3. Use `@external` parameter to load from external file

### 3. Add Test Controls (Optional)
Add Max objects to trigger test functions:
- `[button]` → `[prepend bang]` → `[js]` (for initialization)
- [Additional controls specific to fixture]

### 4. Save Device
1. In the Max editor, go to `File` > `Save As...`
2. Navigate to `packages/alits-core/tests/manual/{fixture-name}/fixtures/`
3. Save the device as `{fixture-name}.amxd`
4. Close Max editor and save the device in Ableton Live

### 5. Verify Setup
The `fixtures/` directory should contain:
- `{fixture-name}.amxd` - The Max for Live device
- `{FixtureName}Test.js` - The compiled ES5 JavaScript file
- `alits_debug.js` - The bundled @alits/core library

## Verification Steps
1. Load the `.amxd` device in Ableton Live
2. Check Max console for `[Alits/TEST]` messages
3. Verify no JavaScript errors on device load
4. Test basic functionality using the controls

## Expected Console Output
When the device initializes, you should see:
```
[Alits/TEST] {Fixture Name} initialized successfully
[Alits/TEST] [Specific test output]
```

## Troubleshooting
- **JavaScript errors**: Check that `{FixtureName}Test.js` and `alits_debug.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **Runtime errors**: Ensure Ableton Live is running and LiveAPI is available
```

### 3. test-script.md
Every fixture must have a test script with this structure:

```markdown
# Test Script: {Fixture Name}

## Preconditions
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- [Specific preconditions for this fixture]
- `{fixture-name}.amxd` fixture created and loaded

## Setup
1. [Specific setup steps]
2. Add a MIDI track
3. Insert the `{fixture-name}.amxd` device onto the track
4. Open Max console to monitor test output

## Test Execution

### Test 1: [Test Name]
1. [Specific test steps]
2. Observe Max console output

**Expected Results:**
- [Specific expected outcomes]
- Console shows `[Alits/TEST] [specific message]`
- [Additional verification steps]

### Test 2: [Test Name]
[Continue pattern for all tests]

## Verification Checklist
- [ ] Device loads without errors
- [ ] All test functions execute successfully
- [ ] Console output matches expected results
- [ ] [Specific verification steps]
- [ ] No JavaScript runtime errors
- [ ] All `[Alits/TEST]` messages appear correctly

## Error Scenarios to Test
1. **[Error Scenario 1]**: [Description]
2. **[Error Scenario 2]**: [Description]

## Expected Error Handling
- Device should handle errors gracefully
- Console should show descriptive error messages
- Device should not crash or freeze

## Test Results Recording
Record test results in `results/{fixture-name}-test-YYYY-MM-DD.yaml`:

```yaml
test: {Fixture Name}
date: YYYY-MM-DD
tester: [Your Name]
status: pass/fail
notes: |
  - [Specific observations]
console_output: |
  [Copy relevant console output here]
```
```

### 4. package.json
Every fixture must have a package.json with this structure:

```json
{
  "name": "@alits/core-test-{fixture-name}",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "maxmsp build",
    "dev": "maxmsp dev",
    "test": "maxmsp test"
  },
  "dependencies": {
    "@alits/core": "workspace:*"
  },
  "devDependencies": {
    "@maxmsp/typescript": "workspace:*",
    "typescript": "workspace:*"
  }
}
```

### 5. tsconfig.json
Every fixture must have a tsconfig.json with this structure:

```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "es2015.promise"],
    "module": "commonjs",
    "outDir": "./fixtures",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "fixtures", "results"]
}
```

### 6. maxmsp.config.json
Every fixture must have a maxmsp.config.json with this structure:

```json
{
  "entry": "src/{FixtureName}Test.ts",
  "output": "fixtures/{FixtureName}Test.js",
  "bundles": {
    "@alits/core": "fixtures/alits_debug.js"
  },
  "target": "max8",
  "format": "cjs"
}
```

## Results Storage and Regression Tracking

### Canonical Results Location
Each manual test fixture stores its results in its own `results/` directory:
- **Location**: `packages/{package-name}/tests/manual/{fixture-name}/results/`
- **Format**: `{fixture-name}-test-YYYY-MM-DD.yaml`
- **Purpose**: Track test execution history and enable regression analysis

### Regression Tracking Strategy
Git history in individual fixture `results/` directories provides:
- **Last Working State**: Find the most recent successful test run
- **Regression Detection**: Compare current results with historical passes
- **Component History**: Track when specific functionality last worked
- **Debugging Context**: Understand what changed between working and broken states

### Results File Format
```yaml
test: {Fixture Name} Functionality
date: YYYY-MM-DD
tester: [Tester Name]
environment: "Ableton Live [version], Max for Live [version]"
status: pass/fail/skip
notes: |
  - Device loaded successfully
  - All tests passed
  - No errors encountered
console_output: |
  [Copy relevant console output here]
git_commit: [commit hash when test was run]
build_info: |
  [BUILD] Entrypoint: {FixtureName}Test
  [BUILD] Git: v1.0.0-5-g1234567
  [BUILD] Timestamp: 2025-01-12T10:15:00Z
```

### Git History Commands for Regression Analysis
```bash
# Find last successful test run
git log --oneline packages/alits-core/tests/manual/liveset-basic/results/

# Find when a specific test last passed
git log --grep="status: pass" packages/alits-core/tests/manual/liveset-basic/results/

# Compare results between commits
git diff HEAD~1 packages/alits-core/tests/manual/liveset-basic/results/
```

## TypeScript Test Implementation Standards

### File Structure
Every test file must follow this structure:

```typescript
// {Fixture Name} Test - Max 8 Compatible
// This test validates {specific functionality} in Max for Live

// Build identification system
function printBuildInfo() {
    post('[BUILD] Entrypoint: {FixtureName}Test\n');
    post('[BUILD] Git: ' + getGitInfo() + '\n');
    post('[BUILD] Timestamp: ' + new Date().toISOString() + '\n');
    post('[BUILD] Source: @alits/core debug build (non-minified)\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
}

function getGitInfo() {
    // This would be replaced during build process
    return 'v1.0.0-5-g1234567';
}

// Import the @alits/core package
var core_1 = require("alits_debug.js");

// Debug: Check what core_1 contains
post('[Alits/DEBUG] core_1 keys: ' + Object.keys(core_1).join(', ') + '\n');
post('[Alits/DEBUG] core_1.{MainClass} type: ' + typeof core_1.{MainClass} + '\n');

// Max for Live script setup
function bang() {
    printBuildInfo();
    post('[Alits/TEST] {Fixture Name} Test initialized\n');
    
    try {
        // Test implementation
        test{MainFunction}();
    } catch (error) {
        post('[Alits/TEST] Error: ' + error.message + '\n');
    }
}

function test{MainFunction}() {
    post('[Alits/TEST] Testing {main functionality}\n');
    
    try {
        // Test implementation
        var result = core_1.{MainClass}.{method}();
        post('[Alits/TEST] {Main functionality} test passed: ' + result + '\n');
    } catch (error) {
        post('[Alits/TEST] {Main functionality} test failed: ' + error.message + '\n');
    }
}

// Additional test functions
function test{AdditionalFunction}() {
    // Implementation
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bang: bang,
        test{MainFunction}: test{MainFunction},
        test{AdditionalFunction}: test{AdditionalFunction}
    };
}
```

### Console Output Standards
All console output must follow these standards:

#### Message Prefixes
- `[BUILD]` - Build identification information
- `[Alits/DEBUG]` - Debug information
- `[Alits/TEST]` - Test execution information
- `[Alits/ERROR]` - Error information

#### Message Format
- **Success**: `[Alits/TEST] {Test Name} test passed: {result}`
- **Failure**: `[Alits/TEST] {Test Name} test failed: {error message}`
- **Info**: `[Alits/TEST] {Test Name} initialized`
- **Debug**: `[Alits/DEBUG] {Debug information}`

## Build Process Standards

**Note**: The Manual Testing Fixtures Brief mentions `maxmsp-ts` as the build tool, but our current implementation uses Rollup. Both approaches are valid, but we should document our choice and ensure consistency.

### Current Build Approach (Rollup-based)
Our current implementation uses Rollup for bundling, which provides:
- Better tree-shaking and optimization
- More flexible configuration
- Better integration with our existing build pipeline
- Support for multiple output formats (debug/production)

### AI Responsibilities
1. **Generate TypeScript test file** in `src/` directory
2. **Set up Turborepo workspace** with package.json, tsconfig.json, maxmsp.config.json
3. **Configure Rollup build** to compile TypeScript to ES5 JavaScript bundles
4. **Bundle dependencies** (@alits/core) to `alits_debug.js` and `alits_production.js`
5. **Ensure Max 8 compatibility** (no ES6 features, proper polyfills)
6. **Generate build identification** with git hash and timestamp

### Human Responsibilities
1. **Create Max for Live device** following creation-guide.md
2. **Load JavaScript file** into js object
3. **Add test controls** (buttons, inputs) as needed
4. **Save device** as .amxd file
5. **Execute tests** following test-script.md
6. **Record results** in results/ directory

## Quality Standards

### Code Quality
- **TypeScript**: Strict mode enabled, proper typing
- **ES5 Compatibility**: No ES6 features, proper polyfills
- **Error Handling**: Comprehensive try-catch blocks
- **Console Output**: Clear, informative messages
- **Build Identification**: Every test includes version info

### Documentation Quality
- **Clear Instructions**: Step-by-step guides
- **Expected Results**: Specific console output examples
- **Troubleshooting**: Common issues and solutions
- **Examples**: Code samples and usage patterns

### Testing Quality
- **Comprehensive Coverage**: All functionality tested
- **Error Scenarios**: Edge cases and error conditions
- **Verification**: Clear success/failure criteria
- **Results Recording**: Structured YAML format

## Integration Standards

### With @alits/core Package
- **Use production builds** from `dist/` directory
- **Include debug builds** for testing
- **Proper imports** using CommonJS require()
- **Version compatibility** with package dependencies

### With Max for Live
- **ES5 compatibility** for Max 8 runtime
- **Proper polyfills** for missing features
- **Console output** using post() function
- **Error handling** for Max 8 limitations

### With Development Workflow
- **Git integration** with proper commit messages
- **Build identification** with git hash and timestamp
- **Results tracking** with structured documentation
- **Agent collaboration** following established protocols

## Maintenance Standards

### Regular Updates
- **Update fixtures** when core functionality changes
- **Review test scripts** for accuracy and completeness
- **Update documentation** with new findings
- **Archive old results** for historical reference

### Quality Assurance
- **Test all fixtures** before major releases
- **Validate console output** matches expected results
- **Check error handling** for edge cases
- **Verify Max 8 compatibility** across all fixtures

## Conclusion

These standards ensure that all manual test fixtures:
1. **Follow consistent structure** for easy navigation
2. **Provide clear documentation** for human testers
3. **Support effective AI collaboration** with systematic approaches
4. **Maintain quality** through standardized processes
5. **Enable scalability** for future fixture development

By following these standards, we can build reliable, maintainable manual test fixtures that effectively validate @alits/core functionality in Max for Live environments.
