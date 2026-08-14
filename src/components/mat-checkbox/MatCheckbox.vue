<script setup>
import { computed } from 'vue';
import MatSelectionControlBase from '../MatSelectionControlBase.vue';
import { isComponentColor } from '../button-props';
import { isCheckboxModelValue, isSelectionValue } from '../selection-control';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatCheckbox',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前值；数组模式按 value 增删项目。
   *
   * @type {boolean | Array<string | number | boolean>}
   * @default false
   */
  modelValue: {
    type: [Boolean, Array],
    default: false,
    validator: isCheckboxModelValue,
  },
  /**
   * 数组模式中的候选值；布尔模式忽略。
   *
   * @type {string | number | boolean}
   * @default true
   */
  value: {
    type: [String, Number, Boolean],
    default: true,
    validator: isSelectionValue,
  },
  /**
   * 显示父级部分选中的不确定状态。
   *
   * @type {boolean}
   * @default false
   */
  indeterminate: {
    type: Boolean,
    default: false,
  },
  /**
   * 禁止指针与键盘交互。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
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
});
const propsWithDefaults = useMatProps('checkbox', props);

const emit = defineEmits({
  /**
   * 使用者切换选中状态时触发，载荷为下一布尔值或新数组。
   */
  'update:modelValue': isCheckboxModelValue,
  /**
   * 使用者操作当前 Checkbox 后请求关闭不确定状态，载荷为 `false`。
   */
  'update:indeterminate'(value) {
    return typeof value === 'boolean';
  },
  /**
   * 内部 checkbox 发生 change 时转发原生 `Event`。
   */
  change(event) {
    return event instanceof Event;
  },
});
const checked = computed(() => {
  if (Array.isArray(propsWithDefaults.modelValue)) {
    return propsWithDefaults.modelValue.some((item) => Object.is(item, propsWithDefaults.value));
  }

  return propsWithDefaults.modelValue;
});

/**
 * @param {Event} event
 */
function handleChange(event) {
  const nextChecked = event.target.checked;

  if (Array.isArray(propsWithDefaults.modelValue)) {
    const nextValue = nextChecked
      ? [...propsWithDefaults.modelValue, propsWithDefaults.value]
      : propsWithDefaults.modelValue.filter((item) => !Object.is(item, propsWithDefaults.value));

    emit('update:modelValue', nextValue);
  } else {
    emit('update:modelValue', nextChecked);
  }

  emit('update:indeterminate', false);
  emit('change', event);
}
</script>

<template>
  <MatSelectionControlBase
    v-bind="$attrs"
    class="mat-checkbox"
    :class="{
      'mat-checkbox--checked': checked,
      'mat-checkbox--indeterminate': propsWithDefaults.indeterminate,
    }"
    :checked="checked"
    :color="propsWithDefaults.color"
    :disabled="propsWithDefaults.disabled"
    :indeterminate="propsWithDefaults.indeterminate"
    input-type="checkbox"
    :input-value="propsWithDefaults.value"
    label-name="MatCheckbox"
    @change="handleChange"
  >
    <template #indicator>
      <span class="mat-checkbox__box">
        <span class="mat-checkbox__check" />
        <span class="mat-checkbox__mixed" />
      </span>
    </template>

    <slot />
  </MatSelectionControlBase>
</template>

<style scoped>
@layer mde.components {
  .mat-checkbox {
    --mat-accent-color: var(--mat-checkbox-selected-container-color);
    --mat-on-accent-color: var(--mat-checkbox-selected-icon-color);
    --mat-selection-control-indicator-width: var(--mat-checkbox-container-size);
    --mat-selection-control-indicator-height: var(--mat-checkbox-container-size);
    --mat-selection-control-state-layer-size: var(--mat-checkbox-state-layer-size);
    --mat-selection-control-state-layer-color: var(--mat-checkbox-unselected-state-layer-color);
    --mat-selection-control-label-color: var(--mat-checkbox-label-text-color);
  }

  .mat-checkbox--checked,
  .mat-checkbox--indeterminate {
    --mat-selection-control-state-layer-color: var(--mat-accent-color);
  }

  .mat-checkbox__box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: transparent;
    border: var(--mat-checkbox-outline-width) solid var(--mat-checkbox-unselected-outline-color);
    border-radius: var(--mat-checkbox-container-shape);
    transition: background-color var(--mat-sys-motion-spring-fast-effects), border-color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-checkbox--checked .mat-checkbox__box,
  .mat-checkbox--indeterminate .mat-checkbox__box {
    background: var(--mat-accent-color);
    border-color: var(--mat-accent-color);
  }

  .mat-checkbox__check,
  .mat-checkbox__mixed {
    position: absolute;
    inline-size: 12px;
    block-size: 10px;
    background: var(--mat-on-accent-color);
    transition: clip-path var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-checkbox__check {
    clip-path: polygon(0 52%, 14% 52%, 38% 52%, 86% 52%, 100% 52%, 38% 52%);
  }

  .mat-checkbox--checked:not(.mat-checkbox--indeterminate) .mat-checkbox__check {
    clip-path: polygon(0 58%, 14% 44%, 38% 68%, 86% 20%, 100% 34%, 38% 96%);
  }

  .mat-checkbox__mixed {
    clip-path: polygon(10% 50%, 10% 50%, 90% 50%, 90% 50%);
  }

  .mat-checkbox--indeterminate .mat-checkbox__mixed {
    clip-path: polygon(10% 40%, 10% 60%, 90% 60%, 90% 40%);
  }

  @supports (border-shape: inset(0 round 2px)) {
    .mat-checkbox__box {
      border-radius: 0;
      border-shape: inset(0 round var(--mat-checkbox-container-shape));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-checkbox__box,
    .mat-checkbox__check,
    .mat-checkbox__mixed {
      transition: none;
    }
  }
}
</style>
