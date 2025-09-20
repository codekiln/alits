# Fixture Creation: Observable Helper Test

## Purpose
To create a fixture device that tests Observable helper functionality in Max for Live using the new Turborepo workspace approach.

## Prerequisites
- AI has generated `ObservableHelperTest.ts` in `src/` directory
- AI has set up Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
- AI has compiled TypeScript + dependencies to ES5 JavaScript bundles
- JavaScript files are ES5 compatible for Max 8 runtime
- Dependencies bundled (e.g., `alits_core_index.js`)

## Build Process (AI Completed)
The following build process has been completed by AI:

1. **TypeScript Compilation**: `ObservableHelperTest.ts` → `ObservableHelperTest.js`
2. **Dependency Bundling**: `@alits/core` → `alits_core_index.js`
3. **ES5 Compatibility**: All code compiled for Max 8 runtime
4. **Output Location**: All files in `fixtures/` directory

## Human Steps (5 minutes)

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "Observable Helper Test"

### 2. Add JavaScript Object
1. Add a `[js]` object to the Max device
2. Set the file path to `ObservableHelperTest.js` (reference the fixtures directory)
3. Use `@external` parameter to load from external file

### 3. Add Test Controls (Optional)
Add Max objects to trigger test functions:
- `[button]` → `[prepend bang]` → `[js]` (for all tests)
- `[button]` → `[prepend test_basic_observation]` → `[js]` (for basic observation)
- `[button]` → `[prepend test_multiple_observation]` → `[js]` (for multiple properties)
- `[button]` → `[prepend test_error_handling]` → `[js]` (for error handling)
- `[button]` → `[prepend simulate_changes]` → `[js]` (for property simulation)
- `[button]` → `[prepend test_cleanup]` → `[js]` (for cleanup testing)

### 4. Save Device
1. In the Max editor, go to `File` > `Save As...`
2. Navigate to `packages/alits-core/tests/manual/observable-helper/fixtures/`
3. Save the device as `ObservableHelperTest.amxd`
4. Close Max editor and save the device in Ableton Live

### 5. Verify Setup
The `fixtures/` directory should contain:
- `ObservableHelperTest.amxd` - The Max for Live device
- `ObservableHelperTest.js` - The compiled ES5 JavaScript file
- `alits_core_index.js` - The bundled @alits/core library

## Verification Steps
1. Load the `.amxd` device in Ableton Live
2. Check Max console for `[Alits/TEST]` messages
3. Verify no JavaScript errors on device load
4. Test Observable functionality using the controls

## Expected Console Output
When running tests, you should see:
```
[Alits/TEST] Observable Helper Test initialized
[Alits/TEST] Successfully created volume observable
[Alits/TEST] Added listener for volume
[Alits/TEST] Volume changed to: 0.9
[Alits/TEST] Successfully created multi-property observable
[Alits/TEST] Properties changed: {"volume":0.5,"tempo":140}
[Alits/TEST] Expected error handled: LiveAPI object must be a valid object
[Alits/TEST] Simulating property changes...
[Alits/TEST] Volume set to 0.5
[Alits/TEST] Tempo set to 140
[Alits/TEST] Cleaning up X subscriptions
[Alits/TEST] Static cleanup completed
[Alits/TEST] Observable Helper tests completed
```

## Troubleshooting
- **JavaScript errors**: Check that `ObservableHelperTest.js` and `alits_core_index.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **RxJS errors**: Ensure RxJS dependencies are properly bundled
- **Observable errors**: Check that mock LiveAPI objects are properly configured
