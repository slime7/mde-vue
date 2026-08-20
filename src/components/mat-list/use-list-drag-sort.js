import {
  nextTick, onBeforeUnmount, ref, watch,
} from 'vue';
import createFrameScheduler from '../frame-scheduler';

const LONG_PRESS_DELAY = 500;
const PENDING_MOVE_THRESHOLD = 8;
const AUTO_SCROLL_EDGE = 48;
const AUTO_SCROLL_MAX_STEP = 24;

/**
 * @param {unknown} value
 * @returns {string}
 */
function describeValue(value) {
  if (Object.is(value, -0)) {
    return 'number:-0';
  }

  return `${typeof value}:${String(value)}`;
}

/**
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
function findScrollContainer(element) {
  let ancestor = element.parentElement;

  while (ancestor && ancestor !== document.body) {
    const style = getComputedStyle(ancestor);

    if (/(auto|scroll)/u.test(style.overflowY)
      && ancestor.scrollHeight > ancestor.clientHeight) {
      return ancestor;
    }

    ancestor = ancestor.parentElement;
  }

  return document.scrollingElement instanceof HTMLElement
    ? document.scrollingElement
    : document.documentElement;
}

/**
 * @param {HTMLElement} element
 */
function removeDuplicateIds(element) {
  element.removeAttribute('id');
  element.querySelectorAll('[id]').forEach((child) => {
    child.removeAttribute('id');
  });
  element.querySelectorAll('[tabindex]').forEach((child) => {
    child.setAttribute('tabindex', '-1');
  });
}

/**
 * @param {HTMLElement} source
 * @param {DOMRect} rect
 * @returns {HTMLElement}
 */
function createPreview(source, rect) {
  const preview = /** @type {HTMLElement} */ (source.cloneNode(true));
  const computedStyle = getComputedStyle(source);

  removeDuplicateIds(preview);
  preview.setAttribute('aria-hidden', 'true');
  preview.setAttribute('data-mat-list-drag-preview', '');
  preview.setAttribute('inert', '');

  for (let index = 0; index < computedStyle.length; index += 1) {
    const property = computedStyle.item(index);

    if (property.startsWith('--mat-')) {
      preview.style.setProperty(property, computedStyle.getPropertyValue(property));
    }
  }

  Object.assign(preview.style, {
    position: 'fixed',
    zIndex: '1000',
    boxSizing: 'border-box',
    inlineSize: `${rect.width}px`,
    blockSize: `${rect.height}px`,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    margin: '0',
    pointerEvents: 'none',
    borderRadius: 'var(--mat-list-item-selected-container-shape, 16px)',
    boxShadow: 'var(--mat-sys-elevation-level3)',
    willChange: 'transform',
  });
  document.body.append(preview);
  return preview;
}

/**
 * @param {HTMLElement} root
 * @returns {KeyframeAnimationOptions}
 */
function getLayoutMotion(root) {
  if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return { duration: 0 };
  }

  const token = getComputedStyle(root)
    .getPropertyValue('--mat-sys-motion-spring-fast-spatial')
    .trim();
  const match = token.match(/^([\d.]+)ms\s+(.+)$/u);

  if (!match) {
    return {
      duration: 200,
      easing: 'ease-out',
    };
  }

  return {
    duration: Number(match[1]),
    easing: match[2],
  };
}

/**
 * @typedef {{
 *   token: symbol,
 *   element: import('vue').Ref<HTMLElement | null>,
 *   value: import('vue').ComputedRef<unknown>,
 *   disabled: import('vue').ComputedRef<boolean>,
 * }} ListDragItemRecord
 */

/**
 * @param {{
 *   root: import('vue').Ref<HTMLElement | null>,
 *   enabled: import('vue').ComputedRef<boolean>,
 *   emitReorder: (payload: {
 *     value: unknown,
 *     fromIndex: number,
 *     toIndex: number,
 *     originalEvent: PointerEvent,
 *   }) => void,
 * }} options
 */
export default function useListDragSort(options) {
  const dragging = ref(false);
  /** @type {Map<symbol, ListDragItemRecord>} */
  const records = new Map();
  let validationQueued = false;
  let validationSignature = '';
  let pending;
  let active;
  let suppressedClickElement;
  let suppressedClickTimer;
  let pointerFrame;
  const globalHandlers = {};

  /**
   * @param {Event} event
   */
  function handleGlobalEvent(event) {
    globalHandlers[event.type]?.(event);
  }

  /**
   * @returns {Array<{element: HTMLElement, record: ListDragItemRecord | undefined}>}
   */
  function getLayout() {
    if (!options.root.value) {
      return [];
    }

    const recordByElement = new Map();

    records.forEach((record) => {
      if (record.element.value?.parentElement === options.root.value) {
        recordByElement.set(record.element.value, record);
      }
    });

    return Array.from(options.root.value.children)
      .filter((element) => !element.hasAttribute('data-mat-list-drag-placeholder'))
      .map((element) => ({
        element: /** @type {HTMLElement} */ (element),
        record: recordByElement.get(element),
      }));
  }

  /**
   * @param {Array<{element: HTMLElement, record: ListDragItemRecord | undefined}>} layout
   * @returns {Set<ListDragItemRecord>}
   */
  function getEligibleRecords(layout) {
    const directRecords = layout
      .map((entry) => entry.record)
      .filter((record) => record !== undefined);
    const eligible = new Set();

    directRecords.forEach((record) => {
      const { value } = record.value;
      const duplicate = directRecords.some((candidate) => (
        candidate !== record && Object.is(candidate.value.value, value)
      ));

      if (!record.disabled.value && value !== undefined && !duplicate) {
        eligible.add(record);
      }
    });

    return eligible;
  }

  function validateItems() {
    validationQueued = false;

    if (!options.enabled.value) {
      validationSignature = '';
      return;
    }

    const layout = getLayout();
    const directRecords = layout
      .map((entry) => entry.record)
      .filter((record) => record !== undefined);
    const invalid = directRecords.filter((record) => {
      const { value } = record.value;

      if (value === undefined) {
        return true;
      }

      return directRecords.some((candidate) => (
        candidate !== record && Object.is(candidate.value.value, value)
      ));
    });
    const signature = invalid
      .map((record) => describeValue(record.value.value))
      .sort()
      .join('|');

    if (!signature || signature === validationSignature) {
      return;
    }

    validationSignature = signature;
    // eslint-disable-next-line no-console
    console.warn('MatList: draggable 模式下的直属 MatListItem 必须提供稳定且唯一的 value；无效项目将作为固定边界');
  }

  function queueValidation() {
    if (validationQueued) {
      return;
    }

    validationQueued = true;
    nextTick(validateItems);
  }

  function clearSuppressedClick() {
    globalThis.clearTimeout(suppressedClickTimer);
    suppressedClickTimer = undefined;
    suppressedClickElement = undefined;
  }

  function suppressNextClick(element) {
    clearSuppressedClick();
    suppressedClickElement = element;
    suppressedClickTimer = globalThis.setTimeout(clearSuppressedClick, 600);
  }

  function removeGlobalListeners() {
    window.removeEventListener('pointermove', handleGlobalEvent);
    window.removeEventListener('pointerup', handleGlobalEvent);
    window.removeEventListener('pointercancel', handleGlobalEvent);
    window.removeEventListener('blur', handleGlobalEvent);
    document.removeEventListener('keydown', handleGlobalEvent);
  }

  function cancelPending() {
    if (!pending) {
      return;
    }

    globalThis.clearTimeout(pending.timer);
    pending = undefined;
  }

  function cleanupActive() {
    if (!active) {
      return;
    }

    active.source.style.display = active.sourceDisplay;
    active.placeholder.remove();
    active.preview.remove();
    active = undefined;
    dragging.value = false;
  }

  function cancelInteraction() {
    cancelPending();
    pointerFrame?.cancel();
    cleanupActive();
    removeGlobalListeners();
  }

  /**
   * @param {HTMLElement[]} elements
   * @returns {Map<HTMLElement, DOMRect>}
   */
  function captureRects(elements) {
    return new Map(elements.map((element) => [
      element,
      element.getBoundingClientRect(),
    ]));
  }

  /**
   * @param {Map<HTMLElement, DOMRect>} previousRects
   * @param {HTMLElement[]} elements
   */
  function animateLayout(previousRects, elements) {
    if (!options.root.value || typeof Element.prototype.animate !== 'function') {
      return;
    }

    const motion = getLayoutMotion(options.root.value);

    elements.forEach((element) => {
      const previous = previousRects.get(element);
      const current = element.getBoundingClientRect();
      const offset = previous ? previous.top - current.top : 0;

      if (offset === 0) {
        return;
      }

      element.animate(
        [
          { transform: `translateY(${offset}px)` },
          { transform: 'translateY(0)' },
        ],
        motion,
      );
    });
  }

  /**
   * @param {number} clientY
   * @returns {number}
   */
  function scrollNearEdge(clientY) {
    if (!active) {
      return 0;
    }

    const container = active.scrollContainer;
    const isDocument = container === document.documentElement
      || container === document.body
      || container === document.scrollingElement;
    const rect = isDocument
      ? {
        top: 0,
        bottom: globalThis.innerHeight,
      }
      : container.getBoundingClientRect();
    let step = 0;

    if (clientY < rect.top + AUTO_SCROLL_EDGE) {
      step = -Math.ceil(
        AUTO_SCROLL_MAX_STEP
        * ((rect.top + AUTO_SCROLL_EDGE - clientY) / AUTO_SCROLL_EDGE),
      );
    } else if (clientY > rect.bottom - AUTO_SCROLL_EDGE) {
      step = Math.ceil(
        AUTO_SCROLL_MAX_STEP
        * ((clientY - rect.bottom + AUTO_SCROLL_EDGE) / AUTO_SCROLL_EDGE),
      );
    }

    if (step === 0) {
      return 0;
    }

    const previousScrollTop = container.scrollTop;

    container.scrollTop += step;
    return container.scrollTop - previousScrollTop;
  }

  /**
   * @param {PointerEvent} event
   */
  function updateDragNow(event) {
    if (!active || event.pointerId !== active.pointerId) {
      return;
    }

    const translateX = event.clientX - active.startClientX;
    const translateY = event.clientY - active.startClientY;

    active.preview.style.transform = `translate(${translateX}px, ${translateY}px)`;

    const otherRecords = active.segment.filter((record) => record !== active.record);
    let insertionIndex = otherRecords.length;

    for (let index = 0; index < otherRecords.length; index += 1) {
      const rect = otherRecords[index].element.value?.getBoundingClientRect();

      if (rect && event.clientY < rect.top + rect.height / 2) {
        insertionIndex = index;
        break;
      }
    }

    if (insertionIndex !== active.insertionIndex && options.root.value) {
      const elements = otherRecords
        .map((record) => record.element.value)
        .filter((element) => element !== null);
      const previousRects = captureRects(elements);
      const reference = otherRecords[insertionIndex]?.element.value ?? active.boundaryAfter;

      options.root.value.insertBefore(active.placeholder, reference);
      active.insertionIndex = insertionIndex;
      active.toIndex = active.segmentStartIndex + insertionIndex;
      animateLayout(previousRects, elements);
    }

    if (scrollNearEdge(event.clientY) !== 0) {
      pointerFrame.schedule(event);
    }
  }

  pointerFrame = createFrameScheduler(updateDragNow);

  function addGlobalListeners() {
    window.addEventListener('pointermove', handleGlobalEvent, { passive: false });
    window.addEventListener('pointerup', handleGlobalEvent);
    window.addEventListener('pointercancel', handleGlobalEvent);
    window.addEventListener('blur', handleGlobalEvent);
    document.addEventListener('keydown', handleGlobalEvent);
  }

  function startDrag() {
    if (!pending || !options.root.value) {
      return;
    }

    const currentPending = pending;
    const layout = getLayout();
    const eligible = getEligibleRecords(layout);
    const sourceLayoutIndex = layout.findIndex((entry) => entry.record === currentPending.record);

    if (sourceLayoutIndex === -1 || !eligible.has(currentPending.record)) {
      cancelInteraction();
      return;
    }

    let segmentStart = sourceLayoutIndex;
    let segmentEnd = sourceLayoutIndex;

    while (segmentStart > 0 && eligible.has(layout[segmentStart - 1].record)) {
      segmentStart -= 1;
    }

    while (segmentEnd + 1 < layout.length && eligible.has(layout[segmentEnd + 1].record)) {
      segmentEnd += 1;
    }

    const segment = layout
      .slice(segmentStart, segmentEnd + 1)
      .map((entry) => entry.record)
      .filter((record) => record !== undefined);
    const directRecords = layout
      .map((entry) => entry.record)
      .filter((record) => record !== undefined);
    const source = currentPending.record.element.value;

    if (!source) {
      cancelInteraction();
      return;
    }

    const rect = source.getBoundingClientRect();
    const placeholder = document.createElement(source.tagName.toLowerCase());
    const preview = createPreview(source, rect);
    const sourceStyle = getComputedStyle(source);
    const sourceDisplay = source.style.display;
    const sourceSegmentIndex = segment.indexOf(currentPending.record);

    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.setAttribute('data-mat-list-drag-placeholder', '');
    placeholder.style.blockSize = `${rect.height}px`;
    placeholder.style.inlineSize = `${rect.width}px`;
    placeholder.style.setProperty(
      '--mat-list-drag-placeholder-container-color',
      sourceStyle.backgroundColor,
    );
    placeholder.style.setProperty(
      '--mat-list-drag-placeholder-content-color',
      sourceStyle.color,
    );
    options.root.value.insertBefore(placeholder, source);
    source.style.display = 'none';

    active = {
      record: currentPending.record,
      source,
      sourceDisplay,
      placeholder,
      preview,
      pointerId: currentPending.pointerId,
      startClientX: currentPending.clientX,
      startClientY: currentPending.clientY,
      fromIndex: directRecords.indexOf(currentPending.record),
      toIndex: directRecords.indexOf(currentPending.record),
      insertionIndex: sourceSegmentIndex,
      segment,
      segmentStartIndex: directRecords.indexOf(segment[0]),
      boundaryAfter: layout[segmentEnd + 1]?.element ?? null,
      scrollContainer: findScrollContainer(source),
      value: currentPending.record.value.value,
    };
    pending = undefined;
    dragging.value = true;

    try {
      source.setPointerCapture?.(active.pointerId);
    } catch {
      // Pointer capture can fail when the source is removed during the same frame.
    }
  }

  /**
   * @param {PointerEvent} event
   */
  function handlePointerMove(event) {
    if (pending && event.pointerId === pending.pointerId) {
      const distance = Math.hypot(
        event.clientX - pending.clientX,
        event.clientY - pending.clientY,
      );

      if (distance > PENDING_MOVE_THRESHOLD) {
        cancelInteraction();
      }
      return;
    }

    if (!active || event.pointerId !== active.pointerId) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    pointerFrame.schedule(event);
  }

  /**
   * @param {PointerEvent} event
   */
  function handlePointerUp(event) {
    if (pending && event.pointerId === pending.pointerId) {
      cancelInteraction();
      return;
    }

    if (!active || event.pointerId !== active.pointerId) {
      return;
    }

    pointerFrame.schedule(event);
    pointerFrame.flush();

    const completed = active;

    removeGlobalListeners();
    suppressNextClick(completed.source);

    if (completed.fromIndex !== completed.toIndex) {
      options.emitReorder({
        value: completed.value,
        fromIndex: completed.fromIndex,
        toIndex: completed.toIndex,
        originalEvent: event,
      });

      nextTick(() => {
        if (active === completed) {
          cleanupActive();
        }
      });
      return;
    }

    cleanupActive();
  }

  function handlePointerCancel() {
    cancelInteraction();
  }

  function handleWindowBlur() {
    cancelInteraction();
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleDocumentKeyDown(event) {
    if (event.key === 'Escape' && (pending || active)) {
      event.preventDefault();
      cancelInteraction();
    }
  }

  /**
   * @param {PointerEvent} event
   */
  function handlePointerDown(event) {
    if (!options.enabled.value
      || event.button !== 0
      || event.isPrimary === false
      || !(event.target instanceof Element)
      || event.target.closest('[data-mat-list-trailing]')) {
      return;
    }

    const layout = getLayout();
    const eligible = getEligibleRecords(layout);
    const entry = layout.find((candidate) => (
      candidate.record
      && eligible.has(candidate.record)
      && candidate.element.contains(event.target)
    ));

    if (!entry?.record) {
      return;
    }

    cancelInteraction();
    pending = {
      record: entry.record,
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      timer: globalThis.setTimeout(startDrag, LONG_PRESS_DELAY),
    };
    addGlobalListeners();
  }

  /**
   * @param {MouseEvent} event
   */
  function handleClickCapture(event) {
    if (!(event.target instanceof Node)
      || !suppressedClickElement?.contains(event.target)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    clearSuppressedClick();
  }

  /**
   * @param {ListDragItemRecord} record
   */
  function registerItem(record) {
    records.set(record.token, record);
    queueValidation();
  }

  /**
   * @param {symbol} token
   */
  function unregisterItem(token) {
    const record = records.get(token);

    if (record && (pending?.record === record || active?.record === record)) {
      cancelInteraction();
    }

    records.delete(token);
    queueValidation();
  }

  Object.assign(globalHandlers, {
    pointermove: handlePointerMove,
    pointerup: handlePointerUp,
    pointercancel: handlePointerCancel,
    blur: handleWindowBlur,
    keydown: handleDocumentKeyDown,
  });
  watch(options.enabled, (enabled) => {
    if (!enabled) {
      cancelInteraction();
    }

    queueValidation();
  });
  onBeforeUnmount(() => {
    cancelInteraction();
    clearSuppressedClick();
  });

  return {
    dragging,
    handleClickCapture,
    handlePointerDown,
    queueValidation,
    registerItem,
    unregisterItem,
  };
}
