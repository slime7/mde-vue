---
title: createMatUi
description: 配置 mdu-ui 的全局组件注册、交互指针、图标 class 和主题控制器。
llms: true
order: 25
---

# createMatUi

`createMatUi(options)` 创建供 Vue 应用安装的 mdu-ui 插件。插件会全局注册所有 `mat-*` 组件、创建主题控制器，并把组件设置与主题上下文提供给应用后代。

## 基本用法

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import App from './App.vue';
import 'mdu-ui/styles.css';

const matUi = createMatUi({
  iconClass: 'material-symbols-outlined',
  useCursor: true,
  theme: {
    mode: 'system',
    seedColor: '#20a6fc',
  },
});

createApp(App).use(matUi).mount('#app');
```

所有选项都可以省略。传给 `createMatUi()` 的值必须是对象，`useCursor` 必须是 `boolean`，`iconClass` 必须是 `string`，否则会抛出 `TypeError`。

## 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `iconClass` | `string` | `'material-symbols-outlined'` | 应用于 `MatIcon` 和组件图标容器的空格分隔 class |
| `useCursor` | `boolean` | `false` | 是否为可用交互组件显示 `cursor: pointer` |
| `theme` | `object` | 默认主题配置 | 动态主题的初始模式、种子色、配色变体、对比度和写入目标 |

## 交互指针

默认情况下，按钮等交互组件使用 `cursor: default`。传入 `useCursor: true` 后，可用的交互组件改用 `cursor: pointer`；禁用组件仍显示不可用指针。

```js
createApp(App).use(createMatUi({
  useCursor: true,
}));
```

该选项只控制 mdu-ui 组件，不修改页面中的原生按钮或其他应用元素。

## Material Symbols

默认 `iconClass` 已设置为 `material-symbols-outlined`，可以直接把 Material Symbols 字形写入 `MatIcon` 或组件定义的图标 Slot：

```vue
<mat-btn>
  <template #icon>save</template>
  保存
</mat-btn>

<mat-icon-btn label="更多操作">more_vert</mat-icon-btn>
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
