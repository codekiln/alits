"use strict";
// MIDI Utilities Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime
// Mock MIDIUtils class for testing (will be replaced with actual import when bundling is ready)
var MIDIUtils = /** @class */ (function () {
    function MIDIUtils() {
    }
    MIDIUtils.noteNameToMidi = function (noteName) {
        var noteMap = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
            'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
        };
        var match = noteName.match(/^([A-G][#b]?)(\d+)$/);
        if (!match) {
            throw new Error("Invalid note name: ".concat(noteName));
        }
        var note = match[1], octave = match[2];
        var noteValue = noteMap[note];
        if (noteValue === undefined) {
            throw new Error("Invalid note: ".concat(note));
        }
        return noteValue + (parseInt(octave) * 12);
    };
    MIDIUtils.midiToNoteName = function (midiNumber, useSharps) {
        if (useSharps === void 0) { useSharps = true; }
        if (midiNumber < 0 || midiNumber > 127) {
            throw new Error("Invalid MIDI number: ".concat(midiNumber));
        }
        var octave = Math.floor(midiNumber / 12);
        var noteValue = midiNumber % 12;
        var sharpNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        var flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
        var notes = useSharps ? sharpNotes : flatNotes;
        return notes[noteValue] + octave;
    };
    MIDIUtils.isValidNoteName = function (noteName) {
        try {
            this.noteNameToMidi(noteName);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    MIDIUtils.isValidMidiNumber = function (midiNumber) {
        return midiNumber >= 0 && midiNumber <= 127;
    };
    return MIDIUtils;
}());
// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;
var MidiUtilsTest = /** @class */ (function () {
    function MidiUtilsTest() {
        post('[Alits/TEST] MIDI Utils Test initialized\n');
    }
    // Test note name to MIDI number conversion
    MidiUtilsTest.prototype.testNoteNameToMidi = function () {
        try {
            // Test basic note names
            var c4 = MIDIUtils.noteNameToMidi('C4');
            var d4 = MIDIUtils.noteNameToMidi('D4');
            var e4 = MIDIUtils.noteNameToMidi('E4');
            post("[Alits/TEST] C4 = ".concat(c4, ", D4 = ").concat(d4, ", E4 = ").concat(e4, "\n"));
            // Test sharp notes
            var cSharp4 = MIDIUtils.noteNameToMidi('C#4');
            var dSharp4 = MIDIUtils.noteNameToMidi('D#4');
            post("[Alits/TEST] C#4 = ".concat(cSharp4, ", D#4 = ").concat(dSharp4, "\n"));
            // Test flat notes
            var dFlat4 = MIDIUtils.noteNameToMidi('Db4');
            var eFlat4 = MIDIUtils.noteNameToMidi('Eb4');
            post("[Alits/TEST] Db4 = ".concat(dFlat4, ", Eb4 = ").concat(eFlat4, "\n"));
            // Test octave ranges
            var c0 = MIDIUtils.noteNameToMidi('C0');
            var c8 = MIDIUtils.noteNameToMidi('C8');
            post("[Alits/TEST] C0 = ".concat(c0, ", C8 = ").concat(c8, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed note name to MIDI conversion: ".concat(error.message, "\n"));
        }
    };
    // Test MIDI number to note name conversion
    MidiUtilsTest.prototype.testMidiToNoteName = function () {
        try {
            // Test basic MIDI numbers
            var note60 = MIDIUtils.midiToNoteName(60);
            var note61 = MIDIUtils.midiToNoteName(61);
            var note62 = MIDIUtils.midiToNoteName(62);
            post("[Alits/TEST] MIDI 60 = ".concat(note60, ", 61 = ").concat(note61, ", 62 = ").concat(note62, "\n"));
            // Test sharp notes
            var note61Sharp = MIDIUtils.midiToNoteName(61, true);
            var note63Sharp = MIDIUtils.midiToNoteName(63, true);
            post("[Alits/TEST] MIDI 61 (sharp) = ".concat(note61Sharp, ", 63 (sharp) = ").concat(note63Sharp, "\n"));
            // Test flat notes
            var note61Flat = MIDIUtils.midiToNoteName(61, false);
            var note63Flat = MIDIUtils.midiToNoteName(63, false);
            post("[Alits/TEST] MIDI 61 (flat) = ".concat(note61Flat, ", 63 (flat) = ").concat(note63Flat, "\n"));
            // Test octave ranges
            var note12 = MIDIUtils.midiToNoteName(12);
            var note108 = MIDIUtils.midiToNoteName(108);
            post("[Alits/TEST] MIDI 12 = ".concat(note12, ", 108 = ").concat(note108, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed MIDI to note name conversion: ".concat(error.message, "\n"));
        }
    };
    // Test note validation
    MidiUtilsTest.prototype.testNoteValidation = function () {
        try {
            // Test valid notes
            var isValidC4 = MIDIUtils.isValidNoteName('C4');
            var isValidCSharp4 = MIDIUtils.isValidNoteName('C#4');
            var isValidDb4 = MIDIUtils.isValidNoteName('Db4');
            post("[Alits/TEST] Valid notes - C4: ".concat(isValidC4, ", C#4: ").concat(isValidCSharp4, ", Db4: ").concat(isValidDb4, "\n"));
            // Test invalid notes
            var isInvalidH4 = MIDIUtils.isValidNoteName('H4');
            var isInvalidCSharpSharp4 = MIDIUtils.isValidNoteName('C##4');
            var isInvalidEmpty = MIDIUtils.isValidNoteName('');
            post("[Alits/TEST] Invalid notes - H4: ".concat(isInvalidH4, ", C##4: ").concat(isInvalidCSharpSharp4, ", empty: ").concat(isInvalidEmpty, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed note validation: ".concat(error.message, "\n"));
        }
    };
    // Test MIDI range validation
    MidiUtilsTest.prototype.testMidiRangeValidation = function () {
        try {
            // Test valid MIDI numbers
            var isValid0 = MIDIUtils.isValidMidiNumber(0);
            var isValid60 = MIDIUtils.isValidMidiNumber(60);
            var isValid127 = MIDIUtils.isValidMidiNumber(127);
            post("[Alits/TEST] Valid MIDI - 0: ".concat(isValid0, ", 60: ").concat(isValid60, ", 127: ").concat(isValid127, "\n"));
            // Test invalid MIDI numbers
            var isInvalidNegative = MIDIUtils.isValidMidiNumber(-1);
            var isInvalidHigh = MIDIUtils.isValidMidiNumber(128);
            post("[Alits/TEST] Invalid MIDI - -1: ".concat(isInvalidNegative, ", 128: ").concat(isInvalidHigh, "\n"));
        }
        catch (error) {
            post("[Alits/TEST] Failed MIDI range validation: ".concat(error.message, "\n"));
        }
    };
    // Test round-trip conversion
    MidiUtilsTest.prototype.testRoundTripConversion = function () {
        try {
            var testNotes = ['C4', 'C#4', 'Db4', 'E4', 'F#4', 'Gb4', 'A4', 'B4'];
            post('[Alits/TEST] Round-trip conversion test:\n');
            for (var _i = 0, testNotes_1 = testNotes; _i < testNotes_1.length; _i++) {
                var note = testNotes_1[_i];
                var midi = MIDIUtils.noteNameToMidi(note);
                var backToNote = MIDIUtils.midiToNoteName(midi);
                post("[Alits/TEST] ".concat(note, " -> ").concat(midi, " -> ").concat(backToNote, "\n"));
            }
        }
        catch (error) {
            post("[Alits/TEST] Failed round-trip conversion: ".concat(error.message, "\n"));
        }
    };
    return MidiUtilsTest;
}());
// Initialize test instance
var testApp = new MidiUtilsTest();
// Expose functions to Max for Live
function bang() {
    post('[Alits/TEST] Starting MIDI Utils tests...\n');
    testApp.testNoteNameToMidi();
    testApp.testMidiToNoteName();
    testApp.testNoteValidation();
    testApp.testMidiRangeValidation();
    testApp.testRoundTripConversion();
    post('[Alits/TEST] MIDI Utils tests completed\n');
}
function test_note_to_midi() {
    testApp.testNoteNameToMidi();
}
function test_midi_to_note() {
    testApp.testMidiToNoteName();
}
function test_validation() {
    testApp.testNoteValidation();
    testApp.testMidiRangeValidation();
}
function test_round_trip() {
    testApp.testRoundTripConversion();
}
// Required for Max TypeScript compilation
var module = {};
module.exports = {};
