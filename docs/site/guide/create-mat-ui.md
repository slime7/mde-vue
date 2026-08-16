---
title: createMatUi
description: 配置 mde-vue 的全局组件注册、组件默认属性、交互指针、图标 class 和主题控制器。
llms: true
order: 25
---

# createMatUi

`createMatUi(options)` 创建供 Vue 应用安装的 mde-vue 插件。插件会全局注册所有 `mat-*` 组件、创建主题控制器，并把组件设置与主题上下文提供给应用后代。

插件安装时还会把当前主题和组件设置提供给随后创建的 `dialog()`、`alert()`、`confirm()`、`prompt()`、`snackbar()` 与 `toast()`。同一页面安装多个 Vue 应用时，命令式 Dialog 和 Snackbar 使用最后安装的插件配置；未安装插件时使用默认图标 class、指针设置和基础主题令牌。

## 基本用法

```js
import { createApp } from 'vue';
import { createMatUi } from 'mde-vue';
import App from './App.vue';
import 'mde-vue/styles.css';

const matUi = createMatUi({
  iconClass: 'material-symbols-outlined',
  useCursor: true,
  defaults: {
    tooltip: {
      openDelay: 600,
    },
  },
  theme: {
    mode: 'system',
    seedColor: '#20a6fc',
  },
});

createApp(App).use(matUi).mount('#app');
```

所有选项都可以省略。传给 `createMatUi()` 的值必须是对象，`useCursor` 必须是 `boolean`，`iconClass` 必须是 `string`，`defaults` 必须是对象且每个组件条目必须是对象，否则会抛出 `TypeError`。`defaults` 的组件键必须是现有公共组件，属性键必须是该组件可配置的 prop（v-model 属性除外），否则也会抛出 `TypeError`。Tooltip 延迟必须是非负有限数字，非法数值会抛出 `RangeError`。

## 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `iconClass` | `string` | `'material-symbols-outlined'` | 应用于 `MatIcon` 和组件图标容器的空格分隔 class |
| `useCursor` | `boolean` | `false` | 是否为可用交互组件显示 `cursor: pointer` |
| `defaults` | `object` | `{ tooltip: { openDelay: 0, closeDelay: 600 } }` | 按组件键设置的默认属性，值为项目内该组件的 prop 默认值 |
| `theme` | `object` | 默认主题配置 | 动态主题的初始模式、种子色、配色变体、对比度和写入目标 |

## 组件默认属性

`defaults` 按组件键设置公共组件的默认属性，值为该组件可配置的 prop 默认值。键名是 `mat-*` 模板标签去掉前缀后的 camelCase，例如 `btn`、`textField`、`rangeSlider`、`navigationRailItem`：

```js
createApp(App).use(createMatUi({
  defaults: {
    btn: {
      variant: 'text',
      type: 'submit',
    },
    textField: {
      variant: 'outlined',
      label: '默认标签',
    },
  },
}));
```

优先级为「显式传入的 prop > defaults > 组件定义默认值」，因此显式传参仍可覆盖项目默认值；显式传入 `undefined` 视为未设置并回退 defaults。`v-model` 相关属性（`modelValue` 以及 `v-model:arg` 绑定的属性，如 `expanded`、`sizes`）不接受通过 defaults 配置，传入会抛出 `TypeError`。未安装插件的按需组件使用组件定义默认值。

`useMatProps(componentName, props)` 是从根入口导出的公共组合函数，组件内部用它读取注入的 defaults 并返回合并默认值后的响应式 props 对象；必须在组件 `setup` 中调用，否则抛出 `Error`。使用方一般不需要直接调用它。

## Tooltip 延迟

`defaults.tooltip.openDelay` 设置未显式传入 `open-delay` 的自动 Tooltip 打开延迟；`defaults.tooltip.closeDelay` 设置未显式传入 `close-delay` 的自动 Tooltip 关闭延迟。

```js
createApp(App).use(createMatUi({
  defaults: {
    tooltip: {
      openDelay: 600,
      closeDelay: 800,
    },
  },
}));
```

任一 Tooltip 显示时，进入另一个展示元素会立即显示，无需标记分组容器；没有 Tooltip 显示时，进入任何 Tooltip 都按 `openDelay` 计时。首个尚未显示、Tooltip 关闭后或重新进入同一 Tooltip 时仍使用完整延迟。该规则作用于所有 Tooltip，同样覆盖 `MatBtn` 和 `MatFab` 内部创建的 Tooltip。受控 Tooltip 不参与自动延迟。

## 交互指针

默认情况下，按钮等交互组件使用 `cursor: default`。传入 `useCursor: true` 后，可用的交互组件改用 `cursor: pointer`；禁用组件仍显示不可用指针。

```js
createApp(App).use(createMatUi({
  useCursor: true,
}));
```

该选项只控制 mde-vue 组件，不修改页面中的原生按钮或其他应用元素。

## Material Symbols

默认 `iconClass` 已设置为 `material-symbols-outlined`，可以直接把 Material Symbols 字形写入 `MatIcon` 或组件定义的图标 Slot：

```vue
<mat-btn>
  <template #prefix>save</template>
  保存
</mat-btn>

<mat-btn icon="more_vert" label="更多操作" />
```

`iconClass` 只设置图标容器的 class，不会下载字体文件。应用需要自行加载 Material Symbols Outlined，例如在 HTML 头部加入：

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
>
```

改用其他图标字体时，把 `iconClass` 设置为对应基础 class；单个 `MatIcon` 还可以通过 `icon-class` 覆盖或以空字符串关闭全局值。字体库可以忽略 Material Symbols 专用的 `fill`、`weight`、`grade` 和 `optical-size`。SVG URL、`data:` URL 和内联 SVG 用法见 [Icon 图标](/components/icon)。

## 主题

`theme` 的默认值、有效范围、运行时修改方法和清理方式见[主题](/guide/theme)。插件实例的 `theme` 属性就是对应的主题控制器：

```js
const matUi = createMatUi();

matUi.theme.setMode('dark');
matUi.theme.dispose();
```
