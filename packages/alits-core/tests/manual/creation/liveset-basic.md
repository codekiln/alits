# Fixture Creation: LiveSet Basic Functionality

## Purpose
To create a fixture device that demonstrates basic LiveSet functionality including initialization, track access, and error handling within the Max for Live runtime.

## Prerequisites
- Ableton Live with Max for Live installed
- `@alits/core` package built and available
- Max for Live device creation permissions

## Steps

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "LiveSet Basic Test"

### 2. Add JavaScript Object
1. Add a `js` object to the Max device
2. Set the file path to `liveset-basic.js` (will be created in fixtures directory)

### 3. Create Test Script
Create `liveset-basic.js` with the following content:

```javascript
// LiveSet Basic Functionality Test
// This script tests core LiveSet functionality in Max for Live runtime

// Import the @alits/core package
const { LiveSet } = require('@alits/core');

// Test configuration
const TEST_TIMEOUT = 5000; // 5 seconds
let testResults = [];

// Logging function for test results
function logTest(testName, status, message) {
    const result = {
        test: testName,
        status: status, // 'PASS', 'FAIL', 'SKIP'
        message: message,
        timestamp: new Date().toISOString()
    };
    testResults.push(result);
    post(`[Alits/TEST] ${testName}: ${status} - ${message}`);
}

// Test 1: LiveSet Initialization
async function testLiveSetInitialization() {
    try {
        logTest('LiveSet Initialization', 'RUNNING', 'Testing async LiveSet creation');
        
        const liveSet = await LiveSet.create();
        
        if (liveSet && typeof liveSet.getTracks === 'function') {
            logTest('LiveSet Initialization', 'PASS', 'LiveSet created successfully with getTracks method');
            return liveSet;
        } else {
            logTest('LiveSet Initialization', 'FAIL', 'LiveSet created but missing expected methods');
            return null;
        }
    } catch (error) {
        logTest('LiveSet Initialization', 'FAIL', `Error: ${error.message}`);
        return null;
    }
}

// Test 2: Track Access
async function testTrackAccess(liveSet) {
    if (!liveSet) {
        logTest('Track Access', 'SKIP', 'LiveSet not available');
        return;
    }
    
    try {
        logTest('Track Access', 'RUNNING', 'Testing track enumeration');
        
        const tracks = await liveSet.getTracks();
        
        if (Array.isArray(tracks)) {
            logTest('Track Access', 'PASS', `Found ${tracks.length} tracks`);
        } else {
            logTest('Track Access', 'FAIL', 'getTracks() did not return an array');
        }
    } catch (error) {
        logTest('Track Access', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 3: Error Handling
async function testErrorHandling() {
    try {
        logTest('Error Handling', 'RUNNING', 'Testing error handling with invalid operations');
        
        // This should trigger an error in a controlled way
        const liveSet = await LiveSet.create();
        
        // Try to access a non-existent track
        try {
            await liveSet.getTrack(-1); // Invalid track index
            logTest('Error Handling', 'FAIL', 'Expected error for invalid track index');
        } catch (error) {
            logTest('Error Handling', 'PASS', `Properly caught error: ${error.message}`);
        }
        
    } catch (error) {
        logTest('Error Handling', 'FAIL', `Unexpected error: ${error.message}`);
    }
}

// Test 4: TypeScript Interface Compliance
async function testInterfaceCompliance(liveSet) {
    if (!liveSet) {
        logTest('Interface Compliance', 'SKIP', 'LiveSet not available');
        return;
    }
    
    try {
        logTest('Interface Compliance', 'RUNNING', 'Testing TypeScript interface compliance');
        
        // Check for required methods
        const requiredMethods = ['getTracks', 'getTrack', 'getScenes', 'getScene'];
        const missingMethods = [];
        
        for (const method of requiredMethods) {
            if (typeof liveSet[method] !== 'function') {
                missingMethods.push(method);
            }
        }
        
        if (missingMethods.length === 0) {
            logTest('Interface Compliance', 'PASS', 'All required methods present');
        } else {
            logTest('Interface Compliance', 'FAIL', `Missing methods: ${missingMethods.join(', ')}`);
        }
        
    } catch (error) {
        logTest('Interface Compliance', 'FAIL', `Error: ${error.message}`);
    }
}

// Main test runner
async function runAllTests() {
    post('[Alits/TEST] Starting LiveSet Basic Functionality Tests');
    post('[Alits/TEST] ===========================================');
    
    // Run tests in sequence
    const liveSet = await testLiveSetInitialization();
    await testTrackAccess(liveSet);
    await testErrorHandling();
    await testInterfaceCompliance(liveSet);
    
    // Summary
    const passed = testResults.filter(r => r.status === 'PASS').length;
    const failed = testResults.filter(r => r.status === 'FAIL').length;
    const skipped = testResults.filter(r => r.status === 'SKIP').length;
    
    post('[Alits/TEST] ===========================================');
    post(`[Alits/TEST] Summary: ${passed} passed, ${failed} failed, ${skipped} skipped`);
    
    if (failed === 0) {
        post('[Alits/TEST] All tests passed!');
    } else {
        post(`[Alits/TEST] ${failed} test(s) failed - see details above`);
    }
}

// Export test results for external access
function getTestResults() {
    return testResults;
}

// Start tests when script loads
runAllTests().catch(error => {
    post(`[Alits/TEST] Fatal error: ${error.message}`);
});
```

### 4. Save Device
1. Save the device as `LiveSetBasicTest.amxd` in the fixtures directory
2. Ensure the device is properly saved and can be loaded

### 5. Test Script Location
The test script will be saved as `packages/alits-core/tests/manual/fixtures/liveset-basic.js`

## Expected Behavior
When the device is loaded in Ableton Live:
1. It should initialize the LiveSet successfully
2. It should enumerate tracks without errors
3. It should handle errors gracefully
4. It should log test results to the Max console

## Verification
- Check Max console for `[Alits/TEST]` log messages
- All tests should show "PASS" status
- No JavaScript errors should occur
- Device should load without crashing Max for Live

## Troubleshooting
- If LiveSet creation fails, check that the package is properly built
- If track access fails, ensure Ableton Live has tracks in the current set
- If errors occur, check Max console for detailed error messages
