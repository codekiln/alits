# LiveSet Basic Functionality Test Script

## Purpose
This script tests the core LiveSet functionality within the Max for Live runtime environment.

## Test Coverage
- LiveSet initialization and creation
- Track enumeration and access
- Error handling for invalid operations
- TypeScript interface compliance
- Async/await pattern validation

## Prerequisites
- Ableton Live with Max for Live
- `@alits/core` package built and available
- LiveSetBasicTest.amxd device loaded

## Test Execution Steps

### 1. Setup
1. Open Ableton Live
2. Create a new Live set with at least 2 tracks
3. Load the LiveSetBasicTest.amxd device on any track
4. Open Max console to view test output

### 2. Expected Test Sequence
The following tests will run automatically when the device loads:

#### Test 1: LiveSet Initialization
- **Purpose**: Verify LiveSet can be created asynchronously
- **Expected**: `[Alits/TEST] LiveSet Initialization: PASS - LiveSet created successfully with getTracks method`
- **Failure Indicators**: 
  - `FAIL - LiveSet created but missing expected methods`
  - `FAIL - Error: [error message]`

#### Test 2: Track Access
- **Purpose**: Verify track enumeration works correctly
- **Expected**: `[Alits/TEST] Track Access: PASS - Found X tracks` (where X > 0)
- **Failure Indicators**:
  - `FAIL - getTracks() did not return an array`
  - `FAIL - Error: [error message]`

#### Test 3: Error Handling
- **Purpose**: Verify proper error handling for invalid operations
- **Expected**: `[Alits/TEST] Error Handling: PASS - Properly caught error: [error message]`
- **Failure Indicators**:
  - `FAIL - Expected error for invalid track index`
  - `FAIL - Unexpected error: [error message]`

#### Test 4: Interface Compliance
- **Purpose**: Verify all required TypeScript interface methods are present
- **Expected**: `[Alits/TEST] Interface Compliance: PASS - All required methods present`
- **Failure Indicators**:
  - `FAIL - Missing methods: [method names]`
  - `FAIL - Error: [error message]`

### 3. Success Criteria
- All tests show `PASS` status
- No JavaScript runtime errors
- Device loads without crashing Max for Live
- Test summary shows "All tests passed!"

### 4. Failure Investigation
If any test fails:

1. **Check Max Console**: Look for detailed error messages
2. **Verify Package Build**: Ensure `@alits/core` is properly built
3. **Check Live Set**: Ensure Ableton Live has tracks in the current set
4. **Review Error Messages**: Check for specific error details in test output

### 5. Test Results Recording
Record test results in the following format:

```yaml
test_run:
  date: "2025-01-12"
  tester: "Developer Name"
  device: "LiveSetBasicTest.amxd"
  environment: "Ableton Live [version], Max for Live [version]"
  
  results:
    liveset_initialization: "PASS|FAIL|SKIP"
    track_access: "PASS|FAIL|SKIP"
    error_handling: "PASS|FAIL|SKIP"
    interface_compliance: "PASS|FAIL|SKIP"
    
  summary:
    total_tests: 4
    passed: X
    failed: Y
    skipped: Z
    
  notes: "Any additional observations or issues"
```

## Regression Testing
This test should be run:
- After any changes to LiveSet implementation
- Before major releases
- When updating Max for Live or Ableton Live versions
- When modifying TypeScript interfaces

## Known Issues
- None currently identified

## Maintenance
- Update test script if LiveSet interface changes
- Add new tests for additional functionality
- Update expected behavior if LiveAPI changes
