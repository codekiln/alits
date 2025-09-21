# Max 8 JavaScript Global Methods Test

## Overview

This test fixture validates the availability of common JavaScript global methods in Max 8's JavaScript environment. It addresses the specific issue where `typeof` operator might not be available, and provides comprehensive testing of other global methods.

## Problem Statement

Max for Live's JavaScript environment (JavaScript 1.8.5, ES5-based) has significant limitations compared to browser or Node.js environments. We need to systematically test which global methods are available to avoid runtime errors.

## Test Files

### 1. `SimpleTypeofTest.js`
**Purpose**: Quick test for the `typeof` operator issue
**Usage**: Load in Max for Live js object and call `runTests()`

**Tests**:
- `typeof` operator with various data types
- Alternative type checking function
- Common global methods (Object, Array, String, etc.)

### 2. `GlobalMethodsTest.js`
**Purpose**: Comprehensive test of all JavaScript global methods
**Usage**: Load in Max for Live js object and call `runAllTests()`

**Tests**:
- All JavaScript operators (`typeof`, `instanceof`, `in`, `delete`)
- Core JavaScript objects (Object, Array, String, Number, Boolean, Date, Math, JSON, RegExp, Error, Function)
- Global functions (eval, parseInt, parseFloat, isNaN, isFinite, encodeURI, decodeURI, etc.)
- DOM/browser specific methods (setTimeout, setInterval, console, window, document, navigator)
- ES6 features (Map, Set, Promise, Symbol, Proxy, Reflect, WeakMap, WeakSet)
- Module system (require, import, export, module)

## Usage Instructions

### Quick Test (typeof issue)
1. Open Ableton Live with Max for Live
2. Create a new Live set with MIDI track
3. Add Max MIDI Effect device
4. Open Max editor and load `SimpleTypeofTest.js`
5. Call `runTests()` function
6. Check console output for results

### Comprehensive Test
1. Open Ableton Live with Max for Live
2. Create a new Live set with MIDI track
3. Add Max MIDI Effect device
4. Open Max editor and load `GlobalMethodsTest.js`
5. Call `runAllTests()` function
6. Check console output for comprehensive results

## Expected Results

### Available Methods (ES5 Core)
- `typeof` operator - **SHOULD BE AVAILABLE**
- `instanceof` operator - **SHOULD BE AVAILABLE**
- `in` operator - **SHOULD BE AVAILABLE**
- `delete` operator - **SHOULD BE AVAILABLE**
- `Object`, `Array`, `String`, `Number`, `Boolean` - **SHOULD BE AVAILABLE**
- `Date`, `Math`, `JSON`, `RegExp`, `Error`, `Function` - **SHOULD BE AVAILABLE**
- `eval`, `parseInt`, `parseFloat`, `isNaN`, `isFinite` - **SHOULD BE AVAILABLE**
- `encodeURI`, `decodeURI`, `encodeURIComponent`, `decodeURIComponent` - **SHOULD BE AVAILABLE**
- `require` - **SHOULD BE AVAILABLE** (CommonJS)

### Unavailable Methods (Expected)
- `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` - **NOT AVAILABLE**
- `console`, `window`, `document`, `navigator` - **NOT AVAILABLE**
- `Map`, `Set`, `Promise`, `Symbol`, `Proxy`, `Reflect` - **NOT AVAILABLE**
- `WeakMap`, `WeakSet`, `Generator` - **NOT AVAILABLE**
- `import`, `export`, `module` - **NOT AVAILABLE**

## Troubleshooting

### If `typeof` is not available
The test includes an alternative type checking function:
```javascript
function getType(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (value instanceof Array) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof RegExp) return 'regexp';
    if (value instanceof Error) return 'error';
    if (value instanceof Function) return 'function';
    if (value instanceof Object) return 'object';
    return 'unknown';
}
```

### If other methods are unexpectedly unavailable
1. Check console output for specific error messages
2. Verify Max 8 version and JavaScript engine
3. Test with minimal examples to isolate issues
4. Document findings for compatibility solutions

## Integration with @alits/core

### Current Issue
The `LiveSetBasicTest.js` uses `typeof core_1.LiveSet` which might be failing if `typeof` is not available.

### Solution
If `typeof` is not available, we need to:
1. Implement alternative type checking
2. Update the test fixture to use compatible methods
3. Update the @alits/core package to handle Max 8 limitations

### Code Changes Required
```javascript
// Instead of:
post('[Alits/DEBUG] core_1.LiveSet type: ' + typeof core_1.LiveSet + '\n');

// Use:
function getType(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (value instanceof Array) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof RegExp) return 'regexp';
    if (value instanceof Error) return 'error';
    if (value instanceof Function) return 'function';
    if (value instanceof Object) return 'object';
    return 'unknown';
}

post('[Alits/DEBUG] core_1.LiveSet type: ' + getType(core_1.LiveSet) + '\n');
```

## Documentation

### Research Brief
See `docs/brief-max8-javascript-global-methods-research.md` for comprehensive research methodology and expected findings.

### Agent Guidelines
See `packages/alits-core/tests/manual/AGENTS.md` for agent-specific guidelines on Max 8 development.

### Human-AI Collaboration
See `docs/brief-human-ai-collaboration-manual-testing.md` for collaboration protocols.

## Success Criteria

### Test Execution
- [ ] All tests run without errors in Max 8
- [ ] Console output is clear and informative
- [ ] Results match expected findings
- [ ] Any discrepancies are documented

### Problem Resolution
- [ ] `typeof` operator issue identified and resolved
- [ ] Alternative type checking implemented if needed
- [ ] @alits/core package updated for Max 8 compatibility
- [ ] Manual test fixtures working correctly

### Documentation
- [ ] Research brief completed with findings
- [ ] Compatibility solutions documented
- [ ] Best practices established
- [ ] Integration guidelines provided

## Next Steps

1. **Execute tests** in Max 8 environment
2. **Document actual results** and compare with expected findings
3. **Implement compatibility solutions** for any missing methods
4. **Update @alits/core package** with proper Max 8 compatibility
5. **Validate integration** with existing manual test fixtures
6. **Update documentation** with accurate information

This systematic approach will ensure that we have evidence-based information about Max 8's JavaScript capabilities, rather than relying on assumptions that could lead to runtime errors.
