"use strict";
// Observable Helper Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime
// Import the actual @alits/core package
var core_1 = require("alits_index.js");
// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;
var ObservableHelperTest = /** @class */ (function () {
    function ObservableHelperTest() {
        post('[Alits/TEST] Observable Helper Test initialized\n');
    }
    // Test basic property observation
    ObservableHelperTest.prototype.testBasicObservation = function () {
        try {
            // Create a mock LiveAPI object
            var mockLiveObject = {
                id: 'test_object',
                tempo: 120,
                set: function (prop, value) {
                    this[prop] = value;
                    // Simulate property change event
                    if (this.onPropertyChanged) {
                        this.onPropertyChanged(prop, value);
                    }
                },
                onPropertyChanged: null
            };
            // Test observeProperty function
            var tempoObservable = (0, core_1.observeProperty)(mockLiveObject, 'tempo');
            post('[Alits/TEST] Created tempo observable\n');
            // Test ObservablePropertyHelper class
            var helperObservable = core_1.ObservablePropertyHelper.observeProperty(mockLiveObject, 'tempo');
            post('[Alits/TEST] Created helper observable\n');
        }
        catch (error) {
            post("[Alits/TEST] Failed basic observation test: ".concat(error.message, "\n"));
        }
    };
    // Test error handling
    ObservableHelperTest.prototype.testErrorHandling = function () {
        try {
            // Test with null object
            try {
                (0, core_1.observeProperty)(null, 'tempo');
                post('[Alits/TEST] ERROR: Should have thrown for null object\n');
            }
            catch (error) {
                post("[Alits/TEST] Correctly caught null object error: ".concat(error.message, "\n"));
            }
            // Test with invalid property name
            try {
                var mockObject = { id: 'test' };
                (0, core_1.observeProperty)(mockObject, '');
                post('[Alits/TEST] ERROR: Should have thrown for empty property name\n');
            }
            catch (error) {
                post("[Alits/TEST] Correctly caught empty property error: ".concat(error.message, "\n"));
            }
            // Test with non-string property name
            try {
                var mockObject = { id: 'test' };
                (0, core_1.observeProperty)(mockObject, 123);
                post('[Alits/TEST] ERROR: Should have thrown for non-string property\n');
            }
            catch (error) {
                post("[Alits/TEST] Correctly caught non-string property error: ".concat(error.message, "\n"));
            }
        }
        catch (error) {
            post("[Alits/TEST] Failed error handling tests: ".concat(error.message, "\n"));
        }
    };
    // Test multiple property observation
    ObservableHelperTest.prototype.testMultipleProperties = function () {
        try {
            var mockLiveObject = {
                id: 'multi_test',
                tempo: 120,
                time_signature_numerator: 4,
                time_signature_denominator: 4
            };
            // Observe multiple properties
            var tempoObs = (0, core_1.observeProperty)(mockLiveObject, 'tempo');
            var numeratorObs = (0, core_1.observeProperty)(mockLiveObject, 'time_signature_numerator');
            var denominatorObs = (0, core_1.observeProperty)(mockLiveObject, 'time_signature_denominator');
            post('[Alits/TEST] Created observables for tempo, numerator, and denominator\n');
            post("[Alits/TEST] Current values - Tempo: ".concat(mockLiveObject.tempo, ", Time: ").concat(mockLiveObject.time_signature_numerator, "/").concat(mockLiveObject.time_signature_denominator, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed multiple properties test: ".concat(error.message, "\n"));
        }
    };
    // Test ObservablePropertyHelper class methods
    ObservableHelperTest.prototype.testHelperClass = function () {
        try {
            var mockLiveObject = {
                id: 'helper_test',
                volume: 0.8,
                pan: 0.0
            };
            // Test class method
            var volumeObs = core_1.ObservablePropertyHelper.observeProperty(mockLiveObject, 'volume');
            var panObs = core_1.ObservablePropertyHelper.observeProperty(mockLiveObject, 'pan');
            post('[Alits/TEST] Created helper observables for volume and pan\n');
            post("[Alits/TEST] Current values - Volume: ".concat(mockLiveObject.volume, ", Pan: ").concat(mockLiveObject.pan, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed helper class test: ".concat(error.message, "\n"));
        }
    };
    // Run all tests
    ObservableHelperTest.prototype.runAllTests = function () {
        post('[Alits/TEST] === Running Observable Helper Tests ===\n');
        this.testBasicObservation();
        this.testErrorHandling();
        this.testMultipleProperties();
        this.testHelperClass();
        post('[Alits/TEST] === Observable Helper Tests Complete ===\n');
    };
    return ObservableHelperTest;
}());
// Initialize test instance
var testApp = new ObservableHelperTest();
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
var module = {};
module.exports = {};
