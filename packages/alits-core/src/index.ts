// Core Live Object Model abstractions
export { LiveSetImpl as LiveSet } from './liveset';

// TypeScript interfaces
export type {
  LiveAPIObject,
  LiveSet as LiveSetInterface,
  Track,
  Scene,
  Device,
  RackDevice,
  DrumPad,
  Chain,
  Clip,
  Parameter,
  TimeSignature,
  MIDINote,
  PropertyChangeEvent
} from './types';

// MIDI utilities
export { MIDIUtils } from './midi-utils';

// Observable helpers
export { 
  ObservablePropertyHelper,
  observeProperty,
  observeProperties
} from './observable-helper';

// Re-export RxJS for convenience
export { Observable, BehaviorSubject, Subject } from 'rxjs';
export { map, distinctUntilChanged, share } from 'rxjs/operators';
