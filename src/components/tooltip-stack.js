let activeTooltip = null;
const delayGroups = new WeakMap();

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
 * @property {number} expiresAt
 */

/**
 * 记录同组中最近实际显示的 Tooltip。
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
    expiresAt: Number.POSITIVE_INFINITY,
  });
}

/**
 * 从 Tooltip 离开时启动同组快速切换窗口。
 *
 * @param {HTMLElement | null} group
 * @param {symbol} owner
 * @param {number} duration
 * @returns {void}
 */
export function leaveTooltipDelayGroup(group, owner, duration) {
  if (!group) {
    return;
  }

  const state = delayGroups.get(group);

  if (!state || state.owner !== owner) {
    return;
  }

  if (duration <= 0) {
    delayGroups.delete(group);
    return;
  }

  state.expiresAt = Date.now() + duration;
}

/**
 * 判断当前 Tooltip 是否可以继承同组最近一次展示状态并跳过延迟。
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

  if (!state || state.owner === owner) {
    return false;
  }

  if (state.expiresAt < Date.now()) {
    delayGroups.delete(group);
    return false;
  }

  return true;
}
