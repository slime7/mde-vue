<script setup>
import {
  computed, provide, ref,
} from 'vue';
import { isComponentColor } from '../button-props';
import MatList from '../mat-list/MatList.vue';
import { isSelectionValue } from '../selection-control';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import { MAT_EXPANSION_KEY } from './expansion-context';

defineOptions({
  name: 'MatExpansion',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控展开值；多选时为数组，手风琴模式 (multiple=false) 时为单值或 null。
   *
   * @type {Array<string | number | boolean> | string | number | boolean | null | undefined}
   * @default undefined
   */
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: undefined,
    validator(value) {
      if (value === undefined || value === null) {
        return true;
      }
      if (Array.isArray(value)) {
        return value.every(isSelectionValue);
      }
      return isSelectionValue(value);
    },
  },
  /**
   * 是否允许多个面板同时展开；设为 false 时为单选手风琴模式。
   *
   * @type {boolean}
   * @default true
   */
  multiple: {
    type: Boolean,
    default: true,
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 是否全局禁用所有子面板。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 根元素语义；可选值为 `div`、`section`、`article`、`ul` 等。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
  },
  /**
   * 列表布局形态；可选值为 `standard`、`segmented`。
   *
   * @type {'standard' | 'segmented'}
   * @default 'segmented'
   */
  variant: {
    type: String,
    default: 'segmented',
    validator(value) {
      return ['standard', 'segmented'].includes(value);
    },
  },
});
const propsWithDefaults = useMatProps('expansion', props);

const emit = defineEmits({
  /**
   * 展开面板状态改变时触发，多选模式载荷为数组，单选模式为单值或 null。
   */
  'update:modelValue'(payload) {
    if (payload === null || payload === undefined) {
      return true;
    }
    if (Array.isArray(payload)) {
      return payload.every(isSelectionValue);
    }
    return isSelectionValue(payload);
  },
});

const internalValue = ref(propsWithDefaults.multiple ? [] : null);
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => propsWithDefaults.color));

const isControlled = computed(() => propsWithDefaults.modelValue !== undefined);

const currentExpanded = computed(() => {
  if (isControlled.value) {
    return propsWithDefaults.modelValue;
  }
  return internalValue.value;
});

const expandedList = computed(() => {
  const value = currentExpanded.value;
  if (propsWithDefaults.multiple) {
    return Array.isArray(value) ? value : [];
  }
  return value !== null && value !== undefined ? [value] : [];
});

/**
 * @param {Array<string | number | boolean>} newExpanded
 */
function handleExpandedUpdate(newExpanded) {
  if (propsWithDefaults.multiple) {
    if (!isControlled.value) {
      internalValue.value = newExpanded;
    }
    emit('update:modelValue', newExpanded);
    return;
  }

  const previousList = expandedList.value;
  const added = newExpanded.filter((v) => !previousList.some((prev) => Object.is(prev, v)));
  const nextSingle = added.length > 0 ? added[added.length - 1] : null;

  if (!isControlled.value) {
    internalValue.value = nextSingle;
  }
  emit('update:modelValue', nextSingle);
}

function isGroupExpanded(value) {
  return expandedList.value.some((expandedValue) => Object.is(expandedValue, value));
}

provide(MAT_EXPANSION_KEY, {
  isExpanded: isGroupExpanded,
  color: computed(() => propsWithDefaults.color),
  disabled: computed(() => propsWithDefaults.disabled),
  variant: computed(() => propsWithDefaults.variant),
  multiple: computed(() => propsWithDefaults.multiple),
});
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    v-bind="$attrs"
    class="mat-expansion"
    :class="{
      'mat-expansion--explicit-color': hasExplicitColor,
    }"
    :style="colorStyle"
  >
    <MatList
      :variant="propsWithDefaults.variant"
      :color="propsWithDefaults.color"
      :expanded="expandedList"
      @update:expanded="handleExpandedUpdate"
    >
      <slot />
    </MatList>
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-expansion {
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    min-inline-size: 0;
  }

  .mat-expansion--explicit-color {
    --mat-list-item-container-color: var(--mat-accent-container-color);
    --mat-list-item-label-color: var(--mat-on-accent-container-color);
    --mat-list-item-supporting-color: var(--mat-on-accent-container-color);
    --mat-list-item-state-layer-color: var(--mat-on-accent-container-color);
    --mat-list-item-label-text-color: var(--mat-on-accent-container-color);
    --mat-list-item-supporting-text-color: var(--mat-on-accent-container-color);
  }
}
</style>
