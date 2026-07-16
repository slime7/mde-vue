let activeTooltip = null;

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
