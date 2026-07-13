---
title: 主题
description: 配置 Material 3 种子色、亮暗模式、配色变体和对比度，并在运行时切换主题。
llms: true
order: 30
---

# 主题

`createMatUi()` 接受可选的 `theme` 配置。默认种子色是 `#20a6fc`，默认模式是 `system`，默认配色变体是 `tonal-spot`，默认对比度是 `0`。

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
| `schemeVariant` | 九种 Material 3 变体 | `tonal-spot` | 控制从种子色生成配色的方式 |
| `contrastLevel` | `-1` 至 `1` 的有限数字 | `0` | 调整配色对比度，越界值会抛出 `RangeError` |
| `target` | 可设置 CSS 属性的 `HTMLElement` | `document.documentElement` | 接收 `--mat-*` 令牌，必须是使用组件的祖先 |

支持的 `schemeVariant` 是 `tonal-spot`、`neutral`、`vibrant`、`expressive`、`fidelity`、`content`、`monochrome`、`rainbow` 和 `fruit-salad`。

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
| `dispose()` | 方法 | 停止监听系统主题，可重复调用 |

主题不会自动写入 `localStorage`；需要持久化时由应用自行读取与保存。应用完全卸载且不再使用插件时，应调用插件实例的 `theme.dispose()` 清理系统主题监听。

```js
const matUi = createMatUi();
const app = createApp(App);

app.use(matUi).mount('#app');

// 应用宿主确认不再使用主题时调用。
matUi.theme.dispose();
```

## CSS 令牌

运行时会在目标元素写入以下命名空间的 CSS 自定义属性：

- 颜色：`--mat-color-*`；
- 形状：`--mat-shape-*`；
- 排版：`--mat-type-*`；
- 阴影：`--mat-shadow-*`；
- 动效：`--mat-motion-*`；
- 状态：`--mat-state-*`。

应用样式可以直接使用令牌，例如 `color: var(--mat-color-on-surface)`。主题切换时，依赖这些令牌的组件和应用样式会同步更新。

实现组件时不能只根据色值挑选令牌。容器与内容的配对、强调层级、表面层级和边界选择见[组件配色](/guide/component-color)。
