// Observable Helper Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime

// Import the actual @alits/core package
import { ObservablePropertyHelper, observeProperty } from '@alits/core';

// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

class ObservableHelperTest {
    constructor() {
        post('[Alits/TEST] Observable Helper Test initialized\n');
    }

    // Test basic property observation
    testBasicObservation(): void {
        try {
            // Create a mock LiveAPI object
            const mockLiveObject = {
                id: 'test_object',
                tempo: 120,
                set: function(prop: string, value: any) {
                    this[prop] = value;
                    // Simulate property change event
                    if (this.onPropertyChanged) {
                        this.onPropertyChanged(prop, value);
                    }
                },
                onPropertyChanged: null
            };

            // Test observeProperty function
            const tempoObservable = observeProperty<number>(mockLiveObject, 'tempo');
            
            post('[Alits/TEST] Created tempo observable\n');
            
            // Test ObservablePropertyHelper class
            const helperObservable = ObservablePropertyHelper.observeProperty<number>(mockLiveObject, 'tempo');
            
            post('[Alits/TEST] Created helper observable\n');
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed basic observation test: ${error.message}\n`);
        }
    }

    // Test error handling
    testErrorHandling(): void {
        try {
            // Test with null object
            try {
                observeProperty(null, 'tempo');
                post('[Alits/TEST] ERROR: Should have thrown for null object\n');
            } catch (error: any) {
                post(`[Alits/TEST] Correctly caught null object error: ${error.message}\n`);
            }

            // Test with invalid property name
            try {
                const mockObject = { id: 'test' };
                observeProperty(mockObject, '');
                post('[Alits/TEST] ERROR: Should have thrown for empty property name\n');
            } catch (error: any) {
                post(`[Alits/TEST] Correctly caught empty property error: ${error.message}\n`);
            }

            // Test with non-string property name
            try {
                const mockObject = { id: 'test' };
                observeProperty(mockObject, 123 as any);
                post('[Alits/TEST] ERROR: Should have thrown for non-string property\n');
            } catch (error: any) {
                post(`[Alits/TEST] Correctly caught non-string property error: ${error.message}\n`);
            }

        } catch (error: any) {
            post(`[Alits/TEST] Failed error handling tests: ${error.message}\n`);
        }
    }

    // Test multiple property observation
    testMultipleProperties(): void {
        try {
            const mockLiveObject = {
                id: 'multi_test',
                tempo: 120,
                time_signature_numerator: 4,
                time_signature_denominator: 4
            };

            // Observe multiple properties
            const tempoObs = observeProperty<number>(mockLiveObject, 'tempo');
            const numeratorObs = observeProperty<number>(mockLiveObject, 'time_signature_numerator');
            const denominatorObs = observeProperty<number>(mockLiveObject, 'time_signature_denominator');

            post('[Alits/TEST] Created observables for tempo, numerator, and denominator\n');
            post(`[Alits/TEST] Current values - Tempo: ${mockLiveObject.tempo}, Time: ${mockLiveObject.time_signature_numerator}/${mockLiveObject.time_signature_denominator}\n`);

        } catch (error: any) {
            post(`[Alits/TEST] Failed multiple properties test: ${error.message}\n`);
        }
    }

    // Test ObservablePropertyHelper class methods
    testHelperClass(): void {
        try {
            const mockLiveObject = {
                id: 'helper_test',
                volume: 0.8,
                pan: 0.0
            };

            // Test class method
            const volumeObs = ObservablePropertyHelper.observeProperty<number>(mockLiveObject, 'volume');
            const panObs = ObservablePropertyHelper.observeProperty<number>(mockLiveObject, 'pan');

            post('[Alits/TEST] Created helper observables for volume and pan\n');
            post(`[Alits/TEST] Current values - Volume: ${mockLiveObject.volume}, Pan: ${mockLiveObject.pan}\n`);

        } catch (error: any) {
            post(`[Alits/TEST] Failed helper class test: ${error.message}\n`);
        }
    }

    // Run all tests
    runAllTests(): void {
        post('[Alits/TEST] === Running Observable Helper Tests ===\n');
        
        this.testBasicObservation();
        this.testErrorHandling();
        this.testMultipleProperties();
        this.testHelperClass();
        
        post('[Alits/TEST] === Observable Helper Tests Complete ===\n');
    }
}

// Initialize test instance
const testApp = new ObservableHelperTest();

// Expose functions to Max for Live
function bang() {
    testApp.runAllTests();
}

function test_basic() {
    testApp.testBasicObservation();
}

function test_errors() {
    testApp.testErrorHandling();
}

function test_multiple() {
    testApp.testMultipleProperties();
}

function test_helper() {
    testApp.testHelperClass();
}

// Required for Max TypeScript compilation
let module = {};
export = {};