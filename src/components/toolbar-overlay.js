const toolbarEntries = new Map();
const subscribers = new Set();
let nextToolbarId = 0;

/**
 * @typedef {object} ToolbarRect
 * @property {number} bottom
 * @property {number} height
 * @property {number} left
 * @property {number} right
 * @property {number} top
 * @property {number} width
 */

/**
 * @typedef {object} ToolbarRegistrationOptions
 * @property {() => ToolbarRect} [getRect]
 * @property {() => boolean} [isBottom]
 */

/**
 * @param {DOMRect | ToolbarRect} rect
 * @returns {ToolbarRect}
 */
function normalizeRect(rect) {
  const left = Number(rect?.left) || 0;
  const top = Number(rect?.top) || 0;
  const width = Number.isFinite(Number(rect?.width))
    ? Number(rect.width)
    : Math.max(0, (Number(rect?.right) || left) - left);
  const height = Number.isFinite(Number(rect?.height))
    ? Number(rect.height)
    : Math.max(0, (Number(rect?.bottom) || top) - top);

  return {
    bottom: Number.isFinite(Number(rect?.bottom)) ? Number(rect.bottom) : top + height,
    height,
    left,
    right: Number.isFinite(Number(rect?.right)) ? Number(rect.right) : left + width,
    top,
    width,
  };
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

function pruneDisconnectedEntries() {
  toolbarEntries.forEach((entry, id) => {
    if (!entry.element.isConnected) {
      toolbarEntries.delete(id);
    }
  });
}

/**
 * 注册一个固定 Toolbar 并返回更新和注销句柄。
 *
 * @param {HTMLElement} element
 * @param {ToolbarRegistrationOptions} [options]
 * @returns {{ unregister: () => void, update: () => void }}
 */
export function registerToolbar(element, options = {}) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('registerToolbar element 必须是 HTMLElement');
  }

  const id = nextToolbarId;
  nextToolbarId += 1;
  const entry = {
    element,
    getRect: options.getRect ?? (() => element.getBoundingClientRect()),
    isBottom: options.isBottom ?? (() => false),
  };
  let registered = true;

  toolbarEntries.set(id, entry);
  notifySubscribers();

  return {
    unregister() {
      if (!registered) {
        return;
      }

      registered = false;
      toolbarEntries.delete(id);
      notifySubscribers();
    },
    update() {
      if (registered) {
        notifySubscribers();
      }
    },
  };
}

/**
 * 获取当前仍连接到 document 的 Toolbar 矩形。
 *
 * @returns {ToolbarRect[]}
 */
export function getToolbarRects() {
  pruneDisconnectedEntries();

  return [...toolbarEntries.values()].flatMap((entry) => {
    try {
      return [normalizeRect(entry.getRect())];
    } catch {
      return [];
    }
  });
}

/**
 * 获取底部 Toolbar 从其顶部到视口底部的占用距离。
 *
 * @param {number} [viewportHeight=window.innerHeight]
 * @returns {number}
 */
export function getBottomToolbarClearance(viewportHeight = window.innerHeight) {
  pruneDisconnectedEntries();
  const height = Number.isFinite(Number(viewportHeight)) ? Number(viewportHeight) : 0;

  return Math.max(0, ...[...toolbarEntries.values()]
    .filter((entry) => entry.isBottom())
    .flatMap((entry) => {
      try {
        return [Math.max(0, height - normalizeRect(entry.getRect()).top)];
      } catch {
        return [];
      }
    }));
}

/**
 * 订阅 Toolbar 几何变化。
 *
 * @param {() => void} callback
 * @returns {() => void}
 */
export function subscribeToolbarOverlay(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('subscribeToolbarOverlay callback 必须是函数');
  }

  subscribers.add(callback);
  callback();

  return () => {
    subscribers.delete(callback);
  };
}
