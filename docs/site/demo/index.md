---
title: 交互 demo
description: 查看 Material 2025 主题运行时与 Tailwind 语义类的联动效果。
llms: false
---

# 交互 demo

下面的控件直接调用 `mdu-ui` 的主题与组件 API。修改主题时，页面主题、Tailwind 语义类、选择控件和 List 示例会一起更新。

<ClientOnly>
  <ThemePlayground />
  <SelectionControlsPlayground />
  <ListPlayground />
</ClientOnly>

<script setup>
import ThemePlayground from './ThemePlayground.vue';
import SelectionControlsPlayground from './SelectionControlsPlayground.vue';
import ListPlayground from './ListPlayground.vue';
</script>
