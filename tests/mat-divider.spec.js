import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import {
  MatDivider, MatList, MatListItem,
} from '../src';

describe('MatDivider', () => {
  it('独立使用时渲染 hr 并支持无障碍属性', () => {
    const full = mount(MatDivider, { attrs: { 'aria-label': '分隔' } });

    expect(full.element.tagName).toBe('HR');
    expect(full.attributes('aria-label')).toBe('分隔');
  });

  it('支持布尔 inset 模式并兼容已有字符串缩进值', () => {
    const inset = mount(MatDivider, { props: { inset: true } });

    expect(inset.element.tagName).toBe('HR');
    expect(MatDivider.props.inset.validator(true)).toBe(true);
    expect(MatDivider.props.inset.validator(false)).toBe(true);
    expect(MatDivider.props.inset.validator('start')).toBe(true);
    expect(MatDivider.props.inset.validator('middle')).toBe(true);
    expect(MatDivider.props.inset.validator('invalid')).toBe(false);
  });

  it('支持 vertical 属性并输出 vertical 方向语义和类名', () => {
    const horizontal = mount(MatDivider);
    const vertical = mount(MatDivider, { props: { vertical: true } });
    const verticalInset = mount(MatDivider, { props: { vertical: true, inset: 'start' } });

    expect(horizontal.classes()).not.toContain('mat-divider--vertical');
    expect(horizontal.attributes('aria-orientation')).toBeUndefined();

    expect(vertical.classes()).toContain('mat-divider--vertical');
    expect(vertical.attributes('aria-orientation')).toBe('vertical');
    expect(vertical.attributes('role')).toBe('separator');

    expect(verticalInset.classes()).toContain('mat-divider--vertical');
    expect(verticalInset.classes()).toContain('mat-divider--start');
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
