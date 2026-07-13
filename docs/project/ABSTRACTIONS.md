# 核心抽象

本文说明跨组件、主题、样式和文档时必须保持一致的概念。具体安装和 API 示例属于使用文档，不在此重复。

## 术语

| 术语 | 含义 |
| --- | --- |
| 语义令牌 | 用用途命名的 CSS 自定义属性，例如主色、表面色、形状或状态透明度 |
| 种子色 | 生成一组 Material 3 动态配色的十六进制起始颜色 |
| 主题模式 | `light`、`dark` 或跟随系统的 `system` |
| 解析模式 | `system` 根据当前媒体查询解析后实际使用的 `light` 或 `dark` |
| 配色变体 | Material Color Utilities 提供的九种 scheme variant 之一 |
| 主题目标 | 接收运行时 CSS 自定义属性的 DOM 元素，默认是 `document.documentElement` |
| 组件变体 | 同一组件的视觉层级，例如按钮的 `filled` 或 `outlined`；不等于主题配色变体 |
| AI 文档来源 | frontmatter 明确标记可进入 AI 文档的 Markdown 使用页面 |

## Mat UI 插件

`createMatUi({ theme })` 创建一次 Vue 插件安装单元。插件负责全局注册 `mat-*` 组件、建立主题控制器，并通过 Vue provide 暴露主题上下文。

`useMatTheme()` 只能读取当前 Vue 应用提供的主题上下文。组件不得自行创建第二套主题状态；应用级主题控制器是运行时配置的权威来源。

## 主题配置

主题配置由以下值组成：

- `mode`：`light`、`dark` 或 `system`，默认 `system`。
- `seedColor`：合法十六进制颜色，默认 `#20a6fc`。
- `schemeVariant`：九种 Material 3 配色变体之一，默认 `tonal-spot`。
- `contrastLevel`：`-1` 至 `1`，默认 `0`。
- `target`：接收 CSS 令牌的 DOM 元素，默认 `document.documentElement`。

主题控制器公开当前配置、解析模式、运行时切换方法和清理方法。切换配置会重新生成颜色令牌并写入同一目标；销毁控制器后不得继续响应系统主题变化。

## CSS 令牌层级

基础运行时令牌使用固定命名空间：

- `--mat-color-*`：Material 语义颜色及其 on-color。
- `--mat-shape-*`：圆角和形状层级。
- `--mat-type-*`：排版属性。
- `--mat-shadow-*`：阴影层级。
- `--mat-motion-*`：时长和缓动。
- `--mat-state-*`：hover、focus 和 pressed 等状态透明度。

Tailwind 适配层只把这些值映射到 `--color-mat-*`、`--radius-mat-*`、`--text-mat-*`、`--shadow-mat-*` 和 `--ease-mat-*`。两层必须保持同一语义，Tailwind 层不得复制具体颜色或覆盖常见无前缀主题变量。

## 组件公共模型

- Vue 组件导出使用 PascalCase，例如 `MatBtn`；模板标签使用 `mat-*`，例如 `<mat-btn>`。
- 完整包入口和单组件入口必须导出同一个组件对象与同一套行为。
- 原生元素语义优先于自造交互协议；`<mat-btn>` 渲染原生 `<button>`。
- 未被组件消费的原生属性和事件应继续传递到根原生元素。
- `disabled` 必须使用原生禁用语义；默认按钮 `type` 是 `button`，避免意外提交表单。
- 组件必须提供可见的键盘焦点状态，并为 hover、focus、pressed 和 disabled 使用共享状态令牌。

## `<mat-btn>`

按钮的 `variant` 只接受 `elevated`、`filled`、`tonal`、`outlined` 和 `text`，默认 `filled`。默认 slot 是按钮内容来源，`--mat-btn-radius` 是首期公开样式定制入口。

首期不把 loading、图标协议、链接模式、full-width、涟漪或完整表单代理方法纳入按钮抽象。增加这些能力前应先确认真实使用需要，并评估是否改变公共模型。

## 文档权威关系

`docs/site/` 中人工编辑的 Markdown 使用页面是组件说明的权威来源。`llms.txt` 只提供适合 AI 发现内容的索引，`llms-full.txt` 是这些页面的合并文本；两者均为可重复生成的派生文件，不接受手工修补。

每个公共组件页面必须说明使用方法、默认示例和 API，并按实际实现记录属性、方法、事件、slots、状态与 CSS 定制入口。不存在的能力不保留空章节，也不得为尚未实现的接口编写示例。

## 关键不变量

1. 组件不得依赖 Tailwind 才能正确显示；基础 CSS 始终可独立使用。
2. Tailwind 工具类与组件样式读取同一组运行时语义值。
3. 主题模式与解析模式分开表达，`system` 不作为最终颜色方案。
4. 公共源码入口不能依赖仓库内部 demo 或文档实现。
5. 新组件只有在公共导出、样式、测试、demo 和文档同时存在时才算完整。
6. 不为 SSR、旧浏览器、本地化或 npm 发布加入隐含兼容分支。
7. 组件文档中的导入路径、模板标签、API 和状态必须能由当前公共实现与测试验证。
