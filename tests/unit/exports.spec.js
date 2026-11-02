import { existsSync, readdirSync, readFileSync } from 'node:fs';
import {
  describe, expect, it, vi,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { createApp, nextTick } from 'vue';
import {
  alert,
  confirm,
  createMatUi,
  dialog,
  extractColorFromImage,
  prompt,
  Intersection as RootIntersection,
  MatAppRoot as RootMatAppRoot,
  MatAside as RootMatAside,
  MatAvatar as RootMatAvatar,
  MatBadge as RootMatBadge,
  MatBottomSheet as RootMatBottomSheet,
  MatBtn as RootMatBtn,
  MatBtnGroup as RootMatBtnGroup,
  MatCard as RootMatCard,
  MatCardActionArea as RootMatCardActionArea,
  MatCardActions as RootMatCardActions,
  MatCardContent as RootMatCardContent,
  MatCardHeadline as RootMatCardHeadline,
  MatCardMedia as RootMatCardMedia,
  MatCardSubhead as RootMatCardSubhead,
  MatChatMinimap as RootMatChatMinimap,
  MatCheckbox as RootMatCheckbox,
  MatChip as RootMatChip,
  MatChipSet as RootMatChipSet,
  MatContainer as RootMatContainer,
  MatDialog as RootMatDialog,
  MatDivider as RootMatDivider,
  MatDockedContainer as RootMatDockedContainer,
  MatDynamicText as RootMatDynamicText,
  MatExpansion as RootMatExpansion,
  MatExpansionPanel as RootMatExpansionPanel,
  MatFab as RootMatFab,
  MatFabMenu as RootMatFabMenu,
  MatHover as RootMatHover,
  MatIcon as RootMatIcon,
  MatImage as RootMatImage,
  MatInputBase as RootMatInputBase,
  MatLayout as RootMatLayout,
  MatList as RootMatList,
  MatListGroup as RootMatListGroup,
  MatListItem as RootMatListItem,
  MatLoading as RootMatLoading,
  MatMenu as RootMatMenu,
  MatMenuGroup as RootMatMenuGroup,
  MatMenuItem as RootMatMenuItem,
  MatNavigationDrawer as RootMatNavigationDrawer,
  MatNavigationGroup as RootMatNavigationGroup,
  MatNavigationRail as RootMatNavigationRail,
  MatNavigationRailItem as RootMatNavigationRailItem,
  MatNotification as RootMatNotification,
  MatPane as RootMatPane,
  MatPanes as RootMatPanes,
  MatProgress as RootMatProgress,
  MatRadio as RootMatRadio,
  MatRadioGroup as RootMatRadioGroup,
  MatRangeSlider as RootMatRangeSlider,
  MatScrollArea as RootMatScrollArea,
  MatSelect as RootMatSelect,
  MatShape as RootMatShape,
  MatSharedElement as RootMatSharedElement,
  MatSideSheet as RootMatSideSheet,
  MatSimpleExpansion as RootMatSimpleExpansion,
  MatSlider as RootMatSlider,
  MatSnackbar as RootMatSnackbar,
  MatSpacer as RootMatSpacer,
  MatSplitBtn as RootMatSplitBtn,
  MatSwitch as RootMatSwitch,
  MatText as RootMatText,
  MatTextarea as RootMatTextarea,
  MatTextField as RootMatTextField,
  MatToolbar as RootMatToolbar,
  MatTooltip as RootMatTooltip,
  MatVirtualScroll as RootMatVirtualScroll,
  MdeSharedElement as RootMdeSharedElement,
  MdeVirtualScroll as RootMdeVirtualScroll,
  Ripple as RootRipple,
  StateLayer as RootStateLayer,
  useLayout,
  useMatApp,
  useMatProps,
  useMatUi,
  useMatViewTransition,
  useMdeViewTransition,
} from 'mde-vue';
import COMPONENT_MANIFEST from '../../src/component-manifest';
import COMPONENT_ALIASES from '../../src/component-aliases';

const globalComponents = [
  ['MatAppRoot', 'mat-app-root', RootMatAppRoot],
  ['MatAvatar', 'mat-avatar', RootMatAvatar],
  ['MatBadge', 'mat-badge', RootMatBadge],
  ['MatBtn', 'mat-btn', RootMatBtn],
  ['MatBtnGroup', 'mat-btn-group', RootMatBtnGroup],
  ['MatFab', 'mat-fab', RootMatFab],
  ['MatFabMenu', 'mat-fab-menu', RootMatFabMenu],
  ['MatIcon', 'mat-icon', RootMatIcon],
  ['MatImage', 'mat-image', RootMatImage],
  ['MatSharedElement', 'mat-shared-element', RootMatSharedElement, ['MdeSharedElement', 'mde-shared-element']],
  ['MatShape', 'mat-shape', RootMatShape],
  ['MatSplitBtn', 'mat-split-btn', RootMatSplitBtn],
  ['MatCard', 'mat-card', RootMatCard],
  ['MatCardActionArea', 'mat-card-action-area', RootMatCardActionArea],
  ['MatCardContent', 'mat-card-content', RootMatCardContent],
  ['MatCardActions', 'mat-card-actions', RootMatCardActions],
  ['MatCardHeadline', 'mat-card-headline', RootMatCardHeadline],
  ['MatCardSubhead', 'mat-card-subhead', RootMatCardSubhead],
  ['MatCardMedia', 'mat-card-media', RootMatCardMedia],
  ['MatChatMinimap', 'mat-chat-minimap', RootMatChatMinimap],
  ['MatSimpleExpansion', 'mat-simple-expansion', RootMatSimpleExpansion],
  ['MatExpansion', 'mat-expansion', RootMatExpansion],
  ['MatExpansionPanel', 'mat-expansion-panel', RootMatExpansionPanel],
  ['MatList', 'mat-list', RootMatList],
  ['MatListGroup', 'mat-list-group', RootMatListGroup],
  ['MatListItem', 'mat-list-item', RootMatListItem],
  ['MatDivider', 'mat-divider', RootMatDivider],
  ['MatCheckbox', 'mat-checkbox', RootMatCheckbox],
  ['MatChip', 'mat-chip', RootMatChip],
  ['MatChipSet', 'mat-chip-set', RootMatChipSet],
  ['MatRadio', 'mat-radio', RootMatRadio],
  ['MatRadioGroup', 'mat-radio-group', RootMatRadioGroup],
  ['MatSwitch', 'mat-switch', RootMatSwitch],
  ['MatSlider', 'mat-slider', RootMatSlider],
  ['MatRangeSlider', 'mat-range-slider', RootMatRangeSlider],
  ['MatTextField', 'mat-text-field', RootMatTextField],
  ['MatSelect', 'mat-select', RootMatSelect],
  ['MatTextarea', 'mat-textarea', RootMatTextarea],
  ['MatText', 'mat-text', RootMatText],
  ['MatDynamicText', 'mat-dynamic-text', RootMatDynamicText, ['MdeDynamicText', 'mde-dynamic-text']],
  ['MatInputBase', 'mat-input-base', RootMatInputBase],
  ['MatMenu', 'mat-menu', RootMatMenu],
  ['MatMenuGroup', 'mat-menu-group', RootMatMenuGroup],
  ['MatMenuItem', 'mat-menu-item', RootMatMenuItem],
  ['MatDockedContainer', 'mat-docked-container', RootMatDockedContainer],
  ['MatDialog', 'mat-dialog', RootMatDialog],
  ['MatBottomSheet', 'mat-bottom-sheet', RootMatBottomSheet],
  ['MatSideSheet', 'mat-side-sheet', RootMatSideSheet],
  ['MatHover', 'mat-hover', RootMatHover],
  ['MatContainer', 'mat-container', RootMatContainer],
  ['MatLayout', 'mat-layout', RootMatLayout],
  ['MatAside', 'mat-aside', RootMatAside],
  ['MatSpacer', 'mat-spacer', RootMatSpacer],
  ['MatLoading', 'mat-loading', RootMatLoading],
  ['MatProgress', 'mat-progress', RootMatProgress],
  ['MatTooltip', 'mat-tooltip', RootMatTooltip],
  ['MatSnackbar', 'mat-snackbar', RootMatSnackbar],
  ['MatNotification', 'mat-notification', RootMatNotification],
  ['MatScrollArea', 'mat-scroll-area', RootMatScrollArea],
  ['MatToolbar', 'mat-toolbar', RootMatToolbar],
  ['MatPanes', 'mat-panes', RootMatPanes],
  ['MatPane', 'mat-pane', RootMatPane],
  ['MatNavigationRail', 'mat-navigation-rail', RootMatNavigationRail],
  ['MatNavigationRailItem', 'mat-navigation-rail-item', RootMatNavigationRailItem],
  ['MatNavigationDrawer', 'mat-navigation-drawer', RootMatNavigationDrawer],
  ['MatNavigationGroup', 'mat-navigation-group', RootMatNavigationGroup],
  ['MatVirtualScroll', 'mat-virtual-scroll', RootMatVirtualScroll, ['MdeVirtualScroll', 'mde-virtual-scroll']],
];

describe('公共组件导出', () => {
  it('导出同元素转移组件与 MDE 别名协调器', () => {
    expect(RootMdeSharedElement).toBe(RootMatSharedElement);
    expect(RootMdeVirtualScroll).toBe(RootMatVirtualScroll);
    expect(useMdeViewTransition).toBe(useMatViewTransition);
  });
  it('从根入口导出涟漪指令', () => {
    expect(RootRipple).toBeTruthy();
  });
  it('从根入口导出应用布局组件与组合函数', () => {
    expect(RootMatAppRoot).toBeTruthy();
    expect(useMatApp).toBeTypeOf('function');
    expect(useLayout).toBeTypeOf('function');
    expect(RootMatLayout).toBeTruthy();
    expect(RootMatAside).toBeTruthy();
    expect(useMatProps).toBeTypeOf('function');
    expect(useMatUi).toBeTypeOf('function');
  });

  it('根入口使用可由 Node/Vitest 直接解析的 plugin.js 路径', () => {
    const source = readFileSync('src/index.js', 'utf8');

    expect(source).toContain("from './plugin.js'");
    expect(source).not.toContain("from './plugin'");
  });

  it('单一 ESM 中的插件配置能被 Tooltip 读取', async () => {
    vi.useFakeTimers();
    const target = document.createElement('button');

    document.body.append(target);
    const wrapper = mount(RootMatTooltip, {
      attachTo: document.body,
      global: {
        plugins: [createMatUi({
          defaults: { tooltip: { openDelay: 1500 } },
        })],
      },
      props: {
        content: '分发入口延迟',
        target,
      },
    });

    await nextTick();
    target.dispatchEvent(new MouseEvent('mouseenter'));
    await nextTick();
    await vi.advanceTimersByTimeAsync(1499);
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await nextTick();
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('分发入口延迟');

    wrapper.unmount();
    target.remove();
    vi.useRealTimers();
  });

  it('createMatUi 安装主题、上下文和指令，但不注册组件', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({
      theme: { target },
    });
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-btn')).toBeUndefined();
    expect(app.component('MatBtn')).toBeUndefined();
    expect(app.component('mat-checkbox')).toBeUndefined();
    expect(app.directive('intersection')).toBe(RootIntersection);
    expect(app.directive('state-layer')).toBe(RootStateLayer);
    expect(app.directive('ripple')).toBe(RootRipple);

    plugin.theme.dispose();
  });

  it('组件元数据覆盖所有公共组件、标签和别名', () => {
    const manifestByName = new Map(COMPONENT_MANIFEST.map((entry) => [entry.name, entry]));
    const entrySource = readFileSync('src/index.js', 'utf8');
    const canonical = new Map();

    [...entrySource.matchAll(/export \{ default as (\w+) \} from '([^']+\.vue)'/g)]
      .forEach(([, name, componentPath]) => {
        if (!canonical.has(componentPath)) {
          canonical.set(componentPath, name);
        }
      });

    expect(COMPONENT_MANIFEST.map((entry) => entry.name).sort())
      .toEqual([...canonical.values()].sort());

    COMPONENT_MANIFEST.forEach((entry) => {
      expect(entry.tag).toBe(entry.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
      expect(entry.aliases).toEqual(COMPONENT_ALIASES[entry.name] ?? []);
    });

    globalComponents.forEach(([pascalName, kebabName, , aliasNames]) => {
      if (pascalName.startsWith('Mde')) {
        return;
      }

      expect(manifestByName.get(pascalName)?.tag).toBe(kebabName);
      expect(manifestByName.get(pascalName)?.aliases).toEqual(aliasNames ?? []);
    });
  });

  it('包入口类型声明包含组件类型且不再声明全局组件', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const declarationPath = 'dist/index.d.ts';

    expect(packageJson.types).toBe(`./${declarationPath}`);
    expect(packageJson.exports['.'].types).toBe(`./${declarationPath}`);
    expect(existsSync(declarationPath)).toBe(true);

    const declaration = readFileSync(declarationPath, 'utf8');

    COMPONENT_MANIFEST.forEach(({ name }) => {
      expect(declaration).toContain(`export declare const ${name}: ${name}Component;`);
    });
    expect(declaration).not.toContain('GlobalComponents');
    expect(declaration).toContain('export interface MatAppLayout');
    expect(declaration).toContain('export interface MatAppEdgeRegistration');
    expect(declaration).toContain('export declare function useMatApp(): MatAppContext;');
    expect(declaration).toContain("orientation?: 'vertical' | 'y' | 'v' | 'horizontal' | 'x' | 'h';");
    expect(declaration).toContain('"reach-start": (payload: { distance: number, target: HTMLElement }) => unknown;');
    expect(declaration).toContain('getScroller(): HTMLElement | null;');
    expect(declaration).toContain('scrollTo(options: ScrollToOptions): void;');
    expect(declaration).toContain('"click": (payload: { item: { id?: string | number, tooltip?: object }, index: number, originalEvent: MouseEvent }) => unknown;');
    expect(declaration).toContain('getInput(): HTMLInputElement | HTMLTextAreaElement | null;');
  });

  it('所有运行时出口只暴露构建后的 ESM 与 CSS', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const runtimeTargets = Object.values(packageJson.exports).flatMap((exportValue) => (
      typeof exportValue === 'string'
        ? [exportValue]
        : Object.entries(exportValue)
          .filter(([condition]) => condition !== 'types')
          .map(([, target]) => target)
    ));

    runtimeTargets.forEach((target) => {
      expect(target).toMatch(/^\.\/dist\//);
    });

    const javascriptFiles = readdirSync('dist', { recursive: true })
      .filter((file) => file.endsWith('.js'));

    expect(Object.keys(packageJson.exports)).toEqual(['.', './vite', './styles.css', './tailwind.css']);
    expect(packageJson.exports['.'].default).toBe(packageJson.exports['.'].import);
    expect(packageJson.exports['./vite'].default).toBe(packageJson.exports['./vite'].import);
    expect(packageJson.sideEffects).toEqual(['**/*.css']);
    expect(readdirSync('dist').sort()).toEqual([
      'index.d.ts',
      'mde-vue.js',
      'styles.css',
      'tailwind.css',
      'vite.d.ts',
      'vite.js',
    ]);
    expect(javascriptFiles.sort()).toEqual(['mde-vue.js', 'vite.js']);
    expect(readFileSync('dist/mde-vue.js', 'utf8')).not.toMatch(/from\s+['"][^'"]+\.vue['"]/);
    expect(readFileSync('dist/vite.js', 'utf8')).not.toMatch(/from\s+['"][^'"]+\.vue['"]/);
  });

  it('从唯一根入口导出命令式函数', () => {
    expect(dialog).toBeTypeOf('function');
    expect(alert).toBeTypeOf('function');
    expect(confirm).toBeTypeOf('function');
    expect(prompt).toBeTypeOf('function');
    expect(extractColorFromImage).toBeTypeOf('function');
  });

  it('不再提供 MatIconBtn 单组件入口', () => {
    expect(existsSync(new URL('../../src/components/mat-icon-btn', import.meta.url))).toBe(false);
  });

  it('统一提供 MatFab，不另设 MatExtendedFab 或 40px FAB 入口', () => {
    const source = readFileSync('src/index.js', 'utf8');

    expect(source).toContain('MatFab');
    expect(source).not.toContain('MatExtendedFab');
    expect(existsSync(new URL('../../src/components/mat-extended-fab', import.meta.url))).toBe(false);
  });
});
