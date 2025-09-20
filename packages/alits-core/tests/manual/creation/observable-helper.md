# Fixture Creation: Observable Helper Test

## Purpose
To create a fixture device that demonstrates the `observeProperty<T>()` helper functionality within the Max for Live runtime.

## Prerequisites
- Ableton Live with Max for Live installed
- `@alits/core` package built and available
- Max for Live device creation permissions

## Steps

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "Observable Helper Test"

### 2. Add JavaScript Object
1. Add a `js` object to the Max device
2. Set the file path to `observable-helper-test.js` (will be created in fixtures directory)

### 3. Create Test Script
Create `observable-helper-test.js` with the following content:

```javascript
// Observable Helper Test
// This script tests the observeProperty<T>() helper functionality in Max for Live runtime

// Import the @alits/core package
const { observeProperty } = require('@alits/core');

// Test configuration
let testResults = [];
let activeSubscriptions = [];

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

// Mock LiveAPI object for testing
class MockLiveAPI {
    constructor() {
        this.properties = {
            'live_set.tracks.0.name': 'Track 1',
            'live_set.tracks.1.name': 'Track 2',
            'live_set.tempo': 120,
            'live_set.scenes.0.name': 'Scene 1'
        };
        this.observers = new Map();
    }
    
    // Mock property getter
    getProperty(path) {
        return this.properties[path] || null;
    }
    
    // Mock property setter
    setProperty(path, value) {
        this.properties[path] = value;
        this.notifyObservers(path, value);
    }
    
    // Mock observer registration
    addPropertyObserver(path, callback) {
        if (!this.observers.has(path)) {
            this.observers.set(path, []);
        }
        this.observers.get(path).push(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.observers.get(path);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        };
    }
    
    // Mock observer notification
    notifyObservers(path, value) {
        const callbacks = this.observers.get(path);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(value);
                } catch (error) {
                    post(`[Alits/TEST] Observer error: ${error.message}`);
                }
            });
        }
    }
}

// Create mock LiveAPI instance
const mockLiveAPI = new MockLiveAPI();

// Test 1: Basic Observable Creation
function testBasicObservableCreation() {
    try {
        logTest('Basic Observable Creation', 'RUNNING', 'Testing observeProperty basic functionality');
        
        const observable = observeProperty('live_set.tempo', mockLiveAPI);
        
        if (observable && typeof observable.subscribe === 'function') {
            logTest('Basic Observable Creation', 'PASS', 'Observable created successfully with subscribe method');
            return observable;
        } else {
            logTest('Basic Observable Creation', 'FAIL', 'Observable created but missing subscribe method');
            return null;
        }
    } catch (error) {
        logTest('Basic Observable Creation', 'FAIL', `Error: ${error.message}`);
        return null;
    }
}

// Test 2: Observable Subscription and Values
function testObservableSubscription(observable) {
    if (!observable) {
        logTest('Observable Subscription', 'SKIP', 'Observable not available');
        return;
    }
    
    try {
        logTest('Observable Subscription', 'RUNNING', 'Testing observable subscription and value emission');
        
        let receivedValues = [];
        let completed = false;
        let error = null;
        
        const subscription = observable.subscribe({
            next: (value) => {
                receivedValues.push(value);
                post(`[Alits/TEST] Received value: ${value}`);
            },
            complete: () => {
                completed = true;
                post(`[Alits/TEST] Observable completed`);
            },
            error: (err) => {
                error = err;
                post(`[Alits/TEST] Observable error: ${err.message}`);
            }
        });
        
        // Store subscription for cleanup
        activeSubscriptions.push(subscription);
        
        // Wait a bit for initial value
        setTimeout(() => {
            if (receivedValues.length > 0) {
                logTest('Observable Subscription', 'PASS', `Received ${receivedValues.length} values, initial value: ${receivedValues[0]}`);
            } else {
                logTest('Observable Subscription', 'FAIL', 'No values received from observable');
            }
        }, 100);
        
    } catch (error) {
        logTest('Observable Subscription', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 3: Property Change Notification
function testPropertyChangeNotification(observable) {
    if (!observable) {
        logTest('Property Change Notification', 'SKIP', 'Observable not available');
        return;
    }
    
    try {
        logTest('Property Change Notification', 'RUNNING', 'Testing property change notifications');
        
        let changeCount = 0;
        let lastValue = null;
        
        const subscription = observable.subscribe({
            next: (value) => {
                changeCount++;
                lastValue = value;
                post(`[Alits/TEST] Property changed to: ${value}`);
            }
        });
        
        activeSubscriptions.push(subscription);
        
        // Trigger property changes
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 130);
        }, 200);
        
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 140);
        }, 300);
        
        setTimeout(() => {
            if (changeCount >= 2) {
                logTest('Property Change Notification', 'PASS', `Received ${changeCount} changes, last value: ${lastValue}`);
            } else {
                logTest('Property Change Notification', 'FAIL', `Expected at least 2 changes, got ${changeCount}`);
            }
        }, 400);
        
    } catch (error) {
        logTest('Property Change Notification', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 4: Observable Operators
function testObservableOperators(observable) {
    if (!observable) {
        logTest('Observable Operators', 'SKIP', 'Observable not available');
        return;
    }
    
    try {
        logTest('Observable Operators', 'RUNNING', 'Testing observable operators (map, filter)');
        
        let mappedValues = [];
        let filteredValues = [];
        
        // Test map operator
        const mappedObservable = observable.map(value => value * 2);
        const mapSubscription = mappedObservable.subscribe({
            next: (value) => {
                mappedValues.push(value);
                post(`[Alits/TEST] Mapped value: ${value}`);
            }
        });
        activeSubscriptions.push(mapSubscription);
        
        // Test filter operator
        const filteredObservable = observable.filter(value => value > 125);
        const filterSubscription = filteredObservable.subscribe({
            next: (value) => {
                filteredValues.push(value);
                post(`[Alits/TEST] Filtered value: ${value}`);
            }
        });
        activeSubscriptions.push(filterSubscription);
        
        // Trigger changes
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 130);
        }, 500);
        
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 120);
        }, 600);
        
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 140);
        }, 700);
        
        setTimeout(() => {
            if (mappedValues.length > 0 && filteredValues.length > 0) {
                logTest('Observable Operators', 'PASS', `Map: ${mappedValues.length} values, Filter: ${filteredValues.length} values`);
            } else {
                logTest('Observable Operators', 'FAIL', `Map: ${mappedValues.length} values, Filter: ${filteredValues.length} values`);
            }
        }, 800);
        
    } catch (error) {
        logTest('Observable Operators', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 5: Subscription Cleanup
function testSubscriptionCleanup(observable) {
    if (!observable) {
        logTest('Subscription Cleanup', 'SKIP', 'Observable not available');
        return;
    }
    
    try {
        logTest('Subscription Cleanup', 'RUNNING', 'Testing subscription cleanup and unsubscription');
        
        let cleanupTestValues = [];
        
        const subscription = observable.subscribe({
            next: (value) => {
                cleanupTestValues.push(value);
                post(`[Alits/TEST] Cleanup test value: ${value}`);
            }
        });
        
        // Trigger a change
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 150);
        }, 900);
        
        // Unsubscribe after receiving first value
        setTimeout(() => {
            if (cleanupTestValues.length > 0) {
                subscription.unsubscribe();
                post(`[Alits/TEST] Subscription unsubscribed`);
            }
        }, 950);
        
        // Trigger another change after unsubscription
        setTimeout(() => {
            mockLiveAPI.setProperty('live_set.tempo', 160);
        }, 1000);
        
        setTimeout(() => {
            const valuesAfterUnsubscribe = cleanupTestValues.length;
            if (valuesAfterUnsubscribe === 1) {
                logTest('Subscription Cleanup', 'PASS', 'Subscription properly cleaned up, no values after unsubscribe');
            } else {
                logTest('Subscription Cleanup', 'FAIL', `Expected 1 value, got ${valuesAfterUnsubscribe} after unsubscribe`);
            }
        }, 1100);
        
    } catch (error) {
        logTest('Subscription Cleanup', 'FAIL', `Error: ${error.message}`);
    }
}

// Test 6: Error Handling
function testErrorHandling() {
    try {
        logTest('Error Handling', 'RUNNING', 'Testing error handling in observables');
        
        // Create observable with invalid path
        const invalidObservable = observeProperty('invalid.path', mockLiveAPI);
        
        let errorReceived = false;
        
        const subscription = invalidObservable.subscribe({
            next: (value) => {
                post(`[Alits/TEST] Unexpected value from invalid path: ${value}`);
            },
            error: (error) => {
                errorReceived = true;
                post(`[Alits/TEST] Expected error received: ${error.message}`);
            }
        });
        
        activeSubscriptions.push(subscription);
        
        setTimeout(() => {
            if (errorReceived) {
                logTest('Error Handling', 'PASS', 'Error properly handled for invalid path');
            } else {
                logTest('Error Handling', 'FAIL', 'No error received for invalid path');
            }
        }, 1200);
        
    } catch (error) {
        logTest('Error Handling', 'FAIL', `Error: ${error.message}`);
    }
}

// Cleanup function
function cleanupSubscriptions() {
    activeSubscriptions.forEach(subscription => {
        try {
            subscription.unsubscribe();
        } catch (error) {
            post(`[Alits/TEST] Cleanup error: ${error.message}`);
        }
    });
    activeSubscriptions = [];
}

// Main test runner
function runAllTests() {
    post('[Alits/TEST] Starting Observable Helper Tests');
    post('[Alits/TEST] ===========================================');
    
    // Run tests in sequence with delays
    const observable = testBasicObservableCreation();
    
    setTimeout(() => {
        testObservableSubscription(observable);
    }, 50);
    
    setTimeout(() => {
        testPropertyChangeNotification(observable);
    }, 100);
    
    setTimeout(() => {
        testObservableOperators(observable);
    }, 150);
    
    setTimeout(() => {
        testSubscriptionCleanup(observable);
    }, 200);
    
    setTimeout(() => {
        testErrorHandling();
    }, 250);
    
    // Final summary after all tests complete
    setTimeout(() => {
        const passed = testResults.filter(r => r.status === 'PASS').length;
        const failed = testResults.filter(r => r.status === 'FAIL').length;
        const skipped = testResults.filter(r => r.status === 'SKIP').length;
        
        post('[Alits/TEST] ===========================================');
        post(`[Alits/TEST] Summary: ${passed} passed, ${failed} failed, ${skipped} skipped`);
        
        if (failed === 0) {
            post('[Alits/TEST] All Observable helper tests passed!');
        } else {
            post(`[Alits/TEST] ${failed} test(s) failed - see details above`);
        }
        
        // Cleanup
        cleanupSubscriptions();
    }, 1500);
}

// Export test results for external access
function getTestResults() {
    return testResults;
}

// Start tests when script loads
runAllTests();
```

### 4. Save Device
1. Save the device as `ObservableHelperTest.amxd` in the fixtures directory
2. Ensure the device is properly saved and can be loaded

### 5. Test Script Location
The test script will be saved as `packages/alits-core/tests/manual/fixtures/observable-helper-test.js`

## Expected Behavior
When the device is loaded in Ableton Live:
1. It should create observables successfully
2. It should emit initial values and handle property changes
3. It should support Observable operators (map, filter)
4. It should properly clean up subscriptions
5. It should handle errors gracefully
6. It should log test results to the Max console

## Verification
- Check Max console for `[Alits/TEST]` log messages
- All tests should show "PASS" status
- No JavaScript errors should occur
- Device should load without crashing Max for Live

## Troubleshooting
- If Observable creation fails, check that RxJS is properly installed
- If subscription fails, verify the observeProperty implementation
- If errors occur, check Max console for detailed error messages
