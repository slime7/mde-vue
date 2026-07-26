<script setup>
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  useSlots,
  watch,
} from 'vue';

defineOptions({
  name: 'MatHover',
  inheritAttrs: false,
});

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: null,
  },
  closeDelay: {
    type: [Number, String],
    default: 0,
  },
  openDelay: {
    type: [Number, String],
    default: 0,
  },
  target: {
    type: [String, Object],
    default: undefined,
  },
});
const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const slots = useSlots();
const instance = getCurrentInstance();
const vnodeProps = instance?.vnode.props ?? {};
const isControlled = Object.prototype.hasOwnProperty.call(vnodeProps, 'modelValue')
  || Object.prototype.hasOwnProperty.call(vnodeProps, 'model-value');
const internalHovering = ref(false);
const uncontrolledHovering = ref(null);
const targetElement = shallowRef(null);
const renderedHovering = computed(() => (
  isControlled ? props.modelValue : uncontrolledHovering.value
));
let delayTimer;
let removeTargetListeners = null;

function clearDelay() {
  if (delayTimer === undefined) {
    return;
  }

  window.clearTimeout(delayTimer);
  delayTimer = undefined;
}

/**
 * @param {number | string} value
 * @returns {number}
 */
function normalizeDelay(value) {
  const delay = Number(value ?? 0);

  if (!Number.isFinite(delay) || delay < 0) {
    return 0;
  }

  return delay;
}

/**
 * @param {boolean} value
 * @returns {void}
 */
function applyHovering(value) {
  internalHovering.value = value;

  if (props.disabled) {
    return;
  }

  emit('update:modelValue', value);

  if (isControlled) {
    return;
  }

  uncontrolledHovering.value = value;
}

/**
 * @param {boolean} value
 * @param {number | string} delayValue
 * @returns {void}
 */
function scheduleHovering(value, delayValue) {
  clearDelay();
  const delay = normalizeDelay(delayValue);

  if (delay === 0) {
    applyHovering(value);
    return;
  }

  delayTimer = window.setTimeout(() => {
    delayTimer = undefined;
    applyHovering(value);
  }, delay);
}

function handleMouseenter() {
  scheduleHovering(true, props.openDelay);
}

function handleMouseleave() {
  scheduleHovering(false, props.closeDelay);
}

/**
 * @param {unknown} value
 * @returns {HTMLElement | null}
 */
function normalizeElement(value) {
  if (!value || typeof HTMLElement === 'undefined') {
    return null;
  }

  if (value instanceof HTMLElement && value.ownerDocument === document) {
    return value;
  }

  if (typeof value !== 'object') {
    return null;
  }

  if ('value' in value) {
    return normalizeElement(value.value);
  }

  if ('$el' in value) {
    return normalizeElement(value.$el);
  }

  return null;
}

/**
 * @returns {HTMLElement | null}
 */
function resolveTarget() {
  if (typeof props.target !== 'string') {
    return normalizeElement(props.target);
  }

  try {
    return normalizeElement(document.querySelector(props.target));
  } catch {
    return null;
  }
}

function unbindTargetListeners() {
  if (!removeTargetListeners) {
    return;
  }

  removeTargetListeners();
  removeTargetListeners = null;
}

function syncTargetElement() {
  const nextTarget = resolveTarget();

  if (nextTarget === targetElement.value) {
    return;
  }

  unbindTargetListeners();
  targetElement.value = nextTarget;

  if (!nextTarget) {
    return;
  }

  nextTarget.addEventListener('mouseenter', handleMouseenter);
  nextTarget.addEventListener('mouseleave', handleMouseleave);
  removeTargetListeners = () => {
    nextTarget.removeEventListener('mouseenter', handleMouseenter);
    nextTarget.removeEventListener('mouseleave', handleMouseleave);
  };
}

const targetProps = {
  onMouseenter: handleMouseenter,
  onMouseleave: handleMouseleave,
};

watch(() => props.disabled, (disabled, previousDisabled) => {
  if (previousDisabled && !disabled) {
    if (isControlled) {
      emit('update:modelValue', internalHovering.value);
      return;
    }

    uncontrolledHovering.value = internalHovering.value;
    emit('update:modelValue', internalHovering.value);
  }
});
watch(resolveTarget, syncTargetElement, { flush: 'sync' });

onMounted(syncTargetElement);
onUpdated(syncTargetElement);
onBeforeUnmount(() => {
  clearDelay();
  unbindTargetListeners();
});
</script>

<template>
  <slot
    v-if="slots.default"
    :is-hovering="renderedHovering"
    :props="targetProps"
  />
</template>
