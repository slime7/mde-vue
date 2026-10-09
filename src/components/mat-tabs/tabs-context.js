import { inject } from 'vue';

export const MAT_TABS_KEY = Symbol('mat-tabs');

/**
 * @returns {object | null}
 */
export function useMatTabs() {
  return inject(MAT_TABS_KEY, null);
}
