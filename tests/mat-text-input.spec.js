import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import MatInputBase from '../src/components/MatInputBase.vue';
import MatTextField from '../src/components/mat-text-field/MatTextField.vue';
import MatTextarea from '../src/components/mat-textarea/MatTextarea.vue';
import MAT_UI_KEY from '../src/mat-ui-context';

describe('文本输入组件', () => {
  it('MatInputBase 渲染无边框原生 input，透传属性并请求模型更新', async () => {
    const change = vi.fn();
    const wrapper = mount(MatInputBase, {
      attrs: {
        id: 'search-input',
        name: 'query',
        class: 'consumer-input',
        placeholder: '搜索',
        onChange: change,
      },
      props: {
        control: 'input',
        modelValue: '初始值',
      },
    });
    const input = wrapper.get('input');

    expect(wrapper.element).toBe(input.element);
    expect(input.attributes()).toMatchObject({
      id: 'search-input',
      name: 'query',
      placeholder: '搜索',
      value: '初始值',
    });
    expect(input.classes()).toEqual(expect.arrayContaining(['mat-input-base', 'consumer-input']));
    expect(input.attributes('control')).toBeUndefined();
    expect(input.attributes('modelvalue')).toBeUndefined();

    await input.setValue('更新值');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['更新值']);
    expect(change).toHaveBeenCalledOnce();
  });

  it('MatInputBase 将 textarea 的 rows 透传到原生控件并暴露聚焦方法', async () => {
    const wrapper = mount(MatInputBase, {
      attachTo: document.body,
      props: {
        control: 'textarea',
        modelValue: '',
        rows: 3,
      },
    });

    expect(wrapper.get('textarea').attributes('rows')).toBe('3');
    expect(wrapper.get('textarea').attributes('type')).toBeUndefined();

    wrapper.vm.focusInput();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.getInput()).toBe(wrapper.element);
    expect(document.activeElement).toBe(wrapper.element);

    wrapper.unmount();
  });

  it('Text field 和 Textarea 仅在 block 启用时切换根布局且不透传属性', () => {
    [MatTextField, MatTextarea].forEach((component) => {
      const defaultInput = mount(component);
      const blockInput = mount(component, { props: { block: true } });

      expect(defaultInput.classes()).not.toContain('mat-text-input--block');
      expect(blockInput.classes()).toContain('mat-text-input--block');
      expect(blockInput.attributes('block')).toBeUndefined();
    });
  });

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

    expect(wrapper.element.tagName).toBe('DIV');
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

  it('outlined 使用透明的 fieldset 缺口并由显式 label 关联原生控件', () => {
    const wrapper = mount(MatTextField, {
      props: {
        modelValue: 'hello',
        label: '邮箱',
      },
    });
    const input = wrapper.get('input');
    const label = wrapper.get('.mat-text-input__label');
    const labelControl = wrapper.get('label.mat-text-input__main');
    const outline = wrapper.get('fieldset.mat-text-input__outline');

    expect(input.attributes('id')).toBeTruthy();
    expect(labelControl.attributes('for')).toBe(input.attributes('id'));
    expect(label.element.tagName).toBe('SPAN');
    expect(outline.attributes('aria-hidden')).toBe('true');
    expect(outline.get('legend').text()).toBe('邮箱');
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

  it('空内容未聚焦时隐藏 prefixText 和 suffixText，浮动后显示', async () => {
    const wrapper = mount(MatTextField, {
      props: {
        modelValue: '',
        label: '网址',
        prefixText: 'https://',
        suffixText: '.example.com',
      },
    });
    const input = wrapper.get('input');

    expect(wrapper.classes()).not.toContain('mat-text-input--floating');

    await input.trigger('focus');

    expect(wrapper.classes()).toContain('mat-text-input--floating');
  });

  it('点击 prefixText 和 suffixText 时聚焦输入框', async () => {
    const wrapper = mount(MatTextField, {
      attachTo: document.body,
      props: {
        modelValue: 'example',
        label: '网址',
        prefixText: 'https://',
        suffixText: '.example.com',
      },
    });
    const input = wrapper.get('input');

    await wrapper.get('.mat-text-input__prefix').trigger('click');

    expect(document.activeElement).toBe(input.element);

    await input.trigger('blur');
    await wrapper.get('.mat-text-input__suffix').trigger('click');

    expect(document.activeElement).toBe(input.element);

    wrapper.unmount();
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

  it('MatTextarea 把显式 rows 原样交给原生 textarea', () => {
    const wrapper = mount(MatTextarea, {
      props: {
        label: '说明',
        rows: 2,
      },
    });

    expect(wrapper.get('textarea').attributes('rows')).toBe('2');
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
