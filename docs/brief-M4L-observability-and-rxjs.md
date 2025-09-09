## Project Brief: Drum Key Remapper with Alits

### Application Concept

A Max for Live MIDI effect device that, when placed on a track containing a Drum Rack, automatically renames each Drum Pad to the MIDI key that triggers it. Pads with no sample remain unchanged.

This is the same application described in the classical implementation brief, but reimagined as it would be written using the **Alits** TypeScript library once available.

---

### Alits Approach

Alits provides a modern, type-safe, Observable-based API to the Ableton Live Object Model (LOM). Instead of string-based paths, manual validation, and callback handling, developers can work with strongly typed objects, async/await calls, and RxJS Observables.

---

### Implementation Plan (Alits/TypeScript Approach)

#### 1. Device Setup

* Create a Max for Live MIDI Effect.
* In the device’s TypeScript entrypoint, import the relevant Alits modules:

  ```ts
  import { LiveSet, Track, RackDevice, DrumPad } from 'alits';
  ```
* Initialization happens in an async `init()` function once the device is loaded.

#### 2. Track and Device Reference

* Get the current Live Set root:

  ```ts
  const liveSet = new LiveSet();
  ```
* Get the track hosting this device:

  ```ts
  // Note: not a built-in LOM function, provided as a higher-level Alits helper
  const track = await liveSet.getTrackForThisDevice();
  ```
* Query its devices directly as strongly typed objects:

  ```ts
  const devices = await track.getDevices();
  const drumRack = devices.find(d => d instanceof RackDevice && d.isDrumRack());
  ```

#### 3. Drum Pad Access

* Retrieve Drum Pads with a clear method:

  ```ts
  const pads: DrumPad[] = await drumRack.getDrumPads();
  ```
* Each pad object has typed properties and methods (no manual path building).

#### 4. Sample Presence Check

* Check whether the pad is empty via a boolean:

  ```ts
  if (!(await pad.hasChain())) continue;
  ```

#### 5. MIDI Note Identification

* Retrieve the note assignment directly:

  ```ts
  const noteNumber: number = await pad.getNote();
  const noteName: string = midiNoteToName(noteNumber);
  ```

  *(Alits could provide utility functions for MIDI note → name conversion, or this could be a developer helper.)*

#### 6. Pad Renaming

* Set the pad name with full type safety:

  ```ts
  await pad.setName(noteName);
  ```

#### 7. Full Algorithm

1. Wait for device initialization.
2. Get parent track of the device with `getTrackForThisDevice()`.
3. Find its Drum Rack device.
4. Get Drum Pads from the rack.
5. For each pad:

   * Skip if `hasChain()` returns false.
   * Retrieve assigned MIDI note.
   * Convert note number to note name.
   * Rename pad using `setName()`.

---

### Generalized Observability Helper

To make the API more idiomatic with RxJS, Alits could provide a utility that wraps **any `observe`-able property** into an Observable stream:

```ts
import { Observable } from 'rxjs';

function observeProperty<T>(path: string, prop: string): Observable<T> {
  return new Observable(subscriber => {
    const api = new LiveAPI((args: IArguments) => {
      const [propName, value] = arrayfromargs(args);
      subscriber.next(value as T);
    }, path);

    api.property = prop;

    return () => {
      api.property = "";
      api.free();
    };
  });
}
```

With this abstraction, higher-level classes like `Track` or `DrumPad` can simply call:

```ts
observeProperty<boolean>(track.path, "mute").subscribe(isMuted => { ... });
observeProperty<number>(pad.path, "note").subscribe(note => { ... });
```

This eliminates repetitive boilerplate and systematically exposes all `observe`-able LOM properties as Observables.

---

### Key Differences vs. Classical JS Implementation

* **No String Paths**: Instead of `"live_set tracks 0 devices 2 drum_pads 5"`, Alits provides `track.getDevices()` → `drumRack.getDrumPads()`.
* **Type Safety**: Methods like `pad.getNote()` and `pad.setName()` have explicit return/argument types.
* **Async/Await**: Promises replace callbacks, making sequencing easier.
* **Observables**: Any property with `observe` access can be streamed via RxJS with a generic helper.
* **Error Handling**: Invalid objects throw typed errors instead of requiring manual `id/info` validation.
* **IDE Support**: Autocomplete and inline docs available in TypeScript-aware IDEs.

---

### Benefits of Alits Approach

* Dramatically lower learning curve for developers coming from modern JS/TS.
* Easier to reason about relationships between objects (e.g., Track → Devices → Drum Rack → Pads).
* Cleaner, more maintainable code.
* Compatible with AI coding assistants due to full type definitions.
* Enables reactive patterns (e.g., automatically re-run renaming when pad contents change).

---

### Example Extension

With Alits, this device could easily evolve:

* Automatically update pad names when a new sample is dropped.
* Provide reactive logging: `pad.observeNote().subscribe(...)`.
* Integrate with a front-end (e.g., a React panel) for pad overview.

---

### Summary

The **Drum Key Remapper** under Alits becomes a concise, type-safe, and reactive device. What was once a brittle, string-based exercise in LiveAPI JS becomes a modern, maintainable TypeScript application aligned with developer expectations in 2025. By including a **generalized RxJS observability helper**, Alits can systematically expose the entire Live Object Model's observable properties as reactive streams.

### Testing Strategy

The reactive capabilities of this device would be validated through both automated unit tests and manual testing fixtures:

* **Automated Tests**: Unit tests with mocked LiveAPI validate Observable patterns, RxJS operator integration, and subscription management
* **Manual Testing Fixtures**: A `.amxd` device fixture in `/packages/*/tests/manual/fixtures/` exercises reactive property observation within Ableton Live's Max for Live runtime
* **Test Scripts**: Human-readable test scripts in `/packages/*/tests/manual/scripts/` guide manual validation of reactive behavior
* **Result Logging**: Structured console logging enables semi-automated validation of Observable emissions and reactive patterns

For detailed information on the manual testing fixtures approach, see **[Manual Testing Fixtures](./brief-manual-testing-fixtures.md)**.
