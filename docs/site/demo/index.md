---
title: 交互 demo
description: 查看 M3 Expressive 按钮体系、组件级配色和 Material 2025 主题运行时切换效果。
llms: false
---

# 交互 demo

下面的控件直接调用 `mdu-ui` 的主题 API。修改主题时，Button、Icon button、Button group、Split button 和 Tailwind 语义类示例会一起更新。自定义种子色示例只改变自身，不会覆盖全局主题。

<ClientOnly>
  <ThemePlayground />
</ClientOnly>

<script setup>
import ThemePlayground from './ThemePlayground.vue';
</script>
