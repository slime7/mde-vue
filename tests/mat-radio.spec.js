import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { MatRadio, MatRadioGroup } from '../src';

/* eslint-disable vue/one-component-per-file -- 测试宿主用于验证 Radio 与 Group 的组合行为。 */

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('MatRadio', () => {
  it('独立使用时更新自己的模型', async () => {
    const wrapper = mount(MatRadio, {
      props: {
        modelValue: 'recent',
        value: 'name',
      },
      slots: {
        default: '名称',
      },
    });
    const input = wrapper.find('input');

    expect(input.element.checked).toBe(false);
    input.element.checked = true;
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['name']);
    expect(wrapper.emitted('change')?.[0][0]).toBeInstanceOf(Event);
  });

  it('Group 提供语义、受控值和 roving tabindex', async () => {
    const Host = defineComponent({
      components: {
        MatRadio,
        MatRadioGroup,
      },
      setup() {
        const selected = ref('recent');

        return { selected };
      },
      template: `
        <MatRadioGroup v-model="selected" label="排序方式">
          <MatRadio value="recent">最近更新</MatRadio>
          <MatRadio value="name">名称</MatRadio>
          <MatRadio value="disabled" disabled>不可用</MatRadio>
        </MatRadioGroup>
      `,
    });
    const wrapper = mount(Host, {
      attachTo: document.body,
    });
    const group = wrapper.findComponent(MatRadioGroup);
    const radios = wrapper.findAllComponents(MatRadio);
    const inputs = wrapper.findAll('input');

    await wrapper.vm.$nextTick();

    expect(group.element.tagName).toBe('FIELDSET');
    expect(group.find('legend').text()).toBe('排序方式');
    expect(inputs.map((input) => input.attributes('tabindex'))).toEqual(['0', '-1', '-1']);

    await inputs[0].trigger('keydown', { key: 'ArrowDown' });

    expect(wrapper.vm.selected).toBe('name');
    expect(document.activeElement).toBe(inputs[1].element);
    expect(radios[1].emitted('change')?.[0][0]).toBeInstanceOf(KeyboardEvent);

    await inputs[1].trigger('keydown', { key: 'ArrowDown' });

    expect(wrapper.vm.selected).toBe('recent');
    expect(document.activeElement).toBe(inputs[0].element);
  });

  it('Group 的禁用与颜色级联到子项，子项显式颜色优先', () => {
    const Host = defineComponent({
      components: {
        MatRadio,
        MatRadioGroup,
      },
      template: `
        <MatRadioGroup label="主题" color="secondary" disabled>
          <MatRadio value="system">系统</MatRadio>
          <MatRadio value="dark" color="tertiary">深色</MatRadio>
        </MatRadioGroup>
      `,
    });
    const wrapper = mount(Host);
    const radios = wrapper.findAllComponents(MatRadio);

    expect(wrapper.findAll('input').every((input) => input.element.disabled)).toBe(true);
    expect(radios[0].attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-secondary)');
    expect(radios[1].attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
  });

  it('位于 Group 中时警告并忽略子级模型', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const Host = defineComponent({
      components: {
        MatRadio,
        MatRadioGroup,
      },
      template: `
        <MatRadioGroup model-value="group" label="冲突示例">
          <MatRadio model-value="child" value="child">子项</MatRadio>
        </MatRadioGroup>
      `,
    });

    mount(Host);

    expect(warning).toHaveBeenCalledWith(
      'MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略',
    );
  });
});
/* eslint-enable vue/one-component-per-file */
