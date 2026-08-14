import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('样式使用文档', () => {
  it('集中记录 CSS 层级、公共令牌和 Tailwind CSS', () => {
    const styles = readFileSync(resolve('docs/site/guide/styles.md'), 'utf8');

    expect(styles).toContain('title: 样式');
    expect(styles).toContain('@layer mde.tokens, mde.components, mde.utilities;');
    expect(styles).toContain('@layer tailwind-theme, tailwind-reset, mde, tailwind-utilities, mde-final;');
    expect(styles).toContain('src/styles/layers.css');
    expect(styles).toContain("@import './layers.css';");
    expect(styles).toContain('--mat-ref-*');
    expect(styles).toContain('--mat-sys-*');
    expect(styles).toContain('mde-vue/tailwind.css');
    expect(styles).toContain('@theme inline');
  });

  it('文档站按推荐的 Tailwind 与 mde 交错层序加载样式', () => {
    const layerOrder = readFileSync(resolve('docs/site/.vitepress/theme/layers.css'), 'utf8');
    const customStyles = readFileSync(resolve('docs/site/.vitepress/theme/custom.css'), 'utf8');
    const imports = [
      "@import 'tailwindcss/theme.css' layer(tailwind-theme);",
      "@import 'tailwindcss/preflight.css' layer(tailwind-reset);",
      "@import 'tailwindcss/utilities.css' layer(tailwind-utilities);",
    ];

    expect(layerOrder.trimStart().startsWith('@layer tailwind-theme, tailwind-reset, mde, tailwind-utilities, mde-final;')).toBe(true);
    imports.forEach((statement, index) => {
      expect(layerOrder.indexOf(statement)).toBeGreaterThan(index === 0 ? -1 : layerOrder.indexOf(imports[index - 1]));
    });
    expect(customStyles.trimStart().startsWith("@import './layers.css';")).toBe(true);
    expect(customStyles.indexOf("@import 'mde-vue/styles.css';")).toBeGreaterThan(customStyles.indexOf("@import './layers.css';"));
    expect(customStyles.indexOf("@import 'mde-vue/tailwind.css';")).toBeGreaterThan(customStyles.indexOf("@import 'mde-vue/styles.css';"));
  });

  it('从主题页和旧 Tailwind 页面移除已迁移内容', () => {
    const theme = readFileSync(resolve('docs/site/guide/theme.md'), 'utf8');

    expect(theme).not.toContain('## CSS 级联层');
    expect(theme).not.toContain('## CSS 令牌');
    expect(existsSync(resolve('docs/site/guide/tailwind.md'))).toBe(false);
  });

  it('将样式入口放在组件配色下方并同步 AI 页面索引', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const aiGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');
    const componentColorIndex = config.indexOf("{ text: '组件配色', link: '/guide/component-color' }");
    const stylesIndex = config.indexOf("{ text: '样式', link: '/guide/styles' }");

    expect(componentColorIndex).toBeGreaterThan(-1);
    expect(stylesIndex).toBeGreaterThan(componentColorIndex);
    expect(config).not.toContain("{ text: 'Tailwind CSS', link: '/guide/tailwind' }");
    expect(aiGuide).toContain('样式：`docs/site/guide/styles.md`');
    expect(aiGuide).not.toContain('Tailwind CSS：`docs/site/guide/tailwind.md`');
  });
});
