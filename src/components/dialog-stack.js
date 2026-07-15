import { shallowRef } from 'vue';

export const dialogStack = shallowRef([]);

/**
 * @param {HTMLDialogElement} element
 */
export function registerDialog(element) {
  const connectedDialogs = dialogStack.value.filter((item) => item.isConnected);

  if (connectedDialogs.includes(element)) {
    dialogStack.value = connectedDialogs;
    return;
  }

  dialogStack.value = [...connectedDialogs, element];
}

/**
 * @param {HTMLDialogElement} element
 */
export function unregisterDialog(element) {
  dialogStack.value = dialogStack.value.filter((item) => item !== element);
}
