/**
 * 滚动区域组件上下文注入键。
 *
 * 提供的上下文包含：
 * - `getScroller()`：获取滚动元素；
 * - `scrollTo(options)`：滚动到指定位置；
 * - `scroller`：滚动元素的响应式引用，供子孙组件监视挂载时机（内部实现）；
 * - `orientation`：归一化滚动方向（`'vertical' | 'horizontal'`）的只读计算属性（内部实现）。
 */
export const MAT_SCROLL_AREA_KEY = Symbol('mat-scroll-area');

export default MAT_SCROLL_AREA_KEY;
