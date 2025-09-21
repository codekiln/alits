# Global Methods Test Manual Test

## Overview
This fixture tests Max 8's JavaScript global methods compatibility, validating which JavaScript features are available in the Max for Live runtime environment. It systematically tests various global methods, operators, and language features to establish a comprehensive compatibility baseline.

## Prerequisites
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- A Live set (can be empty)
- @alits/core package built and available

## Quick Start
1. Follow `creation-guide.md` to create the Max for Live device
2. Follow `test-script.md` to execute tests
3. Record results in `results/` directory

## Files
- `global-methods-test.amxd` - Max for Live device file
- `GlobalMethodsTest.js` - Compiled JavaScript test implementation
- `SimpleTypeofTest.js` - Simple typeof operator test
- `alits_debug.js` - Debug build of @alits/core package
- `alits_production.js` - Production build of @alits/core package
- `global-methods-test.als` - Live Set file for testing

## Test Coverage
This fixture tests:
- JavaScript global methods availability (typeof, instanceof, etc.)
- ES5 language features compatibility
- Max 8 specific limitations and workarounds
- Error handling for unsupported features
- Performance characteristics of available methods
- Alternative implementations for missing features

## Expected Console Output
When tests run successfully, you should see:
```
[BUILD] Entrypoint: GlobalMethodsTest
[BUILD] Git: v1.0.0-5-g1234567
[BUILD] Timestamp: 2025-01-12T10:15:00Z
[BUILD] Source: @alits/core debug build (non-minified)
[BUILD] Max 8 Compatible: Yes
[Alits/TEST] Global Methods Test initialized
[Alits/TEST] Testing typeof operator: available
[Alits/TEST] Testing instanceof operator: available
[Alits/TEST] Testing Object methods: available
[Alits/TEST] Global methods compatibility test completed
```

## Troubleshooting
- **JavaScript errors**: Check that `GlobalMethodsTest.js` and `alits_debug.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **Runtime errors**: Ensure Ableton Live is running and LiveAPI is available
- **Max 8 compatibility**: Check console for build identification and compatibility messages
- **Unsupported methods**: This test is designed to identify unsupported methods - failures are expected and documented

## Related Documentation
- [Manual Test Fixture Structure Standards](../../../../docs/manual-test-fixture-standards.md)
- [Manual Testing Fixtures Brief](../../../../docs/brief-manual-testing-fixtures.md)
- [Max 8 JavaScript Global Methods Research](../../../../docs/brief-max8-javascript-global-methods-research.md)
- [Max for Live Test Fixture Setup](../../../../docs/brief-max-for-live-fixture-setup.md)
- [Foundation Core Package Setup](../../../../docs/stories/1.1.foundation-core-package-setup.md)