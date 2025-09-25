# Fixture Creation: LiveSet Basic Test

## Purpose
To create a fixture device that tests basic LiveSet functionality in Max for Live using the new Turborepo workspace approach.

## Prerequisites
- AI has generated `LiveSetBasicTest.ts` in `src/` directory
- AI has set up Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
- AI has compiled TypeScript + dependencies to ES5 JavaScript bundles
- JavaScript files are ES5 compatible for Max 8 runtime
- Dependencies bundled (e.g., `alits_core_index.js`)

## Build Process (AI Completed)
The following build process has been completed by AI:

1. **TypeScript Compilation**: `LiveSetBasicTest.ts` → `LiveSetBasicTest.js`
2. **Dependency Bundling**: `@alits/core` → `alits_core_index.js`
3. **ES5 Compatibility**: All code compiled for Max 8 runtime
4. **Output Location**: All files in `fixtures/` directory

## Human Steps (5 minutes)

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "LiveSet Basic Test"

### 2. Add JavaScript Object
1. Add a `[js]` object to the Max device
2. Set the file path to `LiveSetBasicTest.js` (reference the fixtures directory)
3. Use `@external` parameter to load from external file

### 3. Add Test Controls (Optional)
Add Max objects to trigger test functions:
- `[button]` → `[prepend bang]` → `[js]` (for initialization)
- `[number]` → `[prepend test_tempo]` → `[js]` (for tempo testing)
- `[number]` → `[prepend test_time_signature]` → `[js]` (for time signature testing)
- `[button]` → `[prepend test_tracks]` → `[js]` (for track testing)
- `[button]` → `[prepend test_scenes]` → `[js]` (for scene testing)

### 4. Save Device
1. In the Max editor, go to `File` > `Save As...`
2. Navigate to `packages/alits-core/tests/manual/liveset-basic/fixtures/`
3. Save the device as `LiveSetBasicTest.amxd`
4. Close Max editor and save the device in Ableton Live

### 5. Verify Setup
The `fixtures/` directory should contain:
- `LiveSetBasicTest.amxd` - The Max for Live device
- `LiveSetBasicTest.js` - The compiled ES5 JavaScript file
- `alits_core_index.js` - The bundled @alits/core library

## Verification Steps
1. Load the `.amxd` device in Ableton Live
2. Check Max console for `[Alits/TEST]` messages
3. Verify no JavaScript errors on device load
4. Test basic functionality using the controls

## Expected Console Output
When the device initializes, you should see:
```
[Alits/TEST] LiveSet initialized successfully
[Alits/TEST] Tempo: 120
[Alits/TEST] Time Signature: 4/4
[Alits/TEST] Tracks: X
[Alits/TEST] Scenes: Y
```

## Troubleshooting
- **JavaScript errors**: Check that `LiveSetBasicTest.js` and `alits_core_index.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **Runtime errors**: Ensure Ableton Live is running and LiveAPI is available
