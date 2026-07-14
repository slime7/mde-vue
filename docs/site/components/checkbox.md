---
title: Checkbox 复选框
description: mat-checkbox 的布尔与数组 v-model、不确定态、配色、事件和默认 slot。
llms: true
order: 80
---

# Checkbox 复选框

## 组件简介

`<mat-checkbox>` 的组件导出名是 `MatCheckbox`。它让使用者从一组相关选项中选择任意数量的项目，也可以独立表示开关状态。组件使用原生 checkbox 语义，并按 Material 3 提供 18px 图标、40px 状态层和至少 48px 的交互目标。

## 示例

### 布尔值

```vue
<script setup>
import { ref } from 'vue';

const newsletter = ref(true);
</script>

<template>
  <mat-checkbox v-model="newsletter">接收更新邮件</mat-checkbox>
</template>
```

<ClientOnly>
  <DocsPreview label="Checkbox 布尔值预览" stacked>
    <mat-checkbox v-model="checkboxNewsletter">接收更新邮件</mat-checkbox>
    <span>当前值：{{ checkboxNewsletter }}</span>
  </DocsPreview>
</ClientOnly>

### 多个 Checkbox 绑定同一数组

每个实例用 `value` 声明自己的候选值。组件添加或移除项目时返回新数组，不修改原数组。

```vue
<script setup>
import { ref } from 'vue';

const filters = ref(['offline']);
</script>

<template>
  <mat-checkbox v-model="filters" value="offline">可离线使用</mat-checkbox>
  <mat-checkbox v-model="filters" value="shared">与我共享</mat-checkbox>
</template>
```

<ClientOnly>
  <DocsPreview label="Checkbox 数组绑定预览" stacked>
    <mat-checkbox v-model="checkboxFilters" value="offline">可离线使用</mat-checkbox>
    <mat-checkbox v-model="checkboxFilters" value="shared">与我共享</mat-checkbox>
    <span>当前值：{{ checkboxFilters.join('、') || '无' }}</span>
  </DocsPreview>
</ClientOnly>

### 父子选择与不确定态

```vue
<mat-checkbox
  :model-value="allChecked"
  :indeterminate="partiallyChecked"
  @update:model-value="toggleAll"
>
  全部权限
</mat-checkbox>
```

<ClientOnly>
  <DocsPreview label="Checkbox 不确定态预览" stacked>
    <mat-checkbox
      :model-value="checkboxAllChecked"
      :indeterminate="checkboxPartiallyChecked"
      color="#6750a4"
      @update:model-value="toggleAllCheckboxes"
    >
      全部权限
    </mat-checkbox>
    <div class="checkbox-children">
      <mat-checkbox v-model="checkboxPermissions" value="read">读取</mat-checkbox>
      <mat-checkbox v-model="checkboxPermissions" value="write">写入</mat-checkbox>
    </div>
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| Array<string \| number \| boolean>` | `false` | `v-model` 当前值；数组模式按 `value` 增删项目 |
| `value` | `string \| number \| boolean` | `true` | 数组模式中的候选值；布尔模式忽略 |
| `indeterminate` | `boolean` | `false` | 显示父级部分选中的不确定状态 |
| `disabled` | `boolean` | `false` | 禁止指针与键盘交互 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选中容器、图标和状态层的局部强调色 |

`class`、`style`、`inert`、`aria-hidden` 应用于外层标签，其余未消费属性传给内部 `input`。组件只承诺 Vue 状态绑定，不承诺表单提交、原生校验或表单重置。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一布尔值或新数组 | 使用者切换选中状态 |
| `update:indeterminate` | `false` | 使用者操作当前 Checkbox |
| `change` | 原生 `Event` | 内部 checkbox 发生 change |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 与控件关联的相邻标签；省略时必须提供 `aria-label` |

## 状态

组件支持未选中、选中、不确定、hover、focus-visible、pressed 和 disabled。减少动态效果偏好下关闭勾号、横线和状态层过渡。组件没有公开方法。

## 参考来源

尺寸、状态和父子选择行为依据 Material 3 [Checkbox specs](https://m3.material.io/components/checkbox/specs) 与 [Checkbox guidelines](https://m3.material.io/components/checkbox/guidelines)。

<script setup>
import { computed, ref } from 'vue';

const checkboxNewsletter = ref(true);
const checkboxFilters = ref(['offline']);
const checkboxPermissions = ref(['read']);
const checkboxAllChecked = computed(() => checkboxPermissions.value.length === 2);
const checkboxPartiallyChecked = computed(() => (
  checkboxPermissions.value.length > 0 && !checkboxAllChecked.value
));

function toggleAllCheckboxes(checked) {
  checkboxPermissions.value = checked ? ['read', 'write'] : [];
}
</script>

<style scoped>
.checkbox-children {
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
  padding-inline-start: 24px;
}
</style>
