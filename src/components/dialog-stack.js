import { shallowRef } from 'vue';

export const dialogStack = shallowRef([]);

/**
 * @param {HTMLDialogElement} element
 */
export function registerDialog(element) {
  if (dialogStack.value.includes(element)) {
    return;
  }

  dialogStack.value = [...dialogStack.value, element];
}

/**
 * @param {HTMLDialogElement} element
 */
export function unregisterDialog(element) {
  dialogStack.value = dialogStack.value.filter((item) => item !== element);
}
