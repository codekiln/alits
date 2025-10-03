# Test Script: LiveSet Basic Functionality

## Preconditions
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- A Live set with at least one track and one scene
- `LiveSetBasicTest.amxd` fixture created and loaded

## Setup
1. Create a new Live set
2. Add a MIDI track
3. Insert the `LiveSetBasicTest.amxd` device onto the track
4. Open Max console to monitor test output

## Test Execution

### Test 1: Device Initialization
1. Press the "Initialize" button in the device
2. Observe Max console output

**Expected Results:**
- Device loads without JavaScript errors
- Console shows `[Alits/TEST] LiveSet initialized successfully`
- Console shows current tempo, time signature, tracks, and scenes count

### Test 2: Tempo Change
1. Set a tempo value in the tempo control (e.g., 140)
2. Press the "Test Tempo" button
3. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Tempo changed to: 140`
- Live set tempo actually changes to 140 BPM
- No error messages

### Test 3: Time Signature Change
1. Set numerator to 3 and denominator to 4 in the time signature controls
2. Press the "Test Time Signature" button
3. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Time signature changed to: 3/4`
- Live set time signature actually changes to 3/4
- No error messages

### Test 4: Track Access
1. Press the "Test Tracks" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Found X tracks`
- Console shows `[Alits/TEST] First track: [track name]`
- No error messages

### Test 5: Scene Access
1. Press the "Test Scenes" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Found X scenes`
- Console shows `[Alits/TEST] First scene: [scene name]`
- No error messages

## Verification Checklist
- [ ] Device loads without errors
- [ ] All test functions execute successfully
- [ ] Console output matches expected results
- [ ] Live set properties actually change when tested
- [ ] No JavaScript runtime errors
- [ ] All `[Alits/TEST]` messages appear correctly

## Error Scenarios to Test
1. **No Live Set**: Test with no Live set open
2. **Empty Live Set**: Test with empty Live set (no tracks/scenes)
3. **Invalid Values**: Test with extreme tempo values (0.1, 300)

## Expected Error Handling
- Device should handle errors gracefully
- Console should show descriptive error messages
- Device should not crash or freeze

## Test Results Recording
Record test results in `results/liveset-basic-test-YYYY-MM-DD.yaml`:

```yaml
test: LiveSet Basic Functionality
date: YYYY-MM-DD
tester: [Your Name]
status: pass/fail
notes: |
  - Device loaded successfully
  - All tests passed
  - No errors encountered
console_output: |
  [Copy relevant console output here]
```
