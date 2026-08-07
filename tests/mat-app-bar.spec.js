import { createApp, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MatAppBar from '../src/components/mat-app-bar/MatAppBar.vue';
import MatAppBarSearch from '../src/components/mat-app-bar/MatAppBarSearch.vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import * as library from '../src';
import { createMatUi } from '../src/plugin.js';

describe('MatAppBar', () => {
  it('从包根入口导出，并由 createMatUi 全局注册两种组件名称', () => {
    expect(library.MatAppBar).toBe(MatAppBar);
    expect(library.MatAppBarSearch).toBe(MatAppBarSearch);

    const app = createApp({ render: () => null });

    app.use(createMatUi());
    expect(app.component('MatAppBar')).toBe(MatAppBar);
    expect(app.component('mat-app-bar')).toBe(MatAppBar);
    expect(app.component('MatAppBarSearch')).toBe(MatAppBarSearch);
    expect(app.component('mat-app-bar-search')).toBe(MatAppBarSearch);
  });

  it('在同一个默认 Slot 主内容区承载标题、图片或搜索内容', () => {
    const cases = [
      { content: 'headline', node: h('span', '项目概览') },
      { content: 'image', node: h('img', { alt: '产品标志', src: '/logo.svg' }) },
      { content: 'search', node: h(MatAppBarSearch, { modelValue: '' }) },
    ];

    cases.forEach(({ content, node }) => {
      const wrapper = mount(MatAppBar, {
        props: { content },
        slots: { default: () => node },
      });
      const header = wrapper.get('header');

      if (content === 'headline') {
        expect(header.text()).toContain('项目概览');
      } else if (content === 'image') {
        expect(header.get('img').attributes('alt')).toBe('产品标志');
      } else {
        expect(header.get('input[type="search"]').exists()).toBe(true);
      }

      wrapper.unmount();
    });
  });

  it('按 leading、subtitle、trailing 的语义顺序呈现内容', () => {
    const wrapper = mount(MatAppBar, {
      slots: {
        default: () => '文档',
        leading: () => h('button', { 'aria-label': '返回' }),
        subtitle: () => '最近编辑',
        trailing: () => h('button', { 'aria-label': '更多' }),
      },
    });

    expect(wrapper.get('header').text()).toContain('文档');
    expect(wrapper.get('header').text()).toContain('最近编辑');
    expect(wrapper.get('button[aria-label="返回"]').exists()).toBe(true);
    expect(wrapper.get('button[aria-label="更多"]').exists()).toBe(true);
  });

  it('app 模式接入最近的 MatAppRoot，显式 attach 时优先挂载到目标', async () => {
    const appWrapper = mount(MatAppRoot, {
      attachTo: document.body,
      slots: {
        default: () => h(MatAppBar, { app: true }, () => '应用标题'),
      },
    });

    await nextTick();
    expect(appWrapper.element.querySelector('header')?.textContent).toContain('应用标题');
    appWrapper.unmount();

    const target = document.createElement('div');
    document.body.append(target);
    const wrapper = mount(MatAppBar, {
      attachTo: document.body,
      props: { app: true, attach: target },
      slots: { default: () => '显式目标' },
    });

    await nextTick();
    expect(target.querySelector('header')?.textContent).toContain('显式目标');
    wrapper.unmount();
  });
});

describe('MatAppBarSearch', () => {
  it('实时更新 v-model，并通过 Enter 或搜索按钮提交当前查询', async () => {
    const wrapper = mount(MatAppBarSearch, {
      props: { modelValue: '' },
    });
    const input = wrapper.get('input[type="search"]');

    await input.setValue('Material Expressive');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Material Expressive']);

    await wrapper.setProps({ modelValue: 'Material Expressive' });
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('search')?.at(-1)).toEqual(['Material Expressive']);

    await wrapper.get('button[type="button"]').trigger('click');
    expect(wrapper.emitted('search')).toHaveLength(2);
  });

  it('把输入属性和状态传给原生 input，并把 class 与 style 留在搜索容器', () => {
    const wrapper = mount(MatAppBarSearch, {
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

  it('公开 focusInput() 与 getInput()', () => {
    const wrapper = mount(MatAppBarSearch, {
      attachTo: document.body,
      props: { modelValue: '' },
    });
    const input = wrapper.get('input').element;

    wrapper.vm.focusInput();
    expect(document.activeElement).toBe(input);
    expect(wrapper.vm.getInput()).toBe(input);
  });
});
