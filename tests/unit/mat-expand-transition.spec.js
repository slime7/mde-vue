import { mount } from '@vue/test-utils';
import {
  describe, expect, it,
} from 'vitest';
import {
  defineComponent, h, nextTick, ref, vShow, withDirectives,
} from 'vue';
import { MatExpandTransition } from '../../src';

/**
 * 等待 Vue Transition 的 leave 流程跨过双帧后才结算。
 *
 * @returns {Promise<void>}
 */
function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/**
 * 关闭 VTU 默认的 transition 桩，验证真实过渡容器行为。
 *
 * @param {() => unknown} render 宿主渲染函数，返回包含 MatExpandTransition 的子树。
 * @returns {import('@vue/test-utils').VueWrapper} 宿主包装器。
 */
function mountHost(render) {
  return mount(defineComponent({ setup: () => render }), {
    global: {
      stubs: { transition: false },
    },
  });
}

describe('MatExpandTransition', () => {
  it('不引入包装元素，由外部状态经 v-show 直接驱动显隐', async () => {
    const open = ref(false);
    const wrapper = mountHost(() => h('div', { class: 'host' }, [
      h(MatExpandTransition, () => withDirectives(
        h('div', { class: 'panel' }, '折叠内容'),
        [[vShow, open.value]],
      )),
    ]));
    const panel = wrapper.find('.panel');

    expect(panel.exists()).toBe(true);
    expect(panel.element.style.display).toBe('none');
    expect(panel.element.parentElement).toBe(wrapper.find('.host').element);

    open.value = true;
    await nextTick();
    expect(wrapper.find('.panel').element.style.display).not.toBe('none');
    expect(wrapper.find('.panel').text()).toBe('折叠内容');

    open.value = false;
    await nextFrame();
    await nextTick();
    expect(wrapper.find('.panel').element.style.display).toBe('none');
  });

  it('由外部状态经 v-if 切换内容挂载与卸载', async () => {
    const open = ref(false);
    const wrapper = mountHost(() => h('div', { class: 'host' }, [
      h(MatExpandTransition, () => (open.value
        ? h('div', { class: 'panel' }, '条件内容')
        : null)),
    ]));

    expect(wrapper.find('.panel').exists()).toBe(false);

    open.value = true;
    await nextTick();
    expect(wrapper.find('.panel').exists()).toBe(true);
    expect(wrapper.find('.panel').text()).toBe('条件内容');
    expect(wrapper.find('.panel').element.parentElement).toBe(wrapper.find('.host').element);

    open.value = false;
    await nextFrame();
    await nextTick();
    expect(wrapper.find('.panel').exists()).toBe(false);
  });
});
