#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple bundler to combine TypeScript test files with actual @alits/core package
function bundleTest(testName) {
    const testDir = path.join(__dirname, testName);
    const srcFile = path.join(testDir, 'src', `${testName.charAt(0).toUpperCase() + testName.slice(1)}Test.ts`);
    const outputFile = path.join(testDir, 'fixtures', `${testName.charAt(0).toUpperCase() + testName.slice(1)}Test.js`);
    
    // Read the actual compiled @alits/core package
    const corePackagePath = path.join(__dirname, '../../../dist/index.js');
    const corePackage = fs.readFileSync(corePackagePath, 'utf8');
    
    // Read the TypeScript test file
    const testFile = fs.readFileSync(srcFile, 'utf8');
    
    // Replace the import statement with the actual package content
    const bundledContent = testFile
        .replace(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]@alits\/core['"];?/g, (match, imports) => {
            // Extract the imported names
            const importNames = imports.split(',').map(name => name.trim());
            
            // Create a simple module export for the imported names
            let moduleExports = '';
            importNames.forEach(name => {
                moduleExports += `const ${name} = alitsCore.${name};\n`;
            });
            
            return `// Bundled @alits/core package\nconst alitsCore = (function() {\n${corePackage}\nreturn { ${importNames.join(', ')} };\n})();\n${moduleExports}`;
        });
    
    // Write the bundled file
    fs.writeFileSync(outputFile, bundledContent);
    console.log(`Bundled ${testName} test successfully`);
}

// Bundle all tests
const tests = ['liveset-basic', 'midi-utils', 'observable-helper'];

tests.forEach(test => {
    try {
        bundleTest(test);
    } catch (error) {
        console.error(`Failed to bundle ${test}:`, error.message);
    }
});

console.log('All tests bundled successfully!');
