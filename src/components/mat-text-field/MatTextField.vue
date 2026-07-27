<script setup>
import MatTextInputBase from '../MatTextInputBase.vue';
import { TEXT_INPUT_PROPS } from '../text-input-props';

defineOptions({
  name: 'MatTextField',
  inheritAttrs: false,
});

const props = defineProps({
  ...TEXT_INPUT_PROPS,
  /**
   * 原生 input 类型。
   *
   * 常用值包括 `text`、`email`、`number`、`password`、`search`、`tel`、`url`。
   *
   * @type {string}
   * @default 'text'
   */
  type: {
    type: String,
    default: 'text',
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
    control="input"
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
