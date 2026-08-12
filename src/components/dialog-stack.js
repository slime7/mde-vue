import { shallowRef } from 'vue';

export const dialogStack = shallowRef([]);
export const dialogScrollbarWidth = shallowRef(0);

const DOCUMENT_SCOPE = Symbol('mat-dialog-document-scope');
const dialogScopes = new WeakMap();
const scopeStates = new Map();

function ensureScopeState(key) {
  if (!scopeStates.has(key)) {
    scopeStates.set(key, {
      count: 0,
      inert: false,
      inertElement: null,
      lockedScrollbarGutter: null,
      overflow: '',
      scrollbarGutter: '',
    });
  }

  return scopeStates.get(key);
}

function applyInert(key, inertElement) {
  const state = ensureScopeState(key);

  if (!inertElement || inertElement === state.inertElement) {
    return;
  }

  if (state.inertElement && !state.inert) {
    state.inertElement.removeAttribute('inert');
  }

  scopeStates.set(key, {
    ...state,
    inert: inertElement.hasAttribute('inert'),
    inertElement,
  });
  inertElement.setAttribute('inert', '');
}

function releaseInert(key) {
  const state = scopeStates.get(key);

  if (!state?.inertElement) {
    return;
  }

  if (!state.inert) {
    state.inertElement.removeAttribute('inert');
  }

  scopeStates.set(key, { ...state, inert: false, inertElement: null });
}

function applyDocumentLock(key) {
  const state = ensureScopeState(key);
  const root = document.documentElement;
  const scrollbarWidth = root.clientWidth > 0
    ? Math.max(0, window.innerWidth - root.clientWidth)
    : 0;
  const computedScrollbarGutter = getComputedStyle(root).scrollbarGutter;
  const shouldStabilizeScrollbar = scrollbarWidth > 0
    && !computedScrollbarGutter.includes('stable');

  const lockedScrollbarGutter = shouldStabilizeScrollbar ? 'stable' : null;

  scopeStates.set(key, {
    ...state,
    lockedScrollbarGutter,
    overflow: root.style.overflow,
    scrollbarGutter: root.style.scrollbarGutter,
  });

  if (lockedScrollbarGutter) {
    root.style.scrollbarGutter = lockedScrollbarGutter;
    dialogScrollbarWidth.value = scrollbarWidth;
  }

  root.style.overflow = 'hidden';
}

function releaseDocumentLock(key) {
  const state = scopeStates.get(key);

  if (!state) {
    return;
  }

  const root = document.documentElement;

  if (root.style.overflow === 'hidden') {
    root.style.overflow = state.overflow;
  }

  if (state.lockedScrollbarGutter !== null
    && root.style.scrollbarGutter === state.lockedScrollbarGutter) {
    root.style.scrollbarGutter = state.scrollbarGutter;
  }

  if (state.lockedScrollbarGutter !== null) {
    dialogScrollbarWidth.value = 0;
  }
}

function applyElementLock(key) {
  const element = key;
  const state = ensureScopeState(key);

  scopeStates.set(key, { ...state, overflow: element.style.overflow });
  element.style.overflow = 'hidden';
}

function releaseElementLock(key) {
  const element = key;
  const state = scopeStates.get(key);

  if (!state) {
    return;
  }

  if (element.style.overflow === 'hidden') {
    element.style.overflow = state.overflow;
  }
}

function releaseScopeState(key) {
  const state = scopeStates.get(key);

  if (!state || state.count > 0) {
    return;
  }

  if (key === DOCUMENT_SCOPE) {
    releaseDocumentLock(key);
  } else {
    releaseElementLock(key);
  }

  releaseInert(key);
  scopeStates.delete(key);
}

function releaseAllScopes() {
  [...scopeStates.keys()].forEach((key) => {
    if (key === DOCUMENT_SCOPE) {
      releaseDocumentLock(key);
    } else {
      releaseElementLock(key);
    }

    releaseInert(key);
  });
  scopeStates.clear();
}

/**
 * @param {{inertElement?: HTMLElement | null, scrollElement?: HTMLElement | null}} [scope]
 */
function acquireScope({ inertElement = null, scrollElement } = {}) {
  const key = scrollElement instanceof HTMLElement ? scrollElement : DOCUMENT_SCOPE;
  const state = ensureScopeState(key);

  if (state.count === 0) {
    if (key === DOCUMENT_SCOPE) {
      applyDocumentLock(key);
    } else {
      applyElementLock(key);
    }

    applyInert(key, inertElement);
  } else if (inertElement && state.inertElement !== inertElement) {
    applyInert(key, inertElement);
  }

  const next = ensureScopeState(key);

  scopeStates.set(key, { ...next, count: next.count + 1 });
}

/**
 * @param {{inertElement?: HTMLElement | null, scrollElement?: HTMLElement | null}} scope
 */
function releaseScope(scope) {
  const key = scope?.scrollElement instanceof HTMLElement
    ? scope.scrollElement
    : DOCUMENT_SCOPE;
  const state = scopeStates.get(key);

  if (!state) {
    return;
  }

  scopeStates.set(key, { ...state, count: Math.max(0, state.count - 1) });
  releaseScopeState(key);
}

/**
 * @param {HTMLDialogElement} element
 * @param {{inertElement?: HTMLElement | null, scrollElement?: HTMLElement | null}} [scope]
 */
export function registerDialog(element, scope) {
  const connectedDialogs = dialogStack.value.filter((item) => item.isConnected);

  if (connectedDialogs.length === 0) {
    releaseAllScopes();
  }

  if (connectedDialogs.includes(element)) {
    dialogStack.value = connectedDialogs;
    return;
  }

  dialogScopes.set(element, scope);
  dialogStack.value = [...connectedDialogs, element];
  acquireScope(scope);
}

/**
 * @param {HTMLDialogElement} element
 */
export function unregisterDialog(element) {
  const scope = dialogScopes.get(element);

  dialogScopes.delete(element);
  dialogStack.value = dialogStack.value.filter((item) => item !== element && item.isConnected);

  if (scope) {
    releaseScope(scope);
  }

  if (dialogStack.value.length === 0) {
    releaseAllScopes();
  }
}
