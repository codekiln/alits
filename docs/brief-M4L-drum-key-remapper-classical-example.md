## Project Brief: Classical Max for Live Implementation (Drum Pad Renaming)

### Application Concept

A Max for Live MIDI effect device that, when placed on a track containing a Drum Rack, automatically renames each Drum Pad to the MIDI key that triggers it. Pads with no sample remain unchanged.

### Implementation Plan (Classical Max/JS Approach)

#### 1. Device Setup

* Create a Max for Live MIDI Effect.
* Add a `js` object to hold the JavaScript code.
* Add a [`live.thisdevice`](https://docs.cycling74.com/legacy/max8/refpages/live.thisdevice) object in the Max patch. This object outputs a `bang` when the device has fully loaded (including the Live API).
* Connect the bang from `live.thisdevice` to the `js` object to trigger initialization. **Important:** you cannot safely call `LiveAPI` in JavaScript global scope; initialization should only happen after the `bang` is received.
* Optional: include a `button` or `bang` for manual renaming.

#### 2. Track and Device Reference

* Inside the JS initialization function, use the `LiveAPI` constructor with `"this_device canonical_parent"` to get the parent track object.
* From the track, iterate through the `devices` array to find the Drum Rack.

#### 3. Drum Rack Identification

* Query device count: `track.getcount("devices")`.
* For each device, build a path using `track.unquotedpath + " devices " + i`.

  * **Note:** `unquotedpath` is preferred when building paths programmatically, since the plain `path` property may contain quotes around identifiers with spaces (per [Live Object Model docs](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model)).
* Use `device.get("class_name")` or `device.info` to confirm it’s a Drum Rack (`RackDevice` with `drum_pads`).
* Per [Live API Overview](https://docs.cycling74.com/legacy/max8/vignettes/live_api_overview), device function calls must be performed by sending the message `call <functionName>`; this pattern also applies in JS with `device.call("functionName", args...)`.

#### 4. Drum Pad Access

* Navigate to `drum_pads` list on the rack.
* Instantiate with: `new LiveAPI(callback, basePath + " drum_pads " + padIndex)`.
* Validate pads by checking `id !== 0` and `info !== "No object"`.

#### 5. Sample Presence Check

* Pads are empty if they contain no chains.
* Check using `pad.getcount("chains")`.
* Skip empty pads.

#### 6. MIDI Note Identification

* Drum Pads expose the `note` property, which returns an integer MIDI note.
* Use `pad.get("note")` to retrieve it.
* Convert integer to readable note string (`60 → C3`, `82 → A#6`).

#### 7. Pad Renaming

* Set the pad’s display name using `pad.set("name", noteName)`.

#### 8. Full Algorithm

1. Wait for `live.thisdevice` to send its initialization bang.
2. In JS, reference the parent track with `LiveAPI`.
3. Iterate through track devices to locate the Drum Rack.
4. Access `drum_pads`.
5. For each pad:

   * Skip if `chains` count is zero.
   * Get its MIDI note number.
   * Convert note number to note name.
   * Call `pad.set("name", noteName)`.

#### 9. Development Pain Points

* **Initialization Timing**: Must rely on `live.thisdevice` bang; cannot safely use `LiveAPI` in JS global scope.
* **Manual Path Construction**: Must construct fragile string paths like `live_set tracks 0 devices 2 drum_pads 5`. Using `unquotedpath` reduces quoting issues when paths contain spaces.
* **Object Validation**: Developers must check `id` and `info` for every `LiveAPI` reference.
* **String-Centric Property Access**: API requires `.get("property")` / `.set("property", value)` rather than direct calls.
* **Function Calls via `call`**: As noted in the Live API Overview, many operations require sending a `call` message rather than using standard methods. In JS, this becomes `.call("methodName", args...)`.
* **Callback-Based Observers**: Property changes are watched by setting `api.property = "propName"` with a callback, which delivers arguments through `arrayfromargs()`.
* **Asynchronous Messaging Model**: The Live API is designed around Max/MSP’s message-passing paradigm, requiring developers to handle state asynchronously.
* **Lack of Type Safety**: No autocomplete or compile-time checks; errors appear only at runtime.
* **Debugging Challenges**: According to the [Max JS Global documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal):

  * Use `post("message")` to print debug output to the Max Console.
  * `error("message")` sends error messages in red for easier spotting.
  * Use `arrayfromargs(arguments)` to inspect callback arguments when observing properties.
  * Avoid relying solely on `console.log` since output may not always surface in Max’s console; instead, prefer `post()` for consistent results.
* **Best Practices from JS Tutorial 3** ([JavaScript in Max Tutorial 3](https://docs.cycling74.com/legacy/max8/tutorials/javascriptchapter03)):

  * Separate logic into clearly named functions (`init()`, `renamePads()`) instead of putting all code into global scope.
  * Use the `anything()` function to gracefully handle unexpected messages sent to the JS object.
  * Employ defensive coding: check inputs and provide meaningful error messages with `error()` when something goes wrong.
  * Keep state in global variables only when necessary; prefer encapsulation inside functions.
  * Comment liberally—especially around Live API calls and path construction—to assist debugging and future maintenance.

---
