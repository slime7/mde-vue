import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/app-bar.md';
const exampleNames = [
  'AppBarVariantExample',
  'AppBarContentExample',
  'AppBarAlignExample',
  'AppBarSlotsExample',
  'AppBarScrollExample',
  'AppBarSearchExample',
];

describe('App bar 文档', () => {
  it('提供带 AI 标记的中文组件页、侧栏、安装入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-app-bar>` 的组件导出名是 `MatAppBar`');
    expect(page).toContain('`<mat-app-bar-search>` 的组件导出名是 `MatAppBarSearch`');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(page).toContain('CSS `scroll-timeline`');
    expect(page).toContain('| 默认 | 唯一主内容区域');
    expect(config).toContain("{ text: 'App bar 应用栏', link: '/components/app-bar' }");
    expect(installation).toContain('MatAppBar,');
    expect(installation).toContain('MatAppBarSearch,');
    expect(llmsGuide).toContain('App bar：`docs/site/components/app-bar.md`');
  });

  it('所有示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/app-bar/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });

  it('滚动示例使用显式时间线目标并提供足够的滚动内容', () => {
    const example = readFileSync(
      resolve('docs/site/examples/app-bar/AppBarScrollExample.vue'),
      'utf8',
    );

    expect(example).toContain('ref="scrollTarget"');
    expect(example).toContain(':scroll-target="scrollTarget"');
    expect(example).toContain('variant="large-flexible"');
    expect(example).toContain('v-for="index in 8"');
  });
});
