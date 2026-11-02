import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import { mdeVue } from './src/vite';

export default defineConfig({
  plugins: [mdeVue(), vue()],
  ssr: {
    noExternal: ['@material/material-color-utilities'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.js'],
    include: ['tests/unit/**/*.spec.js'],
    clearMocks: true,
    restoreMocks: true,
  },
});
