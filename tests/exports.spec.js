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
  prompt,
  Intersection as RootIntersection,
  MatAppRoot as RootMatAppRoot,
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
  MatCheckbox as RootMatCheckbox,
  MatContainer as RootMatContainer,
  MatDialog as RootMatDialog,
  MatDivider as RootMatDivider,
  MatFab as RootMatFab,
  MatHover as RootMatHover,
  MatIcon as RootMatIcon,
  MatInputBase as RootMatInputBase,
  MatList as RootMatList,
  MatListGroup as RootMatListGroup,
  MatListItem as RootMatListItem,
  MatLoader as RootMatLoader,
  MatMenu as RootMatMenu,
  MatMenuGroup as RootMatMenuGroup,
  MatMenuItem as RootMatMenuItem,
  MatNavigationRail as RootMatNavigationRail,
  MatNavigationRailItem as RootMatNavigationRailItem,
  MatPane as RootMatPane,
  MatPanes as RootMatPanes,
  MatRadio as RootMatRadio,
  MatRadioGroup as RootMatRadioGroup,
  MatRangeSlider as RootMatRangeSlider,
  MatSideSheet as RootMatSideSheet,
  MatSlider as RootMatSlider,
  MatSnackbar as RootMatSnackbar,
  MatSpacer as RootMatSpacer,
  MatSplitBtn as RootMatSplitBtn,
  MatSwitch as RootMatSwitch,
  MatTextarea as RootMatTextarea,
  MatTextField as RootMatTextField,
  MatToolbar as RootMatToolbar,
  MatTooltip as RootMatTooltip,
  useMatApp,
} from 'mdu-ui';

const globalComponents = [
  ['MatAppRoot', 'mat-app-root', RootMatAppRoot],
  ['MatBtn', 'mat-btn', RootMatBtn],
  ['MatBtnGroup', 'mat-btn-group', RootMatBtnGroup],
  ['MatFab', 'mat-fab', RootMatFab],
  ['MatIcon', 'mat-icon', RootMatIcon],
  ['MatSplitBtn', 'mat-split-btn', RootMatSplitBtn],
  ['MatCard', 'mat-card', RootMatCard],
  ['MatCardActionArea', 'mat-card-action-area', RootMatCardActionArea],
  ['MatCardContent', 'mat-card-content', RootMatCardContent],
  ['MatCardActions', 'mat-card-actions', RootMatCardActions],
  ['MatCardHeadline', 'mat-card-headline', RootMatCardHeadline],
  ['MatCardSubhead', 'mat-card-subhead', RootMatCardSubhead],
  ['MatCardMedia', 'mat-card-media', RootMatCardMedia],
  ['MatList', 'mat-list', RootMatList],
  ['MatListGroup', 'mat-list-group', RootMatListGroup],
  ['MatListItem', 'mat-list-item', RootMatListItem],
  ['MatDivider', 'mat-divider', RootMatDivider],
  ['MatCheckbox', 'mat-checkbox', RootMatCheckbox],
  ['MatRadio', 'mat-radio', RootMatRadio],
  ['MatRadioGroup', 'mat-radio-group', RootMatRadioGroup],
  ['MatSwitch', 'mat-switch', RootMatSwitch],
  ['MatSlider', 'mat-slider', RootMatSlider],
  ['MatRangeSlider', 'mat-range-slider', RootMatRangeSlider],
  ['MatTextField', 'mat-text-field', RootMatTextField],
  ['MatTextarea', 'mat-textarea', RootMatTextarea],
  ['MatInputBase', 'mat-input-base', RootMatInputBase],
  ['MatMenu', 'mat-menu', RootMatMenu],
  ['MatMenuGroup', 'mat-menu-group', RootMatMenuGroup],
  ['MatMenuItem', 'mat-menu-item', RootMatMenuItem],
  ['MatDialog', 'mat-dialog', RootMatDialog],
  ['MatBottomSheet', 'mat-bottom-sheet', RootMatBottomSheet],
  ['MatSideSheet', 'mat-side-sheet', RootMatSideSheet],
  ['MatHover', 'mat-hover', RootMatHover],
  ['MatContainer', 'mat-container', RootMatContainer],
  ['MatSpacer', 'mat-spacer', RootMatSpacer],
  ['MatLoader', 'mat-loader', RootMatLoader],
  ['MatTooltip', 'mat-tooltip', RootMatTooltip],
  ['MatSnackbar', 'mat-snackbar', RootMatSnackbar],
  ['MatToolbar', 'mat-toolbar', RootMatToolbar],
  ['MatPanes', 'mat-panes', RootMatPanes],
  ['MatPane', 'mat-pane', RootMatPane],
  ['MatNavigationRail', 'mat-navigation-rail', RootMatNavigationRail],
  ['MatNavigationRailItem', 'mat-navigation-rail-item', RootMatNavigationRailItem],
];

describe('公共组件导出', () => {
  it('从根入口导出应用布局组件与组合函数', () => {
    expect(RootMatAppRoot).toBeTruthy();
    expect(useMatApp).toBeTypeOf('function');
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
          tooltip: { openDelay: 1500 },
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

  it('createMatUi 全局注册选择控件组件族', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({
      theme: { target },
    });
    // eslint-disable-next-line vue/one-component-per-file -- 此根组件仅用于隔离全局注册表。
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-checkbox')).toBe(RootMatCheckbox);
    expect(app.component('mat-radio')).toBe(RootMatRadio);
    expect(app.component('mat-radio-group')).toBe(RootMatRadioGroup);
    expect(app.component('mat-switch')).toBe(RootMatSwitch);
    expect(app.component('mat-slider')).toBe(RootMatSlider);
    expect(app.component('mat-range-slider')).toBe(RootMatRangeSlider);
    expect(app.component('mat-text-field')).toBe(RootMatTextField);
    expect(app.component('mat-textarea')).toBe(RootMatTextarea);
    expect(app.component('mat-input-base')).toBe(RootMatInputBase);
    expect(app.component('mat-menu')).toBe(RootMatMenu);
    expect(app.component('mat-menu-group')).toBe(RootMatMenuGroup);
    expect(app.component('mat-menu-item')).toBe(RootMatMenuItem);
    expect(app.component('mat-dialog')).toBe(RootMatDialog);
    expect(app.component('mat-bottom-sheet')).toBe(RootMatBottomSheet);
    expect(app.component('mat-side-sheet')).toBe(RootMatSideSheet);
    expect(app.component('mat-hover')).toBe(RootMatHover);
    expect(app.component('mat-container')).toBe(RootMatContainer);
    expect(app.directive('intersection')).toBe(RootIntersection);
    expect(app.component('mat-spacer')).toBe(RootMatSpacer);
    expect(app.component('mat-loader')).toBe(RootMatLoader);
    expect(app.component('mat-tooltip')).toBe(RootMatTooltip);
    expect(app.component('mat-toolbar')).toBe(RootMatToolbar);
    expect(app.component('mat-panes')).toBe(RootMatPanes);
    expect(app.component('mat-pane')).toBe(RootMatPane);
    expect(app.component('mat-navigation-rail')).toBe(RootMatNavigationRail);
    expect(app.component('mat-navigation-rail-item')).toBe(RootMatNavigationRailItem);
    expect(app.component('mat-fab')).toBe(RootMatFab);
    expect(app.component('mat-icon')).toBe(RootMatIcon);
    expect(app.component('mat-icon-btn')).toBeUndefined();

    plugin.theme.dispose();
  });

  it('createMatUi 为每个组件注册 PascalCase 与 kebab-case 别名', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({
      theme: { target },
    });
    // eslint-disable-next-line vue/one-component-per-file -- 此根组件仅用于隔离全局注册表。
    const app = createApp({});

    app.use(plugin);

    globalComponents.forEach(([pascalName, kebabName, component]) => {
      expect(app.component(pascalName)).toBe(component);
      expect(app.component(kebabName)).toBe(component);
    });

    plugin.theme.dispose();
  });

  it('包入口提供与全局注册同步的 Vue 类型声明', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const declarationPath = 'dist/index.d.ts';

    expect(packageJson.types).toBe(`./${declarationPath}`);
    expect(packageJson.exports['.'].types).toBe(`./${declarationPath}`);
    expect(existsSync(declarationPath)).toBe(true);

    const declaration = readFileSync(declarationPath, 'utf8');

    globalComponents.forEach(([pascalName, kebabName]) => {
      expect(declaration).toContain(`  ${pascalName}: typeof ${pascalName};`);
      expect(declaration).toContain(`  '${kebabName}': typeof ${pascalName};`);
    });
    expect(declaration).toContain('export interface MatAppLayout');
    expect(declaration).toContain('export interface MatAppEdgeRegistration');
    expect(declaration).toContain('export declare function useMatApp(): MatAppContext;');
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

    expect(Object.keys(packageJson.exports)).toEqual(['.', './styles.css', './tailwind.css']);
    expect(packageJson.exports['.'].default).toBe(packageJson.exports['.'].import);
    expect(readdirSync('dist').sort()).toEqual(['index.d.ts', 'mdu-ui.js', 'styles.css', 'tailwind.css']);
    expect(javascriptFiles).toEqual(['mdu-ui.js']);
    expect(readFileSync('dist/mdu-ui.js', 'utf8')).not.toMatch(/\.vue(?:['"]|\?)/);
  });

  it('从唯一根入口导出命令式函数', () => {
    expect(dialog).toBeTypeOf('function');
    expect(alert).toBeTypeOf('function');
    expect(confirm).toBeTypeOf('function');
    expect(prompt).toBeTypeOf('function');
  });

  it('不再提供 MatIconBtn 单组件入口', () => {
    expect(existsSync(new URL('../src/components/mat-icon-btn', import.meta.url))).toBe(false);
  });

  it('统一提供 MatFab，不另设 MatExtendedFab 或 40px FAB 入口', () => {
    const source = readFileSync('src/index.js', 'utf8');

    expect(source).toContain('MatFab');
    expect(source).not.toContain('MatExtendedFab');
    expect(existsSync(new URL('../src/components/mat-extended-fab', import.meta.url))).toBe(false);
  });
});
