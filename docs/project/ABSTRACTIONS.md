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
| ESM 分发产物 | 从 `src/` 可重复构建的单一 ESM、基础与组件 CSS、Tailwind CSS 映射和根入口类型声明 |

## Mat UI 插件

`MatSurfaceBase`、`MatActionBase`、`MatButtonBase`、`MatSelectionControlBase`、`MatTextInputBase`、`MatItemContentBase` 与 `useRovingFocus` 是内部结构复用层，不属于公共 API。它们分别负责表面根节点、原生 button/link 交互、按钮交互状态、选择控件结构、文本输入视觉、无语义项目内容排列和 tabindex 管理；公共组件不得要求使用者依赖其 class、文件路径或内部 CSS 变量。`MatInputBase` 是公共例外，提供无边框原生 input/textarea、受控字符串值、`update:modelValue`、原生属性透传以及 `focusInput`、`getInput` 方法；它不提供标签、描边、填充、辅助文字或校验语义。

`createMatUi({ theme, useCursor, iconClass, defaults })` 创建一次 Vue 插件安装单元。插件负责以 `mat-*` 和对应 `Mat*` 名称全局注册组件、建立主题控制器，并通过 Vue provide 分别暴露主题上下文和不可变的组件设置。

`useCursor` 必须是 boolean，默认 `false`，控制可用交互组件是否从 `cursor: default` 改为 `cursor: pointer`。`iconClass` 必须是 string，默认 `material-symbols-outlined`，作为公共 Icon 与组件图标容器的全局 class；组件级 `iconClass` 可以覆盖或以空字符串关闭它。`defaults` 按组件键设置公共组件的 prop 默认值，键是 `mat-*` 标签去掉前缀后的 camelCase；显式传入的 prop 优先于 defaults，defaults 优先于组件定义默认值，`v-model` 相关属性不接受 defaults 配置。`defaults.tooltip.openDelay`、`defaults.tooltip.closeDelay` 与 `defaults.tooltip.skipDelayDuration` 必须是非负有限数字，默认分别为 `0`、`600`、`0`；`openDelay` 是未显式设置 `openDelay` 时的自动打开延迟，`closeDelay` 是未显式设置 `closeDelay` 时的自动关闭延迟，`skipDelayDuration` 是同组 Tooltip 快速切换窗口。插件不下载字体或图标资源，未安装插件的按需组件使用组件定义默认值。

Tooltip 分组由展示元素最近的 `data-mat-tooltip-group` 祖先定义。只有首个 Tooltip 实际显示后，其他实例才可在其指针与焦点离开后的配置窗口内跳过延迟；不同组、同一实例、尚未显示和过期状态不得共享延迟。受控 Tooltip 不参与该自动状态。

## ESM 分发边界

`src/` 是组件、插件、指令、函数和样式的维护权威，`dist/` 是使用方唯一可解析的运行时与类型边界。所有运行时实现必须进入同一个 `dist/mde-vue.js`，公共 JavaScript API 只通过 `mde-vue` 根入口具名导入，使内部上下文、队列和协调器只存在一个模块实例。Vue 保持 peer dependency，Material Color Utilities 保持普通外部依赖；分发产物不包含 `.vue` 导入，也不要求使用方执行依赖生命周期脚本。

`dist/styles.css` 由基础令牌与全部 SFC 样式生成，`dist/tailwind.css` 来自 Tailwind 映射，`dist/index.d.ts` 包含根入口的组件、插件、指令和命令式函数声明。`dist/` 必须恰好包含这四个文件，且只能通过 `pnpm build` 更新，并与造成变化的源码和文档放在同一提交中。

`useMatTheme()` 只能读取当前 Vue 应用提供的主题上下文。组件不得自行创建第二套主题状态；应用级主题控制器是运行时配置的权威来源。

`MatHover` 是无渲染作用域 Slot 组件，`isHovering` 初始为 `null`，并通过 Slot 参数中的 `props` 把鼠标进入和离开监听交给使用方目标元素。显式 `modelValue` 时由父级控制状态；`disabled` 只暂停对外同步，不丢失内部真实 hover 状态。`openDelay` 和 `closeDelay` 共享可取消的单个计时器。

`v-intersection` 是客户端原生 `IntersectionObserver` 指令，不渲染包装元素。绑定值可以是处理函数或带 `handler`、`options` 的对象；`options` 保持原生观察器配置，回调的 `isIntersecting` 取本次 entries 是否存在相交项。`.quiet` 只跳过首次投递，`.once` 在首次相交后解除观察；观察器不支持时保持静默，卸载和绑定更新必须清理旧实例。

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

动效令牌同时提供旧版独立 duration/easing 与 Material 3 Expressive 复合值。`--mat-sys-motion-spring-{fast|default|slow}-spatial` 用于位置、尺寸、旋转和圆角等空间变化，`--mat-sys-motion-spring-{fast|default|slow}-effects` 用于颜色与透明度；复合值可直接用于 transition 或 animation。减少动态效果时，组件取消空间和无限动画并直接呈现静态可理解状态。

组件可以使用 `--mat-<component>-*` 等 CSS 自定义属性集中表达尺寸、颜色、形状、排版、描边、海拔和间距，但这些变量属于内部实现，不是公共定制入口，也不提供名称或行为兼容承诺。组件级定制通过已公开的 Vue props 完成。

排版轴令牌同时由 `.mat-sys-typescale-*` 公共 class 和 `--text-mat-*` Tailwind 主题变量消费；三层必须完整覆盖相同的 30 套样式并保持同一语义。其他 Tailwind 映射继续使用 `--color-mat-*`、`--radius-mat-*`、`--shadow-mat-*` 和 `--ease-mat-*`，不得复制具体值或覆盖常见无前缀主题变量。

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
- `primary-container`、`secondary-container`、`tertiary-container`、`error-container` 直接引用主题对应令牌，内容与状态层使用同组 `on-*` 令牌；`surface`、`surface-dim`、`surface-bright`、`surface-variant` 和五个 `surface-container-*` 角色同样直接引用主题令牌，内容使用 `on-surface`（`surface-variant` 使用 `on-surface-variant`）。系统颜色角色不生成局部色板，`on-*` 内容角色不是共享 `color` 输入的合法值；`MatBtn` 的 `text` 形态例外地接受受控的 `on-*` 内容色清单（10 个），只在该形态生效，其他形态发出开发警告并按默认配色处理。
- 严格六位 `#RRGGBB` 值作为局部种子色，按当前主题方案与对比度生成 Material 2025 亮暗 primary 色族；三位色值和其他 CSS 颜色写法不属于公共输入。
- `MatFab` 遵循官方 FAB 角色输入：只接受 `primary`、`secondary`、`tertiary`、`primary-container`、`secondary-container`、`tertiary-container`、`error` 和 `error-container`，默认 `primary-container`，不接受十六进制种子色。
- `MatBtnGroup` 与 `MatSplitBtn` 的 `color` 级联契约不扩展 `on-*`；需要 `on-*` 内容色时直接设置在 `text` 形态的按钮自身。
- 显式 `color` 只覆盖强调色族，中性表面、边框和禁用角色不随种子色改变，也不得写入全局主题或影响兄弟组件。
- 组合组件可以级联 `color`，子组件显式 prop 优先；由 prop 生成的局部变量优先于组件的默认角色映射。

配色结果必须由共享模块生成并使用最多 64 项的缓存；后续组件不得复制 Material Color Utilities 调用或另立颜色格式。

## 组件公共模型

- Vue 组件导出使用 PascalCase，例如 `MatBtn`；安装 `createMatUi()` 后，模板可使用 `mat-*`（如 `<mat-btn>`）或对应 PascalCase（如 `<MatBtn>`）。
- `<mat-spacer>` 是无内容、无交互且固定从无障碍树隐藏的 flex 子元素，只负责增长占据父容器主轴剩余空间，不定义父级方向、对齐或间距。
- `<mat-container>` 的外层始终铺满父容器，使用视口宽度在 `<600px` 时提供 16px、其他宽度提供 24px 的水平内边距。默认 Slot 位于内部正文层；正文层默认以 1040px 最大宽度和 `margin-inline: auto` 居中，在外层具有确定块轴尺寸时同步铺满高度，外层尺寸未确定时仍由内容自然撑开。`fluid=true` 只取消正文层的最大宽度，不改变外层边距或尺寸。
- 所有组件、插件、指令和命令式函数必须从唯一根入口导出。
- 原生元素语义优先于自造交互协议；`<mat-btn>` 渲染原生 `<button>`。
- 未被组件消费的原生属性和事件应继续传递到根原生元素。
- 带标签容器的选择控件把 `class`、`style`、`inert`、`aria-hidden` 传给外层标签，其余未消费属性和监听器传给内部原生 input。
- Button、Button group 和 Split button 的 `block` 默认 `false`；启用后只把组件根切换为块级 flex 布局，不替使用方定义 flex 或 grid 父布局中的伸缩规则。Text field、Textarea、Card 与 List 的根本身是块级布局，不提供该属性。
- `disabled` 必须使用原生禁用语义；默认按钮 `type` 是 `button`，避免意外提交表单。
- 交互组件默认使用 `cursor: default`；只在插件明确启用 `useCursor` 时为可用组件使用 `cursor: pointer`。
- 组件必须提供可见的键盘焦点状态，并为 hover、focus、pressed 和 disabled 使用共享状态令牌。
- 交互组件的 `extra-small` 和 `small` 视觉尺寸低于 48px 时，仍须提供至少 48px 的指针交互目标。

## `<mat-btn>`

按钮的 `variant` 接受 `elevated`、`filled`、`filled-tonal`、`outlined`、`text` 和 `standard`，默认 `filled`；尺寸使用 `extra-small`、`small`、`medium`、`large`、`extra-large`，形状使用 `round` 或 `square`。普通模式渲染默认 Slot，可使用字符串 `prefix`、`suffix` 或同名 Slots 提供前后图标，prop 存在时优先于 Slot；`selected` Slot 可替换选中时的标签内容。

`icon=true` 把 `<mat-btn>` 切换为图标模式，并从默认 Slot 读取非空 Material Symbols 文本；字符串 `icon` 使用 prop 文本并优先于默认 Slot。图标模式只渲染共享 `MatIcon`，忽略默认、`prefix` 和 `suffix` 的可见内容；`label` 或显式 `aria-label` 必须提供非空操作名称，`label` 也是 Tooltip 默认文本，显式 `title` 只覆盖 Tooltip 文本且不生成原生 HTML `title` 提示。不使用 `icon` 时默认 Slot 可以直接放置 `MatIcon`，仍按普通按钮渲染。图标模式的 `width` 接受 `narrow`、`uniform` 和 `wide`，默认 `uniform`；默认 `round` 形状在等宽时呈圆形。`toggle` 与 `selected` 只表达受控状态，图标模式选中时复用同一图标并切换 FILL 轴；`text` 不支持 toggle。

`<mat-btn-group>` 只接收 `<mat-btn>`，负责 standard/connected 布局以及受控 none/single/multiple 选择；standard 保留内容宽度与按钮间距，按压时当前按钮增宽并压缩相邻按钮，connected 只改变当前按压形状，`fullWidth` 时等分父容器。standard 选中时反转 round/square；connected 选中按钮的四角都使用 round checked shape，`shape` 只决定未选中组的外部轮廓。connected 要求子按钮使用相同颜色和视觉层级，不使用 text 或 standard。组容器不进入 Tab 顺序，子按钮保持独立停靠点。图标模式的显式 `width` 不根据组内子项数量变化。`<mat-split-btn>` 的 leading 和 trailing 都接收 `<mat-btn>`，trailing 支持 `icon=true` 默认 Slot 文本或字符串 `icon` 的图标模式按钮；split button 只协调视觉、事件、`aria-haspopup`、`aria-expanded` 与可选 `aria-controls`，菜单始终由应用管理。

当前按钮体系不包含 loading、链接模式、涟漪、密度参数、内置菜单或完整表单代理方法。

## `<mat-fab>`

`<mat-fab>` 的导出名是 `MatFab`，默认 Slot 没有非空内容时表现为纯图标 FAB，有内容时表现为 Extended FAB；不另设 `MatExtendedFab`。尺寸只接受 `small`、`medium`、`large`，高度分别为 56px、80px、96px，`small` 统一普通 FAB 与 small Extended FAB 的 56px 规格。纯图标模式要求非空 `icon` 和 `label`；label 写入 `aria-label` 并作为默认 Tooltip，Extended FAB 可以没有 icon 但默认 Slot 标签仍然有效。`app=true` 时自动进入最近 AppRoot 的普通浮动组，`position` 控制逻辑起点、居中或逻辑终点对齐；AppRoot 外保持声明位置的按钮行为。

## AppRoot 应用布局

`<mat-app-root>` 与导出 `MatAppRoot` 建立应用坐标系。默认 `fillViewport=true` 且 `scrollable=false`：根至少为 `100dvb`，正文增长并由 document/body 滚动；`scrollable=true` 把正文切换为内部滚动容器，`fillViewport=false` 时使用方必须提供确定高度。组件不修改 `html`、`body` 或挂载节点。允许多个同级容器化 AppRoot，不允许嵌套。

`useMatApp()` 只在 AppRoot 后代 setup 中可用，返回同一个深只读响应式 `layout` 与 `registerEdge()`。断点按 AppRoot 宽度的 600/840/1200/1600 边界计算；layout 同时提供布局 size、四向 padding、扣除 padding 的 content、breakpointRange 和四向 edges。安全区由 AppRoot 统一并入 padding。

`registerEdge({ edge, element })` 接受当前 document 中的 HTMLElement，并返回只读响应式 `insets`、`update()`、幂等 `unregister()`。同侧外延取最大值而不累加；正交边缘按登记顺序确定优先级，较晚登记项通过 cross-axis insets 避让较早项。默认 Slot 只承载正文和布局组件，覆盖层不作为公共 Slot 暴露。

内部覆盖层按层级依次承载固定边缘、自由定位、Snackbar 与普通浮动组件、模态层。位于 AppRoot 内且省略 `attach` 的 Dialog 与 modal Bottom/Side sheet 进入模态层，表面与帷幕限制在应用矩形内，正文层设为 `inert`，AppRoot 外的内容保持可交互；Menu 的视口夹紧与透明 scrim 同样以应用矩形为边界。document 模式（`fillViewport=true` 且 `scrollable=false`）下应用范围等于视口，任务栏等 AppRoot 外内容应使用 `scrollable` 或 `fillViewport=false` 布局。

FAB 复用 `MatButtonBase` 的原生 button、disabled、焦点、按下状态、交互目标和事件处理；组件本身只负责尺寸、颜色角色、图标/标签内容和无障碍名称。它不负责固定定位、滚动收缩、FAB menu 或页面级动效。颜色直接使用所选 `--mat-sys-color-*` 和同组 `--mat-sys-color-on-*` 令牌，状态层沿用同组内容色。

## `<mat-icon>`

`<mat-icon>` 的导出名是 `MatIcon`，默认以 `i` 为根元素，`as` 可以改用其他非空 HTML 标签。内容按 `src`、`icon`、默认 Slot 的顺序选择：`src` 通过内部空替代文字的 img 加载 SVG URL 或 data URL，`icon` 输出字体字形或连字文本，默认 Slot 直接渲染 SVG 或其他 Vue 内容。组件不获取或解析远程 SVG，也不把 SVG 字符串写入 DOM。

Icon 尺寸使用 `small`、`medium`、`large`、`extra-large` 四档，分别为 20px、24px、40px、48px，也接受带单位的 CSS 长度。`fill`、`weight`、`grade`、`opticalSize` 对应 Material Symbols 的经典四轴并按官方范围校验；轴、字号和颜色使用系统动效令牌过渡，并尊重减少动画偏好。

Icon 的 `color` 沿用语义色与六位种子色格式，但省略时继承 `currentColor`；`fontColor` 直接接受任意 CSS 颜色并优先于 `color`。Slot SVG 只有使用 `currentColor` 时继承颜色，`src` 资源保留内部颜色。其他组件复用 MatIcon 时负责传入所在组件的尺寸、光学尺寸、内容颜色和无障碍属性。

## `<mat-image>`

`<mat-image>` 的导出名是 `MatImage`，根元素是包裹内部原生 `<img>` 的 `div`。`radius` 省略时使用 `--mat-sys-shape-corner-extra-large`（28px），数字与纯数字字符串按 px 处理（0 不带单位），其他字符串须为 trim 后合法的 CSS 长度值，非法时回退默认令牌；`fit` 只接受 `cover`（默认）与 `contain`；`aspect-ratio` 接受宽/高比数字或 trim 后合法的 CSS `aspect-ratio` 字符串，省略或非法时保持图片自然比例；`outline` 默认开启 1px 描边，颜色使用 `--mat-sys-color-outline`，可设置为 `false` 关闭。组件上的 `class` 与 `style` 属于根容器，其余未消费的原生属性和监听器以及 `img-class`、`img-style` 定向到内部 `img`。根元素对 `aspect-ratio`、`inline-size`、`block-size` 和 `border-radius` 使用系统动效令牌过渡，并尊重减少动画偏好；`fit` 切换不参与过渡。组件没有 Slots、自定义事件或公开方法。

## `<mat-card>`

`<mat-card>` 的导出名是 `MatCard`，以 `filled`、`elevated`、`outlined` 表达三种 Material 3 层级，默认 filled。根元素可以使用 `div`、`article`、`section` 或 `li`，并继续透传未消费的原生属性。`color` 遵循统一组件配色约定；省略时保持官方中性表面角色。

Card 的 `headline`、`subhead`、`media` 具名 Slot 分别自动使用 `MatCardHeadline`、`MatCardSubhead`、`MatCardMedia` 渲染；三者也可以通过 `<mat-card-headline>`、`<mat-card-subhead>`、`<mat-card-media>` 直接组合。Headline 使用 title-large，Subhead 使用较低强调的 body-medium；Media 占满可用横向空间并保持图片或视频自身比例。`MatCardContent` 提供 16px 内边距，`MatCardActions` 使用末端对齐、可换行的横向布局、8px 间距和 16px 内边距。

`MatCardActionArea` 使用原生 button 或 link 语义，使整块内容成为主要操作区域；独立按钮、链接和选择控件必须放在同级 Actions 中。只有启用的 ActionArea 才驱动 Card 的 hover、focus 和 pressed 状态，pressed 必须恢复各变体的静止海拔，不能停留在 hover 海拔。`MatDivider` 直接位于 Card 和 Actions 之间时完整分隔两个区域；布尔 `inset` 表达两侧各 16px 的相关内容分隔，`start` 与旧 `middle` 字符串继续兼容。

## `<mat-loader>`

`<mat-loader>` 的导出名是 `MatLoader`，以 `variant='linear' | 'circular'` 统一线条和环形 Progress indicator。默认是确定进度：`value` 会限制在 `0` 与正数 `max` 之间，根元素提供 progressbar ARIA 最小值、最大值和当前值；`indeterminate` 时省略当前值并展示加载动画。组件根始终为块级元素。

`shape='flat' | 'wavy'` 选择平直或 Expressive 波浪形活动指示器，`thickness` 以 CSS px 调整轨道和活动指示器厚度。活动与停止指示器默认使用 primary，轨道使用 secondary container；`color` 遵循统一组件配色约定，只替换前两者的强调色。Loader 没有 Slots、方法或自定义事件。

## 表单选择控件

`<mat-checkbox>` 的 `v-model` 接受 boolean 或基础值数组；数组模式通过 `value` 和 `Object.is()` 计算成员，每次更新都返回新数组。`indeterminate` 是受控展示状态，使用者操作时组件请求将其清除。

`<mat-radio>` 可以独立绑定基础单值；进入 `<mat-radio-group>` 后由 Group 的 `v-model` 统一管理，子级模型被忽略。Group 通过注册表保持一个 Tab 停靠点，并让方向键循环选择、跳过禁用项。Group 的 `label` 是必填可访问名称，禁用和配色向下级联，子级显式配色优先。

`<mat-switch>` 只绑定 boolean，并通过 `none`、`selected`、`both` 三档内置图标表示无图标、只显示开启图标或同时显示开关图标。Switch 用于立即生效的独立二元状态，不代替按钮或互斥选项组。

选择控件使用原生 input 保留 checkbox、radio 和 switch 语义，但公共能力只覆盖 Vue 状态绑定，不包括 FormData、原生 required 校验、表单重置或表单代理方法。纯展示实例必须同时从指针、焦点和无障碍树移除，不能在 List option 内形成嵌套交互。

`<mat-list>` 在同一实例中只允许一种 `interaction`。`none`、`single-action`、`multi-action` 使用原生列表结构；`single-select`、`multi-select` 使用 listbox/option，并由父组件以受控 `selected` 和 `select` 事件协调选择。方向键只移动 roving tabindex 焦点，不隐式修改选择。选择 option 内不得放置可聚焦后代，多操作项的附加操作只能位于 trailing Slot。

`<mat-divider>` 独立使用时保持原生 `hr`；进入普通 List 后使用合法的 `li` separator，进入选择 List 后成为不参与 listbox 语义的展示元素。Divider 不进入 Tab 顺序，也不提供强调色。默认 Divider 明确占满可用横向空间；`inset=true` 或兼容值 `middle` 表示两侧各缩进 16px，`start` 只缩进逻辑起始侧。

`<mat-list-group>` 只在普通或操作 List 中提供折叠：Activator Slot 必须是单个普通 MatListItem，该 Item 只承担 disclosure 按钮语义，不再承担链接、选择或叶子点击。根 List 的 `expanded` 数组以 `Object.is()` 管理有值分组，并允许多个值同时展开；无值分组使用独立内部状态。折叠内容必须同时离开焦点顺序和无障碍树。选择 List 中的分组固定为静态标签与始终展开的 `group/option` 结构，不混入 disclosure 交互。

## Chips

`<mat-chip>` 的导出名是 `MatChip`，始终使用单一原生 button 作为交互根。`variant` 只区分 assist、filter、input 与 suggestion 的用途和内容默认值；独立 filter/input 的 `selected` 是受控视觉状态和 `aria-pressed`。input 默认关闭图标的指针点击区域发出 remove 并阻止同次根 click，但不形成第二个键盘操作目标；自定义 trailing 仍只是主按钮的展示内容。remove 只请求应用删除数据，不修改选中值。

`<mat-chip-set>` 的导出名是 `MatChipSet`，提供 `role="group"`、8px 间距和 wrap/scroll 两种横向布局；scroll 组合横向 MatScrollArea 与 thin 滚动条。selection 以 none、single、multiple 控制受控 v-model，只有带基础 value 的 filter/input 参与，组模型优先于子项 selected；single 允许再次激活为 null，multiple 总是返回新数组。ChipSet 不删除数据，也不协调焦点、子项禁用、文本转 Chip、键盘删除、编辑、拖拽、菜单或进度。

## 文本输入与菜单

`MatInputBase` 是文本输入族的无边框基础层，渲染调用方选择的原生 `input` 或 `textarea`，负责受控字符串值、`update:modelValue`、原生属性透传以及 `focusInput`、`getInput` 方法；它同时隐藏浏览器为 search、number、date/time 添加的默认控件装饰（清除按钮、步进按钮、日历指示器），等价操作由使用方自行提供；组件不提供标签、描边、填充、辅助文字或校验语义。`<mat-text-field>` 和 `<mat-textarea>` 在其上共享 outlined/filled 外观、局部配色、辅助或错误文字、字符计数与属性路由，但分别保留 input 和 textarea 原生语义。错误角色始终覆盖 color 强调；Textarea 默认使用固定初始行数和纵向调整，也可以按内容自动增高、限制最大行数或禁止手动调整。其他输入类型可以复用该基础层并自行定义容器语义。

`<mat-menu>` 使用受控根 `modelValue` 和 Popover top layer。根 `activator` Slot 优先于 anchor，并且必须只产生一个当前 document 中的 HTMLElement 根节点；没有 Slot 时 anchor 接受触发器 id 或 `[clientX, clientY]` 视口坐标，offset 在基础位置之后、视口夹紧之前生效；元素 anchor 使用 CSS Anchor Positioning，坐标 anchor 使用 fixed 定位。根菜单默认先打开透明 manual Popover scrim，再在其上打开菜单；外部指针操作只关闭菜单而不传给背景，`scrim=false` 恢复 auto Popover 的轻触外部关闭与背景交互。位于 `MatAppRoot` 内时，视口夹紧与透明 scrim 以该 AppRoot 的应用矩形为边界，点击应用外只关闭菜单且不拦截事件。`maxLength` 以 CSS 块轴长度限制单层菜单并始终受所在坐标空间（视口或应用矩形）安全范围约束，溢出内容通过隐藏滚动条且带边缘渐隐的 MatScrollArea 滚动。嵌套 Menu 只允许直接位于 MatMenuItem 的 submenu Slot，自动继承父级 color 与 variant，并以父项目为 anchor；它共享根 scrim，但独立读取 `maxLength`。MatMenuGroup 以带可选标签的 `role="group"` 和 2px expressive 间隙组织相关项目；同一菜单不得混合分组和未分组的直接子级。MenuItem 是单一操作；叶子 click 关闭整条链，子菜单项只展开。Menu 与 List 可以共享无语义排列和 roving focus，但不得共享 listbox 选择模型、角色或左右键含义。

## Dialog

`<mat-dialog>` 通过 `modelValue` 受控显示，使用原生 `<dialog>` 元素（非模态 `show()`）和 Teleport，组件自管焦点陷阱与背景拦截，不依赖浏览器 top layer。位于 `MatAppRoot` 内且省略 `attach`（或 `attach` 指向 AppRoot 根元素）时进入该 AppRoot 的模态层，表面与帷幕限制在应用矩形内，仅正文层 `inert`；其他场景铺满视口。`activator` Slot 必须只产生一个当前 document 中的 HTMLElement 根节点，作为触发元素和关闭后的焦点恢复目标。`width` 接受数字 px 值或 trim 后合法的 CSS 宽度值，只影响基础布局并在小屏按视口限制；`fullScreen` 只接受显式布尔值并忽略 width，不根据视口自动切换；基础和全屏布局都只允许 content 区域滚动，打开期间由共享堆叠管理器锁定滚动：非 AppRoot 场景锁定页面根滚动，AppRoot 场景锁定正文滚动容器。页面或正文原本存在占据布局宽度的经典滚动条时，锁定期间临时使用稳定滚动条槽位保持页面宽度；没有经典滚动条时不额外预留空间。`scrim=false` 只把帷幕变透明，不允许背景接收指针事件；`closeOnBack` 只控制点击帷幕关闭，Escape 始终请求关闭。多个实例只显示顶层帷幕，最后一层关闭后才恢复页面滚动和滚动元素原有内联样式。

标题、正文和图标都遵循 prop 优先于同名 Slot；无标题时必须由使用者提供 `aria-label` 或 `aria-labelledby`。关闭期间 DOM 保留到退出动画完成，随后触发 `closed` 并恢复原焦点。

`dialog()`、`alert()`、`confirm()` 和 `prompt()` 统一从 `mde-vue` 根入口导入，并且只在客户端调用。正常取消分别返回 `undefined`、`undefined`、`false` 和 `null`，不拒绝 Promise；参数、挂载目标或运行环境错误使用 rejected Promise。Promise 只在退出动画、原生关闭和一次性宿主清理全部完成后结算。多个命令式实例可以并行存在；最后安装的 `createMatUi()` 配置为后续命令式实例提供主题和组件设置。

## Bottom sheet 与 Side sheet

`<mat-bottom-sheet>` 与 `<mat-side-sheet>` 分别导出 `MatBottomSheet` 和 `MatSideSheet`，共享内部 `MatSheetBase`，但保持独立公共入口与方向能力。两者都通过 `modelValue` 受控显示，`variant` 接受 `auto`、`standard`、`modal`。Auto 默认以 840px 为断点：窄屏使用 modal，宽屏使用 standard；`breakpoint` 可以覆盖断点。自动模式只切换当前组件的布局，不把 Bottom sheet 与 Side sheet 相互替换。

Standard 使用原生 `aside`，在声明位置参与父级布局，不使用 Teleport、不锁页面滚动且不主动移动焦点；Bottom sheet 适合作为纵向 flex 容器末端区域，Side sheet 适合作为横向 flex 容器的不可压缩侧栏。Modal 使用原生 `<dialog>` 元素（非模态 `show()`）、Teleport、共享 Dialog 堆叠、焦点陷阱与滚动锁，不依赖浏览器 top layer；页面存在经典滚动条时临时保留其槽位，避免锁定根滚动造成页面横向位移，没有经典滚动条时不预留额外空间。只有顶层模态表面显示帷幕颜色，关闭完成后恢复打开前焦点。Escape 始终请求关闭，`closeOnBack` 只控制帷幕点击，`scrim=false` 只隐藏颜色而不恢复背景交互。

Bottom sheet 最大宽度固定为 640px，使用顶部 extra-large 圆角和可选 drag handle。Modal 默认处于不超过半屏的预览高度，`expanded` 表达展开预设高度；预览状态向上拖动或通过键盘选择把手请求展开，展开状态向下拖动请求折叠，展开的 standard 选择把手也请求折叠，展开的 modal 则请求关闭；预览状态向下拖动请求关闭。拖动时面板高度或位移连续跟随指针，关闭动画从释放位置继续。内置关闭按钮默认不显示，由 `closable` 显式开启。Side sheet 使用 start/end 逻辑边缘，默认及最大宽度均为 400px、默认显示关闭入口，并允许触摸用户向依附边缘滑动关闭。标题、正文、header、actions、footer 和 activator 由两者共享；Side sheet 不提供 Bottom sheet 的 drag-handle Slot。

## Tooltip

`<mat-tooltip>` 的 `content` prop 优先于默认 Slot，`activator` Slot 优先于 `target`；activator 必须只产生一个当前 document 中的 HTMLElement 根节点。选择器 target 初次未解析时不立即警告，并在 Vue 更新或实际展示请求时继续解析；只有展示请求仍无法解析时才警告。没有显式传入 `modelValue` 时，组件只在桌面 hover 或键盘 focus 下自动展示，并在两个状态都离开默认 600ms 后关闭（可通过 `closeDelay` 或 `defaults.tooltip.closeDelay` 调整）；显式传入时改为完全受控，忽略自动触发、`openDelay` 和 `closeDelay`。

Tooltip 只实现 Material 3 Plain tooltip，不提供 color、Rich 内容、操作、箭头或触屏长按。模块级协调器保证同一时间只有一个实例可见；展示期间将唯一 tooltip id 无损合并到展示元素的 `aria-describedby`，关闭、换锚点或卸载时恢复原有属性。默认按首选方向翻转并在 8px 安全边距内夹紧；AppRoot 内使用应用局部坐标和 layout padding，其他场景使用固定视口坐标与 Toolbar 几何注册表。

## Snackbar

`<mat-snackbar>` 通过 `modelValue` 请求展示底部短暂通知；AppRoot 内的模板实例自动进入应用 Snackbar 组并排列在普通浮动组上方，其他模板实例固定在 body 视口。它使用全局 FIFO 队列，因此任意模板实例与命令式调用合计同一时刻只显示一条。活动项必须先完成退出动画，下一条才可进入；排队模板项收到 `modelValue=false` 或卸载时取消。`text` 与默认 Slot 都能提供内容，默认 Slot 优先；`actionText` 提供唯一可选文字 action，`action` Slot 存在时优先并接收 `{ action }`，调用后派发 `action` 事件并关闭当前通知；`closable` 提供内置关闭按钮，`close` Slot 存在时优先并接收 `{ close }`。默认持续 4000ms，`duration=0` 常驻，`position` 只接受 `left`、`center`、`right`。

`snackbar(options)` 与别名 `toast` 只从 `mde-vue` 根入口导入，必须接收包含非空 `text` 的对象；可选 `actionText` 和 `onAction` 分别提供文字 action 与其回调，`onAction` 必须是函数。函数返回在退出动画和单个命令式宿主清理完成后结算的 `Promise<void>`。命令式请求没有 Slots 或取消句柄，但与模板组件使用同一个全局队列，并读取最后安装的插件图标与主题上下文。Snackbar 固定为 `role="status"`、`aria-live="polite"`，从不主动移动焦点。

## Panes 布局面板

`<mat-panes>` 与 `<mat-pane>` 组成横向 flexible Pane 布局。`MatPane.id` 是当前实例中的唯一稳定键，同时对应 `sizes` 与根 DOM id；`MatPanes.sizes` 始终由使用方受控，组件按绘制帧合并拖动预览，并在释放前刷新最新位置后发出 `update:sizes`。相邻 Pane 的权重总和保持不变，零权重允许 Pane 折叠但不代替应用执行 `v-if`。

Pane 默认 `block-size: 100%`、`min-block-size: 0` 和 `overflow: auto`；父级必须提供确定的块轴尺寸才能形成内部滚动边界。调整控件占用 8px 分隔空间，48px 交互目标在 Pane 高度方向居中，使用 `role="separator"`、垂直方向和左右键语义。`resizeLabel` 由使用方提供给后方分隔控件作为可访问名称；Pane 数量、内容顺序、断点后的显隐和尺寸持久化属于使用方责任。

## Scroll area 滚动区域

`<mat-scroll-area>` 与导出 `MatScrollArea` 拥有一个单轴原生滚动元素。`orientation` 的 `vertical`、`y`、`v` 表示纵向，`horizontal`、`x`、`h` 表示横向；完整值是文档中的规范写法。组件只在实际离开边缘后对对应内容使用真实 CSS mask 渐隐，并保留独立的滚动条保护区域；`shadowLength` 支持数字或分别设置 `start`、`end` 的对象，省略时两端默认 16px；边缘阴影带默认贴边，`shadowOffset` 可以分别设置起始端与末端的向内偏移，偏移区内的滚动内容不被遮罩覆盖，适合放置不透明的 sticky 元素；`barWidth` 的 `default`、`thin`、`hidden` 分别使用浏览器默认、窄或隐藏的滚动条；`fixed-start` 与 `fixed-end` 位于阴影之外，偏移区外的默认 Slot sticky 内容不保证避开阴影。

`snap` 以 `none`、`proximity`、`mandatory` 设置当前物理滚动轴的原生滚动停靠强度，默认关闭；`snapPadding` 以非负像素值设置同一轴两端的停靠内边距。组件不替默认 Slot 内容选择停靠目标，使用方必须在目标元素上声明 `scroll-snap-align`，并按需要选择 `scroll-snap-stop`。

`reachThreshold` 只设置 `reach-start`、`reach-end` 的非负像素阈值，不改变渐隐。初次布局、尺寸或内容同步、方向和阈值变化均保持静默；只有原生 scroll 从阈值外进入阈值内时派发一次，离开后重新进入才再次派发。事件载荷提供到对应边缘的 `distance` 与原生滚动 `target`。`getScroller()` 和 `scrollTo()` 是公共命令式方法；class 与 style 属于根容器，其他原生属性和监听器属于滚动元素。

## Navigation 导航

`<mat-navigation-rail>` 通过 `modelValue` 受控选择唯一目的地，直接子级 `<mat-navigation-rail-item>` 使用稳定 `value` 请求更新。纵向模式表达 Material 3 Expressive collapsed/expanded rail；默认在当前容器内布局，`expanded` 只由使用方控制，`layout="standard"` 占据正文空间，`layout="modal"` 在当前布局容器内覆盖正文并通过遮罩或 Escape 请求收起。设置 `app=true` 后组件建立应用导航：省略显式 attach 且位于 AppRoot 时自动登记逻辑边缘，modal 展开只以 collapsed host 宽度参与 padding；否则固定到显式 attach。`placeholder` 和 `bottomPlaceholder` 只在应用模式下生效；`position` 同时决定 rail 的固定侧和 Item 对齐。collapsed rail 默认保持可见；`hideOnCollapse` 只用于保留外部可达菜单入口的沉浸式 expanded rail。

`width` 只覆写 expanded rail 的宽度：数字与纯数字字符串转换为 px（0 不带单位），其他字符串须为 trim 后合法的 CSS 宽度值，非法时使用默认宽度；`position` 决定 Item 在起始或末尾侧对齐，并在展开/收回时保持该对齐。`orientation="horizontal"` 表达 Flexible navigation bar；`expanded=false` 使用图标上、标签下的纵向 Item，`expanded=true` 使用图标左、标签右的横向 Item。它不响应 `collapsible`、`layout`、`hideOnCollapse`、`alignment`、Header、FAB 或 `end`。纵向 rail 的 `end` Slot 固定于底部。组件不自动监听窗口尺寸，应用负责在 compact、medium 及更大断点间切换 bar 与 rail，且同一布局不得同时显示两者。Item 使用原生按钮或链接、`aria-current="page"`、完整宽度命中区域和指示器状态层；选中时只过渡背景色，标签必须简短且不得通过省略号截断。

## Toolbar 工具栏

`<mat-toolbar>` 默认在最近定位容器内绝对定位，`app=true` 才建立应用级挂载。省略显式 attach 且位于 AppRoot 时，docked 登记 bottom 并参与正文 padding；floating 不登记边缘，但读取四向 padding 避让，显式 `placeholder` 仍保留声明位置空间。显式 attach 优先于 AppRoot，组件固定到目标视口并继续发布 Toolbar 几何。`bottomPlaceholder` 在 AppRoot 模式作为安全区之外的额外下限，非 AppRoot 模式保持原有含义。

## App bar 应用栏

`<mat-app-bar>` 与导出 `MatAppBar` 只提供 M3 Expressive 推荐的 `search`、`small`、`medium-flexible`、`large-flexible` 四种 variant。默认 Slot 是唯一主内容区域，`content` 必须显式声明为 `headline`、`image` 或 `search`；`variant="search"` 固定使用 search 内容。leading、subtitle 与 trailing 是独立具名 Slot。默认 sticky 布局以稳定的 64px 壳参与文档流，flexible 展开差值由紧随其后的起始占位承担，展开背景和内容变化不改变滚动范围；`app=true` 且自动接入 AppRoot 时仅以折叠后的 64px 登记 top edge，展开差值仍在声明位置随正文滚走。

滚动状态只由 CSS `scroll-timeline` / `animation-timeline` 驱动：small 和 search 在最初 16px 滚动范围内填充 surface container，medium flexible 与 large flexible 分别在 48px、56px 范围内连续折叠为 small。脚本只负责解析滚动源、登记唯一时间线名称和清理共享作用域，不读取滚动位置或逐帧更新样式。不支持该 CSS 能力时保持静态展开；减少动态效果时不改变几何与内容，只保留表面填色。

`<mat-search>` 与导出 `MatSearch` 独立复用 `MatInputBase` 渲染原生 search input，实时发出 `update:modelValue`，由 Enter 或默认搜索按钮发出 `search(query)`。浏览器内建的 search 清除按钮被隐藏，清空入口由 trailing Slot 统一提供。它不依赖 App bar，也不实现 Search View、结果列表、网络请求、防抖或查询持久化。

## 文档权威关系

`docs/site/` 中人工编辑的 Markdown 使用页面是组件说明的权威来源。`llms.txt` 只提供适合 AI 发现内容的索引，`llms-full.txt` 是这些页面的合并文本；两者均为可重复生成的派生文件，不接受手工修补。

每个公共组件页面必须包含组件简介、示例、API、事件和 Slots。简介写明全部相关 `mat-*` 模板标签与 PascalCase 组件导出名；示例同时提供代码和实际渲染预览，并在保持清晰、有效的前提下尽可能覆盖公共属性、重要状态、事件和 Slots。同一示例的代码块和预览必须读取同一个 Vue 示例文件，不分别维护两份实现。除非功能本身需要组合，每个 prop 或 Slot 使用独立的示例文件和预览；同一 prop 的多个合法值可以集中展示，只保留必要依赖。示例代码使用 VitePress 原生 `::: details 查看示例代码` 容器并默认收起，预览位于容器外；不新增自定义代码查看器、标签页或运行时 API。示例文件按 `{Component}{Feature}Example.vue` 命名。事件和 Slots 即使不存在公共能力也需明确说明，方法和状态等其他小节按实际能力添加。全局注册与按需导入写法统一由安装文档维护，不得为尚未实现的接口编写示例，也不得记录组件内部 class 或 CSS 自定义属性。

## 关键不变量

1. 组件不得依赖 Tailwind 才能正确显示；基础 CSS 始终可独立使用。
2. Tailwind 工具类与组件样式读取同一组运行时语义值。
3. 主题模式与解析模式分开表达，`system` 不作为最终颜色方案。
4. 公共源码和 ESM 分发入口不能依赖仓库内部文档预览或文档实现。
5. 新组件只有在公共导出、样式、测试、文档实时预览和使用文档同时存在时才算完整。
6. 不为 SSR、旧浏览器、本地化或 npm 发布加入隐含兼容分支。
7. 组件文档中的导入路径、模板标签、API 和状态必须能由当前公共实现与测试验证。
8. 先写测试，再改代码；新增行为或缺陷修复必须先由能按预期失败的用户可观察行为测试界定，再修改实现使其通过。测试不得锁定内部 class、私有 DOM 结构或内部 CSS 自定义属性；纯视觉变化应由文档预览、视觉回归或 E2E 检查覆盖。
