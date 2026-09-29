const DEFAULT_COLOR = 'currentcolor';
const UNSUPPORTED_TAGS = new Set([
  'AREA', 'AUDIO', 'BASE', 'BR', 'CANVAS', 'COL', 'EMBED', 'HR', 'IFRAME', 'IMG',
  'INPUT', 'LINK', 'META', 'METER', 'OBJECT', 'PARAM', 'PROGRESS', 'SELECT', 'SOURCE',
  'TRACK', 'VIDEO', 'WBR',
]);

/**
 * @param {string} directiveName 指令名称，例如 "v-state-layer"。
 * @returns {(message: string) => void} 仅在开发环境输出的警告函数。
 */
export function createDevWarn(directiveName) {
  return (message) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[mde-vue] ${directiveName}: ${message}`);
    }
  };
}

/**
 * 读取对象形式的指令绑定值；非法输入回退空对象并警告未知选项。
 *
 * @param {unknown} value 指令绑定值。
 * @param {Set<string>} allowedKeys 允许的选项键。
 * @param {(message: string) => void} warn 警告函数。
 * @returns {Record<string, unknown>}
 */
export function readObjectOptions(value, allowedKeys, warn) {
  if (value === undefined) {
    return {};
  }

  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    warn('绑定值必须是对象；已使用默认配置。');
    return {};
  }

  Object.keys(value).forEach((key) => {
    if (!allowedKeys.has(key)) {
      warn(`未知选项“${key}”已忽略。`);
    }
  });

  return value;
}

/**
 * 解析颜色选项；非法值回退 currentcolor。
 *
 * @param {unknown} color 选项中的颜色值。
 * @param {(message: string) => void} warn 警告函数。
 * @returns {string}
 */
export function readColorOption(color, warn) {
  if (color === undefined) {
    return DEFAULT_COLOR;
  }

  if (typeof color !== 'string' || (typeof CSS !== 'undefined' && !CSS.supports('color', color))) {
    warn('color 必须是有效的 CSS 颜色；已回退为 currentcolor。');
    return DEFAULT_COLOR;
  }

  return color;
}

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isDisabled(element) {
  return element.matches(':disabled') || element.getAttribute('aria-disabled') === 'true';
}

/**
 * 宿主必须能容纳子元素且不使用 display: contents。
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function canContainLayer(element) {
  return !UNSUPPORTED_TAGS.has(element.tagName) && getComputedStyle(element).display !== 'contents';
}
