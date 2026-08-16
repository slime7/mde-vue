let activeTooltip = null;
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
 * 判断当前是否已有其他 Tooltip 显示；已有显示时切换进入可跳过打开延迟。
 *
 * @returns {boolean}
 */
export function shouldSkipTooltipDelay() {
  return activeTooltip !== null;
}
