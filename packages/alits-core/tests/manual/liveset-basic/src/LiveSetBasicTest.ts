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
    post('[Alits/TEST] ===========================================\n');
    post('[Alits/TEST] LiveSet Basic Test Suite Starting\n');
    post('[Alits/TEST] ===========================================\n');
    
    // Test if Promise polyfill is working
    post('[Alits/TEST] DEBUG: Testing Promise polyfill...\n');
    try {
        const testPromise = new Promise((resolve) => {
            post('[Alits/TEST] DEBUG: Promise constructor works\n');
            resolve('test');
        });
        
        // Use Max Task object to handle Promise resolution
        const task = new Task(() => {
            testPromise.then((result) => {
                post(`[Alits/TEST] DEBUG: Promise.then() works, result: ${result}\n`);
                
                // Now run the actual test suite
                runCompleteTestSuite().then(() => {
                    post('[Alits/TEST] ===========================================\n');
                    post('[Alits/TEST] Test Suite COMPLETED Successfully\n');
                    post('[Alits/TEST] ===========================================\n');
                }).catch((error: any) => {
                    post(`[Alits/TEST] Test suite error: ${error.message}\n`);
                    post('[Alits/TEST] ===========================================\n');
                    post('[Alits/TEST] Test Suite FAILED\n');
                    post('[Alits/TEST] ===========================================\n');
                });
                
            }).catch((error: any) => {
                post(`[Alits/TEST] DEBUG: Promise test failed: ${error.message}\n`);
            });
        });
        
        // Schedule the task to run immediately
        task.schedule(0);
        
    } catch (error: any) {
        post(`[Alits/TEST] DEBUG: Promise constructor failed: ${error.message}\n`);
    }
    
    post('[Alits/TEST] DEBUG: bang() function completed\n');
}

// Run the complete test suite
async function runCompleteTestSuite(): Promise<void> {
    post('[Alits/TEST] DEBUG: runCompleteTestSuite started\n');
    
    try {
        // Step 1: Initialize LiveSet
        post('[Alits/TEST] Step 1: Initializing LiveSet...\n');
        await testApp.initialize();
        post('[Alits/TEST] DEBUG: initialize() completed\n');
        
        // Step 2: Test tempo functionality
        post('[Alits/TEST] Step 2: Testing tempo functionality...\n');
        await testApp.testTempoChange(120);
        post('[Alits/TEST] DEBUG: first tempo test completed\n');
        await testApp.testTempoChange(140);
        post('[Alits/TEST] DEBUG: second tempo test completed\n');
        
        // Step 3: Test time signature functionality
        post('[Alits/TEST] Step 3: Testing time signature functionality...\n');
        await testApp.testTimeSignatureChange(4, 4);
        post('[Alits/TEST] DEBUG: first time signature test completed\n');
        await testApp.testTimeSignatureChange(3, 4);
        post('[Alits/TEST] DEBUG: second time signature test completed\n');
        
        // Step 4: Test track access
        post('[Alits/TEST] Step 4: Testing track access...\n');
        testApp.testTrackAccess();
        post('[Alits/TEST] DEBUG: track access test completed\n');
        
        // Step 5: Test scene access
        post('[Alits/TEST] Step 5: Testing scene access...\n');
        testApp.testSceneAccess();
        post('[Alits/TEST] DEBUG: scene access test completed\n');
        
        // Final summary - success message moved to .then() block
        
    } catch (error: any) {
        post(`[Alits/TEST] DEBUG: Error caught in runCompleteTestSuite: ${error.message}\n`);
        post(`[Alits/TEST] DEBUG: Error stack: ${error.stack || 'No stack trace'}\n`);
        post(`[Alits/TEST] Test suite failed: ${error.message}\n`);
        throw error;
    }
}

function test_tempo(tempo: number) {
    testApp.testTempoChange(tempo).catch((error: any) => {
        post(`[Alits/TEST] Tempo test error: ${error.message}\n`);
    });
}

function test_time_signature(numerator: number, denominator: number) {
    testApp.testTimeSignatureChange(numerator, denominator).catch((error: any) => {
        post(`[Alits/TEST] Time signature test error: ${error.message}\n`);
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