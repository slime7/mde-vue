import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const themeDirectory = resolve('docs/site/.vitepress/theme');

function readThemeFile(fileName) {
  return readFileSync(resolve(themeDirectory, fileName), 'utf8');
}

describe('VitePress 文档自定义主题', () => {
  it('扩展默认主题并安装 mde-vue 全局组件', () => {
    const source = readThemeFile('index.js');

    expect(source).toContain('import DefaultTheme from \'vitepress/theme-without-fonts\';');
    expect(source).toContain('extends: DefaultTheme');
    expect(source).toContain('createMatUi');
    expect(source).toContain('const matUi = createMatUi({');
    expect(source).toContain('app.use(matUi);');
  });

  it('文档预览从源码入口加载组件与样式', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const theme = readThemeFile('index.js');

    expect(config).toContain('find: /^mde-vue$/');
    expect(config).toContain('new URL(\'../../../src/index.js\', import.meta.url)');
    expect(config).toContain('find: /^mde-vue\\/styles\\.css$/');
    expect(config).toContain('new URL(\'../../../src/styles/index.css\', import.meta.url)');
    expect(theme.indexOf("import './custom.css';")).toBeLessThan(theme.indexOf("from 'mde-vue';"));
    expect(config).toContain('createVitePressStylesLayerPlugin()');
    expect(config).toContain('@layer docs-base');
  });

  it('在主题插件初始化时同步 VitePress 的高亮配色模式', () => {
    const source = readThemeFile('index.js');
    const settingsSource = readThemeFile('ThemeSettings.vue');

    expect(source).toContain("classList.toggle('dark', mode === 'dark')");
    expect(source).toContain('matUi.theme.resolvedMode.value');
    expect(settingsSource).not.toContain("classList.toggle('dark'");
  });

  it('读取并持久化文档站的完整主题配置', () => {
    const source = readThemeFile('index.js');

    expect(source).toContain('DOCS_THEME_STORAGE_KEY');
    expect(source).toContain('localStorage.getItem(DOCS_THEME_STORAGE_KEY)');
    expect(source).toContain('localStorage.setItem(DOCS_THEME_STORAGE_KEY');
    expect(source).toContain('theme: readStoredThemeOptions()');
    expect(source).toContain('matUi.theme.mode.value');
    expect(source).toContain('matUi.theme.seedColor.value');
    expect(source).toContain('matUi.theme.schemeVariant.value');
    expect(source).toContain('matUi.theme.contrastLevel.value');
    expect(source).toContain('schemeVariant');
    expect(source).toContain('contrastLevel');
  });

  it('提供主题设置页面组件并覆盖所有主题选项', () => {
    const settingsSource = readThemeFile('ThemeSettings.vue');
    const formSource = readThemeFile('ThemeForm.vue');

    expect(settingsSource).toContain('ThemeForm');
    expect(formSource).toContain('useMatTheme');
    expect(formSource).toContain('setMode');
    expect(formSource).toContain('setSeedColor');
    expect(formSource).toContain('setSchemeVariant');
    expect(formSource).toContain('setContrastLevel');
    expect(formSource).toContain('<mat-radio-group');
    expect(formSource).toContain('<mat-text-field');
    expect(formSource).toContain('type="color"');
    expect(formSource).toContain('openColorPicker');
    expect(formSource).toContain('#trailing');
    expect(formSource).toContain('<mat-slider');
    expect(formSource).toContain('icon="casino"');
    expect(formSource).toContain('theme-form__seed-row');
  });

  it('移除容易误解的默认外观开关并提供文字主题入口', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');

    expect(config).toContain('  appearance: false,\n  head:');
    expect(config).toContain('{ text: \'主题设置\', link: \'/guide/theme\' }');
    expect(readThemeFile('index.js')).toContain("import Layout from './Layout.vue';");
  });

  it('使用 Layout.vue 自定义根布局并将 app-bar 置于侧栏前方', () => {
    const layoutSource = readThemeFile('Layout.vue');

    expect(layoutSource).toContain('<mat-app-root');
    expect(layoutSource).toContain('<mat-navigation-drawer');
    expect(layoutSource).toContain('<mat-app-bar');
    expect(layoutSource).toContain('<VPContent');

    const drawerIndex = layoutSource.indexOf('<mat-navigation-drawer');
    const appBarIndex = layoutSource.indexOf('<mat-app-bar');

    expect(appBarIndex).toBeGreaterThan(-1);
    expect(drawerIndex).toBeGreaterThan(appBarIndex);
    expect(layoutSource).toContain('<mat-card');
    expect(layoutSource).toContain('<mat-card-action-area');
    expect(layoutSource).toContain('<mat-docked-container');
    expect(layoutSource).toContain('id="mde-docs-theme-settings-btn"');
    expect(layoutSource).toContain('anchor="mde-docs-theme-settings-btn"');
  });

  it('主题设置页使用 mde-vue 组件展示可交互预览', () => {
    const source = readFileSync(resolve('docs/site/guide/theme.md'), 'utf8');

    expect(source).toContain('<ThemeSettings />');
    expect(source).toContain('import ThemeSettings from \'../.vitepress/theme/ThemeSettings.vue\';');
  });

  it('将 VitePress 页面变量映射到 mde-vue 主题令牌', () => {
    const source = readThemeFile('custom.css');

    expect(source).toContain('html[data-mat-theme=\'dark\']');
    expect(source).toContain('--vp-c-bg: var(--mat-sys-color-background)');
    expect(source).toContain('--vp-c-text-1: var(--mat-sys-color-on-background)');
    expect(source).not.toContain('--vp-code-block-bg: var(--mat-sys-color-surface-container)');
    expect(readThemeFile('index.js')).toContain("classList.toggle('dark'");
  });

  it('预览容器提供空的 MatAppRoot 上下文以允许示例内嵌套 MatAppRoot', () => {
    const previewSource = readThemeFile('DocsPreview.vue');
    const playgroundSource = readThemeFile('DocsPlayground.vue');

    expect(previewSource).toContain('MAT_APP_ROOT_KEY');
    expect(previewSource).toContain('provide(MAT_APP_ROOT_KEY, null);');
    expect(playgroundSource).toContain('MAT_APP_ROOT_KEY');
    expect(playgroundSource).toContain('provide(MAT_APP_ROOT_KEY, null);');
  });
});
