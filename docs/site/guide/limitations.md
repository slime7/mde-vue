---
title: 限制
description: 记录 mdu-ui 当前明确不支持的运行环境、分发方式和按钮能力。
llms: true
order: 60
---

# 限制

当前版本有意保持较小的支持范围：

- 仅支持 Vue 3 客户端应用和最新浏览器；
- 不支持 SSR、旧浏览器、本地化、IDE 插件或其他前端框架；
- 不发布 npm 包，不提供预编译 `dist`，也不提供 TypeScript 声明；
- 使用方的构建工具必须能够处理 `.vue` 源文件和 CSS；
- 主题不会自动持久化，也不会自动写入应用状态；
- 当前公共按钮组件集中在 Button、Button group 与 Split button；Button 同时提供普通模式和图标模式。

按钮体系不提供 loading、链接模式、涟漪、密度参数或完整的原生表单方法代理。`<mat-split-btn>` 不渲染菜单；应用负责菜单内容、焦点移动、Escape、外部点击和焦点返回。Button 图标模式目前使用原生 `title` 提示，后续有独立 Tooltip 组件时再提供一致的可见提示。不要依赖未记录的内部 class 或 DOM 结构补充这些能力。
