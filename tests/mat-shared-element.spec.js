import {
  describe, expect, it, vi,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MatSharedElement from '../src/components/mat-shared-element/MatSharedElement.vue';
import { useMatViewTransition } from '../src/view-transition.js';

describe('MatSharedElement', () => {
  it('默认不声明共享元素名称并支持自定义根元素', () => {
    const wrapper = mount(MatSharedElement, {
      props: {
        name: 'photo-1',
        as: 'article',
        style: { color: 'red' },
      },
      slots: {
        default: '<span>图片</span>',
      },
    });

    expect(wrapper.element.tagName).toBe('ARTICLE');
    expect(wrapper.element.style.viewTransitionName).toBe('');
    expect(wrapper.element.style.color).toBe('red');
    expect(wrapper.text()).toBe('图片');
  });

  it('disabled 时不声明共享元素名称', () => {
    const wrapper = mount(MatSharedElement, {
      props: {
        name: 'photo-1',
        disabled: true,
      },
    });

    expect(wrapper.element.style.viewTransitionName).toBe('');
  });
});

describe('useMatViewTransition', () => {
  it('只激活本次指定的共享名称并在完成后清理', async () => {
    const first = mount(MatSharedElement, { props: { name: 'photo-1' } });
    const second = mount(MatSharedElement, { props: { name: 'photo-2' } });
    let resolveFinished;
    const finished = new Promise((resolve) => {
      resolveFinished = resolve;
    });
    const startViewTransition = vi.fn((update) => {
      update();
      return {
        finished,
        skipTransition: vi.fn(),
      };
    });
    vi.stubGlobal('document', { startViewTransition });
    const controller = useMatViewTransition();
    const running = controller.start(() => {}, { names: ['photo-1'] });

    await vi.waitFor(() => expect(startViewTransition).toHaveBeenCalledOnce());

    expect(first.element.style.viewTransitionName).toBe('photo-1');
    expect(second.element.style.viewTransitionName).toBe('');

    resolveFinished();
    await running;
    await nextTick();

    expect(first.element.style.viewTransitionName).toBe('');
    expect(second.element.style.viewTransitionName).toBe('');
  });

  it('在支持 API 时运行状态更新并等待动画完成', async () => {
    const finished = Promise.resolve();
    const startViewTransition = vi.fn((update) => {
      update();
      return {
        finished,
        skipTransition: vi.fn(),
      };
    });
    vi.stubGlobal('document', { startViewTransition });
    const update = vi.fn();
    const controller = useMatViewTransition();

    await controller.start(update);

    expect(startViewTransition).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledOnce();
  });

  it('动画完成失败时仍清理共享名称', async () => {
    const wrapper = mount(MatSharedElement, { props: { name: 'photo-1' } });
    const error = new Error('transition failed');
    const startViewTransition = vi.fn((update) => {
      update();
      return {
        finished: Promise.reject(error),
        skipTransition: vi.fn(),
      };
    });
    vi.stubGlobal('document', { startViewTransition });
    const controller = useMatViewTransition();

    await expect(controller.start(() => {}, { names: 'photo-1' })).rejects.toThrow(error);
    await nextTick();

    expect(wrapper.element.style.viewTransitionName).toBe('');
  });

  it('不支持 API 或减少动态效果时直接运行状态更新', async () => {
    const update = vi.fn();
    const controller = useMatViewTransition();

    await controller.start(update);
    expect(update).toHaveBeenCalledOnce();

    vi.stubGlobal('document', { startViewTransition: vi.fn() });
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const reducedUpdate = vi.fn();

    await controller.start(reducedUpdate);
    expect(reducedUpdate).toHaveBeenCalledOnce();
  });

  it('再次触发时跳过正在进行的旧动画', async () => {
    let resolveFinished;
    const finished = new Promise((resolve) => {
      resolveFinished = resolve;
    });
    const skipTransition = vi.fn(() => resolveFinished());
    const startViewTransition = vi.fn((update) => {
      update();
      return { finished, skipTransition };
    });
    vi.stubGlobal('document', { startViewTransition });
    const controller = useMatViewTransition();
    const firstUpdate = vi.fn();
    const secondUpdate = vi.fn();

    const first = controller.start(firstUpdate);
    const second = controller.start(secondUpdate);
    await Promise.all([first, second]);
    await nextTick();

    expect(skipTransition).toHaveBeenCalledOnce();
    expect(startViewTransition).toHaveBeenCalledTimes(2);
    expect(secondUpdate).toHaveBeenCalledOnce();
  });
});
