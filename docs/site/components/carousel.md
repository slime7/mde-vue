---
title: Carousel 轮播
description: mat-carousel 的六种 Material 3 Expressive 轮播布局、动态宽度、视差滚动与 mat-carousel-item 图片项目。
llms: true
order: 40
---

# Carousel 轮播

## 组件简介

`<mat-carousel>` 的组件导出名是 `MatCarousel`，`<mat-carousel-item>` 的组件导出名是 `MatCarouselItem`。Carousel 提供 Material 3 Expressive 轮播容器能力，通过 `variant` 切换布局，项目由 `mat-carousel-item` 提供并基于 `mat-image` 渲染。组件铺满所在容器，使用方须提供确定块轴尺寸；除 `full-screen` 外面板高度不超过 320px。`full-screen` 沿块轴纵向滑动并由原生 scroll snap 逐屏停靠；其余布局沿行轴横向滑动，支持触摸拖拽、鼠标拖拽与横向滚轮滚动。动态宽度布局（`multi-browse`、`hero`、`hero-center-aligned`）在当前项展开为目标宽度的同时，在边缘保留 56px 预览位；`uncontained` 与 `uncontained-multi-aspect` 保持固定宽度，首尾停靠保留 16px 边距。当 `switch-on-click` 为 `true` 时，点击未展开的项目平滑滚动并展开该项目。滚动容器聚焦后支持方向键、Home 与 End 键盘导航。

## 示例

### `variant`

`variant` 选择轮播布局。multi-browse、hero、hero-center-aligned 布局的项目在接近起始边缘时由小尺寸动态展开到目标宽度并伴随视觉视差，未滚动到的项目压缩为小尺寸预览；uncontained 与 uncontained-multi-aspect 在滚经起始边缘时收缩为小尺寸预览并伴随取景视差；full-screen 铺满容器并纵向滑动。项目通过默认 Slots 放置简短文本，项目压缩到小尺寸预览位时文本自动淡出。

:::: details 查看示例代码
::: code-group

<<< @/examples/carousel/CarouselVariantExample.vue#template [template]

<<< @/examples/carousel/CarouselVariantExample.vue#script [script]

<<< @/examples/carousel/CarouselVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Carousel variant 预览">
    <CarouselVariantExample />
  </DocsPreview>
</ClientOnly>

### 点击项目

`mat-carousel-item` 支持标准的点击交互。轮播卡片常用于内容预览，配合 `@click` 事件可在用户点击卡片时进入详情或查看大图。默认情况下点击卡片不切换轮播；若希望点击未展开项目时平滑滚动切换并展开该项目，可设置 `switch-on-click` 为 `true`。

:::: details 查看示例代码
::: code-group

<<< @/examples/carousel/CarouselClickExample.vue#template [template]

<<< @/examples/carousel/CarouselClickExample.vue#script [script]

<<< @/examples/carousel/CarouselClickExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Carousel 点击项目预览">
    <CarouselClickExample />
  </DocsPreview>
</ClientOnly>

## API

### MatCarousel 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `string` | `'multi-browse'` | 轮播布局；合法值为 `multi-browse`、`uncontained`、`uncontained-multi-aspect`、`hero`、`hero-center-aligned`、`full-screen`，非法值发出 Vue 校验警告 |
| `switch-on-click` | `boolean` | `false` | 点击未展开的项目时是否滚动切换至该项目；默认为 `false`，仅保留卡片自身的点击事件；设置为 `true` 时点击未展开项目触发滚动停靠 |

布局差异：`multi-browse`、`hero`、`hero-center-aligned` 两侧保留 16px 内边距，`uncontained` 与 `uncontained-multi-aspect` 在首尾停靠保留左右 16px 边距、中间状态项目铺满容器边缘；`full-screen` 无内边距，项目间距为 16px，其余布局为 8px。动态目标宽度默认按容器尺寸推导：multi-browse 为内容宽度的一半并封顶 560px，hero 与 hero-center-aligned 为内容宽度减去两侧预览位、uncontained 为内容宽度减去一个项目预览位（这三者随容器缩放、不封顶），保证预览位始终完整贴合容器两端；动态布局的相邻停靠位相距一个大项宽度加间距。uncontained 布局的全部项目保持同一固定宽度，uncontained-multi-aspect 由各项目 `aspectRatio` 决定宽度。官方规格的小尺寸预览位宽度为 40–56dp 动态，本组件取 56dp。

### MatCarouselItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | 必填 | 图片资源地址，转发给内部图片 |
| `alt` | `string \| undefined` | `undefined` | 图片替代文本，转发给内部图片 |
| `aspectRatio` | `number \| string \| undefined` | `undefined` | 项目宽高比；`uncontained-multi-aspect` 布局据此计算项目自然宽度 |
| `width` | `number \| undefined` | `undefined` | 使用方设置的目标宽度（px）；动态宽度布局的项目到达起始边缘时展开到该宽度，`uncontained` 与 `uncontained-multi-aspect` 布局直接使用该固定宽度 |

两个组件都没有公开方法。`mat-carousel` 上未消费的 class、style、ARIA 属性和原生事件监听器传递给根元素，`aria-label` 同时作用于滚动容器；`mat-carousel-item` 上未消费的属性与监听器传递给项目根元素。

## 事件

组件不触发自定义事件。

## Slots

### MatCarousel Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 只应放置 `mat-carousel-item` 项目；其他内容不参与宽度计算与停靠 |

### MatCarouselItem Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 项目的简短文本内容，渲染在图片上方并带底部渐变遮罩；项目压缩到小尺寸预览位（宽度小于 96px）时整体淡出 |

## 状态与无障碍

滚动容器可获得键盘焦点，聚焦时显示可见焦点框；方向键按停靠位步进，Home 与 End 跳转首尾。横向布局的拖拽或滚轮停止后平滑吸附至最近停靠位，在减少动态效果偏好下直接跳转。可通过 `aria-label` 为 `mat-carousel` 提供轮播说明；`mat-carousel-item` 通过 `alt` 提供替代文本。

## 参考来源

布局结构、间距、圆角、动态宽度与停靠行为依据 [Material 3 Carousel 官方页面](https://m3.material.io/components/carousel/overview)（Specs 与 Guidelines 标签页）复刻；官方 Web 实现标记为不可用，本组件为按规格的 Vue 实现，动态宽度与视差为按官方行为描述的简化实现。

<script setup>
import CarouselVariantExample from '../examples/carousel/CarouselVariantExample.vue';
import CarouselClickExample from '../examples/carousel/CarouselClickExample.vue';
</script>
