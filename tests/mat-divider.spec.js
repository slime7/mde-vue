import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import {
  MatDivider, MatList, MatListItem,
} from '../src';

describe('MatDivider', () => {
  it('独立使用时渲染 hr 并支持三种缩进', () => {
    const full = mount(MatDivider, { attrs: { 'aria-label': '分隔' } });
    const start = mount(MatDivider, { props: { inset: 'start' } });
    const middle = mount(MatDivider, { props: { inset: 'middle' } });

    expect(full.element.tagName).toBe('HR');
    expect(full.attributes('aria-label')).toBe('分隔');
    expect(full.classes()).toContain('mat-divider--none');
    expect(start.classes()).toContain('mat-divider--start');
    expect(middle.classes()).toContain('mat-divider--middle');
  });

  it('普通 List 中渲染合法的 li separator', () => {
    const wrapper = mount(MatList, {
      slots: {
        default: () => [
          h(MatListItem, null, () => '一'),
          h(MatDivider),
          h(MatListItem, null, () => '二'),
        ],
      },
    });
    const divider = wrapper.find('.mat-divider');

    expect(divider.element.tagName).toBe('LI');
    expect(divider.attributes('role')).toBe('separator');
  });

  it('listbox 中作为不参与选择的展示元素', () => {
    const wrapper = mount(MatList, {
      props: { interaction: 'single-select' },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatDivider),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    const divider = wrapper.find('.mat-divider');

    expect(divider.element.tagName).toBe('DIV');
    expect(divider.attributes('role')).toBe('presentation');
    expect(divider.attributes('aria-hidden')).toBe('true');
  });
});
