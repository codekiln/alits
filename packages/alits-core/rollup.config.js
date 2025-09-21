const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");

module.exports = [
  // Full build with RxJS (for Node.js/browser) - MINIFIED
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  // Max 8 compatible build (no RxJS) - MINIFIED
  {
    input: "src/index-max8.ts",
    output: [
      {
        file: "dist/index-max8.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  // Max 8 DEBUG build (no RxJS) - NON-MINIFIED for debugging
  {
    input: "src/index-max8.ts",
    output: [
      {
        file: "dist/index-max8-debug.js",
        format: "cjs",
        sourcemap: true,
        banner: `// Max 8 Debug Build - @alits/core
// Build: ${new Date().toISOString()}
// Git: ${getGitInfo()}
// Entrypoint: index-max8.ts
// Minified: No (Debug Build)
// Max 8 Compatible: Yes
`
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      resolve(),
      commonjs(),
      // NO terser() - keep unminified for debugging
    ],
  },
];

function getGitInfo() {
  try {
    const { execSync } = require('child_process');
    return execSync('git describe --tags --always', { encoding: 'utf8' }).trim();
  } catch (e) {
    return 'unknown';
  }
}
