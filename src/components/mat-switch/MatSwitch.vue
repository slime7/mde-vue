<script setup>
import MatSelectionControlBase from '../MatSelectionControlBase.vue';
import { isComponentColor } from '../button-props';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatSwitch',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前开关状态。
   *
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标显示方式。
   *
   * 可选值为 `none`、`selected`、`both`。
   *
   * @type {'none' | 'selected' | 'both'}
   * @default 'none'
   */
  icons: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'selected', 'both'].includes(value);
    },
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
const propsWithDefaults = useMatProps('switch', props);

const emit = defineEmits({
  /**
   * 使用者切换开关时发出下一布尔值。
   */
  'update:modelValue'(value) {
    return typeof value === 'boolean';
  },
  /**
   * 内部 checkbox 发生 change 时转发原生 `Event`。
   */
  change(event) {
    return event instanceof Event;
  },
});
/**
 * @param {Event} event
 */
function handleChange(event) {
  emit('update:modelValue', event.target.checked);
  emit('change', event);
}
</script>

<template>
  <MatSelectionControlBase
    v-bind="$attrs"
    class="mat-switch"
    :class="[
      `mat-switch--icons-${propsWithDefaults.icons}`,
      { 'mat-switch--checked': propsWithDefaults.modelValue },
    ]"
    :checked="propsWithDefaults.modelValue"
    :color="propsWithDefaults.color"
    :disabled="propsWithDefaults.disabled"
    input-role="switch"
    input-type="checkbox"
    label-name="MatSwitch"
    @change="handleChange"
  >
    <template #indicator>
      <span class="mat-switch__track">
        <span class="mat-switch__handle-positioner">
          <span class="mat-switch__handle">
            <span class="mat-switch__icon mat-switch__icon--selected" />
            <span class="mat-switch__icon mat-switch__icon--unselected" />
          </span>
        </span>
      </span>
    </template>

    <slot />
  </MatSelectionControlBase>
</template>

<style scoped>
.mat-switch {
  --mat-accent-color: var(--mat-switch-selected-track-color);
  --mat-on-accent-color: var(--mat-switch-selected-handle-color);
  --mat-switch-handle-translation: 20px;
  --mat-selection-control-target-width: var(--mat-switch-track-width);
  --mat-selection-control-indicator-width: var(--mat-switch-track-width);
  --mat-selection-control-indicator-height: var(--mat-switch-track-height);
  --mat-selection-control-state-layer-size: var(--mat-switch-state-layer-size);
  --mat-selection-control-state-layer-offset: -4px;
  --mat-selection-control-state-layer-color: var(--mat-switch-unselected-state-layer-color);
  --mat-selection-control-focus-ring-width: var(--mat-switch-track-width);
  --mat-selection-control-focus-ring-height: var(--mat-switch-track-height);
  --mat-selection-control-focus-ring-offset: 0;
  --mat-selection-control-focus-ring-translation: 0;
  --mat-selection-control-label-color: var(--mat-switch-label-text-color);
  --mat-selection-control-current-handle-size: var(--mat-switch-unselected-handle-size);
  --mat-selection-control-pressed-handle-size: var(--mat-switch-pressed-handle-size);
}

.mat-switch:dir(rtl) {
  --mat-switch-handle-translation: -20px;
}

.mat-switch--icons-both:not(.mat-switch--checked) {
  --mat-selection-control-current-handle-size: var(--mat-switch-icon-handle-size);
}

.mat-switch--checked {
  --mat-selection-control-state-layer-translation: var(--mat-switch-handle-translation);
  --mat-selection-control-state-layer-color: var(--mat-accent-color);
  --mat-selection-control-current-handle-size: var(--mat-switch-selected-handle-size);
}

.mat-switch__track {
  position: relative;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  box-sizing: border-box;
  background: var(--mat-switch-unselected-track-color);
  border: var(--mat-switch-track-outline-width) solid var(--mat-switch-unselected-track-outline-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transition: background-color var(--mat-sys-motion-spring-fast-effects), border-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-switch--checked .mat-switch__track {
  background: var(--mat-accent-color);
  border-color: var(--mat-accent-color);
}

.mat-switch__handle-positioner {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 2px;
  inline-size: var(--mat-switch-pressed-handle-size);
  block-size: var(--mat-switch-pressed-handle-size);
  transform: translateY(-50%);
  transition: transform var(--mat-sys-motion-spring-fast-spatial);
}

.mat-switch--checked .mat-switch__handle-positioner {
  transform: translate(var(--mat-switch-handle-translation), -50%);
}

.mat-switch__handle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  background: var(--mat-switch-unselected-handle-color);
  border-radius: var(--mat-sys-shape-corner-full);
  clip-path: circle(calc(var(--mat-selection-control-current-handle-size) / 2));
  transition: clip-path var(--mat-sys-motion-spring-fast-spatial), background-color var(--mat-sys-motion-spring-fast-effects);
}

.mat-switch--checked .mat-switch__handle {
  background: var(--mat-on-accent-color);
}

.mat-switch__icon {
  position: absolute;
  inline-size: var(--mat-switch-icon-size);
  block-size: var(--mat-switch-icon-size);
  opacity: 0;
  transition: clip-path var(--mat-sys-motion-spring-fast-spatial), opacity var(--mat-sys-motion-spring-fast-effects);
}

.mat-switch--icons-selected .mat-switch__icon--selected,
.mat-switch--icons-both .mat-switch__icon {
  opacity: 1;
}

.mat-switch__icon--selected {
  background: var(--mat-accent-color);
  clip-path: polygon(0 52%, 14% 52%, 38% 52%, 86% 52%, 100% 52%, 38% 52%);
}

.mat-switch--checked .mat-switch__icon--selected {
  clip-path: polygon(0 58%, 14% 44%, 38% 68%, 86% 20%, 100% 34%, 38% 96%);
}

.mat-switch__icon--unselected {
  background: var(--mat-switch-unselected-icon-color);
  clip-path: polygon(10% 50%, 50% 50%, 90% 50%, 50% 50%, 90% 50%, 50% 50%, 10% 50%, 50% 50%);
}

.mat-switch:not(.mat-switch--checked) .mat-switch__icon--unselected {
  clip-path: polygon(10% 0, 50% 40%, 90% 0, 100% 10%, 60% 50%, 100% 90%, 90% 100%, 50% 60%, 10% 100%, 0 90%, 40% 50%, 0 10%);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-switch__track {
    border-radius: 0;
    border-shape: inset(0 round var(--mat-sys-shape-corner-full));
  }

  .mat-switch__handle {
    border-radius: 0;
    border-shape: circle(50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-switch__track,
  .mat-switch__handle-positioner,
  .mat-switch__handle,
  .mat-switch__icon {
    transition: none;
  }
}
</style>
