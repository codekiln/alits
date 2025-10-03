const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

module.exports = [
  // Single build with RxJS - NON-MINIFIED for debugging
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        banner: `// @alits/core Build
// Build: ${new Date().toISOString()}
// Git: ${getGitInfo()}
// Entrypoint: index.ts
// Minified: No (Debug Build)
// RxJS: Included
// Max 8 Compatible: Yes
`
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: true,
        banner: `// @alits/core Build (ES Modules)
// Build: ${new Date().toISOString()}
// Git: ${getGitInfo()}
// Entrypoint: index.ts
// Minified: No (Debug Build)
// RxJS: Included
`
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
