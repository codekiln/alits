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
  const track = await liveSet.get_track_for_this_device();
  ```
* Query its devices directly as strongly typed objects:

  ```ts
  const devices = await track.get_devices();
  const drumRack = devices.find(d => d instanceof RackDevice && d.is_drum_rack());
  ```

#### 3. Drum Pad Access

* Retrieve Drum Pads with a clear method:

  ```ts
  const pads: DrumPad[] = await drumRack.get_drum_pads();
  ```
* Each pad object has typed properties and methods (no manual path building).

#### 4. Sample Presence Check

* Check whether the pad is empty via a boolean:

  ```ts
  if (!(await pad.has_chain())) continue;
  ```

#### 5. MIDI Note Identification

* Retrieve the note assignment directly:

  ```ts
  const noteNumber: number = await pad.get_note();
  const noteName: string = midiNoteToName(noteNumber);
  ```

  *(Alits could provide utility functions for MIDI note → name conversion, or this could be a developer helper.)*

#### 6. Pad Renaming

* Set the pad name with full type safety:

  ```ts
  await pad.set_name(noteName);
  ```

#### 7. Full Algorithm

1. Wait for device initialization.
2. Get parent track of the device with `get_track_for_this_device()`.
3. Find its Drum Rack device.
4. Get Drum Pads from the rack.
5. For each pad:

   * Skip if `has_chain()` returns false.
   * Retrieve assigned MIDI note.
   * Convert note number to note name.
   * Rename pad using `set_name()`.

---

### Key Differences vs. Classical JS Implementation

* **No String Paths**: Instead of `"live_set tracks 0 devices 2 drum_pads 5"`, Alits provides `track.get_devices()` → `drumRack.get_drum_pads()`.
* **Type Safety**: Methods like `pad.get_note()` and `pad.set_name()` have explicit return/argument types.
* **Async/Await**: Promises replace callbacks, making sequencing easier.
* **Observables**: Pad properties (e.g. `observe_name()`) can be subscribed to with RxJS.
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
* Provide reactive logging: `pad.observe_note().subscribe(...)`.
* Integrate with a front-end (e.g., a React panel) for pad overview.

---

### Summary

The **Drum Key Remapper** under Alits becomes a concise, type-safe, and reactive device. What was once a brittle, string-based exercise in LiveAPI JS becomes a modern, maintainable TypeScript application aligned with developer expectations in 2025.
