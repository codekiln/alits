# Fixture Creation: MIDI Utilities Test

## Purpose
To create a fixture device that demonstrates MIDI note ↔ name conversion utilities within the Max for Live runtime.

## Prerequisites
- Ableton Live with Max for Live installed
- `@alits/core` package built and available
- Max for Live device creation permissions

## Steps

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "MIDI Utilities Test"

### 2. Add JavaScript Object
1. Add a `js` object to the Max device
2. Set the file path to `midi-utils-test.js` (will be created in fixtures directory)

### 3. Create Test Script
Create `midi-utils-test.js` with the following content:

```javascript
// MIDI Utilities Test
// This script tests MIDI note ↔ name conversion utilities in Max for Live runtime

// Import the @alits/core package
const { noteToName, nameToNote, isValidNoteName, isValidMidiNote } = require('@alits/core');

// Test configuration
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

// Test 1: Note to Name Conversion
function testNoteToName() {
    try {
        logTest('Note to Name', 'RUNNING', 'Testing MIDI note to name conversion');
        
        const testCases = [
            { note: 60, expected: 'C4' },
            { note: 69, expected: 'A4' },
            { note: 0, expected: 'C-1' },
            { note: 127, expected: 'G9' },
            { note: 24, expected: 'C1' },
            { note: 36, expected: 'C2' }
        ];
        
        let passed = 0;
        let failed = 0;
        
        for (const testCase of testCases) {
            try {
                const result = noteToName(testCase.note);
                if (result === testCase.expected) {
                    passed++;
                } else {
                    failed++;
                    post(`[Alits/TEST] Note ${testCase.note}: expected '${testCase.expected}', got '${result}'`);
                }
            } catch (error) {
                failed++;
                post(`[Alits/TEST] Note ${testCase.note}: error - ${error.message}`);
            }
        }
        
        if (failed === 0) {
            logTest('Note to Name', 'PASS', `All ${passed} test cases passed`);
        } else {
            logTest('Note to Name', 'FAIL', `${failed} test cases failed, ${passed} passed`);
        }
        
    } catch (error) {
        logTest('Note to Name', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 2: Name to Note Conversion
function testNameToNote() {
    try {
        logTest('Name to Note', 'RUNNING', 'Testing MIDI name to note conversion');
        
        const testCases = [
            { name: 'C4', expected: 60 },
            { name: 'A4', expected: 69 },
            { name: 'C-1', expected: 0 },
            { name: 'G9', expected: 127 },
            { name: 'C1', expected: 24 },
            { name: 'C2', expected: 36 },
            { name: 'F#4', expected: 66 },
            { name: 'Bb3', expected: 58 }
        ];
        
        let passed = 0;
        let failed = 0;
        
        for (const testCase of testCases) {
            try {
                const result = nameToNote(testCase.name);
                if (result === testCase.expected) {
                    passed++;
                } else {
                    failed++;
                    post(`[Alits/TEST] Name '${testCase.name}': expected ${testCase.expected}, got ${result}`);
                }
            } catch (error) {
                failed++;
                post(`[Alits/TEST] Name '${testCase.name}': error - ${error.message}`);
            }
        }
        
        if (failed === 0) {
            logTest('Name to Note', 'PASS', `All ${passed} test cases passed`);
        } else {
            logTest('Name to Note', 'FAIL', `${failed} test cases failed, ${passed} passed`);
        }
        
    } catch (error) {
        logTest('Name to Note', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 3: Round-trip Conversion
function testRoundTripConversion() {
    try {
        logTest('Round-trip Conversion', 'RUNNING', 'Testing note → name → note conversion');
        
        const testNotes = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 127];
        let passed = 0;
        let failed = 0;
        
        for (const note of testNotes) {
            try {
                const name = noteToName(note);
                const convertedNote = nameToNote(name);
                
                if (convertedNote === note) {
                    passed++;
                } else {
                    failed++;
                    post(`[Alits/TEST] Round-trip ${note}: ${note} → '${name}' → ${convertedNote}`);
                }
            } catch (error) {
                failed++;
                post(`[Alits/TEST] Round-trip ${note}: error - ${error.message}`);
            }
        }
        
        if (failed === 0) {
            logTest('Round-trip Conversion', 'PASS', `All ${passed} round-trip conversions successful`);
        } else {
            logTest('Round-trip Conversion', 'FAIL', `${failed} round-trip conversions failed, ${passed} successful`);
        }
        
    } catch (error) {
        logTest('Round-trip Conversion', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 4: Validation Functions
function testValidationFunctions() {
    try {
        logTest('Validation Functions', 'RUNNING', 'Testing note and name validation');
        
        // Test isValidMidiNote
        const validNotes = [0, 60, 127];
        const invalidNotes = [-1, 128, '60', null, undefined];
        
        let validationPassed = 0;
        let validationFailed = 0;
        
        for (const note of validNotes) {
            if (isValidMidiNote(note)) {
                validationPassed++;
            } else {
                validationFailed++;
                post(`[Alits/TEST] isValidMidiNote(${note}): expected true, got false`);
            }
        }
        
        for (const note of invalidNotes) {
            if (!isValidMidiNote(note)) {
                validationPassed++;
            } else {
                validationFailed++;
                post(`[Alits/TEST] isValidMidiNote(${note}): expected false, got true`);
            }
        }
        
        // Test isValidNoteName
        const validNames = ['C4', 'A4', 'F#4', 'Bb3', 'C-1', 'G9'];
        const invalidNames = ['H4', 'C#b4', 'C4#', '', null, undefined];
        
        for (const name of validNames) {
            if (isValidNoteName(name)) {
                validationPassed++;
            } else {
                validationFailed++;
                post(`[Alits/TEST] isValidNoteName('${name}'): expected true, got false`);
            }
        }
        
        for (const name of invalidNames) {
            if (!isValidNoteName(name)) {
                validationPassed++;
            } else {
                validationFailed++;
                post(`[Alits/TEST] isValidNoteName('${name}'): expected false, got true`);
            }
        }
        
        if (validationFailed === 0) {
            logTest('Validation Functions', 'PASS', `All ${validationPassed} validation tests passed`);
        } else {
            logTest('Validation Functions', 'FAIL', `${validationFailed} validation tests failed, ${validationPassed} passed`);
        }
        
    } catch (error) {
        logTest('Validation Functions', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 5: Edge Cases and Error Handling
function testEdgeCases() {
    try {
        logTest('Edge Cases', 'RUNNING', 'Testing edge cases and error handling');
        
        // Test invalid inputs
        const invalidInputs = [
            { input: -1, function: 'noteToName' },
            { input: 128, function: 'noteToName' },
            { input: 'invalid', function: 'nameToNote' },
            { input: 'H4', function: 'nameToNote' },
            { input: null, function: 'noteToName' },
            { input: undefined, function: 'nameToNote' }
        ];
        
        let errorHandlingPassed = 0;
        let errorHandlingFailed = 0;
        
        for (const testCase of invalidInputs) {
            try {
                let result;
                if (testCase.function === 'noteToName') {
                    result = noteToName(testCase.input);
                } else {
                    result = nameToNote(testCase.input);
                }
                
                // If we get here, the function didn't throw an error
                errorHandlingFailed++;
                post(`[Alits/TEST] ${testCase.function}(${testCase.input}): expected error, got '${result}'`);
            } catch (error) {
                // Expected behavior - function should throw error for invalid input
                errorHandlingPassed++;
            }
        }
        
        if (errorHandlingFailed === 0) {
            logTest('Edge Cases', 'PASS', `All ${errorHandlingPassed} error handling tests passed`);
        } else {
            logTest('Edge Cases', 'FAIL', `${errorHandlingFailed} error handling tests failed, ${errorHandlingPassed} passed`);
        }
        
    } catch (error) {
        logTest('Edge Cases', 'FAIL', `Error: ${error.message}`);
    }
}

// Main test runner
function runAllTests() {
    post('[Alits/TEST] Starting MIDI Utilities Tests');
    post('[Alits/TEST] ===========================================');
    
    // Run tests in sequence
    testNoteToName();
    testNameToNote();
    testRoundTripConversion();
    testValidationFunctions();
    testEdgeCases();
    
    // Summary
    const passed = testResults.filter(r => r.status === 'PASS').length;
    const failed = testResults.filter(r => r.status === 'FAIL').length;
    const skipped = testResults.filter(r => r.status === 'SKIP').length;
    
    post('[Alits/TEST] ===========================================');
    post(`[Alits/TEST] Summary: ${passed} passed, ${failed} failed, ${skipped} skipped`);
    
    if (failed === 0) {
        post('[Alits/TEST] All MIDI utilities tests passed!');
    } else {
        post(`[Alits/TEST] ${failed} test(s) failed - see details above`);
    }
}

// Export test results for external access
function getTestResults() {
    return testResults;
}

// Start tests when script loads
runAllTests();
```

### 4. Save Device
1. Save the device as `MidiUtilsTest.amxd` in the fixtures directory
2. Ensure the device is properly saved and can be loaded

### 5. Test Script Location
The test script will be saved as `packages/alits-core/tests/manual/fixtures/midi-utils-test.js`

## Expected Behavior
When the device is loaded in Ableton Live:
1. It should test note to name conversion with various MIDI notes
2. It should test name to note conversion with various note names
3. It should verify round-trip conversion accuracy
4. It should test validation functions
5. It should handle edge cases and invalid inputs properly
6. It should log test results to the Max console

## Verification
- Check Max console for `[Alits/TEST]` log messages
- All tests should show "PASS" status
- No JavaScript errors should occur
- Device should load without crashing Max for Live

## Troubleshooting
- If conversion functions fail, check that the package is properly built
- If validation fails, verify the MIDI utilities implementation
- If errors occur, check Max console for detailed error messages
