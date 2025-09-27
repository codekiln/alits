# Global Methods Test - Manual Testing Guide

## Overview
This document provides comprehensive instructions for manually testing the GlobalMethodsTest fixture in Max for Live to validate Max 8's JavaScript environment capabilities.

## Test Setup

### Prerequisites
- Max 8 (version 8.5.8 or later)
- Max for Live
- The compiled GlobalMethodsTest.js file in `/app/apps/maxmsp-test/Code/GlobalMethodsTest.js`

### Test Device
- **Patcher**: `GlobalMethodsTest.maxpat`
- **JavaScript File**: `GlobalMethodsTest.js`
- **Trigger**: Button connected to `js` object

## Expected Console Output Patterns

### 1. Build Information
```
[MAX8-TEST] Entrypoint: GlobalMethodsTest
[MAX8-TEST] Timestamp: 2025-01-XX... (ISO format)
[MAX8-TEST] Source: Independent Max 8 JavaScript environment test
[MAX8-TEST] Max 8 Compatible: Yes
[MAX8-TEST] Global Methods Test initialized
```

### 2. Promise Polyfill Test
**Expected if Promise polyfill works:**
```
[MAX8-TEST] Testing Promise polyfill availability
[MAX8-TEST] Promise constructor: available
[MAX8-TEST] Promise.then result: Promise test successful
[MAX8-TEST] Promise.resolve: available
[MAX8-TEST] Promise.reject: available
[MAX8-TEST] Promise.all: available
[MAX8-TEST] Promise polyfill test passed
```

**Expected if Promise polyfill fails:**
```
[MAX8-TEST] Testing Promise polyfill availability
[MAX8-TEST] Promise constructor: NOT AVAILABLE
[MAX8-TEST] This indicates a critical polyfill issue
```

### 3. typeof Operator Test
```
[MAX8-TEST] Testing typeof operator: available
[MAX8-TEST] typeof string: string
[MAX8-TEST] typeof number: number
[MAX8-TEST] typeof boolean: boolean
[MAX8-TEST] typeof object: object
[MAX8-TEST] typeof array: object
[MAX8-TEST] typeof function: function
[MAX8-TEST] typeof operator test passed
```

### 4. instanceof Operator Test
```
[MAX8-TEST] Testing instanceof operator: available
[MAX8-TEST] [] instanceof Array: true
[MAX8-TEST] {} instanceof Object: true
[MAX8-TEST] function instanceof Function: true
[MAX8-TEST] instanceof operator test passed
```

### 5. Object Methods Test
```
[MAX8-TEST] Testing Object methods: available
[MAX8-TEST] Object.keys result: a, b, c
[MAX8-TEST] Object.values not available (ES2017+ feature)
[MAX8-TEST] Object.entries not available (ES2017+ feature)
[MAX8-TEST] Object methods test passed
```

### 6. Array Methods Test
```
[MAX8-TEST] Testing Array methods: available
[MAX8-TEST] Array.map result: 2, 4, 6, 8, 10
[MAX8-TEST] Array.filter result: 2, 4
[MAX8-TEST] Array.reduce result: 15
[MAX8-TEST] Array methods test passed
```

### 7. Global Methods Test
```
[MAX8-TEST] Testing global methods: available
[MAX8-TEST] parseInt result: 42
[MAX8-TEST] parseFloat result: 3.14
[MAX8-TEST] isNaN(42): false
[MAX8-TEST] isNaN("hello"): true
[MAX8-TEST] isFinite(42): true
[MAX8-TEST] isFinite(Infinity): false
[MAX8-TEST] Global methods test passed
```

### 8. ES5 Features Test
```
[MAX8-TEST] Testing ES5 features: available
[MAX8-TEST] JSON object: available
[MAX8-TEST] JSON.stringify result: {"name":"test","value":42}
[MAX8-TEST] JSON.parse result: test
[MAX8-TEST] Date object: available
[MAX8-TEST] Current date: [current date string]
[MAX8-TEST] RegExp: available
[MAX8-TEST] RegExp test: true
[MAX8-TEST] ES5 features test passed
```

### 9. Max 8 Specific Features Test
```
[MAX8-TEST] Testing Max 8 specific features
[MAX8-TEST] Task object: available
[MAX8-TEST] post function: available
[MAX8-TEST] outlet function: available
[MAX8-TEST] inlet function: available
[MAX8-TEST] inlets variable: 1
[MAX8-TEST] outlets variable: 0
[MAX8-TEST] autowatch variable: 1
[MAX8-TEST] Max 8 specific features test passed
```

### 10. Completion Message
```
[MAX8-TEST] Global methods compatibility test completed
```

## Manual Testing Protocol

### Step 1: Open Max Project
1. Open Max 8
2. Open the project: `/app/apps/maxmsp-test/maxmsp-test.maxproj`
3. Navigate to the `GlobalMethodsTest.maxpat` patcher

### Step 2: Verify Setup
1. Confirm the `js` object shows `GlobalMethodsTest.js`
2. Verify the button is connected to the `js` object
3. Check that the Max console is visible (Window → Console)

### Step 3: Execute Test
1. Click the button to trigger the test
2. Observe the console output
3. Compare output against expected patterns above

### Step 4: Validate Results
1. **Promise Polyfill**: Should show "available" if polyfill injection worked
2. **ES5 Features**: Should all pass (JSON, Date, RegExp)
3. **Max 8 Features**: Should all show "available"
4. **ES2017+ Features**: Should show "not available" (Object.values, Object.entries)

### Step 5: Test Individual Functions
The test also provides individual test functions that can be called:
- `test_promise()` - Test Promise polyfill only
- `test_typeof()` - Test typeof operator only
- `test_instanceof()` - Test instanceof operator only
- `test_object_methods()` - Test Object methods only
- `test_array_methods()` - Test Array methods only
- `test_global_methods()` - Test global methods only
- `test_es5_features()` - Test ES5 features only
- `test_max8_features()` - Test Max 8 features only

## Success Criteria

### ✅ Test Passes If:
- All console output matches expected patterns
- Promise polyfill shows as "available"
- All ES5 features work correctly
- All Max 8 specific features are available
- No JavaScript errors in console
- Test completes with "Global methods compatibility test completed"

### ❌ Test Fails If:
- JavaScript errors appear in console
- Promise polyfill shows as "NOT AVAILABLE"
- Any core ES5 features fail
- Max 8 specific features are missing
- Test crashes or hangs

## Troubleshooting

### Common Issues:
1. **"Promise constructor: NOT AVAILABLE"**
   - Check if Promise polyfill was properly injected
   - Verify maxmsp-ts build completed successfully

2. **JavaScript errors**
   - Check Max console for detailed error messages
   - Verify GlobalMethodsTest.js file is properly loaded

3. **Missing Max 8 features**
   - Ensure running in Max 8 environment
   - Check Max version compatibility

## Data Collection

### Critical Information to Gather:
1. **Promise Polyfill Status**: Available/Not Available
2. **ES5 Feature Support**: Which features work/fail
3. **Max 8 Feature Availability**: Which Max-specific features are present
4. **Performance**: How long the test takes to complete
5. **Error Patterns**: Any consistent failures or issues

### Documentation Requirements:
- Screenshot of console output
- Max version information
- Any error messages or unexpected behavior
- Performance timing data

## Next Steps After Testing

Based on test results:
1. **If Promise polyfill works**: Proceed with Promise-based implementation
2. **If Promise polyfill fails**: Investigate polyfill injection issues
3. **If ES5 features fail**: Document Max 8 JavaScript limitations
4. **If Max 8 features missing**: Verify Max version and environment setup

This manual testing provides essential data for understanding Max 8's JavaScript environment capabilities and validating the Promise polyfill implementation.
