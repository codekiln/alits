# MaxMSP Test Project

This project serves as a testing environment for Max for Live JavaScript development and library validation.

## Purpose

The `maxmsp-test` app is designed to:

1. **Test JavaScript in Max/MSP Environment**: Run JavaScript code directly in Max 8's JavaScript engine to validate functionality, compatibility, and behavior
2. **Test maxmsp-ts Compilation**: Validate that TypeScript code compiles correctly for Max for Live devices using the custom TypeScript transformer
3. **Test Local Library Imports**: Import and test libraries from the local monorepo workspace (like `@alits/core`) in the Max environment
4. **Validate Promise Polyfill**: Test the custom Promise polyfill injection system for async/await support

## Key Features

- **Max for Live Integration**: Direct testing of JavaScript code in Max 8's JavaScript engine
- **Workspace Dependencies**: Configured to use local packages from the monorepo workspace
- **TypeScript Compilation**: Tests the `@maxmsp-ts-transform` custom transformer
- **Environment Validation**: Includes test fixtures like `GlobalMethodsTest.js` to validate JavaScript capabilities

## Configuration

- **Package Dependencies**: Uses workspace packages (e.g., `@alits/core`) for local testing
- **MaxMSP Config**: Configured to bundle dependencies for Max for Live compatibility
- **TypeScript**: Uses custom transformer for Max 8 JavaScript engine compatibility

## Usage

This project is primarily used for:
- Manual testing of JavaScript functionality in Max for Live
- Validating TypeScript compilation results
- Testing library imports and integration
- Debugging JavaScript environment capabilities

## Differences from Template

- Configured to use local workspace dependencies instead of npm packages
- Includes custom test fixtures for environment validation
- Set up for monorepo development workflow
