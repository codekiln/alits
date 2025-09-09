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

**Monorepo Testing Architecture:**

Alits uses a monorepo structure managed by Turborepo with Jest for testing. Each package maintains its own test suite while sharing common configurations and utilities.

**Package-Level Testing Configuration:**

* **Individual Jest Configurations**: Each package (`alits-core`, `alits-tracks`, etc.) has its own `jest.config.js` extending a shared base configuration:

  ```javascript
  // packages/alits-core/jest.config.js
  const baseConfig = require('../../jest.config.base');
  
  module.exports = {
    ...baseConfig,
    displayName: 'alits-core',
    testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
  };
  ```

* **Centralized Base Configuration**: Root `jest.config.base.js` defines common settings:

  ```javascript
  // jest.config.base.js
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage/',
    verbose: true,
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/']
  };
  ```

**Turborepo Integration:**

* **Task Configuration**: Define testing tasks in `turbo.json` for efficient parallel execution:

  ```json
  {
    "tasks": {
      "test": {
        "dependsOn": ["^build"],
        "outputs": ["coverage/**"]
      },
      "test:watch": {
        "cache": false,
        "persistent": true
      },
      "test:coverage": {
        "dependsOn": ["^build"],
        "outputs": ["coverage/**"]
      }
    }
  }
  ```

* **Package Scripts**: Each package includes standardized test scripts:

  ```json
  {
    "scripts": {
      "test": "jest",
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage",
      "test:ci": "jest --ci --coverage --watchAll=false"
    }
  }
  ```

**Testing Types & Strategies:**

* **Unit Tests First**

  * Write unit tests for all API functions and classes.
  * Focus on:

    * Correct type signatures and TypeScript compilation.
    * Validation of method behavior and return values.
    * Observable emission patterns and subscription management.
    * Error handling and edge cases.
* **Mocking LiveAPI**

  * Provide comprehensive test doubles that simulate LiveAPI callbacks.
  * Mock `LiveAPI` constructor, property observers, and method calls:

    ```typescript
    // Example mock for LiveAPI
    class MockLiveAPI {
      constructor(callback?: Function, path?: string) {
        this.path = path;
        this.callback = callback;
      }
      
      get(property: string) { return mockValues[property]; }
      set(property: string, value: any) { mockValues[property] = value; }
      call(method: string, ...args: any[]) { return mockCallResults[method]; }
      
      // Simulate property observation
      set property(propName: string) {
        if (this.callback) {
          setTimeout(() => this.callback(propName, mockValues[propName]), 0);
        }
      }
    }
    ```
* **Integration Testing**

  * Very limited due to Max for Live constraints.
  * Use snapshot tests of object structure and controlled mock simulations.
  * Focus on testing component interactions within the Alits ecosystem.
* **Test Organization**

  * Co-locate test files with source code (`Component.ts` → `Component.test.ts`)
  * Use `__tests__` directories for complex test suites
  * Maintain test utilities in shared `test-utils` package
* **Coverage Requirements**

  * Minimum 80% code coverage for all packages
  * Focus on critical paths: Live Object Model integration, Observable patterns, error handling
  * Exclude generated files and type definitions from coverage requirements

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

### Monorepo Structure & Conventions

**Turborepo Organization:**

Alits is organized as a monorepo using Turborepo for efficient build orchestration and caching. Each package follows consistent conventions for maintainability and scalability.

**Package Structure Standards:**

* **Consistent Directory Layout**: Each package maintains a standardized structure:

  ```
  packages/alits-core/
  ├── src/                    # Source TypeScript files
  ├── tests/                  # Test files and utilities
  ├── dist/                   # Built output (generated)
  ├── jest.config.js          # Package-specific Jest config
  ├── package.json            # Package dependencies and scripts
  ├── tsconfig.json           # TypeScript configuration
  └── README.md               # Package documentation
  ```

* **Package Naming Convention**: Use `@alits/` namespace for all packages:
  * `@alits/core` - Foundation objects (Application, Song, Song.View)
  * `@alits/tracks` - Track layer components
  * `@alits/clips` - Clip management
  * `@alits/devices` - Device functionality
  * `@alits/test-utils` - Shared testing utilities

**Build & Development Workflow:**

* **Turborepo Tasks**: Define consistent tasks across all packages in `turbo.json`:

  ```json
  {
    "tasks": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**"]
      },
      "test": {
        "dependsOn": ["^build"],
        "outputs": ["coverage/**"]
      },
      "lint": {
        "outputs": []
      },
      "type-check": {
        "dependsOn": ["^build"],
        "outputs": []
      }
    }
  }
  ```

* **Package Dependencies**: Use workspace references for internal dependencies:

  ```json
  {
    "dependencies": {
      "@alits/core": "workspace:*",
      "@alits/test-utils": "workspace:*"
    }
  }
  ```

* **Shared Configuration**: Maintain shared configurations at the root level:
  * `jest.config.base.js` - Common Jest settings
  * `tsconfig.base.json` - Base TypeScript configuration
  * `.eslintrc.js` - Shared linting rules
  * `prettier.config.js` - Code formatting standards

**Development Commands:**

* **Root Level Commands**:
  * `pnpm build` - Build all packages
  * `pnpm test` - Run tests for all packages
  * `pnpm test:watch` - Run tests in watch mode
  * `pnpm lint` - Lint all packages
  * `pnpm type-check` - Type check all packages

* **Package-Specific Commands**:
  * `pnpm --filter @alits/core test` - Test specific package
  * `pnpm --filter @alits/core build` - Build specific package

**Cross-Package Testing:**

* **Shared Test Utilities**: Common testing utilities in `@alits/test-utils`:
  * Mock LiveAPI implementations
  * Test data factories
  * Observable testing helpers
  * TypeScript assertion utilities

* **Integration Testing**: Test cross-package interactions:
  * Core → Tracks integration
  * Tracks → Clips integration
  * Device → Core integration

**CI/CD Considerations:**

* **Selective Testing**: Turborepo automatically runs tests only for changed packages
* **Parallel Execution**: Tests run in parallel across packages for faster CI
* **Caching**: Build and test results are cached for unchanged packages
* **Dependency Graph**: Tests run in dependency order (core before tracks, etc.)

---

### Summary

* Use **TypeScript-first design** with camelCase methods and explicit return types.
* Model **observability with RxJS** streams for all `observe`-able properties.
* Implement **comprehensive testing strategy** with Jest in a Turborepo monorepo structure.
* Provide **systematic logging** with log levels mapped to Max console.
* Never expose string paths externally; API should work with **Alits objects only**.
* Follow **monorepo conventions** with consistent package structure and shared configurations.
* Maintain **80% test coverage** with mocked LiveAPI and comprehensive unit tests.
* Use **Turborepo task orchestration** for efficient builds, testing, and caching.

**Key Testing Principles:**
* Each package has its own Jest configuration extending shared base settings
* Comprehensive LiveAPI mocking for deterministic unit tests
* Co-located test files with source code for maintainability
* Shared test utilities in `@alits/test-utils` package
* Turborepo integration for parallel test execution and selective testing

By following these conventions, Alits will deliver a clean, predictable developer experience that aligns with modern TypeScript practices while respecting Max for Live's unique constraints and enabling efficient AI-assisted development in a scalable monorepo architecture.
