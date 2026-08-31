export const MAT_MENU_KEY = Symbol('mat-menu');
export const MAT_MENU_ITEM_KEY = Symbol('mat-menu-item');
export const MAT_MENU_GROUP_KEY = Symbol('mat-menu-group');

/**
 * @param {{ x: number, y: number }} first
 * @param {{ x: number, y: number }} second
 * @param {{ x: number, y: number }} third
 * @returns {number}
 */
function triangleArea(first, second, third) {
  return Math.abs(((first.x * (second.y - third.y))
    + (second.x * (third.y - first.y))
    + (third.x * (first.y - second.y))) / 2);
}

/**
 * @param {{ x: number, y: number }} point
 * @param {{ x: number, y: number }} origin
 * @param {{ top: number, bottom: number, left: number, right: number }} submenuRect
 * @param {'left' | 'right'} side
 * @returns {boolean}
 */
export function isPointInMenuSafeTriangle(point, origin, submenuRect, side = 'right') {
  const edgeX = side === 'left' ? submenuRect.right : submenuRect.left;
  const firstCorner = { x: edgeX, y: submenuRect.top };
  const secondCorner = { x: edgeX, y: submenuRect.bottom };
  const area = triangleArea(origin, firstCorner, secondCorner);
  const pointArea = triangleArea(point, firstCorner, secondCorner);
  const firstArea = triangleArea(origin, point, secondCorner);
  const secondArea = triangleArea(origin, firstCorner, point);

  return Math.abs(area - (pointArea + firstArea + secondArea)) < 0.5;
}

/**
 * @param {Array<{element?: import('vue').ComputedRef<HTMLElement | null>, setPosition: (position: 'first' | 'middle' | 'last' | 'only') => void}>} items
 * @param {Array<HTMLElement>} [domNodes]
 */
export function updateMenuItemPositions(items, domNodes = []) {
  const DOCUMENT_POSITION_FOLLOWING = typeof Node !== 'undefined'
    ? Node.DOCUMENT_POSITION_FOLLOWING
    : 4;

  const sorted = items.slice().sort((a, b) => {
    const elA = a.element?.value;
    const elB = b.element?.value;

    if (!elA || !elB || elA === elB) {
      return 0;
    }

    if (domNodes.length > 0) {
      const indexA = domNodes.indexOf(elA);
      const indexB = domNodes.indexOf(elB);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
    }

    if (typeof elA.compareDocumentPosition === 'function') {
      // eslint-disable-next-line no-bitwise
      return (elA.compareDocumentPosition(elB) & DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    }

    return 0;
  });

  sorted.forEach((item, index) => {
    if (sorted.length === 1) {
      item.setPosition('only');
    } else if (index === 0) {
      item.setPosition('first');
    } else if (index === sorted.length - 1) {
      item.setPosition('last');
    } else {
      item.setPosition('middle');
    }
  });
}
