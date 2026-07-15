import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import { MatBtn } from '../src';

describe('MatBtn', () => {
  it('block 默认关闭，启用后切换根布局且不透传原生属性', () => {
    const defaultButton = mount(MatBtn);
    const blockButton = mount(MatBtn, { props: { block: true } });

    expect(defaultButton.classes()).not.toContain('mat-button-base--block');
    expect(blockButton.classes()).toContain('mat-button-base--block');
    expect(blockButton.attributes('block')).toBeUndefined();
  });

  it('默认渲染 filled 按钮并避免意外提交表单', () => {
    const wrapper = mount(MatBtn, {
      slots: {
        default: '保存',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('mat-btn--filled');
    expect(wrapper.classes()).toContain('mat-btn--size-small');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.text()).toBe('保存');
    expect(wrapper.classes()).not.toContain('mat-button-base--use-cursor');
  });

  it.each(['elevated', 'filled', 'filled-tonal', 'outlined', 'text'])(
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

  it('快速点击时保持足够长的按下状态以完成圆角过渡', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatBtn);

    try {
      wrapper.element.dispatchEvent(new MouseEvent('pointerdown', {
        bubbles: true,
        button: 0,
      }));
      await wrapper.vm.$nextTick();
      expect(wrapper.classes()).toContain('mat-button-base--pressed');

      wrapper.element.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
      await wrapper.vm.$nextTick();
      await vi.advanceTimersByTimeAsync(149);
      expect(wrapper.classes()).toContain('mat-button-base--pressed');

      await vi.advanceTimersByTimeAsync(1);
      expect(wrapper.classes()).not.toContain('mat-button-base--pressed');
    } finally {
      vi.useRealTimers();
    }
  });

  it.each(['extra-small', 'small', 'medium', 'large', 'extra-large'])('支持 %s 尺寸', (size) => {
    const wrapper = mount(MatBtn, {
      props: {
        size,
      },
    });

    expect(wrapper.classes()).toContain(`mat-btn--size-${size}`);
  });

  it('拒绝旧尺寸缩写和 tonal 变体', () => {
    expect(MatBtn.props.size.validator('s')).toBe(false);
    expect(MatBtn.props.variant.validator('tonal')).toBe(false);
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

  it('没有 selected-icon Slot 时通过 fill 轴展示选中图标', () => {
    const wrapper = mount(MatBtn, {
      props: {
        selected: true,
        toggle: true,
      },
      slots: {
        default: '收藏',
        icon: 'favorite',
      },
    });

    expect(wrapper.get('.mat-btn__icon').attributes('style')).toContain("'FILL' 1");
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

    expect(semantic.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(custom.attributes('style')).toMatch(/--mat-accent-color: light-dark\(#[\da-f]{6}, #[\da-f]{6}\)/);
  });

  it('color prop 优先于调用方设置的同名局部 CSS 变量', () => {
    const wrapper = mount(MatBtn, {
      props: {
        color: 'secondary',
      },
      attrs: {
        style: '--mat-accent-color: hotpink;',
      },
    });

    expect(wrapper.element.style.getPropertyValue('--mat-accent-color')).toBe('var(--mat-sys-color-secondary)');
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
