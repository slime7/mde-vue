import { shallowRef } from 'vue';

export const dialogStack = shallowRef([]);
export const dialogScrollbarWidth = shallowRef(0);
let scrollLockState = null;

function unlockPageScroll() {
  if (!scrollLockState) {
    return;
  }

  const {
    lockedScrollbarGutter, overflow, root, scrollbarGutter,
  } = scrollLockState;

  if (root.style.overflow === 'hidden') {
    root.style.overflow = overflow;
  }

  if (lockedScrollbarGutter !== null
    && root.style.scrollbarGutter === lockedScrollbarGutter) {
    root.style.scrollbarGutter = scrollbarGutter;
  }
  dialogScrollbarWidth.value = 0;
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
  const computedScrollbarGutter = getComputedStyle(root).scrollbarGutter;
  const shouldStabilizeScrollbar = scrollbarWidth > 0
    && !computedScrollbarGutter.includes('stable');

  dialogScrollbarWidth.value = scrollbarWidth;
  scrollLockState = {
    lockedScrollbarGutter: shouldStabilizeScrollbar ? 'stable' : null,
    overflow: root.style.overflow,
    root,
    scrollbarGutter: root.style.scrollbarGutter,
  };

  if (shouldStabilizeScrollbar) {
    root.style.scrollbarGutter = scrollLockState.lockedScrollbarGutter;
  }

  root.style.overflow = 'hidden';
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
