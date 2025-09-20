# MIDI Utilities Test Script

## Purpose
This script tests the MIDI note ↔ name conversion utilities within the Max for Live runtime environment.

## Test Coverage
- MIDI note to name conversion (noteToName)
- MIDI name to note conversion (nameToNote)
- Round-trip conversion accuracy
- Input validation functions (isValidMidiNote, isValidNoteName)
- Edge case handling and error conditions

## Prerequisites
- Ableton Live with Max for Live
- `@alits/core` package built and available
- MidiUtilsTest.amxd device loaded

## Test Execution Steps

### 1. Setup
1. Open Ableton Live
2. Load the MidiUtilsTest.amxd device on any track
3. Open Max console to view test output

### 2. Expected Test Sequence
The following tests will run automatically when the device loads:

#### Test 1: Note to Name Conversion
- **Purpose**: Verify MIDI note numbers convert to correct note names
- **Test Cases**: 
  - Note 60 → 'C4'
  - Note 69 → 'A4'
  - Note 0 → 'C-1'
  - Note 127 → 'G9'
  - Note 24 → 'C1'
  - Note 36 → 'C2'
- **Expected**: `[Alits/TEST] Note to Name: PASS - All X test cases passed`
- **Failure Indicators**: 
  - `FAIL - X test cases failed, Y passed`
  - `FAIL - Error: [error message]`

#### Test 2: Name to Note Conversion
- **Purpose**: Verify note names convert to correct MIDI note numbers
- **Test Cases**:
  - 'C4' → 60
  - 'A4' → 69
  - 'C-1' → 0
  - 'G9' → 127
  - 'C1' → 24
  - 'C2' → 36
  - 'F#4' → 66
  - 'Bb3' → 58
- **Expected**: `[Alits/TEST] Name to Note: PASS - All X test cases passed`
- **Failure Indicators**:
  - `FAIL - X test cases failed, Y passed`
  - `FAIL - Error: [error message]`

#### Test 3: Round-trip Conversion
- **Purpose**: Verify note → name → note conversion maintains accuracy
- **Test Cases**: Notes 0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 127
- **Expected**: `[Alits/TEST] Round-trip Conversion: PASS - All X round-trip conversions successful`
- **Failure Indicators**:
  - `FAIL - X round-trip conversions failed, Y successful`
  - `FAIL - Error: [error message]`

#### Test 4: Validation Functions
- **Purpose**: Verify input validation works correctly
- **isValidMidiNote Tests**:
  - Valid: 0, 60, 127 → should return true
  - Invalid: -1, 128, '60', null, undefined → should return false
- **isValidNoteName Tests**:
  - Valid: 'C4', 'A4', 'F#4', 'Bb3', 'C-1', 'G9' → should return true
  - Invalid: 'H4', 'C#b4', 'C4#', '', null, undefined → should return false
- **Expected**: `[Alits/TEST] Validation Functions: PASS - All X validation tests passed`
- **Failure Indicators**:
  - `FAIL - X validation tests failed, Y passed`
  - `FAIL - Error: [error message]`

#### Test 5: Edge Cases and Error Handling
- **Purpose**: Verify proper error handling for invalid inputs
- **Test Cases**:
  - noteToName(-1), noteToName(128) → should throw error
  - nameToNote('invalid'), nameToNote('H4') → should throw error
  - nameToNote(null), noteToName(undefined) → should throw error
- **Expected**: `[Alits/TEST] Edge Cases: PASS - All X error handling tests passed`
- **Failure Indicators**:
  - `FAIL - X error handling tests failed, Y passed`
  - `FAIL - Error: [error message]`

### 3. Success Criteria
- All 5 tests show `PASS` status
- No JavaScript runtime errors
- Device loads without crashing Max for Live
- Test summary shows "All MIDI utilities tests passed!"

### 4. Failure Investigation
If any test fails:

1. **Check Max Console**: Look for detailed error messages and specific test case failures
2. **Verify Package Build**: Ensure `@alits/core` is properly built with MIDI utilities
3. **Review Test Cases**: Check if specific note/name conversions are failing
4. **Check Implementation**: Verify MIDI utilities implementation matches expected behavior

### 5. Test Results Recording
Record test results in the following format:

```yaml
test_run:
  date: "2025-01-12"
  tester: "Developer Name"
  device: "MidiUtilsTest.amxd"
  environment: "Ableton Live [version], Max for Live [version]"
  
  results:
    note_to_name: "PASS|FAIL|SKIP"
    name_to_note: "PASS|FAIL|SKIP"
    round_trip_conversion: "PASS|FAIL|SKIP"
    validation_functions: "PASS|FAIL|SKIP"
    edge_cases: "PASS|FAIL|SKIP"
    
  summary:
    total_tests: 5
    passed: X
    failed: Y
    skipped: Z
    
  notes: "Any additional observations or issues"
```

## Regression Testing
This test should be run:
- After any changes to MIDI utilities implementation
- Before major releases
- When updating Max for Live or Ableton Live versions
- When modifying note name conventions or MIDI standards

## Known Issues
- None currently identified

## Maintenance
- Update test cases if MIDI note name conventions change
- Add new tests for additional MIDI utilities
- Update expected behavior if MIDI standards change
