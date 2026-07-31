---
title: 限制
description: 记录 mdu-ui 当前明确不支持的运行环境、分发方式。
llms: true
order: 60
---

# 限制

当前版本有意保持较小的支持范围：

- 仅支持 Vue 3 客户端应用和最新浏览器；
- 不支持 SSR、旧浏览器、本地化、IDE 插件或其他前端框架；
- 不发布 npm registry 包，不提供 CommonJS 产物；
- 只分发预构建 ESM、CSS 和 Vue 类型声明，使用方无需处理组件库的 `.vue` 源文件；
- 主题不会自动持久化，也不会自动写入应用状态；
