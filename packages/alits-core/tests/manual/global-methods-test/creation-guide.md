# Fixture Creation: Global Methods Test

## Purpose
To create a fixture device that tests Max 8's JavaScript global methods compatibility in Max for Live using the standardized fixture structure.

## Prerequisites
- AI has generated `GlobalMethodsTest.ts` in `src/` directory
- AI has set up Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
- AI has compiled TypeScript + dependencies to ES5 JavaScript bundles
- JavaScript files are ES5 compatible for Max 8 runtime
- Dependencies bundled (e.g., `alits_debug.js`)

## Build Process (AI Completed)
The following build process has been completed by AI:

1. **TypeScript Compilation**: `GlobalMethodsTest.ts` → `GlobalMethodsTest.js`
2. **Dependency Bundling**: `@alits/core` → `alits_debug.js`
3. **ES5 Compatibility**: All code compiled for Max 8 runtime
4. **Output Location**: All files in `fixtures/` directory

## Human Steps (5 minutes)

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "Global Methods Test"

### 2. Add JavaScript Object
1. Add a `[js]` object to the Max device
2. Set the file path to `GlobalMethodsTest.js` (reference the fixtures directory)
3. Use `@external` parameter to load from external file

### 3. Add Test Controls (Optional)
Add Max objects to trigger test functions:
- `[button]` → `[prepend bang]` → `[js]` (for all tests)
- `[button]` → `[prepend test_typeof]` → `[js]` (for typeof operator test)
- `[button]` → `[prepend test_instanceof]` → `[js]` (for instanceof operator test)
- `[button]` → `[prepend test_object_methods]` → `[js]` (for Object methods test)
- `[button]` → `[prepend test_array_methods]` → `[js]` (for Array methods test)

### 4. Save Device
1. In the Max editor, go to `File` > `Save As...`
2. Navigate to `packages/alits-core/tests/manual/global-methods-test/fixtures/`
3. Save the device as `global-methods-test.amxd`
4. Close Max editor and save the device in Ableton Live

### 5. Verify Setup
The `fixtures/` directory should contain:
- `global-methods-test.amxd` - The Max for Live device
- `GlobalMethodsTest.js` - The compiled ES5 JavaScript file
- `SimpleTypeofTest.js` - The simple typeof test file
- `alits_debug.js` - The bundled @alits/core library

## Verification Steps
1. Load the `.amxd` device in Ableton Live
2. Check Max console for `[Alits/TEST]` messages
3. Verify no JavaScript errors on device load
4. Test global methods compatibility using the controls

## Expected Console Output
When the device initializes, you should see:
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
- **Test failures**: Some tests may fail due to Max 8 limitations - this is expected and documented
