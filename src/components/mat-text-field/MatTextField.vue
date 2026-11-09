<script setup>
import MatTextInputBase from '../MatTextInputBase.vue';
import { isTextInputDensity, TEXT_INPUT_PROPS } from '../text-input-props';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatTextField',
  inheritAttrs: false,
});

const props = defineProps({
  ...TEXT_INPUT_PROPS,
  /**
   * 单行字段的垂直密度。
   *
   * 可选值为 `default`、`compact`。compact 保持字号、图标和交互目标，仅压缩字段的上下留白。
   *
   * @type {'default' | 'compact'}
   * @default 'default'
   */
  density: {
    type: String,
    default: 'default',
    validator: isTextInputDensity,
  },
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
const propsWithDefaults = useMatProps('textField', props);
const emit = defineEmits({
  /**
   * 原生 input 事件产生新值，用于 v-model；载荷为 string。
   */
  'update:modelValue': (payload) => typeof payload === 'string',
});
</script>

<template>
  <MatTextInputBase
    v-bind="{ ...$attrs, ...propsWithDefaults }"
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
