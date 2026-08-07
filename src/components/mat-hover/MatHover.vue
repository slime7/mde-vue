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
import { isValidMs, normalizeMs } from '../value-utils';

defineOptions({
  name: 'MatHover',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 禁止自动 hover 状态变化。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 受控 hover 状态；省略时由组件自动维护。
   *
   * @type {boolean | null}
   * @default null
   */
  modelValue: {
    type: Boolean,
    default: null,
  },
  /**
   * 关闭延迟，单位为毫秒；数字或纯数字字符串，非法值触发校验警告并按 0 处理。
   *
   * @type {number | string}
   * @default 0
   */
  closeDelay: {
    type: [Number, String],
    default: 0,
    validator: (value) => isValidMs(value, { allowUndefined: false }),
  },
  /**
   * 打开延迟，单位为毫秒；数字或纯数字字符串，非法值触发校验警告并按 0 处理。
   *
   * @type {number | string}
   * @default 0
   */
  openDelay: {
    type: [Number, String],
    default: 0,
    validator: (value) => isValidMs(value, { allowUndefined: false }),
  },
  /**
   * 直接绑定 hover 监听的元素选择器或 HTMLElement。
   *
   * @type {string | HTMLElement | undefined}
   * @default undefined
   */
  target: {
    type: [String, Object],
    default: undefined,
  },
});
const emit = defineEmits({
  /**
   * hover 状态变化时发出新的 boolean。
   */
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
  const delay = normalizeMs(delayValue, 0);

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
