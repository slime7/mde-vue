import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import MatTextField from '../src/components/mat-text-field/MatTextField.vue';
import MatTextarea from '../src/components/mat-textarea/MatTextarea.vue';
import MAT_UI_KEY from '../src/mat-ui-context';

describe('文本输入组件', () => {
  it('MatTextField 渲染原生 input、路由属性并请求更新模型', async () => {
    const change = vi.fn();
    const wrapper = mount(MatTextField, {
      props: {
        modelValue: 'hello',
        label: '邮箱',
        supportingText: '用于接收通知',
        prefixText: 'mailto:',
        suffixText: '.com',
        maxLength: 20,
        color: '#6750a4',
      },
      attrs: {
        id: 'email-field',
        name: 'email',
        autocomplete: 'email',
        placeholder: 'name@example.com',
        class: 'consumer-field',
        style: 'inline-size: 320px',
        onChange: change,
      },
      slots: {
        leading: '<span class="leading-icon">mail</span>',
        trailing: '<span class="trailing-icon">clear</span>',
      },
    });
    const input = wrapper.get('input');

    expect(wrapper.element.tagName).toBe('LABEL');
    expect(wrapper.classes()).toContain('consumer-field');
    expect(wrapper.classes()).toContain('mat-text-input--floating');
    expect(wrapper.attributes('style')).toContain('inline-size: 320px');
    expect(wrapper.attributes('style')).toContain('--mat-accent-color');
    expect(input.attributes()).toMatchObject({
      id: 'email-field',
      name: 'email',
      autocomplete: 'email',
      placeholder: 'name@example.com',
      maxlength: '20',
      type: 'text',
    });
    expect(input.classes()).not.toContain('consumer-field');
    expect(wrapper.text()).toContain('邮箱');
    expect(wrapper.text()).toContain('mailto:');
    expect(wrapper.text()).toContain('.com');
    expect(wrapper.text()).toContain('用于接收通知');
    expect(wrapper.text()).toContain('5 / 20');
    expect(wrapper.find('.leading-icon').exists()).toBe(true);
    expect(wrapper.find('.trailing-icon').exists()).toBe(true);

    await input.setValue('updated');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['updated']);
    expect(change).toHaveBeenCalledOnce();
  });

  it('errorText 替换辅助文字并建立错误说明关系', () => {
    const wrapper = mount(MatTextField, {
      props: {
        modelValue: '',
        label: '密码',
        supportingText: '至少八位',
        errorText: '密码长度不足',
        error: true,
        required: true,
        color: 'secondary',
      },
    });
    const input = wrapper.get('input');
    const supporting = wrapper.get('.mat-text-input__supporting');

    expect(wrapper.classes()).toContain('mat-text-input--error');
    expect(wrapper.text()).toContain('密码长度不足');
    expect(wrapper.text()).not.toContain('至少八位');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('aria-describedby')).toBe(supporting.attributes('id'));
    expect(input.attributes('required')).toBeDefined();
  });

  it('空内容聚焦时浮动标签，并在失焦后恢复标签位置且透传原生事件', async () => {
    const focus = vi.fn();
    const blur = vi.fn();
    const wrapper = mount(MatTextField, {
      props: {
        modelValue: '',
        label: '验证码',
      },
      attrs: {
        onBlur: blur,
        onFocus: focus,
      },
    });
    const input = wrapper.get('input');

    await input.trigger('focus');

    expect(wrapper.classes()).toContain('mat-text-input--focused');
    expect(wrapper.classes()).toContain('mat-text-input--floating');
    expect(focus).toHaveBeenCalledOnce();

    await input.trigger('blur');

    expect(wrapper.classes()).not.toContain('mat-text-input--focused');
    expect(wrapper.classes()).not.toContain('mat-text-input--floating');
    expect(blur).toHaveBeenCalledOnce();
  });

  it('MatTextarea 渲染固定行数的原生 textarea 并支持模型更新', async () => {
    const wrapper = mount(MatTextarea, {
      props: {
        modelValue: '第一行',
        label: '说明',
        maxLength: 100,
      },
      attrs: {
        name: 'description',
        readonly: '',
      },
    });
    const textarea = wrapper.get('textarea');

    expect(textarea.attributes('rows')).toBe('4');
    expect(textarea.attributes('name')).toBe('description');
    expect(textarea.attributes('readonly')).toBeDefined();
    expect(wrapper.text()).toContain('3 / 100');

    await textarea.setValue('更新后的说明');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['更新后的说明']);
  });

  it('用统一 MatIcon 承载前后图标 Slot', () => {
    const wrapper = mount(MatTextField, {
      global: {
        provide: {
          [MAT_UI_KEY]: {
            iconClass: 'material-symbols-outlined',
            useCursor: false,
          },
        },
      },
      props: {
        modelValue: '',
        label: '邮箱',
      },
      slots: {
        leading: 'mail',
        trailing: 'alternate_email',
      },
    });

    const leading = wrapper.get('.mat-text-input__leading');
    const trailing = wrapper.get('.mat-text-input__trailing');

    expect(leading.element.tagName).toBe('SPAN');
    expect(leading.classes()).toContain('mat-icon');
    expect(leading.classes()).toContain('material-symbols-outlined');
    expect(trailing.element.tagName).toBe('SPAN');
    expect(trailing.classes()).toContain('mat-icon');
    expect(trailing.classes()).toContain('material-symbols-outlined');
    expect(leading.attributes('style')).toContain('--mat-icon-size: 24px');
    expect(trailing.attributes('style')).toContain('--mat-icon-size: 24px');
  });
});
