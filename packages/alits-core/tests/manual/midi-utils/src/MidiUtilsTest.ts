// MIDI Utilities Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime

// Import the actual @alits/core package
import { MIDIUtils } from '@alits/core';

// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

class MIDIUtilsTest {
    constructor() {
        post('[Alits/TEST] MIDI Utils Test initialized\n');
    }

    // Test note name to MIDI number conversion
    testNoteNameToMidi(): void {
        try {
            // Test basic note names
            const c4 = MIDIUtils.noteNameToNumber('C4');
            const d4 = MIDIUtils.noteNameToNumber('D4');
            const e4 = MIDIUtils.noteNameToNumber('E4');
            
            post(`[Alits/TEST] C4 = ${c4}, D4 = ${d4}, E4 = ${e4}\n`);
            
            // Test sharp notes
            const cSharp4 = MIDIUtils.noteNameToNumber('C#4');
            const dSharp4 = MIDIUtils.noteNameToNumber('D#4');
            
            post(`[Alits/TEST] C#4 = ${cSharp4}, D#4 = ${dSharp4}\n`);
            
            // Test flat notes
            const dFlat4 = MIDIUtils.noteNameToNumber('Db4');
            const eFlat4 = MIDIUtils.noteNameToNumber('Eb4');
            
            post(`[Alits/TEST] Db4 = ${dFlat4}, Eb4 = ${eFlat4}\n`);
            
            // Test octave ranges
            const c0 = MIDIUtils.noteNameToNumber('C0');
            const c8 = MIDIUtils.noteNameToNumber('C8');
            
            post(`[Alits/TEST] C0 = ${c0}, C8 = ${c8}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed note name to MIDI conversion: ${error.message}\n`);
        }
    }

    // Test MIDI number to note name conversion
    testMidiToNoteName(): void {
        try {
            // Test basic MIDI numbers
            const note60 = MIDIUtils.noteNumberToName(60);
            const note61 = MIDIUtils.noteNumberToName(61);
            const note62 = MIDIUtils.noteNumberToName(62);
            
            post(`[Alits/TEST] MIDI 60 = ${note60}, 61 = ${note61}, 62 = ${note62}\n`);
            
            // Test octave ranges
            const note0 = MIDIUtils.noteNumberToName(0);
            const note127 = MIDIUtils.noteNumberToName(127);
            
            post(`[Alits/TEST] MIDI 0 = ${note0}, 127 = ${note127}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed MIDI to note name conversion: ${error.message}\n`);
        }
    }

    // Test validation functions
    testValidation(): void {
        try {
            // Test note name validation
            const validNote = MIDIUtils.isValidNoteName('C4');
            const invalidNote = MIDIUtils.isValidNoteName('H4');
            
            post(`[Alits/TEST] C4 valid: ${validNote}, H4 valid: ${invalidNote}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed validation tests: ${error.message}\n`);
        }
    }

    // Test error handling
    testErrorHandling(): void {
        try {
            // Test invalid note name
            try {
                MIDIUtils.noteNameToNumber('InvalidNote');
                post('[Alits/TEST] ERROR: Should have thrown for invalid note\n');
            } catch (error: any) {
                post(`[Alits/TEST] Correctly caught error: ${error.message}\n`);
            }
            
            // Test invalid MIDI number
            try {
                MIDIUtils.noteNumberToName(-1);
                post('[Alits/TEST] ERROR: Should have thrown for negative MIDI\n');
            } catch (error: any) {
                post(`[Alits/TEST] Correctly caught error: ${error.message}\n`);
            }
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed error handling tests: ${error.message}\n`);
        }
    }

    // Run all tests
    runAllTests(): void {
        post('[Alits/TEST] === Running MIDI Utils Tests ===\n');
        
        this.testNoteNameToMidi();
        this.testMidiToNoteName();
        this.testValidation();
        this.testErrorHandling();
        
        post('[Alits/TEST] === MIDI Utils Tests Complete ===\n');
    }
}

// Initialize test instance
const testApp = new MIDIUtilsTest();

// Expose functions to Max for Live
function bang() {
    testApp.runAllTests();
}

function test_note_to_midi(noteName: string) {
    try {
        const midiNumber = MIDIUtils.noteNameToNumber(noteName);
        post(`[Alits/TEST] ${noteName} = MIDI ${midiNumber}\n`);
    } catch (error: any) {
        post(`[Alits/TEST] Error: ${error.message}\n`);
    }
}

function test_midi_to_note(midiNumber: number) {
    try {
        const noteName = MIDIUtils.noteNumberToName(midiNumber);
        post(`[Alits/TEST] MIDI ${midiNumber} = ${noteName}\n`);
    } catch (error: any) {
        post(`[Alits/TEST] Error: ${error.message}\n`);
    }
}

function test_validation() {
    testApp.testValidation();
}

function test_errors() {
    testApp.testErrorHandling();
}

// Required for Max TypeScript compilation
let module = {};
export = {};