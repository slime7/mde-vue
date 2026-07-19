<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'MatInputBase',
  inheritAttrs: false,
});

const props = defineProps({
  control: {
    type: String,
    required: true,
    validator(value) {
      return ['input', 'textarea'].includes(value);
    },
  },
  modelValue: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: undefined,
  },
  type: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits({
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
    :is="props.control"
    ref="input"
    v-bind="$attrs"
    class="mat-input-base"
    :disabled="props.disabled"
    :maxlength="props.maxLength"
    :readonly="props.readonly"
    :required="props.required"
    :rows="props.control === 'textarea' ? props.rows : undefined"
    :type="props.control === 'input' ? props.type : undefined"
    :value="props.modelValue"
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
}

.mat-input-base:is(textarea) {
  resize: vertical;
}
</style>
