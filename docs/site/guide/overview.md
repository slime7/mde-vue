---
title: 概述
description: 了解 mdu-ui 的定位、支持范围、导入方式和首期组件。
llms: true
order: 10
---

# 概述

`mdu-ui` 是一个仅供个人项目使用的 Vue 3 组件库。它只面向最新浏览器和客户端应用，源码使用 JavaScript、Vue SFC 与原生 CSS。

首期公共能力包括：

- `<mat-btn>` 按钮组件；
- Material 3 动态颜色主题；
- 可选的 Tailwind CSS v4 语义工具类；
- 面向开发者与 AI 的同源 Markdown 文档。

## 设计边界

项目不提供 npm 发布产物、TypeScript 声明、服务端渲染、旧浏览器兼容、本地化、IDE 插件或其他框架适配。组件源码由使用方的 Vue/Vite 项目直接编译。

## 公共入口

```js
import { createApp } from 'vue';
import { createMatUi, MatBtn } from 'mdu-ui';
import 'mdu-ui/styles.css';
```

完整入口提供 `createMatUi()`、`useMatTheme()` 和组件具名导出。单组件入口 `mdu-ui/components/mat-btn` 只导出 `MatBtn`。

需要动态主题或多个组件时，推荐安装 `createMatUi()` 并使用全局 `<mat-btn>` 标签。仅使用少量组件且接受默认主题时，推荐从单组件入口按需导入，并在模板中使用 `<MatBtn>`。两种方式的完整代码见[安装](/guide/installation)。
