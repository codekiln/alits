# Build Tools Brief: Rollup vs maxmsp-ts

## Overview

This document clarifies the roles and purposes of the two build tools used in the Alits project: **Rollup** and **maxmsp-ts**. These tools serve different purposes in the build pipeline and are used at different stages of development.

## Rollup: Package Distribution Builder

### Purpose
Rollup is used to build the **distribution packages** (`@alits/core`, `@alits/tracks`, etc.) that are consumed by other projects and applications.

### What Rollup Does
1. **Bundles TypeScript source** into distributable JavaScript packages
2. **Handles ES6 → CommonJS conversion** for Node.js compatibility
3. **Keeps code unminified** for debugging
4. **Generates source maps** for debugging
5. **Creates multiple output formats** (CommonJS, ES modules)
6. **Bundles dependencies** (like RxJS) into the package

### Rollup Configuration
Located in `packages/alits-core/rollup.config.js`:

```javascript
// Single build with RxJS - NON-MINIFIED for debugging
{
  input: "src/index.ts",
  output: [
    { file: "dist/index.js", format: "cjs", sourcemap: true },
    { file: "dist/index.esm.js", format: "es", sourcemap: true }
  ],
  plugins: [typescript(), resolve(), commonjs()]
  // NO terser() - keep unminified for debugging
}
```

### Rollup Outputs
- `dist/index.js` - CommonJS build with RxJS (non-minified)
- `dist/index.esm.js` - ES modules build with RxJS (non-minified)

### When Rollup Runs
- During package build: `pnpm build` in `packages/alits-core/`
- Creates the **distribution assets** that other projects consume
- Generates the files that end up in `node_modules/@alits/core/dist/`

## maxmsp-ts: Max for Live Development Tool

### Purpose
maxmsp-ts is a **post-build tool** that prepares packages for Max for Live development by copying and renaming distribution files to make them accessible to Max's `js` object.

### What maxmsp-ts Does
1. **Runs TypeScript compilation** (`tsc`) on Max for Live projects
2. **Copies distribution files** from `node_modules/@alits/core/dist/` to project directories
3. **Renames files** with aliases (e.g., `index.js` → `alits_index.js`)
4. **Updates require statements** in compiled JavaScript to reference copied files
5. **Provides watch mode** for development (`maxmsp dev`)

### maxmsp-ts Configuration
Located in `maxmsp.config.json`:

```json
{
  "output_path": "",
  "dependencies": {
    "@alits/core": {
      "alias": "alits",
      "files": ["index.js"],
      "path": ""
    }
  }
}
```

### maxmsp-ts Workflow
1. **TypeScript compilation**: `tsc` compiles `src/kebricide.ts` → `Project/kebricide.js`
2. **Post-build processing**: 
   - Copies `node_modules/@alits/core/dist/index.js` → `Project/alits_index.js`
   - Updates `require("@alits/core")` → `require("alits_index.js")` in `kebricide.js`

### maxmsp-ts Outputs
- `Project/kebricide.js` - Compiled TypeScript with updated require statements
- `Project/alits_index.js` - Copied and renamed distribution file
- `Project/kebricide.amxd` - Max for Live device file

### When maxmsp-ts Runs
- During Max for Live project build: `pnpm build` in `apps/kebricide/`
- During development: `pnpm dev` (watch mode)
- **After** Rollup has created the distribution files

## Build Pipeline Flow

```
1. Rollup (Package Build)
   src/index.ts → dist/index.js (distribution package)

2. maxmsp-ts (Max for Live Project Build)
   src/kebricide.ts → Project/kebricide.js
   node_modules/@alits/core/dist/index.js → Project/alits_index.js
   Updates require("@alits/core") → require("alits_index.js")
```

## Key Differences

| Aspect | Rollup | maxmsp-ts |
|--------|--------|------------|
| **Purpose** | Build distribution packages | Prepare packages for Max for Live |
| **Input** | TypeScript source files | Distribution files + TypeScript projects |
| **Output** | `dist/` directory | `Project/` directory |
| **Dependencies** | Bundles RxJS, etc. | Copies pre-built distribution files |
| **Target** | Node.js/browser/Max for Live | Max for Live only |
| **Minification** | Yes (production builds) | No (development builds) |
| **File Renaming** | No | Yes (with aliases) |
| **Require Updates** | No | Yes (for Max compatibility) |

## Why Both Tools Are Needed

### Rollup is Required Because:
- **Standard package distribution**: Creates proper npm packages
- **Multiple targets**: Supports Node.js, browser, and Max for Live
- **Dependency bundling**: Includes RxJS and other dependencies
- **Production optimization**: Minification and tree-shaking

### maxmsp-ts is Required Because:
- **Max for Live compatibility**: Handles file copying and renaming
- **Development workflow**: Provides watch mode for Max for Live projects
- **Require statement updates**: Converts npm package references to local file references
- **Project organization**: Keeps Max for Live projects self-contained

## Manual Test Fixtures

### Build Tool Standards
Manual test fixtures must use **maxmsp-ts** (same as production Max for Live projects):
- **Proper TypeScript compilation** handles ES6 → CommonJS conversion
- **Standard distribution assets** are used from `@alits/core/dist/`
- **Consistent with real user workflows** (same as `kebricide` app)
- **No custom bundling logic** or manual string replacement

### Prohibited Approaches
- ❌ **Manual ES6 import replacement** (bypasses TypeScript compilation)
- ❌ **Custom bundling scripts** (creates non-standard workflows)
- ❌ **Hand-crafted minimal versions** (doesn't test actual distribution)

## Build Tool Standards

### Package Distribution
- **Use Rollup** for building distribution packages (`@alits/core`, `@alits/tracks`, etc.)
- **Single build approach**: One non-minified build with RxJS included
- **Target formats**: CommonJS (`dist/index.js`) and ES modules (`dist/index.esm.js`)
- **Include source maps** for debugging
- **Include build identification** (git hash, timestamp, entrypoint)

### Max for Live Development
- **Use maxmsp-ts** for all Max for Live projects (including manual test fixtures)
- **Standard distribution assets**: Always use files from `@alits/core/dist/`
- **Consistent workflows**: Same process for production apps and test fixtures
- **No custom bundling**: Avoid manual string replacement or custom scripts

## Related Documentation

- [Manual Test Fixture Structure Standards](./manual-test-fixture-standards.md)
- [Max for Live Test Fixture Setup](./brief-max-for-live-fixture-setup.md)
- [Foundation Core Package Setup](../stories/1.1.foundation-core-package-setup.md)
