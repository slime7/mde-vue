import { addAnchorName, removeAnchorName } from '../../anchor-names';
import {
  canContainLayer, createDevWarn, isDisabled, readColorOption, readObjectOptions,
} from '../common';

/**
 * @typedef {object} StateLayerOptions
 * @property {string} [color='currentcolor'] 状态层颜色。
 */

const HOST_ATTRIBUTE = 'data-mat-state-layer-host';
const PRESS_MIN_DURATION = 150;
const OPTION_KEYS = new Set(['color']);
const warn = createDevWarn('v-state-layer');

/** @type {WeakMap<HTMLElement, StateLayerRecord>} */
const records = new WeakMap();
let nextAnchorId = 0;

/**
 * @typedef {object} StateLayerRecord
 * @property {string} anchorName
 * @property {number | undefined} activePointerId
 * @property {string | undefined} activeKey
 * @property {HTMLElement} layer
 * @property {MutationObserver} observer
 * @property {number} pressStartedAt
 * @property {number | undefined} releaseTimer
 * @property {() => void} removeEventListeners
 * @property {() => void} removeGlobalPointerListeners
 */

/**
 * @param {HTMLElement} element
 * @param {string} key
 * @returns {boolean}
 */
function isActivationKey(element, key) {
  const role = element.getAttribute('role');
  const isButton = element.tagName === 'BUTTON' || role === 'button';
  const isLink = (element.tagName === 'A' && element.hasAttribute('href')) || role === 'link';

  if (isButton) {
    return key === ' ' || key === 'Enter';
  }

  return isLink && key === 'Enter';
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function clearReleaseTimer(element) {
  const record = records.get(element);

  if (record?.releaseTimer !== undefined) {
    globalThis.clearTimeout(record.releaseTimer);
    record.releaseTimer = undefined;
  }
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function clearPressed(element) {
  const record = records.get(element);

  if (!record) {
    return;
  }

  clearReleaseTimer(element);
  record.activePointerId = undefined;
  record.activeKey = undefined;
  record.removeGlobalPointerListeners();
  element.removeAttribute('data-mat-state-layer-pressed');
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function startPress(element) {
  const record = records.get(element);

  if (!record || isDisabled(element)) {
    return;
  }

  clearReleaseTimer(element);
  record.pressStartedAt = Date.now();
  element.setAttribute('data-mat-state-layer-pressed', '');
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function finishPress(element) {
  const record = records.get(element);

  if (!record || !element.hasAttribute('data-mat-state-layer-pressed')) {
    return;
  }

  record.activePointerId = undefined;
  record.activeKey = undefined;
  record.removeGlobalPointerListeners();
  clearReleaseTimer(element);
  record.releaseTimer = globalThis.setTimeout(() => {
    element.removeAttribute('data-mat-state-layer-pressed');
    record.releaseTimer = undefined;
  }, Math.max(0, PRESS_MIN_DURATION - (Date.now() - record.pressStartedAt)));
}

/**
 * @param {HTMLElement} element
 * @param {PointerEvent} event
 * @returns {void}
 */
function handlePointerDown(element, event) {
  const record = records.get(element);

  if (!record || event.button !== 0 || record.activePointerId !== undefined) {
    return;
  }

  startPress(element);

  if (!element.hasAttribute('data-mat-state-layer-pressed')) {
    return;
  }

  record.activePointerId = event.pointerId;
  const finishPointer = (finishEvent) => {
    if (finishEvent.pointerId === record.activePointerId) {
      finishPress(element);
    }
  };
  window.addEventListener('pointerup', finishPointer);
  window.addEventListener('pointercancel', finishPointer);
  record.removeGlobalPointerListeners = () => {
    window.removeEventListener('pointerup', finishPointer);
    window.removeEventListener('pointercancel', finishPointer);
    record.removeGlobalPointerListeners = () => {};
  };
}

/**
 * @param {HTMLElement} element
 * @param {KeyboardEvent} event
 * @returns {void}
 */
function handleKeyDown(element, event) {
  const record = records.get(element);

  if (!record || event.repeat || record.activeKey !== undefined || !isActivationKey(element, event.key)) {
    return;
  }

  startPress(element);

  if (element.hasAttribute('data-mat-state-layer-pressed')) {
    record.activeKey = event.key;
  }
}

/**
 * @param {HTMLElement} element
 * @param {KeyboardEvent} event
 * @returns {void}
 */
function handleKeyUp(element, event) {
  const record = records.get(element);

  if (record?.activeKey === event.key) {
    finishPress(element);
  }
}

/**
 * @param {HTMLElement} element
 * @param {import('vue').DirectiveBinding<StateLayerOptions | undefined>} binding
 * @returns {void}
 */
function mountStateLayer(element, binding) {
  if (!canContainLayer(element)) {
    warn(`<${element.tagName.toLowerCase()}> 无法容纳状态层；指令已跳过。`);
    return;
  }

  nextAnchorId += 1;
  const anchorName = `--mat-state-layer-${nextAnchorId}`;
  const layer = document.createElement('span');
  layer.className = 'mat-state-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.style.setProperty('position-anchor', anchorName);
  layer.style.backgroundColor = readColorOption(readObjectOptions(binding.value, OPTION_KEYS, warn).color, warn);
  addAnchorName(element, anchorName);
  element.setAttribute(HOST_ATTRIBUTE, '');
  element.prepend(layer);

  const record = {
    activeKey: undefined,
    activePointerId: undefined,
    anchorName,
    layer,
    observer: undefined,
    pressStartedAt: 0,
    releaseTimer: undefined,
    removeGlobalPointerListeners: () => {},
  };
  const pointerDown = (event) => handlePointerDown(element, event);
  const keyDown = (event) => handleKeyDown(element, event);
  const keyUp = (event) => handleKeyUp(element, event);
  const finish = () => finishPress(element);
  const observer = new MutationObserver(() => {
    if (isDisabled(element)) {
      clearPressed(element);
    }
  });
  record.observer = observer;
  records.set(element, record);
  element.addEventListener('pointerdown', pointerDown);
  element.addEventListener('keydown', keyDown);
  element.addEventListener('keyup', keyUp);
  element.addEventListener('blur', finish);
  element.addEventListener('lostpointercapture', finish);
  observer.observe(element, {
    attributeFilter: ['aria-disabled', 'disabled', 'href', 'role'],
    attributes: true,
  });

  record.removeEventListeners = () => {
    element.removeEventListener('pointerdown', pointerDown);
    element.removeEventListener('keydown', keyDown);
    element.removeEventListener('keyup', keyUp);
    element.removeEventListener('blur', finish);
    element.removeEventListener('lostpointercapture', finish);
  };
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function unmountStateLayer(element) {
  const record = records.get(element);

  if (!record) {
    return;
  }

  clearPressed(element);
  record.removeEventListeners();
  record.observer.disconnect();
  record.layer.remove();
  element.removeAttribute(HOST_ATTRIBUTE);
  removeAnchorName(element, record.anchorName);
  records.delete(element);
}

/** @type {import('vue').ObjectDirective<HTMLElement, StateLayerOptions | undefined>} */
const StateLayer = {
  mounted: mountStateLayer,
  updated(element, binding) {
    const record = records.get(element);

    if (record) {
      record.layer.style.backgroundColor = readColorOption(readObjectOptions(binding.value, OPTION_KEYS, warn).color, warn);
    }
  },
  unmounted: unmountStateLayer,
};

export { StateLayer };
export default StateLayer;
