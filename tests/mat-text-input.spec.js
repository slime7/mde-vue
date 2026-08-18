import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import MatInputBase from '../src/components/MatInputBase.vue';
import MatMenu from '../src/components/mat-menu/MatMenu.vue';
import MatMenuItem from '../src/components/mat-menu/MatMenuItem.vue';
import MatTextField from '../src/components/mat-text-field/MatTextField.vue';
import MatTextarea from '../src/components/mat-textarea/MatTextarea.vue';
import MAT_UI_KEY from '../src/mat-ui-context';

function mockTextareaLayout(initialScrollHeight) {
  let scrollHeight = initialScrollHeight;

  vi.spyOn(HTMLTextAreaElement.prototype, 'scrollHeight', 'get').mockImplementation(() => (
    scrollHeight
  ));
  vi.spyOn(globalThis, 'getComputedStyle').mockReturnValue({
    lineHeight: '24px',
    paddingBlockEnd: '8px',
    paddingBlockStart: '0px',
  });

  return (value) => {
    scrollHeight = value;
  };
}

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

  it('Text field 和 Textarea 使用块级 flex 根且忽略已移除的 block 属性', () => {
    [MatTextField, MatTextarea].forEach((component) => {
      const wrapper = mount(component, { attrs: { block: true } });

      expect(component.props.block).toBeUndefined();
      expect(wrapper.attributes('block')).toBeUndefined();
      expect(wrapper.get('input, textarea').attributes('block')).toBeUndefined();
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
    expect(input.attributes()).toMatchObject({
      id: 'email-field',
      name: 'email',
      autocomplete: 'email',
      placeholder: 'name@example.com',
      maxlength: '20',
      type: 'text',
    });
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

    expect(focus).toHaveBeenCalledOnce();

    await input.trigger('blur');

    expect(blur).toHaveBeenCalledOnce();
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

  it('MatTextarea 在输入内容后失焦时保持浮动标签', async () => {
    const wrapper = mount(MatTextarea, {
      props: {
        modelValue: '',
        label: '说明',
      },
    });
    const textarea = wrapper.get('textarea');

    await textarea.setValue('用户输入');
    await textarea.trigger('blur');

    expect(wrapper.get('fieldset').get('legend').text()).toBe('说明');
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

  it('MatTextarea 自动增高时以 rows 为下限并随输入增长和收缩', async () => {
    const setScrollHeight = mockTextareaLayout(40);
    const wrapper = mount(MatTextarea, {
      props: {
        autoGrow: true,
        modelValue: '',
        rows: 2,
      },
    });
    const textarea = wrapper.get('textarea');

    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('56px');
    expect(textarea.element.style.overflowY).toBe('auto');

    setScrollHeight(104);
    await textarea.setValue('第一行\n第二行\n第三行\n第四行');
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('104px');

    textarea.element.style.height = '300px';
    setScrollHeight(128);
    await textarea.setValue('手动调整后继续输入');
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.height).toBe('');
    expect(textarea.element.style.blockSize).toBe('128px');

    setScrollHeight(32);
    await textarea.setValue('缩短');
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('56px');
  });

  it('MatTextarea 响应外部模型更新并在 maxRows 后启用内部滚动', async () => {
    const setScrollHeight = mockTextareaLayout(80);
    const wrapper = mount(MatTextarea, {
      props: {
        autoGrow: true,
        maxRows: 3,
        modelValue: '三行内容',
        rows: 2,
      },
    });
    const textarea = wrapper.get('textarea');

    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('80px');
    expect(textarea.element.style.overflowY).toBe('auto');

    setScrollHeight(128);
    await wrapper.setProps({ modelValue: '超过三行的外部更新内容' });
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('80px');
    expect(textarea.element.style.overflowY).toBe('auto');
  });

  it('MatTextarea 将小于 rows 的 maxRows 按 rows 处理', async () => {
    mockTextareaLayout(200);
    const wrapper = mount(MatTextarea, {
      props: {
        autoGrow: true,
        maxRows: 2,
        rows: 4,
      },
    });
    const textarea = wrapper.get('textarea');

    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('104px');
    expect(textarea.element.style.overflowY).toBe('auto');
  });

  it('MatTextarea 动态切换自动增高并在宽度变化后重新测量', async () => {
    const setScrollHeight = mockTextareaLayout(104);
    let resizeCallback;
    const disconnect = vi.fn();
    const observe = vi.fn();

    vi.stubGlobal('ResizeObserver', class {
      constructor(callback) {
        resizeCallback = callback;
      }

      observe = observe;

      disconnect = disconnect;
    });

    const wrapper = mount(MatTextarea, {
      props: {
        autoGrow: false,
        rows: 2,
      },
    });
    const textarea = wrapper.get('textarea');

    expect(observe).toHaveBeenCalledWith(textarea.element);
    expect(textarea.element.style.blockSize).toBe('');

    await wrapper.setProps({ autoGrow: true });
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('104px');

    setScrollHeight(200);
    await wrapper.setProps({ maxRows: 3, rows: 4 });
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('104px');
    expect(textarea.element.style.overflowY).toBe('auto');

    await wrapper.setProps({ maxRows: 6 });
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('152px');

    setScrollHeight(152);
    resizeCallback([{ contentRect: { width: 240 } }]);
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('152px');

    await wrapper.setProps({ autoGrow: false });
    await wrapper.vm.$nextTick();

    expect(textarea.element.style.blockSize).toBe('');
    expect(textarea.element.style.overflowY).toBe('');

    wrapper.unmount();

    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('前后 Slot 直接承载内容且不产生多余 MatIcon 包装', () => {
    const wrapper = mount(MatTextField, {
      props: {
        modelValue: '',
        label: '邮箱',
      },
      slots: {
        leading: '<span class="custom-leading">mail</span>',
        trailing: '<button class="custom-btn">action</button>',
      },
    });

    const leading = wrapper.get('.mat-text-input__leading');
    const trailing = wrapper.get('.mat-text-input__trailing');

    expect(leading.element.tagName).toBe('SPAN');
    expect(trailing.element.tagName).toBe('SPAN');
    expect(leading.find('.mat-icon').exists()).toBe(false);
    expect(trailing.find('.mat-icon').exists()).toBe(false);
    expect(leading.find('.custom-leading').exists()).toBe(true);
    expect(trailing.find('.custom-btn').exists()).toBe(true);
  });

  it('在 trailing 插槽中嵌套 MatMenu 时不污染菜单项字体和文本', () => {
    const wrapper = mount(MatTextField, {
      attachTo: document.body,
      props: {
        modelValue: '',
        label: '搜索',
      },
      slots: {
        trailing: {
          components: { MatMenu, MatMenuItem },
          template: `
            <mat-menu :model-value="true">
              <template #activator>
                <button class="filter-trigger">Filter</button>
              </template>
              <mat-menu-item>search</mat-menu-item>
              <mat-menu-item>settings</mat-menu-item>
            </mat-menu>
          `,
        },
      },
    });

    const trailing = wrapper.get('.mat-text-input__trailing');
    const items = trailing.findAll('[data-mat-menu-item]');

    expect(trailing.find('.mat-icon').exists()).toBe(false);
    expect(items).toHaveLength(2);
    expect(items[0].text()).toBe('search');
    expect(items[1].text()).toBe('settings');
    expect(items[0].find('.material-symbols-outlined').exists()).toBe(false);

    wrapper.unmount();
  });
});
