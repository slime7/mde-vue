import { mount } from '@vue/test-utils';
import {
  describe, expect, it,
} from 'vitest';
import {
  defineComponent, h, nextTick, ref,
} from 'vue';
import { MatSimpleExpansion } from '../../src';

/**
 * 挂载由外部状态经 v-model 驱动的简易折叠容器。
 *
 * @param {boolean} initialOpen 初始展开状态。
 * @returns {{
 *   open: import('vue').Ref<boolean>,
 *   wrapper: import('@vue/test-utils').VueWrapper,
 * }} 外部状态与宿主包装器。
 */
function mountExpansion(initialOpen) {
  const open = ref(initialOpen);
  const Host = defineComponent({
    setup() {
      return () => h('div', { class: 'host' }, [
        h(MatSimpleExpansion, { modelValue: open.value }, () => h(
          'p',
          { class: 'content' },
          '折叠内容',
        )),
      ]);
    },
  });

  return { open, wrapper: mount(Host) };
}

describe('MatSimpleExpansion', () => {
  it('默认折叠：内容保持挂载但离开无障碍树与焦点顺序', () => {
    const { wrapper } = mountExpansion(false);
    const content = wrapper.find('.content');

    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('折叠内容');

    const container = content.element.parentElement;

    expect(container.getAttribute('aria-hidden')).toBe('true');
    expect(container.hasAttribute('inert')).toBe(true);
  });

  it('v-model 置为 true 后内容回到无障碍树与焦点顺序', async () => {
    const { open, wrapper } = mountExpansion(false);
    const container = () => wrapper.find('.content').element.parentElement;

    open.value = true;
    await nextTick();

    expect(container().hasAttribute('aria-hidden')).toBe(false);
    expect(container().hasAttribute('inert')).toBe(false);
    expect(wrapper.find('.content').text()).toBe('折叠内容');
  });

  it('v-model 往返切换时无障碍状态同步恢复', async () => {
    const { open, wrapper } = mountExpansion(true);
    const container = () => wrapper.find('.content').element.parentElement;

    expect(container().hasAttribute('inert')).toBe(false);

    open.value = false;
    await nextTick();

    expect(container().getAttribute('aria-hidden')).toBe('true');
    expect(container().hasAttribute('inert')).toBe(true);

    open.value = true;
    await nextTick();

    expect(container().hasAttribute('inert')).toBe(false);
  });

  it('组件不含内部触发器，点击内容不发出 update:modelValue', async () => {
    const { wrapper } = mountExpansion(false);

    await wrapper.find('.content').trigger('click');

    expect(wrapper.findComponent(MatSimpleExpansion).emitted('update:modelValue')).toBeUndefined();
  });
});
