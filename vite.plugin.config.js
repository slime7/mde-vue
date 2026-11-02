import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/vite.js'),
      formats: ['es'],
      fileName: 'vite',
    },
    rollupOptions: {
      external: ['vue/compiler-sfc'],
    },
  },
});
