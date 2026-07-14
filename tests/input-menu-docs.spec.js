import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('文本输入与菜单文档', () => {
  it('提供纳入 AI 文档的中文组件页面和同源示例', () => {
    [
      'docs/site/components/text-field.md',
      'docs/site/components/menu.md',
    ].forEach((pagePath) => {
      expect(existsSync(resolve(pagePath)), pagePath).toBe(true);
      const source = readFileSync(resolve(pagePath), 'utf8');

      expect(source).toContain('llms: true');
      expect(source).toContain('## 组件简介');
      expect(source).toContain('## 示例');
      expect(source).toContain('## API');
      expect(source).toContain('## 事件');
      expect(source).toContain('## Slots');
      expect(source).toMatch(/^<<< @\/examples\/.+\.vue$/m);
      expect(source).toContain('<DocsPreview');
    });
  });

  it('移除独立 demo 页面和所有入口', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const home = readFileSync(resolve('docs/site/index.md'), 'utf8');

    expect(existsSync(resolve('docs/site/demo/index.md'))).toBe(false);
    expect(config).not.toContain('/demo/');
    expect(home).not.toContain('/demo/');
  });

  it('Split button 示例使用真实 MatMenu', () => {
    const source = readFileSync(
      resolve('docs/site/examples/button/SplitButtonMenuExample.vue'),
      'utf8',
    );

    expect(source).toContain('<mat-menu');
    expect(source).toContain('<mat-menu-item');
    expect(source).not.toContain('class="example-menu"');
  });

  it('窄屏文档表格在自身内部滚动', () => {
    const source = readFileSync(
      resolve('docs/site/.vitepress/theme/custom.css'),
      'utf8',
    );

    expect(source).toContain('@media (width < 640px)');
    expect(source).toContain('overflow-x: auto');
  });
});
