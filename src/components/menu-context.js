export const MAT_MENU_KEY = Symbol('mat-menu');
export const MAT_MENU_ITEM_KEY = Symbol('mat-menu-item');
export const MAT_MENU_GROUP_KEY = Symbol('mat-menu-group');

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
