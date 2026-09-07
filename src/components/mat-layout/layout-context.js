import { inject } from 'vue';

export const MAT_LAYOUT_KEY = Symbol('mat-layout');

/**
 * 获取最近的 MatLayout 布局上下文。
 *
 * @returns {MatLayoutPublicContext}
 * @throws {Error} 不在 MatLayout 内调用时抛出。
 */
export function useLayout() {
  const context = inject(MAT_LAYOUT_KEY, null);

  if (!context) {
    throw new Error('useLayout() 必须在 MatLayout 内调用');
  }

  return context.publicContext;
}

/**
 * @typedef {'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'} MatLayoutEdge
 */

/**
 * @typedef {object} MatLayoutEdgeInsets
 * @property {number} top
 * @property {number} bottom
 * @property {number} left
 * @property {number} right
 * @property {number} [start]
 * @property {number} [end]
 * @property {number} offset
 */

/**
 * @typedef {object} MatLayoutEdgeRegistration
 * @property {Readonly<MatLayoutEdgeInsets>} insets
 * @property {() => void} update
 * @property {() => void} unregister
 */

/**
 * @typedef {object} MatLayoutPublicContext
 * @property {Readonly<{top: number, bottom: number, left: number, right: number, start: number, end: number}>} padding
 * @property {Readonly<{width: number, height: number}>} size
 * @property {(options: {edge: MatLayoutEdge, element: HTMLElement}) => MatLayoutEdgeRegistration} registerEdge
 */
