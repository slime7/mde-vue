import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick } from 'vue';
import MatAppRoot from '../../src/components/mat-app-root/MatAppRoot.vue';
import MatLayout from '../../src/components/mat-layout/MatLayout.vue';
import MatNotification from '../../src/components/mat-notification/MatNotification.vue';

const wrappers = [];

async function settleRender() {
  await nextTick();
  await nextTick();
}

function notificationElement() {
  return document.body.querySelector('[role="status"]');
}

function mountNotification(options) {
  const wrapper = mount(MatNotification, { attachTo: document.body, ...options });

  wrappers.push(wrapper);
  return wrapper;
}

function mountHost(component) {
  const wrapper = mount(component, { attachTo: document.body });

  wrappers.push(wrapper);
  return wrapper;
}

describe('MatNotification', () => {
  afterEach(() => {
    wrappers.splice(0).reverse().forEach((wrapper) => wrapper.unmount());
    vi.useRealTimers();
  });

  it('渲染标题、正文、时间和默认关闭按钮', async () => {
    mountNotification({
      props: {
        icon: 'download_done',
        modelValue: true,
        text: '文件已保存到下载目录。',
        time: '刚刚',
        title: '下载完成',
      },
    });

    await settleRender();

    const element = notificationElement();

    expect(element).not.toBeNull();
    expect(element.textContent).toContain('下载完成');
    expect(element.textContent).toContain('文件已保存到下载目录。');
    expect(element.textContent).toContain('刚刚');
    expect(element.querySelector('button[aria-label="关闭"]')).not.toBeNull();
  });

  it('默认 Slot 替代 text，icon Slot 替代 icon', async () => {
    mountNotification({
      props: {
        icon: 'cloud',
        modelValue: true,
        text: '属性正文',
        title: '属性标题',
      },
      slots: {
        default: () => h('p', null, 'Slot 正文'),
        icon: () => h('span', { 'data-test': 'custom-icon' }, 'I'),
      },
    });

    await settleRender();

    const element = notificationElement();

    expect(element.textContent).toContain('属性标题');
    expect(element.textContent).toContain('Slot 正文');
    expect(element.textContent).not.toContain('属性正文');
    expect(element.textContent).not.toContain('cloud');
    expect(element.querySelector('[data-test="custom-icon"]')).not.toBeNull();
  });

  it('最多展示三个 action，触发时派发载荷并关闭', async () => {
    vi.useFakeTimers();
    const wrapper = mountNotification({
      props: {
        actions: [
          { icon: 'open_in_new', text: '查看' },
          { text: '撤销' },
          { text: '稍后' },
          { text: '第四项' },
        ],
        modelValue: true,
        title: '任务完成',
      },
    });

    await settleRender();

    const element = notificationElement();

    expect(element.textContent).toContain('查看');
    expect(element.textContent).toContain('撤销');
    expect(element.textContent).toContain('稍后');
    expect(element.textContent).not.toContain('第四项');

    const action = [...element.querySelectorAll('button')]
      .find((button) => button.textContent.includes('撤销'));

    expect(action).not.toBeUndefined();
    action.click();
    await settleRender();

    expect(wrapper.emitted('action')).toEqual([[
      { action: { text: '撤销' }, index: 1 },
    ]]);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);

    await vi.advanceTimersByTimeAsync(200);
    await settleRender();

    expect(wrapper.emitted('closed')).toHaveLength(1);
    expect(notificationElement()).toBeNull();
  });

  it('actions Slot 替代默认操作并接收 action 与 close', async () => {
    const wrapper = mountNotification({
      props: {
        actions: [{ text: '属性操作' }],
        modelValue: true,
        title: '自定义操作',
      },
      slots: {
        actions: ({ actions, action }) => h('button', {
          type: 'button',
          onClick: () => action(actions[0], 0),
        }, 'Slot 操作'),
      },
    });

    await settleRender();

    const element = notificationElement();

    expect(element.textContent).toContain('Slot 操作');
    expect(element.textContent).not.toContain('属性操作');

    element.querySelector('button').click();
    await settleRender();

    expect(wrapper.emitted('action')).toEqual([[
      { action: { text: '属性操作' }, index: 0 },
    ]]);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('关闭按钮请求 v-model 关闭，退出动画完成后移除并触发 closed', async () => {
    vi.useFakeTimers();
    const wrapper = mountNotification({
      props: {
        closeLabel: '关闭通知',
        modelValue: true,
        title: '可关闭通知',
      },
    });

    await settleRender();

    const closeButton = notificationElement()
      .querySelector('button[aria-label="关闭通知"]');

    expect(closeButton).not.toBeNull();
    closeButton.click();
    await settleRender();

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(notificationElement()).not.toBeNull();
    expect(wrapper.emitted('closed')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(199);
    await settleRender();

    expect(wrapper.emitted('closed')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(wrapper.emitted('closed')).toHaveLength(1);
    expect(notificationElement()).toBeNull();
  });

  it('closable=false 且没有 close Slot 时不显示关闭按钮', async () => {
    mountNotification({
      props: {
        closable: false,
        modelValue: true,
        title: '不可关闭的通知',
      },
    });

    await settleRender();

    expect(notificationElement().querySelector('button[aria-label="关闭"]')).toBeNull();
  });

  it('close Slot 替代默认关闭按钮并接收 close', async () => {
    const wrapper = mountNotification({
      props: {
        modelValue: true,
        title: '自定义关闭',
      },
      slots: {
        close: ({ close }) => h('button', {
          'aria-label': '关闭自定义通知',
          type: 'button',
          onClick: close,
        }, 'X'),
      },
    });

    await settleRender();

    const element = notificationElement();
    const closeButton = element.querySelector('button[aria-label="关闭自定义通知"]');

    expect(closeButton).not.toBeNull();
    expect(element.querySelector('button[aria-label="关闭"]')).toBeNull();

    closeButton.click();
    await settleRender();

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('无内容时警告、请求关闭且不渲染卡片', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountNotification({
      props: { modelValue: true },
    });

    await settleRender();

    expect(warn).toHaveBeenCalledWith('MatNotification: 必须通过 title、text 或默认 Slot 提供内容');
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(notificationElement()).toBeNull();
  });

  it('外部 modelValue 控制显示与退出', async () => {
    vi.useFakeTimers();
    const wrapper = mountNotification({
      props: {
        modelValue: false,
        title: '受控通知',
      },
    });

    await settleRender();

    expect(notificationElement()).toBeNull();

    await wrapper.setProps({ modelValue: true });
    await settleRender();

    expect(notificationElement()).not.toBeNull();

    await wrapper.setProps({ modelValue: false });
    await settleRender();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(200);
    await settleRender();

    expect(wrapper.emitted('closed')).toHaveLength(1);
    expect(notificationElement()).toBeNull();
  });

  it('独立使用时保留自然布局位置', async () => {
    mountHost({
      components: { MatNotification },
      data() {
        return { open: true };
      },
      template: `
        <div data-test="host">
          <MatNotification v-model="open" title="内联通知" />
        </div>
      `,
    });

    await settleRender();
    await settleRender();

    const element = notificationElement();

    expect(element).not.toBeNull();
    expect(document.querySelector('[data-test="host"]').contains(element)).toBe(true);
  });

  it('位于 MatLayout 时自动挂载到布局根', async () => {
    const wrapper = mountHost({
      components: { MatLayout, MatNotification },
      data() {
        return { open: true };
      },
      template: `
        <MatLayout>
          <div data-test="host">
            <MatNotification v-model="open" title="布局通知" />
          </div>
        </MatLayout>
      `,
    });

    await settleRender();
    await settleRender();
    await settleRender();

    const element = notificationElement();

    expect(element).not.toBeNull();
    expect(document.querySelector('[data-test="host"]').contains(element)).toBe(false);
    expect(wrapper.element.contains(element)).toBe(true);
  });

  it('位于 MatAppRoot 时自动挂载到应用覆盖层', async () => {
    const wrapper = mountHost({
      components: { MatAppRoot, MatNotification },
      data() {
        return { open: true };
      },
      template: `
        <MatAppRoot>
          <div data-test="host">
            <MatNotification v-model="open" title="应用通知" />
          </div>
        </MatAppRoot>
      `,
    });

    await settleRender();
    await settleRender();
    await settleRender();

    const element = notificationElement();

    expect(element).not.toBeNull();
    expect(document.querySelector('[data-test="host"]').contains(element)).toBe(false);
    expect(wrapper.element.contains(element)).toBe(true);
  });

  it('同时位于 AppRoot 与 Layout 时使用最近的 Layout', async () => {
    const wrapper = mountHost({
      components: { MatAppRoot, MatLayout, MatNotification },
      data() {
        return { open: true };
      },
      template: `
        <MatAppRoot>
          <MatLayout>
            <div data-test="host">
              <MatNotification v-model="open" title="最近布局通知" />
            </div>
          </MatLayout>
        </MatAppRoot>
      `,
    });

    await settleRender();
    await settleRender();
    await settleRender();

    const element = notificationElement();
    const layoutElement = wrapper.findComponent(MatLayout).element;

    expect(element).not.toBeNull();
    expect(layoutElement.contains(element)).toBe(true);
    expect(document.querySelector('[data-test="host"]').contains(element)).toBe(false);
  });

  it('app=false 时位于 MatLayout 内仍保持自然布局', async () => {
    mountHost({
      components: { MatLayout, MatNotification },
      data() {
        return { open: true };
      },
      template: `
        <MatLayout>
          <div data-test="host">
            <MatNotification v-model="open" :app="false" title="自然布局通知" />
          </div>
        </MatLayout>
      `,
    });

    await settleRender();
    await settleRender();
    await settleRender();

    const element = notificationElement();

    expect(element).not.toBeNull();
    expect(document.querySelector('[data-test="host"]').contains(element)).toBe(true);
  });

  it('app=false 时位于 MatAppRoot 内仍保持自然布局', async () => {
    mountHost({
      components: { MatAppRoot, MatNotification },
      data() {
        return { open: true };
      },
      template: `
        <MatAppRoot>
          <div data-test="host">
            <MatNotification v-model="open" :app="false" title="应用内自然布局通知" />
          </div>
        </MatAppRoot>
      `,
    });

    await settleRender();
    await settleRender();
    await settleRender();

    const element = notificationElement();

    expect(element).not.toBeNull();
    expect(document.querySelector('[data-test="host"]').contains(element)).toBe(true);
  });

  it('动态切换 app 会在自然布局和自动定位之间移动', async () => {
    const wrapper = mountHost({
      components: { MatLayout, MatNotification },
      data() {
        return { app: false, open: true };
      },
      template: `
        <MatLayout>
          <div data-test="host">
            <MatNotification v-model="open" :app="app" title="切换定位" />
          </div>
        </MatLayout>
      `,
    });

    await settleRender();
    await settleRender();

    const host = document.querySelector('[data-test="host"]');

    expect(host.contains(notificationElement())).toBe(true);

    wrapper.vm.app = true;
    await settleRender();
    await settleRender();

    expect(host.contains(notificationElement())).toBe(false);
    expect(wrapper.element.contains(notificationElement())).toBe(true);

    wrapper.vm.app = false;
    await settleRender();
    await settleRender();

    expect(host.contains(notificationElement())).toBe(true);
  });
});
