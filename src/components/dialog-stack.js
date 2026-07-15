import { shallowRef } from 'vue';

export const dialogStack = shallowRef([]);
let scrollLockState = null;

function unlockPageScroll() {
  if (!scrollLockState) {
    return;
  }

  const {
    lockedPaddingInlineEnd, overflow, paddingInlineEnd, root,
  } = scrollLockState;

  if (root.style.overflow === 'hidden') {
    root.style.overflow = overflow;
  }

  if (lockedPaddingInlineEnd !== null
    && root.style.paddingInlineEnd === lockedPaddingInlineEnd) {
    root.style.paddingInlineEnd = paddingInlineEnd;
  }
  scrollLockState = null;
}

function lockPageScroll() {
  if (scrollLockState) {
    return;
  }

  const root = document.documentElement;
  const scrollbarWidth = root.clientWidth > 0
    ? Math.max(0, window.innerWidth - root.clientWidth)
    : 0;
  const computedPadding = Number.parseFloat(getComputedStyle(root).paddingInlineEnd) || 0;

  scrollLockState = {
    lockedPaddingInlineEnd: scrollbarWidth > 0
      ? `${computedPadding + scrollbarWidth}px`
      : null,
    overflow: root.style.overflow,
    paddingInlineEnd: root.style.paddingInlineEnd,
    root,
  };
  root.style.overflow = 'hidden';

  if (scrollbarWidth > 0) {
    root.style.paddingInlineEnd = scrollLockState.lockedPaddingInlineEnd;
  }
}

/**
 * @param {HTMLDialogElement} element
 */
export function registerDialog(element) {
  const connectedDialogs = dialogStack.value.filter((item) => item.isConnected);

  if (connectedDialogs.length === 0) {
    unlockPageScroll();
  }

  if (connectedDialogs.includes(element)) {
    dialogStack.value = connectedDialogs;
    return;
  }

  dialogStack.value = [...connectedDialogs, element];
  lockPageScroll();
}

/**
 * @param {HTMLDialogElement} element
 */
export function unregisterDialog(element) {
  dialogStack.value = dialogStack.value.filter((item) => item !== element && item.isConnected);

  if (dialogStack.value.length === 0) {
    unlockPageScroll();
  }
}
