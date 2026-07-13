---
title: Tailwind CSS
description: 将 mdu-ui 运行时令牌接入 Tailwind CSS v4，并使用带 mat 前缀的语义工具类。
llms: true
order: 40
---

# Tailwind CSS

Tailwind CSS v4 是可选依赖。先按照 Tailwind 文档为 Vite 项目配置 `tailwindcss` 与 `@tailwindcss/vite`，然后在应用 CSS 中导入 Tailwind 和 mdu-ui 适配层：

```css
@import "tailwindcss";
@import "mdu-ui/tailwind.css";
```

应用入口仍需导入基础主题样式：

```js
import 'mdu-ui/styles.css';
```

适配层使用 `@theme inline`，将运行时令牌映射到带 `mat` 前缀的 Tailwind 主题变量。常见工具类包括：

```vue
<template>
  <section class="bg-mat-primary text-mat-on-primary rounded-mat-lg shadow-mat-2">
    内容会跟随 mdu-ui 主题变化
  </section>
</template>
```

颜色类来自 `--color-mat-*`，圆角类来自 `--radius-mat-*`，字号类来自 `--text-mat-*`，阴影类来自 `--shadow-mat-*`，缓动类来自 `--ease-mat-*`。新增的 `title-medium`、`headline-small` 和 `headline-large` 排版也已映射；组件专用尺寸令牌保持 CSS 定制入口，不生成大量专用工具类。适配层不会覆盖 `primary`、`surface` 等常见无前缀变量。
