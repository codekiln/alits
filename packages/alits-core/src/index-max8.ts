// Max 8 compatible entry point - no RxJS dependencies
// Promise polyfill for Max 8 compatibility
import 'es6-promise/auto';

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

// Observable helpers (Max 8 compatible version)
export { 
  ObservablePropertyHelper,
  observeProperty,
  observeProperties
} from './observable-helper';

// Note: RxJS exports removed for Max 8 compatibility
// Use the main index.ts for full RxJS support
