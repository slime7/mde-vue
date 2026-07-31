import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/distribution-entry.js'),
      formats: ['es'],
      fileName: 'mdu-ui',
      cssFileName: 'components',
    },
    rollupOptions: {
      external: [
        'vue',
        /^@material\/material-color-utilities(?:\/|$)/,
      ],
    },
  },
});
