"use strict";
// LiveSet Basic Functionality Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime
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
// Import the actual @alits/core package
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
    testApp.initialize();
}
function test_tempo(tempo) {
    testApp.testTempoChange(tempo);
}
function test_time_signature(numerator, denominator) {
    testApp.testTimeSignatureChange(numerator, denominator);
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
