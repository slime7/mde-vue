import { h, render } from 'vue';
import { isComponentColor } from '../button-props';
import ImperativeDialogHost from './ImperativeDialogHost.vue';

const ACTION_VARIANTS = [
  'elevated', 'filled', 'filled-tonal', 'outlined', 'standard', 'text',
];
const BOOLEAN_OPTIONS = ['fullScreen', 'scrim', 'closeOnBack'];
const STRING_OPTIONS = ['title', 'content', 'icon', 'closeLabel', 'ariaLabel'];

/**
 * @typedef {object} DialogAction
 * @property {string} text
 * @property {*} [value]
 * @property {'elevated'|'filled'|'filled-tonal'|'outlined'|'standard'|'text'} [variant='text']
 * @property {string} [color]
 * @property {boolean} [disabled=false]
 */

/**
 * @typedef {object} DialogOptions
 * @property {string|HTMLElement} [attach='body']
 * @property {boolean} [fullScreen=false]
 * @property {boolean} [scrim=true]
 * @property {boolean} [closeOnBack=false]
 * @property {string} [title]
 * @property {string} [content]
 * @property {string} [icon]
 * @property {string} [closeLabel='关闭']
 * @property {string} [color]
 * @property {string} [ariaLabel]
 * @property {DialogAction[]} [actions]
 */

function ensureClient() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('Dialog 命令式函数只能在客户端环境中调用');
  }
}

/**
 * @param {*} options
 */
function assertOptions(options) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('dialog options 必须是对象');
  }
}

/**
 * @param {string|HTMLElement|undefined} attach
 * @returns {HTMLElement}
 */
function resolveAttach(attach) {
  const value = attach ?? 'body';
  let target = null;

  if (typeof value === 'string') {
    try {
      target = document.querySelector(value);
    } catch {
      throw new TypeError('dialog attach 必须是有效的 CSS 选择器或 HTMLElement');
    }
  } else if (value instanceof HTMLElement && value.ownerDocument === document) {
    target = value;
  } else {
    throw new TypeError('dialog attach 必须是有效的 CSS 选择器或 HTMLElement');
  }

  if (!target) {
    throw new TypeError('dialog attach 未找到目标元素');
  }

  return target;
}

/**
 * @param {DialogAction} action
 * @returns {Required<Pick<DialogAction, 'text'|'variant'|'disabled'>> & DialogAction}
 */
function normalizeAction(action) {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new TypeError('dialog action 必须是对象');
  }

  if (typeof action.text !== 'string' || action.text.trim().length === 0) {
    throw new TypeError('dialog action text 必须是非空字符串');
  }

  if (action.variant !== undefined && !ACTION_VARIANTS.includes(action.variant)) {
    throw new TypeError('dialog action variant 无效');
  }

  if (action.color !== undefined && !isComponentColor(action.color)) {
    throw new TypeError('dialog action color 无效');
  }

  if (action.disabled !== undefined && typeof action.disabled !== 'boolean') {
    throw new TypeError('dialog action disabled 必须是 boolean');
  }

  return {
    ...action,
    disabled: action.disabled ?? false,
    text: action.text,
    variant: action.variant ?? 'text',
  };
}

/**
 * @param {DialogOptions & {promptConfig?: object}} options
 */
function normalizeOptions(options) {
  assertOptions(options);

  BOOLEAN_OPTIONS.forEach((name) => {
    if (options[name] !== undefined && typeof options[name] !== 'boolean') {
      throw new TypeError(`dialog ${name} 必须是 boolean`);
    }
  });
  STRING_OPTIONS.forEach((name) => {
    if (options[name] !== undefined && typeof options[name] !== 'string') {
      throw new TypeError(`dialog ${name} 必须是 string`);
    }
  });

  if (options.closeLabel !== undefined && options.closeLabel.trim().length === 0) {
    throw new TypeError('dialog closeLabel 必须是非空字符串');
  }

  if (options.color !== undefined && !isComponentColor(options.color)) {
    throw new TypeError('dialog color 无效');
  }

  if (options.actions !== undefined && !Array.isArray(options.actions)) {
    throw new TypeError('dialog actions 必须是数组');
  }

  const normalized = {
    actions: (options.actions ?? [{ text: '确定', value: undefined }]).map(normalizeAction),
    attach: resolveAttach(options.attach),
  };

  [...BOOLEAN_OPTIONS, ...STRING_OPTIONS, 'color'].forEach((name) => {
    if (options[name] !== undefined) {
      normalized[name] = options[name];
    }
  });

  if (options.promptConfig) {
    normalized.promptConfig = options.promptConfig;
  }

  return normalized;
}

/**
 * @template T
 * @param {DialogOptions & {promptConfig?: object}} options
 * @param {T} cancelValue
 * @returns {Promise<T>}
 */
function openDialog(options, cancelValue) {
  try {
    ensureClient();
    const normalized = normalizeOptions(options);

    return new Promise((resolve, reject) => {
      const host = document.createElement('div');

      host.dataset.matDialogHost = '';
      document.body.append(host);

      try {
        render(h(ImperativeDialogHost, {
          cancelValue,
          options: normalized,
          onClosed(value) {
            render(null, host);
            host.remove();
            resolve(value);
          },
        }), host);
      } catch (error) {
        render(null, host);
        host.remove();
        reject(error);
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 打开简单 Dialog，选择动作后返回对应 value，取消时返回 undefined。
 *
 * @template T
 * @param {DialogOptions} [options]
 * @returns {Promise<T|undefined>}
 */
export function dialog(options = {}) {
  return openDialog(options, undefined);
}

/**
 * 打开只有确认动作的提示 Dialog。
 *
 * @param {Omit<DialogOptions, 'actions'> & {confirmText?: string}} [options]
 * @returns {Promise<void>}
 */
export function alert(options = {}) {
  try {
    assertOptions(options);

    if (options.confirmText !== undefined
      && (typeof options.confirmText !== 'string' || options.confirmText.trim().length === 0)) {
      throw new TypeError('alert confirmText 必须是非空字符串');
    }

    return openDialog({
      ...options,
      actions: [{ text: options.confirmText ?? '确定', value: undefined }],
    }, undefined);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 打开确认 Dialog。
 *
 * @param {Omit<DialogOptions, 'actions'> & {confirmText?: string, cancelText?: string}} [options]
 * @returns {Promise<boolean>}
 */
export function confirm(options = {}) {
  try {
    assertOptions(options);
    const confirmText = options.confirmText ?? '确定';
    const cancelText = options.cancelText ?? '取消';

    if (typeof confirmText !== 'string' || confirmText.trim().length === 0) {
      throw new TypeError('confirm confirmText 必须是非空字符串');
    }

    if (typeof cancelText !== 'string' || cancelText.trim().length === 0) {
      throw new TypeError('confirm cancelText 必须是非空字符串');
    }

    return openDialog({
      ...options,
      actions: [
        { text: cancelText, value: false },
        { text: confirmText, value: true },
      ],
    }, false);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 打开带单行输入的 Dialog。
 *
 * @param {Omit<DialogOptions, 'actions'> & {confirmText?: string, cancelText?: string, defaultValue?: string, label?: string, placeholder?: string, required?: boolean}} [options]
 * @returns {Promise<string|null>}
 */
export function prompt(options = {}) {
  try {
    assertOptions(options);
    const confirmText = options.confirmText ?? '确定';
    const cancelText = options.cancelText ?? '取消';
    const defaultValue = options.defaultValue ?? '';
    const required = options.required ?? false;

    [
      ['confirmText', confirmText, true],
      ['cancelText', cancelText, true],
      ['defaultValue', defaultValue, false],
      ['label', options.label, false],
      ['placeholder', options.placeholder, false],
    ].forEach(([name, value, nonEmpty]) => {
      if (value !== undefined && (typeof value !== 'string' || (nonEmpty && value.trim().length === 0))) {
        throw new TypeError(`prompt ${name} 必须是${nonEmpty ? '非空' : ''}字符串`);
      }
    });

    if (typeof required !== 'boolean') {
      throw new TypeError('prompt required 必须是 boolean');
    }

    return openDialog({
      ...options,
      actions: [
        { text: cancelText, value: null },
        { text: confirmText, value: undefined },
      ],
      promptConfig: {
        defaultValue,
        label: options.label,
        placeholder: options.placeholder,
        required,
      },
    }, null);
  } catch (error) {
    return Promise.reject(error);
  }
}
