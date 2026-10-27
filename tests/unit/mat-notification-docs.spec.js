import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/notification.md';
const exampleNames = [
  'NotificationModelValueExample',
  'NotificationTitleExample',
  'NotificationTextExample',
  'NotificationIconExample',
  'NotificationTimeExample',
  'NotificationActionsExample',
  'NotificationClosableExample',
  'NotificationCloseLabelExample',
  'NotificationPositionExample',
  'NotificationColorExample',
  'NotificationDefaultSlotExample',
  'NotificationIconSlotExample',
  'NotificationActionsSlotExample',
  'NotificationCloseSlotExample',
];

describe('Notification 文档', () => {
  it('提供带 AI 标记的中文组件页、侧栏入口、安装入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-notification>` 的组件导出名是 `MatNotification`');
    expect(page).toContain('`actions`');
    expect(page).toContain('`position`');
    expect(page).toContain('| `action` | `{ action, index }` |');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'Notification 通知', link: '/components/notification' }");
    expect(installation).toContain('MatNotification,');
    expect(installation).toContain('<MatNotification>');
    expect(llmsGuide).toContain('Notification：`docs/site/components/notification.md`');
  });

  it('每个 Notification 示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/notification/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });

  it('记录六个方位与自动定位优先级', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    [
      'top-start',
      'top-center',
      'top-end',
      'bottom-start',
      'bottom-center',
      'bottom-end',
    ].forEach((position) => {
      expect(page).toContain(position);
    });
    expect(page).toContain('最近的 `<mat-layout>`');
    expect(page).toContain('最近的 `<mat-app-root>`');
    expect(page).toContain('不会把同时显示的多条通知排队或堆叠');
  });
});
