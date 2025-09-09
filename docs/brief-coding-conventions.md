## Coding Conventions for Alits Development

### Purpose

This document defines best practices and conventions for building the Alits TypeScript library. The goal is to ensure a consistent developer experience, align with modern TypeScript and RxJS standards, and accommodate the unique constraints of Max for Live (M4L).

---

### TypeScript Conventions

* **Naming Style**

  * Use **camelCase** for methods and properties.
  * Use **PascalCase** for class names and type definitions.
  * Example: `track.getDevices()`, `clip.getName()`, `drumPad.setName()`.
* **Type Safety**

  * All methods must return explicit types (`Promise<T>`, `Observable<T>`, etc.).
  * Use TypeScript interfaces for LOM objects (`Track`, `Clip`, `Device`, `DrumPad`).
* **Object-Oriented Wrapping**

  * External API should never expose raw string paths.
  * All functions should take **other Alits objects** as parameters where possible.
  * Example: `track.getClips()` returns `Clip[]`, not raw IDs or paths.
* **Async/Await**

  * Asynchronous getters and setters must return Promises.
  * Avoid callback-style APIs in public interfaces.

---

### RxJS / FRP Conventions

* **Observables for State Changes**

  * Any LOM property with `observe` access should have an observable wrapper, e.g. `track.observeMute(): Observable<boolean>`.
* **Unsubscription Handling**

  * Observables must provide teardown logic to stop LiveAPI observers and free resources.
* **Composition**

  * Encourage `combineLatest`, `merge`, `map`, `filter`, etc. for reactive orchestration.
  * Example:

    ```ts
    combineLatest([
      track.observeMute(),
      track.observeSolo()
    ]).subscribe(([mute, solo]) => updateUI(mute, solo));
    ```

---

### Testing Strategy

* **Unit Tests First**

  * Write unit tests for all API functions and classes.
  * Focus on:

    * Correct type signatures.
    * Validation of method behavior.
    * Observable emission patterns.
* **Mocking LiveAPI**

  * Provide test doubles that simulate LiveAPI callbacks.
  * Example: a mocked `LiveAPI` that emits fake `property` updates for tests.
* **Integration Testing**

  * Very limited, due to the constraints of Max for Live.
  * Instead, use snapshot tests of object structure and controlled mock simulations.

---

### Logging Conventions

* **Systematic Logging Layers**

  * Provide a centralized logging utility (e.g., `alitsLogger`).
  * Logging levels:

    * `debug`: Detailed internal messages (e.g., path resolution, low-level API calls).
    * `info`: High-level events (e.g., track renamed, clip launched).
    * `warn`: Unexpected but non-breaking issues (e.g., invalid but recoverable path).
    * `error`: Fatal errors that prevent expected behavior.
* **Max Console Integration**

  * Logs must route to Max’s console via `post()` and `error()`.
  * Use `info` and `warn` → `post()` with prefixes (e.g., `[Alits/INFO]`).
  * Use `error` → `error()` in red.
* **Conditional Debugging**

  * Allow enabling/disabling `debug` logs at runtime.
  * Example:

    ```ts
    alitsLogger.debug("Track path resolved:", trackPath);
    alitsLogger.info("Renamed pad to A#6");
    alitsLogger.warn("Pad has no chain, skipping");
    alitsLogger.error("Invalid LiveAPI reference");
    ```

---

### API Parameter Design

* **No String Paths Externally**

  * External users must never be required to pass LOM paths like `"live_set tracks 0 clip_slots 1 clip"`.
  * Instead, all API calls should work with object references.
  * Example:

    ```ts
    await clip.setName("Intro Loop");
    const devices = await track.getDevices();
    ```
* **Internal Usage of Paths**

  * Path construction and validation may occur internally.
  * Ensure all errors are caught and surfaced with clear messages.

---

### Summary

* Use **TypeScript-first design** with camelCase methods.
* Model **observability with RxJS** streams for all `observe`-able properties.
* Prioritize **unit testing** with mocked LiveAPI over integration tests.
* Provide **systematic logging** with log levels mapped to Max console.
* Never expose string paths externally; API should work with **Alits objects only**.

By following these conventions, Alits will deliver a clean, predictable developer experience that aligns with modern TypeScript practices while respecting Max for Live’s unique constraints.
