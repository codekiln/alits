// MIDI Utilities Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime

// Mock MIDIUtils class for testing (will be replaced with actual import when bundling is ready)
class MIDIUtils {
    static noteNameToMidi(noteName: string): number {
        const noteMap: { [key: string]: number } = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
            'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
        };

        const match = noteName.match(/^([A-G][#b]?)(\d+)$/);
        if (!match) {
            throw new Error(`Invalid note name: ${noteName}`);
        }

        const [, note, octave] = match;
        const noteValue = noteMap[note];
        if (noteValue === undefined) {
            throw new Error(`Invalid note: ${note}`);
        }

        return noteValue + (parseInt(octave) * 12);
    }

    static midiToNoteName(midiNumber: number, useSharps: boolean = true): string {
        if (midiNumber < 0 || midiNumber > 127) {
            throw new Error(`Invalid MIDI number: ${midiNumber}`);
        }

        const octave = Math.floor(midiNumber / 12);
        const noteValue = midiNumber % 12;

        const sharpNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

        const notes = useSharps ? sharpNotes : flatNotes;
        return notes[noteValue] + octave;
    }

    static isValidNoteName(noteName: string): boolean {
        try {
            this.noteNameToMidi(noteName);
            return true;
        } catch {
            return false;
        }
    }

    static isValidMidiNumber(midiNumber: number): boolean {
        return midiNumber >= 0 && midiNumber <= 127;
    }
}

// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

class MidiUtilsTest {
    constructor() {
        post('[Alits/TEST] MIDI Utils Test initialized\n');
    }

    // Test note name to MIDI number conversion
    testNoteNameToMidi(): void {
        try {
            // Test basic note names
            const c4 = MIDIUtils.noteNameToMidi('C4');
            const d4 = MIDIUtils.noteNameToMidi('D4');
            const e4 = MIDIUtils.noteNameToMidi('E4');
            
            post(`[Alits/TEST] C4 = ${c4}, D4 = ${d4}, E4 = ${e4}\n`);
            
            // Test sharp notes
            const cSharp4 = MIDIUtils.noteNameToMidi('C#4');
            const dSharp4 = MIDIUtils.noteNameToMidi('D#4');
            
            post(`[Alits/TEST] C#4 = ${cSharp4}, D#4 = ${dSharp4}\n`);
            
            // Test flat notes
            const dFlat4 = MIDIUtils.noteNameToMidi('Db4');
            const eFlat4 = MIDIUtils.noteNameToMidi('Eb4');
            
            post(`[Alits/TEST] Db4 = ${dFlat4}, Eb4 = ${eFlat4}\n`);
            
            // Test octave ranges
            const c0 = MIDIUtils.noteNameToMidi('C0');
            const c8 = MIDIUtils.noteNameToMidi('C8');
            
            post(`[Alits/TEST] C0 = ${c0}, C8 = ${c8}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed note name to MIDI conversion: ${error.message}\n`);
        }
    }

    // Test MIDI number to note name conversion
    testMidiToNoteName(): void {
        try {
            // Test basic MIDI numbers
            const note60 = MIDIUtils.midiToNoteName(60);
            const note61 = MIDIUtils.midiToNoteName(61);
            const note62 = MIDIUtils.midiToNoteName(62);
            
            post(`[Alits/TEST] MIDI 60 = ${note60}, 61 = ${note61}, 62 = ${note62}\n`);
            
            // Test sharp notes
            const note61Sharp = MIDIUtils.midiToNoteName(61, true);
            const note63Sharp = MIDIUtils.midiToNoteName(63, true);
            
            post(`[Alits/TEST] MIDI 61 (sharp) = ${note61Sharp}, 63 (sharp) = ${note63Sharp}\n`);
            
            // Test flat notes
            const note61Flat = MIDIUtils.midiToNoteName(61, false);
            const note63Flat = MIDIUtils.midiToNoteName(63, false);
            
            post(`[Alits/TEST] MIDI 61 (flat) = ${note61Flat}, 63 (flat) = ${note63Flat}\n`);
            
            // Test octave ranges
            const note12 = MIDIUtils.midiToNoteName(12);
            const note108 = MIDIUtils.midiToNoteName(108);
            
            post(`[Alits/TEST] MIDI 12 = ${note12}, 108 = ${note108}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed MIDI to note name conversion: ${error.message}\n`);
        }
    }

    // Test note validation
    testNoteValidation(): void {
        try {
            // Test valid notes
            const isValidC4 = MIDIUtils.isValidNoteName('C4');
            const isValidCSharp4 = MIDIUtils.isValidNoteName('C#4');
            const isValidDb4 = MIDIUtils.isValidNoteName('Db4');
            
            post(`[Alits/TEST] Valid notes - C4: ${isValidC4}, C#4: ${isValidCSharp4}, Db4: ${isValidDb4}\n`);
            
            // Test invalid notes
            const isInvalidH4 = MIDIUtils.isValidNoteName('H4');
            const isInvalidCSharpSharp4 = MIDIUtils.isValidNoteName('C##4');
            const isInvalidEmpty = MIDIUtils.isValidNoteName('');
            
            post(`[Alits/TEST] Invalid notes - H4: ${isInvalidH4}, C##4: ${isInvalidCSharpSharp4}, empty: ${isInvalidEmpty}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed note validation: ${error.message}\n`);
        }
    }

    // Test MIDI range validation
    testMidiRangeValidation(): void {
        try {
            // Test valid MIDI numbers
            const isValid0 = MIDIUtils.isValidMidiNumber(0);
            const isValid60 = MIDIUtils.isValidMidiNumber(60);
            const isValid127 = MIDIUtils.isValidMidiNumber(127);
            
            post(`[Alits/TEST] Valid MIDI - 0: ${isValid0}, 60: ${isValid60}, 127: ${isValid127}\n`);
            
            // Test invalid MIDI numbers
            const isInvalidNegative = MIDIUtils.isValidMidiNumber(-1);
            const isInvalidHigh = MIDIUtils.isValidMidiNumber(128);
            
            post(`[Alits/TEST] Invalid MIDI - -1: ${isInvalidNegative}, 128: ${isInvalidHigh}\n`);
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed MIDI range validation: ${error.message}\n`);
        }
    }

    // Test round-trip conversion
    testRoundTripConversion(): void {
        try {
            const testNotes = ['C4', 'C#4', 'Db4', 'E4', 'F#4', 'Gb4', 'A4', 'B4'];
            
            post('[Alits/TEST] Round-trip conversion test:\n');
            
            for (const note of testNotes) {
                const midi = MIDIUtils.noteNameToMidi(note);
                const backToNote = MIDIUtils.midiToNoteName(midi);
                post(`[Alits/TEST] ${note} -> ${midi} -> ${backToNote}\n`);
            }
            
        } catch (error: any) {
            post(`[Alits/TEST] Failed round-trip conversion: ${error.message}\n`);
        }
    }
}

// Initialize test instance
const testApp = new MidiUtilsTest();

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
let module = {};
export = {};