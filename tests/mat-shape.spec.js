import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { createMatUi, MatShape } from '../src';

const SHAPE_NAMES = [
  'circle',
  'square',
  'slanted',
  'arch',
  'semicircle',
  'oval',
  'pill',
  'triangle',
  'arrow',
  'fan',
  'diamond',
  'clamshell',
  'pentagon',
  'gem',
  'very-sunny',
  'sunny',
  '4-sided-cookie',
  '6-sided-cookie',
  '7-sided-cookie',
  '9-sided-cookie',
  '12-sided-cookie',
  '4-leaf-clover',
  '8-leaf-clover',
  'burst',
  'soft-burst',
  'boom',
  'soft-boom',
  'flower',
  'puffy',
  'puffy-diamond',
  'ghost-ish',
  'pixel-circle',
  'pixel-triangle',
  'bun',
  'heart',
];

describe('MatShape', () => {
  it('默认渲染 48px primary circle div', () => {
    const wrapper = mount(MatShape);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.props('name')).toBe('circle');
    expect(wrapper.props('size')).toBe(48);
    expect(wrapper.props('color')).toBe('primary');
    expect(wrapper.attributes('style')).toContain('inline-size: 48px');
    expect(wrapper.attributes('style')).toContain('block-size: 48px');
    expect(wrapper.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-primary)');
  });

  it('接受官方图鉴的 35 个形状名称', () => {
    expect(SHAPE_NAMES).toHaveLength(35);

    SHAPE_NAMES.forEach((name) => {
      expect(MatShape.props.name.validator(name)).toBe(true);
    });
    expect(MatShape.props.name.validator('unknown')).toBe(false);
  });

  it('name 更新时切换可见形状', async () => {
    const wrapper = mount(MatShape, { props: { name: 'circle' } });
    const initialClipPath = wrapper.attributes('style');

    await wrapper.setProps({ name: 'heart' });
    await nextTick();

    expect(wrapper.attributes('style')).not.toBe(initialClipPath);
  });

  it('size 数字按 px、CSS 长度字符串原样使用', () => {
    const numberWrapper = mount(MatShape, { props: { size: 64 } });
    const stringWrapper = mount(MatShape, { props: { size: '3rem' } });

    expect(numberWrapper.attributes('style')).toContain('inline-size: 64px');
    expect(numberWrapper.attributes('style')).toContain('block-size: 64px');
    expect(stringWrapper.attributes('style')).toContain('inline-size: 3rem');
  });

  it('支持动态根元素、默认 Slot 与原生属性透传', () => {
    const wrapper = mount(MatShape, {
      props: { as: 'div' },
      attrs: {
        'aria-label': '收藏形状',
        id: 'shape-1',
      },
      slots: { default: () => '内容' },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.text()).toBe('内容');
    expect(wrapper.attributes('aria-label')).toBe('收藏形状');
    expect(wrapper.attributes('id')).toBe('shape-1');
  });

  it('color 沿用组件配色输入', () => {
    const { validator } = MatShape.props.color;

    expect(validator('primary')).toBe(true);
    expect(validator('secondary')).toBe(true);
    expect(validator('surface-container-high')).toBe(true);
    expect(validator('#6750a4')).toBe(true);
    expect(validator('on-primary')).toBe(false);

    const primaryWrapper = mount(MatShape, { props: { color: 'primary' } });
    expect(primaryWrapper.props('color')).toBe('primary');
    expect(primaryWrapper.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-primary)');
  });

  it('读取 defaults.shape，显式属性优先', () => {
    const plugin = createMatUi({
      defaults: {
        shape: {
          color: 'secondary',
          name: 'heart',
          size: 56,
        },
      },
    });
    const defaults = mount(MatShape, { global: { plugins: [plugin] } });
    const explicit = mount(MatShape, {
      global: { plugins: [plugin] },
      props: {
        name: 'square',
        size: 32,
      },
    });

    expect(defaults.attributes('style')).toContain('inline-size: 56px');
    expect(explicit.attributes('style')).toContain('inline-size: 32px');
    expect(explicit.props('name')).toBe('square');
  });
});
