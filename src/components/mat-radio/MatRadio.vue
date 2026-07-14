<script setup>
import {
  computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref,
} from 'vue';
import MatSelectionControlBase from '../MatSelectionControlBase.vue';
import { isComponentColor } from '../button-props';
import MAT_RADIO_GROUP_KEY from '../radio-context';
import { isSelectionValue } from '../selection-control';

defineOptions({
  name: 'MatRadio',
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
    validator(value) {
      return value === null || value === undefined || isSelectionValue(value);
    },
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
    validator: isSelectionValue,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});

const emit = defineEmits({
  'update:modelValue'(value) {
    return value === null || isSelectionValue(value);
  },
  change(event) {
    return event instanceof Event;
  },
});
const instance = getCurrentInstance();
const group = inject(MAT_RADIO_GROUP_KEY, null);
const base = ref(null);
const value = computed(() => props.value);
const effectiveDisabled = computed(() => props.disabled || Boolean(group?.disabled.value));
const effectiveColor = computed(() => props.color ?? group?.color.value);
const checked = computed(() => (
  group ? group.isSelected(props.value) : Object.is(props.modelValue, props.value)
));

/**
 * @param {Event} originalEvent
 */
function activate(originalEvent) {
  if (effectiveDisabled.value || checked.value) {
    return;
  }

  if (group) {
    group.requestSelection(props.value, originalEvent);
  } else {
    emit('update:modelValue', props.value);
  }

  emit('change', originalEvent);
}

const registration = {
  activate,
  disabled: effectiveDisabled,
  focus() {
    base.value?.focusInput();
  },
  getInput() {
    return base.value?.getInput() ?? null;
  },
  value,
};
const tabIndex = computed(() => (
  group ? group.getTabIndex(registration) : undefined
));

onMounted(() => {
  if (!group) {
    return;
  }

  const vnodeProps = instance?.vnode.props ?? {};

  if (
    props.modelValue !== undefined
    || Object.hasOwn(vnodeProps, 'onUpdate:modelValue')
  ) {
    console.warn('MatRadio: 位于 MatRadioGroup 中时，子级 modelValue 和 v-model 会被忽略');
  }

  group.register(registration);
});

onBeforeUnmount(() => {
  group?.unregister(registration);
});

/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (!group || event.repeat) {
    return;
  }

  if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
    group.move(registration, 1, event);
  } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
    group.move(registration, -1, event);
  }
}
</script>

<template>
  <MatSelectionControlBase
    ref="base"
    v-bind="$attrs"
    class="mat-radio"
    :class="{ 'mat-radio--checked': checked }"
    :checked="checked"
    :color="effectiveColor"
    :disabled="effectiveDisabled"
    input-type="radio"
    :input-value="value"
    label-name="MatRadio"
    :tabindex="tabIndex"
    @change="activate"
    @keydown="handleKeydown"
  >
    <template #indicator>
      <span class="mat-radio__ring">
        <span class="mat-radio__dot" />
      </span>
    </template>

    <slot />
  </MatSelectionControlBase>
</template>

<style scoped>
.mat-radio {
  --mat-accent-color: var(--mat-radio-selected-icon-color);
  --mat-selection-control-indicator-width: var(--mat-radio-icon-size);
  --mat-selection-control-indicator-height: var(--mat-radio-icon-size);
  --mat-selection-control-state-layer-size: var(--mat-radio-state-layer-size);
  --mat-selection-control-state-layer-color: var(--mat-radio-unselected-state-layer-color);
  --mat-selection-control-label-color: var(--mat-radio-label-text-color);
}

.mat-radio--checked {
  --mat-selection-control-state-layer-color: var(--mat-accent-color);
}

.mat-radio__ring {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  box-sizing: border-box;
  border: var(--mat-radio-outline-width) solid var(--mat-radio-unselected-icon-color);
  border-radius: var(--mat-sys-shape-corner-full);
  transition: border-color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-radio--checked .mat-radio__ring {
  border-color: var(--mat-accent-color);
}

.mat-radio__dot {
  inline-size: var(--mat-radio-selected-dot-size);
  block-size: var(--mat-radio-selected-dot-size);
  background: var(--mat-accent-color);
  border-radius: var(--mat-sys-shape-corner-full);
  clip-path: circle(0 at 50% 50%);
  transition: clip-path var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized);
}

.mat-radio--checked .mat-radio__dot {
  clip-path: circle(50% at 50% 50%);
}

@supports (border-shape: circle(50%)) {
  .mat-radio__ring {
    border-radius: 0;
    border-shape: circle(50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-radio__ring,
  .mat-radio__dot {
    transition: none;
  }
}
</style>
