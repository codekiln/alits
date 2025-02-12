# Create ALITS Core Package

This MR implements issue #23 to create the `@alits/core` package, which will serve as the foundation for ALITS (Ableton Live Integration with TypeScript).

## Changes Made

1. Created `packages/alits-core` by copying the template from `packages/my-library`
2. Updated package metadata:
   - Renamed package to `@alits/core`
   - Updated description and keywords
   - Added Ableton Live related keywords
3. Updated `apps/kebricide` to use the new package:
   - Changed dependency from `@my-username/my-library` to `@alits/core`
   - Updated import statements in TypeScript files
   - Updated MaxMSP configuration to use the new package alias

## Testing Done

- [x] Package builds successfully with `pnpm build`
- [x] Tests pass with `pnpm test`
- [x] Integration with `apps/kebricide` works as expected
- [x] No changes were made to `apps/maxmsp-test` as per requirements

## Notes

- The `apps/maxmsp-test` dependency on `packages/my-library` was intentionally left unchanged as specified in the issue
- The package is currently at version 0.0.1 and will be versioned appropriately as we add more functionality

Closes #23 