/* eslint-disable */
// 此文件由 scripts/build-types.mjs 生成，禁止直接编辑。
import type { DefineComponent } from 'vue';

export interface MatBtnProps {
  /**
  * 使用块级 flex 根布局，在普通文档流中铺满父元素。
  *
  * @type {boolean}
  * @default false
  */
  block?: boolean;
  /**
  * 按钮视觉层级。可选值为 `elevated`、`filled`、`filled-tonal`、`outlined`、`text`、`standard`。
  *
  * @type {'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text' | 'standard'}
  * @default 'filled'
  */
  variant?: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text' | 'standard';
  /**
  * 按钮容器、排版、图标、间距和圆角尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  size?: string | undefined;
  /**
  * 静止形状；可选值为 `round`、`square`。
  *
  * @type {'round' | 'square' | undefined}
  * @default undefined
  */
  shape?: 'round' | 'square' | undefined;
  /**
  * 图标模式的容器宽度；可选值为 `narrow`、`uniform`、`wide`，普通模式忽略。
  *
  * @type {'narrow' | 'uniform' | 'wide'}
  * @default 'uniform'
  */
  width?: 'narrow' | 'uniform' | 'wide';
  /**
  * 图标模式；`true` 从默认 Slot 读取 Material Symbols，字符串直接指定图标。
  *
  * @type {boolean | string | undefined}
  * @default undefined
  */
  icon?: boolean | string | undefined;
  /**
  * 图标 FILL 轴，仅在图标模式生效；省略时沿用 toggle 选中态的旧行为。
  *
  * @type {number | undefined}
  * @default undefined
  */
  fill?: number | undefined;
  /**
  * 普通按钮前置图标，优先于 prefix Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  prefix?: string | undefined;
  /**
  * 普通按钮后置图标，优先于 suffix Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  suffix?: string | undefined;
  /**
  * 图标模式的无障碍名称和默认 Tooltip 文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  label?: string | undefined;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。可选语义色为 `primary`、`secondary`、`tertiary`、`error`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 启用可选择外观和 `aria-pressed`。
  *
  * @type {boolean}
  * @default false
  */
  toggle?: boolean;
  /**
  * 受控选中状态，仅在 toggle 或选择组中生效。
  *
  * @type {boolean}
  * @default false
  */
  selected?: boolean;
  /**
  * 在 MatBtnGroup 选择模式中的项目值。
  *
  * @type {string | number | boolean | undefined}
  * @default undefined
  */
  value?: string | number | boolean | undefined;
  /**
  * 原生禁用状态。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 原生按钮类型；可选值为 `button`、`submit`、`reset`。
  *
  * @type {'button' | 'submit' | 'reset'}
  * @default 'button'
  */
  type?: 'button' | 'submit' | 'reset';
}

export interface MatBtnEmits {
  /**
  * 启用的按钮被用户激活时转发原生点击事件。载荷为 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
}

export type MatBtnComponent = DefineComponent<MatBtnProps, {}, {}, {}, {}, {}, {}, MatBtnEmits>;
export declare const MatBtn: MatBtnComponent;

export interface MatAppRootProps {
  /**
  * 是否至少铺满动态视口高度。
  *
  * @type {boolean}
  * @default true
  */
  fillViewport?: boolean;
  /**
  * 是否让正文层成为内部滚动容器；默认由 document/body 滚动。
  *
  * @type {boolean}
  * @default false
  */
  scrollable?: boolean;
}

export type MatAppRootComponent = DefineComponent<MatAppRootProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatAppRoot: MatAppRootComponent;

export interface MatAppBarProps {
  /**
  * App bar 规格变体。
  *
  * @type {'search' | 'small' | 'medium-flexible' | 'large-flexible'}
  * @default 'small'
  */
  variant?: 'search' | 'small' | 'medium-flexible' | 'large-flexible';
  /**
  * 默认 Slot 的主内容类型。
  *
  * @type {'headline' | 'image' | 'search'}
  * @default 'headline'
  */
  content?: 'headline' | 'image' | 'search';
  /**
  * 主内容的水平对齐方式。
  *
  * @type {'start' | 'center'}
  * @default 'start'
  */
  align?: 'start' | 'center';
  /**
  * 是否接入最近的 MatAppRoot 顶边；不在 MatAppRoot 内时固定到 attach。
  *
  * @type {boolean}
  * @default false
  */
  app?: boolean;
  /**
  * app=true 时的显式 Teleport 目标。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * CSS scroll timeline 的显式滚动源；省略时依次使用 AppRoot 正文、最近滚动祖先和 document。
  *
  * @type {string | HTMLElement | undefined}
  * @default undefined
  */
  scrollTarget?: string | HTMLElement | undefined;
}

export type MatAppBarComponent = DefineComponent<MatAppBarProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatAppBar: MatAppBarComponent;

export interface MatSearchProps {
  /**
  * 受控搜索文本，可使用 v-model。
  *
  * @type {string}
  * @default ''
  */
  modelValue?: string;
  /**
  * 搜索输入和默认搜索按钮的无障碍名称。
  *
  * @type {string}
  * @default 'Search'
  */
  label?: string;
  /**
  * 输入框占位文本。
  *
  * @type {string}
  * @default 'Search'
  */
  placeholder?: string;
  /**
  * 使用原生禁用语义。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 使用原生只读语义。
  *
  * @type {boolean}
  * @default false
  */
  readonly?: boolean;
  /**
  * 原生最大字符数。
  *
  * @type {number | undefined}
  * @default undefined
  */
  maxLength?: number | undefined;
}

export interface MatSearchEmits {
  /** 输入内容变化时发出新的字符串。 */
  "update:modelValue": (payload: unknown) => unknown;
  /** 提交搜索时发出当前查询字符串。 */
  "search": (payload: unknown) => unknown;
}

export interface MatSearchExposed {
  /**
 * 将焦点移到原生搜索输入框。
 *
 * @returns {void}
 */
  focusInput(): void;
  /**
 * 获取原生搜索输入框。
 *
 * @returns {HTMLInputElement | null}
 */
  getInput(): HTMLInputElement | null;
}

export type MatSearchComponent = DefineComponent<MatSearchProps, MatSearchExposed, {}, {}, {}, {}, {}, MatSearchEmits>;
export declare const MatSearch: MatSearchComponent;

export interface MatBtnGroupProps {
  /**
  * 使用块级 flex 组根，在普通文档流中铺满父元素。
  *
  * @type {boolean}
  * @default false
  */
  block?: boolean;
  /**
  * 组布局形态；可选值为 `standard`、`connected`。
  *
  * @type {'standard' | 'connected'}
  * @default 'standard'
  */
  variant?: 'standard' | 'connected';
  /**
  * 未显式设置尺寸的子按钮继承的尺寸。
  *
  * @type {string | undefined}
  * @default undefined
  */
  size?: string | undefined;
  /**
  * standard 子按钮形状；可选值为 `round`、`square`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  shape?: string | undefined;
  /**
  * 级联给未显式设置 color 的子按钮。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 为 true 时禁用全部子按钮。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 选择模式；可选值为 `none`、`single`、`multiple`。
  *
  * @type {'none' | 'single' | 'multiple'}
  * @default 'none'
  */
  selection?: 'none' | 'single' | 'multiple';
  /**
  * 受控当前选择值；single 使用单值，multiple 使用数组。
  *
  * @type {string | number | boolean | Array<string | number | boolean> | null}
  * @default null
  */
  selected?: string | number | boolean | Array<string | number | boolean> | null;
  /**
  * 阻止取消 single 当前项或 multiple 最后一项。
  *
  * @type {boolean}
  * @default false
  */
  required?: boolean;
  /**
  * connected 形态下铺满父容器并等分子项；standard 中忽略。
  *
  * @type {boolean}
  * @default false
  */
  fullWidth?: boolean;
}

export interface MatBtnGroupEmits {
  /**
  * 选择规则允许变化时触发，载荷为 `{ value, selected, nextSelected, originalEvent }`。
  */
  "select": (payload: Event) => unknown;
}

export type MatBtnGroupComponent = DefineComponent<MatBtnGroupProps, {}, {}, {}, {}, {}, {}, MatBtnGroupEmits>;
export declare const MatBtnGroup: MatBtnGroupComponent;

export interface MatFabProps {
  /**
  * FAB 尺寸；可选值为 `small`、`medium`、`large`。
  *
  * @type {'small' | 'medium' | 'large'}
  * @default 'medium'
  */
  size?: 'small' | 'medium' | 'large';
  /**
  * FAB 图标的 Material Symbols 文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  icon?: string | undefined;
  /**
  * Extended FAB 的按钮标签；图标模式用作无障碍名称。
  *
  * @type {string | undefined}
  * @default undefined
  */
  label?: string | undefined;
  /**
  * FAB 颜色角色；可选值为 `primary`、`secondary`、`tertiary`、`primary-container`、`secondary-container`、`tertiary-container`、`error`、`error-container`。
  *
  * @type {string}
  * @default 'primary-container'
  */
  color?: string;
  /**
  * 禁用原生按钮交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 原生按钮类型；可选值为 `button`、`submit`、`reset`。
  *
  * @type {'button' | 'submit' | 'reset'}
  * @default 'button'
  */
  type?: 'button' | 'submit' | 'reset';
  /**
  * 是否自动挂载到最近 MatAppRoot 的普通浮动组。
  *
  * @type {boolean}
  * @default false
  */
  app?: boolean;
  /**
  * app=true 时在浮动组中的逻辑轴对齐位置。
  *
  * @type {'start' | 'center' | 'end'}
  * @default 'end'
  */
  position?: 'start' | 'center' | 'end';
}

export interface MatFabEmits {
  /**
  * 启用的 FAB 被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
}

export type MatFabComponent = DefineComponent<MatFabProps, {}, {}, {}, {}, {}, {}, MatFabEmits>;
export declare const MatFab: MatFabComponent;

export interface MatIconProps {
  /**
  * Material Symbols 字形文本；优先级低于 src。
  *
  * @type {string | undefined}
  * @default undefined
  */
  icon?: string | undefined;
  /**
  * SVG、图片或字体资源地址；优先于 icon 和默认 Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  src?: string | undefined;
  /**
  * 图标尺寸，可使用 `extra-small`、`small`、`medium`、`large`、`extra-large` 或 CSS 长度值。
  *
  * @type {string}
  * @default 'medium'
  */
  size?: string;
  /**
  * Material Symbols FILL 轴，范围为 0 到 1。
  *
  * @type {number}
  * @default 0
  */
  fill?: number;
  /**
  * Material Symbols wght 轴，范围为 100 到 700 的步进值。
  *
  * @type {number}
  * @default 400
  */
  weight?: number;
  /**
  * Material Symbols GRAD 轴，可选值为 -25、0、200。
  *
  * @type {number}
  * @default 0
  */
  grade?: number;
  /**
  * Material Symbols opsz 轴，范围为 20 到 48 的整数。
  *
  * @type {number | undefined}
  * @default undefined
  */
  opticalSize?: number | undefined;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 直接设置图标内容颜色的 CSS 值。
  *
  * @type {string | undefined}
  * @default undefined
  */
  fontColor?: string | undefined;
  /**
  * 图标根元素标签名。
  *
  * @type {string}
  * @default 'i'
  */
  as?: string;
  /**
  * 覆盖全局图标字体 class。
  *
  * @type {string | undefined}
  * @default undefined
  */
  iconClass?: string | undefined;
}

export type MatIconComponent = DefineComponent<MatIconProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatIcon: MatIconComponent;

export interface MatImageProps {
  /**
  * 图片资源地址。
  *
  * @type {string}
  * @required
  */
  src: string;
  /**
  * 组件圆角；数字与纯数字字符串按 px 处理，其他字符串 trim 后须为合法 CSS 长度值。
  * 省略时使用 `--mat-sys-shape-corner-extra-large`（默认 28px），非法值回退该令牌。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  radius?: number | string | undefined;
  /**
  * 图片填充方式；可选值为 `cover`、`contain`。
  *
  * @type {'cover' | 'contain'}
  * @default 'cover'
  */
  fit?: 'cover' | 'contain';
  /**
  * 是否显示 1px 描边，颜色使用 `--mat-sys-color-outline`。
  *
  * @type {boolean}
  * @default true
  */
  outline?: boolean;
  /**
  * 组件宽高比；数字与纯数字字符串表示宽/高比，其他字符串 trim 后须为合法 CSS
  * `aspect-ratio` 值。省略或非法时保持图片自然比例。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  aspectRatio?: number | string | undefined;
  /**
  * 合并到内部 img 元素的 class。
  *
  * @type {string | Array<unknown> | Record<string, unknown> | undefined}
  * @default undefined
  */
  imgClass?: string | Array<unknown> | Record<string, unknown> | undefined;
  /**
  * 合并到内部 img 元素的 style。
  *
  * @type {string | Array<unknown> | Record<string, unknown> | undefined}
  * @default undefined
  */
  imgStyle?: string | Array<unknown> | Record<string, unknown> | undefined;
}

export type MatImageComponent = DefineComponent<MatImageProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatImage: MatImageComponent;

export interface MatTextProps {
  /**
  * Material 3 文字类型。
  *
  * @type {'display' | 'headline' | 'title' | 'body' | 'label'}
  * @default 'body'
  */
  type?: 'display' | 'headline' | 'title' | 'body' | 'label';
  /**
  * Material 3 文字尺寸。
  *
  * @type {'large' | 'medium' | 'small' | 'L' | 'M' | 'S'}
  * @default 'medium'
  */
  size?: 'large' | 'medium' | 'small' | 'L' | 'M' | 'S';
  /**
  * 使用同类型同尺寸的 emphasized 排版样式。
  *
  * @type {boolean}
  * @default false
  */
  emphasized?: boolean;
  /**
  * 实际根元素标签名。
  *
  * @type {string}
  * @default 'span'
  */
  as?: string;
}

export type MatTextComponent = DefineComponent<MatTextProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatText: MatTextComponent;

export interface MatSplitBtnProps {
  /**
  * 使用块级 flex 组根，在普通文档流中铺满父元素。
  *
  * @type {boolean}
  * @default false
  */
  block?: boolean;
  /**
  * 两侧按钮统一视觉层级；可选值为 `elevated`、`filled`、`filled-tonal`、`outlined`。
  *
  * @type {string}
  * @default 'filled'
  */
  variant?: string;
  /**
  * 两侧按钮统一尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  size?: string | undefined;
  /**
  * 两侧按钮统一配色，可使用语义色或 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 禁用两侧原生按钮。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 受控菜单展开状态。
  *
  * @type {boolean}
  * @default false
  */
  expanded?: boolean;
  /**
  * 写入 trailing 按钮的 `aria-controls`，通常是外部菜单 id。
  *
  * @type {string | undefined}
  * @default undefined
  */
  controls?: string | undefined;
}

export interface MatSplitBtnEmits {
  /**
  * 主要按钮激活时触发，载荷为 `MouseEvent`。
  */
  "leading-click": (payload: MouseEvent) => unknown;
  /**
  * 展开按钮激活时触发，载荷为 `MouseEvent`。
  */
  "trailing-click": (payload: MouseEvent) => unknown;
  /**
  * 展开按钮激活时触发，载荷为当前 expanded 的相反值。
  */
  "update:expanded": (payload: unknown) => unknown;
}

export type MatSplitBtnComponent = DefineComponent<MatSplitBtnProps, {}, {}, {}, {}, {}, {}, MatSplitBtnEmits>;
export declare const MatSplitBtn: MatSplitBtnComponent;

export interface MatCardProps {
  /**
  * 卡片的层级和边框外观；可选值为 `elevated`、`filled`、`outlined`。
  *
  * @type {'elevated' | 'filled' | 'outlined'}
  * @default 'filled'
  */
  variant?: 'elevated' | 'filled' | 'outlined';
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 根元素语义；可选值为 `div`、`article`、`section`、`li`。
  *
  * @type {'div' | 'article' | 'section' | 'li'}
  * @default 'div'
  */
  as?: 'div' | 'article' | 'section' | 'li';
}

export type MatCardComponent = DefineComponent<MatCardProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatCard: MatCardComponent;

export interface MatCardActionAreaProps {
  /**
  * 设置后渲染原生链接，否则渲染 button。
  *
  * @type {string | undefined}
  * @default undefined
  */
  href?: string | undefined;
  /**
  * 禁用交互；禁用链接移除 href 并设置无障碍状态。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * button 模式下的原生类型；可选值为 `button`、`submit`、`reset`。
  *
  * @type {'button' | 'submit' | 'reset'}
  * @default 'button'
  */
  type?: 'button' | 'submit' | 'reset';
}

export interface MatCardActionAreaEmits {
  /**
  * 启用的按钮或链接被用户激活时触发，载荷为原生 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
}

export type MatCardActionAreaComponent = DefineComponent<MatCardActionAreaProps, {}, {}, {}, {}, {}, {}, MatCardActionAreaEmits>;
export declare const MatCardActionArea: MatCardActionAreaComponent;

export interface MatCardContentProps {
}

export type MatCardContentComponent = DefineComponent<MatCardContentProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatCardContent: MatCardContentComponent;

export interface MatCardActionsProps {
}

export type MatCardActionsComponent = DefineComponent<MatCardActionsProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatCardActions: MatCardActionsComponent;

export interface MatCardHeadlineProps {
}

export type MatCardHeadlineComponent = DefineComponent<MatCardHeadlineProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatCardHeadline: MatCardHeadlineComponent;

export interface MatCardSubheadProps {
}

export type MatCardSubheadComponent = DefineComponent<MatCardSubheadProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatCardSubhead: MatCardSubheadComponent;

export interface MatCardMediaProps {
}

export type MatCardMediaComponent = DefineComponent<MatCardMediaProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatCardMedia: MatCardMediaComponent;

export interface MatListProps {
  /**
  * 列表布局形态；可选值为 `standard`、`segmented`。
  *
  * @type {'standard' | 'segmented'}
  * @default 'segmented'
  */
  variant?: 'standard' | 'segmented';
  /**
  * 交互模式；可选值为 `none`、`single-select`、`multi-select`。
  *
  * @type {string}
  * @default 'none'
  */
  interaction?: string;
  /**
  * 受控选中值；single-select 使用单值，multi-select 使用数组。
  *
  * @type {string | number | boolean | Array<string | number | boolean> | null}
  * @default null
  */
  selected?: string | number | boolean | Array<string | number | boolean> | null;
  /**
  * 受控展开分组的 value 数组。
  *
  * @type {Array<string | number | boolean>}
  * @default []
  */
  expanded?: Array<string | number | boolean>;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export interface MatListEmits {
  /**
  * 选择规则允许变化时触发，载荷包含 value、selected、nextSelected 和 originalEvent。
  */
  "select": (payload: Event) => unknown;
  /**
  * 分组展开状态变化时触发，载荷为新的 value 数组。
  */
  "update:expanded": (payload: unknown) => unknown;
}

export type MatListComponent = DefineComponent<MatListProps, {}, {}, {}, {}, {}, {}, MatListEmits>;
export declare const MatList: MatListComponent;

export interface MatListGroupProps {
  /**
  * 分组稳定值；提供后由 MatList 的 expanded 控制展开状态。
  *
  * @type {string | number | boolean | undefined}
  * @default undefined
  */
  value?: string | number | boolean | undefined;
}

export type MatListGroupComponent = DefineComponent<MatListGroupProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatListGroup: MatListGroupComponent;

export interface MatListItemProps {
  /**
  * 选择模式中的项目值。
  *
  * @type {string | number | boolean | undefined}
  * @default undefined
  */
  value?: string | number | boolean | undefined;
  /**
  * 设置后渲染原生链接，否则渲染 button。
  *
  * @type {string | undefined}
  * @default undefined
  */
  href?: string | undefined;
  /**
  * button 模式下的原生类型；可选值为 `button`、`submit`、`reset`。
  *
  * @type {'button' | 'submit' | 'reset'}
  * @default 'button'
  */
  type?: 'button' | 'submit' | 'reset';
  /**
  * 禁止项目被激活。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 内容行数；可选值为 `1`、`2`、`3`。
  *
  * @type {1 | 2 | 3 | undefined}
  * @default undefined
  */
  lines?: 1 | 2 | 3 | undefined;
}

export interface MatListItemEmits {
  /**
  * 启用的列表项被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
}

export type MatListItemComponent = DefineComponent<MatListItemProps, {}, {}, {}, {}, {}, {}, MatListItemEmits>;
export declare const MatListItem: MatListItemComponent;

export interface MatDividerProps {
  /**
  * 分隔线的缩进方式。`true` 表示两侧缩进；字符串值兼容 `none`、`start`、`middle`。
  *
  * @type {boolean | 'none' | 'start' | 'middle'}
  * @default false
  */
  inset?: boolean | 'none' | 'start' | 'middle';
}

export type MatDividerComponent = DefineComponent<MatDividerProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatDivider: MatDividerComponent;

export interface MatCheckboxProps {
  /**
  * `v-model` 当前值；数组模式按 value 增删项目。
  *
  * @type {boolean | Array<string | number | boolean>}
  * @default false
  */
  modelValue?: boolean | Array<string | number | boolean>;
  /**
  * 数组模式中的候选值；布尔模式忽略。
  *
  * @type {string | number | boolean}
  * @default true
  */
  value?: string | number | boolean;
  /**
  * 显示父级部分选中的不确定状态。
  *
  * @type {boolean}
  * @default false
  */
  indeterminate?: boolean;
  /**
  * 禁止指针与键盘交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export interface MatCheckboxEmits {
  /**
  * 使用者切换选中状态时触发，载荷为下一布尔值或新数组。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 使用者操作当前 Checkbox 后请求关闭不确定状态，载荷为 `false`。
  */
  "update:indeterminate": (payload: unknown) => unknown;
  /**
  * 内部 checkbox 发生 change 时转发原生 `Event`。
  */
  "change": (payload: Event) => unknown;
}

export type MatCheckboxComponent = DefineComponent<MatCheckboxProps, {}, {}, {}, {}, {}, {}, MatCheckboxEmits>;
export declare const MatCheckbox: MatCheckboxComponent;

export interface MatChipProps {
  /**
  * Chip 的用途形态。
  *
  * @type {'assist' | 'filter' | 'input' | 'suggestion'}
  * @default 'assist'
  */
  variant?: 'assist' | 'filter' | 'input' | 'suggestion';
  /**
  * 使用 level 1 海拔和 surface container low 表面。
  *
  * @type {boolean}
  * @default false
  */
  elevated?: boolean;
  /**
  * filter 与 input 的受控选中外观；组件不会自行切换该值。
  *
  * @type {boolean}
  * @default false
  */
  selected?: boolean;
  /**
  * ChipSet 选择模型中的基础值。
  *
  * @type {string | number | boolean | undefined}
  * @default undefined
  */
  value?: string | number | boolean | undefined;
  /**
  * 使用原生按钮禁用语义。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 原生按钮类型。
  *
  * @type {'button' | 'submit' | 'reset'}
  * @default 'button'
  */
  type?: 'button' | 'submit' | 'reset';
}

export interface MatChipEmits {
  /**
  * 启用的 Chip 被激活时转发原生点击事件，载荷为 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
  /**
  * input 默认关闭图标被点击时触发，载荷为原生 `MouseEvent`。
  */
  "remove": (payload: MouseEvent) => unknown;
}

export type MatChipComponent = DefineComponent<MatChipProps, {}, {}, {}, {}, {}, {}, MatChipEmits>;
export declare const MatChip: MatChipComponent;

export interface MatChipSetProps {
  /**
  * Chip 的换行或单行横向滚动布局。
  *
  * @type {'wrap' | 'scroll'}
  * @default 'wrap'
  */
  layout?: 'wrap' | 'scroll';
  /**
  * ChipSet 的受控选择模式。
  *
  * @type {'none' | 'single' | 'multiple'}
  * @default 'none'
  */
  selection?: 'none' | 'single' | 'multiple';
  /**
  * single 使用基础单值或 null，multiple 使用基础值数组。
  *
  * @type {string | number | boolean | Array<string | number | boolean> | null}
  * @default null
  */
  modelValue?: string | number | boolean | Array<string | number | boolean> | null;
}

export interface MatChipSetEmits {
  /**
  * Chip 请求改变选择时发出下一模型值。
  */
  "update:modelValue": (payload: unknown) => unknown;
}

export type MatChipSetComponent = DefineComponent<MatChipSetProps, {}, {}, {}, {}, {}, {}, MatChipSetEmits>;
export declare const MatChipSet: MatChipSetComponent;

export interface MatRadioProps {
  /**
  * `v-model` 当前选中值；独立 Radio 选中时更新为 value。
  *
  * @type {string | number | boolean | null | undefined}
  * @default undefined
  */
  modelValue?: string | number | boolean | null | undefined;
  /**
  * 当前 Radio 的候选值。
  *
  * @type {string | number | boolean}
  * @default undefined
  */
  value: string | number | boolean;
  /**
  * 禁止指针与键盘交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export interface MatRadioEmits {
  /**
  * Radio 被选中时发出新的 value。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 内部 radio 发生 change 时转发原生 `Event`。
  */
  "change": (payload: Event) => unknown;
}

export type MatRadioComponent = DefineComponent<MatRadioProps, {}, {}, {}, {}, {}, {}, MatRadioEmits>;
export declare const MatRadio: MatRadioComponent;

export interface MatRadioGroupProps {
  /**
  * `v-model` 当前选中值；未选中时为 null。
  *
  * @type {string | number | boolean | null}
  * @default null
  */
  modelValue?: string | number | boolean | null;
  /**
  * 组的必填无障碍标签。
  *
  * @type {string}
  * @required
  */
  label: string;
  /**
  * 禁止组内所有 Radio 交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export interface MatRadioGroupEmits {
  /**
  * 子 Radio 被选中时发出新的 value。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 子 Radio 的原生 change 事件。
  */
  "change": (payload: unknown) => unknown;
}

export type MatRadioGroupComponent = DefineComponent<MatRadioGroupProps, {}, {}, {}, {}, {}, {}, MatRadioGroupEmits>;
export declare const MatRadioGroup: MatRadioGroupComponent;

export interface MatSwitchProps {
  /**
  * `v-model` 当前开关状态。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 图标显示方式。
  *
  * 可选值为 `none`、`selected`、`both`。
  *
  * @type {'none' | 'selected' | 'both'}
  * @default 'none'
  */
  icons?: 'none' | 'selected' | 'both';
  /**
  * 禁止指针与键盘交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export interface MatSwitchEmits {
  /**
  * 使用者切换开关时发出下一布尔值。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 内部 checkbox 发生 change 时转发原生 `Event`。
  */
  "change": (payload: Event) => unknown;
}

export type MatSwitchComponent = DefineComponent<MatSwitchProps, {}, {}, {}, {}, {}, {}, MatSwitchEmits>;
export declare const MatSwitch: MatSwitchComponent;

export interface MatSliderProps {
  /**
  * `v-model` 当前数值。
  *
  * @type {number}
  * @default 0
  */
  modelValue?: number;
  /**
  * 可选范围最小值。
  *
  * @type {number}
  * @default 0
  */
  min?: number;
  /**
  * 可选范围最大值。
  *
  * @type {number}
  * @default 100
  */
  max?: number;
  /**
  * 每次键盘或指针调整的步长，必须为正数。
  *
  * @type {number}
  * @default 1
  */
  step?: number;
  /**
  * 轨道外观；可选值为 `standard`、`centered`。
  *
  * @type {string}
  * @default 'standard'
  */
  variant?: string;
  /**
  * 中心值；未设置时不显示中心分割。
  *
  * @type {number | undefined}
  * @default undefined
  */
  center?: number | undefined;
  /**
  * 禁止指针与键盘交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 滑块方向；可选值为 `horizontal`、`vertical`。
  *
  * @type {string}
  * @default 'horizontal'
  */
  orientation?: string;
  /**
  * 滑块尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
  *
  * @type {string}
  * @default 'extra-small'
  */
  size?: string;
  /**
  * 滑块内的 Material Symbols 图标文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  insetIcon?: string | undefined;
  /**
  * 是否显示停靠点指示器。
  *
  * @type {boolean}
  * @default false
  */
  showStopIndicator?: boolean;
  /**
  * 是否显示当前值指示器。
  *
  * @type {boolean}
  * @default false
  */
  showValueIndicator?: boolean;
}

export interface MatSliderEmits {
  /**
  * 数值因指针或键盘交互发生变化时发出下一 number。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 数值变化时转发原生 input 事件。
  */
  "input": (payload: unknown) => unknown;
  /**
  * 数值变化完成时转发原生 change 事件。
  */
  "change": (payload: unknown) => unknown;
}

export type MatSliderComponent = DefineComponent<MatSliderProps, {}, {}, {}, {}, {}, {}, MatSliderEmits>;
export declare const MatSlider: MatSliderComponent;

export interface MatRangeSliderProps {
  /**
  * `v-model` 当前范围，格式为 `[start, end]`。
  *
  * @type {[number, number]}
  * @default [0, 100]
  */
  modelValue?: [number, number];
  /**
  * 可选范围最小值。
  *
  * @type {number}
  * @default 0
  */
  min?: number;
  /**
  * 可选范围最大值。
  *
  * @type {number}
  * @default 100
  */
  max?: number;
  /**
  * 每次键盘或指针调整的步长，必须为正数。
  *
  * @type {number}
  * @default 1
  */
  step?: number;
  /**
  * 禁止指针与键盘交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 滑块方向；可选值为 `horizontal`、`vertical`。
  *
  * @type {string}
  * @default 'horizontal'
  */
  orientation?: string;
  /**
  * 滑块尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
  *
  * @type {string}
  * @default 'extra-small'
  */
  size?: string;
  /**
  * 是否显示停靠点指示器。
  *
  * @type {boolean}
  * @default false
  */
  showStopIndicator?: boolean;
  /**
  * 是否显示当前值指示器。
  *
  * @type {boolean}
  * @default false
  */
  showValueIndicator?: boolean;
  /**
  * 起始手柄的无障碍名称。
  *
  * @type {string | undefined}
  * @default undefined
  */
  ariaLabelStart?: string | undefined;
  /**
  * 结束手柄的无障碍名称。
  *
  * @type {string | undefined}
  * @default undefined
  */
  ariaLabelEnd?: string | undefined;
}

export interface MatRangeSliderEmits {
  /**
  * 任一端点发生变化时发出新的 `[start, end]` 数组。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 数值变化时转发原生 input 事件。
  */
  "input": (payload: unknown) => unknown;
  /**
  * 数值变化完成时转发原生 change 事件。
  */
  "change": (payload: unknown) => unknown;
}

export type MatRangeSliderComponent = DefineComponent<MatRangeSliderProps, {}, {}, {}, {}, {}, {}, MatRangeSliderEmits>;
export declare const MatRangeSlider: MatRangeSliderComponent;

export interface MatTextFieldProps {
  /**
  * 受控输入值，可使用 `v-model`。
  *
  * @type {string}
  * @default ''
  */
  modelValue?: string;
  /**
  * 始终可见的输入标签；输入有值、获得焦点或设置 placeholder 时浮动。
  *
  * @type {string | undefined}
  * @default undefined
  */
  label?: string | undefined;
  /**
  * 输入框外观。
  *
  * 可选值为 `outlined`、`filled`。
  *
  * @type {'outlined' | 'filled'}
  * @default 'outlined'
  */
  variant?: 'outlined' | 'filled';
  /**
  * 焦点描边、活动指示器和光标的强调色。
  *
  * 可使用 `primary`、`secondary`、`tertiary`、`error` 或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {'primary' | 'secondary' | 'tertiary' | 'error' | `#${string}` | undefined}
  * @default undefined
  */
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | `#${string}` | undefined;
  /**
  * 控件下方的简短辅助说明。
  *
  * @type {string | undefined}
  * @default undefined
  */
  supportingText?: string | undefined;
  /**
  * `error` 为 true 时显示的错误说明，并替换 supportingText。
  *
  * @type {string | undefined}
  * @default undefined
  */
  errorText?: string | undefined;
  /**
  * 输入值之前的固定短文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  prefixText?: string | undefined;
  /**
  * 输入值之后的固定短文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  suffixText?: string | undefined;
  /**
  * 原生输入控件允许的最大字符数，必须是非负整数。
  *
  * @type {number | undefined}
  * @default undefined
  */
  maxLength?: number | undefined;
  /**
  * 使用原生禁用语义并降低内容强调。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 使用原生只读语义，保留选择和焦点。
  *
  * @type {boolean}
  * @default false
  */
  readonly?: boolean;
  /**
  * 设置原生 `required`，并在标签后显示星号。
  *
  * @type {boolean}
  * @default false
  */
  required?: boolean;
  /**
  * 启用错误外观、`aria-invalid` 和错误说明关联。
  *
  * @type {boolean}
  * @default false
  */
  error?: boolean;
  /**
  * 原生 input 类型。
  *
  * 常用值包括 `text`、`email`、`number`、`password`、`search`、`tel`、`url`。
  *
  * @type {string}
  * @default 'text'
  */
  type?: string;
}

export interface MatTextFieldEmits {
  /**
  * 原生 input 事件产生新值，用于 v-model；载荷为 string。
  */
  "update:modelValue": (payload: string) => unknown;
}

export type MatTextFieldComponent = DefineComponent<MatTextFieldProps, {}, {}, {}, {}, {}, {}, MatTextFieldEmits>;
export declare const MatTextField: MatTextFieldComponent;

export interface MatTextareaProps {
  /**
  * 受控输入值，可使用 `v-model`。
  *
  * @type {string}
  * @default ''
  */
  modelValue?: string;
  /**
  * 始终可见的输入标签；输入有值、获得焦点或设置 placeholder 时浮动。
  *
  * @type {string | undefined}
  * @default undefined
  */
  label?: string | undefined;
  /**
  * 输入框外观。
  *
  * 可选值为 `outlined`、`filled`。
  *
  * @type {'outlined' | 'filled'}
  * @default 'outlined'
  */
  variant?: 'outlined' | 'filled';
  /**
  * 焦点描边、活动指示器和光标的强调色。
  *
  * 可使用 `primary`、`secondary`、`tertiary`、`error` 或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {'primary' | 'secondary' | 'tertiary' | 'error' | `#${string}` | undefined}
  * @default undefined
  */
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | `#${string}` | undefined;
  /**
  * 控件下方的简短辅助说明。
  *
  * @type {string | undefined}
  * @default undefined
  */
  supportingText?: string | undefined;
  /**
  * `error` 为 true 时显示的错误说明，并替换 supportingText。
  *
  * @type {string | undefined}
  * @default undefined
  */
  errorText?: string | undefined;
  /**
  * 输入值之前的固定短文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  prefixText?: string | undefined;
  /**
  * 输入值之后的固定短文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  suffixText?: string | undefined;
  /**
  * 原生输入控件允许的最大字符数，必须是非负整数。
  *
  * @type {number | undefined}
  * @default undefined
  */
  maxLength?: number | undefined;
  /**
  * 使用原生禁用语义并降低内容强调。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 使用原生只读语义，保留选择和焦点。
  *
  * @type {boolean}
  * @default false
  */
  readonly?: boolean;
  /**
  * 设置原生 `required`，并在标签后显示星号。
  *
  * @type {boolean}
  * @default false
  */
  required?: boolean;
  /**
  * 启用错误外观、`aria-invalid` 和错误说明关联。
  *
  * @type {boolean}
  * @default false
  */
  error?: boolean;
  /**
  * 根据内容自动调整 textarea 高度。
  *
  * @type {boolean}
  * @default false
  */
  autoGrow?: boolean;
  /**
  * 自动增高的最大行数；小于 rows 时按 rows 处理。
  *
  * @type {number | undefined}
  * @default undefined
  */
  maxRows?: number | undefined;
  /**
  * 禁止使用浏览器手柄调整 textarea 大小。
  *
  * @type {boolean}
  * @default false
  */
  noResize?: boolean;
  /**
  * textarea 的初始可见行数，必须为正整数。
  *
  * @type {number}
  * @default 4
  */
  rows?: number;
}

export interface MatTextareaEmits {
  /**
  * 原生 input 事件产生新值，用于 v-model；载荷为 string。
  */
  "update:modelValue": (payload: string) => unknown;
}

export type MatTextareaComponent = DefineComponent<MatTextareaProps, {}, {}, {}, {}, {}, {}, MatTextareaEmits>;
export declare const MatTextarea: MatTextareaComponent;

export interface MatInputBaseProps {
  /**
  * 要渲染的原生控件；可选值为 `input`、`textarea`。
  *
  * @type {'input' | 'textarea'}
  * @required
  */
  control: 'input' | 'textarea';
  /**
  * 受控字符串值，可使用 v-model。
  *
  * @type {string}
  * @required
  */
  modelValue: string;
  /**
  * 使用原生禁用语义。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 原生最大字符数。
  *
  * @type {number | undefined}
  * @default undefined
  */
  maxLength?: number | undefined;
  /**
  * 使用原生只读语义。
  *
  * @type {boolean}
  * @default false
  */
  readonly?: boolean;
  /**
  * 设置原生 required。
  *
  * @type {boolean}
  * @default false
  */
  required?: boolean;
  /**
  * textarea 的初始行数；control 为 input 时忽略。
  *
  * @type {number | undefined}
  * @default undefined
  */
  rows?: number | undefined;
  /**
  * input 的原生 type；control 为 textarea 时忽略。常用值包括 `text`、`number`、`password`、`url`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  type?: string | undefined;
}

export interface MatInputBaseEmits {
  /**
  * 原生 input 事件产生新值，用于 v-model；载荷为 string。
  */
  "update:modelValue": (payload: string) => unknown;
}

export interface MatInputBaseExposed {
  /**
 * 将焦点移到原生输入控件。
 *
 * @returns {void}
 */
  focusInput(): void;
  /**
 * 获取当前原生输入控件。
 *
 * @returns {HTMLInputElement | HTMLTextAreaElement | null}
 */
  getInput(): HTMLInputElement | HTMLTextAreaElement | null;
}

export type MatInputBaseComponent = DefineComponent<MatInputBaseProps, MatInputBaseExposed, {}, {}, {}, {}, {}, MatInputBaseEmits>;
export declare const MatInputBase: MatInputBaseComponent;

export interface MatMenuProps {
  /**
  * 受控打开状态，可使用 v-model。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 元素选择器或 `[clientX, clientY]` 视口坐标；未设置时使用 activator Slot。
  *
  * @type {string | [number, number] | undefined}
  * @default undefined
  */
  anchor?: string | [number, number] | undefined;
  /**
  * 菜单相对锚点的 `[x, y]` 偏移像素。
  *
  * @type {[number, number]}
  * @default [0, 0]
  */
  offset?: [number, number];
  /**
  * 菜单配色形态；可选值为 `standard`、`vibrant`。
  *
  * @type {'standard' | 'vibrant' | undefined}
  * @default undefined
  */
  variant?: 'standard' | 'vibrant' | undefined;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
  /**
  * 点击菜单项后是否关闭菜单。
  *
  * @type {boolean}
  * @default true
  */
  closeOnClick?: boolean;
  /**
  * 菜单最大块轴长度；数字与纯数字字符串按 px 处理，其他字符串须为合法 CSS 长度。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  maxLength?: number | string | undefined;
  /**
  * 是否使用透明帷幕拦截菜单外部的指针交互。
  *
  * @type {boolean}
  * @default true
  */
  scrim?: boolean;
}

export interface MatMenuEmits {
  /**
  * 菜单请求关闭时发出 false。
  */
  "update:modelValue": (payload: unknown) => unknown;
}

export type MatMenuComponent = DefineComponent<MatMenuProps, {}, {}, {}, {}, {}, {}, MatMenuEmits>;
export declare const MatMenu: MatMenuComponent;

export interface MatMenuGroupProps {
  /**
  * 可选的分组标签；未设置时不渲染标签。
  *
  * @type {string | undefined}
  * @default undefined
  */
  label?: string | undefined;
}

export type MatMenuGroupComponent = DefineComponent<MatMenuGroupProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatMenuGroup: MatMenuGroupComponent;

export interface MatMenuItemProps {
  /**
  * 禁止项目激活和打开子菜单。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
}

export interface MatMenuItemEmits {
  /**
  * 叶子菜单项被激活时触发，载荷为 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
}

export type MatMenuItemComponent = DefineComponent<MatMenuItemProps, {}, {}, {}, {}, {}, {}, MatMenuItemEmits>;
export declare const MatMenuItem: MatMenuItemComponent;

export interface MatDialogProps {
  /**
  * 受控打开状态，可使用 v-model。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 是否使用全屏布局；模板属性为 full-screen。
  *
  * @type {boolean}
  * @default false
  */
  fullScreen?: boolean;
  /**
  * 首选宽度；数字与纯数字字符串按 px 处理，其他字符串 trim 后须为合法 CSS 宽度值，
  * 非法值时省略宽度样式。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  width?: number | string | undefined;
  /**
  * Teleport 目标；字符串按当前 document 的 CSS 选择器解析。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * 是否显示顶层帷幕。
  *
  * @type {boolean}
  * @default true
  */
  scrim?: boolean;
  /**
  * 点击 Dialog 外帷幕时是否请求关闭。
  *
  * @type {boolean}
  * @default false
  */
  closeOnBack?: boolean;
  /**
  * 简单标题；设置后优先于 title Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  title?: string | undefined;
  /**
  * 简单正文；设置后优先于默认 Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  content?: string | undefined;
  /**
  * Material Symbols 字形；设置后优先于 icon Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  icon?: string | undefined;
  /**
  * 全屏头部关闭按钮的非空可访问名称。
  *
  * @type {string}
  * @default '关闭'
  */
  closeLabel?: string;
  /**
  * 基础 Dialog 装饰图标的语义色或 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export interface MatDialogEmits {
  /**
  * 请求关闭时发出 false。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 进入动画完成后触发。
  */
  "opened": (payload: unknown) => unknown;
  /**
  * 退出动画和 DOM 清理完成后触发。
  */
  "closed": (payload: unknown) => unknown;
}

export type MatDialogComponent = DefineComponent<MatDialogProps, {}, {}, {}, {}, {}, {}, MatDialogEmits>;
export declare const MatDialog: MatDialogComponent;

export interface MatBottomSheetProps {
  /**
  * 受控打开状态，可使用 v-model。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 布局变体；auto 在窄于 breakpoint 时使用 modal，否则使用 standard。
  *
  * @type {'auto'|'standard'|'modal'}
  * @default 'auto'
  */
  variant?: 'auto'|'standard'|'modal';
  /**
  * auto 变体切换为 standard 的最小视口宽度，单位为 CSS px。
  *
  * @type {number}
  * @default 840
  */
  breakpoint?: number;
  /**
  * 首选宽度；数字与纯数字字符串按 px 处理，其他字符串须为 trim 后合法的 CSS
  * 宽度值，非法时使用默认宽度；最终仍受 Material 3 的 640px 最大宽度约束。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  width?: number | string | undefined;
  /**
  * modal 的 Teleport 目标；字符串按当前 document 的 CSS 选择器解析。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * modal 是否显示顶层帷幕。
  *
  * @type {boolean}
  * @default true
  */
  scrim?: boolean;
  /**
  * 点击 modal 帷幕时是否请求关闭。
  *
  * @type {boolean}
  * @default true
  */
  closeOnBack?: boolean;
  /**
  * 是否显示可拖动的顶部把手。
  *
  * @type {boolean}
  * @default true
  */
  dragHandle?: boolean;
  /**
  * 展开的 standard 状态下拖动把手的可访问名称。
  *
  * @type {string}
  * @default '折叠底部面板'
  */
  collapseDragHandleLabel?: string;
  /**
  * 预设高度状态；false 为不超过半屏的预览状态，true 为展开状态。
  *
  * @type {boolean}
  * @default false
  */
  expanded?: boolean;
  /**
  * 预览状态下拖动把手的可访问名称。
  *
  * @type {string}
  * @default '展开底部面板'
  */
  dragHandleLabel?: string;
  /**
  * 展开的 modal 状态下拖动把手的可访问名称。
  *
  * @type {string}
  * @default '关闭底部面板'
  */
  expandedDragHandleLabel?: string;
  /**
  * 是否允许通过把手向上展开，以及向下折叠或关闭。
  *
  * @type {boolean}
  * @default true
  */
  draggable?: boolean;
  /**
  * 是否显示内置关闭按钮。
  *
  * @type {boolean}
  * @default false
  */
  closable?: boolean;
  /**
  * 内置关闭按钮的非空可访问名称。
  *
  * @type {string}
  * @default '关闭'
  */
  closeLabel?: string;
  /**
  * 简单标题；设置后优先于 title Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  title?: string | undefined;
  /**
  * 简单正文；设置后优先于默认 Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  content?: string | undefined;
}

export interface MatBottomSheetEmits {
  /**
  * 请求关闭时发出 false。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 通过把手请求切换预设高度时发出。
  */
  "update:expanded": (payload: unknown) => unknown;
  /**
  * 进入动画完成后触发。
  */
  "opened": (payload: unknown) => unknown;
  /**
  * 退出动画和 DOM 清理完成后触发。
  */
  "closed": (payload: unknown) => unknown;
}

export type MatBottomSheetComponent = DefineComponent<MatBottomSheetProps, {}, {}, {}, {}, {}, {}, MatBottomSheetEmits>;
export declare const MatBottomSheet: MatBottomSheetComponent;

export interface MatSideSheetProps {
  /**
  * 受控打开状态，可使用 v-model。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 布局变体；auto 在窄于 breakpoint 时使用 modal，否则使用 standard。
  *
  * @type {'auto'|'standard'|'modal'}
  * @default 'auto'
  */
  variant?: 'auto'|'standard'|'modal';
  /**
  * auto 变体切换为 standard 的最小视口宽度，单位为 CSS px。
  *
  * @type {number}
  * @default 840
  */
  breakpoint?: number;
  /**
  * Sheet 所依附的逻辑边缘。
  *
  * @type {'start'|'end'}
  * @default 'end'
  */
  position?: 'start'|'end';
  /**
  * 首选宽度；数字与纯数字字符串按 px 处理（不超过 400），
  * 其他字符串 trim 后须为合法 CSS 宽度值。
  *
  * @type {number | string}
  * @default 400
  */
  width?: number | string;
  /**
  * modal 的 Teleport 目标；字符串按当前 document 的 CSS 选择器解析。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * modal 是否显示顶层帷幕。
  *
  * @type {boolean}
  * @default true
  */
  scrim?: boolean;
  /**
  * 点击 modal 帷幕时是否请求关闭。
  *
  * @type {boolean}
  * @default true
  */
  closeOnBack?: boolean;
  /**
  * 是否允许在触摸设备上向依附边缘滑动关闭。
  *
  * @type {boolean}
  * @default true
  */
  draggable?: boolean;
  /**
  * 是否显示内置关闭按钮。
  *
  * @type {boolean}
  * @default true
  */
  closable?: boolean;
  /**
  * 内置关闭按钮的非空可访问名称。
  *
  * @type {string}
  * @default '关闭'
  */
  closeLabel?: string;
  /**
  * 简单标题；设置后优先于 title Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  title?: string | undefined;
  /**
  * 简单正文；设置后优先于默认 Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  content?: string | undefined;
}

export interface MatSideSheetEmits {
  /**
  * 请求关闭时发出 false。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 进入动画完成后触发。
  */
  "opened": (payload: unknown) => unknown;
  /**
  * 退出动画和 DOM 清理完成后触发。
  */
  "closed": (payload: unknown) => unknown;
}

export type MatSideSheetComponent = DefineComponent<MatSideSheetProps, {}, {}, {}, {}, {}, {}, MatSideSheetEmits>;
export declare const MatSideSheet: MatSideSheetComponent;

export interface MatHoverProps {
  /**
  * 禁止自动 hover 状态变化。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
  /**
  * 受控 hover 状态；省略时由组件自动维护。
  *
  * @type {boolean | null}
  * @default null
  */
  modelValue?: boolean | null;
  /**
  * 关闭延迟，单位为毫秒；数字或纯数字字符串，非法值触发校验警告并按 0 处理。
  *
  * @type {number | string}
  * @default 0
  */
  closeDelay?: number | string;
  /**
  * 打开延迟，单位为毫秒；数字或纯数字字符串，非法值触发校验警告并按 0 处理。
  *
  * @type {number | string}
  * @default 0
  */
  openDelay?: number | string;
  /**
  * 直接绑定 hover 监听的元素选择器或 HTMLElement。
  *
  * @type {string | HTMLElement | undefined}
  * @default undefined
  */
  target?: string | HTMLElement | undefined;
}

export interface MatHoverEmits {
  /**
  * hover 状态变化时发出新的 boolean。
  */
  "update:modelValue": (payload: boolean) => unknown;
}

export type MatHoverComponent = DefineComponent<MatHoverProps, {}, {}, {}, {}, {}, {}, MatHoverEmits>;
export declare const MatHover: MatHoverComponent;

export interface MatContainerProps {
  /**
  * 是否取消正文区域的最大宽度限制。
  *
  * @type {boolean}
  * @default false
  */
  fluid?: boolean;
}

export type MatContainerComponent = DefineComponent<MatContainerProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatContainer: MatContainerComponent;

export interface MatSpacerProps {
}

export type MatSpacerComponent = DefineComponent<MatSpacerProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatSpacer: MatSpacerComponent;

export interface MatScrollAreaProps {
  /**
  * 滚动方向；`y`、`v` 是 `vertical` 的别名，`x`、`h` 是 `horizontal` 的别名。
  *
  * @type {'vertical' | 'y' | 'v' | 'horizontal' | 'x' | 'h'}
  * @default 'vertical'
  */
  orientation?: 'vertical' | 'y' | 'v' | 'horizontal' | 'x' | 'h';
  /**
  * 滚动停靠强度；`none` 关闭停靠，其他值映射到当前滚动轴。
  *
  * @type {'none' | 'proximity' | 'mandatory'}
  * @default 'none'
  */
  snap?: 'none' | 'proximity' | 'mandatory';
  /**
  * 当前滚动轴起始端和末端的滚动停靠内边距，单位为 px。
  *
  * @type {number}
  * @default 0
  */
  snapPadding?: number;
  /**
  * 阴影从对应边缘向内延伸的像素数。数字或纯数字字符串同时用于两端，
  * 对象可分别设置 start、end。未设置时使用 16px。
  *
  * @type {number | { start?: number, end?: number }}
  * @default 16
  */
  shadowLength?: number | { start?: number, end?: number };
  /**
  * 原生滚动条宽度；`default` 使用浏览器默认值，`thin` 使用窄滚动条，`hidden` 隐藏滚动条。
  *
  * @type {'default' | 'thin' | 'hidden'}
  * @default 'thin'
  */
  barWidth?: 'default' | 'thin' | 'hidden';
  /**
  * 横向模式下允许使用鼠标主键或触控笔按住拖拽滚动。
  *
  * @type {boolean}
  * @default false
  */
  dragScroll?: boolean;
  /**
  * 进入滚动边缘多少像素时触发事件。数字或纯数字字符串同时用于两端，
  * 对象成员同样接受，可分别设置 start、end。
  *
  * @type {number | { start?: number, end?: number }}
  * @default 0
  */
  reachThreshold?: number | { start?: number, end?: number };
  /**
  * 边缘阴影带从对应边缘向内偏移的像素数。数字或纯数字字符串同时用于两端，
  * 对象可分别设置 start、end。偏移区内的内容不会被遮罩覆盖，适合放置不透明的 sticky 元素。
  *
  * @type {number | { start?: number, end?: number }}
  * @default 0
  */
  shadowOffset?: number | { start?: number, end?: number };
}

export interface MatScrollAreaEmits {
  /**
  * 滚动进入起始边缘阈值时触发；载荷包含当前距离和滚动元素。
  *
  * @type {{ distance: number, target: HTMLElement }}
  */
  "reach-start": (payload: { distance: number, target: HTMLElement }) => unknown;
  /**
  * 滚动进入末端边缘阈值时触发；载荷包含当前距离和滚动元素。
  *
  * @type {{ distance: number, target: HTMLElement }}
  */
  "reach-end": (payload: { distance: number, target: HTMLElement }) => unknown;
}

export interface MatScrollAreaExposed {
  /**
 * 获取组件拥有的原生滚动元素。
 *
 * @returns {HTMLElement | null}
 */
  getScroller(): HTMLElement | null;
  /**
 * 滚动组件拥有的原生滚动元素。挂载前调用时不执行操作。
 *
 * @param {ScrollToOptions} options
 * @returns {void}
 */
  scrollTo(options: ScrollToOptions): void;
}

export type MatScrollAreaComponent = DefineComponent<MatScrollAreaProps, MatScrollAreaExposed, {}, {}, {}, {}, {}, MatScrollAreaEmits>;
export declare const MatScrollArea: MatScrollAreaComponent;

export interface MatLoaderProps {
  /**
  * 加载器形态；可选值为 `linear`、`circular`。
  *
  * @type {'linear' | 'circular'}
  * @default 'linear'
  */
  variant?: 'linear' | 'circular';
  /**
  * 当前确定进度值；会限制在 0 与 max 之间。
  *
  * @type {number}
  * @default 0
  */
  value?: number;
  /**
  * 确定进度的最大值。
  *
  * @type {number}
  * @default 1
  */
  max?: number;
  /**
  * 是否显示不确定进度动画。
  *
  * @type {boolean}
  * @default false
  */
  indeterminate?: boolean;
  /**
  * 轨道厚度，必须为正数；非法值回退默认 4。
  *
  * @type {number}
  * @default 4
  */
  thickness?: number;
  /**
  * 轨道形状；可选值为 `flat`、`wavy`。
  *
  * @type {'flat' | 'wavy'}
  * @default 'flat'
  */
  shape?: 'flat' | 'wavy';
  /**
  * 是否让 wavy 形状持续运动。
  *
  * @type {boolean}
  * @default false
  */
  waveMotion?: boolean;
  /**
  * 语义色或六位十六进制种子色 `#RRGGBB`。
  *
  * @type {string | undefined}
  * @default undefined
  */
  color?: string | undefined;
}

export type MatLoaderComponent = DefineComponent<MatLoaderProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatLoader: MatLoaderComponent;

export interface MatTooltipProps {
  /**
  * 显式传入时启用受控模式，可使用 v-model。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 简短纯文本内容；存在时优先于默认 Slot。
  *
  * @type {string | undefined}
  * @default undefined
  */
  content?: string | undefined;
  /**
  * 展示元素的选择器或 HTMLElement。
  *
  * @type {string | HTMLElement | undefined}
  * @default undefined
  */
  target?: string | HTMLElement | undefined;
  /**
  * Teleport 目标；字符串按当前 document 的 CSS 选择器解析。省略时优先使用展示元素所在的已打开 dialog 或 Popover，
  * 找不到时使用 body。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * 相对展示元素的首选位置。
  *
  * 可选值为 `top`、`right`、`bottom`、`left` 及其 `-start`、`-end` 形式。
  *
  * @type {string}
  * @default 'top'
  */
  location?: string;
  /**
  * 自动模式的打开延迟，单位为毫秒；无效值按 0 处理。
  *
  * 省略时继承 createMatUi() 的 tooltip.openDelay，未安装插件时为 0。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  openDelay?: number | string | undefined;
}

export interface MatTooltipEmits {
  /**
  * 受控模式请求关闭时发出 false。
  */
  "update:modelValue": (payload: unknown) => unknown;
}

export type MatTooltipComponent = DefineComponent<MatTooltipProps, {}, {}, {}, {}, {}, {}, MatTooltipEmits>;
export declare const MatTooltip: MatTooltipComponent;

export interface MatSnackbarProps {
  /**
  * 受控展示状态，可使用 v-model。
  *
  * @type {boolean}
  * @default false
  */
  modelValue?: boolean;
  /**
  * 简短纯文本内容；默认 Slot 存在时由 Slot 优先提供。
  *
  * @type {string | undefined}
  * @default undefined
  */
  text?: string | undefined;
  /**
  * 文字 action 内容，必须为非空字符串。
  *
  * @type {string | undefined}
  * @default undefined
  */
  actionText?: string | undefined;
  /**
  * 是否显示内置关闭按钮。
  *
  * @type {boolean}
  * @default false
  */
  closable?: boolean;
  /**
  * 内置关闭按钮的非空可访问名称。
  *
  * @type {string}
  * @default '关闭'
  */
  closeLabel?: string;
  /**
  * Snackbar 水平位置；可选值为 `left`、`center`、`right`。
  *
  * @type {'left' | 'center' | 'right'}
  * @default 'center'
  */
  position?: 'left' | 'center' | 'right';
  /**
  * 自动关闭时长，单位为毫秒；0 表示常驻。
  *
  * @type {number}
  * @default 4000
  */
  duration?: number;
}

export interface MatSnackbarEmits {
  /**
  * action 控件被激活时触发。
  */
  "action": (payload: unknown) => unknown;
  /**
  * Snackbar 请求关闭时发出 false。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * 退出动画和清理完成后触发。
  */
  "closed": (payload: unknown) => unknown;
}

export type MatSnackbarComponent = DefineComponent<MatSnackbarProps, {}, {}, {}, {}, {}, {}, MatSnackbarEmits>;
export declare const MatSnackbar: MatSnackbarComponent;

export interface MatToolbarProps {
  /**
  * 控制 Toolbar 是否显示，可使用 v-model。
  *
  * @type {boolean}
  * @default true
  */
  modelValue?: boolean;
  /**
  * Toolbar 形态。
  *
  * 可选值为 `docked`、`floating`、`floating-top`、`floating-bottom`、
  * `floating-left`、`floating-right`。
  *
  * @type {'docked' | 'floating' | 'floating-top' | 'floating-bottom' | 'floating-left' | 'floating-right'}
  * @default 'docked'
  */
  variant?: 'docked' | 'floating' | 'floating-top' | 'floating-bottom' | 'floating-left' | 'floating-right';
  /**
  * 浮动模式的对齐位置。
  *
  * 可选值为 `start`、`center`、`end`。
  *
  * @type {'start' | 'center' | 'end'}
  * @default 'center'
  */
  position?: 'start' | 'center' | 'end';
  /**
  * 使用高强调的 primary container 配色。
  *
  * @type {boolean}
  * @default false
  */
  vibrant?: boolean;
  /**
  * 是否将 Toolbar Teleport 到 attach 并固定到视口。
  *
  * @type {boolean}
  * @default false
  */
  app?: boolean;
  /**
  * app=true 时的 Teleport 目标；可传选择器或 HTMLElement。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * 是否在声明位置生成占位。
  *
  * @type {boolean}
  * @default false
  */
  placeholder?: boolean;
  /**
  * docked 与 floating-bottom 的额外底部安全区；数字与纯数字字符串按 px 处理，
  * 其他字符串 trim 后须为合法 CSS block-size 值，非法时回退 0。
  *
  * @type {number | string}
  * @default 0
  */
  bottomPlaceholder?: number | string;
}

export interface MatToolbarEmits {
  /**
  * Toolbar 显示状态请求变化时发出新的 boolean。
  */
  "update:modelValue": (payload: boolean) => unknown;
}

export type MatToolbarComponent = DefineComponent<MatToolbarProps, {}, {}, {}, {}, {}, {}, MatToolbarEmits>;
export declare const MatToolbar: MatToolbarComponent;

export interface MatPanesProps {
  /**
  * 受控 Pane 权重映射，键为 MatPane.id，值为非负有限数字。
  *
  * @type {Record<string, number>}
  * @required
  */
  sizes: Record<string, number>;
  /**
  * 是否允许通过分隔控件调整 Pane 权重。
  *
  * @type {boolean}
  * @default true
  */
  resizable?: boolean;
}

export interface MatPanesEmits {
  /**
  * 拖动或键盘调整提交后发出新的权重映射。
  */
  "update:sizes": (payload: unknown) => unknown;
  /**
  * 实际 Pane 宽度稳定后发出取整像素宽度映射。
  */
  "update:widths": (payload: unknown) => unknown;
  /**
  * 视口跨越响应式断点时发出断点名称。
  */
  "update:breakpoint": (payload: unknown) => unknown;
}

export type MatPanesComponent = DefineComponent<MatPanesProps, {}, {}, {}, {}, {}, {}, MatPanesEmits>;
export declare const MatPanes: MatPanesComponent;

export interface MatPaneProps {
  /**
  * 当前实例中的唯一稳定键，同时对应 sizes 的键和根 DOM id。
  *
  * @type {string}
  * @required
  */
  id: string;
  /**
  * 后方可访问分隔控件的名称。
  *
  * @type {string | undefined}
  * @default undefined
  */
  resizeLabel?: string | undefined;
}

export type MatPaneComponent = DefineComponent<MatPaneProps, {}, {}, {}, {}, {}, {}, {}>;
export declare const MatPane: MatPaneComponent;

export interface MatNavigationRailProps {
  /**
  * 导航方向；可选值为 `vertical`、`horizontal`。
  *
  * @type {'vertical' | 'horizontal'}
  * @default 'vertical'
  */
  orientation?: 'vertical' | 'horizontal';
  /**
  * 受控当前目的地值。
  *
  * @type {string | number | boolean | null}
  * @default null
  */
  modelValue?: string | number | boolean | null;
  /**
  * 是否展开纵向 Rail。
  *
  * @type {boolean}
  * @default false
  */
  expanded?: boolean;
  /**
  * expanded Rail 的宽度；数字与纯数字字符串按 px 处理，
  * 其他字符串 trim 后须为合法 CSS 宽度值，非法时使用默认宽度。
  *
  * @type {number | string | undefined}
  * @default undefined
  */
  width?: number | string | undefined;
  /**
  * 应用模式的固定侧；可选值为 `start`、`end`。
  *
  * @type {'start' | 'end'}
  * @default 'start'
  */
  position?: 'start' | 'end';
  /**
  * 是否允许通过内部菜单入口切换展开状态。
  *
  * @type {boolean}
  * @default false
  */
  collapsible?: boolean;
  /**
  * 纵向 Rail 布局；可选值为 `standard`、`modal`。
  *
  * @type {'standard' | 'modal'}
  * @default 'standard'
  */
  layout?: 'standard' | 'modal';
  /**
  * collapsed 时是否隐藏 Rail。
  *
  * @type {boolean}
  * @default false
  */
  hideOnCollapse?: boolean;
  /**
  * Item 对齐方式；可选值为 `top`、`center`。
  *
  * @type {'top' | 'center'}
  * @default 'top'
  */
  alignment?: 'top' | 'center';
  /**
  * 收起状态菜单入口的 Material Symbols 图标。
  *
  * @type {string}
  * @default 'menu'
  */
  openIcon?: string;
  /**
  * 展开状态菜单入口的 Material Symbols 图标。
  *
  * @type {string}
  * @default 'menu_open'
  */
  closeIcon?: string;
  /**
  * 收起状态菜单入口的非空可访问名称。
  *
  * @type {string}
  * @default '展开导航'
  */
  openLabel?: string;
  /**
  * 展开状态菜单入口的非空可访问名称。
  *
  * @type {string}
  * @default '收起导航'
  */
  closeLabel?: string;
  /**
  * 是否 Teleport 到 attach 并固定到视口。
  *
  * @type {boolean}
  * @default false
  */
  app?: boolean;
  /**
  * app=true 时的固定挂载目标。
  *
  * @type {string | HTMLElement}
  * @default 'body'
  */
  attach?: string | HTMLElement;
  /**
  * app=true 时在自然布局位置生成占位。
  *
  * @type {boolean}
  * @default false
  */
  placeholder?: boolean;
  /**
  * app=true 时的额外底部安全区；数字与纯数字字符串按 px 处理，
  * 其他字符串 trim 后须为合法 CSS block-size 值，非法时回退 0。
  *
  * @type {number | string}
  * @default 0
  */
  bottomPlaceholder?: number | string;
}

export interface MatNavigationRailEmits {
  /**
  * 子 Item 请求切换目的地时发出新的 value。
  */
  "update:modelValue": (payload: unknown) => unknown;
  /**
  * Rail 请求切换展开状态时发出新的 boolean。
  */
  "update:expanded": (payload: boolean) => unknown;
}

export type MatNavigationRailComponent = DefineComponent<MatNavigationRailProps, {}, {}, {}, {}, {}, {}, MatNavigationRailEmits>;
export declare const MatNavigationRail: MatNavigationRailComponent;

export interface MatNavigationRailItemProps {
  /**
  * 当前导航目的地的稳定值。
  *
  * @type {string | number | boolean | undefined}
  * @default undefined
  */
  value?: string | number | boolean | undefined;
  /**
  * Material Symbols 图标文本。
  *
  * @type {string | undefined}
  * @default undefined
  */
  icon?: string | undefined;
  /**
  * 设置后渲染原生链接。
  *
  * @type {string | undefined}
  * @default undefined
  */
  href?: string | undefined;
  /**
  * 禁止导航交互。
  *
  * @type {boolean}
  * @default false
  */
  disabled?: boolean;
}

export interface MatNavigationRailItemEmits {
  /**
  * 启用的导航项被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
  */
  "click": (payload: MouseEvent) => unknown;
}

export type MatNavigationRailItemComponent = DefineComponent<MatNavigationRailItemProps, {}, {}, {}, {}, {}, {}, MatNavigationRailItemEmits>;
export declare const MatNavigationRailItem: MatNavigationRailItemComponent;

export type MatThemeMode = 'light' | 'dark' | 'system';
export type MatResolvedThemeMode = 'light' | 'dark';
export type MatSchemeVariant = 'tonal-spot' | 'neutral' | 'vibrant' | 'expressive';
export interface MatThemeOptions {
  mode?: MatThemeMode;
  seedColor?: string;
  schemeVariant?: MatSchemeVariant;
  contrastLevel?: number;
  target?: HTMLElement;
}
export interface MatThemeController {
  mode: Readonly<import('vue').Ref<MatThemeMode>>;
  resolvedMode: Readonly<import('vue').Ref<MatResolvedThemeMode>>;
  seedColor: Readonly<import('vue').Ref<string>>;
  schemeVariant: Readonly<import('vue').Ref<MatSchemeVariant>>;
  contrastLevel: Readonly<import('vue').Ref<number>>;
  target: HTMLElement;
  setMode(value: MatThemeMode): void;
  setSeedColor(value: string): void;
  setSchemeVariant(value: MatSchemeVariant): void;
  setContrastLevel(value: number): void;
  dispose(): void;
}
export interface MatUiOptions {
  theme?: MatThemeOptions;
  iconClass?: string;
  tooltip?: { openDelay?: number; skipDelayDuration?: number };
  useCursor?: boolean;
}
export declare function createMatUi(options?: MatUiOptions): import('vue').Plugin & { theme: MatThemeController };
export declare function useMatTheme(): MatThemeController;
export type MatAppEdge = 'top' | 'bottom' | 'start' | 'end';
export type MatAppBreakpoint = 'compact' | 'medium' | 'expanded' | 'large' | 'extra-large';
export interface MatAppEdgeInsets {
  readonly start: number;
  readonly end: number;
}
export interface MatAppEdgeInfo {
  readonly size: number;
  readonly startInset: number;
  readonly endInset: number;
}
export interface MatAppLayout {
  readonly size: Readonly<{ width: number; height: number }>;
  readonly padding: Readonly<{ top: number; bottom: number; start: number; end: number }>;
  readonly content: Readonly<{ width: number; height: number }>;
  readonly breakpoint: MatAppBreakpoint;
  readonly breakpointRange: Readonly<{ min: number; max: number }>;
  readonly edges: Readonly<Record<MatAppEdge, MatAppEdgeInfo>>;
}
export interface MatAppEdgeRegistration {
  readonly insets: Readonly<MatAppEdgeInsets>;
  update(): void;
  unregister(): void;
}
export interface MatAppContext {
  readonly layout: Readonly<MatAppLayout>;
  registerEdge(options: { edge: MatAppEdge; element: HTMLElement }): MatAppEdgeRegistration;
}
export declare function useMatApp(): MatAppContext;
export declare const Intersection: import('vue').ObjectDirective<HTMLElement>;

export type DialogActionVariant = 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'standard' | 'text';
export interface DialogAction<T = unknown> {
  text: string;
  value?: T;
  variant?: DialogActionVariant;
  color?: string;
  disabled?: boolean;
}
export interface DialogOptions<T = unknown> {
  attach?: string | HTMLElement;
  fullScreen?: boolean;
  width?: number | string;
  scrim?: boolean;
  closeOnBack?: boolean;
  title?: string;
  content?: string;
  icon?: string;
  closeLabel?: string;
  color?: string;
  ariaLabel?: string;
  actions?: DialogAction<T>[];
}
export declare function dialog<T = unknown>(options?: DialogOptions<T>): Promise<T | undefined>;
export declare function alert(options?: Omit<DialogOptions<void>, 'actions'> & { confirmText?: string }): Promise<void>;
export declare function confirm(options?: Omit<DialogOptions<boolean>, 'actions'> & { confirmText?: string; cancelText?: string }): Promise<boolean>;
export declare function prompt(options?: Omit<DialogOptions<string | null>, 'actions'> & { confirmText?: string; cancelText?: string; defaultValue?: string; label?: string; placeholder?: string; required?: boolean }): Promise<string | null>;
export interface SnackbarOptions {
  text: string;
  actionText?: string;
  onAction?: () => void;
  closable?: boolean;
  closeLabel?: string;
  position?: 'left' | 'center' | 'right';
  duration?: number;
}
export declare function snackbar(options: SnackbarOptions): Promise<void>;
export declare const toast: typeof snackbar;

declare module 'vue' {
  export interface GlobalComponents {
    MatBtn: typeof MatBtn;
    'mat-btn': typeof MatBtn;
    MatAppRoot: typeof MatAppRoot;
    'mat-app-root': typeof MatAppRoot;
    MatAppBar: typeof MatAppBar;
    'mat-app-bar': typeof MatAppBar;
    MatSearch: typeof MatSearch;
    'mat-search': typeof MatSearch;
    MatBtnGroup: typeof MatBtnGroup;
    'mat-btn-group': typeof MatBtnGroup;
    MatFab: typeof MatFab;
    'mat-fab': typeof MatFab;
    MatIcon: typeof MatIcon;
    'mat-icon': typeof MatIcon;
    MatImage: typeof MatImage;
    'mat-image': typeof MatImage;
    MatText: typeof MatText;
    'mat-text': typeof MatText;
    MatSplitBtn: typeof MatSplitBtn;
    'mat-split-btn': typeof MatSplitBtn;
    MatCard: typeof MatCard;
    'mat-card': typeof MatCard;
    MatCardActionArea: typeof MatCardActionArea;
    'mat-card-action-area': typeof MatCardActionArea;
    MatCardContent: typeof MatCardContent;
    'mat-card-content': typeof MatCardContent;
    MatCardActions: typeof MatCardActions;
    'mat-card-actions': typeof MatCardActions;
    MatCardHeadline: typeof MatCardHeadline;
    'mat-card-headline': typeof MatCardHeadline;
    MatCardSubhead: typeof MatCardSubhead;
    'mat-card-subhead': typeof MatCardSubhead;
    MatCardMedia: typeof MatCardMedia;
    'mat-card-media': typeof MatCardMedia;
    MatList: typeof MatList;
    'mat-list': typeof MatList;
    MatListGroup: typeof MatListGroup;
    'mat-list-group': typeof MatListGroup;
    MatListItem: typeof MatListItem;
    'mat-list-item': typeof MatListItem;
    MatDivider: typeof MatDivider;
    'mat-divider': typeof MatDivider;
    MatCheckbox: typeof MatCheckbox;
    'mat-checkbox': typeof MatCheckbox;
    MatChip: typeof MatChip;
    'mat-chip': typeof MatChip;
    MatChipSet: typeof MatChipSet;
    'mat-chip-set': typeof MatChipSet;
    MatRadio: typeof MatRadio;
    'mat-radio': typeof MatRadio;
    MatRadioGroup: typeof MatRadioGroup;
    'mat-radio-group': typeof MatRadioGroup;
    MatSwitch: typeof MatSwitch;
    'mat-switch': typeof MatSwitch;
    MatSlider: typeof MatSlider;
    'mat-slider': typeof MatSlider;
    MatRangeSlider: typeof MatRangeSlider;
    'mat-range-slider': typeof MatRangeSlider;
    MatTextField: typeof MatTextField;
    'mat-text-field': typeof MatTextField;
    MatTextarea: typeof MatTextarea;
    'mat-textarea': typeof MatTextarea;
    MatInputBase: typeof MatInputBase;
    'mat-input-base': typeof MatInputBase;
    MatMenu: typeof MatMenu;
    'mat-menu': typeof MatMenu;
    MatMenuGroup: typeof MatMenuGroup;
    'mat-menu-group': typeof MatMenuGroup;
    MatMenuItem: typeof MatMenuItem;
    'mat-menu-item': typeof MatMenuItem;
    MatDialog: typeof MatDialog;
    'mat-dialog': typeof MatDialog;
    MatBottomSheet: typeof MatBottomSheet;
    'mat-bottom-sheet': typeof MatBottomSheet;
    MatSideSheet: typeof MatSideSheet;
    'mat-side-sheet': typeof MatSideSheet;
    MatHover: typeof MatHover;
    'mat-hover': typeof MatHover;
    MatContainer: typeof MatContainer;
    'mat-container': typeof MatContainer;
    MatSpacer: typeof MatSpacer;
    'mat-spacer': typeof MatSpacer;
    MatScrollArea: typeof MatScrollArea;
    'mat-scroll-area': typeof MatScrollArea;
    MatLoader: typeof MatLoader;
    'mat-loader': typeof MatLoader;
    MatTooltip: typeof MatTooltip;
    'mat-tooltip': typeof MatTooltip;
    MatSnackbar: typeof MatSnackbar;
    'mat-snackbar': typeof MatSnackbar;
    MatToolbar: typeof MatToolbar;
    'mat-toolbar': typeof MatToolbar;
    MatPanes: typeof MatPanes;
    'mat-panes': typeof MatPanes;
    MatPane: typeof MatPane;
    'mat-pane': typeof MatPane;
    MatNavigationRail: typeof MatNavigationRail;
    'mat-navigation-rail': typeof MatNavigationRail;
    MatNavigationRailItem: typeof MatNavigationRailItem;
    'mat-navigation-rail-item': typeof MatNavigationRailItem;
  }
}
