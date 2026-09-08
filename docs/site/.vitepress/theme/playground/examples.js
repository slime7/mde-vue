const rawExampleModules = import.meta.glob('../../../examples/**/*.vue', {
  query: '?raw',
  import: 'default',
});

const COMPONENT_TITLES = {
  'app-bar': 'App bar 应用栏',
  'app-root': 'App root 应用布局根',
  aside: 'Aside 边缘栏',
  avatar: 'Avatar 头像',
  badge: 'Badge 徽标',
  'bottom-sheet': 'Bottom sheet 底部面板',
  button: 'Button 按钮',
  'button-group': 'Button group 按钮组',
  card: 'Card 卡片',
  checkbox: 'Checkbox 复选框',
  chip: 'Chips 标签',
  container: 'Container 容器',
  dialog: 'Dialog 对话框',
  divider: 'Divider 分隔线',
  'docked-container': 'Docked container 浮动容器',
  'dynamic-text': 'Dynamic text 动态文字',
  expansion: 'Expansion 折叠面板',
  fab: 'FAB 浮动操作按钮',
  'fab-menu': 'FAB Menu 浮动操作菜单',
  hover: 'Hover 悬停状态',
  icon: 'Icon 图标',
  image: 'Image 图片',
  'input-base': 'Input base 输入基础层',
  intersection: 'Intersection 相交观察',
  layout: 'Layout 布局容器',
  list: 'List 列表',
  loading: 'Loading 加载指示器',
  menu: 'Menu 菜单',
  'navigation-bar': 'Navigation bar 底部导航栏',
  'navigation-drawer': 'Navigation drawer 导航抽屉',
  'navigation-rail': 'Navigation rail 导航栏',
  panes: 'Panes 布局面板',
  progress: 'Progress 进度',
  'pull-to-refresh': 'PullToRefresh 下拉刷新',
  radio: 'Radio 单选按钮',
  'range-slider': 'Range slider 范围滑块',
  'scroll-area': 'Scroll area 滚动区域',
  search: 'Search 搜索',
  select: 'Select 选择器',
  selection: 'Selection 选择',
  shape: 'Shape 形状',
  'shared-element': 'Shared Element 同元素转移',
  'side-sheet': 'Side sheet 侧边面板',
  slider: 'Slider 滑块',
  snackbar: 'Snackbar 消息提示',
  spacer: 'Spacer 弹性占位',
  'split-button': 'Split button 拆分按钮',
  'state-layer': 'State layer 状态层',
  switch: 'Switch 开关',
  'table-wrapper': 'Table wrapper 表格容器',
  text: 'Text 文字',
  'text-field': 'Text field 文本输入',
  toolbar: 'Toolbar 工具栏',
  tooltip: 'Tooltip 文字提示',
  'virtual-scroll': 'Virtual scroll 虚拟滚动',
};

/**
 * 过滤掉示例代码中的 VitePress 区域标记注释
 *
 * @param {string} rawCode
 * @returns {string}
 */
export function cleanExampleCode(rawCode) {
  if (!rawCode) {
    return '';
  }
  return rawCode
    .replace(/<!--\s*#region[^\n]*-->\r?\n?/g, '')
    .replace(/<!--\s*#endregion[^\n]*-->\r?\n?/g, '')
    .trim();
}

/**
 * 构建组件分类列表与各组件下的示例文件清单
 */
const componentMap = new Map();
const exampleLoaders = new Map();

Object.entries(rawExampleModules).forEach(([path, loader]) => {
  const normalizedPath = path.replaceAll('\\', '/');
  const match = normalizedPath.match(/\/examples\/([^/]+)\/([^/]+)\.vue$/);
  if (match) {
    const [, componentKey, exampleName] = match;
    const key = `${componentKey}/${exampleName}`;
    exampleLoaders.set(key, loader);

    if (!componentMap.has(componentKey)) {
      componentMap.set(componentKey, {
        key: componentKey,
        label: COMPONENT_TITLES[componentKey] || componentKey,
        examples: [],
      });
    }
    componentMap.get(componentKey).examples.push({
      key,
      name: exampleName,
      componentKey,
    });
  }
});

export const componentList = Array.from(componentMap.values()).sort((a, b) => (
  a.label.localeCompare(b.label, 'zh-CN')
));

export const DEFAULT_EXAMPLE_KEY = 'button/ButtonVariantExample';

/**
 * 异步加载指定示例的源代码
 *
 * @param {string} key - 如 'button/ButtonVariantExample'
 * @returns {Promise<string>}
 */
export async function loadExampleSource(key) {
  const loader = exampleLoaders.get(key) || exampleLoaders.get(DEFAULT_EXAMPLE_KEY);
  if (!loader) {
    return '<template>\n  <mat-btn>Hello mde-vue</mat-btn>\n</template>';
  }
  const raw = await loader();
  return cleanExampleCode(raw);
}
