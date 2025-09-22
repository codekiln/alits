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

Alits uses a monorepo structure managed by Turborepo with Jest for testing. Each package maintains its own test suite while sharing common configurations and utilities. The testing strategy combines automated unit tests with manual testing fixtures to ensure comprehensive validation both in development and within Ableton Live's Max for Live runtime.

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

* **Manual Testing Fixtures**

  * Complement automated tests with manual testing fixtures that exercise features within Ableton Live's Max for Live runtime.
  * Store fixtures within each package at `/packages/*/tests/manual/` directory.
  * Include `.amxd` device files, creation guides, test scripts, and result logs.
  * Enable semi-automated validation through structured console logging and log export analysis.
  * **Location**: `/packages/*/tests/manual/` (within each package)
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

  * **Automated Tests**: Co-locate test files with source code within each package (`packages/*/src/Component.ts` → `packages/*/tests/Component.test.ts`)
  * Use `__tests__` directories for complex test suites within packages
  * **Manual Testing Fixtures**: Store within each package at `packages/*/tests/manual/` directory
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
  * Manual testing fixture support and utilities

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

### Git & Commit Message Standards

**Conventional Emoji Commits Format:**

All commits must follow the [Conventional Emoji Commits](./dev/scm/conventional_commits.md) specification for consistent git history and automated changelog generation.

**Commit Message Structure:**
```
<emoji> <type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Conventional Emoji Commit Types:**
* `✨ feat`: A new feature
* `🩹 fix`: A bug fix
* `📚 docs`: Documentation only changes
* `🎨 style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `♻️ refactor`: A code change that neither fixes a bug nor adds a feature
* `🧪 test`: Adding missing tests or correcting existing tests
* `🔧 chore`: Changes to the build process or auxiliary tools and libraries
* `🔨 build`: Changes that affect the build system or external dependencies
* `👷 ci`: Changes to our CI configuration files and scripts
* `⚡️ perf`: A code change that improves performance
* `♿️ a11y`: Accessibility improvements
* `🔒 security`: Security-related changes
* `🚀 release`: Release-related changes
* `🔄 revert`: Reverts a previous commit

**Project-Specific Scopes:**
* `core`: Changes to `@alits/core` package
* `tracks`: Changes to `@alits/tracks` package
* `clips`: Changes to `@alits/clips` package
* `devices`: Changes to `@alits/devices` package
* `racks`: Changes to `@alits/racks` package
* `drums`: Changes to `@alits/drums` package
* `docs`: Documentation changes
* `build`: Build system changes
* `ci`: CI/CD pipeline changes
* `test`: Test-related changes

**Gitmoji Integration:**

Use [gitmoji](https://gitmoji.dev/) to communicate what's happening at each commit point in the project. Examples:
* `✨ feat(core): add LiveSet abstraction`
* `🩹 fix(tracks): resolve track selection issue`
* `📚 docs: update API documentation`
* `♻️ refactor(devices): simplify device parameter handling`

**Task Reference Requirements:**

Each commit must reference the task being worked on in the footer:
* **JIRA**: `AB-1234 The Jira Ticket Title`
* **GitHub Issues**: `#123 The GitHub Issue Title`
* **Story Files**: `docs/stories/1.2.development-workflow-standards.md`

**Example Commit Messages:**
```
✨ feat(core): add LiveSet abstraction with async/await API

Implements basic LiveSet class with LiveAPI integration and error handling.
Adds TypeScript interfaces for LOM objects and proper async constructor pattern.

docs/stories/1.1.foundation-core-package-setup.md
```

```
🩹 fix(tracks): resolve track selection Observable memory leak

Fixes unsubscription issue in observeSelectedTrack() method that was causing
memory leaks in long-running applications.

🚨 BREAKING CHANGE: observeSelectedTrack() now returns a different Observable type

docs/stories/1.2.track-selection-implementation.md
```

**Enforcement:**

Commit message standards are enforced through:
* **Husky git hooks** for commit-msg validation
* **Commitlint** with conventional commits configuration
* **Pre-commit hooks** for code quality checks
* **CI/CD pipeline** validation

For detailed implementation, see [Story 1.2: Development Workflow Standards](../stories/1.2.development-workflow-standards.md).

**Related Documentation:**
* [Source Code Management Preferences](./My___Dev___Tool___Pref___SCM.md) - Detailed SCM preferences and standards
* [Conventional Emoji Commits Specification](./dev/scm/conventional_commits.md) - Project-specific implementation
* [Conventional Emoji Commits Website](https://conventional-emoji-commits.site/) - Official specification
* [Gitmoji Guide](https://gitmoji.dev/) - Emoji usage guidelines

---

### Summary

* Use **TypeScript-first design** with camelCase methods and explicit return types.
* Model **observability with RxJS** streams for all `observe`-able properties.
* Implement **comprehensive testing strategy** with Jest in a Turborepo monorepo structure, complemented by manual testing fixtures for Max for Live runtime validation.
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
* Manual testing fixtures stored in `packages/*/tests/manual/` for Max for Live runtime validation
* Clear separation between automated tests and manual fixtures for maintainability

By following these conventions, Alits will deliver a clean, predictable developer experience that aligns with modern TypeScript practices while respecting Max for Live's unique constraints and enabling efficient AI-assisted development in a scalable monorepo architecture.
