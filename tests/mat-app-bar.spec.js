import { createApp, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MatAppBar from '../src/components/mat-app-bar/MatAppBar.vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import MatSearch from '../src/components/mat-search/MatSearch.vue';
import * as library from '../src';
import { createMatUi } from '../src/plugin.js';

describe('MatAppBar', () => {
  it('从包根入口导出，并由 createMatUi 全局注册 App bar 与 Search 名称', () => {
    expect(library.MatAppBar).toBe(MatAppBar);
    expect(library.MatSearch).toBe(MatSearch);
    expect(Object.hasOwn(library, 'MatAppBarSearch')).toBe(false);

    const app = createApp({ render: () => null });

    app.use(createMatUi());
    expect(app.component('MatAppBar')).toBe(MatAppBar);
    expect(app.component('mat-app-bar')).toBe(MatAppBar);
    expect(app.component('MatSearch')).toBe(MatSearch);
    expect(app.component('mat-search')).toBe(MatSearch);
    expect(app.component('MatAppBarSearch')).toBeUndefined();
    expect(app.component('mat-app-bar-search')).toBeUndefined();
  });

  it('在同一个默认 Slot 主内容区承载标题、图片或搜索内容', () => {
    const cases = [
      { content: 'headline', node: h('span', '项目概览') },
      { content: 'image', node: h('img', { alt: '产品标志', src: '/logo.svg' }) },
      { content: 'search', node: h(MatSearch, { modelValue: '' }) },
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
