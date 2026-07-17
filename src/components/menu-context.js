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
 * @param {Array<{setPosition: (position: 'first' | 'middle' | 'last' | 'only') => void}>} items
 */
export function updateMenuItemPositions(items) {
  items.forEach((item, index) => {
    if (items.length === 1) {
      item.setPosition('only');
    } else if (index === 0) {
      item.setPosition('first');
    } else if (index === items.length - 1) {
      item.setPosition('last');
    } else {
      item.setPosition('middle');
    }
  });
}
