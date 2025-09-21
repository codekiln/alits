// Max 8 Global Methods Test Fixture
// This fixture tests the availability of common JavaScript global methods in Max 8

function testGlobalMethods() {
    post('[MAX8/TEST] Starting global methods availability test\n');
    post('[MAX8/TEST] ===========================================\n');
    
    var results = {
        available: [],
        unavailable: [],
        errors: []
    };
    
    // Test typeof operator (the suspected issue)
    try {
        var testType = typeof 'test';
        post('[MAX8/TEST] typeof operator: AVAILABLE (' + testType + ')\n');
        results.available.push('typeof');
    } catch (error) {
        post('[MAX8/TEST] typeof operator: ERROR - ' + error.message + '\n');
        results.errors.push('typeof: ' + error.message);
    }
    
    // Test other operators
    try {
        var testInstanceof = [] instanceof Array;
        post('[MAX8/TEST] instanceof operator: AVAILABLE (' + testInstanceof + ')\n');
        results.available.push('instanceof');
    } catch (error) {
        post('[MAX8/TEST] instanceof operator: ERROR - ' + error.message + '\n');
        results.errors.push('instanceof: ' + error.message);
    }
    
    try {
        var testIn = 'length' in [];
        post('[MAX8/TEST] in operator: AVAILABLE (' + testIn + ')\n');
        results.available.push('in');
    } catch (error) {
        post('[MAX8/TEST] in operator: ERROR - ' + error.message + '\n');
        results.errors.push('in: ' + error.message);
    }
    
    // Test core JavaScript objects
    var coreObjects = ['Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'Math', 'JSON', 'RegExp', 'Error', 'Function'];
    coreObjects.forEach(function(objName) {
        try {
            var obj = eval(objName);
            if (typeof obj !== 'undefined') {
                post('[MAX8/TEST] ' + objName + ': AVAILABLE (' + typeof obj + ')\n');
                results.available.push(objName);
            } else {
                post('[MAX8/TEST] ' + objName + ': UNAVAILABLE\n');
                results.unavailable.push(objName);
            }
        } catch (error) {
            post('[MAX8/TEST] ' + objName + ': ERROR - ' + error.message + '\n');
            results.errors.push(objName + ': ' + error.message);
        }
    });
    
    // Test global functions
    var globalFunctions = ['eval', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'encodeURI', 'decodeURI', 'encodeURIComponent', 'decodeURIComponent'];
    globalFunctions.forEach(function(funcName) {
        try {
            var func = eval(funcName);
            if (typeof func === 'function') {
                post('[MAX8/TEST] ' + funcName + ': AVAILABLE (function)\n');
                results.available.push(funcName);
            } else {
                post('[MAX8/TEST] ' + funcName + ': UNAVAILABLE\n');
                results.unavailable.push(funcName);
            }
        } catch (error) {
            post('[MAX8/TEST] ' + funcName + ': ERROR - ' + error.message + '\n');
            results.errors.push(funcName + ': ' + error.message);
        }
    });
    
    // Test DOM/browser specific methods (should be unavailable)
    var domMethods = ['setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'console', 'window', 'document', 'navigator'];
    domMethods.forEach(function(methodName) {
        try {
            var method = eval(methodName);
            if (typeof method !== 'undefined') {
                post('[MAX8/TEST] ' + methodName + ': UNEXPECTEDLY AVAILABLE (' + typeof method + ')\n');
                results.available.push(methodName);
            } else {
                post('[MAX8/TEST] ' + methodName + ': UNAVAILABLE (expected)\n');
                results.unavailable.push(methodName);
            }
        } catch (error) {
            post('[MAX8/TEST] ' + methodName + ': UNAVAILABLE (expected) - ' + error.message + '\n');
            results.unavailable.push(methodName);
        }
    });
    
    // Test ES6 features (should be unavailable)
    var es6Features = ['Map', 'Set', 'Promise', 'Symbol', 'Proxy', 'Reflect', 'WeakMap', 'WeakSet'];
    es6Features.forEach(function(featureName) {
        try {
            var feature = eval(featureName);
            if (typeof feature !== 'undefined') {
                post('[MAX8/TEST] ' + featureName + ': UNEXPECTEDLY AVAILABLE (' + typeof feature + ')\n');
                results.available.push(featureName);
            } else {
                post('[MAX8/TEST] ' + featureName + ': UNAVAILABLE (expected)\n');
                results.unavailable.push(featureName);
            }
        } catch (error) {
            post('[MAX8/TEST] ' + featureName + ': UNAVAILABLE (expected) - ' + error.message + '\n');
            results.unavailable.push(featureName);
        }
    });
    
    // Test require function (should be available in Max 8)
    try {
        if (typeof require === 'function') {
            post('[MAX8/TEST] require: AVAILABLE (function)\n');
            results.available.push('require');
        } else {
            post('[MAX8/TEST] require: UNAVAILABLE\n');
            results.unavailable.push('require');
        }
    } catch (error) {
        post('[MAX8/TEST] require: ERROR - ' + error.message + '\n');
        results.errors.push('require: ' + error.message);
    }
    
    // Summary
    post('[MAX8/TEST] ===========================================\n');
    post('[MAX8/TEST] SUMMARY:\n');
    post('[MAX8/TEST] Available: ' + results.available.length + ' methods\n');
    post('[MAX8/TEST] Unavailable: ' + results.unavailable.length + ' methods\n');
    post('[MAX8/TEST] Errors: ' + results.errors.length + ' methods\n');
    
    if (results.errors.length > 0) {
        post('[MAX8/TEST] ERRORS:\n');
        results.errors.forEach(function(error) {
            post('[MAX8/TEST] - ' + error + '\n');
        });
    }
    
    return results;
}

// Test specific to the current issue
function testTypeofIssue() {
    post('[MAX8/TEST] Testing typeof operator specifically\n');
    
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
        
        post('[MAX8/TEST] typeof operator working correctly\n');
        return true;
    } catch (error) {
        post('[MAX8/TEST] typeof operator ERROR: ' + error.message + '\n');
        return false;
    }
}

// Alternative type checking if typeof fails
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

// Test alternative type checking
function testAlternativeTypeChecking() {
    post('[MAX8/TEST] Testing alternative type checking\n');
    
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

// Main test execution
function runAllTests() {
    post('[MAX8/TEST] ===========================================\n');
    post('[MAX8/TEST] MAX 8 JAVASCRIPT GLOBAL METHODS TEST\n');
    post('[MAX8/TEST] ===========================================\n');
    
    // Test typeof specifically
    var typeofWorking = testTypeofIssue();
    
    // Test alternative type checking
    var alternativeWorking = testAlternativeTypeChecking();
    
    // Test all global methods
    var results = testGlobalMethods();
    
    // Final summary
    post('[MAX8/TEST] ===========================================\n');
    post('[MAX8/TEST] FINAL SUMMARY:\n');
    post('[MAX8/TEST] typeof operator: ' + (typeofWorking ? 'WORKING' : 'FAILED') + '\n');
    post('[MAX8/TEST] Alternative type checking: ' + (alternativeWorking ? 'WORKING' : 'FAILED') + '\n');
    post('[MAX8/TEST] Total methods tested: ' + (results.available.length + results.unavailable.length + results.errors.length) + '\n');
    post('[MAX8/TEST] ===========================================\n');
    
    return {
        typeofWorking: typeofWorking,
        alternativeWorking: alternativeWorking,
        results: results
    };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testGlobalMethods: testGlobalMethods,
        testTypeofIssue: testTypeofIssue,
        testAlternativeTypeChecking: testAlternativeTypeChecking,
        getType: getType,
        runAllTests: runAllTests
    };
}
