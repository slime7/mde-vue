let activeTooltip = null;
const delayGroups = new WeakMap();
let inputModality = 'pointer';

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', () => {
    inputModality = 'keyboard';
  }, true);
  window.addEventListener('pointerdown', () => {
    inputModality = 'pointer';
  }, true);
}

/**
 * 判断最近一次用户输入是否为键盘，用于只对键盘聚焦显示 Tooltip。
 *
 * @returns {boolean}
 */
export function isKeyboardTooltipFocus() {
  return inputModality === 'keyboard';
}

/**
 * @typedef {object} TooltipStackEntry
 * @property {() => void} close
 */

/**
 * 使一个 Tooltip 成为当前唯一可见的 Tooltip。
 *
 * @param {TooltipStackEntry} tooltip
 * @returns {void}
 */
export function activateTooltip(tooltip) {
  if (activeTooltip && activeTooltip !== tooltip) {
    activeTooltip.close();
  }

  activeTooltip = tooltip;
}

/**
 * @param {TooltipStackEntry} tooltip
 * @returns {void}
 */
export function deactivateTooltip(tooltip) {
  if (activeTooltip === tooltip) {
    activeTooltip = null;
  }
}

/**
 * @typedef {object} TooltipDelayGroupState
 * @property {symbol} owner
 * @property {boolean} displayed
 */

/**
 * 记录同组中当前实际显示的 Tooltip。
 *
 * @param {HTMLElement | null} group
 * @param {symbol} owner
 * @returns {void}
 */
export function activateTooltipDelayGroup(group, owner) {
  if (!group) {
    return;
  }

  delayGroups.set(group, {
    owner,
    displayed: true,
  });
}

/**
 * 同组 Tooltip 关闭后清除显示状态。
 *
 * @param {HTMLElement | null} group
 * @param {symbol} owner
 * @returns {void}
 */
export function deactivateTooltipDelayGroup(group, owner) {
  if (!group) {
    return;
  }

  const state = delayGroups.get(group);

  if (!state || state.owner !== owner) {
    return;
  }

  delayGroups.delete(group);
}

/**
 * 判断当前 Tooltip 是否可以跳过同组打开延迟。
 *
 * @param {HTMLElement | null} group
 * @param {symbol} owner
 * @returns {boolean}
 */
export function shouldSkipTooltipDelay(group, owner) {
  if (!group) {
    return false;
  }

  const state = delayGroups.get(group);

  return Boolean(state) && state.owner !== owner && state.displayed;
}
