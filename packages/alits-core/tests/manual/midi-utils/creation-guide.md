# Fixture Creation: MIDI Utils Test

## Purpose
To create a fixture device that tests MIDI utilities functionality in Max for Live using the new Turborepo workspace approach.

## Prerequisites
- AI has generated `MidiUtilsTest.ts` in `src/` directory
- AI has set up Turborepo workspace with package.json, tsconfig.json, and maxmsp.config.json
- AI has compiled TypeScript + dependencies to ES5 JavaScript bundles
- JavaScript files are ES5 compatible for Max 8 runtime
- Dependencies bundled (e.g., `alits_core_index.js`)

## Build Process (AI Completed)
The following build process has been completed by AI:

1. **TypeScript Compilation**: `MidiUtilsTest.ts` → `MidiUtilsTest.js`
2. **Dependency Bundling**: `@alits/core` → `alits_core_index.js`
3. **ES5 Compatibility**: All code compiled for Max 8 runtime
4. **Output Location**: All files in `fixtures/` directory

## Human Steps (5 minutes)

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "MIDI Utils Test"

### 2. Add JavaScript Object
1. Add a `[js]` object to the Max device
2. Set the file path to `MidiUtilsTest.js` (reference the fixtures directory)
3. Use `@external` parameter to load from external file

### 3. Add Test Controls (Optional)
Add Max objects to trigger test functions:
- `[button]` → `[prepend bang]` → `[js]` (for all tests)
- `[button]` → `[prepend test_note_to_midi]` → `[js]` (for note name to MIDI)
- `[button]` → `[prepend test_midi_to_note]` → `[js]` (for MIDI to note name)
- `[button]` → `[prepend test_validation]` → `[js]` (for validation tests)
- `[button]` → `[prepend test_round_trip]` → `[js]` (for round-trip conversion)

### 4. Save Device
1. In the Max editor, go to `File` > `Save As...`
2. Navigate to `packages/alits-core/tests/manual/midi-utils/fixtures/`
3. Save the device as `MidiUtilsTest.amxd`
4. Close Max editor and save the device in Ableton Live

### 5. Verify Setup
The `fixtures/` directory should contain:
- `MidiUtilsTest.amxd` - The Max for Live device
- `MidiUtilsTest.js` - The compiled ES5 JavaScript file
- `alits_core_index.js` - The bundled @alits/core library

## Verification Steps
1. Load the `.amxd` device in Ableton Live
2. Check Max console for `[Alits/TEST]` messages
3. Verify no JavaScript errors on device load
4. Test MIDI conversion functionality using the controls

## Expected Console Output
When running tests, you should see:
```
[Alits/TEST] MIDI Utils Test initialized
[Alits/TEST] C4 = 60, D4 = 62, E4 = 64
[Alits/TEST] C#4 = 61, D#4 = 63
[Alits/TEST] Db4 = 61, Eb4 = 63
[Alits/TEST] MIDI 60 = C4, 61 = C#4, 62 = D4
[Alits/TEST] Valid notes - C4: true, C#4: true, Db4: true
[Alits/TEST] Invalid notes - H4: false, C##4: false, empty: false
[Alits/TEST] Round-trip conversion test:
[Alits/TEST] C4 -> 60 -> C4
[Alits/TEST] C#4 -> 61 -> C#4
[Alits/TEST] MIDI Utils tests completed
```

## Troubleshooting
- **JavaScript errors**: Check that `MidiUtilsTest.js` and `alits_core_index.js` are in the same directory
- **Import errors**: Verify the bundled dependencies are properly generated
- **Conversion errors**: Ensure MIDI utilities are properly imported and accessible
