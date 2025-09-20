// Observable Helper Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime

import { ObservablePropertyHelper, observeProperty, observeProperties } from '@alits/core';
import { Observable } from 'rxjs';

// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

class ObservableHelperTest {
    private mockLiveObject: any;
    private subscriptions: any[] = [];

    constructor() {
        // Create a mock LiveAPI object for testing
        this.mockLiveObject = {
            id: 'test-object',
            volume: 0.8,
            tempo: 120,
            get: (prop: string) => {
                return this.mockLiveObject[prop];
            },
            addListener: (prop: string, callback: Function) => {
                // Mock listener registration
                post(`[Alits/TEST] Added listener for ${prop}\n`);
            },
            removeListener: (prop: string, callback: Function) => {
                // Mock listener removal
                post(`[Alits/TEST] Removed listener for ${prop}\n`);
            }
        };
        
        post('[Alits/TEST] Observable Helper Test initialized\n');
    }

    // Test basic property observation
    testBasicPropertyObservation(): void {
        try {
            const observable = observeProperty(this.mockLiveObject, 'volume');
            
            if (observable instanceof Observable) {
                post('[Alits/TEST] Successfully created volume observable\n');
                
                // Subscribe to test the observable
                const subscription = observable.subscribe({
                    next: (value) => {
                        post(`[Alits/TEST] Volume changed to: ${value}\n`);
                    },
                    error: (error) => {
                        post(`[Alits/TEST] Observable error: ${error.message}\n`);
                    },
                    complete: () => {
                        post('[Alits/TEST] Observable completed\n');
                    }
                });
                
                this.subscriptions.push(subscription);
                
                // Simulate property change
                this.mockLiveObject.volume = 0.9;
                
            } else {
                post('[Alits/TEST] Failed to create volume observable\n');
            }
            
        } catch (error) {
            post(`[Alits/TEST] Failed basic property observation: ${error.message}\n`);
        }
    }

    // Test multiple property observation
    testMultiplePropertyObservation(): void {
        try {
            const observable = observeProperties(this.mockLiveObject, ['volume', 'tempo']);
            
            if (observable instanceof Observable) {
                post('[Alits/TEST] Successfully created multi-property observable\n');
                
                const subscription = observable.subscribe({
                    next: (values) => {
                        post(`[Alits/TEST] Properties changed: ${JSON.stringify(values)}\n`);
                    },
                    error: (error) => {
                        post(`[Alits/TEST] Multi-property observable error: ${error.message}\n`);
                    }
                });
                
                this.subscriptions.push(subscription);
                
            } else {
                post('[Alits/TEST] Failed to create multi-property observable\n');
            }
            
        } catch (error) {
            post(`[Alits/TEST] Failed multiple property observation: ${error.message}\n`);
        }
    }

    // Test error handling
    testErrorHandling(): void {
        try {
            const invalidObject = null;
            const observable = observeProperty(invalidObject, 'volume');
            
            if (observable instanceof Observable) {
                post('[Alits/TEST] Created observable for invalid object (should handle gracefully)\n');
                
                const subscription = observable.subscribe({
                    next: (value) => {
                        post(`[Alits/TEST] Unexpected value: ${value}\n`);
                    },
                    error: (error) => {
                        post(`[Alits/TEST] Expected error handled: ${error.message}\n`);
                    }
                });
                
                this.subscriptions.push(subscription);
                
            } else {
                post('[Alits/TEST] Failed to create observable for invalid object\n');
            }
            
        } catch (error) {
            post(`[Alits/TEST] Error handling test failed: ${error.message}\n`);
        }
    }

    // Test cleanup
    testCleanup(): void {
        try {
            post(`[Alits/TEST] Cleaning up ${this.subscriptions.length} subscriptions\n`);
            
            // Unsubscribe from all subscriptions
            this.subscriptions.forEach((subscription, index) => {
                subscription.unsubscribe();
                post(`[Alits/TEST] Unsubscribed from subscription ${index + 1}\n`);
            });
            
            this.subscriptions = [];
            
            // Test static cleanup method
            ObservablePropertyHelper.cleanupAll();
            post('[Alits/TEST] Static cleanup completed\n');
            
        } catch (error) {
            post(`[Alits/TEST] Cleanup test failed: ${error.message}\n`);
        }
    }

    // Test property change simulation
    simulatePropertyChanges(): void {
        try {
            post('[Alits/TEST] Simulating property changes...\n');
            
            // Simulate volume changes
            this.mockLiveObject.volume = 0.5;
            post('[Alits/TEST] Volume set to 0.5\n');
            
            this.mockLiveObject.volume = 1.0;
            post('[Alits/TEST] Volume set to 1.0\n');
            
            // Simulate tempo changes
            this.mockLiveObject.tempo = 140;
            post('[Alits/TEST] Tempo set to 140\n');
            
            this.mockLiveObject.tempo = 80;
            post('[Alits/TEST] Tempo set to 80\n');
            
        } catch (error) {
            post(`[Alits/TEST] Property change simulation failed: ${error.message}\n`);
        }
    }
}

// Initialize test instance
const testApp = new ObservableHelperTest();

// Expose functions to Max for Live
function bang() {
    post('[Alits/TEST] Starting Observable Helper tests...\n');
    testApp.testBasicPropertyObservation();
    testApp.testMultiplePropertyObservation();
    testApp.testErrorHandling();
    testApp.simulatePropertyChanges();
    testApp.testCleanup();
    post('[Alits/TEST] Observable Helper tests completed\n');
}

function test_basic_observation() {
    testApp.testBasicPropertyObservation();
}

function test_multiple_observation() {
    testApp.testMultiplePropertyObservation();
}

function test_error_handling() {
    testApp.testErrorHandling();
}

function simulate_changes() {
    testApp.simulatePropertyChanges();
}

function test_cleanup() {
    testApp.testCleanup();
}

// Required for Max TypeScript compilation
let module = {};
export = {};
