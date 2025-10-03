# @codekiln/maxmsp-ts-transform

Custom TypeScript transformer for Max 8 compatibility with Promise polyfill injection.

## Overview

This package provides a custom TypeScript transformer that automatically injects Promise polyfill code into compiled JavaScript files, enabling async/await functionality in Max 8's ES5 environment.

## Problem

Max 8's JavaScript engine only supports ES5 features, but TypeScript's async/await compilation requires Promise support at runtime. The generated `__awaiter` and `__generator` helper functions execute immediately and reference the `Promise` constructor, which doesn't exist in Max 8.

## Solution

This transformer automatically injects a Max Task-based Promise polyfill at the top of compiled files, ensuring Promise is available before any async code executes.

## Usage

### Basic Usage

```typescript
import { createMax8Transform } from '@codekiln/maxmsp-ts-transform';
import * as ts from 'typescript';

const program = ts.createProgram(['src/index.ts'], {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  lib: ['es5', 'es2015.promise']
});

const transformers: ts.CustomTransformers = {
  before: [createMax8Transform()]
};

const emitResult = program.emit(undefined, undefined, undefined, undefined, transformers);
```

### With Custom Options

```typescript
import { createMax8Transform } from '@codekiln/maxmsp-ts-transform';

const transformer = createMax8Transform({
  injectPolyfill: true,
  customPolyfill: '// Custom polyfill code here'
});
```

## Integration with maxmsp-ts

This transformer is designed to integrate seamlessly with the `@codekiln/maxmsp-ts` build system:

1. **Automatic Detection**: Only injects polyfill into files that contain async/await or Promise usage
2. **Build Integration**: Works with existing TypeScript compilation pipeline
3. **Zero Configuration**: Default settings work for most Max 8 projects

## Features

- ✅ **Automatic Detection**: Only processes files with async/await code
- ✅ **Max Task Compatible**: Uses Max's task scheduling instead of setTimeout
- ✅ **Zero Runtime Dependencies**: Pure JavaScript implementation
- ✅ **TypeScript Integration**: Works with existing TypeScript compilation
- ✅ **Configurable**: Custom polyfill injection options

## API

### `createMax8Transform(options?)`

Creates a TypeScript transformer factory for Max 8 compatibility.

**Parameters:**
- `options` (optional): Configuration options

**Options:**
- `injectPolyfill?: boolean` - Whether to inject Promise polyfill (default: true)
- `customPolyfill?: string` - Custom polyfill code to inject

**Returns:** `ts.TransformerFactory<ts.SourceFile>`

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode
pnpm dev

# Run tests
pnpm test
```

## License

MIT
