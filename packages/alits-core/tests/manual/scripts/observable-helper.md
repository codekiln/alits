# Observable Helper Test Script

## Purpose
This script tests the `observeProperty<T>()` helper functionality within the Max for Live runtime environment.

## Test Coverage
- Observable creation and basic functionality
- Subscription and value emission
- Property change notifications
- Observable operators (map, filter)
- Subscription cleanup and unsubscription
- Error handling for invalid paths

## Prerequisites
- Ableton Live with Max for Live
- `@alits/core` package built and available
- ObservableHelperTest.amxd device loaded

## Test Execution Steps

### 1. Setup
1. Open Ableton Live
2. Load the ObservableHelperTest.amxd device on any track
3. Open Max console to view test output

### 2. Expected Test Sequence
The following tests will run automatically when the device loads:

#### Test 1: Basic Observable Creation
- **Purpose**: Verify observeProperty creates valid Observable objects
- **Expected**: `[Alits/TEST] Basic Observable Creation: PASS - Observable created successfully with subscribe method`
- **Failure Indicators**: 
  - `FAIL - Observable created but missing subscribe method`
  - `FAIL - Error: [error message]`

#### Test 2: Observable Subscription and Values
- **Purpose**: Verify Observable emits initial values and supports subscription
- **Expected**: `[Alits/TEST] Observable Subscription: PASS - Received X values, initial value: [value]`
- **Failure Indicators**:
  - `FAIL - No values received from observable`
  - `FAIL - Error: [error message]`

#### Test 3: Property Change Notification
- **Purpose**: Verify Observable emits values when properties change
- **Expected**: `[Alits/TEST] Property Change Notification: PASS - Received X changes, last value: [value]`
- **Failure Indicators**:
  - `FAIL - Expected at least 2 changes, got X`
  - `FAIL - Error: [error message]`

#### Test 4: Observable Operators
- **Purpose**: Verify Observable supports map and filter operators
- **Expected**: `[Alits/TEST] Observable Operators: PASS - Map: X values, Filter: Y values`
- **Failure Indicators**:
  - `FAIL - Map: X values, Filter: Y values` (when X or Y is 0)
  - `FAIL - Error: [error message]`

#### Test 5: Subscription Cleanup
- **Purpose**: Verify subscriptions can be properly unsubscribed
- **Expected**: `[Alits/TEST] Subscription Cleanup: PASS - Subscription properly cleaned up, no values after unsubscribe`
- **Failure Indicators**:
  - `FAIL - Expected 1 value, got X after unsubscribe`
  - `FAIL - Error: [error message]`

#### Test 6: Error Handling
- **Purpose**: Verify proper error handling for invalid property paths
- **Expected**: `[Alits/TEST] Error Handling: PASS - Error properly handled for invalid path`
- **Failure Indicators**:
  - `FAIL - No error received for invalid path`
  - `FAIL - Error: [error message]`

### 3. Success Criteria
- All 6 tests show `PASS` status
- No JavaScript runtime errors
- Device loads without crashing Max for Live
- Test summary shows "All Observable helper tests passed!"

### 4. Failure Investigation
If any test fails:

1. **Check Max Console**: Look for detailed error messages and specific test failures
2. **Verify Package Build**: Ensure `@alits/core` is properly built with RxJS dependencies
3. **Check RxJS Integration**: Verify RxJS is properly installed and accessible
4. **Review Observable Implementation**: Check if observeProperty implementation matches expected behavior

### 5. Test Results Recording
Record test results in the following format:

```yaml
test_run:
  date: "2025-01-12"
  tester: "Developer Name"
  device: "ObservableHelperTest.amxd"
  environment: "Ableton Live [version], Max for Live [version]"
  
  results:
    basic_observable_creation: "PASS|FAIL|SKIP"
    observable_subscription: "PASS|FAIL|SKIP"
    property_change_notification: "PASS|FAIL|SKIP"
    observable_operators: "PASS|FAIL|SKIP"
    subscription_cleanup: "PASS|FAIL|SKIP"
    error_handling: "PASS|FAIL|SKIP"
    
  summary:
    total_tests: 6
    passed: X
    failed: Y
    skipped: Z
    
  notes: "Any additional observations or issues"
```

## Regression Testing
This test should be run:
- After any changes to Observable helper implementation
- Before major releases
- When updating Max for Live or Ableton Live versions
- When modifying RxJS integration or Observable patterns

## Known Issues
- None currently identified

## Maintenance
- Update test cases if Observable API changes
- Add new tests for additional Observable operators
- Update expected behavior if RxJS patterns change
