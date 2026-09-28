import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

// 由 Playwright webServer 以 node 启动，进程常驻直到 Playwright 终止；
// 配置路径固定解析到本目录，不依赖生成进程的当前工作目录。
const server = await createServer({
  configFile: fileURLToPath(new URL('./fixtures/vite.config.js', import.meta.url)),
  logLevel: 'warn',
});

await server.listen();
