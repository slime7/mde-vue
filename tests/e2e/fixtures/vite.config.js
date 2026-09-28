import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// fixture 通过 Vite alias 直接加载 src/ 维护权威，与文档站预览保持同一验证方式；
// 端口只在本机运行，Playwright webServer 负责启动与回收。
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^mde-vue$/,
        replacement: fileURLToPath(new URL('../../../src/index.js', import.meta.url)),
      },
      {
        find: /^mde-vue\/styles\.css$/,
        replacement: fileURLToPath(new URL('../../../src/styles/index.css', import.meta.url)),
      },
    ],
  },
  server: {
    // 显式绑定 IPv4，避免 Node 将 localhost 解析为 ::1 导致 Playwright 无法连接。
    host: '127.0.0.1',
    port: 4561,
    strictPort: true,
  },
  logLevel: 'warn',
});
