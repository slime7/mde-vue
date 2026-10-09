import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import MatList from '../../src/components/mat-list/MatList.vue';
import MatListItem from '../../src/components/mat-list/MatListItem.vue';
import MatBtn from '../../src/components/mat-btn/MatBtn.vue';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

async function settle() {
  await nextTick();
  await nextTick();
}

/**
 * 推进移除退场动画（滑出 + 收拢）使用的兜底计时器。
 */
async function settleSwipeExit() {
  await vi.advanceTimersByTimeAsync(900);
  await settle();
}

/**
 * @param {import('@vue/test-utils').DOMWrapper<Element>} elementWrapper
 */
function dragTouch(elementWrapper, moves, { endType = 'pointerup', pointerType = 'touch' } = {}) {
  const { element } = elementWrapper;

  const fire = (type, x, y) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, {
      pointerId: 1,
      isPrimary: true,
      pointerType,
      clientX: x,
      clientY: y,
    });
    element.dispatchEvent(event);
  };

  fire('pointerdown', 200, 20);
  moves.forEach(([x, y]) => fire('pointermove', x, y));
  fire(endType, moves.at(-1)?.[0] ?? 200, moves.at(-1)?.[1] ?? 20);
}

function mountListItem(slots = {}, itemProps = {}, listProps = {}) {
  return mount({
    components: { MatList, MatListItem },
    setup() {
      return () => h(
        MatList,
        { interaction: 'none', ...listProps },
        {
          default: () => [
            h(MatListItem, { value: 'a', ...itemProps }, () => '项目内容'),
          ],
          ...slots,
        },
      );
    },
  });
}

describe('MatListItem 滑动手势', () => {
  it('默认关闭滑动：触摸拖动不产生滑动事件', async () => {
    const wrapper = mountListItem();
    await settle();

    dragTouch(wrapper.find('li'), [[150, 20], [80, 20]]);
    await settle();

    expect(wrapper.findComponent(MatListItem).emitted('swipestart')).toBeUndefined();
    expect(wrapper.findComponent(MatListItem).emitted('swipeend')).toBeUndefined();
  });

  it('启用后触摸横向拖动发出 swipestart 与 swipeend，载荷包含方向与距离', async () => {
    const wrapper = mountListItem({}, { swipeable: true });
    await settle();

    dragTouch(wrapper.find('li'), [[180, 20], [120, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('swipestart')).toEqual([[{ direction: 'start' }]]);
    const endPayload = item.emitted('swipeend')?.[0]?.[0];
    expect(endPayload.direction).toBe('start');
    expect(endPayload.distance).toBeGreaterThan(0);
    expect(endPayload.action).toBe('none');
  });

  it('纵向占优的触摸移动不触发滑动手势', async () => {
    const wrapper = mountListItem({}, { swipeable: true });
    await settle();

    dragTouch(wrapper.find('li'), [[204, 60], [206, 140]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('swipestart')).toBeUndefined();
    expect(item.emitted('swipeend')).toBeUndefined();
  });

  it('鼠标拖动不触发滑动手势', async () => {
    const wrapper = mountListItem({}, { swipeable: true });
    await settle();

    dragTouch(
      wrapper.find('li'),
      [[180, 20], [120, 20]],
      { pointerType: 'mouse' },
    );
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('swipestart')).toBeUndefined();
  });

  it('配置 swipeRemove 后越过阈值释放发出 remove 请求', async () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountListItem({}, { swipeable: true, swipeRemove: true });
    await settle();

    dragTouch(wrapper.find('li'), [[160, 20], [60, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('swipeend')?.[0]?.[0].action).toBe('remove');
    /* 退场动画结束前不发出移除请求。 */
    expect(item.emitted('remove')).toBeUndefined();

    await settleSwipeExit();
    expect(item.emitted('remove')).toEqual([[{ direction: 'start' }]]);
    expect(warn).not.toHaveBeenCalled();
  });

  it('退场动画期间保持移出状态，动画结束后才请求移除并可在未删除时恢复', async () => {
    vi.useFakeTimers();
    const wrapper = mountListItem({}, { swipeable: true, swipeRemove: true });
    await settle();

    dragTouch(wrapper.find('li'), [[160, 20], [60, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    const front = wrapper.find('.mat-list-item__swipe-front');
    expect(item.emitted('remove')).toBeUndefined();

    /* 前景沿滑动方向移出项目边界。 */
    await vi.advanceTimersByTimeAsync(450);
    await settle();
    expect(front.attributes('style')).toContain('translateX(-1px)');
    expect(item.emitted('remove')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(450);
    await settle();
    expect(item.emitted('remove')).toEqual([[{ direction: 'start' }]]);

    /* 应用未移除数据时在宽限期后回到静止状态。 */
    await vi.advanceTimersByTimeAsync(600);
    await settle();
    expect(front.attributes('style')).toContain('translateX(0px)');
  });

  it('位移不足时释放不发出 remove 且 action 为 none', async () => {
    const wrapper = mountListItem({}, { swipeable: true, swipeRemove: true });
    await settle();

    dragTouch(wrapper.find('li'), [[190, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('remove')).toBeUndefined();
    expect(item.emitted('swipeend')?.[0]?.[0].action).toBe('none');
  });

  it('提供 swipe-actions 插槽时优先进入露出模式而非移除', async () => {
    const wrapper = mount({
      components: { MatList, MatListItem, MatBtn },
      setup() {
        return () => h(MatList, { interaction: 'none' }, {
          default: () => [
            h(MatListItem, { value: 'a', swipeable: true, swipeRemove: true }, {
              default: () => '项目内容',
              'swipe-actions': () => h(MatBtn, { icon: 'archive', label: '归档' }),
            }),
          ],
        });
      },
    });
    await settle();

    dragTouch(wrapper.find('li'), [[160, 20], [60, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('remove')).toBeUndefined();
    expect(item.emitted('swipeend')?.[0]?.[0].action).toBe('reveal');
  });

  it('swipe 方法以函数触发同一套滑动事件，resetSwipe 复位且不发事件', async () => {
    vi.useFakeTimers();
    const wrapper = mountListItem({}, { swipeable: true, swipeRemove: true });
    await settle();

    const item = wrapper.findComponent(MatListItem);
    item.vm.swipe('start');
    await settleSwipeExit();

    expect(item.emitted('swipestart')).toEqual([[{ direction: 'start' }]]);
    expect(item.emitted('remove')).toEqual([[{ direction: 'start' }]]);
    expect(item.emitted('swipeend')?.[0]?.[0].action).toBe('remove');

    const emittedCount = item.emitted('swipeend').length;
    item.vm.resetSwipe();
    await settle();
    expect(item.emitted('swipeend')).toHaveLength(emittedCount);
  });

  it('resetSwipe 在退场动画中途取消，不再发出 remove', async () => {
    vi.useFakeTimers();
    const wrapper = mountListItem({}, { swipeable: true, swipeRemove: true });
    await settle();

    const item = wrapper.findComponent(MatListItem);
    item.vm.swipe('start');
    await settle();

    item.vm.resetSwipe();
    await settleSwipeExit();

    expect(item.emitted('remove')).toBeUndefined();
    expect(wrapper.find('.mat-list-item__swipe-front').attributes('style')).toContain('translateX(0px)');
  });

  it('禁用项目不响应滑动手势', async () => {
    const wrapper = mountListItem({}, { swipe: true, disabled: true });
    await settle();

    dragTouch(wrapper.find('li'), [[160, 20], [60, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('swipestart')).toBeUndefined();
    expect(item.emitted('swipeend')).toBeUndefined();
  });

  it('在不支持滑动的列表结构中给出开发警告并忽略手势', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountListItem({}, { swipeable: true }, { interaction: 'multi-action' });
    await settle();

    dragTouch(wrapper.find('li'), [[160, 20], [60, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('swipestart')).toBeUndefined();
    expect(warn).toHaveBeenCalled();
  });

  it('配置 swipePrimary 后越过阈值长划发出 primary 请求且 action 为 primary', async () => {
    const wrapper = mount({
      components: { MatList, MatListItem, MatBtn },
      setup() {
        return () => h(MatList, { interaction: 'none' }, {
          default: () => [
            h(MatListItem, { value: 'a', swipeable: true, swipePrimary: true }, {
              default: () => '项目内容',
              'swipe-actions': () => [
                h(MatBtn, { icon: 'star', label: '收藏' }),
                h(MatBtn, { icon: 'edit', label: '编辑' }),
              ],
            }),
          ],
        });
      },
    });
    await settle();

    dragTouch(wrapper.find('li'), [[160, 20], [20, 20]]);
    await settle();

    const item = wrapper.findComponent(MatListItem);
    expect(item.emitted('primary')).toEqual([[{ direction: 'start' }]]);
    expect(item.emitted('swipeend')?.[0]?.[0].action).toBe('primary');
  });

  it('reveal 与 close 方法支持以函数控制操作展开与收回', async () => {
    const wrapper = mount({
      components: { MatList, MatListItem, MatBtn },
      setup() {
        return () => h(MatList, { interaction: 'none' }, {
          default: () => [
            h(MatListItem, { value: 'a', swipeable: true }, {
              default: () => '项目内容',
              'swipe-actions': () => h(MatBtn, { icon: 'archive', label: '归档' }),
            }),
          ],
        });
      },
    });
    await settle();

    const item = wrapper.findComponent(MatListItem);
    item.vm.reveal();
    await settle();

    expect(item.emitted('swipeend')?.[0]?.[0].action).toBe('reveal');

    item.vm.close();
    await settle();
  });

  it('滑动达阈值时具备 swiping 类，露出时具备 swiped 类', async () => {
    const wrapper = mount({
      components: { MatList, MatListItem, MatBtn },
      setup() {
        return () => h(MatList, { interaction: 'none' }, {
          default: () => [
            h(MatListItem, { value: 'a', swipeable: true }, {
              default: () => '项目内容',
              'swipe-actions': () => h(MatBtn, { icon: 'archive', label: '归档' }),
            }),
          ],
        });
      },
    });
    await settle();

    const li = wrapper.find('li');
    expect(li.classes()).not.toContain('mat-list-item--swiped');

    const item = wrapper.findComponent(MatListItem);
    item.vm.reveal();
    await settle();

    expect(li.classes()).toContain('mat-list-item--swiped');

    item.vm.close();
    await settle();
    expect(li.classes()).not.toContain('mat-list-item--swiped');
  });

  it('更新 value 时自动复位滑动状态，未滑动的后续条目不继承移除动画', async () => {
    vi.useFakeTimers();
    const wrapper = mount({
      components: { MatList, MatListItem },
      props: {
        val: {
          type: String,
          default: 'item-1',
        },
      },
      setup(props) {
        return () => h(MatList, { interaction: 'none' }, {
          default: () => [
            h(MatListItem, { value: props.val, swipeable: true, swipeRemove: true }, () => `内容 ${props.val}`),
          ],
        });
      },
    });
    await settle();

    const item = wrapper.findComponent(MatListItem);
    item.vm.swipe('start');
    await settleSwipeExit();

    expect(item.emitted('remove')).toEqual([[{ direction: 'start' }]]);

    // 模拟父级在复用组件时更新 value 为新条目
    await wrapper.setProps({ val: 'item-2' });
    await settle();

    // 检查内部位移已重置为 0
    const front = wrapper.find('.mat-list-item__swipe-front');
    expect(front.attributes('style')).toContain('translateX(0px)');
  });
});
