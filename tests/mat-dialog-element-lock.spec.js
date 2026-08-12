import { mount } from '@vue/test-utils';
import {
  afterEach, beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { h, nextTick, ref } from 'vue';
import MatAppRoot from '../src/components/mat-app-root/MatAppRoot.vue';
import MatDialog from '../src/components/mat-dialog/MatDialog.vue';

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'show', {
    configurable: true,
    value() {
      this.setAttribute('open', '');
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value() {
      this.removeAttribute('open');
    },
  });
});

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('requestAnimationFrame', (callback) => {
    callback();
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  vi.stubGlobal('ResizeObserver', class {
    observe() {
      return this;
    }

    disconnect() {
      return this;
    }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  Reflect.deleteProperty(Element.prototype, 'getAnimations');
});

async function settleRender() {
  await nextTick();
  await nextTick();
}

function mockContentScrollbarWidth(element, width) {
  const clientWidth = 1000;

  vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(clientWidth);
  vi.spyOn(element, 'offsetWidth', 'get').mockReturnValue(clientWidth + width);
}

function mountScrollableAppRootWithDialogs(dialogCount) {
  const openStates = Array.from({ length: dialogCount }, () => ref(true));
  const wrapper = mount(MatAppRoot, {
    attachTo: document.body,
    props: {
      fillViewport: false,
      scrollable: true,
    },
    slots: {
      default: () => openStates.map((open, index) => h(
        MatDialog,
        {
          modelValue: open.value,
          title: `第 ${index + 1} 层`,
        },
      )),
    },
  });

  return {
    wrapper,
    closeDialogAt(index) {
      openStates[index].value = false;
    },
  };
}

describe('MatDialog 元素级滚动锁', () => {
  it('可滚动正文存在经典滚动条时保留滚动条槽位，并在关闭后还原内联样式', async () => {
    const { wrapper, closeDialogAt } = mountScrollableAppRootWithDialogs(1);
    const content = wrapper.get('.mat-app-root__content').element;

    content.style.overflow = 'scroll';
    content.style.scrollbarGutter = 'auto';
    mockContentScrollbarWidth(content, 16);
    await settleRender();

    expect(content.style.overflow).toBe('hidden');
    expect(content.style.scrollbarGutter).toBe('stable');

    closeDialogAt(0);
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(content.style.overflow).toBe('scroll');
    expect(content.style.scrollbarGutter).toBe('auto');
    wrapper.unmount();
  });

  it('正文不可滚动或不使用经典滚动条时不预留滚动条槽位', async () => {
    const { wrapper, closeDialogAt } = mountScrollableAppRootWithDialogs(1);
    const content = wrapper.get('.mat-app-root__content').element;

    content.style.overflow = 'auto';
    mockContentScrollbarWidth(content, 0);
    await settleRender();

    expect(content.style.overflow).toBe('hidden');
    expect(content.style.scrollbarGutter).toBe('');

    closeDialogAt(0);
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(content.style.overflow).toBe('auto');
    expect(content.style.scrollbarGutter).toBe('');
    wrapper.unmount();
  });

  it('同作用域堆叠多个 Dialog 只加锁一次，全部关闭后还原内联样式', async () => {
    const { wrapper, closeDialogAt } = mountScrollableAppRootWithDialogs(2);
    const content = wrapper.get('.mat-app-root__content').element;

    content.style.overflow = 'scroll';
    content.style.scrollbarGutter = 'auto';
    mockContentScrollbarWidth(content, 16);
    await settleRender();

    expect(content.style.overflow).toBe('hidden');
    expect(content.style.scrollbarGutter).toBe('stable');

    closeDialogAt(1);
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);

    expect(content.style.overflow).toBe('hidden');
    expect(content.style.scrollbarGutter).toBe('stable');

    closeDialogAt(0);
    await nextTick();
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    expect(content.style.overflow).toBe('scroll');
    expect(content.style.scrollbarGutter).toBe('auto');
    wrapper.unmount();
  });
});
