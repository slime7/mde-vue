---
title: 交互 demo
description: 查看 Material 2025 主题运行时与 Tailwind 语义类的联动效果。
llms: false
---

# 交互 demo

下面的控件直接调用 `mdu-ui` 的主题 API。修改主题时，页面主题和 Tailwind 语义类示例会一起更新。按钮组件的交互预览位于各自的组件文档中。

<ClientOnly>
  <ThemePlayground />
</ClientOnly>

<script setup>
import ThemePlayground from './ThemePlayground.vue';
</script>
