import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/chat-minimap.md';
const exampleNames = [
  'ChatMinimapBasicExample',
  'ChatMinimapSizeExample',
  'ChatMinimapDirectionExample',
  'ChatMinimapClickExample',
];

describe('Chat minimap 文档', () => {
  it('提供带 AI 标记的中文组件页、侧栏入口、安装入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-chat-minimap>` 的组件导出名是 `MatChatMinimap`');
    expect(page).toContain('`item.tooltip`');
    expect(page).toContain('正态分布');
    expect(page).toContain('厚度始终保持不变');
    expect(page).toContain('`click`');
    expect(page).toContain('originalEvent');
    expect(page).toContain('direction');
    expect(page).toContain('item-width');
    expect(page).toContain('item-height');
    expect(page).toContain('item-gap');
    expect(page).toContain('悬停范围覆盖整行');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'Chat minimap 聊天缩略图', link: '/components/chat-minimap' }");
    expect(installation).toContain('MatChatMinimap,');
    expect(llmsGuide).toContain('Chat minimap：`docs/site/components/chat-minimap.md`');
  });

  it('每个示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/chat-minimap/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });
});
