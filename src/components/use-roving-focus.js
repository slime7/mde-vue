import { onBeforeUnmount } from 'vue';

/**
 * @typedef {object} RovingFocusOptions
 * @property {import('vue').Ref<HTMLElement | null>} root
 * @property {string} selector
 * @property {(element: HTMLElement) => boolean} [isAvailable]
 * @property {(elements: HTMLElement[]) => HTMLElement | null} [findInitial]
 * @property {string[]} [observedAttributes]
 */

/**
 * 管理一个组件内部的 roving tabindex，不定义具体按键语义。
 *
 * @param {RovingFocusOptions} options
 * @returns {{collect: () => HTMLElement[], focusFirst: () => void, focusLast: () => void, handleFocusIn: (event: FocusEvent) => void, move: (target: EventTarget | null, offset: number) => void, observe: () => void, queueRefresh: () => void, refresh: () => void, resetActive: () => void, restore: () => void}}
 */
export default function useRovingFocus(options) {
  const originalTabIndexes = new Map();
  let activeElement = null;
  let observer;
  let refreshQueued = false;

  /**
   * @returns {HTMLElement[]}
   */
  function collect() {
    if (!options.root.value) {
      return [];
    }

    return [...options.root.value.querySelectorAll(options.selector)]
      .filter((element) => element instanceof HTMLElement)
      .filter((element) => {
        const original = originalTabIndexes.has(element)
          ? originalTabIndexes.get(element)
          : element.getAttribute('tabindex');

        if (original !== null && Number(original) < 0) {
          return false;
        }

        return options.isAvailable?.(element) ?? true;
      });
  }

  /**
   * @param {HTMLElement} element
   */
  function remember(element) {
    if (!originalTabIndexes.has(element)) {
      originalTabIndexes.set(element, element.getAttribute('tabindex'));
    }
  }

  /**
   * @param {HTMLElement} element
   */
  function restoreElement(element) {
    const original = originalTabIndexes.get(element);

    if (original === null) {
      element.removeAttribute('tabindex');
    } else if (original !== undefined) {
      element.setAttribute('tabindex', original);
    }

    originalTabIndexes.delete(element);
  }

  function restore() {
    [...originalTabIndexes.keys()].forEach(restoreElement);
    activeElement = null;
    observer?.disconnect();
    observer = undefined;
  }

  function refresh() {
    refreshQueued = false;
    const elements = collect();
    const elementSet = new Set(elements);

    [...originalTabIndexes.keys()].forEach((element) => {
      if (!elementSet.has(element)) {
        restoreElement(element);
      }
    });

    if (!activeElement || !elementSet.has(activeElement)) {
      activeElement = options.findInitial?.(elements) ?? elements[0] ?? null;
    }

    elements.forEach((element) => {
      remember(element);
      element.setAttribute('tabindex', element === activeElement ? '0' : '-1');
    });
  }

  function queueRefresh() {
    if (refreshQueued) {
      return;
    }

    refreshQueued = true;
    queueMicrotask(refresh);
  }

  /**
   * @param {HTMLElement | null} element
   */
  function focus(element) {
    if (!element) {
      return;
    }

    activeElement = element;
    refresh();
    element.focus();
  }

  function focusFirst() {
    focus(collect()[0] ?? null);
  }

  function focusLast() {
    focus(collect().at(-1) ?? null);
  }

  /**
   * @param {EventTarget | null} target
   * @param {number} offset
   */
  function move(target, offset) {
    const elements = collect();
    const index = elements.indexOf(target);

    if (index === -1 || elements.length === 0) {
      return;
    }

    const nextIndex = (index + offset + elements.length) % elements.length;

    focus(elements[nextIndex]);
  }

  /**
   * @param {FocusEvent} event
   */
  function handleFocusIn(event) {
    const elements = collect();

    if (event.target instanceof HTMLElement && elements.includes(event.target)) {
      activeElement = event.target;
      refresh();
    }
  }

  function observe() {
    observer?.disconnect();
    observer = undefined;

    if (!options.root.value) {
      return;
    }

    observer = new MutationObserver(queueRefresh);
    observer.observe(options.root.value, {
      attributes: true,
      attributeFilter: options.observedAttributes ?? ['aria-disabled', 'disabled'],
      childList: true,
      subtree: true,
    });
    queueRefresh();
  }

  function resetActive() {
    activeElement = null;
  }

  onBeforeUnmount(restore);

  return {
    collect,
    focusFirst,
    focusLast,
    handleFocusIn,
    move,
    observe,
    queueRefresh,
    refresh,
    resetActive,
    restore,
  };
}
