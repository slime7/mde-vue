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
});
