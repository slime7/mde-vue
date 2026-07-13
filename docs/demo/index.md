---
title: 交互 demo
description: 查看按钮外观和 Material 3 主题运行时切换效果。
llms: false
---

# 交互 demo

下面的控件直接调用 `mdu-ui` 的主题 API。修改主题时，按钮和 Tailwind 语义类示例会一起更新。

<ClientOnly>
  <ThemePlayground />
</ClientOnly>

<script setup>
import ThemePlayground from './ThemePlayground.vue';
</script>
