# 核心抽象

本文说明跨组件、主题、样式和文档时必须保持一致的概念。具体安装和 API 示例属于使用文档，不在此重复。

## 术语

| 术语 | 含义 |
| --- | --- |
| 语义令牌 | 用用途命名的 CSS 自定义属性，例如主色、表面色、形状或状态透明度 |
| 种子色 | 生成一组 Material 3 动态配色的十六进制起始颜色 |
| 主题模式 | `light`、`dark` 或跟随系统的 `system` |
| 解析模式 | `system` 根据当前媒体查询解析后实际使用的 `light` 或 `dark` |
| 配色变体 | 本项目按 Material 2025 支持的四种 scheme variant 之一 |
| 主题目标 | 接收运行时 CSS 自定义属性的 DOM 元素，默认是 `document.documentElement` |
| 组件变体 | 同一组件的视觉层级，例如按钮的 `filled` 或 `outlined`；不等于主题配色变体 |
| AI 文档来源 | frontmatter 明确标记可进入 AI 文档的 Markdown 使用页面 |

## Mat UI 插件

`MatSurfaceBase`、`MatActionBase`、`MatSelectionControlBase`、`MatTextInputBase`、`MatItemContentBase` 与 `useRovingFocus` 是内部结构复用层，不属于公共 API。它们分别负责表面根节点、原生 button/link 交互、选择控件结构、文本输入视觉、无语义项目内容排列和 tabindex 管理；公共组件不得要求使用者依赖其 class、文件路径或内部 CSS 变量。

`createMatUi({ theme, useCursor, iconClass })` 创建一次 Vue 插件安装单元。插件负责全局注册 `mat-*` 组件、建立主题控制器，并通过 Vue provide 分别暴露主题上下文和不可变的组件设置。

`useCursor` 必须是 boolean，默认 `false`，控制可用交互组件是否从 `cursor: default` 改为 `cursor: pointer`。`iconClass` 必须是 string，默认 `material-symbols-outlined`，作为公共 Icon 与组件图标容器的全局 class；组件级 `iconClass` 可以覆盖或以空字符串关闭它。插件不下载字体或图标资源，未安装插件的按需组件使用相同默认值。

`useMatTheme()` 只能读取当前 Vue 应用提供的主题上下文。组件不得自行创建第二套主题状态；应用级主题控制器是运行时配置的权威来源。

## 主题配置

主题配置由以下值组成：

- `mode`：`light`、`dark` 或 `system`，默认 `system`。
- `seedColor`：合法十六进制颜色，默认 `#20a6fc`。
- `schemeVariant`：`tonal-spot`、`neutral`、`vibrant`、`expressive` 之一，默认 `tonal-spot`。
- `contrastLevel`：`-1` 至 `1`，默认 `0`。
- `target`：接收 CSS 令牌的 DOM 元素，默认 `document.documentElement`。

主题控制器公开当前配置、解析模式、运行时切换方法和清理方法。切换配置会重新生成颜色令牌并写入同一目标；销毁控制器后不得继续响应系统主题变化。

## CSS 令牌层级

公共 CSS 令牌分为两个层级：

- `--mat-ref-*`：字体族和字重等不带使用语义的参考值。
- `--mat-sys-color-*`：Material 语义颜色及其 on-color。
- `--mat-sys-typescale-*`、`--mat-sys-shape-*`、`--mat-sys-elevation-*`、`--mat-sys-motion-*`、`--mat-sys-state-*`、`--mat-sys-interaction-*`：跨组件共享的系统语义值。

组件可以使用 `--mat-<component>-*` 等 CSS 自定义属性集中表达尺寸、颜色、形状、排版、描边、海拔和间距，但这些变量属于内部实现，不是公共定制入口，也不提供名称或行为兼容承诺。组件级定制通过已公开的 Vue props 完成。

Tailwind 适配层只把公开的 reference 和 system 值映射到 `--color-mat-*`、`--radius-mat-*`、`--text-mat-*`、`--shadow-mat-*` 和 `--ease-mat-*`。两层必须保持同一语义，Tailwind 层不得复制具体颜色或覆盖常见无前缀主题变量。

## 组件配色角色

组件先按用途、重要程度和所在表面选择颜色角色，再通过内部组件变量集中映射到全局令牌。组件不得根据某个种子色的外观硬编码颜色，也不得为亮色与暗色模式建立两套结构。

组件配色必须保持以下关系：

- `primary` 用于最高强调的操作和活动状态，`secondary` 用于较低强调元素，`tertiary` 只用于需要额外区分的对比强调，`error` 只表达错误或紧急错误状态。
- `container` 角色只作为填充，文字和图标使用同组对应的 `on-*` 角色；不得跨组拼接容器和内容色。
- 页面背景使用 `surface`，中性组件和嵌套区域按层级使用 `surface-container-lowest` 至 `surface-container-highest`；主要与低强调内容分别使用 `on-surface` 和 `on-surface-variant`。
- `outline` 表达重要边界，`outline-variant` 表达分隔线或装饰性边界；不能仅依靠低强调边界定义交互目标。
- `inverse`、`fixed`、`fixed-dim`、`surface-bright` 和 `surface-dim` 是按明确场景选用的角色，不作为普通组件的默认配色。fixed 内容仍须使用同组 `on-*-fixed` 或 `on-*-fixed-variant`。
- `hover`、`focus` 和 `pressed` 状态层沿用当前内容或强调角色并读取 `--mat-sys-state-*`；`disabled` 使用 `on-surface` 与约定透明度，不临时创造颜色角色。

新增或修改映射后，必须在亮色、暗色、支持的配色变体和对比度边界下检查配对与层级。完整选择方法见[组件配色指南](../site/guide/component-color.md)。

## 组件 `color` 约定

除非组件完全没有可观察的强调色，所有新增公共组件都必须提供一致的 `color` 属性：

- 省略时使用组件形态在 Material 规格中规定的语义角色，不强制改成 primary。
- `primary`、`secondary`、`tertiary`、`error` 引用当前项目主题中同名的 base、on-base、container 和 on-container 令牌。
- 严格六位 `#RRGGBB` 值作为局部种子色，按当前主题方案与对比度生成 Material 2025 亮暗 primary 色族；三位色值和其他 CSS 颜色写法不属于公共输入。
- 显式 `color` 只覆盖强调色族，中性表面、边框和禁用角色不随种子色改变，也不得写入全局主题或影响兄弟组件。
- 组合组件可以级联 `color`，子组件显式 prop 优先；由 prop 生成的局部变量优先于组件的默认角色映射。

配色结果必须由共享模块生成并使用最多 64 项的缓存；后续组件不得复制 Material Color Utilities 调用或另立颜色格式。

## 组件公共模型

- Vue 组件导出使用 PascalCase，例如 `MatBtn`；模板标签使用 `mat-*`，例如 `<mat-btn>`。
- 完整包入口和单组件入口必须导出同一个组件对象与同一套行为。
- 原生元素语义优先于自造交互协议；`<mat-btn>` 渲染原生 `<button>`。
- 未被组件消费的原生属性和事件应继续传递到根原生元素。
- 带标签容器的选择控件把 `class`、`style`、`inert`、`aria-hidden` 传给外层标签，其余未消费属性和监听器传给内部原生 input。
- Button、Icon button、Button group、Split button、Text field 与 Textarea 的 `block` 默认 `false`；启用后只把组件根切换为块级 flex 布局，不替使用方定义 flex 或 grid 父布局中的伸缩规则。Card 与 List 的根本身是块级布局，不提供该属性。
- `disabled` 必须使用原生禁用语义；默认按钮 `type` 是 `button`，避免意外提交表单。
- 交互组件默认使用 `cursor: default`；只在插件明确启用 `useCursor` 时为可用组件使用 `cursor: pointer`。
- 组件必须提供可见的键盘焦点状态，并为 hover、focus、pressed 和 disabled 使用共享状态令牌。
- 交互组件的 `extra-small` 和 `small` 视觉尺寸低于 48px 时，仍须提供至少 48px 的指针交互目标。

## `<mat-btn>`

按钮的 `variant` 接受 `elevated`、`filled`、`filled-tonal`、`outlined` 和 `text`，默认 `filled`；尺寸使用 `extra-small`、`small`、`medium`、`large`、`extra-large`，形状使用 `round` 或 `square`。按钮可以通过 slots 提供前置图标与选中内容，`toggle` 与 `selected` 只表达受控状态，`text` 不支持 toggle。

`<mat-icon-btn>` 以必填 `label` 提供操作名称和原生 `title` 提示，支持三档宽度和受控 toggle。`<mat-btn-group>` 负责 standard/connected 布局以及受控 single/multiple 选择；组容器不进入 Tab 顺序，子按钮保持独立停靠点。`<mat-split-btn>` 接受调用方提供的 leading 和 trailing 按钮，只协调视觉、事件、`aria-haspopup`、`aria-expanded` 与可选 `aria-controls`，菜单始终由应用管理。

当前按钮体系不包含 loading、链接模式、涟漪、密度参数、内置菜单或完整表单代理方法。

## `<mat-icon>`

`<mat-icon>` 的导出名是 `MatIcon`，默认以 `i` 为根元素，`as` 可以改用其他非空 HTML 标签。内容按 `src`、`icon`、默认 Slot 的顺序选择：`src` 通过内部空替代文字的 img 加载 SVG URL 或 data URL，`icon` 输出字体字形或连字文本，默认 Slot 直接渲染 SVG 或其他 Vue 内容。组件不获取或解析远程 SVG，也不把 SVG 字符串写入 DOM。

Icon 尺寸使用 `small`、`medium`、`large`、`extra-large` 四档，分别为 20px、24px、40px、48px，也接受带单位的 CSS 长度。`fill`、`weight`、`grade`、`opticalSize` 对应 Material Symbols 的经典四轴并按官方范围校验；轴、字号和颜色使用系统动效令牌过渡，并尊重减少动画偏好。

Icon 的 `color` 沿用语义色与六位种子色格式，但省略时继承 `currentColor`；`fontColor` 直接接受任意 CSS 颜色并优先于 `color`。Slot SVG 只有使用 `currentColor` 时继承颜色，`src` 资源保留内部颜色。其他组件复用 MatIcon 时负责传入所在组件的尺寸、光学尺寸、内容颜色和无障碍属性。

## 表单选择控件

`<mat-checkbox>` 的 `v-model` 接受 boolean 或基础值数组；数组模式通过 `value` 和 `Object.is()` 计算成员，每次更新都返回新数组。`indeterminate` 是受控展示状态，使用者操作时组件请求将其清除。

`<mat-radio>` 可以独立绑定基础单值；进入 `<mat-radio-group>` 后由 Group 的 `v-model` 统一管理，子级模型被忽略。Group 通过注册表保持一个 Tab 停靠点，并让方向键循环选择、跳过禁用项。Group 的 `label` 是必填可访问名称，禁用和配色向下级联，子级显式配色优先。

`<mat-switch>` 只绑定 boolean，并通过 `none`、`selected`、`both` 三档内置图标表示无图标、只显示开启图标或同时显示开关图标。Switch 用于立即生效的独立二元状态，不代替按钮或互斥选项组。

选择控件使用原生 input 保留 checkbox、radio 和 switch 语义，但公共能力只覆盖 Vue 状态绑定，不包括 FormData、原生 required 校验、表单重置或表单代理方法。纯展示实例必须同时从指针、焦点和无障碍树移除，不能在 List option 内形成嵌套交互。

`<mat-list>` 在同一实例中只允许一种 `interaction`。`none`、`single-action`、`multi-action` 使用原生列表结构；`single-select`、`multi-select` 使用 listbox/option，并由父组件以受控 `selected` 和 `select` 事件协调选择。方向键只移动 roving tabindex 焦点，不隐式修改选择。选择 option 内不得放置可聚焦后代，多操作项的附加操作只能位于 trailing Slot。

`<mat-divider>` 独立使用时保持原生 `hr`；进入普通 List 后使用合法的 `li` separator，进入选择 List 后成为不参与 listbox 语义的展示元素。Divider 不进入 Tab 顺序，也不提供强调色。

## 文本输入与菜单

`<mat-text-field>` 和 `<mat-textarea>` 共享 outlined/filled 外观、局部配色、辅助或错误文字、字符计数与属性路由，但分别保留 input 和 textarea 原生语义。错误角色始终覆盖 color 强调；Textarea 只提供固定初始行数与纵向调整，不自动增高。

`<mat-menu>` 使用受控根 open、触发器 id anchor、Popover top layer 和 CSS Anchor Positioning。嵌套 Menu 只允许直接位于 MatMenuItem 的 submenu Slot，自动继承父级 color 与 variant，并以父项目为 anchor。MenuItem 是单一操作；叶子 click 关闭整条链，子菜单项只展开。Menu 与 List 可以共享无语义排列和 roving focus，但不得共享 listbox 选择模型、角色或左右键含义。

## 文档权威关系

`docs/site/` 中人工编辑的 Markdown 使用页面是组件说明的权威来源。`llms.txt` 只提供适合 AI 发现内容的索引，`llms-full.txt` 是这些页面的合并文本；两者均为可重复生成的派生文件，不接受手工修补。

每个公共组件页面必须包含组件简介、示例、API、事件和 Slots。简介写明全部相关 `mat-*` 模板标签与 PascalCase 组件导出名；示例同时提供代码和实际渲染预览，并在保持清晰、有效的前提下尽可能覆盖公共属性、重要状态、事件和 Slots。同一示例的代码块和预览必须读取同一个 Vue 示例文件，不分别维护两份实现。事件和 Slots 即使不存在公共能力也需明确说明，方法和状态等其他小节按实际能力添加。全局注册与按需导入写法统一由安装文档维护，不得为尚未实现的接口编写示例，也不得记录组件内部 class 或 CSS 自定义属性。

## 关键不变量

1. 组件不得依赖 Tailwind 才能正确显示；基础 CSS 始终可独立使用。
2. Tailwind 工具类与组件样式读取同一组运行时语义值。
3. 主题模式与解析模式分开表达，`system` 不作为最终颜色方案。
4. 公共源码入口不能依赖仓库内部文档预览或文档实现。
5. 新组件只有在公共导出、样式、测试、文档实时预览和使用文档同时存在时才算完整。
6. 不为 SSR、旧浏览器、本地化或 npm 发布加入隐含兼容分支。
7. 组件文档中的导入路径、模板标签、API 和状态必须能由当前公共实现与测试验证。
8. 先写测试，再改代码；新增行为或缺陷修复必须先由能按预期失败的测试界定，再修改实现使其通过。
