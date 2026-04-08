import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

export default defineConfig([
  // ESM build for import statements
  {
    input: 'src/typify.js',
    output: {
      file: 'dist/typify.esm.js',
      format: 'es',
    },
  },

  // CJS build for require()
  {
    input: 'src/typify.js',
    output: {
      file: 'dist/typify.cjs.cjs',
      format: 'cjs',
      exports: 'default',
    },
  },

  // IIFE build for CDN / script tags (minified)
  {
    input: 'src/typify.js',
    output: {
      file: 'dist/typify.min.js',
      format: 'iife',
      name: 'Typify',
      plugins: [terser()],
    },
  },
]);