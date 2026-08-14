<script setup>
import { computed, provide } from 'vue';
import { isSelectionValue } from '../selection-control';
import MatScrollArea from '../mat-scroll-area/MatScrollArea.vue';
import { useMatProps } from '../use-mat-props';
import MAT_CHIP_SET_KEY from './chip-context';

defineOptions({ name: 'MatChipSet' });

const props = defineProps({
  /**
   * Chip 的换行或单行横向滚动布局。
   *
   * @type {'wrap' | 'scroll'}
   * @default 'wrap'
   */
  layout: {
    type: String,
    default: 'wrap',
    validator(value) {
      return ['wrap', 'scroll'].includes(value);
    },
  },
  /**
   * ChipSet 的受控选择模式。
   *
   * @type {'none' | 'single' | 'multiple'}
   * @default 'none'
   */
  selection: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'single', 'multiple'].includes(value);
    },
  },
  /**
   * single 使用基础单值或 null，multiple 使用基础值数组。
   *
   * @type {string | number | boolean | Array<string | number | boolean> | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: null,
    validator(value) {
      return value === null
        || isSelectionValue(value)
        || (Array.isArray(value) && value.every(isSelectionValue));
    },
  },
});
const propsWithDefaults = useMatProps('chipSet', props);

const emit = defineEmits({
  /**
   * Chip 请求改变选择时发出下一模型值。
   */
  'update:modelValue'(value) {
    return value === null
      || isSelectionValue(value)
      || (Array.isArray(value) && value.every(isSelectionValue));
  },
});
const selectionState = computed(() => propsWithDefaults.selection);

/**
 * @param {string | number | boolean} value
 * @returns {boolean}
 */
function isSelected(value) {
  if (propsWithDefaults.selection === 'multiple') {
    return Array.isArray(propsWithDefaults.modelValue)
      && propsWithDefaults.modelValue.some((item) => Object.is(item, value));
  }

  if (propsWithDefaults.selection === 'single') {
    return Object.is(propsWithDefaults.modelValue, value);
  }

  return false;
}

/**
 * @param {string | number | boolean} value
 * @returns {void}
 */
function requestSelection(value) {
  const currentlySelected = isSelected(value);

  if (propsWithDefaults.selection === 'single') {
    emit('update:modelValue', currentlySelected ? null : value);
    return;
  }

  if (propsWithDefaults.selection === 'multiple') {
    const currentValues = Array.isArray(propsWithDefaults.modelValue)
      ? propsWithDefaults.modelValue
      : [];

    emit(
      'update:modelValue',
      currentlySelected
        ? currentValues.filter((item) => !Object.is(item, value))
        : [...currentValues, value],
    );
  }
}

provide(MAT_CHIP_SET_KEY, {
  isSelected,
  requestSelection,
  selection: selectionState,
});
</script>

<template>
  <div
    class="mat-chip-set"
    :class="`mat-chip-set--${propsWithDefaults.layout}`"
    role="group"
  >
    <MatScrollArea
      v-if="propsWithDefaults.layout === 'scroll'"
      class="mat-chip-set__scroll-area"
      orientation="horizontal"
      bar-width="hidden"
      drag-scroll
      :shadow-length="48"
    >
      <div class="mat-chip-set__scroll-content">
        <slot />
      </div>
    </MatScrollArea>

    <slot v-else />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-chip-set {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    box-sizing: border-box;
    max-inline-size: 100%;
    min-block-size: var(--mat-sys-interaction-target-min-size);
  }

  .mat-chip-set--wrap { flex-wrap: wrap; }

  .mat-chip-set--scroll {
    display: block;
    inline-size: 100%;
  }

  .mat-chip-set__scroll-area { inline-size: 100%; }

  .mat-chip-set__scroll-content {
    --mat-chip-set-focus-ring-bleed: calc(
      var(--mat-sys-interaction-focus-ring-width, 3px)
      + var(--mat-sys-interaction-focus-ring-offset, 2px)
    );
    display: inline-flex;
    gap: 8px;
    align-items: center;
    box-sizing: border-box;
    min-inline-size: max-content;
    min-block-size: var(--mat-sys-interaction-target-min-size);
    padding-inline: var(--mat-chip-set-focus-ring-bleed);
  }

  .mat-chip-set__scroll-content :deep(.mat-chip) { max-inline-size: none; }
}
</style>
