# mde-vue

`mde-vue` 是一个基于 Vue 3 和原生 CSS 构建的 Material 3 Expressive 个人组件库，主要面向 Electron 等拥有现代化 Chromium/浏览器内核的客户端应用。本项目由个人主导、AI（Coding Agent）重度参与设计、实现与维护。

组件库直接利用现代 Web API 与 CSS 前沿特性（如现代 CSS 动画、`clip-path: shape()`、Scroll Timeline、View Transitions 等），不提供旧浏览器兼容层与 SSR 兼容包袱。通过单一核心 ESM 分发，提供完整的 Material 3 基础组件、Material 2025 动态主题系统、Tailwind CSS v4 语义令牌适配，以及面向 AI 的 `llms.txt` 和 `llms-full.txt` 机器可读文档。

- 📖 **在线文档**：[https://slime7.github.io/mde-vue/](https://slime7.github.io/mde-vue/)
- 🤖 **AI 文档索引**：[llms.txt](llms.txt) / [llms-full.txt](llms-full.txt)

## 环境要求

- Node.js 24 LTS
- pnpm >= 10
- Vue 3.5+
- 目标环境：Electron 或其他搭载现代化 Chromium/现代内核的客户端与浏览器环境

## 安装

可以通过 GitHub 仓库地址直接安装，建议使用固定提交（Commit SHA）或标签（Tag）锁定版本：

```sh
# 通过 HTTPS 安装固定版本（推荐）
pnpm add "mde-vue@git+https://github.com/slime7/mde-vue.git#<commit-or-tag>"

# 或通过 SSH 安装
pnpm add "mde-vue@git+ssh://git@github.com/slime7/mde-vue.git#<commit-or-tag>"
```

## 快速上手

在应用入口注册 `createMatUi` 插件并引入核心样式：

```js
import { createApp } from 'vue';
import { createMatUi } from 'mde-vue';
import 'mde-vue/styles.css';
import App from './App.vue';

createApp(App)
  .use(createMatUi({
    theme: {
      seedColor: '#20a6fc',
    },
  }))
  .mount('#app');
```

在模板中使用组件（支持 `mat-*` 和 `Mat*` 两种命名风格）：

```vue
<template>
  <mat-app-root>
    <mat-btn variant="filled">确认</mat-btn>
    <mat-icon name="favorite" />
  </mat-app-root>
</template>
```

### Tailwind CSS v4 配合使用

Tailwind CSS v4 项目建议建立独立的层序文件维护样式顺序：

```css
/* src/styles/layers.css */
@layer tailwind-theme, tailwind-reset, mde, tailwind-utilities, mde-final;

@import 'tailwindcss/theme.css' layer(tailwind-theme);
@import 'tailwindcss/preflight.css' layer(tailwind-reset);
@import 'tailwindcss/utilities.css' layer(tailwind-utilities);
```

在应用样式入口引入：

```css
/* src/styles/app.css */
@import './layers.css';
@import 'mde-vue/styles.css';
@import 'mde-vue/tailwind.css';
```

## 本地开发

```sh
pnpm install
pnpm dev # 启动文档与示例预览
```

完整环境和检查命令见 [开发入门](docs/project/GETTING-STARTED.md)。

## 项目文档

- [产品愿景](docs/project/VISION.md)
- [架构说明](docs/project/ARCHITECTURE.md)
- [核心抽象](docs/project/ABSTRACTIONS.md)
- [架构决策记录](docs/project/adr/README.md)
- [LLMs.txt 使用说明](docs/site/ai/llms.md)

## 许可说明

本项目采用 [MIT 许可证](LICENSE) 开源。引用的第三方内容及其许可见 [第三方声明](THIRD_PARTY_NOTICES.md)。
