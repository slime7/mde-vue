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
      expect(source).toMatch(/^<<< @\/examples\/[^\s]+\.vue/m);
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

  it('Menu 文档覆盖普通 v-model、分组、右键坐标和 offset', () => {
    const page = readFileSync(resolve('docs/site/components/menu.md'), 'utf8');
    const contextExample = readFileSync(
      resolve('docs/site/examples/menu/MenuContextExample.vue'),
      'utf8',
    );

    expect(page).toContain('`modelValue`');
    expect(page).toContain('`MatMenuGroup`');
    expect(page).toContain('MenuGroupExample.vue');
    expect(page).toContain('MenuContextExample.vue');
    expect(page).toContain('MenuOffsetExample.vue');
    expect(page).toContain('MenuActivatorSlotExample.vue');
    expect(page).not.toContain('v-model:open');
    expect(contextExample).toContain('[event.clientX, event.clientY]');
    expect(contextExample).toContain('@contextmenu.prevent="showContextMenu"');
  });

  it('Dialog 文档覆盖 activator Slot，并与示例保持同源', () => {
    const page = readFileSync(resolve('docs/site/components/dialog.md'), 'utf8');
    const example = readFileSync(
      resolve('docs/site/examples/dialog/DialogActivatorSlotExample.vue'),
      'utf8',
    );

    expect(page).toContain('`activator` Slot');
    expect(page).toContain('DialogActivatorSlotExample.vue');
    expect(page).toContain('<DialogActivatorSlotExample />');
    expect(example).toContain('#activator');
  });

  it('Menu color 示例使用 vibrant 表面展示局部配色', () => {
    const source = readFileSync(
      resolve('docs/site/examples/menu/MenuColorExample.vue'),
      'utf8',
    );

    expect(source).toContain('variant="vibrant"');
    expect(source).toContain('color="#6750a4"');
  });

  it('Menu 页面示例默认关闭菜单，避免加载时抢占焦点', () => {
    [
      'MenuColorExample.vue',
      'MenuDefaultSlotExample.vue',
      'MenuGroupExample.vue',
      'MenuItemDefaultSlotExample.vue',
      'MenuItemDisabledExample.vue',
      'MenuItemLeadingSlotExample.vue',
      'MenuItemSubmenuSlotExample.vue',
      'MenuItemSupportingSlotExample.vue',
      'MenuItemTrailingSlotExample.vue',
      'MenuOffsetExample.vue',
      'MenuVariantExample.vue',
    ].forEach((fileName) => {
      const source = readFileSync(
        resolve('docs/site/examples/menu', fileName),
        'utf8',
      );

      expect(source, fileName).toContain('const open = ref(false);');
    });
  });

  it('窄屏文档表格在自身内部滚动', () => {
    const source = readFileSync(
      resolve('docs/site/.vitepress/theme/custom.css'),
      'utf8',
    );

    expect(source).toContain('@media (width < 640px)');
    expect(source).toContain('overflow-x: auto');
  });

  it('Text field 示例覆盖空值失焦、两种外观和只读禁用状态', () => {
    const source = readFileSync(
      resolve('docs/site/examples/text-field/TextFieldExample.vue'),
      'utf8',
    );

    expect(source).toContain("const verificationCode = ref('');");
    expect(source).toContain('v-model="verificationCode"');
    expect(source).not.toContain('model-value="123"');
    expect(source).toContain('variant="outlined"');
    expect(source).toContain('variant="filled"');
    expect(source).toContain('readonly');
    expect(source).toContain('disabled');
  });
});
