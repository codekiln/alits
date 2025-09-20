import { MIDINote } from './types';

/**
 * MIDI note name mapping
 */
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * MIDI note utilities for conversion between note numbers and names
 */
export class MIDIUtils {
  /**
   * Convert MIDI note number to note name
   * @param noteNumber MIDI note number (0-127)
   * @returns Note name with octave (e.g., "C4", "F#3")
   */
  static noteNumberToName(noteNumber: number): string {
    if (noteNumber < 0 || noteNumber > 127) {
      throw new Error(`Invalid MIDI note number: ${noteNumber}. Must be between 0 and 127.`);
    }

    const octave = Math.floor(noteNumber / 12) - 1;
    const noteIndex = noteNumber % 12;
    const noteName = NOTE_NAMES[noteIndex];

    return `${noteName}${octave}`;
  }

  /**
   * Convert note name to MIDI note number
   * @param noteName Note name (e.g., "C4", "F#3", "Bb2")
   * @returns MIDI note number (0-127)
   */
  static noteNameToNumber(noteName: string): number {
    if (!noteName || typeof noteName !== 'string') {
      throw new Error('Note name must be a non-empty string');
    }

    // Parse note name (e.g., "C4", "F#3", "Bb2")
    const match = noteName.match(/^([A-G])([#b]?)(\d+)$/i);
    if (!match) {
      throw new Error(`Invalid note name format: ${noteName}. Expected format like "C4", "F#3", or "Bb2"`);
    }

    const [, baseNote, accidental, octaveStr] = match;
    const octave = parseInt(octaveStr, 10);

    if (octave < -1 || octave > 9) {
      throw new Error(`Invalid octave: ${octave}. Must be between -1 and 9.`);
    }

    // Find base note index
    const baseNoteIndex = NOTE_NAMES.findIndex(note => note === baseNote.toUpperCase());
    if (baseNoteIndex === -1) {
      throw new Error(`Invalid base note: ${baseNote}`);
    }

    // Apply accidental
    let noteIndex = baseNoteIndex;
    if (accidental === '#') {
      noteIndex = (noteIndex + 1) % 12;
    } else if (accidental === 'b') {
      noteIndex = (noteIndex - 1 + 12) % 12;
    }

    // Calculate MIDI note number
    const midiNoteNumber = (octave + 1) * 12 + noteIndex;

    if (midiNoteNumber < 0 || midiNoteNumber > 127) {
      throw new Error(`Resulting MIDI note number ${midiNoteNumber} is out of range (0-127)`);
    }

    return midiNoteNumber;
  }

  /**
   * Get detailed MIDI note information
   * @param noteNumber MIDI note number (0-127)
   * @returns Detailed MIDI note information
   */
  static getMIDINoteInfo(noteNumber: number): MIDINote {
    if (noteNumber < 0 || noteNumber > 127) {
      throw new Error(`Invalid MIDI note number: ${noteNumber}. Must be between 0 and 127.`);
    }

    const octave = Math.floor(noteNumber / 12) - 1;
    const noteIndex = noteNumber % 12;
    const noteName = NOTE_NAMES[noteIndex];
    const fullName = `${noteName}${octave}`;

    return {
      number: noteNumber,
      name: fullName,
      octave,
      noteName
    };
  }

  /**
   * Get all note names in a given octave
   * @param octave Octave number (-1 to 9)
   * @returns Array of note names in the octave
   */
  static getNotesInOctave(octave: number): string[] {
    if (octave < -1 || octave > 9) {
      throw new Error(`Invalid octave: ${octave}. Must be between -1 and 9.`);
    }

    return NOTE_NAMES.map(note => `${note}${octave}`);
  }

  /**
   * Check if a note name is valid
   * @param noteName Note name to validate
   * @returns True if the note name is valid
   */
  static isValidNoteName(noteName: string): boolean {
    try {
      this.noteNameToNumber(noteName);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get the frequency of a MIDI note number
   * @param noteNumber MIDI note number (0-127)
   * @returns Frequency in Hz
   */
  static noteToFrequency(noteNumber: number): number {
    if (noteNumber < 0 || noteNumber > 127) {
      throw new Error(`Invalid MIDI note number: ${noteNumber}. Must be between 0 and 127.`);
    }

    // A4 = 440 Hz = MIDI note 69
    return 440 * Math.pow(2, (noteNumber - 69) / 12);
  }

  /**
   * Convert frequency to MIDI note number
   * @param frequency Frequency in Hz
   * @returns MIDI note number (0-127)
   */
  static frequencyToNote(frequency: number): number {
    if (frequency <= 0) {
      throw new Error('Frequency must be positive');
    }

    // A4 = 440 Hz = MIDI note 69
    const noteNumber = 69 + 12 * Math.log2(frequency / 440);
    const roundedNote = Math.round(noteNumber);

    if (roundedNote < 0 || roundedNote > 127) {
      throw new Error(`Frequency ${frequency} Hz results in MIDI note ${roundedNote} which is out of range (0-127)`);
    }

    return roundedNote;
  }
}
