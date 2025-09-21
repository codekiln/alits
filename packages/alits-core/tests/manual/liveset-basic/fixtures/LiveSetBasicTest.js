"use strict";
// LiveSet Basic Functionality Test - Max 8 Compatible
// This version avoids async/await and Promise for Max 8 compatibility

// Build identification system
function printBuildInfo() {
    post('[BUILD] Entrypoint: LiveSetBasicTest\n');
    post('[BUILD] Git: v1.0.0-5-g1234567\n');
    post('[BUILD] Timestamp: ' + new Date().toISOString() + '\n');
    post('[BUILD] Source: @alits/core debug build (non-minified)\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
    post('[BUILD] File: alits_debug.js\n');
}

// Print build info on compile
printBuildInfo();

// Import the debug @alits/core package
var core_1 = require("alits_debug.js");

// Debug: Check what core_1 contains
post('[Alits/DEBUG] core_1 keys: ' + Object.keys(core_1).join(', ') + '\n');
post('[Alits/DEBUG] core_1.LiveSet type: ' + typeof core_1.LiveSet + '\n');
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
    };
    // Test tempo change functionality (synchronous version)
    LiveSetBasicTest.prototype.testTempoChange = function (newTempo) {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }
        try {
            // Use synchronous tempo setting
            this.liveSet.tempo = newTempo;
            if (this.liveApiSet.set) {
                this.liveApiSet.set('tempo', newTempo);
            }
            else {
                this.liveApiSet.tempo = newTempo;
            }
            post("[Alits/TEST] Tempo changed to: ".concat(newTempo, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed to change tempo: ".concat(error.message, "\n"));
        }
    };
    // Test time signature change (synchronous version)
    LiveSetBasicTest.prototype.testTimeSignatureChange = function (numerator, denominator) {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }
        try {
            // Use synchronous time signature setting
            this.liveSet.timeSignature = { numerator: numerator, denominator: denominator };
            if (this.liveApiSet.set) {
                this.liveApiSet.set('time_signature_numerator', numerator);
                this.liveApiSet.set('time_signature_denominator', denominator);
            }
            else {
                this.liveApiSet.time_signature_numerator = numerator;
                this.liveApiSet.time_signature_denominator = denominator;
            }
            post("[Alits/TEST] Time signature changed to: ".concat(numerator, "/").concat(denominator, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed to change time signature: ".concat(error.message, "\n"));
        }
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
