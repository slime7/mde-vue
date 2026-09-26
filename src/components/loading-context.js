import { inject, provide } from 'vue';

const MAT_LOADING_COMPACT_KEY = Symbol('mat-loading-compact');

/**
 * 为库内部组件提供越过 Loading 公共尺寸范围下限的指示器尺寸。
 * 该上下文属于内部实现，不进入公共入口；值为 null 时回退到公共尺寸解析。
 *
 * @param {import('vue').ComputedRef<number | null>} size 内部指示器尺寸（px）。
 * @returns {void}
 */
export function provideLoadingCompactSize(size) {
  provide(MAT_LOADING_COMPACT_KEY, size);
}

/**
 * @returns {import('vue').ComputedRef<number | null> | null}
 */
export function useLoadingCompactSize() {
  return inject(MAT_LOADING_COMPACT_KEY, null);
}
