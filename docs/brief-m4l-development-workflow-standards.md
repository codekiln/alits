# Max for Live Development Workflow Standards

## Problem Statement

Current Max for Live development with AI assistance suffers from:
- **Minified code** making debugging impossible
- **No build identification** making it hard to track changes
- **Whack-a-mole debugging** instead of systematic problem solving
- **No automated testing workflow** for Max 8 compatibility

## Solution: Scalable Debugging Workflow

### 1. Build Identification System

Every Max for Live test fixture should print build information on compile:

```javascript
// Auto-generated build info - DO NOT EDIT
function printBuildInfo() {
    post('[BUILD] Entrypoint: LiveSetBasicTest\n');
    post('[BUILD] Git: ' + getGitInfo() + '\n');
    post('[BUILD] Timestamp: ' + new Date().toISOString() + '\n');
    post('[BUILD] Source: @alits/core production build\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
}

function getGitInfo() {
    // This would be replaced during build process
    return 'v1.0.0-5-g1234567';
}

// Print build info on compile
printBuildInfo();
```

### 2. Non-Minified Development Builds

**Rule**: All Max for Live test fixtures use **non-minified** builds for debugging.

**Implementation**:
- Create separate rollup config for Max 8 testing
- Disable minification (`terser`) for Max 8 builds
- Enable source maps for debugging
- Add build identification headers

### 3. Automated Max 8 Compatibility Testing

**Rule**: Every build must pass Max 8 compatibility checks.

**Implementation**:
- Build identification system
- Max 8 specific error handling
- Automated compatibility reporting

### 4. Systematic Problem Solving

**Rule**: Document every issue with:
- Build identification
- Error context
- Max 8 specific limitations
- Solution approach

## Implementation Plan

### Phase 1: Build Identification
1. Create build script that injects git info
2. Add build headers to all Max 8 test fixtures
3. Standardize error reporting format

### Phase 2: Non-Minified Builds
1. Create Max 8 specific rollup config
2. Disable minification for test builds
3. Enable source maps for debugging

### Phase 3: Automated Testing
1. Create Max 8 compatibility test suite
2. Automated build verification
3. Error pattern recognition

## Benefits

1. **Traceable Changes**: Every test run shows exact build version
2. **Debuggable Code**: Non-minified builds with source maps
3. **Systematic Debugging**: Documented error patterns and solutions
4. **AI-Friendly**: Clear error messages and build context
5. **Scalable**: Works for any npm package in Max 8

## Next Steps

1. Fix immediate `this` undefined error
2. Implement build identification system
3. Create non-minified Max 8 build process
4. Document this workflow for future development
