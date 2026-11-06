/**
 * 查找离元素最近、能够沿块轴滚动的祖先。
 *
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
export default function findNearestScrollSource(element) {
  let ancestor = element.parentElement;

  while (ancestor) {
    const style = window.getComputedStyle(ancestor);
    const overflow = style.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow)) {
      return ancestor;
    }

    ancestor = ancestor.parentElement;
  }

  return document.scrollingElement instanceof HTMLElement
    ? document.scrollingElement
    : document.documentElement;
}
