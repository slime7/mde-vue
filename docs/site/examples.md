---
title: 典型布局示例
description: 用 mat-app-root 组合导航、表单与移动端外壳的三组典型页面布局，每个示例只保留最简单的交互，可直接作为新页面的骨架起点。
llms: true
order: 130
---

# 典型布局示例

本页展示几组常见的页面布局组合。每个示例都以 `<mat-app-root>` 的容器化模式为布局根，只保留最简单的交互，并且只用组件自身能力完成布局，示例样式只负责示例自己的内容。AppRoot 不允许嵌套，整页应用只放置一个铺满视口的 AppRoot；在卡片、工作区等局部区域需要独立的边缘停靠协调时，改用 `<mat-layout>` 配合 `<mat-aside>`。

## 应用外壳：侧边导航 + 顶栏 + 滚动正文

桌面端最常见的三段式外壳。开启 `scrollable` 后正文使用应用根的内部滚动容器：导航抽屉停靠在起始侧并占据完整高度，App bar 停靠在顶部、覆盖抽屉以外的宽度，正文滚动时二者保持固定。左上角按钮切换抽屉展开与收起，正文留白同步回流；切换导航项时，顶栏标题与正文标题同步更新。

:::: details 查看示例代码
::: code-group

<<< @/examples/layouts/LayoutsAppShellExample.vue#template [template]

<<< @/examples/layouts/LayoutsAppShellExample.vue#script [script]

<<< @/examples/layouts/LayoutsAppShellExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="应用外壳布局预览" height="420px">
    <LayoutsAppShellExample />
  </DocsPreview>
</ClientOnly>

## 设置页：分区表单 + 底部操作栏

表单页按用途把字段分成两组，正文在 ScrollArea 内滚动；底部 docked Toolbar 固定操作区，正文自动避让，不会被长表单推出视口。「保存更改」通过 Snackbar 给出反馈，「恢复默认」还原全部控件。

:::: details 查看示例代码
::: code-group

<<< @/examples/layouts/LayoutsSettingsExample.vue#template [template]

<<< @/examples/layouts/LayoutsSettingsExample.vue#script [script]

<<< @/examples/layouts/LayoutsSettingsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="设置页布局预览" height="460px">
    <LayoutsSettingsExample />
  </DocsPreview>
</ClientOnly>

## 移动端首页：顶栏 + 列表 + FAB + 底部导航

窄屏应用把 AppRoot 收口在手机宽度内居中，正文是单列列表。App bar 标题随底部导航切换，FAB 悬浮于右下角并自动避让底部导航栏；FAB 不避让普通正文，正文在 AppRoot 的后代组件中调用 `useMatApp()`，把 `layout.floating.height` 导出的浮动组占用转为列表的底部留白，让最后一项可以滚出 FAB 区域，FAB 尺寸变化时留白同步更新。点击 FAB 在列表顶部记入一笔，并通过 Snackbar 反馈。

:::: details 查看示例代码
::: code-group

<<< @/examples/layouts/LayoutsMobileHomeExample.vue#template [template]

<<< @/examples/layouts/LayoutsMobileHomeExample.vue#script [script]

<<< @/examples/layouts/LayoutsMobileHomeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="移动端首页布局预览" height="520px">
    <LayoutsMobileHomeExample />
  </DocsPreview>
</ClientOnly>

<script setup>
import LayoutsAppShellExample from './examples/layouts/LayoutsAppShellExample.vue';
import LayoutsMobileHomeExample from './examples/layouts/LayoutsMobileHomeExample.vue';
import LayoutsSettingsExample from './examples/layouts/LayoutsSettingsExample.vue';
</script>
