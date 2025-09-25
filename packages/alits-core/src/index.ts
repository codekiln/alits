// Max 8 compatible Promise polyfill
import './max8-promise-polyfill.js';

// Promise declarations for TypeScript compilation
declare global {
    interface PromiseConstructor {
        new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
        resolve<T>(value: T | PromiseLike<T>): Promise<T>;
        reject<T = never>(reason?: any): Promise<T>;
        all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
    }

    interface Promise<T> {
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason?: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
        ): Promise<TResult1 | TResult2>;
        catch<TResult = never>(
            onrejected?: ((reason?: any) => TResult | PromiseLike<TResult>) | undefined | null
        ): Promise<T | TResult>;
    }

    interface PromiseLike<T> {
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason?: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
        ): PromiseLike<TResult1 | TResult2>;
    }
}

// Export Promise constructor for explicit access
export declare var Promise: PromiseConstructor;

// Export Promise types for importing modules
export interface PromiseConstructor {
    new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;
    reject<T = never>(reason?: any): Promise<T>;
    all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
}

export interface Promise<T> {
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason?: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): Promise<TResult1 | TResult2>;
    catch<TResult = never>(
        onrejected?: ((reason?: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): Promise<T | TResult>;
}

export interface PromiseLike<T> {
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason?: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): PromiseLike<TResult1 | TResult2>;
}

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

// Simple utility function for testing
export function greet(): string {
  return "Hello! Writing from typescript!";
}
