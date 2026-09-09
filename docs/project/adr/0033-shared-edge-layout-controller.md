# 0033 — 共享六向边缘布局控制器

- 状态: active
- 日期: 2026-09-09
- 替代: 0021

## 背景

MatLayout 与 MatAppRoot 都需要根据登记元素的尺寸、DOM 顺序和安全区计算正文避让及正交 inset。直接让 AppRoot 渲染或继承 MatLayout 会改变根节点、覆盖层、滚动和上下文边界；重复实现又会使两套边缘行为逐渐分叉。共享样式还必须保持 Vue SFC 的作用域，不能写入全局 index.css。

## 决策

保留 MatLayout 与 MatAppRoot 的独立组件树、根节点、覆盖层和 provide/inject 上下文；新增内部六向 edge layout controller，统一边缘登记、ResizeObserver 连接、DOM 顺序排序、尺寸累加、inset 更新和测量触发。两个 SFC 通过 style scoped src 引入同一个组件级 padding 动画样式文件，具体根样式和覆盖层样式继续由各自 SFC 管理。AppRoot 的公共 registerEdge、padding、edges 和 registration insets 扩展到 top、bottom、left、right、start、end 六向。

## 考虑的方案

- 让 AppRoot 直接渲染 MatLayout：共享代码多，但会耦合根节点、内容层、覆盖层和滚动模型。
- 继续在两个组件内复制边缘逻辑：改动范围短期较小，但顺序、动画和生命周期容易分叉。
- 共享内部控制器与 SFC 作用域样式：保留公共行为，同时保持两个公共上下文和组件特有功能独立。

## 影响

- MatLayout 的现有六向行为成为两者共同的测量规范，AppRoot 可登记物理边缘并继续提供应用级覆盖层。
- 公共类型、文档和测试需要同步维护六向 padding、edges 与 registration insets；旧的 AppRoot 四向类型不再完整描述运行时。
- 共享样式不会进入 src/styles/index.css；style scoped src 需要保持外部样式文件自身归入 mde.components 层并在两个 SFC 中分别生成作用域选择器。
