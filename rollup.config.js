import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';

const isProd = (process.env.BUILD === 'production');

export default {
  input: './src/main.ts',
  output: {
    dir: './build',
    sourcemap: 'inline',
    sourcemapExcludeSources: isProd,
    format: 'cjs',
    exports: 'default',
  },
  external: ['obsidian'],
  plugins: [
    copyAndWatch('src/styles.css', 'styles.css'),
    copyAndWatch('src/manifest.json', 'manifest.json'),
    copyAndWatch('src/wordnet.sqlite', 'wordnet.sqlite'),
    typescript(),
    nodeResolve({browser: true}),
    commonjs(),
  ]
};

function copyAndWatch(fileIn, fileOut, isProd) {
  return {
    name: 'copy-and-watch',
    async buildStart() {
      this.addWatchFile(fileIn);
    },
    async generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: fileOut,
        source: fs.readFileSync(fileIn),
      });
    },
  };
}