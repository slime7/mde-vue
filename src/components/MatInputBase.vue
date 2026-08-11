<script setup>
import { ref } from 'vue';
import { useMatProps } from './use-mat-props';

defineOptions({
  name: 'MatInputBase',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 要渲染的原生控件；可选值为 `input`、`textarea`。
   *
   * @type {'input' | 'textarea'}
   * @required
   */
  control: {
    type: String,
    required: true,
    validator(value) {
      return ['input', 'textarea'].includes(value);
    },
  },
  /**
   * 受控字符串值，可使用 v-model。
   *
   * @type {string}
   * @required
   */
  modelValue: {
    type: String,
    required: true,
  },
  /**
   * 使用原生禁用语义。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生最大字符数。
   *
   * @type {number | undefined}
   * @default undefined
   */
  maxLength: {
    type: Number,
    default: undefined,
  },
  /**
   * 使用原生只读语义。
   *
   * @type {boolean}
   * @default false
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 设置原生 required。
   *
   * @type {boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * textarea 的初始行数；control 为 input 时忽略。
   *
   * @type {number | undefined}
   * @default undefined
   */
  rows: {
    type: Number,
    default: undefined,
  },
  /**
   * input 的原生 type；control 为 textarea 时忽略。常用值包括 `text`、`number`、`password`、`url`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  type: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('inputBase', props);

const emit = defineEmits({
  /**
   * 原生 input 事件产生新值，用于 v-model；载荷为 string。
   */
  'update:modelValue': (payload) => typeof payload === 'string',
});
const input = ref(null);

/**
 * @param {Event} event
 */
function handleInput(event) {
  emit('update:modelValue', event.target.value);
}

/**
 * 将焦点移到原生输入控件。
 *
 * @returns {void}
 */
function focusInput() {
  input.value?.focus();
}

/**
 * 获取当前原生输入控件。
 *
 * @returns {HTMLInputElement | HTMLTextAreaElement | null}
 */
function getInput() {
  return input.value;
}

defineExpose({
  focusInput,
  getInput,
});
</script>

<template>
  <component
    :is="propsWithDefaults.control"
    ref="input"
    v-bind="$attrs"
    class="mat-input-base"
    :disabled="propsWithDefaults.disabled"
    :maxlength="propsWithDefaults.maxLength"
    :readonly="propsWithDefaults.readonly"
    :required="propsWithDefaults.required"
    :rows="propsWithDefaults.control === 'textarea' ? propsWithDefaults.rows : undefined"
    :type="propsWithDefaults.control === 'input' ? propsWithDefaults.type : undefined"
    :value="propsWithDefaults.modelValue"
    @input="handleInput"
  />
</template>

<style scoped>
.mat-input-base {
  box-sizing: border-box;
  min-inline-size: 0;
  inline-size: 100%;
  margin: 0;
  padding: 0;
  color: inherit;
  font: inherit;
  background: transparent;
  border: 0;
  outline: 0;
  appearance: none;
  user-select: text;
}

.mat-input-base:is(textarea) {
  resize: vertical;
}

.mat-input-base::-webkit-search-cancel-button {
  display: none;
  appearance: none;
}

.mat-input-base::-webkit-inner-spin-button,
.mat-input-base::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

.mat-input-base::-webkit-calendar-picker-indicator {
  display: none;
  appearance: none;
}
</style>
