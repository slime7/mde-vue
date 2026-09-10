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

  it('开发服务器不预构建 Monaco 的动态语言模块', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');

    expect(config).toContain('optimizeDeps: {');
    expect(config).toContain("exclude: ['monaco-editor']");
    expect(config).toContain("name: 'mde-vue-monaco-source-map'");
    expect(config).toContain("apply: 'serve'");
    expect(config).toContain('marked\\.umd\\.js\\.map');
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

  it('使用文档自动滚动并固定 app-bar 与侧栏', () => {
    const layoutSource = readThemeFile('Layout.vue');

    expect(layoutSource).toContain('<mat-app-root');
    expect(layoutSource).toContain('<mat-navigation-drawer');
    expect(layoutSource).toContain('<mat-app-bar');
    expect(layoutSource).toContain('<VPContent');
    expect(layoutSource).toContain('scroll-target="html"');
    expect(layoutSource).toContain('window.scrollTo({ top: 0, behavior });');
    expect(layoutSource).toContain("window.scrollTo({ top: 0, left: 0, behavior: 'instant' });");
    expect(layoutSource).not.toContain('<mat-scroll-area');
    expect(layoutSource).not.toContain('scrollAreaRef');
    expect(layoutSource.match(/mode="fixed"/g)).toHaveLength(2);
    expect(layoutSource).toContain(":class=\"{ 'mde-docs-root--playground': isPlayground }\"");
    expect(layoutSource).toContain('.mde-docs-root--playground {');
    expect(layoutSource).toContain('.mde-docs-root--playground :deep(.mat-app-root__content) {');

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

  it('Navigation rail 的 modal 文档示例默认关闭遮罩并提供打开入口', () => {
    const source = readFileSync(
      resolve('docs/site/examples/navigation-rail/NavigationRailLayoutExample.vue'),
      'utf8',
    );

    expect(source).toContain('const modalExpanded = ref(false);');
    expect(source).toContain('打开模态导航');
    expect(source).toContain('@click="modalExpanded = true"');
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

  it('示例预览组件合并代码块并提供演练场跳转与折叠操作栏', () => {
    const previewSource = readThemeFile('DocsPreview.vue');
    const configSource = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');

    expect(previewSource).toContain('docs-preview__header');
    expect(previewSource).toContain('docs-preview__header-actions');
    expect(previewSource).toContain('playgroundUrl');
    expect(previewSource).toContain('target="_blank"');
    expect(previewSource).toContain('icon="terminal"');
    expect(previewSource).toContain('icon="code"');
    expect(previewSource).toContain('docs-preview__code');
    expect(previewSource).toContain('name="code"');
    expect(previewSource).toContain('docs-preview__body');
    expect(previewSource).toContain('padding: 16px;');
    expect(previewSource).toContain('background: var(--mat-sys-color-background);');
    expect(previewSource).not.toContain('docs-preview__body--stacked > :deep(*)');

    expect(configSource).toContain('registerMergeDocsPreviewRule');
    expect(configSource).toContain('merge_docs_preview');
  });

  it('演练场沙箱支持与外层页面主题及设计令牌实时联动', () => {
    const sandboxHtml = readFileSync(resolve('docs/site/public/playground/sandbox.html'), 'utf8');
    const playgroundView = readFileSync(resolve('docs/site/.vitepress/theme/playground/PlaygroundView.vue'), 'utf8');

    expect(playgroundView).toContain("type: 'UPDATE_THEME'");
    expect(playgroundView).toContain('SANDBOX_READY');
    expect(sandboxHtml).toContain('applyThemeToSandbox');
    expect(sandboxHtml).toContain('currentMatUiInstance.theme');
    expect(sandboxHtml).toContain('themeController.setSeedColor');
    expect(sandboxHtml).toContain('themeController.setMode');
    expect(sandboxHtml).toContain('isUserThemeCustomized');
  });

  it('演练场 Monaco Editor 为语言服务配置对应 worker', () => {
    const monacoSource = readThemeFile('playground/monaco.js');

    expect(monacoSource).toContain('monaco-editor/esm/vs/editor/editor.worker?worker');
    expect(monacoSource).toContain('monaco-editor/esm/vs/language/html/html.worker?worker');
    expect(monacoSource).toContain('monaco-editor/esm/vs/language/css/css.worker?worker');
    expect(monacoSource).toContain('monaco-editor/esm/vs/language/typescript/ts.worker?worker');
    expect(monacoSource).toContain('monaco-editor/esm/vs/language/html/monaco.contribution');
    expect(monacoSource).toContain('monaco-editor/esm/vs/language/css/monaco.contribution');
    expect(monacoSource).toContain('monaco-editor/esm/vs/language/typescript/monaco.contribution');
    expect(monacoSource).toContain('getWorker');
    expect(monacoSource).not.toContain('return null');
  });

  it('Aside 固定停靠演练场链接适配文档 base 路径', () => {
    const asideSource = readFileSync(resolve('docs/site/components/aside.md'), 'utf8');

    expect(asideSource).toContain(
      '<a href="../playground?example=aside%2FAsideFixedExample"',
    );
    expect(asideSource).not.toContain(
      '<a href="/playground?example=aside%2FAsideFixedExample"',
    );
  });
});
