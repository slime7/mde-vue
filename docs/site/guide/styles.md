---
title: 样式
description: 使用 mde-vue 的 CSS 级联层、公共设计令牌与 Tailwind CSS v4 语义映射。
llms: true
order: 50
---

# 样式

`mde-vue/styles.css` 是所有项目都要导入的基础样式入口，包含公共令牌、组件样式、公共排版工具类和少量最终安全不变量。`mde-vue/tailwind.css` 是可选的 Tailwind CSS v4 `@theme inline` 映射，不包含组件样式。

## CSS 级联层

基础样式入口公开以下稳定层：

```css
@layer mde.tokens, mde.components, mde.utilities;
@layer mde-final;
```

- `mde.tokens`：公共 `--mat-ref-*`、`--mat-sys-*` 令牌和默认亮暗主题值。
- `mde.components`：全部组件与公共指令的普通结构和状态样式。
- `mde.utilities`：`.mat-sys-typescale-*` 公共排版工具类。
- `mde-final`：独立的顶层最终层，只保护不会阻断 Vue 运行时控制的少量结构或交互安全不变量。

`mde-final` 不是 `mde.final`。它必须是顶层名称，使用方才能把外部工具类放在 `mde` 之后、把最终安全不变量放在外部工具类之后。层名和顺序属于公共 CSS 接口。

未分层的普通应用 CSS 优先于所有普通命名层；元素的普通内联样式也保持优先。因此应用仍能有意覆盖组件。`mde-final` 不保护 `display`、`visibility`、`opacity`、运行时尺寸、位置或变换，避免阻断 Vue `v-show`、`:style`、Web Animations 和脚本更新。

## Tailwind CSS v4

Tailwind 项目不要使用单个 `@import 'tailwindcss'` 与组件库争夺未明确的层序。建议建立独立的 `src/styles/layers.css`，集中维护整个应用的顶层顺序和框架样式导入：

```css
/* src/styles/layers.css */
@layer tailwind-theme, tailwind-reset, mde, tailwind-utilities, mde-final;

@import 'tailwindcss/theme.css' layer(tailwind-theme);
@import 'tailwindcss/preflight.css' layer(tailwind-reset);
@import 'tailwindcss/utilities.css' layer(tailwind-utilities);
```

应用样式入口必须先导入该文件，再编写应用自身样式：

```css
/* src/styles/app.css */
@import './layers.css';
@import 'mde-vue/styles.css';
@import 'mde-vue/tailwind.css';

/* 应用样式从这里开始。 */
```

然后只需在 JavaScript 应用入口导入 `app.css`，不要再次单独导入 `mde-vue/styles.css`：

```js
import './styles/app.css';
```

这套顺序让 Tailwind Preflight 先完成全局标准化，再由 `mde.components` 恢复组件需要的原生元素样式；Tailwind utilities 随后可按使用方意图覆盖普通组件样式；`mde-final` 最后只维持少量安全不变量。组件库不承诺任意第三方层序都能得到相同结果，使用 Tailwind 时应预先声明上述完整顺序。

适配入口把运行时令牌映射到带 `mat` 前缀的 Tailwind 主题变量：

```vue
<template>
  <section class="bg-mat-primary text-mat-on-primary rounded-mat-large shadow-mat-level2 ease-mat-emphasized">
    内容会跟随 mde-vue 主题变化
  </section>
</template>
```

颜色类来自 `--color-mat-*`，覆盖全部 53 个颜色角色。字体族使用 `font-mat-brand`、`font-mat-icon` 和 `font-mat-plain`；排版使用 `text-mat-<type>-<size>` 与 `text-mat-emphasized-<type>-<size>`。圆角使用 `rounded-mat-*`，海拔使用 `shadow-mat-level0` 至 `shadow-mat-level5`，缓动使用 `ease-mat-*`。

时长和状态没有对应的 Tailwind v4 主题命名空间，可直接使用公共令牌：

```css
.entering {
  transition-duration: var(--mat-sys-motion-duration-medium4);
  transition-timing-function: var(--mat-sys-motion-easing-emphasized-decelerate);
}
```

## 公共 CSS 令牌

公共令牌分为 `--mat-ref-*` 参考值和 `--mat-sys-*` 系统语义值。组件内部的 `--mat-<component>-*` 变量不是公共定制入口，也不提供兼容承诺。

### 颜色

运行时主题向目标元素写入 53 个 `--mat-sys-color-*` 令牌，基础样式同时提供默认亮暗回退值。主要分组如下：

- Primary、Secondary、Tertiary：base、dim、on-base、container、on-container、fixed 和 inverse 等角色。
- Error：`error`、`error-dim`、`on-error`、`error-container`、`on-error-container`。
- Surface：`background`、`surface`、各级 `surface-container-*`、对应内容色和 variant。
- 边界与辅助：`outline`、`outline-variant`、inverse、shadow、scrim 与 surface tint。

应用可直接引用，例如 `color: var(--mat-sys-color-on-surface)`。颜色角色的选择与配对见[组件配色](/guide/component-color)。

### 字体与排版

参考字体使用 `--mat-ref-typeface-brand`、`--mat-ref-typeface-plain`、`--mat-ref-typeface-icon`，字重使用 `--mat-ref-typeface-weight-*`。

系统排版包含 `display`、`headline`、`title`、`body`、`label` 五组，每组都有 `large`、`medium`、`small` 以及 `font`、`weight`、`size`、`line-height`、`tracking` 五个轴。强调样式使用 `--mat-sys-typescale-emphasized-*`。基础样式还提供对应的 `.mat-sys-typescale-*` 公共 class；需要动态根元素时可使用 [`MatText`](/components/text)。

### 形状、海拔、动效和状态

- 形状：`--mat-sys-shape-corner-*`，从 `none` 到 `full`。
- 海拔：`--mat-sys-elevation-level0` 至 `level5`。
- 动效：`--mat-sys-motion-duration-*`、`--mat-sys-motion-easing-*` 和 `--mat-sys-motion-spring-*`。
- 状态：`--mat-sys-state-*`，包括 hover、focus、pressed、dragged 与 disabled 透明度。
- 交互：`--mat-sys-interaction-*`，包括最小目标尺寸和焦点环参数。

空间动效使用 spatial 复合令牌，颜色与透明度使用 effects 复合令牌；减少动态效果时，组件直接呈现静态可理解状态。
