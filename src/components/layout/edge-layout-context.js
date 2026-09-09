import { inject } from 'vue';

export const MAT_EDGE_LAYOUT_KEY = Symbol('mat-edge-layout');

/**
 * 获取最近的边缘布局根上下文。
 *
 * @returns {MatEdgeLayoutContext | null}
 */
export function useEdgeLayout() {
  return inject(MAT_EDGE_LAYOUT_KEY, null);
}

/**
 * @typedef {'layout' | 'app-root'} MatEdgeLayoutKind
 */

/**
 * @typedef {object} MatEdgeLayoutContext
 * @property {MatEdgeLayoutKind} kind
 * @property {import('vue').Readonly<import('vue').Ref<HTMLElement | null>>} rootElement
 * @property {import('vue').Readonly<import('vue').Ref<HTMLElement | null>>} contentElement
 * @property {{registerEdge: Function}} publicContext
 */
