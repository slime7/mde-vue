import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  ssr: {
    noExternal: ['@material/material-color-utilities'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.spec.js'],
    clearMocks: true,
    restoreMocks: true,
  },
});
