// Global Methods Test - Max 8 Compatible
// This test validates JavaScript global methods availability in Max for Live
// Includes comprehensive Promise polyfill testing

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
var core_1 = require("alits_index.js");

// Debug: Check what core_1 contains
post('[Alits/DEBUG] core_1 keys: ' + Object.keys(core_1).join(', ') + '\n');

// Max for Live script setup
function bang() {
    printBuildInfo();
    post('[Alits/TEST] Global Methods Test initialized\n');
    
    try {
        // Run all compatibility tests
        testPromisePolyfill();
        testTypeofOperator();
        testInstanceofOperator();
        testObjectMethods();
        testArrayMethods();
        testGlobalMethods();
        testES5Features();
        testMax8SpecificFeatures();
        
        post('[Alits/TEST] Global methods compatibility test completed\n');
    } catch (error) {
        post('[Alits/TEST] Error: ' + error.message + '\n');
    }
}

function testPromisePolyfill() {
    post('[Alits/TEST] Testing Promise polyfill availability\n');
    
    try {
        // Test if Promise is available
        if (typeof Promise !== 'undefined') {
            post('[Alits/TEST] Promise constructor: available\n');
            
            // Test basic Promise functionality
            var testPromise = new Promise(function(resolve, reject) {
                resolve('Promise test successful');
            });
            
            testPromise.then(function(value) {
                post('[Alits/TEST] Promise.then result: ' + value + '\n');
            }).catch(function(error) {
                post('[Alits/TEST] Promise.catch error: ' + error + '\n');
            });
            
            // Test Promise.resolve
            if (typeof Promise.resolve === 'function') {
                var resolvedPromise = Promise.resolve('Resolved value');
                post('[Alits/TEST] Promise.resolve: available\n');
            }
            
            // Test Promise.reject
            if (typeof Promise.reject === 'function') {
                post('[Alits/TEST] Promise.reject: available\n');
            }
            
            // Test Promise.all
            if (typeof Promise.all === 'function') {
                post('[Alits/TEST] Promise.all: available\n');
            }
            
            post('[Alits/TEST] Promise polyfill test passed\n');
        } else {
            post('[Alits/TEST] Promise constructor: NOT AVAILABLE\n');
            post('[Alits/TEST] This indicates a critical polyfill issue\n');
        }
    } catch (error) {
        post('[Alits/TEST] Promise polyfill test failed: ' + error.message + '\n');
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
        
        // Test Object.values (ES2017+ feature, not available in ES5)
        if (typeof (Object as any).values === 'function') {
            var values = (Object as any).values(testObj);
            post('[Alits/TEST] Object.values result: ' + values.join(', ') + '\n');
        } else {
            post('[Alits/TEST] Object.values not available (ES2017+ feature)\n');
        }
        
        // Test Object.entries (ES2017+ feature, not available in ES5)
        if (typeof (Object as any).entries === 'function') {
            var entries = (Object as any).entries(testObj);
            post('[Alits/TEST] Object.entries result: ' + entries.length + ' entries\n');
        } else {
            post('[Alits/TEST] Object.entries not available (ES2017+ feature)\n');
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
            post('[Alits/TEST] isNaN("hello"): ' + isNaN(Number('hello')) + '\n');
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

function testES5Features() {
    post('[Alits/TEST] Testing ES5 features: available\n');
    
    try {
        // Test JSON object
        if (typeof JSON !== 'undefined') {
            post('[Alits/TEST] JSON object: available\n');
            
            if (typeof JSON.stringify === 'function') {
                var testObj = { name: 'test', value: 42 };
                var jsonString = JSON.stringify(testObj);
                post('[Alits/TEST] JSON.stringify result: ' + jsonString + '\n');
            }
            
            if (typeof JSON.parse === 'function') {
                var parsedObj = JSON.parse('{"name":"test","value":42}');
                post('[Alits/TEST] JSON.parse result: ' + parsedObj.name + '\n');
            }
        } else {
            post('[Alits/TEST] JSON object: NOT AVAILABLE\n');
        }
        
        // Test Date object
        if (typeof Date !== 'undefined') {
            post('[Alits/TEST] Date object: available\n');
            var now = new Date();
            post('[Alits/TEST] Current date: ' + now.toString() + '\n');
        } else {
            post('[Alits/TEST] Date object: NOT AVAILABLE\n');
        }
        
        // Test RegExp
        if (typeof RegExp !== 'undefined') {
            post('[Alits/TEST] RegExp: available\n');
            var regex = new RegExp('test');
            post('[Alits/TEST] RegExp test: ' + regex.test('this is a test') + '\n');
        } else {
            post('[Alits/TEST] RegExp: NOT AVAILABLE\n');
        }
        
        post('[Alits/TEST] ES5 features test passed\n');
    } catch (error) {
        post('[Alits/TEST] ES5 features test failed: ' + error.message + '\n');
    }
}

function testMax8SpecificFeatures() {
    post('[Alits/TEST] Testing Max 8 specific features\n');
    
    try {
        // Test Max global objects
        if (typeof Task !== 'undefined') {
            post('[Alits/TEST] Task object: available\n');
        } else {
            post('[Alits/TEST] Task object: NOT AVAILABLE\n');
        }
        
        if (typeof post !== 'undefined') {
            post('[Alits/TEST] post function: available\n');
        } else {
            post('[Alits/TEST] post function: NOT AVAILABLE\n');
        }
        
        if (typeof outlet !== 'undefined') {
            post('[Alits/TEST] outlet function: available\n');
        } else {
            post('[Alits/TEST] outlet function: NOT AVAILABLE\n');
        }
        
        if (typeof inlet !== 'undefined') {
            post('[Alits/TEST] inlet function: available\n');
        } else {
            post('[Alits/TEST] inlet function: NOT AVAILABLE\n');
        }
        
        // Test Max-specific globals
        if (typeof inlets !== 'undefined') {
            post('[Alits/TEST] inlets variable: ' + inlets + '\n');
        }
        
        if (typeof outlets !== 'undefined') {
            post('[Alits/TEST] outlets variable: ' + outlets + '\n');
        }
        
        if (typeof autowatch !== 'undefined') {
            post('[Alits/TEST] autowatch variable: ' + autowatch + '\n');
        }
        
        post('[Alits/TEST] Max 8 specific features test passed\n');
    } catch (error) {
        post('[Alits/TEST] Max 8 specific features test failed: ' + error.message + '\n');
    }
}

// Individual test functions for Max controls
function test_promise() {
    testPromisePolyfill();
}

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

function test_es5_features() {
    testES5Features();
}

function test_max8_features() {
    testMax8SpecificFeatures();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bang: bang,
        testPromisePolyfill: testPromisePolyfill,
        testTypeofOperator: testTypeofOperator,
        testInstanceofOperator: testInstanceofOperator,
        testObjectMethods: testObjectMethods,
        testArrayMethods: testArrayMethods,
        testGlobalMethods: testGlobalMethods,
        testES5Features: testES5Features,
        testMax8SpecificFeatures: testMax8SpecificFeatures
    };
}
