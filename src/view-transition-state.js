import { shallowRef } from 'vue';

export const activeViewTransitionNames = shallowRef(new Set());

let activeScope = 0;

export function activateViewTransitionNames(names) {
  activeScope += 1;
  activeViewTransitionNames.value = new Set(names);
  return activeScope;
}

export function clearViewTransitionNames(scope) {
  if (scope !== activeScope) {
    return;
  }

  activeViewTransitionNames.value = new Set();
}
