"use strict";
// MIDI Utilities Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime
// Import the actual @alits/core package
var core_1 = require("alits_index.js");
// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;
var MIDIUtilsTest = /** @class */ (function () {
    function MIDIUtilsTest() {
        post('[Alits/TEST] MIDI Utils Test initialized\n');
    }
    // Test note name to MIDI number conversion
    MIDIUtilsTest.prototype.testNoteNameToMidi = function () {
        try {
            // Test basic note names
            var c4 = core_1.MIDIUtils.noteNameToNumber('C4');
            var d4 = core_1.MIDIUtils.noteNameToNumber('D4');
            var e4 = core_1.MIDIUtils.noteNameToNumber('E4');
            post("[Alits/TEST] C4 = ".concat(c4, ", D4 = ").concat(d4, ", E4 = ").concat(e4, "\n"));
            // Test sharp notes
            var cSharp4 = core_1.MIDIUtils.noteNameToNumber('C#4');
            var dSharp4 = core_1.MIDIUtils.noteNameToNumber('D#4');
            post("[Alits/TEST] C#4 = ".concat(cSharp4, ", D#4 = ").concat(dSharp4, "\n"));
            // Test flat notes
            var dFlat4 = core_1.MIDIUtils.noteNameToNumber('Db4');
            var eFlat4 = core_1.MIDIUtils.noteNameToNumber('Eb4');
            post("[Alits/TEST] Db4 = ".concat(dFlat4, ", Eb4 = ").concat(eFlat4, "\n"));
            // Test octave ranges
            var c0 = core_1.MIDIUtils.noteNameToNumber('C0');
            var c8 = core_1.MIDIUtils.noteNameToNumber('C8');
            post("[Alits/TEST] C0 = ".concat(c0, ", C8 = ").concat(c8, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed note name to MIDI conversion: ".concat(error.message, "\n"));
        }
    };
    // Test MIDI number to note name conversion
    MIDIUtilsTest.prototype.testMidiToNoteName = function () {
        try {
            // Test basic MIDI numbers
            var note60 = core_1.MIDIUtils.noteNumberToName(60);
            var note61 = core_1.MIDIUtils.noteNumberToName(61);
            var note62 = core_1.MIDIUtils.noteNumberToName(62);
            post("[Alits/TEST] MIDI 60 = ".concat(note60, ", 61 = ").concat(note61, ", 62 = ").concat(note62, "\n"));
            // Test octave ranges
            var note0 = core_1.MIDIUtils.noteNumberToName(0);
            var note127 = core_1.MIDIUtils.noteNumberToName(127);
            post("[Alits/TEST] MIDI 0 = ".concat(note0, ", 127 = ").concat(note127, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed MIDI to note name conversion: ".concat(error.message, "\n"));
        }
    };
    // Test validation functions
    MIDIUtilsTest.prototype.testValidation = function () {
        try {
            // Test note name validation
            var validNote = core_1.MIDIUtils.isValidNoteName('C4');
            var invalidNote = core_1.MIDIUtils.isValidNoteName('H4');
            post("[Alits/TEST] C4 valid: ".concat(validNote, ", H4 valid: ").concat(invalidNote, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed validation tests: ".concat(error.message, "\n"));
        }
    };
    // Test error handling
    MIDIUtilsTest.prototype.testErrorHandling = function () {
        try {
            // Test invalid note name
            try {
                core_1.MIDIUtils.noteNameToNumber('InvalidNote');
                post('[Alits/TEST] ERROR: Should have thrown for invalid note\n');
            }
            catch (error) {
                post("[Alits/TEST] Correctly caught error: ".concat(error.message, "\n"));
            }
            // Test invalid MIDI number
            try {
                core_1.MIDIUtils.noteNumberToName(-1);
                post('[Alits/TEST] ERROR: Should have thrown for negative MIDI\n');
            }
            catch (error) {
                post("[Alits/TEST] Correctly caught error: ".concat(error.message, "\n"));
            }
        }
        catch (error) {
            post("[Alits/TEST] Failed error handling tests: ".concat(error.message, "\n"));
        }
    };
    // Run all tests
    MIDIUtilsTest.prototype.runAllTests = function () {
        post('[Alits/TEST] === Running MIDI Utils Tests ===\n');
        this.testNoteNameToMidi();
        this.testMidiToNoteName();
        this.testValidation();
        this.testErrorHandling();
        post('[Alits/TEST] === MIDI Utils Tests Complete ===\n');
    };
    return MIDIUtilsTest;
}());
// Initialize test instance
var testApp = new MIDIUtilsTest();
// Expose functions to Max for Live
function bang() {
    testApp.runAllTests();
}
function test_note_to_midi(noteName) {
    try {
        var midiNumber = core_1.MIDIUtils.noteNameToNumber(noteName);
        post("[Alits/TEST] ".concat(noteName, " = MIDI ").concat(midiNumber, "\n"));
    }
    catch (error) {
        post("[Alits/TEST] Error: ".concat(error.message, "\n"));
    }
}
function test_midi_to_note(midiNumber) {
    try {
        var noteName = core_1.MIDIUtils.noteNumberToName(midiNumber);
        post("[Alits/TEST] MIDI ".concat(midiNumber, " = ").concat(noteName, "\n"));
    }
    catch (error) {
        post("[Alits/TEST] Error: ".concat(error.message, "\n"));
    }
}
function test_validation() {
    testApp.testValidation();
}
function test_errors() {
    testApp.testErrorHandling();
}
// Required for Max TypeScript compilation
var module = {};
module.exports = {};
