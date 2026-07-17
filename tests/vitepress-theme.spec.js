import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const themeDirectory = resolve('docs/site/.vitepress/theme');

function readThemeFile(fileName) {
  return readFileSync(resolve(themeDirectory, fileName), 'utf8');
}

describe('VitePress 文档自定义主题', () => {
  it('扩展默认主题并安装 mdu-ui 全局组件', () => {
    const source = readThemeFile('index.js');

    expect(source).toContain('import DefaultTheme from \'vitepress/theme-without-fonts\';');
    expect(source).toContain('extends: DefaultTheme');
    expect(source).toContain('createMatUi');
    expect(source).toContain('app.use(createMatUi({');
  });

  it('提供主题设置页面组件并覆盖所有主题选项', () => {
    const source = readThemeFile('ThemeSettings.vue');

    expect(source).toContain('useMatTheme');
    expect(source).toContain('setMode');
    expect(source).toContain('setSeedColor');
    expect(source).toContain('setSchemeVariant');
    expect(source).toContain('setContrastLevel');
    expect(source).toContain('<mat-radio-group');
    expect(source).toContain('<mat-text-field');
    expect(source).toContain('<mat-slider');
  });

  it('移除容易误解的默认外观开关并提供文字主题入口', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');

    expect(config).toContain('  appearance: false,\n  head:');
    expect(config).toContain('{ text: \'主题设置\', link: \'/guide/theme\' }');
    expect(readThemeFile('index.js')).not.toContain("import Layout from './Layout.vue';");
  });

  it('主题设置页使用 mdu-ui 组件展示可交互预览', () => {
    const source = readFileSync(resolve('docs/site/guide/theme.md'), 'utf8');

    expect(source).toContain('<ThemeSettings />');
    expect(source).toContain('import ThemeSettings from \'../.vitepress/theme/ThemeSettings.vue\';');
  });
});
