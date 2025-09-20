/**
 * TypeScript interfaces for Live Object Model (LOM) objects
 * These interfaces represent the structure of Ableton Live's LiveAPI objects
 */

export interface LiveAPIObject {
  /** Unique identifier for the LiveAPI object */
  id: string;
  /** The LiveAPI object reference */
  liveObject: any;
}

export interface LiveSet extends LiveAPIObject {
  /** Array of tracks in the Live set */
  tracks: Track[];
  /** Array of scenes in the Live set */
  scenes: Scene[];
  /** Current tempo of the Live set */
  tempo: number;
  /** Current time signature */
  timeSignature: TimeSignature;
}

export interface Track extends LiveAPIObject {
  /** Track name */
  name: string;
  /** Track volume (0-1) */
  volume: number;
  /** Track pan (-1 to 1) */
  pan: number;
  /** Track mute state */
  mute: boolean;
  /** Track solo state */
  solo: boolean;
  /** Array of devices on this track */
  devices: Device[];
  /** Array of clips on this track */
  clips: Clip[];
  /** Cleanup method */
  cleanup(): void;
}

export interface Scene extends LiveAPIObject {
  /** Scene name */
  name: string;
  /** Scene color */
  color: number;
  /** Whether the scene is selected */
  isSelected: boolean;
  /** Cleanup method */
  cleanup(): void;
}

export interface Device extends LiveAPIObject {
  /** Device name */
  name: string;
  /** Device type */
  type: string;
  /** Device parameters */
  parameters: Parameter[];
  /** Cleanup method */
  cleanup(): void;
}

export interface RackDevice extends Device {
  /** Array of chains in the rack */
  chains: Chain[];
  /** Selected chain index */
  selectedChain: number;
}

export interface DrumPad extends LiveAPIObject {
  /** Drum pad name */
  name: string;
  /** MIDI note number for this pad */
  note: number;
  /** Pad velocity */
  velocity: number;
  /** Associated clip */
  clip: Clip | null;
}

export interface Chain extends LiveAPIObject {
  /** Chain name */
  name: string;
  /** Chain volume */
  volume: number;
  /** Chain pan */
  pan: number;
  /** Devices in this chain */
  devices: Device[];
}

export interface Clip extends LiveAPIObject {
  /** Clip name */
  name: string;
  /** Clip length in beats */
  length: number;
  /** Clip start time in beats */
  startTime: number;
  /** Whether the clip is playing */
  isPlaying: boolean;
  /** Whether the clip is recording */
  isRecording: boolean;
  /** Cleanup method */
  cleanup(): void;
}

export interface Parameter extends LiveAPIObject {
  /** Parameter name */
  name: string;
  /** Parameter value */
  value: number;
  /** Parameter minimum value */
  min: number;
  /** Parameter maximum value */
  max: number;
  /** Parameter unit */
  unit: string;
}

export interface TimeSignature {
  /** Numerator of the time signature */
  numerator: number;
  /** Denominator of the time signature */
  denominator: number;
}

/**
 * MIDI note utilities interface
 */
export interface MIDINote {
  /** MIDI note number (0-127) */
  number: number;
  /** Note name (e.g., "C4", "F#3") */
  name: string;
  /** Octave number */
  octave: number;
  /** Note name without octave (e.g., "C", "F#") */
  noteName: string;
}

/**
 * Observable property change event
 */
export interface PropertyChangeEvent<T> {
  /** The property that changed */
  property: string;
  /** The new value */
  value: T;
  /** The previous value */
  previousValue: T;
  /** Timestamp of the change */
  timestamp: number;
}
