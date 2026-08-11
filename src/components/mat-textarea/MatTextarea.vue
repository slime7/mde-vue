<script setup>
import { getCurrentInstance } from 'vue';
import MatTextInputBase from '../MatTextInputBase.vue';
import { TEXT_INPUT_PROPS } from '../text-input-props';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatTextarea',
  inheritAttrs: false,
});

const props = defineProps({
  ...TEXT_INPUT_PROPS,
  /**
   * 根据内容自动调整 textarea 高度。
   *
   * @type {boolean}
   * @default false
   */
  autoGrow: {
    type: Boolean,
    default: false,
  },
  /**
   * 自动增高的最大行数；小于 rows 时按 rows 处理。
   *
   * @type {number | undefined}
   * @default undefined
   */
  maxRows: {
    type: Number,
    default: undefined,
    validator(value) {
      return Number.isInteger(value) && value > 0;
    },
  },
  /**
   * 禁止使用浏览器手柄调整 textarea 大小。
   *
   * @type {boolean}
   * @default false
   */
  noResize: {
    type: Boolean,
    default: false,
  },
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
const propsWithDefaults = useMatProps('textarea', props);
const instance = getCurrentInstance();

/**
 * @returns {number}
 */
function getResizeMinRows() {
  return Object.hasOwn(instance.vnode.props ?? {}, 'rows') ? propsWithDefaults.rows : 1;
}

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
    control="textarea"
    :resize-min-rows="getResizeMinRows()"
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
