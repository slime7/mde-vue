import { inject } from 'vue';

export const MAT_APP_ROOT_KEY = Symbol('mat-app-root');

/**
 * 获取最近的 MatAppRoot 布局上下文。
 *
 * @returns {MatAppContext}
 * @throws {Error} 不在 MatAppRoot 内调用时抛出。
 */
export function useMatApp() {
  const context = inject(MAT_APP_ROOT_KEY, null);

  if (!context) {
    throw new Error('useMatApp() 必须在 MatAppRoot 内调用');
  }

  return context.publicContext;
}

/**
 * @typedef {'top' | 'bottom' | 'start' | 'end'} MatAppEdge
 */

/**
 * @typedef {'compact' | 'medium' | 'expanded' | 'large' | 'extra-large'} MatAppBreakpoint
 */

/**
 * @typedef {object} MatAppEdgeInsets
 * @property {number} start
 * @property {number} end
 */

/**
 * @typedef {object} MatAppEdgeInfo
 * @property {number} size
 * @property {number} startInset
 * @property {number} endInset
 */

/**
 * @typedef {object} MatAppLayout
 * @property {{width: number, height: number}} size
 * @property {{top: number, bottom: number, start: number, end: number}} padding
 * @property {{width: number, height: number}} content
 * @property {MatAppBreakpoint} breakpoint
 * @property {{min: number, max: number}} breakpointRange
 * @property {{top: MatAppEdgeInfo, bottom: MatAppEdgeInfo, start: MatAppEdgeInfo, end: MatAppEdgeInfo}} edges
 */

/**
 * @typedef {object} MatAppEdgeRegistration
 * @property {Readonly<MatAppEdgeInsets>} insets
 * @property {() => void} update
 * @property {() => void} unregister
 */

/**
 * @typedef {object} MatAppPublicContext
 * @property {Readonly<MatAppLayout>} layout
 * @property {(options: {edge: MatAppEdge, element: HTMLElement}) => MatAppEdgeRegistration} registerEdge
 */

/**
 * @typedef {object} MatAppContext
 * @property {MatAppPublicContext} publicContext
 * @property {Readonly<import('vue').Ref<HTMLElement | null>>} rootElement
 * @property {Readonly<import('vue').Ref<HTMLElement | null>>} contentElement
 * @property {Readonly<import('vue').Ref<HTMLElement | null>>} edgeLayer
 * @property {Readonly<import('vue').Ref<HTMLElement | null>>} freeLayer
 * @property {Readonly<import('vue').Ref<HTMLElement | null>>} snackbarLayer
 * @property {Readonly<import('vue').Ref<HTMLElement | null>>} floatingLayer
 * @property {() => {top: number, bottom: number, left: number, right: number, width: number, height: number}} getLayoutRect
 */
