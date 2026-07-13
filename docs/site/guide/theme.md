---
title: 主题
description: 配置 Material 3 种子色、亮暗模式、配色变体和对比度，并在运行时切换主题。
llms: true
order: 30
---

# 主题

`createMatUi()` 接受可选的 `theme` 配置。所有颜色按 Material 2025 phone 规格生成。默认种子色是 `#20a6fc`，默认模式是 `system`，默认配色变体是 `tonal-spot`，默认对比度是 `0`。

## 初始化

在应用入口导入基础样式，并把插件传给 Vue 应用的 `.use()`：

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import App from './App.vue';
import 'mdu-ui/styles.css';

createApp(App)
  .use(createMatUi({
    theme: {
      mode: 'system',
      seedColor: '#20a6fc',
      schemeVariant: 'tonal-spot',
      contrastLevel: 0,
    },
  }))
  .mount('#app');
```

省略 `theme` 或直接调用 `createMatUi()` 会使用全部默认值。初始化会立即把颜色令牌写入 `document.documentElement`，因此整个应用都能继承主题。

## 配置项

| 配置 | 类型或可用值 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `mode` | `light`、`dark`、`system` | `system` | `system` 跟随系统配色偏好 |
| `seedColor` | `#RGB` 或 `#RRGGBB` | `#20a6fc` | 用于生成完整 Material 3 色板 |
| `schemeVariant` | 四种 Material 2025 变体 | `tonal-spot` | 控制从种子色生成配色的方式 |
| `contrastLevel` | `-1` 至 `1` 的有限数字 | `0` | 调整配色对比度，越界值会抛出 `RangeError` |
| `target` | 可设置 CSS 属性的 `HTMLElement` | `document.documentElement` | 接收 `--mat-sys-color-*` 令牌，必须是使用组件的祖先 |

支持的 `schemeVariant` 是 `tonal-spot`、`neutral`、`vibrant` 和 `expressive`。依赖中的其他变体会回退到旧规格，因此不属于公共 API。

非法的 `mode`、`seedColor`、`schemeVariant` 或 `target` 会在初始化或更新时抛出 `TypeError`。

## 运行时切换

在插件后代组件中调用 `useMatTheme()`，通过返回的主题控制器更新配置：

```vue
<script setup>
import { useMatTheme } from 'mdu-ui';

const theme = useMatTheme();

function enableDarkMode() {
  theme.setMode('dark');
}

function changeSeedColor() {
  theme.setSeedColor('#6750a4');
}
</script>
```

### 主题控制器 API

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `mode` | 只读 `Ref` | 当前配置的 `light`、`dark` 或 `system` |
| `resolvedMode` | 只读 `Ref` | 实际生效的 `light` 或 `dark` |
| `seedColor` | 只读 `Ref` | 规范化为六位小写格式的种子色 |
| `schemeVariant` | 只读 `Ref` | 当前配色变体 |
| `contrastLevel` | 只读 `Ref` | 当前对比度 |
| `target` | `HTMLElement` | 当前令牌写入目标 |
| `setMode(value)` | 方法 | 更新模式并重新应用主题 |
| `setSeedColor(value)` | 方法 | 更新种子色并重新生成配色 |
| `setSchemeVariant(value)` | 方法 | 更新配色变体 |
| `setContrastLevel(value)` | 方法 | 更新对比度 |
| `dispose()` | 方法 | 停止监听系统主题，移除控制器写入的颜色令牌和主题属性；可重复调用 |

主题不会自动写入 `localStorage`；需要持久化时由应用自行读取与保存。应用完全卸载且不再使用插件时，应调用插件实例的 `theme.dispose()` 清理系统主题监听和控制器写入的主题状态。

```js
const matUi = createMatUi();
const app = createApp(App);

app.use(matUi).mount('#app');

// 应用宿主确认不再使用主题时调用。
matUi.theme.dispose();
```

## CSS 令牌

令牌分为三层：`--mat-ref-*` 保存字体族和字重参考值，`--mat-sys-*` 保存跨组件系统语义，`--mat-<component>-*` 保存各组件明确公开的定制入口。旧的扁平命名空间不再提供兼容别名。

运行时只向 `target` 写入 53 个 `--mat-sys-color-*`。基础样式同时提供默认亮暗回退值以及下列静态系统令牌。应用样式可以直接使用，例如 `color: var(--mat-sys-color-on-surface)`。

### 颜色

- Primary：`primary`、`primary-dim`、`on-primary`、`primary-container`、`on-primary-container`、`inverse-primary`、`primary-fixed`、`primary-fixed-dim`、`on-primary-fixed`、`on-primary-fixed-variant`。
- Secondary：`secondary`、`secondary-dim`、`on-secondary`、`secondary-container`、`on-secondary-container`、`secondary-fixed`、`secondary-fixed-dim`、`on-secondary-fixed`、`on-secondary-fixed-variant`。
- Tertiary：`tertiary`、`tertiary-dim`、`on-tertiary`、`tertiary-container`、`on-tertiary-container`、`tertiary-fixed`、`tertiary-fixed-dim`、`on-tertiary-fixed`、`on-tertiary-fixed-variant`。
- Error：`error`、`error-dim`、`on-error`、`error-container`、`on-error-container`。
- Surface：`background`、`on-background`、`surface`、`surface-dim`、`surface-bright`、`surface-container-lowest`、`surface-container-low`、`surface-container`、`surface-container-high`、`surface-container-highest`、`on-surface`、`surface-variant`、`on-surface-variant`。
- 边界与反色：`outline`、`outline-variant`、`inverse-surface`、`inverse-on-surface`。
- 辅助角色：`shadow`、`scrim`、`surface-tint`。

以上名称统一加 `--mat-sys-color-` 前缀。

### 字体与排版

参考字体为 `--mat-ref-typeface-brand`、`--mat-ref-typeface-plain`，默认均为 `system-ui, sans-serif`；字重为 `--mat-ref-typeface-weight-regular`、`medium`、`bold`。

系统排版包含 `display`、`headline`、`title`、`body`、`label` 五组，每组都有 `large`、`medium`、`small`，并分别公开 `font`、`weight`、`size`、`line-height`、`tracking` 五个轴。例如 `--mat-sys-typescale-title-medium-size`。强调样式使用 `--mat-sys-typescale-emphasized-<style>-<axis>`，共提供相同的 15 套样式。

### 形状、海拔、动效和状态

- 形状：`--mat-sys-shape-corner-none`、`extra-small`、`small`、`medium`、`large`、`large-increased`、`extra-large`、`extra-large-increased`、`extra-extra-large`、`full`，值依次为 `0 / 4 / 8 / 12 / 16 / 20 / 28 / 32 / 48 / 9999px`。
- 海拔：`--mat-sys-elevation-level0` 至 `level5`，值可直接用于 `box-shadow`；组件优先通过 surface container 色表达层级。
- 时长：`--mat-sys-motion-duration-short1..4`、`medium1..4`、`long1..4`、`extra-long1..4`，范围为 `50ms` 至 `1000ms`。
- 缓动：`--mat-sys-motion-easing-emphasized`、`emphasized-decelerate`、`emphasized-accelerate`、`standard`、`standard-decelerate`、`standard-accelerate`。
- 状态层：`--mat-sys-state-hover-state-layer-opacity` 为 `0.08`，focus 与 pressed 为 `0.12`，dragged 为 `0.16`；disabled container 与 content 分别为 `0.10` 和 `0.38`。
- 交互：`--mat-sys-interaction-target-min-size` 为 `48px`，焦点环使用 `--mat-sys-interaction-focus-ring-width` 和 `--mat-sys-interaction-focus-ring-offset`。

实现组件时不能只根据色值挑选令牌。容器与内容的配对、强调层级、表面层级和边界选择见[组件配色](/guide/component-color)。
