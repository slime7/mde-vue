import { isComponentColor } from './button-props';

export const TEXT_INPUT_VARIANTS = ['filled', 'outlined'];

export const TEXT_INPUT_PROPS = {
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'outlined',
    validator(value) {
      return TEXT_INPUT_VARIANTS.includes(value);
    },
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  supportingText: {
    type: String,
    default: undefined,
  },
  errorText: {
    type: String,
    default: undefined,
  },
  prefixText: {
    type: String,
    default: undefined,
  },
  suffixText: {
    type: String,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
    validator(value) {
      return Number.isInteger(value) && value >= 0;
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
};
