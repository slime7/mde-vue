<script setup>
import MatTextInputBase from '../MatTextInputBase.vue';
import { TEXT_INPUT_PROPS } from '../text-input-props';

defineOptions({
  name: 'MatTextarea',
  inheritAttrs: false,
});

const props = defineProps({
  ...TEXT_INPUT_PROPS,
  /**
   * textarea 的初始可见行数，必须为正整数。
   *
   * @type {number}
   * @default 4
   */
  rows: {
    type: Number,
    default: 4,
    validator(value) {
      return Number.isInteger(value) && value > 0;
    },
  },
});
const emit = defineEmits({
  /**
   * 原生 input 事件产生新值，用于 v-model；载荷为 string。
   */
  'update:modelValue': (payload) => typeof payload === 'string',
});
</script>

<template>
  <MatTextInputBase
    v-bind="{ ...$attrs, ...props }"
    control="textarea"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>

    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
  </MatTextInputBase>
</template>
