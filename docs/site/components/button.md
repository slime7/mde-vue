---
title: Button 按钮
description: mat-btn 的使用方法、示例、API、原生事件、slot、状态和样式定制入口。
llms: true
order: 50
---

# Button 按钮

`MatBtn` 渲染原生 `<button>`，用于触发保存、确认或取消等页面内操作。它保留原生按钮的键盘操作、禁用和表单类型语义。

## 使用方法

### 全局注册

安装 `createMatUi()` 后，直接在任意后代模板中使用 `<mat-btn>`：

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import App from './App.vue';
import 'mdu-ui/styles.css';

createApp(App)
  .use(createMatUi())
  .mount('#app');
```

```vue
<template>
  <mat-btn>保存</mat-btn>
</template>
```

### 按需导入

未安装插件时，可以从单组件入口导入 `MatBtn`。仍需导入基础样式：

```vue
<script setup>
import { MatBtn } from 'mdu-ui/components/mat-btn';
import 'mdu-ui/styles.css';
</script>

<template>
  <MatBtn>保存</MatBtn>
</template>
```

按需导入使用基础样式中的默认主题。需要运行时主题配置时，改用 `createMatUi()`；该插件也会全局注册按钮。

## 示例

### 默认按钮

省略 `variant` 时使用 `filled` 外观：

```vue
<mat-btn>确认</mat-btn>
```

### 外观

`variant` 支持以下五种值：

| 值 | 适用场景 |
| --- | --- |
| `elevated` | 需要与背景分离的普通操作 |
| `filled` | 页面中最重要的主要操作，默认值 |
| `tonal` | 比填充按钮弱一级的强调操作 |
| `outlined` | 中等强调的次要操作 |
| `text` | 工具栏或紧凑区域中的低强调操作 |

```vue
<mat-btn variant="elevated">Elevated</mat-btn>
<mat-btn variant="filled">Filled</mat-btn>
<mat-btn variant="tonal">Tonal</mat-btn>
<mat-btn variant="outlined">Outlined</mat-btn>
<mat-btn variant="text">Text</mat-btn>
```

### 禁用状态

```vue
<mat-btn disabled @click="save">无法保存</mat-btn>
```

禁用时内部原生按钮带有 `disabled` 属性，不获得点击交互，也不会触发传入的 `click` 监听器。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'elevated' \| 'filled' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'` | 按钮的视觉层级 |
| `disabled` | `boolean` | `false` | 使用原生禁用语义并阻止交互 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型；默认值避免在表单中意外提交 |

`variant` 和 `type` 传入有效值之外的字符串时，Vue 会给出 prop 校验警告。

### 原生属性

组件未消费的属性会传递给内部 `<button>`，包括 `name`、`value`、`form`、`title`、`aria-*` 和 `data-*`：


```vue
<mat-btn
  aria-label="保存文档"
  name="action"
  value="save"
  data-testid="save"
>
  保存
</mat-btn>
```

### 事件

组件没有自定义事件。传入组件的原生事件监听器会绑定到内部 `<button>`；常用事件如下：

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `click` | `MouseEvent` | 用户点击或通过键盘激活未禁用按钮 |
| `focus` | `FocusEvent` | 按钮获得焦点 |
| `blur` | `FocusEvent` | 按钮失去焦点 |

```vue
<mat-btn @click="save" @focus="showHint">保存</mat-btn>
```

其他原生 `HTMLButtonElement` 事件监听器也会按 Vue 的属性透传规则生效。

### Slots

| 名称 | 说明 |
| --- | --- |
| 默认 | 按钮标签内容，通常放置简短文本 |

组件当前没有具名 slot。

### 状态

| 状态 | 用户可观察行为 |
| --- | --- |
| 默认 | 使用所选 `variant` 的容器、文字、边框和阴影 |
| hover | 支持 hover 的设备显示状态层；`elevated` 同时提高阴影 |
| focus-visible | 键盘焦点显示清晰的外轮廓和状态层 |
| active | 按下时显示状态层并轻微缩放；减少动态效果偏好下不缩放 |
| disabled | 使用禁用配色，取消阴影和点击交互，并显示禁用光标 |

### CSS 定制入口

| 自定义属性 | 默认回退值 | 说明 |
| --- | --- | --- |
| `--mat-btn-radius` | `--mat-shape-corner-full` | 按钮容器圆角 |

通过 class 在局部覆盖圆角：

```css
.square-action {
  --mat-btn-radius: var(--mat-shape-corner-small);
}
```

```vue
<mat-btn class="square-action">方角按钮</mat-btn>
```

组件没有公开方法。当前也不支持 loading、图标专用属性、链接模式、full-width、涟漪或完整表单方法代理；不要依赖内部 class 或元素结构实现这些能力。

## 参考来源

按钮的内容组织参考 [mdui v2 Button 文档](https://www.mdui.org/zh-cn/docs/2/components/button)，并按本项目现有 Vue API 与支持范围改写。实现来源及 MIT 许可见仓库根目录的 `THIRD_PARTY_NOTICES.md`。
