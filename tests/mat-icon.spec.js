import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import { MatIcon } from '../src';

describe('MatIcon', () => {
  it('默认渲染 Material 图标文本', () => {
    const wrapper = mount(MatIcon, {
      props: { icon: 'home' },
    });

    expect(wrapper.element.tagName).toBe('I');
    expect(wrapper.text()).toBe('home');
  });

  it('按 src、icon、默认 Slot 的顺序选择内容', () => {
    const src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E';
    const fromSrc = mount(MatIcon, {
      props: { icon: 'home', src },
      slots: { default: () => h('svg', { 'data-slot': '' }) },
    });
    const fromIcon = mount(MatIcon, {
      props: { icon: 'search' },
      slots: { default: () => h('svg', { 'data-slot': '' }) },
    });
    const fromSlot = mount(MatIcon, {
      slots: {
        default: () => h('svg', {
          'data-slot': '',
          viewBox: '0 0 24 24',
        }),
      },
    });

    expect(fromSrc.get('img').attributes('src')).toBe(src);
    expect(fromSrc.get('img').attributes('alt')).toBe('');
    expect(fromSrc.find('[data-slot]').exists()).toBe(false);
    expect(fromSrc.text()).toBe('');
    expect(fromIcon.text()).toBe('search');
    expect(fromIcon.find('[data-slot]').exists()).toBe(false);
    expect(fromSlot.get('[data-slot]').element.tagName).toBe('svg');
  });

  it('允许空 icon 配合 class 驱动的图标库并覆盖根标签', () => {
    const wrapper = mount(MatIcon, {
      props: {
        as: 'span',
        icon: '',
        iconClass: 'fa-solid fa-house',
      },
      attrs: {
        'aria-hidden': 'true',
      },
      slots: { default: () => h('svg', { 'data-slot': '' }) },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
    expect(wrapper.find('[data-slot]').exists()).toBe(false);
  });

  it('接受带单位和 CSS 函数尺寸，自定义尺寸默认使用 24 光学尺寸', () => {
    expect(MatIcon.props.size.validator('1.5rem')).toBe(true);
    expect(MatIcon.props.size.validator('2cqi')).toBe(true);
    expect(MatIcon.props.size.validator('var(--app-icon-size)')).toBe(true);
    expect(MatIcon.props.size.validator('calc(1rem + 8px)')).toBe(true);
    expect(MatIcon.props.size.validator('24')).toBe(false);
    expect(MatIcon.props.size.validator('huge')).toBe(false);
  });
});
