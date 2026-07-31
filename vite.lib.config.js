import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const sourceRoot = resolve(import.meta.dirname, 'src');
const componentRoot = resolve(sourceRoot, 'components');
const componentEntries = Object.fromEntries(
  readdirSync(componentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => [
      `components/${entry.name}/index`,
      resolve(componentRoot, entry.name, 'index.js'),
    ])
    .filter(([, entryPath]) => existsSync(entryPath)),
);

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(sourceRoot, 'index.js'),
        'functions/index': resolve(sourceRoot, 'functions/index.js'),
        'directives/intersection/index': resolve(sourceRoot, 'directives/intersection/index.js'),
        ...componentEntries,
      },
      formats: ['es'],
      cssFileName: 'components',
    },
    rollupOptions: {
      external: [
        'vue',
        /^@material\/material-color-utilities(?:\/|$)/,
      ],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: sourceRoot,
      },
    },
  },
});
