import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatBtn } from '../src';

describe('MatBtn', () => {
  it('默认渲染 filled 按钮并避免意外提交表单', () => {
    const wrapper = mount(MatBtn, {
      slots: {
        default: '保存',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('mat-btn--filled');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.text()).toBe('保存');
  });

  it.each(['elevated', 'filled', 'tonal', 'outlined', 'text'])(
    '支持 %s 外观',
    (variant) => {
      const wrapper = mount(MatBtn, {
        props: {
          variant,
        },
      });

      expect(wrapper.classes()).toContain(`mat-btn--${variant}`);
    },
  );

  it('透传原生属性和事件', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatBtn, {
      attrs: {
        'aria-label': '执行保存',
        'data-action': 'save',
        onClick: handleClick,
      },
    });

    wrapper.element.click();

    expect(wrapper.attributes('aria-label')).toBe('执行保存');
    expect(wrapper.attributes('data-action')).toBe('save');
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('禁用时阻止原生点击事件', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatBtn, {
      props: {
        disabled: true,
      },
      attrs: {
        onClick: handleClick,
      },
    });

    wrapper.element.click();

    expect(wrapper.attributes()).toHaveProperty('disabled');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('允许显式设置原生按钮类型', () => {
    const wrapper = mount(MatBtn, {
      props: {
        type: 'submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });

  it.each(['xs', 's', 'm', 'l', 'xl'])('支持 %s 尺寸', (size) => {
    const wrapper = mount(MatBtn, {
      props: {
        size,
      },
    });

    expect(wrapper.classes()).toContain(`mat-btn--size-${size}`);
  });

  it('支持方形、前置图标和受控选择内容', () => {
    const wrapper = mount(MatBtn, {
      props: {
        shape: 'square',
        toggle: true,
        selected: true,
      },
      slots: {
        default: '收藏',
        icon: '<span>☆</span>',
        selected: '已收藏',
        'selected-icon': '<span>★</span>',
      },
    });

    expect(wrapper.classes()).toContain('mat-btn--shape-square');
    expect(wrapper.classes()).toContain('mat-btn--selected');
    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(wrapper.text()).toContain('★');
    expect(wrapper.text()).toContain('已收藏');
  });

  it('语义 color 映射项目令牌，自定义种子色生成局部亮暗配色', () => {
    const semantic = mount(MatBtn, {
      props: {
        color: 'tertiary',
      },
    });
    const custom = mount(MatBtn, {
      props: {
        color: '#ff0000',
      },
    });

    expect(semantic.attributes('style')).toContain('--mat-accent-color: var(--mat-color-tertiary)');
    expect(custom.attributes('style')).toMatch(/--mat-accent-color: light-dark\(#[\da-f]{6}, #[\da-f]{6}\)/);
  });

  it('text 不进入 toggle 状态', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatBtn, {
      props: {
        variant: 'text',
        toggle: true,
        selected: true,
      },
    });

    expect(wrapper.classes()).not.toContain('mat-btn--toggle');
    expect(wrapper.attributes('aria-pressed')).toBeUndefined();
    expect(warn).toHaveBeenCalledOnce();
  });
});
