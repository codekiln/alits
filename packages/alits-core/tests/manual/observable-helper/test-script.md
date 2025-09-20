# Test Script: Observable Helper Functionality

## Preconditions
- Ableton Live 11 Suite with Max for Live
- Max 8 installed
- `ObservableHelperTest.amxd` fixture created and loaded

## Setup
1. Create a new Live set
2. Add a MIDI track
3. Insert the `ObservableHelperTest.amxd` device onto the track
4. Open Max console to monitor test output

## Test Execution

### Test 1: Complete Test Suite
1. Press the "Run All Tests" button in the device
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Observable Helper Test initialized`
- All test categories execute successfully
- Console shows `[Alits/TEST] Observable Helper tests completed`

### Test 2: Basic Property Observation
1. Press the "Test Basic Observation" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Successfully created volume observable`
- Console shows `[Alits/TEST] Added listener for volume`
- Console shows `[Alits/TEST] Volume changed to: 0.9`

### Test 3: Multiple Property Observation
1. Press the "Test Multiple Observation" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Successfully created multi-property observable`
- Observable should handle multiple properties (volume, tempo)

### Test 4: Error Handling
1. Press the "Test Error Handling" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Created observable for invalid object (should handle gracefully)`
- Console shows `[Alits/TEST] Expected error handled: LiveAPI object must be a valid object`
- Device should handle null/invalid objects gracefully

### Test 5: Property Change Simulation
1. Press the "Simulate Changes" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Simulating property changes...`
- Console shows `[Alits/TEST] Volume set to 0.5`
- Console shows `[Alits/TEST] Volume set to 1.0`
- Console shows `[Alits/TEST] Tempo set to 140`
- Console shows `[Alits/TEST] Tempo set to 80`

### Test 6: Cleanup Testing
1. Press the "Test Cleanup" button
2. Observe Max console output

**Expected Results:**
- Console shows `[Alits/TEST] Cleaning up X subscriptions`
- Console shows `[Alits/TEST] Unsubscribed from subscription 1`
- Console shows `[Alits/TEST] Static cleanup completed`

## Verification Checklist
- [ ] Device loads without errors
- [ ] All test functions execute successfully
- [ ] Observable creation works correctly
- [ ] Property observation functions properly
- [ ] Error handling is graceful
- [ ] Cleanup functions work correctly
- [ ] No JavaScript runtime errors
- [ ] All `[Alits/TEST]` messages appear correctly

## Edge Cases to Test
1. **Null Objects**: Test with null LiveAPI objects
2. **Invalid Properties**: Test with non-existent properties
3. **Multiple Subscriptions**: Test cleanup with multiple subscriptions
4. **Property Changes**: Test rapid property changes

## Expected Error Handling
- Device should handle invalid objects gracefully
- Console should show descriptive error messages
- Device should not crash on invalid input
- Cleanup should work even with errors

## RxJS Integration Verification
- Observable creation should work with RxJS
- Subscription management should be proper
- Cleanup should prevent memory leaks

## Test Results Recording
Record test results in `results/observable-helper-test-YYYY-MM-DD.yaml`:

```yaml
test: Observable Helper Functionality
date: YYYY-MM-DD
tester: [Your Name]
status: pass/fail
notes: |
  - Device loaded successfully
  - Observable creation working
  - Property observation functional
  - Error handling graceful
  - Cleanup functions working
console_output: |
  [Copy relevant console output here]
```
