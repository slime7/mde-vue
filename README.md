# mdu-ui

`mdu-ui` 是一个私有的 Vue 3 Material 3 组件库，面向最新浏览器中的客户端应用。项目使用 JavaScript、Vue SFC 和原生 CSS 开发，并通过私有 Git 仓库分发单一核心 ESM。

当前提供 `<mat-btn>`、`<mat-icon>`、`<mat-btn-group>`、`<mat-split-btn>`、`<mat-loader>`、`<mat-tooltip>`、Material 2025 动态主题、Tailwind CSS v4 语义令牌适配、可视 demo，以及面向 AI 的 `llms.txt` 和 `llms-full.txt`。

## 环境

- Node.js 24 LTS
- pnpm
- Vue 3

## 安装与使用

使用固定提交安装，避免私有仓库后续变更影响已有项目：

```sh
pnpm add 'mdu-ui@git+ssh://git@github.com/slime7/mdu-ui.git#<commit>'
```

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import 'mdu-ui/styles.css';
import App from './App.vue';

createApp(App)
  .use(createMatUi())
  .mount('#app');
```

```vue
<template>
  <mat-btn variant="filled">确认</mat-btn>
</template>
```

Tailwind CSS v4 项目可改为在应用 CSS 中一次性导入 Tailwind 和组件库样式，不再从 JavaScript 重复导入：

```css
@import 'tailwindcss';
@import 'mdu-ui/styles.css';
@import 'mdu-ui/tailwind.css';
```

## 本地开发

```sh
pnpm install
pnpm dev
```

文档站使用 `pnpm docs:dev` 启动。完整环境和检查命令见 [开发入门](docs/project/GETTING-STARTED.md)。

## 项目文档

- [产品愿景](docs/project/VISION.md)
- [架构说明](docs/project/ARCHITECTURE.md)
- [核心抽象](docs/project/ABSTRACTIONS.md)
- [架构决策记录](docs/project/adr/README.md)
- [LLMs.txt 使用说明](docs/site/ai/llms.md)
- AI 文档索引：`llms.txt`
- AI 完整文档：`llms-full.txt`

## 许可说明

本私有项目不声明对外开源许可。第三方内容及其许可见[第三方声明](THIRD_PARTY_NOTICES.md)。
