import { inject } from 'vue';

export const MAT_NAVIGATION_RAIL_KEY = Symbol('mat-navigation-rail');

/**
 * @returns {object | null}
 */
export function useMatNavigationRail() {
  return inject(MAT_NAVIGATION_RAIL_KEY, null);
}
