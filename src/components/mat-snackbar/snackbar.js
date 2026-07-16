import { h, render } from 'vue';
import { completeSnackbar, enqueueSnackbar } from '../snackbar-queue';
import ImperativeSnackbarHost from './ImperativeSnackbarHost.vue';

const POSITIONS = ['left', 'center', 'right'];

/**
 * @typedef {object} SnackbarOptions
 * @property {string} text
 * @property {string} [actionText]
 * @property {() => void} [onAction]
 * @property {boolean} [closable=false]
 * @property {string} [closeLabel='关闭']
 * @property {'left'|'center'|'right'} [position='center']
 * @property {number} [duration=4000]
 */

/**
 * @typedef {object} NormalizedSnackbarOptions
 * @property {string} text
 * @property {string | undefined} actionText
 * @property {(() => void) | undefined} onAction
 * @property {boolean} closable
 * @property {string} closeLabel
 * @property {'left'|'center'|'right'} position
 * @property {number} duration
 */

/** @type {HTMLDivElement | null} */
let host = null;

function ensureClient() {
  if (typeof document === 'undefined' || !document.body) {
    throw new Error('Snackbar 命令式函数只能在客户端环境中调用');
  }
}

/**
 * @param {*} options
 */
function assertOptions(options) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('snackbar options 必须是对象');
  }
}

/**
 * @param {*} options
 * @returns {NormalizedSnackbarOptions}
 */
function normalizeOptions(options) {
  assertOptions(options);

  if (typeof options.text !== 'string' || options.text.trim().length === 0) {
    throw new TypeError('snackbar text 必须是非空字符串');
  }

  if (options.actionText !== undefined && (
    typeof options.actionText !== 'string' || options.actionText.trim().length === 0
  )) {
    throw new TypeError('snackbar actionText 必须是非空字符串');
  }

  if (options.onAction !== undefined && typeof options.onAction !== 'function') {
    throw new TypeError('snackbar onAction 必须是函数');
  }

  if (options.closable !== undefined && typeof options.closable !== 'boolean') {
    throw new TypeError('snackbar closable 必须是 boolean');
  }

  if (options.closeLabel !== undefined && (
    typeof options.closeLabel !== 'string' || options.closeLabel.trim().length === 0
  )) {
    throw new TypeError('snackbar closeLabel 必须是非空字符串');
  }

  if (options.position !== undefined && !POSITIONS.includes(options.position)) {
    throw new TypeError('snackbar position 无效');
  }

  if (options.duration !== undefined && (
    !Number.isFinite(options.duration) || options.duration < 0
  )) {
    throw new TypeError('snackbar duration 必须是大于等于 0 的有限数字');
  }

  return {
    actionText: options.actionText,
    closable: options.closable ?? false,
    closeLabel: options.closeLabel ?? '关闭',
    duration: options.duration ?? 4000,
    onAction: options.onAction,
    position: options.position ?? 'center',
    text: options.text,
  };
}

function ensureHost() {
  if (host?.isConnected) {
    return host;
  }

  host = document.createElement('div');
  host.dataset.matSnackbarHost = '';
  document.body.append(host);
  return host;
}

function cleanupHost() {
  if (!host || host.childNodes.length > 0) {
    return;
  }

  host.remove();
  host = null;
}

/**
 * 快速展示一条 Snackbar，并在退出动画和宿主清理完成后结算。
 *
 * @param {SnackbarOptions} options
 * @returns {Promise<void>}
 * @throws {TypeError} 参数不是对象或属性无效时通过 rejected Promise 返回。
 * @throws {Error} 非客户端环境调用时通过 rejected Promise 返回。
 */
export function snackbar(options) {
  try {
    ensureClient();
    const normalized = normalizeOptions(options);

    return new Promise((resolve, reject) => {
      let settled = false;
      let entry;

      function resolveRequest() {
        if (settled) {
          return;
        }

        settled = true;
        const currentHost = host;

        if (currentHost) {
          render(null, currentHost);
        }

        resolve();
        completeSnackbar(entry);
        cleanupHost();
      }

      /**
       * @param {unknown} error
       */
      function rejectRequest(error) {
        if (settled) {
          return;
        }

        settled = true;
        const currentHost = host;

        if (currentHost) {
          render(null, currentHost);
        }

        reject(error);
        completeSnackbar(entry);
        cleanupHost();
      }

      entry = {
        activate() {
          try {
            const currentHost = ensureHost();

            render(h(ImperativeSnackbarHost, {
              onClosed: resolveRequest,
              options: normalized,
            }), currentHost);
          } catch (error) {
            rejectRequest(error);
          }
        },
      };
      enqueueSnackbar(entry);
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * snackbar() 的别名。
 *
 * @type {typeof snackbar}
 */
export const toast = snackbar;
