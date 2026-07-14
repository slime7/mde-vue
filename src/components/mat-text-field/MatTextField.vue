<script setup>
import MatTextInputBase from '../MatTextInputBase.vue';
import { TEXT_INPUT_PROPS } from '../text-input-props';

defineOptions({
  name: 'MatTextField',
  inheritAttrs: false,
});

const props = defineProps({
  ...TEXT_INPUT_PROPS,
  type: {
    type: String,
    default: 'text',
  },
});
const emit = defineEmits({
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
