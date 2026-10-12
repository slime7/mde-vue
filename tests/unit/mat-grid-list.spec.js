import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import MatGridList from '../../src/components/mat-grid-list/MatGridList.vue';
import MatListItem from '../../src/components/mat-list/MatListItem.vue';
import * as library from '../../src';
import { createMatUi } from '../../src/plugin.js';

async function flushFocusManagement() {
  await nextTick();
  await Promise.resolve();
}

function itemSlots(count) {
  return () => Array.from(
    { length: count },
    (_, index) => h(MatListItem, { value: index + 1 }, () => `项目 ${index + 1}`),
  );
}

describe('MatGridList 网格列表', () => {
  it('从包根入口导出，并由 createMatUi 全局注册', () => {
    expect(library.MatGridList).toBe(MatGridList);

    const app = {
      component: vi.fn(),
      directive: vi.fn(),
      provide: vi.fn(),
    };
    createMatUi().install(app);

    expect(app.component).toHaveBeenCalledWith('MatGridList', MatGridList);
    expect(app.component).toHaveBeenCalledWith('mat-grid-list', MatGridList);
  });

  it('复用 MatListItem 渲染普通语义列表，并以 grid 布局和默认两列排列', () => {
    const wrapper = mount(MatGridList, {
      slots: { default: itemSlots(4) },
    });
    const root = wrapper.find('[data-mat-grid-list]');

    expect(root.element.tagName).toBe('UL');
    expect(root.classes()).toContain('mat-list');
    expect(root.attributes('style')).toContain('display: grid');
    expect(root.attributes('style')).toContain('grid-template-columns: repeat(2, minmax(0, 1fr))');
    expect(wrapper.findAll('li.mat-list-item')).toHaveLength(4);
    expect(wrapper.text()).toContain('项目 3');
  });

  it('cols 控制列数并响应更新', async () => {
    const wrapper = mount(MatGridList, {
      props: { cols: 3 },
      slots: { default: itemSlots(4) },
    });
    const root = wrapper.find('[data-mat-grid-list]');

    expect(root.attributes('style')).toContain('grid-template-columns: repeat(3, minmax(0, 1fr))');

    await wrapper.setProps({ cols: 4 });

    expect(root.attributes('style')).toContain('grid-template-columns: repeat(4, minmax(0, 1fr))');
  });

  it('非法 cols 回退默认列数并保持可渲染', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatGridList, {
      props: { cols: 0 },
      slots: { default: itemSlots(2) },
    });

    expect(wrapper.find('[data-mat-grid-list]').attributes('style'))
      .toContain('grid-template-columns: repeat(2, minmax(0, 1fr))');
    expect(wrapper.findAll('li.mat-list-item')).toHaveLength(2);
  });

  it('选择模式保持 listbox 语义并通过包装转发 select 事件', async () => {
    await flushFocusManagement();
    const wrapper = mount(MatGridList, {
      props: {
        interaction: 'single-select',
        selected: 'a',
        'aria-label': '单选网格',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'a' }, () => '甲'),
          h(MatListItem, { value: 'b' }, () => '乙'),
        ],
      },
    });
    await flushFocusManagement();
    const options = wrapper.findAll('[role="option"]');

    expect(wrapper.find('[data-mat-grid-list]').attributes('role')).toBe('listbox');
    expect(wrapper.find('[data-mat-grid-list]').attributes('aria-label')).toBe('单选网格');
    expect(options[0].attributes('aria-selected')).toBe('true');
    expect(options[1].attributes('aria-selected')).toBe('false');

    await options[1].trigger('click');

    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'b',
      selected: true,
      nextSelected: 'b',
    });
    expect(wrapper.emitted('select')[0][0].originalEvent).toBeInstanceOf(MouseEvent);
  });

  it('color 与 activeColor 透传到列表根元素', () => {
    const wrapper = mount(MatGridList, {
      props: {
        color: 'primary',
        activeColor: 'tertiary',
        interaction: 'single-select',
        selected: 'a',
      },
      slots: { default: itemSlots(2) },
    });
    const style = wrapper.find('[data-mat-grid-list]').attributes('style');

    expect(style).toContain('--mat-accent-container-color: var(--mat-sys-color-primary-container)');
    expect(style).toContain('--mat-active-container-color: var(--mat-sys-color-tertiary-container)');
    expect(style).toContain('display: grid');
  });

  it('外部 class 与 style 合并到列表根元素，不覆盖网格布局', () => {
    const wrapper = mount(MatGridList, {
      attrs: {
        class: 'my-grid',
        style: { maxInlineSize: '320px' },
        id: 'files-grid',
      },
      slots: { default: itemSlots(2) },
    });
    const root = wrapper.find('[data-mat-grid-list]');
    const style = root.attributes('style');

    expect(root.classes()).toContain('my-grid');
    expect(root.attributes('id')).toBe('files-grid');
    expect(style).toContain('max-inline-size: 320px');
    expect(style).toContain('display: grid');
    expect(style).toContain('grid-template-columns: repeat(2, minmax(0, 1fr))');
  });
});
