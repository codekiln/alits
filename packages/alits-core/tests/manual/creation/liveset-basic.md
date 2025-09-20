# Fixture Creation: LiveSet Basic Functionality

## Purpose
To create a fixture device that demonstrates basic LiveSet functionality including initialization, track access, and error handling within the Max for Live runtime.

## Prerequisites
- Ableton Live with Max for Live installed
- `@alits/core` package built and available (compiled to ES5)
- Max for Live device creation permissions
- TypeScript development environment (for creating the test application)

## Steps

### 1. Create Max MIDI Effect Device
1. In Ableton Live, create a new Max MIDI Effect device
2. Name it "LiveSet Basic Test"

### 2. Add JavaScript Object
1. Add a `js` object to the Max device
2. Set the file path to `liveset-basic.js` (external file reference)
3. Use `@external` parameter to load from external file

### 3. Create TypeScript Test Application
Create a TypeScript file `liveset-basic.ts` that will compile to ES5 JavaScript:

```typescript
// LiveSet Basic Functionality Test
// This TypeScript file compiles to ES5 JavaScript for Max for Live runtime

import { LiveSet } from '@alits/core';

// Main test application class
class LiveSetBasicTest {
    private liveSet: LiveSet | null = null;
    private liveApiSet: any;

    constructor() {
        this.liveApiSet = new LiveAPI('live_set');
        this.initialize();
    }

    async initialize(): Promise<void> {
        try {
            this.liveSet = new LiveSet(this.liveApiSet);
            await this.liveSet.initializeLiveSet();
            
            console.log('[Alits/TEST] LiveSet initialized successfully');
            console.log(`[Alits/TEST] Tempo: ${this.liveSet.getTempo()}`);
            console.log(`[Alits/TEST] Time Signature: ${this.liveSet.getTimeSignature().numerator}/${this.liveSet.getTimeSignature().denominator}`);
            console.log(`[Alits/TEST] Tracks: ${this.liveSet.getTracks().length}`);
            console.log(`[Alits/TEST] Scenes: ${this.liveSet.getScenes().length}`);
        } catch (error) {
            console.error('[Alits/TEST] Failed to initialize LiveSet:', error);
        }
    }

    // Test tempo change functionality
    async testTempoChange(newTempo: number): Promise<void> {
        if (!this.liveSet) {
            console.error('[Alits/TEST] LiveSet not initialized');
            return;
        }

        try {
            await this.liveApiSet.set('tempo', newTempo);
            console.log(`[Alits/TEST] Tempo changed to: ${newTempo}`);
        } catch (error) {
            console.error('[Alits/TEST] Failed to change tempo:', error);
        }
    }

    // Test time signature change
    async testTimeSignatureChange(numerator: number, denominator: number): Promise<void> {
        if (!this.liveSet) {
            console.error('[Alits/TEST] LiveSet not initialized');
            return;
        }

        try {
            await this.liveApiSet.set('time_signature_numerator', numerator);
            await this.liveApiSet.set('time_signature_denominator', denominator);
            console.log(`[Alits/TEST] Time signature changed to: ${numerator}/${denominator}`);
        } catch (error) {
            console.error('[Alits/TEST] Failed to change time signature:', error);
        }
    }
}

// Initialize the test application
const testApp = new LiveSetBasicTest();

// Expose test functions to Max for Live
if (typeof Max !== 'undefined') {
    Max.global.testTempoChange = (tempo: number) => testApp.testTempoChange(tempo);
    Max.global.testTimeSignatureChange = (num: number, den: number) => testApp.testTimeSignatureChange(num, den);
}
```

### 4. Compile TypeScript to ES5 JavaScript
Compile the TypeScript file to ES5-compatible JavaScript:

```bash
# Using TypeScript compiler
tsc liveset-basic.ts --target es5 --module commonjs --outDir ./compiled

# Or using your project's build system
npm run build:test-fixtures
```

This will create `liveset-basic.js` in the compiled output directory.

### 5. Save Device
1. In the Max editor, go to `File` > `Save As...`
2. Navigate to `packages/alits-core/tests/manual/fixtures/`
3. Save the device as `LiveSetBasicTest.amxd`
4. Copy the compiled `liveset-basic.js` file to the same directory
5. Close Max editor and save the device in Ableton Live

### 6. Verify Setup
The `fixtures/` directory should contain:
- `LiveSetBasicTest.amxd` - The Max for Live device
- `liveset-basic.js` - The compiled ES5 JavaScript file

## Notes

- The TypeScript file should be compiled to ES5 JavaScript for Max 8 compatibility
- The external JavaScript file must be in the same directory as the `.amxd` device
- Use `@external` parameter in the `js` object to load the external file
- The compiled JavaScript should not use ES6+ features that aren't supported in Max 8
