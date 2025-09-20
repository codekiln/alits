# Test Script: MIDI Utils Functionality

## Preconditions
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- `MidiUtilsTest.amxd` fixture created and loaded

## Setup
1. Create a new Live set
2. Add a MIDI track
3. Insert the `MidiUtilsTest.amxd` device onto the track
4. Open Max console to monitor test output

## Test Execution

### Test 1: Complete Test Suite
1. Press the "Run All Tests" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] MIDI Utils Test initialized`
- All test categories execute successfully
- Console shows `[Alits/TEST] MIDI Utils tests completed`

### Test 2: Note Name to MIDI Conversion
1. Press the "Test Note to MIDI" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] C4 = 60, D4 = 62, E4 = 64`
- Console shows `[Alits/TEST] C#4 = 61, D#4 = 63`
- Console shows `[Alits/TEST] Db4 = 61, Eb4 = 63`
- Console shows `[Alits/TEST] C0 = 12, C8 = 108`

### Test 3: MIDI to Note Name Conversion
1. Press the "Test MIDI to Note" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] MIDI 60 = C4, 61 = C#4, 62 = D4`
- Console shows sharp note conversions
- Console shows flat note conversions
- Console shows octave range conversions

### Test 4: Note Validation
1. Press the "Test Validation" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Valid notes - C4: true, C#4: true, Db4: true`
- Console shows `[Alits/TEST] Invalid notes - H4: false, C##4: false, empty: false`

### Test 5: MIDI Range Validation
**Expected Results:**
- Console shows `[Alits/TEST] Valid MIDI - 0: true, 60: true, 127: true`
- Console shows `[Alits/TEST] Invalid MIDI - -1: false, 128: false`

### Test 6: Round-Trip Conversion
1. Press the "Test Round Trip" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Round-trip conversion test:`
- Console shows `[Alits/TEST] C4 -> 60 -> C4`
- Console shows `[Alits/TEST] C#4 -> 61 -> C#4`
- Console shows `[Alits/TEST] Db4 -> 61 -> Db4`
- All conversions should be accurate

## Verification Checklist
- [ ] Device loads without errors
- [ ] All test functions execute successfully
- [ ] Note name to MIDI conversions are accurate
- [ ] MIDI to note name conversions are accurate
- [ ] Validation functions work correctly
- [ ] Round-trip conversions maintain accuracy
- [ ] No JavaScript runtime errors
- [ ] All `[Alits/TEST]` messages appear correctly

## Edge Cases to Test
1. **Boundary Values**: Test MIDI 0, 127
2. **Octave Boundaries**: Test C0, C8
3. **Enharmonic Equivalents**: Test C#4 vs Db4
4. **Invalid Inputs**: Test invalid note names and MIDI numbers

## Expected Error Handling
- Device should handle invalid inputs gracefully
- Console should show descriptive error messages
- Device should not crash on invalid input

## Test Results Recording
Record test results in `results/midi-utils-test-YYYY-MM-DD.yaml`:

```yaml
test: MIDI Utils Functionality
date: YYYY-MM-DD
tester: [Your Name]
status: pass/fail
notes: |
  - Device loaded successfully
  - All MIDI conversions accurate
  - Validation functions working
  - Round-trip conversions successful
console_output: |
  [Copy relevant console output here]
```
