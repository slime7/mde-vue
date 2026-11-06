# 0043 — 边缘布局与 Aside 使用阶段同步的普通缓动

- 状态: active
- 日期: 2026-11-06
- 替代: 无

## 背景

MatLayout、MatAppRoot、MatAside 和复用 Aside 的 NavigationRail 原先使用 spatial 弹簧令牌。展开与 padding 使用 500ms spatial，收起却使用 150ms effects；关闭时 padding 仍按 500ms 回流，同向堆叠的后续 Aside 也按 500ms 重排。三条进度不一致，关闭过程中正文与侧栏边缘会分离。

## 决策

边缘布局控制器维护 block、inline 两个轴的 idle、enter、exit、instant 动效阶段；Aside 在登记和注销边缘时标记 enter 或 exit，transition=false 时标记 instant。Layout 与 AppRoot 的正文 padding、Aside 的 inset 与尺寸、同向堆叠偏移和 NavigationRail 根节点共用同一阶段。enter 使用 400ms emphasized decelerate，exit 使用 200ms emphasized accelerate，普通尺寸变化使用 500ms emphasized。spring 复合令牌继续作为其他组件的公共令牌保留。

## 考虑的方案

- 保留弹簧令牌并只对齐展开、收起时长：改动最小，但仍有回弹，正文与侧栏进度仍可能不同。
- 所有相关部位统一使用 500ms emphasized：实现简单且没有回弹，但丢失 Material 3 对进入与退出分别使用 decelerate、accelerate 的时长规范。
- 引入 JavaScript 弹簧求解器逐帧驱动：可处理中断和重定向，但增加运行时体积、维护成本，并让 CSS 与 JS 两套动效体系并存。

## 影响

- Layout、AppRoot、Aside 与 NavigationRail 的空间动画不再回弹，正文 padding 与被带动的边缘偏移按同一进度变化。NavigationRail 删除自身的弹簧 transition 覆盖，保留展开尺寸与间距动画。后续新增边缘组件必须参与 enter、exit、instant 阶段标记，否则会重新出现不同步；减少动态效果和 transition=false 仍直接呈现终态。
