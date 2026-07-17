import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import { createMatUi, MatIcon } from '../src';

const componentSource = readFileSync(
  resolve('src/components/mat-icon/MatIcon.vue'),
  'utf8',
);

describe('MatIcon', () => {
  it('默认使用 i、Material Symbols class 和 24px 字体图标', () => {
    const wrapper = mount(MatIcon, {
      props: { icon: 'home' },
    });

    expect(wrapper.element.tagName).toBe('I');
    expect(wrapper.classes()).toContain('mat-icon');
    expect(wrapper.classes()).toContain('material-symbols-outlined');
    expect(wrapper.text()).toBe('home');
    expect(wrapper.attributes('style')).toContain('--mat-icon-size: 24px');
    expect(wrapper.attributes('style')).toContain("font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24");
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
    expect(wrapper.classes()).toContain('fa-solid');
    expect(wrapper.classes()).toContain('fa-house');
    expect(wrapper.classes()).not.toContain('material-symbols-outlined');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
    expect(wrapper.find('[data-slot]').exists()).toBe(false);
  });

  it.each([
    ['small', '20px', 20],
    ['medium', '24px', 24],
    ['large', '40px', 40],
    ['extra-large', '48px', 48],
  ])('size=%s 映射为 %s 并同步光学尺寸', (size, cssSize, opticalSize) => {
    const wrapper = mount(MatIcon, {
      props: { icon: 'home', size },
    });

    expect(wrapper.attributes('style')).toContain(`--mat-icon-size: ${cssSize}`);
    expect(wrapper.attributes('style')).toContain(`'opsz' ${opticalSize}`);
  });

  it('接受带单位和 CSS 函数尺寸，自定义尺寸默认使用 24 光学尺寸', () => {
    expect(MatIcon.props.size.validator('1.5rem')).toBe(true);
    expect(MatIcon.props.size.validator('2cqi')).toBe(true);
    expect(MatIcon.props.size.validator('var(--app-icon-size)')).toBe(true);
    expect(MatIcon.props.size.validator('calc(1rem + 8px)')).toBe(true);
    expect(MatIcon.props.size.validator('24')).toBe(false);
    expect(MatIcon.props.size.validator('huge')).toBe(false);

    const wrapper = mount(MatIcon, {
      props: { icon: 'home', size: '1.5rem' },
    });

    expect(wrapper.attributes('style')).toContain('--mat-icon-size: 1.5rem');
    expect(wrapper.attributes('style')).toContain("'opsz' 24");
  });

  it('响应式更新经典四轴并校验官方范围', async () => {
    const wrapper = mount(MatIcon, {
      props: {
        fill: 0,
        grade: -25,
        icon: 'favorite',
        opticalSize: 20,
        weight: 300,
      },
    });

    expect(wrapper.attributes('style')).toContain("font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' -25, 'opsz' 20");

    await wrapper.setProps({
      fill: 1,
      grade: 200,
      opticalSize: 48,
      weight: 700,
    });

    expect(wrapper.attributes('style')).toContain("font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 200, 'opsz' 48");
    expect(MatIcon.props.fill.validator(-0.1)).toBe(false);
    expect(MatIcon.props.fill.validator(1.1)).toBe(false);
    expect(MatIcon.props.weight.validator(99)).toBe(false);
    expect(MatIcon.props.weight.validator(701)).toBe(false);
    expect(MatIcon.props.grade.validator(-51)).toBe(false);
    expect(MatIcon.props.grade.validator(201)).toBe(false);
    expect(MatIcon.props.opticalSize.validator(19)).toBe(false);
    expect(MatIcon.props.opticalSize.validator(49)).toBe(false);
  });

  it('默认继承 currentColor，支持语义、种子和直接字体颜色', () => {
    const inherited = mount(MatIcon, { props: { icon: 'home' } });
    const semantic = mount(MatIcon, {
      props: { color: 'tertiary', icon: 'home' },
    });
    const seeded = mount(MatIcon, {
      props: { color: '#ff0000', icon: 'home' },
    });
    const direct = mount(MatIcon, {
      props: {
        color: 'primary',
        fontColor: 'rgb(12 34 56 / 75%)',
        icon: 'home',
      },
    });

    expect(inherited.attributes('style')).toContain('color: currentcolor');
    expect(semantic.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(semantic.attributes('style')).toContain('color: var(--mat-accent-color)');
    expect(seeded.attributes('style')).toMatch(/--mat-accent-color: light-dark\(/);
    expect(direct.attributes('style')).toContain('color: rgba(12, 34, 56, 0.75)');
  });

  it('全局 iconClass 可被组件值覆盖或关闭', () => {
    const plugin = createMatUi({
      iconClass: 'custom-icons ligatures',
      theme: { target: document.createElement('div') },
    });
    const globalIcon = mount(MatIcon, {
      global: { plugins: [plugin] },
      props: { icon: 'home' },
    });
    const overridden = mount(MatIcon, {
      global: { plugins: [plugin] },
      props: { icon: 'home', iconClass: 'other-icons' },
    });
    const disabled = mount(MatIcon, {
      global: { plugins: [plugin] },
      props: { icon: 'home', iconClass: '' },
    });

    expect(globalIcon.classes()).toEqual(expect.arrayContaining(['custom-icons', 'ligatures']));
    expect(overridden.classes()).toContain('other-icons');
    expect(overridden.classes()).not.toContain('custom-icons');
    expect(disabled.classes()).toEqual(['mat-icon']);

    plugin.theme.dispose();
  });

  it('为字体轴、字号和颜色提供动效，并尊重减少动画偏好', () => {
    expect(componentSource).toContain('transition-property: color, font-size, font-variation-settings;');
    expect(componentSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(componentSource).toContain('transition-duration: 0s;');
  });

  it('不允许选择图标文字，并使用默认指针避免显示文本选择光标', () => {
    expect(componentSource).toContain('user-select: none;');
    expect(componentSource).toContain('cursor: default;');
  });
});
