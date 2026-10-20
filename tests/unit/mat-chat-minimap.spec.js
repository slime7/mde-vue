import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { nextTick } from 'vue';
import MatChatMinimap from '../../src/components/mat-chat-minimap/MatChatMinimap.vue';

async function settleRender() {
  await nextTick();
  await nextTick();
}

/**
 * @param {import('@vue/test-utils').VueWrapper} wrapper
 * @returns {import('@vue/test-utils').DOMWrapper<HTMLElement>[]}
 */
function getItems(wrapper) {
  return wrapper.findAll('.mat-chat-minimap__item');
}

/**
 * @param {HTMLElement} element
 * @returns {Promise<void>}
 */
async function hover(element) {
  element.dispatchEvent(new MouseEvent('mouseenter'));
  await settleRender();
  await vi.advanceTimersByTimeAsync(0);
  await settleRender();
}

describe('MatChatMinimap', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('按 items 渲染条目，并通过 Rich tooltip 展示 item.tooltip 内容', async () => {
    const wrapper = mount(MatChatMinimap, {
      attachTo: document.body,
      props: {
        items: [
          { id: 'first', tooltip: { subhead: '第一条', content: '第一段说明' } },
          { id: 'second', tooltip: { subhead: '第二条', content: '第二段说明' } },
        ],
      },
    });

    await settleRender();

    const items = getItems(wrapper);

    expect(items).toHaveLength(2);

    await hover(items[1].element);

    const tooltip = document.body.querySelector('[role="tooltip"]');

    expect(tooltip?.textContent).toContain('第二条');
    expect(tooltip?.textContent).toContain('第二段说明');
    expect(tooltip?.textContent).not.toContain('第一段说明');

    wrapper.unmount();
  });

  it('将 item.tooltip 的 openDelay 透传给内部 Tooltip', async () => {
    const wrapper = mount(MatChatMinimap, {
      attachTo: document.body,
      props: {
        items: [
          { tooltip: { content: '延迟提示', openDelay: 200 } },
        ],
      },
    });

    await settleRender();

    getItems(wrapper)[0].element.dispatchEvent(new MouseEvent('mouseenter'));
    await settleRender();
    await vi.advanceTimersByTimeAsync(199);

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await settleRender();

    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('延迟提示');

    wrapper.unmount();
  });

  it('点击条目时发出条目、索引和原始事件', async () => {
    const items = [
      { id: 'first', tooltip: { content: '第一段说明' } },
      { id: 'second', tooltip: { content: '第二段说明' } },
    ];
    const wrapper = mount(MatChatMinimap, {
      attachTo: document.body,
      props: { items },
    });

    await settleRender();

    await getItems(wrapper)[1].find('.mat-chat-minimap__bar').trigger('click');

    const events = wrapper.emitted('click');

    expect(events).toHaveLength(1);
    expect(events[0][0].item.id).toBe('second');
    expect(events[0][0].index).toBe(1);
    expect(events[0][0].originalEvent).toBeInstanceOf(MouseEvent);

    wrapper.unmount();
  });

  it('没有 tooltip 配置的条目只渲染短横线', async () => {
    const wrapper = mount(MatChatMinimap, {
      attachTo: document.body,
      props: {
        items: [{ id: 'silent' }],
      },
    });

    await settleRender();

    await hover(getItems(wrapper)[0].element);

    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();

    wrapper.unmount();
  });
});
