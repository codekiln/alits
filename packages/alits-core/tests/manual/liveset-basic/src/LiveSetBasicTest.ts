// LiveSet Basic Functionality Test - Max 8 Compatible with Promise Polyfill
// This version uses async/await with the Max 8 Promise polyfill

// Max for Live API declarations
declare var inlets: number;
declare var outlets: number;
declare var autowatch: number;
declare var post: (message: string) => void;

declare class LiveAPI {
    constructor(objectName: string);
    call(method: string, ...args: any[]): any;
    get(path: string): any;
    set(path: string, value: any): void;
}

declare class Task {
    constructor(callback: () => void, context?: any);
    schedule(delay: number): void;
}

// Import the actual @alits/core package (includes Promise polyfill and declarations)
import { LiveSet, PromiseConstructor as MaxPromiseConstructor, Promise as MaxPromise, PromiseLike as MaxPromiseLike } from "@alits/core";

// Use imported Promise types for TypeScript compilation
declare var Promise: MaxPromiseConstructor;

// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

class LiveSetBasicTest {
    private liveSet: LiveSet | null = null;
    private liveApiSet: any;

    constructor() {
        this.liveApiSet = new LiveAPI('live_set');
    }

    async initialize(): Promise<void> {
        try {
            this.liveSet = new LiveSet(this.liveApiSet);
            // LiveSet initializes automatically in constructor
            
            post('[Alits/TEST] LiveSet initialized successfully\n');
            post(`[Alits/TEST] Tempo: ${this.liveSet.tempo}\n`);
            post(`[Alits/TEST] Time Signature: ${this.liveSet.timeSignature.numerator}/${this.liveSet.timeSignature.denominator}\n`);
            post(`[Alits/TEST] Tracks: ${this.liveSet.tracks.length}\n`);
            post(`[Alits/TEST] Scenes: ${this.liveSet.scenes.length}\n`);
        } catch (error: any) {
            post(`[Alits/TEST] Failed to initialize LiveSet: ${error.message}\n`);
        }
    }

    // Test tempo change functionality
    async testTempoChange(newTempo: number): Promise<void> {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }

        try {
            await this.liveSet.setTempo(newTempo);
            post(`[Alits/TEST] Tempo changed to: ${newTempo}\n`);
        } catch (error: any) {
            post(`[Alits/TEST] Failed to change tempo: ${error.message}\n`);
        }
    }

    // Test time signature change
    async testTimeSignatureChange(numerator: number, denominator: number): Promise<void> {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }

        try {
            await this.liveSet.setTimeSignature(numerator, denominator);
            post(`[Alits/TEST] Time signature changed to: ${numerator}/${denominator}\n`);
        } catch (error: any) {
            post(`[Alits/TEST] Failed to change time signature: ${error.message}\n`);
        }
    }

    // Test track access
    testTrackAccess(): void {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }

        try {
            const tracks = this.liveSet.tracks;
            post(`[Alits/TEST] Found ${tracks.length} tracks\n`);
            
            if (tracks.length > 0) {
                const firstTrack = tracks[0];
                post(`[Alits/TEST] First track: ${firstTrack.name || 'Unnamed'}\n`);
            }
        } catch (error: any) {
            post(`[Alits/TEST] Failed to access tracks: ${error.message}\n`);
        }
    }

    // Test scene access
    testSceneAccess(): void {
        if (!this.liveSet) {
            post('[Alits/TEST] LiveSet not initialized\n');
            return;
        }

        try {
            const scenes = this.liveSet.scenes;
            post(`[Alits/TEST] Found ${scenes.length} scenes\n`);
            
            if (scenes.length > 0) {
                const firstScene = scenes[0];
                post(`[Alits/TEST] First scene: ${firstScene.name || 'Unnamed'}\n`);
            }
        } catch (error: any) {
            post(`[Alits/TEST] Failed to access scenes: ${error.message}\n`);
        }
    }
}

// Initialize test instance
const testApp = new LiveSetBasicTest();

// Expose functions to Max for Live
function bang() {
    testApp.initialize();
}

function test_tempo(tempo: number) {
    testApp.testTempoChange(tempo);
}

function test_time_signature(numerator: number, denominator: number) {
    testApp.testTimeSignatureChange(numerator, denominator);
}

function test_tracks() {
    testApp.testTrackAccess();
}

function test_scenes() {
    testApp.testSceneAccess();
}

// Required for Max TypeScript compilation
let module = {};
export = {};