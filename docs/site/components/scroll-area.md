---
title: Scroll area 滚动区域
description: mat-scroll-area 与 MatScrollArea 为单轴内容提供边缘渐隐、容器配色、圆角和无限滚动事件。
llms: true
order: 114
---

# Scroll area 滚动区域

## 组件简介

`<mat-scroll-area>` 的组件导出名是 `MatScrollArea`。组件拥有一个纵向或横向原生滚动元素，并在仍有内容可滚动时用真实 CSS mask 渐隐对应边缘；效果不依赖容器背景色，适合透明表面、图片和任意主题背景。滚动方向两端默认保留 28px 内边距，内容在两端始终留出间距，`noScrollPadding` 可以关闭这个内边距。滚动条始终贴住容器边缘，即使容器根元素设置了水平或垂直内边距，内容仍保留同样的内边距间距。

组件默认背景透明，作为容器使用时可以通过 `color` 属性填充 `surface`、`surface-container` 等系统颜色角色或六位十六进制种子色，并同步内容文字颜色；`rounded` 属性可以添加接近 28px 的系统大圆角。滚动条拇指使用 primary 令牌、轨道透明，尺寸以内联 CSS 变量 `--mat-scroll-area-scrollbar-width` 暴露在组件根元素上供子元素读取（该变量属于内部实现，不承诺公共兼容）。

组件一次只管理一个滚动轴。使用方必须为纵向模式提供确定的块轴尺寸，或为横向模式提供确定的行轴尺寸和不会收缩的内部内容，才能形成滚动边界。

边缘阴影带默认紧贴边缘，`shadowOffset` 可以让起始端、末端的阴影带从边缘向内偏移；偏移区内的滚动内容不会被遮罩覆盖，适合放置不透明的 sticky 元素。

## 示例

### 滚动方向

`vertical` 与别名 `y`、`v` 表示纵向；`horizontal` 与别名 `x`、`h` 表示横向。公共文档和新代码推荐使用完整值，简写适合动态布局配置。下方纵向示例使用 `color` 与 `rounded` 呈现容器外观，横向示例保持透明表面。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaOrientationExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaOrientationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 方向预览">
    <ScrollAreaOrientationExample />
  </DocsPreview>
</ClientOnly>

### 圆角

`rounded` 为组件添加 `--mat-sys-shape-corner-extra-large`（28px）系统圆角。滚动方向两端固定保留的 28px 内边距让内容始终避开圆角裁剪区；开启 `noScrollPadding` 时内容可能进入圆角裁剪区，需要自行保留相应间距。下方纵向与横向示例都开启了圆角，并搭配 `color="surface-container"` 提供容器填充。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaRoundedExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaRoundedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 圆角预览">
    <ScrollAreaRoundedExample />
  </DocsPreview>
</ClientOnly>

### 容器配色

`color` 接受语义色、系统颜色角色或六位十六进制种子色 `#RRGGBB`；显式设置时组件使用对应容器色填充背景，文字同步为同组 `on-*` 颜色，省略时背景保持透明。背景由组件根元素完整承载，边缘渐隐只作用于内容，不会覆盖背景；内容滚动到边缘时淡入背景色。下面集中展示三个 surface 容器角色；本文其他示例也用它提供容器背景。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaColorExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaColorExample.vue#script [script]

<<< @/examples/scroll-area/ScrollAreaColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 容器配色预览">
    <ScrollAreaColorExample />
  </DocsPreview>
</ClientOnly>

### 搭配 Container

`<mat-scroll-area>` 常作为页面正文的滚动容器，推荐把 `<mat-container>` 直接放在默认 Slot 内：容器提供两侧响应式内边距与最大宽度，正文在滚动区域内左右各保留 16px（`>=600px` 时为 24px）。纵向滚动条占据右侧空间会让正文的视觉中心偏左，把容器的 `padding-inline-end` 从原值改为减去滚动条宽度后的值即可保持完全居中。容器位于滚动区域内，会直接继承组件根元素上的 `--mat-scroll-area-scrollbar-width`（`thin` 8px、`default` 16px、`hidden` 0），无需手动重复设置；示例使用 `calc(16px - var(--mat-scroll-area-scrollbar-width))` 与 `calc(24px - var(--mat-scroll-area-scrollbar-width))`，切换 `bar-width` 后自动跟随。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaContainerExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaContainerExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 搭配 Container 预览">
    <ScrollAreaContainerExample />
  </DocsPreview>
</ClientOnly>

### 关闭滚动方向内边距

`noScrollPadding` 关闭滚动方向两端的固定 28px 内边距，让内容可以直接贴住滚动方向边缘，适合条目自带间距、需要整行分隔线或贴边对齐的场景。它只影响当前滚动方向，另一轴的容器内边距补偿与滚动条贴边行为保持不变；搭配 `rounded` 时内容可能被圆角裁剪区遮挡，需要自行保留间距。下方左侧保留默认内边距用于对比，右侧和横向示例使用 `no-scroll-padding`。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaNoScrollPaddingExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaNoScrollPaddingExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 关闭滚动方向内边距预览">
    <ScrollAreaNoScrollPaddingExample />
  </DocsPreview>
</ClientOnly>

### 滚动停靠

`snap="proximity"` 在内容接近停靠点时吸附，适合连续浏览；`snap="mandatory"` 要求滚动结束后停到某个停靠点，适合分页式内容。`snapPadding` 设置当前滚动轴两端的像素内边距。组件负责滚动容器，默认 Slot 中作为停靠目标的元素仍需自行设置 `scroll-snap-align`；需要尽量避免快速滚动跳过目标时，可以同时设置 `scroll-snap-stop: always`。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaSnapExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaSnapExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 滚动停靠预览">
    <ScrollAreaSnapExample />
  </DocsPreview>
</ClientOnly>

### 边缘事件与无限滚动

`reachThreshold` 只控制事件阈值，不改变阴影长度。事件不会在初次挂载、内容尺寸变化或属性变化时自动触发；只有滚动从阈值区域外进入区域内时触发一次，离开后再次进入才会重新触发。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaReachExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaReachExample.vue#script [script]

<<< @/examples/scroll-area/ScrollAreaReachExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 无限滚动预览">
    <ScrollAreaReachExample />
  </DocsPreview>
</ClientOnly>

### 阴影偏移

`shadowOffset` 让阴影带从边缘向内偏移；数字形式同时设置两端，对象形式可分别设置 `start` 与 `end`。偏移区内的滚动内容不会被遮罩覆盖：下方纵向示例使用 `{ start: 48, end: 48 }`，并放置不透明的 sticky 标题与结尾，滚动内容在阴影带内渐隐后滑入 sticky 元素下方；横向示例使用 `48`，并搭配固定首列。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaShadowOffsetExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaShadowOffsetExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 阴影偏移预览">
    <ScrollAreaShadowOffsetExample />
  </DocsPreview>
</ClientOnly>

### 阴影长度

阴影使用 CSS mask 渐隐，`shadowLength` 默认两端为 16px。它可以用数字同时设置两端，也可以用 `{ start, end }` 分别设置两端；对象未提供的一端回退到 16px。`shadowOffset` 仍可让两端的阴影带从边缘向内偏移。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaShadowLengthExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaShadowLengthExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 阴影长度预览">
    <ScrollAreaShadowLengthExample />
  </DocsPreview>
</ClientOnly>

### 滚动条宽度

`barWidth` 支持 `default`、`thin` 和 `hidden`，组件默认使用 `thin`。`thin` 使用 8px 滚动条，`default` 使用 16px 滚动条，`hidden` 隐藏滚动条但不影响滚动操作。滚动条拇指使用 primary 令牌并带完整圆角，轨道与角落透明；尺寸同时以内联 CSS 变量 `--mat-scroll-area-scrollbar-width` 置于组件根元素，子元素可以读取该变量。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaBarWidthExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaBarWidthExample.vue#script [script]

<<< @/examples/scroll-area/ScrollAreaBarWidthExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 滚动条宽度预览">
    <ScrollAreaBarWidthExample />
  </DocsPreview>
</ClientOnly>

### 按住拖拽

横向模式设置 `dragScroll` 后，鼠标主键和触控笔可以在内容上按住拖拽。移动超过 4px 后才确认拖拽，并阻止这次手势随后产生的点击；短按和键盘激活不受影响。触摸指针不由此能力接管，继续使用浏览器原生滑动与惯性。

该能力默认关闭。下面的示例同时使用 `bar-width="hidden"` 完全隐藏滚动条，仍保留键盘和触摸滚动路径。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaDragScrollExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaDragScrollExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 按住拖拽预览">
    <ScrollAreaDragScrollExample />
  </DocsPreview>
</ClientOnly>

### 命令式滚动

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaMethodsExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaMethodsExample.vue#script [script]

<<< @/examples/scroll-area/ScrollAreaMethodsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 方法预览">
    <ScrollAreaMethodsExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'y' \| 'v' \| 'horizontal' \| 'x' \| 'h'` | `'vertical'` | 选择组件拥有的滚动轴；简写值映射到对应完整方向 |
| `snap` | `'none' \| 'proximity' \| 'mandatory'` | `'none'` | 设置当前滚动轴的停靠强度；`none` 关闭滚动停靠 |
| `snapPadding` | `number` | `0` | 当前滚动轴起始端和末端的停靠内边距，单位为 px；数字或纯数字字符串，必须是非负有限值 |
| `reachThreshold` | `number \| { start?: number, end?: number }` | `0` | 边缘事件的像素阈值；数字或纯数字字符串用于两端，对象成员同样接受，对象未提供的一端为 `0`，值必须是非负有限数字 |
| `shadowLength` | `number \| { start?: number, end?: number }` | `16` | 阴影从对应边缘向内延伸的像素数；数字或纯数字字符串用于两端，对象可分别设置 `start` 与 `end`，值必须是非负有限数字 |
| `shadowOffset` | `number \| { start?: number, end?: number }` | `0` | 边缘阴影带从对应边缘向内偏移的像素数；数字或纯数字字符串用于两端，对象未提供的一端为 `0`，值必须是非负有限数字。偏移区内的滚动内容不被遮罩覆盖，适合放置不透明的 sticky 元素 |
| `barWidth` | `'default' \| 'thin' \| 'hidden'` | `'thin'` | 设置滚动条宽度；`thin` 使用 8px，`default` 使用 16px，`hidden` 隐藏滚动条 |
| `dragScroll` | `boolean` | `false` | 横向模式下允许鼠标主键和触控笔按住拖拽；触摸保持原生滑动 |
| `rounded` | `boolean` | `false` | 为 `true` 时使用 `--mat-sys-shape-corner-extra-large`（28px）作为容器圆角 |
| `noScrollPadding` | `boolean` | `false` | 关闭当前滚动方向两端的固定 28px 内边距，让内容贴住滚动方向边缘；不影响另一轴的容器内边距补偿 |
| `color` | `string \| undefined` | `undefined` | 语义色、系统颜色角色（如 `surface`、`surface-container`）或六位十六进制种子色 `#RRGGBB`；显式设置时填充容器背景并同步内容文字颜色 |

`class` 和 `style` 作用于组件根元素。其他未被消费的原生属性、ARIA 属性和监听器作用于同一根元素（即滚动元素）；需要键盘聚焦滚动区时，应按场景提供 `tabindex="0"` 和可访问名称。

### 方法

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `getScroller()` | 无 | `HTMLElement \| null` | 返回组件拥有的原生滚动元素；挂载前为 `null` |
| `scrollTo(options)` | `ScrollToOptions` | `void` | 调用原生滚动元素的 `scrollTo()`；挂载前调用不执行操作 |

方法不额外抛出错误。命令式滚动产生原生 scroll 事件时，使用与用户滚动相同的边缘事件规则。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `reach-start` | `{ distance: number, target: HTMLElement }` | 滚动进入起始端阈值区域时触发一次；`distance` 是距起始端像素数，`target` 是原生滚动元素 |
| `reach-end` | `{ distance: number, target: HTMLElement }` | 滚动进入末端阈值区域时触发一次；`distance` 是距末端像素数，`target` 是原生滚动元素 |
| `scroll` | 原生 `Event` | 滚动元素触发原生 scroll 事件，监听器直接透传 |

初次挂载、ResizeObserver 同步、默认 Slot 内容变化，以及 `orientation` 或 `reachThreshold` 变化只更新内部边缘状态，不派发 `reach-start` 或 `reach-end`。

## Slots

| Slot | 内容约束 |
| --- | --- |
| `default` | 可滚动内容；纵向内容通常自然排列，横向内容需要自行提供不收缩的横向布局 |

<script setup>
import ScrollAreaBarWidthExample from '../examples/scroll-area/ScrollAreaBarWidthExample.vue';
import ScrollAreaColorExample from '../examples/scroll-area/ScrollAreaColorExample.vue';
import ScrollAreaContainerExample from '../examples/scroll-area/ScrollAreaContainerExample.vue';
import ScrollAreaDragScrollExample from '../examples/scroll-area/ScrollAreaDragScrollExample.vue';
import ScrollAreaMethodsExample from '../examples/scroll-area/ScrollAreaMethodsExample.vue';
import ScrollAreaNoScrollPaddingExample from '../examples/scroll-area/ScrollAreaNoScrollPaddingExample.vue';
import ScrollAreaOrientationExample from '../examples/scroll-area/ScrollAreaOrientationExample.vue';
import ScrollAreaReachExample from '../examples/scroll-area/ScrollAreaReachExample.vue';
import ScrollAreaRoundedExample from '../examples/scroll-area/ScrollAreaRoundedExample.vue';
import ScrollAreaShadowOffsetExample from '../examples/scroll-area/ScrollAreaShadowOffsetExample.vue';
import ScrollAreaShadowLengthExample from '../examples/scroll-area/ScrollAreaShadowLengthExample.vue';
import ScrollAreaSnapExample from '../examples/scroll-area/ScrollAreaSnapExample.vue';
</script>
