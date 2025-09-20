import { MIDIUtils } from '../src/midi-utils';

describe('MIDIUtils', () => {
  describe('noteNumberToName', () => {
    it('should convert MIDI note numbers to note names correctly', () => {
      expect(MIDIUtils.noteNumberToName(60)).toBe('C4'); // Middle C
      expect(MIDIUtils.noteNumberToName(69)).toBe('A4'); // A4 = 440Hz
      expect(MIDIUtils.noteNumberToName(0)).toBe('C-1'); // Lowest note
      expect(MIDIUtils.noteNumberToName(127)).toBe('G9'); // Highest note
      expect(MIDIUtils.noteNumberToName(72)).toBe('C5'); // C5
      expect(MIDIUtils.noteNumberToName(61)).toBe('C#4'); // C#4
      expect(MIDIUtils.noteNumberToName(70)).toBe('A#4'); // A#4
    });

    it('should throw error for invalid note numbers', () => {
      expect(() => MIDIUtils.noteNumberToName(-1)).toThrow('Invalid MIDI note number: -1');
      expect(() => MIDIUtils.noteNumberToName(128)).toThrow('Invalid MIDI note number: 128');
      expect(() => MIDIUtils.noteNumberToName(NaN)).toThrow('Invalid MIDI note number: NaN');
    });
  });

  describe('noteNameToNumber', () => {
    it('should convert note names to MIDI note numbers correctly', () => {
      expect(MIDIUtils.noteNameToNumber('C4')).toBe(60); // Middle C
      expect(MIDIUtils.noteNameToNumber('A4')).toBe(69); // A4 = 440Hz
      expect(MIDIUtils.noteNameToNumber('C-1')).toBe(0); // Lowest note
      expect(MIDIUtils.noteNameToNumber('G9')).toBe(127); // Highest note
      expect(MIDIUtils.noteNameToNumber('C5')).toBe(72); // C5
      expect(MIDIUtils.noteNameToNumber('C#4')).toBe(61); // C#4
      expect(MIDIUtils.noteNameToNumber('A#4')).toBe(70); // A#4
      expect(MIDIUtils.noteNameToNumber('Bb4')).toBe(70); // Bb4 (same as A#4)
    });

    it('should handle case insensitive note names', () => {
      expect(MIDIUtils.noteNameToNumber('c4')).toBe(60);
      expect(MIDIUtils.noteNameToNumber('a4')).toBe(69);
      expect(MIDIUtils.noteNameToNumber('C#4')).toBe(61);
      expect(MIDIUtils.noteNameToNumber('c#4')).toBe(61);
    });

    it('should throw error for invalid note names', () => {
      expect(() => MIDIUtils.noteNameToNumber('')).toThrow('Note name must be a non-empty string');
      expect(() => MIDIUtils.noteNameToNumber('H4')).toThrow('Invalid base note: H');
      expect(() => MIDIUtils.noteNameToNumber('C')).toThrow('Invalid note name format: C');
      expect(() => MIDIUtils.noteNameToNumber('C10')).toThrow('Invalid octave: 10');
      expect(() => MIDIUtils.noteNameToNumber('C-2')).toThrow('Invalid octave: -2');
      expect(() => MIDIUtils.noteNameToNumber('invalid')).toThrow('Invalid note name format: invalid');
    });
  });

  describe('getMIDINoteInfo', () => {
    it('should return detailed MIDI note information', () => {
      const info = MIDIUtils.getMIDINoteInfo(60);
      expect(info).toEqual({
        number: 60,
        name: 'C4',
        octave: 4,
        noteName: 'C'
      });

      const info2 = MIDIUtils.getMIDINoteInfo(69);
      expect(info2).toEqual({
        number: 69,
        name: 'A4',
        octave: 4,
        noteName: 'A'
      });
    });

    it('should throw error for invalid note numbers', () => {
      expect(() => MIDIUtils.getMIDINoteInfo(-1)).toThrow('Invalid MIDI note number: -1');
      expect(() => MIDIUtils.getMIDINoteInfo(128)).toThrow('Invalid MIDI note number: 128');
    });
  });

  describe('getNotesInOctave', () => {
    it('should return all notes in a given octave', () => {
      const notes = MIDIUtils.getNotesInOctave(4);
      expect(notes).toEqual([
        'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'
      ]);
    });

    it('should throw error for invalid octaves', () => {
      expect(() => MIDIUtils.getNotesInOctave(-2)).toThrow('Invalid octave: -2');
      expect(() => MIDIUtils.getNotesInOctave(10)).toThrow('Invalid octave: 10');
    });
  });

  describe('isValidNoteName', () => {
    it('should return true for valid note names', () => {
      expect(MIDIUtils.isValidNoteName('C4')).toBe(true);
      expect(MIDIUtils.isValidNoteName('A#4')).toBe(true);
      expect(MIDIUtils.isValidNoteName('Bb3')).toBe(true);
      expect(MIDIUtils.isValidNoteName('G9')).toBe(true);
    });

    it('should return false for invalid note names', () => {
      expect(MIDIUtils.isValidNoteName('')).toBe(false);
      expect(MIDIUtils.isValidNoteName('H4')).toBe(false);
      expect(MIDIUtils.isValidNoteName('C')).toBe(false);
      expect(MIDIUtils.isValidNoteName('C10')).toBe(false);
      expect(MIDIUtils.isValidNoteName('invalid')).toBe(false);
    });
  });

  describe('noteToFrequency', () => {
    it('should convert MIDI note numbers to frequencies correctly', () => {
      expect(MIDIUtils.noteToFrequency(69)).toBeCloseTo(440, 1); // A4 = 440Hz
      expect(MIDIUtils.noteToFrequency(60)).toBeCloseTo(261.63, 1); // C4
      expect(MIDIUtils.noteToFrequency(81)).toBeCloseTo(880, 1); // A5 = 880Hz
    });

    it('should throw error for invalid note numbers', () => {
      expect(() => MIDIUtils.noteToFrequency(-1)).toThrow('Invalid MIDI note number: -1');
      expect(() => MIDIUtils.noteToFrequency(128)).toThrow('Invalid MIDI note number: 128');
    });
  });

  describe('frequencyToNote', () => {
    it('should convert frequencies to MIDI note numbers correctly', () => {
      expect(MIDIUtils.frequencyToNote(440)).toBe(69); // A4 = 440Hz
      expect(MIDIUtils.frequencyToNote(261.63)).toBe(60); // C4
      expect(MIDIUtils.frequencyToNote(880)).toBe(81); // A5 = 880Hz
    });

    it('should throw error for invalid frequencies', () => {
      expect(() => MIDIUtils.frequencyToNote(0)).toThrow('Frequency must be positive');
      expect(() => MIDIUtils.frequencyToNote(-100)).toThrow('Frequency must be positive');
    });
  });

  describe('round-trip conversion', () => {
    it('should maintain consistency in note number to name to number conversion', () => {
      for (let noteNumber = 0; noteNumber <= 127; noteNumber++) {
        const noteName = MIDIUtils.noteNumberToName(noteNumber);
        const convertedNumber = MIDIUtils.noteNameToNumber(noteName);
        expect(convertedNumber).toBe(noteNumber);
      }
    });

    it('should maintain consistency in note name to number to name conversion', () => {
      const testNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
      
      testNotes.forEach(noteName => {
        const noteNumber = MIDIUtils.noteNameToNumber(noteName);
        const convertedName = MIDIUtils.noteNumberToName(noteNumber);
        expect(convertedName).toBe(noteName);
      });
    });
  });
});
