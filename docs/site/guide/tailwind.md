---
title: Tailwind CSS
description: 将 mde-vue 运行时令牌接入 Tailwind CSS v4，并使用带 mat 前缀的语义工具类。
llms: true
order: 40
---

# Tailwind CSS

Tailwind CSS v4 是可选依赖。先按照 Tailwind 文档为 Vite 项目配置 `tailwindcss` 与 `@tailwindcss/vite`，然后在应用 CSS 中导入 Tailwind 和 mde-vue 适配层：

```css
@import "tailwindcss";
@import "mde-vue/tailwind.css";
```

应用 JavaScript 入口仍需导入基础主题样式：

``js
import 'mde-vue/styles.css';
``

适配层使用 `@theme inline`，将运行时令牌映射到带 `mat` 前缀的 Tailwind 主题变量。常见工具类包括：

```vue
<template>
  <section class="bg-mat-primary text-mat-on-primary rounded-mat-large shadow-mat-level2 ease-mat-emphasized">
    内容会跟随 mde-vue 主题变化
  </section>
</template>
```

颜色类来自 `--color-mat-*`，覆盖主题的全部 53 个颜色角色。字体族使用 `font-mat-brand`、`font-mat-icon` 和 `font-mat-plain`；15 套基线排版使用 `text-mat-<type>-<size>`，15 套强调排版使用 `text-mat-emphasized-<type>-<size>`，同时映射字号、行高、字距和字重。它们分别对应基础样式中的 `.mat-sys-typescale-<type>-<size>` 和 `.mat-sys-typescale-emphasized-<type>-<size>`。

圆角类完整映射系统形状，例如 `rounded-mat-extra-small`、`rounded-mat-large-increased`、`rounded-mat-extra-extra-large` 和 `rounded-mat-full`。海拔使用 `shadow-mat-level0` 至 `shadow-mat-level5`。六个缓动类为：

- `ease-mat-emphasized`、`ease-mat-emphasized-decelerate`、`ease-mat-emphasized-accelerate`；
- `ease-mat-standard`、`ease-mat-standard-decelerate`、`ease-mat-standard-accelerate`。

Tailwind v4 没有与本项目时长和状态令牌一一对应的主题变量命名空间，因此直接通过 CSS 属性使用，例如：

```css
.entering {
  transition-duration: var(--mat-sys-motion-duration-medium4);
  transition-timing-function: var(--mat-sys-motion-easing-emphasized-decelerate);
}
```

组件内部变量不属于公共 CSS API，也不生成按组件、尺寸和变体展开的工具类。适配层不会覆盖 `primary`、`surface` 等常见无前缀变量。
