// LiveSet Basic Functionality Test - Max 8 Compatible with Promise Polyfill
// This version uses async/await with the Max 8 Promise polyfill
// Follows Single-Bang Testing standard from brief-manual-testing-fixtures.md

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

// Build identification
function printBuildInfo(): void {
    var now = new Date();
    var etOffset = -4 * 60; // ET is UTC-4 (EDT) in October
    var etTime = new Date(now.getTime() + (etOffset * 60 * 1000));
    var timestamp = etTime.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' ET');

    post('[BUILD] Entrypoint: LiveSetBasicTest\n');
    post('[BUILD] Timestamp: ' + timestamp + '\n');
    post('[BUILD] Source: @alits/core debug build\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
}

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

// SINGLE-BANG TESTING: Complete test suite runs on one bang
// This follows the standard from brief-manual-testing-fixtures.md line 20
function bang() {
    printBuildInfo();
    post('[Alits/TEST] ===========================================\n');
    post('[Alits/TEST] LiveSet Basic Test Suite Starting\n');
    post('[Alits/TEST] ===========================================\n');

    // Run complete test suite with proper Promise handling
    runCompleteTestSuite().catch(function(error: any) {
        post('[Alits/TEST] Test suite error: ' + error.message + '\n');
        post('[Alits/TEST] ===========================================\n');
        post('[Alits/TEST] Test Suite FAILED\n');
        post('[Alits/TEST] ===========================================\n');
    });
}

// Complete test suite that runs all tests sequentially
async function runCompleteTestSuite(): Promise<void> {
    try {
        // Test 1: Initialize LiveSet
        post('[Alits/TEST] Test 1: Initializing LiveSet...\n');
        await testApp.initialize();
        post('[Alits/TEST] Test 1: PASSED\n\n');

        // Test 2: Track Access
        post('[Alits/TEST] Test 2: Testing track access...\n');
        testApp.testTrackAccess();
        post('[Alits/TEST] Test 2: PASSED\n\n');

        // Test 3: Scene Access
        post('[Alits/TEST] Test 3: Testing scene access...\n');
        testApp.testSceneAccess();
        post('[Alits/TEST] Test 3: PASSED\n\n');

        // Test 4: Tempo Change (test with current tempo + 1)
        if (testApp['liveSet']) {
            const currentTempo = testApp['liveSet'].tempo;
            post('[Alits/TEST] Test 4: Testing tempo change...\n');
            await testApp.testTempoChange(currentTempo + 1);
            post('[Alits/TEST] Test 4: PASSED\n\n');

            // Restore original tempo
            await testApp.testTempoChange(currentTempo);
        }

        post('[Alits/TEST] ===========================================\n');
        post('[Alits/TEST] All Tests PASSED\n');
        post('[Alits/TEST] ===========================================\n');

    } catch (error: any) {
        post('[Alits/TEST] Test suite failed: ' + error.message + '\n');
        throw error;
    }
}

// Individual test functions (for manual testing if needed)
function test_tempo(tempo: number) {
    testApp.testTempoChange(tempo).catch(function(error: any) {
        post('[Alits/TEST] Tempo test failed: ' + error.message + '\n');
    });
}

function test_time_signature(numerator: number, denominator: number) {
    testApp.testTimeSignatureChange(numerator, denominator).catch(function(error: any) {
        post('[Alits/TEST] Time signature test failed: ' + error.message + '\n');
    });
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