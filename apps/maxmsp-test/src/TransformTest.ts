// Test file for Max 8 Promise polyfill integration
// This file uses async/await to test the transformer

async function testAsyncFunction(): Promise<string> {
    return new Promise((resolve) => {
        resolve("Async test successful");
    });
}

async function main() {
    try {
        const result = await testAsyncFunction();
        post('[TRANSFORM-TEST] ' + result + '\n');
    } catch (error) {
        post('[TRANSFORM-TEST] Error: ' + error.message + '\n');
    }
}

// Max for Live entry point
function bang() {
    main();
}
