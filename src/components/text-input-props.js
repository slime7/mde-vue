import { isComponentColor } from './button-props';

export const TEXT_INPUT_VARIANTS = ['filled', 'outlined'];

export const TEXT_INPUT_PROPS = {
  /**
   * 受控输入值，可使用 `v-model`。
   *
   * @type {string}
   * @default ''
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * 始终可见的输入标签；输入有值、获得焦点或设置 placeholder 时浮动。
   *
   * @type {string | undefined}
   * @default undefined
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * 输入框外观。
   *
   * 可选值为 `outlined`、`filled`。
   *
   * @type {'outlined' | 'filled'}
   * @default 'outlined'
   */
  variant: {
    type: String,
    default: 'outlined',
    validator(value) {
      return TEXT_INPUT_VARIANTS.includes(value);
    },
  },
  /**
   * 焦点描边、活动指示器和光标的强调色。
   *
   * 可使用 `primary`、`secondary`、`tertiary`、`error` 或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {'primary' | 'secondary' | 'tertiary' | 'error' | `#${string}` | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 控件下方的简短辅助说明。
   *
   * @type {string | undefined}
   * @default undefined
   */
  supportingText: {
    type: String,
    default: undefined,
  },
  /**
   * `error` 为 true 时显示的错误说明，并替换 supportingText。
   *
   * @type {string | undefined}
   * @default undefined
   */
  errorText: {
    type: String,
    default: undefined,
  },
  /**
   * 输入值之前的固定短文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  prefixText: {
    type: String,
    default: undefined,
  },
  /**
   * 输入值之后的固定短文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  suffixText: {
    type: String,
    default: undefined,
  },
  /**
   * 原生输入控件允许的最大字符数，必须是非负整数。
   *
   * @type {number | undefined}
   * @default undefined
   */
  maxLength: {
    type: Number,
    default: undefined,
    validator(value) {
      return Number.isInteger(value) && value >= 0;
    },
  },
  /**
   * 使用原生禁用语义并降低内容强调。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 使用原生只读语义，保留选择和焦点。
   *
   * @type {boolean}
   * @default false
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 设置原生 `required`，并在标签后显示星号。
   *
   * @type {boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * 启用错误外观、`aria-invalid` 和错误说明关联。
   *
   * @type {boolean}
   * @default false
   */
  error: {
    type: Boolean,
    default: false,
  },
};
