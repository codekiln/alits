# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ALITS (Ableton Live Integration with TypeScript) is a monorepo that enables TypeScript development for MaxMSP and Ableton Live. The core challenge is compiling modern TypeScript (with async/await) to ES5 for Max 8's runtime while providing Promise polyfill support.

## Commands

### Build, Test, and Development
```bash
# Root level (uses Turborepo)
pnpm build          # Build all packages
pnpm dev           # Development mode with watching
pnpm test          # Run all tests with ≥80% coverage requirement
pnpm lint          # Lint all packages
pnpm maxmsp        # MaxMSP-specific build tasks

# Package-specific builds
cd packages/alits-core && pnpm build
cd packages/maxmsp-ts && pnpm build
cd packages/maxmsp-ts-transform && pnpm build

# MaxMSP project builds (from within app directories)
node ../../packages/maxmsp-ts/dist/index.js build
```

### Manual Testing
Manual testing is critical for Max for Live validation. Test fixtures are in:
- `packages/alits-core/tests/manual/liveset-basic/fixtures/`
- Load `.amxd` files in Ableton Live to test runtime behavior

## Architecture

### Monorepo Structure
- **`apps/`** - MaxMSP applications using the libraries
  - `maxmsp-test/` - Basic MaxMSP testing environment
  - `kebricide/` - Max for Live application example
- **`packages/`** - Core libraries and build tools
  - `alits-core/` - Main library (`@alits/core`) with LiveSet abstraction and MIDI utilities
  - `maxmsp-ts/` - Build tool for TypeScript → MaxMSP compilation
  - `maxmsp-ts-transform/` - Custom TypeScript transformer for Promise polyfill injection

### Critical Technical Challenge
**Promise Polyfill Execution Order**: TypeScript's `__awaiter` helper executes before Promise polyfill loads in Max 8. The project solves this with a custom TypeScript transformer that injects polyfill at file top before helpers execute.

### Max 8 Runtime Constraints
- **Target**: ES5 only (no native Promise support)
- **Promise Implementation**: Uses Max Task object for scheduling
- **Build Output**: All TypeScript compiles to ES5-compatible JavaScript
- **Dependencies**: Bundled using MaxMSP-style require() transformation

## Development Workflow

### File System Conventions
**NEVER DELETE these user content files:**
- `.amxd` - Max for Live devices
- `.als` - Ableton Live sets
- `.maxpat` - Max patchers
- `Patchers/` directories

**Safe to delete (build artifacts):**
- `node_modules/`, `dist/`, `build/`, `.tsbuildinfo`

### Git Configuration
Sophisticated Ableton Live file handling:
- `.als`, `.alc`, `.adg`, `.adv` files get readable diffs via gzip decompression
- `.amxd` files strip binary headers for JSON-based diffs
- Use `git status` and `git diff` normally - filters handle file format complexity

### Current Development Focus
Working on `feature/task8-implement-promise-polyfill-transform` branch to resolve the Promise polyfill execution order issue through custom TypeScript transformation.

## Testing Requirements

- **Unit Tests**: Jest with ≥80% statement coverage
- **Manual Testing**: Required for Max for Live device validation in Ableton Live
- **Integration Testing**: Build artifacts must work in Max 8 runtime environment
- **TypeScript Compliance**: All code must compile to ES5 while maintaining async/await functionality

## Package Dependencies

The monorepo uses pnpm workspaces with Turborepo for build orchestration. Key dependencies:
- **RxJS**: For observable property helpers in `@alits/core`
- **Custom Build Tools**: `@codekiln/maxmsp-ts` and `@codekiln/maxmsp-ts-transform`
- **Development**: TypeScript, Jest, Rollup (varies by package)

## Development Notes

When working with MaxMSP/Max for Live code:
- Always test in actual Max environment, not just Node.js
- ES5 compatibility is non-negotiable for Max 8 runtime
- Promise polyfill timing is critical - use custom transformer approach
- Manual testing fixtures provide real-world validation scenarios