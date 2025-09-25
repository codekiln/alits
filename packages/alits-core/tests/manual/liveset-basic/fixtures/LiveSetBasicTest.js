// Max 8 compatible Promise polyfill
// Uses Max's Task object instead of setTimeout
// Always execute to ensure Promise is properly defined

var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';

function Max8Promise(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.handlers = [];
    
    var self = this;
    try {
        executor(
            function(value) { self.resolve(value); },
            function(reason) { self.reject(reason); }
        );
    } catch (error) {
        self.reject(error);
    }
}
    
    Max8Promise.prototype.resolve = function(value) {
        if (this.state === PENDING) {
            this.state = FULFILLED;
            this.value = value;
            this.executeHandlers();
        }
    };
    
    Max8Promise.prototype.reject = function(reason) {
        if (this.state === PENDING) {
            this.state = REJECTED;
            this.value = reason;
            this.executeHandlers();
        }
    };
    
    Max8Promise.prototype.executeHandlers = function() {
        var self = this;
        var handlers = this.handlers.slice();
        this.handlers = [];
        
        // Use Max Task object for async execution
        var task = new Task(function() {
            handlers.forEach(function(handler) {
                try {
                    if (self.state === FULFILLED) {
                        handler.onFulfilled(self.value);
                    } else if (self.state === REJECTED) {
                        handler.onRejected(self.value);
                    }
                } catch (error) {
                    // Handle errors in handlers
                }
            });
        }, this);
        
        task.schedule(0); // Execute on next tick
    };
    
    Max8Promise.prototype.then = function(onFulfilled, onRejected) {
        var self = this;
        
        return new Max8Promise(function(resolve, reject) {
            var handler = {
                onFulfilled: function(value) {
                    try {
                        if (typeof onFulfilled === 'function') {
                            resolve(onFulfilled(value));
                        } else {
                            resolve(value);
                        }
                    } catch (error) {
                        reject(error);
                    }
                },
                onRejected: function(reason) {
                    try {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected(reason));
                        } else {
                            reject(reason);
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
            };
            
            if (self.state === PENDING) {
                self.handlers.push(handler);
            } else {
                self.executeHandlers();
            }
        });
    };
    
    Max8Promise.prototype.catch = function(onRejected) {
        return this.then(null, onRejected);
    };
    
    Max8Promise.resolve = function(value) {
        return new Max8Promise(function(resolve) {
            resolve(value);
        });
    };
    
    Max8Promise.reject = function(reason) {
        return new Max8Promise(function(resolve, reject) {
            reject(reason);
        });
    };
    
    Max8Promise.all = function(promises) {
        return new Max8Promise(function(resolve, reject) {
            if (!Array.isArray(promises)) {
                reject(new TypeError('Promise.all requires an array'));
                return;
            }
            
            if (promises.length === 0) {
                resolve([]);
                return;
            }
            
            var results = new Array(promises.length);
            var completed = 0;
            
            promises.forEach(function(promise, index) {
                Max8Promise.resolve(promise).then(function(value) {
                    results[index] = value;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                }, reject);
            });
        });
    };
    
    // Set global Promise - Max 8 compatible
    // Always declare Promise globally to ensure it's accessible
    var Promise = Max8Promise;


"use strict";
// LiveSet Basic Functionality Test - Max 8 Compatible with Promise Polyfill
// This version uses async/await with the Max 8 Promise polyfill
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Import the actual @alits/core package (includes Promise polyfill and declarations)
var core_1 = require("alits_index.js");
// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;
var LiveSetBasicTest = /** @class */ (function () {
    function LiveSetBasicTest() {
        this.liveSet = null;
        this.liveApiSet = new LiveAPI('live_set');
    }
    LiveSetBasicTest.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.liveSet = new core_1.LiveSet(this.liveApiSet);
                    // LiveSet initializes automatically in constructor
                    post('[Alits/TEST] LiveSet initialized successfully\n');
                    post("[Alits/TEST] Tempo: ".concat(this.liveSet.tempo, "\n"));
                    post("[Alits/TEST] Time Signature: ".concat(this.liveSet.timeSignature.numerator, "/").concat(this.liveSet.timeSignature.denominator, "\n"));
                    post("[Alits/TEST] Tracks: ".concat(this.liveSet.tracks.length, "\n"));
                    post("[Alits/TEST] Scenes: ".concat(this.liveSet.scenes.length, "\n"));
                }
                catch (error) {
                    post("[Alits/TEST] Failed to initialize LiveSet: ".concat(error.message, "\n"));
                }
                return [2 /*return*/];
            });
        });
    };
    // Test tempo change functionality
    LiveSetBasicTest.prototype.testTempoChange = function (newTempo) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.liveSet) {
                            post('[Alits/TEST] LiveSet not initialized\n');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.liveSet.setTempo(newTempo)];
                    case 2:
                        _a.sent();
                        post("[Alits/TEST] Tempo changed to: ".concat(newTempo, "\n"));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        post("[Alits/TEST] Failed to change tempo: ".concat(error_1.message, "\n"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Test time signature change
    LiveSetBasicTest.prototype.testTimeSignatureChange = function (numerator, denominator) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.liveSet) {
                            post('[Alits/TEST] LiveSet not initialized\n');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.liveSet.setTimeSignature(numerator, denominator)];
                    case 2:
                        _a.sent();
                        post("[Alits/TEST] Time signature changed to: ".concat(numerator, "/").concat(denominator, "\n"));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        post("[Alits/TEST] Failed to change time signature: ".concat(error_2.message, "\n"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Test track access
    LiveSetBasicTest.prototype.testTrackAccess = function () {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }
        try {
            var tracks = this.liveSet.tracks;
            post("[Alits/TEST] Found ".concat(tracks.length, " tracks\n"));
            if (tracks.length > 0) {
                var firstTrack = tracks[0];
                post("[Alits/TEST] First track: ".concat(firstTrack.name || 'Unnamed', "\n"));
            }
        }
        catch (error) {
            post("[Alits/TEST] Failed to access tracks: ".concat(error.message, "\n"));
        }
    };
    // Test scene access
    LiveSetBasicTest.prototype.testSceneAccess = function () {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }
        try {
            var scenes = this.liveSet.scenes;
            post("[Alits/TEST] Found ".concat(scenes.length, " scenes\n"));
            if (scenes.length > 0) {
                var firstScene = scenes[0];
                post("[Alits/TEST] First scene: ".concat(firstScene.name || 'Unnamed', "\n"));
            }
        }
        catch (error) {
            post("[Alits/TEST] Failed to access scenes: ".concat(error.message, "\n"));
        }
    };
    return LiveSetBasicTest;
}());
// Initialize test instance
var testApp = new LiveSetBasicTest();
// Expose functions to Max for Live
function bang() {
    post('[Alits/TEST] ===========================================\n');
    post('[Alits/TEST] LiveSet Basic Test Suite Starting\n');
    post('[Alits/TEST] ===========================================\n');
    // Test if Promise polyfill is working
    post('[Alits/TEST] DEBUG: Testing Promise polyfill...\n');
    try {
        var testPromise_1 = new Promise(function (resolve) {
            post('[Alits/TEST] DEBUG: Promise constructor works\n');
            resolve('test');
        });
        // Use Max Task object to handle Promise resolution
        var task = new Task(function () {
            testPromise_1.then(function (result) {
                post("[Alits/TEST] DEBUG: Promise.then() works, result: ".concat(result, "\n"));
                // Now run the actual test suite
                runCompleteTestSuite().then(function () {
                    post('[Alits/TEST] ===========================================\n');
                    post('[Alits/TEST] Test Suite COMPLETED Successfully\n');
                    post('[Alits/TEST] ===========================================\n');
                }).catch(function (error) {
                    post("[Alits/TEST] Test suite error: ".concat(error.message, "\n"));
                    post('[Alits/TEST] ===========================================\n');
                    post('[Alits/TEST] Test Suite FAILED\n');
                    post('[Alits/TEST] ===========================================\n');
                });
            }).catch(function (error) {
                post("[Alits/TEST] DEBUG: Promise test failed: ".concat(error.message, "\n"));
            });
        });
        // Schedule the task to run immediately
        task.schedule(0);
    }
    catch (error) {
        post("[Alits/TEST] DEBUG: Promise constructor failed: ".concat(error.message, "\n"));
    }
    post('[Alits/TEST] DEBUG: bang() function completed\n');
}
// Run the complete test suite
function runCompleteTestSuite() {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post('[Alits/TEST] DEBUG: runCompleteTestSuite started\n');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    // Step 1: Initialize LiveSet
                    post('[Alits/TEST] Step 1: Initializing LiveSet...\n');
                    return [4 /*yield*/, testApp.initialize()];
                case 2:
                    _a.sent();
                    post('[Alits/TEST] DEBUG: initialize() completed\n');
                    // Step 2: Test tempo functionality
                    post('[Alits/TEST] Step 2: Testing tempo functionality...\n');
                    return [4 /*yield*/, testApp.testTempoChange(120)];
                case 3:
                    _a.sent();
                    post('[Alits/TEST] DEBUG: first tempo test completed\n');
                    return [4 /*yield*/, testApp.testTempoChange(140)];
                case 4:
                    _a.sent();
                    post('[Alits/TEST] DEBUG: second tempo test completed\n');
                    // Step 3: Test time signature functionality
                    post('[Alits/TEST] Step 3: Testing time signature functionality...\n');
                    return [4 /*yield*/, testApp.testTimeSignatureChange(4, 4)];
                case 5:
                    _a.sent();
                    post('[Alits/TEST] DEBUG: first time signature test completed\n');
                    return [4 /*yield*/, testApp.testTimeSignatureChange(3, 4)];
                case 6:
                    _a.sent();
                    post('[Alits/TEST] DEBUG: second time signature test completed\n');
                    // Step 4: Test track access
                    post('[Alits/TEST] Step 4: Testing track access...\n');
                    testApp.testTrackAccess();
                    post('[Alits/TEST] DEBUG: track access test completed\n');
                    // Step 5: Test scene access
                    post('[Alits/TEST] Step 5: Testing scene access...\n');
                    testApp.testSceneAccess();
                    post('[Alits/TEST] DEBUG: scene access test completed\n');
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    post("[Alits/TEST] DEBUG: Error caught in runCompleteTestSuite: ".concat(error_3.message, "\n"));
                    post("[Alits/TEST] DEBUG: Error stack: ".concat(error_3.stack || 'No stack trace', "\n"));
                    post("[Alits/TEST] Test suite failed: ".concat(error_3.message, "\n"));
                    throw error_3;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function test_tempo(tempo) {
    testApp.testTempoChange(tempo).catch(function (error) {
        post("[Alits/TEST] Tempo test error: ".concat(error.message, "\n"));
    });
}
function test_time_signature(numerator, denominator) {
    testApp.testTimeSignatureChange(numerator, denominator).catch(function (error) {
        post("[Alits/TEST] Time signature test error: ".concat(error.message, "\n"));
    });
}
function test_tracks() {
    testApp.testTrackAccess();
}
function test_scenes() {
    testApp.testSceneAccess();
}
// Required for Max TypeScript compilation
var module = {};
module.exports = {};
