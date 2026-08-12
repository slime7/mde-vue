import { onBeforeUnmount, watch } from 'vue';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * 在激活期间把键盘焦点限制在 root 元素内：Tab 在可聚焦项之间循环，
 * 任何逃逸到 root 外的焦点都会立即拉回。
 *
 * @param {import('vue').Ref<HTMLElement | null>} root
 * @param {import('vue').Ref<boolean>} active
 */
export default function useFocusTrap(root, active) {
  let lastFocused = null;
  let bound = false;

  function getFocusable() {
    const element = root.value;

    if (!element) {
      return [];
    }

    return [...element.querySelectorAll(FOCUSABLE_SELECTOR)]
      .filter((node) => node instanceof HTMLElement);
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleKeydown(event) {
    if (event.key !== 'Tab') {
      return;
    }

    const focusable = getFocusable();
    const element = root.value;

    if (!element) {
      return;
    }

    if (focusable.length === 0) {
      event.preventDefault();
      element.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;
    const focusInside = current instanceof Node && element.contains(current);

    if (event.shiftKey && (!focusInside || current === first)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (!focusInside || current === last)) {
      event.preventDefault();
      first.focus();
    }
  }

  /**
   * @param {FocusEvent} event
   */
  function handleFocusIn(event) {
    const element = root.value;
    const { target } = event;

    if (!active.value) {
      return;
    }

    if (!element || (target instanceof Node && element.contains(target))) {
      if (target instanceof HTMLElement) {
        lastFocused = target;
      }
      return;
    }

    (lastFocused instanceof HTMLElement && lastFocused.isConnected
      ? lastFocused
      : element
    ).focus();
  }

  function bind() {
    if (bound) {
      return;
    }

    root.value?.addEventListener('keydown', handleKeydown);
    document.addEventListener('focusin', handleFocusIn, true);
    bound = true;
  }

  function unbind() {
    if (!bound) {
      return;
    }

    root.value?.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('focusin', handleFocusIn, true);
    bound = false;
    lastFocused = null;
  }

  watch(active, (isActive) => {
    if (isActive) {
      bind();
    } else {
      unbind();
    }
  }, { immediate: true });

  onBeforeUnmount(unbind);
}
