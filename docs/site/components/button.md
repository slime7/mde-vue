---
title: Button 按钮
description: mat-btn 的五种外观、属性、事件、状态和样式扩展入口。
llms: true
order: 50
---

# Button 按钮

`<mat-btn>` 使用原生 `<button>`，适合触发操作。插件安装后可以直接使用，也可以通过 `MatBtn` 具名导入。

```vue
<template>
  <mat-btn>保存</mat-btn>
  <mat-btn variant="outlined">取消</mat-btn>
</template>
```

## 外观

`variant` 支持以下五种值：

| 值 | 适用场景 |
| --- | --- |
| `elevated` | 需要与背景分离的普通操作 |
| `filled` | 页面中最重要的主要操作，默认值 |
| `tonal` | 比填充按钮弱一级的强调操作 |
| `outlined` | 中等强调的次要操作 |
| `text` | 工具栏或紧凑区域中的低强调操作 |

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `string` | `filled` | 按钮外观 |
| `disabled` | `boolean` | `false` | 禁用按钮并阻止交互 |
| `type` | `string` | `button` | 原生按钮类型，可设为 `submit` 或 `reset` |

默认 slot 是按钮文本。未声明的 HTML 属性、ARIA 属性和原生事件会透传到内部 `<button>`：

```vue
<mat-btn
  aria-label="保存文档"
  data-testid="save"
  @click="save"
>
  保存
</mat-btn>
```

## 状态与样式

按钮提供可见的键盘焦点、hover 与 active 状态层。禁用按钮不会响应点击。可以在局部样式中覆盖 `--mat-btn-radius` 调整圆角：

```css
.square-action {
  --mat-btn-radius: var(--mat-shape-corner-small);
}
```
