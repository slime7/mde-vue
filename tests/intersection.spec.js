import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { Intersection } from '../src/directives/intersection';

let observers;

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observe = vi.fn();
    this.unobserve = vi.fn();
    this.disconnect = vi.fn();
    observers.push(this);
  }

  trigger(entries) {
    this.callback(entries, this);
  }
}

function mountHost(binding, modifiers = '') {
  const directive = modifiers ? `v-intersection.${modifiers}` : 'v-intersection';

  return mount({
    data: () => ({ binding }),
    directives: { intersection: Intersection },
    template: `<div ${directive}="binding">目标</div>`,
  });
}

describe('v-intersection', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    observers = [];
  });

  it('支持函数绑定并传递相交状态、entries 和 observer', async () => {
    observers = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const handler = vi.fn();
    const wrapper = mountHost(handler);
    const observer = observers[0];
    const entries = [{ isIntersecting: false }, { isIntersecting: true }];

    expect(observer.observe).toHaveBeenCalledWith(wrapper.element);
    observer.trigger(entries);

    expect(handler).toHaveBeenCalledWith(true, entries, observer);
  });

  it('支持对象绑定并将 options 传给 IntersectionObserver', () => {
    observers = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const options = { rootMargin: '10px', threshold: 0.5 };
    const handler = vi.fn();
    mountHost({ handler, options });

    expect(observers[0].options).toEqual(options);
  });

  it('quiet 跳过首次回调，once 在首次相交后停止观察', () => {
    observers = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const handler = vi.fn();
    const wrapper = mountHost(handler, 'quiet.once');
    const observer = observers[0];

    observer.trigger([{ isIntersecting: false }]);
    expect(handler).not.toHaveBeenCalled();
    observer.trigger([{ isIntersecting: true }]);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(observer.unobserve).toHaveBeenCalledWith(wrapper.element);
  });

  it('更新绑定时重建观察器，卸载时解除观察', async () => {
    observers = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const wrapper = mountHost(firstHandler);
    const firstObserver = observers[0];

    await wrapper.setData({ binding: secondHandler });

    expect(firstObserver.unobserve).toHaveBeenCalledWith(wrapper.element);
    expect(observers).toHaveLength(2);
    wrapper.unmount();
    expect(observers[1].unobserve).toHaveBeenCalledWith(wrapper.element);
  });

  it('浏览器不支持 IntersectionObserver 时不创建观察器', () => {
    observers = [];
    vi.stubGlobal('IntersectionObserver', undefined);
    const wrapper = mountHost(vi.fn());

    expect(wrapper.exists()).toBe(true);
    expect(observers).toHaveLength(0);
  });
});
