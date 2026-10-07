import { inject, provide } from 'vue';

const MAT_CAROUSEL_CONTEXT_KEY = Symbol('mat-carousel-context');

/**
 * @typedef {object} MatCarouselItemEntry
 * @property {HTMLElement} element 项目根元素。
 * @property {() => number | undefined} getWidth 使用方设置的目标宽度（px）。
 */

/**
 * @param {{registerItem: (entry: MatCarouselItemEntry) => void, unregisterItem: (entry: MatCarouselItemEntry) => void}} context
 * @returns {void}
 */
export function provideCarouselContext(context) {
  provide(MAT_CAROUSEL_CONTEXT_KEY, context);
}

/**
 * @returns {{registerItem: (entry: MatCarouselItemEntry) => void, unregisterItem: (entry: MatCarouselItemEntry) => void} | null}
 */
export function useCarouselContext() {
  return inject(MAT_CAROUSEL_CONTEXT_KEY, null);
}
