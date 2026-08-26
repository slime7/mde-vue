import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/app-root.md';
const exampleNames = [
  'AppRootBasicExample',
  'AppRootScrollableExample',
  'AppRootLayoutExample',
  'AppRootRegisterEdgeExample',
  'AppRootComponentsExample',
];

describe('AppRoot 文档', () => {
  it('提供中文组件页、侧栏、安装说明和 AI 索引入口', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-app-root>` 的组件导出名是 `MatAppRoot`');
    expect(page).toContain('`useMatApp()`');
    expect(page).toContain('`registerEdge({ edge, element })`');
    expect(page).toContain('`scrollable`');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'App root 应用布局根', link: '/components/app-root' }");
    expect(installation).toContain('MatAppRoot,');
    expect(installation).toContain('useMatApp,');
    expect(llmsGuide).toContain('App root：`docs/site/components/app-root.md`');
  });

  it('每个示例都由同一 Vue 文件提供代码与实时预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/app-root/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });

  it('容器化示例关闭视口填充，内部滚动示例提供确定高度', () => {
    exampleNames.forEach((exampleName) => {
      const example = readFileSync(
        resolve('docs/site/examples/app-root', `${exampleName}.vue`),
        'utf8',
      );

      expect(example, exampleName).toContain(':fill-viewport="false"');
    });

    const scrollable = readFileSync(
      resolve('docs/site/examples/app-root/AppRootScrollableExample.vue'),
      'utf8',
    );
    const components = readFileSync(
      resolve('docs/site/examples/app-root/AppRootComponentsExample.vue'),
      'utf8',
    );

    expect(scrollable).toContain('scrollable');
    expect(scrollable).toContain('block-size: 280px;');
    expect(components).toContain('block-size: 440px;');
  });
});
