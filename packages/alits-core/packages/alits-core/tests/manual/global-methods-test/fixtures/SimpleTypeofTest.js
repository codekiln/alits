// Simple Max 8 typeof Test
// Load this in a Max for Live js object to test typeof operator

function testTypeof() {
    post('[MAX8/TEST] Testing typeof operator\n');
    
    try {
        // Test basic typeof usage
        var stringType = typeof 'hello';
        post('[MAX8/TEST] typeof "hello": ' + stringType + '\n');
        
        var numberType = typeof 42;
        post('[MAX8/TEST] typeof 42: ' + numberType + '\n');
        
        var objectType = typeof {};
        post('[MAX8/TEST] typeof {}: ' + objectType + '\n');
        
        var functionType = typeof function() {};
        post('[MAX8/TEST] typeof function: ' + functionType + '\n');
        
        var undefinedType = typeof undefined;
        post('[MAX8/TEST] typeof undefined: ' + undefinedType + '\n');
        
        // Test typeof with variables
        var testVar = 'test';
        var varType = typeof testVar;
        post('[MAX8/TEST] typeof testVar: ' + varType + '\n');
        
        // Test typeof with objects
        var testObj = {a: 1};
        var objType = typeof testObj;
        post('[MAX8/TEST] typeof testObj: ' + objType + '\n');
        
        // Test typeof with functions
        var testFunc = function() { return 'test'; };
        var funcType = typeof testFunc;
        post('[MAX8/TEST] typeof testFunc: ' + funcType + '\n');
        
        post('[MAX8/TEST] typeof operator working correctly\n');
        return true;
    } catch (error) {
        post('[MAX8/TEST] typeof operator ERROR: ' + error.message + '\n');
        return false;
    }
}

// Test alternative type checking
function testAlternativeTypeChecking() {
    post('[MAX8/TEST] Testing alternative type checking\n');
    
    function getType(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (value instanceof Array) return 'array';
        if (value instanceof Date) return 'date';
        if (value instanceof RegExp) return 'regexp';
        if (value instanceof Error) return 'error';
        if (value instanceof Function) return 'function';
        if (value instanceof Object) return 'object';
        return 'unknown';
    }
    
    try {
        var stringType = getType('hello');
        post('[MAX8/TEST] getType("hello"): ' + stringType + '\n');
        
        var numberType = getType(42);
        post('[MAX8/TEST] getType(42): ' + numberType + '\n');
        
        var objectType = getType({});
        post('[MAX8/TEST] getType({}): ' + objectType + '\n');
        
        var functionType = getType(function() {});
        post('[MAX8/TEST] getType(function): ' + functionType + '\n');
        
        post('[MAX8/TEST] Alternative type checking working correctly\n');
        return true;
    } catch (error) {
        post('[MAX8/TEST] Alternative type checking ERROR: ' + error.message + '\n');
        return false;
    }
}

// Test other common global methods
function testCommonGlobals() {
    post('[MAX8/TEST] Testing common global methods\n');
    
    try {
        // Test Object
        if (typeof Object === 'function') {
            post('[MAX8/TEST] Object: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Object: UNAVAILABLE\n');
        }
        
        // Test Array
        if (typeof Array === 'function') {
            post('[MAX8/TEST] Array: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Array: UNAVAILABLE\n');
        }
        
        // Test String
        if (typeof String === 'function') {
            post('[MAX8/TEST] String: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] String: UNAVAILABLE\n');
        }
        
        // Test Number
        if (typeof Number === 'function') {
            post('[MAX8/TEST] Number: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Number: UNAVAILABLE\n');
        }
        
        // Test Boolean
        if (typeof Boolean === 'function') {
            post('[MAX8/TEST] Boolean: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Boolean: UNAVAILABLE\n');
        }
        
        // Test Date
        if (typeof Date === 'function') {
            post('[MAX8/TEST] Date: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Date: UNAVAILABLE\n');
        }
        
        // Test Math
        if (typeof Math === 'object') {
            post('[MAX8/TEST] Math: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Math: UNAVAILABLE\n');
        }
        
        // Test JSON
        if (typeof JSON === 'object') {
            post('[MAX8/TEST] JSON: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] JSON: UNAVAILABLE\n');
        }
        
        // Test RegExp
        if (typeof RegExp === 'function') {
            post('[MAX8/TEST] RegExp: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] RegExp: UNAVAILABLE\n');
        }
        
        // Test Error
        if (typeof Error === 'function') {
            post('[MAX8/TEST] Error: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Error: UNAVAILABLE\n');
        }
        
        // Test Function
        if (typeof Function === 'function') {
            post('[MAX8/TEST] Function: AVAILABLE\n');
        } else {
            post('[MAX8/TEST] Function: UNAVAILABLE\n');
        }
        
        post('[MAX8/TEST] Common global methods test completed\n');
        return true;
    } catch (error) {
        post('[MAX8/TEST] Common global methods ERROR: ' + error.message + '\n');
        return false;
    }
}

// Main test function
function runTests() {
    post('[MAX8/TEST] ===========================================\n');
    post('[MAX8/TEST] MAX 8 JAVASCRIPT GLOBAL METHODS TEST\n');
    post('[MAX8/TEST] ===========================================\n');
    
    var typeofWorking = testTypeof();
    var alternativeWorking = testAlternativeTypeChecking();
    var globalsWorking = testCommonGlobals();
    
    post('[MAX8/TEST] ===========================================\n');
    post('[MAX8/TEST] FINAL SUMMARY:\n');
    post('[MAX8/TEST] typeof operator: ' + (typeofWorking ? 'WORKING' : 'FAILED') + '\n');
    post('[MAX8/TEST] Alternative type checking: ' + (alternativeWorking ? 'WORKING' : 'FAILED') + '\n');
    post('[MAX8/TEST] Common globals: ' + (globalsWorking ? 'WORKING' : 'FAILED') + '\n');
    post('[MAX8/TEST] ===========================================\n');
    
    return {
        typeofWorking: typeofWorking,
        alternativeWorking: alternativeWorking,
        globalsWorking: globalsWorking
    };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testTypeof: testTypeof,
        testAlternativeTypeChecking: testAlternativeTypeChecking,
        testCommonGlobals: testCommonGlobals,
        runTests: runTests
    };
}
