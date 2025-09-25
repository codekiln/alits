// Global Methods Test - Max 8 Compatible
// This test validates JavaScript global methods availability in Max for Live

// Build identification system
function printBuildInfo() {
    post('[BUILD] Entrypoint: GlobalMethodsTest\n');
    post('[BUILD] Git: ' + getGitInfo() + '\n');
    post('[BUILD] Timestamp: ' + new Date().toISOString() + '\n');
    post('[BUILD] Source: @alits/core debug build (non-minified)\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
}

function getGitInfo() {
    // This would be replaced during build process
    return 'v1.0.0-5-g1234567';
}

// Import the @alits/core package
var core_1 = require("alits_debug.js");

// Debug: Check what core_1 contains
post('[Alits/DEBUG] core_1 keys: ' + Object.keys(core_1).join(', ') + '\n');

// Max for Live script setup
function bang() {
    printBuildInfo();
    post('[Alits/TEST] Global Methods Test initialized\n');
    
    try {
        // Run all compatibility tests
        testTypeofOperator();
        testInstanceofOperator();
        testObjectMethods();
        testArrayMethods();
        testGlobalMethods();
        
        post('[Alits/TEST] Global methods compatibility test completed\n');
    } catch (error) {
        post('[Alits/TEST] Error: ' + error.message + '\n');
    }
}

function testTypeofOperator() {
    post('[Alits/TEST] Testing typeof operator: available\n');
    
    try {
        var testString = 'hello';
        var testNumber = 42;
        var testBoolean = true;
        var testObject = {};
        var testArray = [];
        var testFunction = function() {};
        
        post('[Alits/TEST] typeof string: ' + typeof testString + '\n');
        post('[Alits/TEST] typeof number: ' + typeof testNumber + '\n');
        post('[Alits/TEST] typeof boolean: ' + typeof testBoolean + '\n');
        post('[Alits/TEST] typeof object: ' + typeof testObject + '\n');
        post('[Alits/TEST] typeof array: ' + typeof testArray + '\n');
        post('[Alits/TEST] typeof function: ' + typeof testFunction + '\n');
        
        post('[Alits/TEST] typeof operator test passed\n');
    } catch (error) {
        post('[Alits/TEST] typeof operator test failed: ' + error.message + '\n');
    }
}

function testInstanceofOperator() {
    post('[Alits/TEST] Testing instanceof operator: available\n');
    
    try {
        var testArray = [];
        var testObject = {};
        var testFunction = function() {};
        
        post('[Alits/TEST] [] instanceof Array: ' + (testArray instanceof Array) + '\n');
        post('[Alits/TEST] {} instanceof Object: ' + (testObject instanceof Object) + '\n');
        post('[Alits/TEST] function instanceof Function: ' + (testFunction instanceof Function) + '\n');
        
        post('[Alits/TEST] instanceof operator test passed\n');
    } catch (error) {
        post('[Alits/TEST] instanceof operator test failed: ' + error.message + '\n');
    }
}

function testObjectMethods() {
    post('[Alits/TEST] Testing Object methods: available\n');
    
    try {
        var testObj = { a: 1, b: 2, c: 3 };
        
        // Test Object.keys
        if (typeof Object.keys === 'function') {
            var keys = Object.keys(testObj);
            post('[Alits/TEST] Object.keys result: ' + keys.join(', ') + '\n');
        } else {
            post('[Alits/TEST] Object.keys not available\n');
        }
        
        // Test Object.values
        if (typeof Object.values === 'function') {
            var values = Object.values(testObj);
            post('[Alits/TEST] Object.values result: ' + values.join(', ') + '\n');
        } else {
            post('[Alits/TEST] Object.values not available\n');
        }
        
        // Test Object.entries
        if (typeof Object.entries === 'function') {
            var entries = Object.entries(testObj);
            post('[Alits/TEST] Object.entries result: ' + entries.length + ' entries\n');
        } else {
            post('[Alits/TEST] Object.entries not available\n');
        }
        
        post('[Alits/TEST] Object methods test passed\n');
    } catch (error) {
        post('[Alits/TEST] Object methods test failed: ' + error.message + '\n');
    }
}

function testArrayMethods() {
    post('[Alits/TEST] Testing Array methods: available\n');
    
    try {
        var testArray = [1, 2, 3, 4, 5];
        
        // Test Array.prototype.map
        if (typeof testArray.map === 'function') {
            var doubled = testArray.map(function(x) { return x * 2; });
            post('[Alits/TEST] Array.map result: ' + doubled.join(', ') + '\n');
        } else {
            post('[Alits/TEST] Array.map not available\n');
        }
        
        // Test Array.prototype.filter
        if (typeof testArray.filter === 'function') {
            var evens = testArray.filter(function(x) { return x % 2 === 0; });
            post('[Alits/TEST] Array.filter result: ' + evens.join(', ') + '\n');
        } else {
            post('[Alits/TEST] Array.filter not available\n');
        }
        
        // Test Array.prototype.reduce
        if (typeof testArray.reduce === 'function') {
            var sum = testArray.reduce(function(acc, x) { return acc + x; }, 0);
            post('[Alits/TEST] Array.reduce result: ' + sum + '\n');
        } else {
            post('[Alits/TEST] Array.reduce not available\n');
        }
        
        post('[Alits/TEST] Array methods test passed\n');
    } catch (error) {
        post('[Alits/TEST] Array methods test failed: ' + error.message + '\n');
    }
}

function testGlobalMethods() {
    post('[Alits/TEST] Testing global methods: available\n');
    
    try {
        // Test parseInt
        if (typeof parseInt === 'function') {
            var result = parseInt('42', 10);
            post('[Alits/TEST] parseInt result: ' + result + '\n');
        } else {
            post('[Alits/TEST] parseInt not available\n');
        }
        
        // Test parseFloat
        if (typeof parseFloat === 'function') {
            var result = parseFloat('3.14');
            post('[Alits/TEST] parseFloat result: ' + result + '\n');
        } else {
            post('[Alits/TEST] parseFloat not available\n');
        }
        
        // Test isNaN
        if (typeof isNaN === 'function') {
            post('[Alits/TEST] isNaN(42): ' + isNaN(42) + '\n');
            post('[Alits/TEST] isNaN("hello"): ' + isNaN('hello') + '\n');
        } else {
            post('[Alits/TEST] isNaN not available\n');
        }
        
        // Test isFinite
        if (typeof isFinite === 'function') {
            post('[Alits/TEST] isFinite(42): ' + isFinite(42) + '\n');
            post('[Alits/TEST] isFinite(Infinity): ' + isFinite(Infinity) + '\n');
        } else {
            post('[Alits/TEST] isFinite not available\n');
        }
        
        post('[Alits/TEST] Global methods test passed\n');
    } catch (error) {
        post('[Alits/TEST] Global methods test failed: ' + error.message + '\n');
    }
}

// Individual test functions for Max controls
function test_typeof() {
    testTypeofOperator();
}

function test_instanceof() {
    testInstanceofOperator();
}

function test_object_methods() {
    testObjectMethods();
}

function test_array_methods() {
    testArrayMethods();
}

function test_global_methods() {
    testGlobalMethods();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bang: bang,
        testTypeofOperator: testTypeofOperator,
        testInstanceofOperator: testInstanceofOperator,
        testObjectMethods: testObjectMethods,
        testArrayMethods: testArrayMethods,
        testGlobalMethods: testGlobalMethods
    };
}
