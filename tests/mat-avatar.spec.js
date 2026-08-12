import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import { createMatUi, MatAvatar } from '../src';

describe('MatAvatar', () => {
  it('src 优先于 icon 和默认 Slot', () => {
    const wrapper = mount(MatAvatar, {
      props: {
        src: '/avatar.png',
        icon: 'person',
      },
      slots: {
        default: () => '张三',
      },
    });
    const image = wrapper.get('img');

    expect(image.attributes('src')).toBe('/avatar.png');
    expect(image.attributes('alt')).toBe('');
    expect(wrapper.text()).not.toContain('person');
    expect(wrapper.text()).not.toContain('张三');
  });

  it('icon 在未设置 src 时优先于默认 Slot', () => {
    const wrapper = mount(MatAvatar, {
      props: {
        icon: 'person',
      },
      slots: {
        default: () => '张三',
      },
    });

    expect(wrapper.text()).toContain('person');
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('张三');
  });

  it('默认 Slot 在未设置 src 和 icon 时原样渲染图片与文字', () => {
    const wrapper = mount(MatAvatar, {
      slots: {
        default: () => [
          h('img', { src: '/slot.png', alt: '插槽图片' }),
          ' 李四',
        ],
      },
    });
    const image = wrapper.get('img');

    expect(image.attributes('src')).toBe('/slot.png');
    expect(wrapper.text()).toContain('李四');
  });

  it('空字符串 icon 视为未设置并回退到默认 Slot', () => {
    const wrapper = mount(MatAvatar, {
      props: {
        icon: '',
      },
      slots: {
        default: () => '王五',
      },
    });

    expect(wrapper.text()).toBe('王五');
  });

  it('没有 src、icon 和 Slot 内容时仍渲染圆形根元素', () => {
    const wrapper = mount(MatAvatar);

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.text()).toBe('');
    expect(wrapper.exists()).toBe(true);
  });

  it('默认 size 为 40px，默认 color 为 primary', () => {
    const wrapper = mount(MatAvatar);

    expect(wrapper.props('size')).toBe(40);
    expect(wrapper.props('color')).toBe('primary');
    expect(wrapper.attributes('style')).toContain('inline-size: 40px');
    expect(wrapper.attributes('style')).toContain('block-size: 40px');
  });

  it('size 数字按 px、CSS 长度字符串原样使用', () => {
    const numberWrapper = mount(MatAvatar, {
      props: { size: 56 },
    });
    const stringWrapper = mount(MatAvatar, {
      props: { size: '3rem' },
    });

    expect(numberWrapper.attributes('style')).toContain('inline-size: 56px');
    expect(stringWrapper.attributes('style')).toContain('inline-size: 3rem');
  });

  it('非法 size 回退到 40px 并发出校验警告', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    vi.stubGlobal('CSS', { supports: () => false });

    [-5, 0, 'abc'].forEach((size) => {
      const wrapper = mount(MatAvatar, {
        props: { size },
      });

      expect(wrapper.attributes('style')).toContain('inline-size: 40px');
    });

    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('color 校验接受语义色、系统颜色角色与六位种子色', () => {
    const { validator } = MatAvatar.props.color;

    expect(validator('primary')).toBe(true);
    expect(validator('secondary')).toBe(true);
    expect(validator('tertiary')).toBe(true);
    expect(validator('error')).toBe(true);
    expect(validator('primary-container')).toBe(true);
    expect(validator('surface-container-high')).toBe(true);
    expect(validator('#6750a4')).toBe(true);
    expect(validator('on-primary')).toBe(false);
    expect(validator('#fff')).toBe(false);
    expect(validator('outline')).toBe(false);
  });

  it('size 校验接受正长度并拒绝非正值', () => {
    const { validator } = MatAvatar.props.size;

    expect(validator(40)).toBe(true);
    expect(validator('40')).toBe(true);
    expect(validator('2rem')).toBe(true);
    expect(validator(0)).toBe(false);
    expect(validator(-5)).toBe(false);

    vi.stubGlobal('CSS', { supports: () => false });

    expect(validator('abc')).toBe(false);

    vi.stubGlobal('CSS', { supports: () => true });

    expect(validator('2rem')).toBe(true);
  });

  it('读取 defaults.avatar，显式属性优先', () => {
    const plugin = createMatUi({
      defaults: {
        avatar: {
          color: 'secondary',
          size: 56,
        },
      },
    });
    const defaults = mount(MatAvatar, {
      global: { plugins: [plugin] },
    });
    const explicit = mount(MatAvatar, {
      props: {
        color: 'tertiary',
        size: 32,
      },
      global: { plugins: [plugin] },
    });

    expect(defaults.attributes('style')).toContain('inline-size: 56px');
    expect(explicit.attributes('style')).toContain('inline-size: 32px');
  });

  it('未消费的属性透传到根元素', () => {
    const wrapper = mount(MatAvatar, {
      attrs: {
        'aria-label': '用户头像',
        id: 'avatar-1',
      },
    });

    expect(wrapper.attributes('aria-label')).toBe('用户头像');
    expect(wrapper.attributes('id')).toBe('avatar-1');
  });
});
