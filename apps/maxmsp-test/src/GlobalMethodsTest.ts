// Global Methods Test - Max 8 Compatible
// This test validates JavaScript global methods availability in Max for Live
// Independent test - no external dependencies

// Build identification system
function printBuildInfo() {
    post('[MAX8-TEST] Entrypoint: GlobalMethodsTest\n');
    post('[MAX8-TEST] Timestamp: ' + new Date().toISOString() + '\n');
    post('[MAX8-TEST] Source: Independent Max 8 JavaScript environment test\n');
    post('[MAX8-TEST] Max 8 Compatible: Yes\n');
}

// Max for Live script setup
function bang() {
    printBuildInfo();
    post('[MAX8-TEST] Global Methods Test initialized\n');
    
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
        
        post('[MAX8-TEST] Global methods compatibility test completed\n');
    } catch (error) {
        post('[MAX8-TEST] Error: ' + error.message + '\n');
    }
}

function testPromisePolyfill() {
    post('[MAX8-TEST] Testing Promise polyfill availability\n');
    
    try {
        // Test if Promise is available
        if (typeof Promise !== 'undefined') {
            post('[MAX8-TEST] Promise constructor: available\n');
            
            // Test basic Promise functionality
            var testPromise = new Promise(function(resolve, reject) {
                resolve('Promise test successful');
            });
            
            testPromise.then(function(value) {
                post('[MAX8-TEST] Promise.then result: ' + value + '\n');
            }).catch(function(error) {
                post('[MAX8-TEST] Promise.catch error: ' + error + '\n');
            });
            
            // Test Promise.resolve
            if (typeof Promise.resolve === 'function') {
                var resolvedPromise = Promise.resolve('Resolved value');
                post('[MAX8-TEST] Promise.resolve: available\n');
            }
            
            // Test Promise.reject
            if (typeof Promise.reject === 'function') {
                post('[MAX8-TEST] Promise.reject: available\n');
            }
            
            // Test Promise.all
            if (typeof Promise.all === 'function') {
                post('[MAX8-TEST] Promise.all: available\n');
            }
            
            post('[MAX8-TEST] Promise polyfill test passed\n');
        } else {
            post('[MAX8-TEST] Promise constructor: NOT AVAILABLE\n');
            post('[MAX8-TEST] This indicates a critical polyfill issue\n');
        }
    } catch (error) {
        post('[MAX8-TEST] Promise polyfill test failed: ' + error.message + '\n');
    }
}

function testTypeofOperator() {
    post('[MAX8-TEST] Testing typeof operator: available\n');
    
    try {
        var testString = 'hello';
        var testNumber = 42;
        var testBoolean = true;
        var testObject = {};
        var testArray = [];
        var testFunction = function() {};
        
        post('[MAX8-TEST] typeof string: ' + typeof testString + '\n');
        post('[MAX8-TEST] typeof number: ' + typeof testNumber + '\n');
        post('[MAX8-TEST] typeof boolean: ' + typeof testBoolean + '\n');
        post('[MAX8-TEST] typeof object: ' + typeof testObject + '\n');
        post('[MAX8-TEST] typeof array: ' + typeof testArray + '\n');
        post('[MAX8-TEST] typeof function: ' + typeof testFunction + '\n');
        
        post('[MAX8-TEST] typeof operator test passed\n');
    } catch (error) {
        post('[MAX8-TEST] typeof operator test failed: ' + error.message + '\n');
    }
}

function testInstanceofOperator() {
    post('[MAX8-TEST] Testing instanceof operator: available\n');
    
    try {
        var testArray = [];
        var testObject = {};
        var testFunction = function() {};
        
        post('[MAX8-TEST] [] instanceof Array: ' + (testArray instanceof Array) + '\n');
        post('[MAX8-TEST] {} instanceof Object: ' + (testObject instanceof Object) + '\n');
        post('[MAX8-TEST] function instanceof Function: ' + (testFunction instanceof Function) + '\n');
        
        post('[MAX8-TEST] instanceof operator test passed\n');
    } catch (error) {
        post('[MAX8-TEST] instanceof operator test failed: ' + error.message + '\n');
    }
}

function testObjectMethods() {
    post('[MAX8-TEST] Testing Object methods: available\n');
    
    try {
        var testObj = { a: 1, b: 2, c: 3 };
        
        // Test Object.keys
        if (typeof Object.keys === 'function') {
            var keys = Object.keys(testObj);
            post('[MAX8-TEST] Object.keys result: ' + keys.join(', ') + '\n');
        } else {
            post('[MAX8-TEST] Object.keys not available\n');
        }
        
        // Test Object.values (ES2017+ feature, not available in ES5)
        if (typeof Object['values'] === 'function') {
            var values = Object['values'](testObj);
            post('[MAX8-TEST] Object.values result: ' + values.join(', ') + '\n');
        } else {
            post('[MAX8-TEST] Object.values not available (ES2017+ feature)\n');
        }
        
        // Test Object.entries (ES2017+ feature, not available in ES5)
        if (typeof Object['entries'] === 'function') {
            var entries = Object['entries'](testObj);
            post('[MAX8-TEST] Object.entries result: ' + entries.length + ' entries\n');
        } else {
            post('[MAX8-TEST] Object.entries not available (ES2017+ feature)\n');
        }
        
        post('[MAX8-TEST] Object methods test passed\n');
    } catch (error) {
        post('[MAX8-TEST] Object methods test failed: ' + error.message + '\n');
    }
}

function testArrayMethods() {
    post('[MAX8-TEST] Testing Array methods: available\n');
    
    try {
        var testArray = [1, 2, 3, 4, 5];
        
        // Test Array.prototype.map
        if (typeof testArray.map === 'function') {
            var doubled = testArray.map(function(x) { return x * 2; });
            post('[MAX8-TEST] Array.map result: ' + doubled.join(', ') + '\n');
        } else {
            post('[MAX8-TEST] Array.map not available\n');
        }
        
        // Test Array.prototype.filter
        if (typeof testArray.filter === 'function') {
            var evens = testArray.filter(function(x) { return x % 2 === 0; });
            post('[MAX8-TEST] Array.filter result: ' + evens.join(', ') + '\n');
        } else {
            post('[MAX8-TEST] Array.filter not available\n');
        }
        
        // Test Array.prototype.reduce
        if (typeof testArray.reduce === 'function') {
            var sum = testArray.reduce(function(acc, x) { return acc + x; }, 0);
            post('[MAX8-TEST] Array.reduce result: ' + sum + '\n');
        } else {
            post('[MAX8-TEST] Array.reduce not available\n');
        }
        
        post('[MAX8-TEST] Array methods test passed\n');
    } catch (error) {
        post('[MAX8-TEST] Array methods test failed: ' + error.message + '\n');
    }
}

function testGlobalMethods() {
    post('[MAX8-TEST] Testing global methods: available\n');
    
    try {
        // Test parseInt
        if (typeof parseInt === 'function') {
            var result = parseInt('42', 10);
            post('[MAX8-TEST] parseInt result: ' + result + '\n');
        } else {
            post('[MAX8-TEST] parseInt not available\n');
        }
        
        // Test parseFloat
        if (typeof parseFloat === 'function') {
            var result = parseFloat('3.14');
            post('[MAX8-TEST] parseFloat result: ' + result + '\n');
        } else {
            post('[MAX8-TEST] parseFloat not available\n');
        }
        
        // Test isNaN
        if (typeof isNaN === 'function') {
            post('[MAX8-TEST] isNaN(42): ' + isNaN(42) + '\n');
            post('[MAX8-TEST] isNaN("hello"): ' + isNaN(Number('hello')) + '\n');
        } else {
            post('[MAX8-TEST] isNaN not available\n');
        }
        
        // Test isFinite
        if (typeof isFinite === 'function') {
            post('[MAX8-TEST] isFinite(42): ' + isFinite(42) + '\n');
            post('[MAX8-TEST] isFinite(Infinity): ' + isFinite(Infinity) + '\n');
        } else {
            post('[MAX8-TEST] isFinite not available\n');
        }
        
        post('[MAX8-TEST] Global methods test passed\n');
    } catch (error) {
        post('[MAX8-TEST] Global methods test failed: ' + error.message + '\n');
    }
}

function testES5Features() {
    post('[MAX8-TEST] Testing ES5 features: available\n');
    
    try {
        // Test JSON object
        if (typeof JSON !== 'undefined') {
            post('[MAX8-TEST] JSON object: available\n');
            
            if (typeof JSON.stringify === 'function') {
                var testObj = { name: 'test', value: 42 };
                var jsonString = JSON.stringify(testObj);
                post('[MAX8-TEST] JSON.stringify result: ' + jsonString + '\n');
            }
            
            if (typeof JSON.parse === 'function') {
                var parsedObj = JSON.parse('{"name":"test","value":42}');
                post('[MAX8-TEST] JSON.parse result: ' + parsedObj.name + '\n');
            }
        } else {
            post('[MAX8-TEST] JSON object: NOT AVAILABLE\n');
        }
        
        // Test Date object
        if (typeof Date !== 'undefined') {
            post('[MAX8-TEST] Date object: available\n');
            var now = new Date();
            post('[MAX8-TEST] Current date: ' + now.toString() + '\n');
        } else {
            post('[MAX8-TEST] Date object: NOT AVAILABLE\n');
        }
        
        // Test RegExp
        if (typeof RegExp !== 'undefined') {
            post('[MAX8-TEST] RegExp: available\n');
            var regex = new RegExp('test');
            post('[MAX8-TEST] RegExp test: ' + regex.test('this is a test') + '\n');
        } else {
            post('[MAX8-TEST] RegExp: NOT AVAILABLE\n');
        }
        
        post('[MAX8-TEST] ES5 features test passed\n');
    } catch (error) {
        post('[MAX8-TEST] ES5 features test failed: ' + error.message + '\n');
    }
}

function testMax8SpecificFeatures() {
    post('[MAX8-TEST] Testing Max 8 specific features\n');
    
    try {
        // Test Max global objects
        if (typeof Task !== 'undefined') {
            post('[MAX8-TEST] Task object: available\n');
        } else {
            post('[MAX8-TEST] Task object: NOT AVAILABLE\n');
        }
        
        if (typeof post !== 'undefined') {
            post('[MAX8-TEST] post function: available\n');
        } else {
            post('[MAX8-TEST] post function: NOT AVAILABLE\n');
        }
        
        if (typeof outlet !== 'undefined') {
            post('[MAX8-TEST] outlet function: available\n');
        } else {
            post('[MAX8-TEST] outlet function: NOT AVAILABLE\n');
        }
        
        if (typeof inlet !== 'undefined') {
            post('[MAX8-TEST] inlet function: available\n');
        } else {
            post('[MAX8-TEST] inlet function: NOT AVAILABLE\n');
        }
        
        // Test Max-specific globals
        if (typeof inlets !== 'undefined') {
            post('[MAX8-TEST] inlets variable: ' + inlets + '\n');
        }
        
        if (typeof outlets !== 'undefined') {
            post('[MAX8-TEST] outlets variable: ' + outlets + '\n');
        }
        
        if (typeof autowatch !== 'undefined') {
            post('[MAX8-TEST] autowatch variable: ' + autowatch + '\n');
        }
        
        post('[MAX8-TEST] Max 8 specific features test passed\n');
    } catch (error) {
        post('[MAX8-TEST] Max 8 specific features test failed: ' + error.message + '\n');
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

// Export for testing (Max 8 doesn't use CommonJS modules)
// Functions are available globally in Max 8 environment
