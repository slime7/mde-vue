import { nextTick } from 'vue';
import {
  activateViewTransitionNames,
  clearViewTransitionNames,
} from './view-transition-state';

function prefersReducedMotion() {
  return typeof globalThis.matchMedia === 'function'
    && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getStartViewTransition() {
  if (typeof document === 'undefined' || typeof document.startViewTransition !== 'function') {
    return null;
  }

  return document.startViewTransition.bind(document);
}

function normalizeNames(names) {
  if (names === undefined) {
    return [];
  }

  const values = Array.isArray(names) ? names : [names];

  if (values.some((name) => typeof name !== 'string' || name.trim().length === 0)) {
    throw new TypeError('useMatViewTransition.start names 必须是非空字符串或非空字符串数组');
  }

  return [...new Set(values)];
}

/**
 * 创建同一文档内 View Transition 的协调器。
 *
 * @returns {{supported: boolean, start: (update: () => void | Promise<void>, options?: {skip?: boolean, names?: string | string[]}) => Promise<void>}}
 */
export function useMatViewTransition() {
  let activeTransition = null;
  let preparingTransition = null;

  /**
   * 执行一次状态更新，并在支持时等待 View Transition 完成。
   *
   * @param {() => void | Promise<void>} update 状态更新函数。
   * @param {{skip?: boolean, names?: string | string[]}} [options] 本次参与的共享名称与跳过选项。
   * @returns {Promise<void>}
   * @throws {TypeError} update 不是函数或 names 无效时抛出。
   */
  async function start(update, options = {}) {
    if (typeof update !== 'function') {
      throw new TypeError('useMatViewTransition.start update 必须是函数');
    }

    const names = normalizeNames(options.names);

    if (preparingTransition) {
      await preparingTransition;
    }

    if (activeTransition) {
      activeTransition.skipTransition?.();
      await activeTransition.finished.catch(() => {});
      activeTransition = null;
    }

    const startViewTransition = getStartViewTransition();

    if (options.skip || !startViewTransition || prefersReducedMotion()) {
      await update();
      return;
    }

    let finishPreparation;
    const preparation = new Promise((resolve) => {
      finishPreparation = resolve;
    });
    preparingTransition = preparation;
    const nameScope = activateViewTransitionNames(names);
    let transition;

    try {
      await nextTick();
      transition = startViewTransition(() => update());
      activeTransition = transition;
      finishPreparation();
      if (preparingTransition === preparation) {
        preparingTransition = null;
      }
      await transition.finished;
    } finally {
      finishPreparation();
      if (preparingTransition === preparation) {
        preparingTransition = null;
      }
      if (activeTransition === transition) {
        activeTransition = null;
      }
      clearViewTransitionNames(nameScope);
      await nextTick();
    }
  }

  return Object.freeze({
    get supported() {
      return Boolean(getStartViewTransition());
    },
    start,
  });
}

export const useMdeViewTransition = useMatViewTransition;
