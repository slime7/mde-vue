import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MatSearch from '../src/components/mat-search/MatSearch.vue';

describe('MatSearch', () => {
  it('独立渲染搜索表单，实时更新 v-model，并通过 Enter 或搜索按钮提交当前查询', async () => {
    const wrapper = mount(MatSearch, {
      props: { modelValue: '' },
    });
    const input = wrapper.get('input[type="search"]');

    expect(wrapper.get('form[role="search"]').exists()).toBe(true);

    await input.setValue('Material Expressive');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Material Expressive']);

    await wrapper.setProps({ modelValue: 'Material Expressive' });
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('search')?.at(-1)).toEqual(['Material Expressive']);

    await wrapper.get('button[type="button"]').trigger('click');
    expect(wrapper.emitted('search')).toHaveLength(2);
  });

  it('禁用时阻止 Enter 和默认搜索按钮提交', async () => {
    const wrapper = mount(MatSearch, {
      props: {
        disabled: true,
        modelValue: 'Material Expressive',
      },
    });
    const input = wrapper.get('input[type="search"]');

    await input.trigger('keydown.enter');
    await wrapper.get('button[type="button"]').trigger('click');

    expect(wrapper.emitted('search')).toBeUndefined();
  });

  it('把输入属性和状态传给原生 input，并把 class 与 style 留在搜索容器', () => {
    const wrapper = mount(MatSearch, {
      attrs: {
        'aria-describedby': 'search-help',
        autocomplete: 'off',
        class: 'page-search',
        style: 'inline-size: 30rem;',
      },
      props: {
        disabled: true,
        label: '搜索文档',
        maxLength: 40,
        modelValue: '',
        readonly: true,
      },
    });
    const input = wrapper.get('input');

    expect(wrapper.classes()).toContain('page-search');
    expect(wrapper.attributes('style')).toContain('inline-size: 30rem');
    expect(input.attributes('aria-label')).toBe('搜索文档');
    expect(input.attributes('aria-describedby')).toBe('search-help');
    expect(input.attributes('autocomplete')).toBe('off');
    expect(input.attributes('disabled')).toBeDefined();
    expect(input.attributes('readonly')).toBeDefined();
    expect(input.attributes('maxlength')).toBe('40');
  });

  it('保留 leading 与 trailing Slots', () => {
    const wrapper = mount(MatSearch, {
      props: { modelValue: '' },
      slots: {
        leading: () => h('button', { 'aria-label': '自定义搜索', type: 'button' }),
        trailing: () => h('button', { 'aria-label': '清空', type: 'button' }),
      },
    });

    expect(wrapper.get('button[aria-label="自定义搜索"]').exists()).toBe(true);
    expect(wrapper.get('button[aria-label="清空"]').exists()).toBe(true);
  });

  it('公开 focusInput() 与 getInput()', () => {
    const wrapper = mount(MatSearch, {
      attachTo: document.body,
      props: { modelValue: '' },
    });
    const input = wrapper.get('input').element;

    wrapper.vm.focusInput();
    expect(document.activeElement).toBe(input);
    expect(wrapper.vm.getInput()).toBe(input);
  });
});
