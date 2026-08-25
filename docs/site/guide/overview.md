---
title: 概述
description: 了解 mde-vue 的定位、支持范围、导入方式和 Material 组件体系。
llms: true
order: 10
---

# 概述

`mde-vue` 是一个基于 Vue 3 的 Material 3 Expressive 个人组件库，由个人主导、AI（Coding Agent）重度参与设计、实现与维护。它主要面向 Electron 等拥有现代化 Chromium/浏览器内核的客户端应用，源码使用 JavaScript、Vue SFC 与原生 CSS。

当前公共能力包括：

- Button、FAB、Card、List、Checkbox、Radio、Switch、Dialog、Tooltip 和 Snackbar 等 Material 组件；
- Material 2025 动态颜色主题和组件级 `color` 配色；
- 可选的 Tailwind CSS v4 语义工具类；
- 面向开发者与 AI 的同源 Markdown 文档。

## 设计边界

项目当前通过 GitHub 仓库分发构建后的 ESM 单包产物与 TypeScript 类型声明，暂不发布到 npm 仓库。直接采用现代 Web 标准与 CSS 特性，不提供服务端渲染、旧浏览器兼容、本地化、IDE 插件或其他前端框架适配。

## 公共入口

```js
import { createApp } from 'vue';
import {
  createMatUi,
  MatBtn,
  MatFab,
  MatCard,
} from 'mde-vue';
import 'mde-vue/styles.css';
```

唯一根入口提供 `createMatUi()`、`useMatTheme()`、全部组件、指令和命令式函数的具名导出。构建工具仍可对未使用的具名导出执行 tree shaking。

需要动态主题或多个组件时，推荐安装 `createMatUi()` 并使用全局 `mat-*` 标签。仅使用少量组件且接受默认主题时，从同一根入口具名导入并局部注册。两种方式的完整代码见[安装](/guide/installation)，插件的组件设置见 [`createMatUi`](/guide/create-mat-ui)。
