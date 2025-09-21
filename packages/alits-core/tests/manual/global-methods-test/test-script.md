# Test Script: Global Methods Compatibility

## Preconditions
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- A Live set (can be empty)
- `global-methods-test.amxd` fixture created and loaded

## Setup
1. Create a new Live set (can be empty)
2. Add a MIDI track
3. Insert the `global-methods-test.amxd` device onto the track
4. Open Max console to monitor test output

## Test Execution

### Test 1: Device Initialization
1. Press the "Initialize" button in the device
2. Observe Max console output

**Expected Results:**
- Device loads without JavaScript errors
- Console shows `[Alits/TEST] Global Methods Test initialized`
- Console shows build identification information
- Console shows Max 8 compatibility status

### Test 2: typeof Operator Test
1. Press the "Test typeof" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Testing typeof operator: available`
- Console shows test results for various data types
- No error messages related to typeof

### Test 3: instanceof Operator Test
1. Press the "Test instanceof" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Testing instanceof operator: available`
- Console shows test results for various object types
- No error messages related to instanceof

### Test 4: Object Methods Test
1. Press the "Test Object Methods" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Testing Object methods: available`
- Console shows test results for Object.keys, Object.values, etc.
- No error messages related to Object methods

### Test 5: Array Methods Test
1. Press the "Test Array Methods" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Testing Array methods: available`
- Console shows test results for Array methods
- No error messages related to Array methods

### Test 6: Complete Compatibility Test
1. Press the "Run All Tests" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows comprehensive test results
- Console shows summary of available/unavailable methods
- Console shows `[Alits/TEST] Global methods compatibility test completed`

## Verification Checklist
- [ ] Device loads without errors
- [ ] All test functions execute successfully
- [ ] Console output matches expected results
- [ ] Build identification information is displayed
- [ ] No JavaScript runtime errors
- [ ] All `[Alits/TEST]` messages appear correctly
- [ ] Compatibility test results are documented

## Error Scenarios to Test
1. **Unsupported Methods**: Some methods may not be available in Max 8
2. **Performance Issues**: Some methods may be slow or inefficient
3. **Memory Limitations**: Large object operations may fail

## Expected Error Handling
- Device should handle errors gracefully
- Console should show descriptive error messages
- Device should not crash or freeze
- Unsupported methods should be clearly identified

## Test Results Recording
Record test results in `results/global-methods-test-YYYY-MM-DD.yaml`:

```yaml
test: Global Methods Compatibility
date: YYYY-MM-DD
tester: [Your Name]
status: pass/fail
notes: |
  - Device loaded successfully
  - All tests passed
  - No errors encountered
  - [Specific compatibility findings]
console_output: |
  [Copy relevant console output here]
compatibility_summary:
  available_methods: [list of available methods]
  unavailable_methods: [list of unavailable methods]
  performance_notes: [any performance observations]
```
