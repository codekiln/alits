# LiveSet Basic Manual Test

## Overview
This fixture tests the core LiveSet functionality of the @alits/core package, including initialization, tempo changes, time signature modifications, and basic track/scene access. It validates that the LiveSet abstraction layer works correctly in the Max for Live runtime environment.

## Prerequisites
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- A Live set with at least one track and one scene
- @alits/core package built and available

## Quick Start
1. Follow `creation-guide.md` to create the Max for Live device
2. Follow `test-script.md` to execute tests
3. Record results in `results/` directory

## Files
- `liveset-basic.amxd` - Max for Live device file
- `LiveSetBasicTest.js` - Compiled JavaScript test implementation
- `alits_debug.js` - Debug build of @alits/core package
- `alits_production.js` - Production build of @alits/core package
- `liveset-basic.als` - Live Set file for testing

## Test Coverage
This fixture tests:
- LiveSet initialization and LiveAPI integration
- Tempo reading and modification
- Time signature reading and modification
- Track enumeration and access
- Scene enumeration and access
- Error handling for invalid operations
- Max 8 JavaScript runtime compatibility

## Expected Console Output
When tests run successfully, you should see:
```
[BUILD] Entrypoint: LiveSetBasicTest
[BUILD] Git: v1.0.0-5-g1234567
[BUILD] Timestamp: 2025-01-12T10:15:00Z
[BUILD] Source: @alits/core debug build (non-minified)
[BUILD] Max 8 Compatible: Yes
[Alits/TEST] LiveSet Basic Test initialized
[Alits/TEST] LiveSet initialized successfully
[Alits/TEST] Tempo: 120
[Alits/TEST] Time Signature: 4/4
[Alits/TEST] Tracks: 1
[Alits/TEST] Scenes: 1
```

## Troubleshooting
- **JavaScript errors**: Check that `LiveSetBasicTest.js` and `alits_debug.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **Runtime errors**: Ensure Ableton Live is running and LiveAPI is available
- **Max 8 compatibility**: Check console for build identification and compatibility messages
- **Map is not defined**: Ensure TypeScript is compiled with ES5 target and Map usage is avoided
- **Promise is not defined**: Verify Promise polyfill is included in the build
- **setTimeout is not defined**: Ensure custom Max 8 Promise polyfill is used instead of es6-promise

## Related Documentation
- [Manual Test Fixture Structure Standards](../../../../docs/manual-test-fixture-standards.md)
- [Manual Testing Fixtures Brief](../../../../docs/brief-manual-testing-fixtures.md)
- [Max for Live Test Fixture Setup](../../../../docs/brief-max-for-live-fixture-setup.md)
- [Foundation Core Package Setup](../../../../docs/stories/1.1.foundation-core-package-setup.md)
- [Max 8 JavaScript Global Methods Research](../../../../docs/brief-max8-javascript-global-methods-research.md)
