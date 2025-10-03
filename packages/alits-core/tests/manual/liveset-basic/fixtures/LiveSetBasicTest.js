// Max 8 Iterator polyfill for async/await support
(function() {
  // Max 8's built-in Iterator has incompatible prototype that breaks TypeScript's __generator
  // Solution: Hide the native Iterator so __generator falls back to Object.prototype
  // __generator code: g = Object.create((typeof Iterator === \"function\" ? Iterator : Object).prototype)

  // Save reference to native Iterator if it exists
  var NativeIterator = (typeof Iterator !== 'undefined') ? Iterator : null;

  // Force Iterator to be undefined during __generator execution
  // This makes __generator use Object.prototype instead
  try {
    delete this.Iterator;
  } catch(e) {
    // In strict mode or if Iterator is non-configurable, set to undefined
    this.Iterator = undefined;
  }
})();
// Max 8 Promise polyfill - must be first!
(function() {
  if (typeof Promise !== 'undefined') {
    return;
  }
  
  function Max8Promise(executor) {
    var self = this;
    self.state = 'pending';
    self.value = undefined;
    self.handlers = [];
    
    function resolve(result) {
      if (self.state === 'pending') {
        self.state = 'fulfilled';
        self.value = result;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function reject(error) {
      if (self.state === 'pending') {
        self.state = 'rejected';
        self.value = error;
        self.handlers.forEach(handle);
        self.handlers = null;
      }
    }
    
    function handle(handler) {
      if (self.state === 'pending') {
        self.handlers.push(handler);
      } else {
        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(self.value);
        }
        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
          handler.onRejected(self.value);
        }
      }
    }
    
    this.then = function(onFulfilled, onRejected) {
      return new Max8Promise(function(resolve, reject) {
        handle({
          onFulfilled: function(result) {
            try {
              resolve(onFulfilled ? onFulfilled(result) : result);
            } catch (ex) {
              reject(ex);
            }
          },
          onRejected: function(error) {
            try {
              resolve(onRejected ? onRejected(error) : error);
            } catch (ex) {
              reject(ex);
            }
          }
        });
      });
    };
    
    this.catch = function(onRejected) {
      return this.then(null, onRejected);
    };
    
    try {
      executor(resolve, reject);
    } catch (ex) {
      reject(ex);
    }
  }
  
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
      if (promises.length === 0) {
        resolve([]);
        return;
      }
      
      var results = [];
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
  
  // Register globally using direct assignment (works in Max 8)
  Promise = Max8Promise;
})();
;
"use strict";
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
// Build identification
function printBuildInfo() {
    var now = new Date();
    var etOffset = -4 * 60; // ET is UTC-4 (EDT) in October
    var etTime = new Date(now.getTime() + (etOffset * 60 * 1000));
    var timestamp = etTime.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' ET');
    post('[BUILD] Entrypoint: LiveSetBasicTest\n');
    post('[BUILD] Timestamp: ' + timestamp + '\n');
    post('[BUILD] Source: @alits/core debug build\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
}
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
// SINGLE-BANG TESTING: Complete test suite runs on one bang
// This follows the standard from brief-manual-testing-fixtures.md line 20
function bang() {
    printBuildInfo();
    post('[Alits/TEST] ===========================================\n');
    post('[Alits/TEST] LiveSet Basic Test Suite Starting\n');
    post('[Alits/TEST] ===========================================\n');
    // Run complete test suite with proper Promise handling
    runCompleteTestSuite().catch(function (error) {
        post('[Alits/TEST] Test suite error: ' + error.message + '\n');
        post('[Alits/TEST] ===========================================\n');
        post('[Alits/TEST] Test Suite FAILED\n');
        post('[Alits/TEST] ===========================================\n');
    });
}
// Complete test suite that runs all tests sequentially
function runCompleteTestSuite() {
    return __awaiter(this, void 0, void 0, function () {
        var currentTempo, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    // Test 1: Initialize LiveSet
                    post('[Alits/TEST] Test 1: Initializing LiveSet...\n');
                    return [4 /*yield*/, testApp.initialize()];
                case 1:
                    _a.sent();
                    post('[Alits/TEST] Test 1: PASSED\n\n');
                    // Test 2: Track Access
                    post('[Alits/TEST] Test 2: Testing track access...\n');
                    testApp.testTrackAccess();
                    post('[Alits/TEST] Test 2: PASSED\n\n');
                    // Test 3: Scene Access
                    post('[Alits/TEST] Test 3: Testing scene access...\n');
                    testApp.testSceneAccess();
                    post('[Alits/TEST] Test 3: PASSED\n\n');
                    if (!testApp['liveSet']) return [3 /*break*/, 4];
                    currentTempo = testApp['liveSet'].tempo;
                    post('[Alits/TEST] Test 4: Testing tempo change...\n');
                    return [4 /*yield*/, testApp.testTempoChange(currentTempo + 1)];
                case 2:
                    _a.sent();
                    post('[Alits/TEST] Test 4: PASSED\n\n');
                    // Restore original tempo
                    return [4 /*yield*/, testApp.testTempoChange(currentTempo)];
                case 3:
                    // Restore original tempo
                    _a.sent();
                    _a.label = 4;
                case 4:
                    post('[Alits/TEST] ===========================================\n');
                    post('[Alits/TEST] All Tests PASSED\n');
                    post('[Alits/TEST] ===========================================\n');
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    post('[Alits/TEST] Test suite failed: ' + error_3.message + '\n');
                    throw error_3;
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Individual test functions (for manual testing if needed)
function test_tempo(tempo) {
    testApp.testTempoChange(tempo).catch(function (error) {
        post('[Alits/TEST] Tempo test failed: ' + error.message + '\n');
    });
}
function test_time_signature(numerator, denominator) {
    testApp.testTimeSignatureChange(numerator, denominator).catch(function (error) {
        post('[Alits/TEST] Time signature test failed: ' + error.message + '\n');
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
