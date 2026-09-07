<script setup>
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  watch,
} from 'vue';
import { MAT_LAYOUT_KEY } from '../mat-layout/layout-context';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import createCloseMotion from '../close-motion';
import createMotionController from '../motion-controller';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, toCssLength } from '../value-utils';

defineOptions({
  name: 'MatAside',
  inheritAttrs: false,
});

const ASIDE_LOCATIONS = ['top', 'bottom', 'left', 'right'];
const ASIDE_ANIMATION_DURATION = 200;

function parsePixelNumber(val) {
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val : null;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (/^-?\d+(?:\.\d+)?(?:px)?$/.test(trimmed)) {
      const num = Number.parseFloat(trimmed);
      return Number.isFinite(num) ? num : null;
    }
  }
  return null;
}

const props = defineProps({
  /**
   * 根元素渲染的 HTML 标签。
   *
   * @type {string}
   * @default 'aside'
   */
  as: {
    type: String,
    default: 'aside',
  },
  /**
   * Aside 所依附的停靠边缘。
   *
   * @type {'top' | 'bottom' | 'left' | 'right'}
   * @default 'left'
   */
  location: {
    type: String,
    default: 'left',
    validator(value) {
      return ['top', 'bottom', 'left', 'right'].includes(value);
    },
  },
  /**
   * 垂直于边缘方向的厚度尺寸（top/bottom 对应高度，left/right 对应宽度）。
   *
   * @type {number | string}
   */
  blockSize: {
    type: [Number, String],
    required: true,
    validator: (value) => isValidCssLength(value, {
      property: 'block-size',
      positive: true,
    }),
  },
  /**
   * 边缘方向的安全区留白大小。
   *
   * @type {number | string}
   * @default 0
   */
  safeAreaSize: {
    type: [Number, String],
    default: 0,
    validator: (value) => isValidCssLength(value, {
      property: 'block-size',
      allowUndefined: false,
    }),
  },
  /**
   * 是否在面向内容的一侧渲染 1px 细边框。
   *
   * @type {boolean}
   * @default false
   */
  bordered: {
    type: Boolean,
    default: false,
  },
  /**
   * 显式指定层级；省略时使用默认层级。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  zIndex: {
    type: [Number, String],
    default: undefined,
  },
  /**
   * 受控显示/隐藏状态，支持 v-model。
   *
   * @type {boolean}
   * @default true
   */
  modelValue: {
    type: Boolean,
    default: true,
  },
});

const propsWithDefaults = useMatProps('aside', props);

const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'boolean',
  opened: () => true,
  closed: () => true,
});

const attrs = useAttrs();
const hostElement = ref(null);
const edgeRegistration = shallowRef(null);
const rendered = ref(propsWithDefaults.modelValue);
const phase = ref(propsWithDefaults.modelValue ? 'open' : 'closed');
const motion = createMotionController();
const closeMotion = createCloseMotion({ motion });
let mounted = false;

const layoutContext = inject(MAT_LAYOUT_KEY, null);
const appContext = inject(MAT_APP_ROOT_KEY, null);

const normalizedLocation = computed(() => (
  ['top', 'bottom', 'left', 'right'].includes(propsWithDefaults.location)
    ? propsWithDefaults.location
    : 'left'
));

const normalizedBlockSize = computed(() => {
  const css = toCssLength(propsWithDefaults.blockSize, {
    property: 'block-size',
    fallback: '0px',
  });
  return css === '0' ? '0px' : css;
});

const normalizedSafeAreaSize = computed(() => {
  const css = toCssLength(propsWithDefaults.safeAreaSize, {
    property: 'block-size',
    fallback: '0px',
  });
  return css === '0' ? '0px' : css;
});

const totalBlockSize = computed(() => {
  const blockNum = parsePixelNumber(propsWithDefaults.blockSize);
  const safeNum = parsePixelNumber(propsWithDefaults.safeAreaSize);
  if (blockNum !== null && safeNum !== null) {
    return `${blockNum + safeNum}px`;
  }
  return `calc(${normalizedBlockSize.value} + ${normalizedSafeAreaSize.value})`;
});

const defaultZIndex = computed(() => {
  if (normalizedLocation.value === 'top' || normalizedLocation.value === 'bottom') {
    return '8';
  }
  return '7';
});

const activeInsets = ref({ top: 0, bottom: 0, left: 0, right: 0, offset: 0 });

watch(() => edgeRegistration.value?.insets, (newInsets) => {
  if (newInsets) {
    activeInsets.value = {
      top: newInsets.top ?? 0,
      bottom: newInsets.bottom ?? 0,
      left: newInsets.left ?? newInsets.start ?? 0,
      right: newInsets.right ?? newInsets.end ?? 0,
      offset: newInsets.offset ?? 0,
    };
  }
}, { deep: true, immediate: true });

const asideClass = computed(() => [
  'mat-aside',
  `mat-aside--${normalizedLocation.value}`,
  `mat-aside--${phase.value}`,
  {
    'mat-aside--bordered': propsWithDefaults.bordered,
  },
]);

const asideStyle = computed(() => [
  attrs.style,
  {
    '--mat-aside-block-size': normalizedBlockSize.value,
    '--mat-aside-safe-area-size': normalizedSafeAreaSize.value,
    '--mat-aside-total-block-size': totalBlockSize.value,
    '--mat-aside-insets-top': `${activeInsets.value.top}px`,
    '--mat-aside-insets-bottom': `${activeInsets.value.bottom}px`,
    '--mat-aside-insets-left': `${activeInsets.value.left}px`,
    '--mat-aside-insets-right': `${activeInsets.value.right}px`,
    '--mat-aside-insets-offset': `${activeInsets.value.offset}px`,
    zIndex: propsWithDefaults.zIndex !== undefined ? String(propsWithDefaults.zIndex) : defaultZIndex.value,
  },
]);

function syncRegistration() {
  if (!mounted || !hostElement.value || !rendered.value) {
    edgeRegistration.value?.unregister();
    edgeRegistration.value = null;
    return;
  }

  edgeRegistration.value?.unregister();
  edgeRegistration.value = null;

  if (layoutContext) {
    edgeRegistration.value = layoutContext.publicContext.registerEdge({
      edge: normalizedLocation.value,
      element: hostElement.value,
    });
  } else if (appContext) {
    const appEdge = normalizedLocation.value === 'left'
      ? 'start'
      : (normalizedLocation.value === 'right' ? 'end' : normalizedLocation.value);

    edgeRegistration.value = appContext.publicContext.registerEdge({
      edge: appEdge,
      element: hostElement.value,
    });
  }
}

function openAside() {
  motion.cancel();
  rendered.value = true;
  phase.value = 'opening';
  nextTick().then(() => {
    syncRegistration();
    if (!mounted || !rendered.value || !propsWithDefaults.modelValue) {
      return;
    }
    motion.wait(hostElement.value, ASIDE_ANIMATION_DURATION, () => {
      if (rendered.value && propsWithDefaults.modelValue) {
        phase.value = 'open';
        emit('opened');
      }
    });
  });
}

function closeAside() {
  if (!rendered.value) {
    phase.value = 'closed';
    return;
  }

  closeMotion.start({
    canStart: () => rendered.value && phase.value !== 'closing',
    duration: ASIDE_ANIMATION_DURATION,
    getElement: () => hostElement.value,
    isActive: () => mounted && !propsWithDefaults.modelValue && rendered.value,
    onStart: () => {
      phase.value = 'closing';
      edgeRegistration.value?.unregister();
      edgeRegistration.value = null;
    },
    onFinish: () => {
      rendered.value = false;
      phase.value = 'closed';
      emit('closed');
    },
  });
}

watch(() => propsWithDefaults.modelValue, (val) => {
  if (val) {
    openAside();
  } else {
    closeAside();
  }
});

watch(normalizedLocation, syncRegistration);

onMounted(async () => {
  mounted = true;
  if (rendered.value) {
    syncRegistration();
  }
});

onBeforeUnmount(() => {
  mounted = false;
  edgeRegistration.value?.unregister();
  edgeRegistration.value = null;
});
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    v-if="rendered"
    ref="hostElement"
    v-bind="$attrs"
    :class="asideClass"
    :style="asideStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-aside {
    position: absolute;
    box-sizing: border-box;
    isolation: isolate;
    transition: inset-block var(--mat-sys-motion-spring-default-spatial, .3s ease),
      inset-inline var(--mat-sys-motion-spring-default-spatial, .3s ease),
      left var(--mat-sys-motion-spring-default-spatial, .3s ease),
      right var(--mat-sys-motion-spring-default-spatial, .3s ease);
  }

  /* Top */
  .mat-aside--top {
    inset-block-start: var(--mat-aside-insets-top, 0px);
    left: var(--mat-aside-insets-left, 0px);
    right: var(--mat-aside-insets-right, 0px);
    block-size: var(--mat-aside-total-block-size);
    padding-block-start: var(--mat-aside-safe-area-size, 0px);
  }

  .mat-aside--top.mat-aside--bordered {
    border-block-end: 1px solid var(--mat-sys-color-outline-variant);
  }

  .mat-aside--top.mat-aside--opening {
    animation: mat-aside-top-enter var(--mat-sys-motion-spring-default-spatial, .3s ease) both;
  }

  .mat-aside--top.mat-aside--closing {
    animation: mat-aside-top-exit var(--mat-sys-motion-spring-fast-effects, .2s ease) both;
  }

  .mat-aside--top.mat-aside--closed {
    transform: translateY(-100%);
  }

  /* Bottom */
  .mat-aside--bottom {
    inset-block-end: var(--mat-aside-insets-bottom, 0px);
    left: var(--mat-aside-insets-left, 0px);
    right: var(--mat-aside-insets-right, 0px);
    block-size: var(--mat-aside-total-block-size);
    padding-block-end: var(--mat-aside-safe-area-size, 0px);
  }

  .mat-aside--bottom.mat-aside--bordered {
    border-block-start: 1px solid var(--mat-sys-color-outline-variant);
  }

  .mat-aside--bottom.mat-aside--opening {
    animation: mat-aside-bottom-enter var(--mat-sys-motion-spring-default-spatial, .3s ease) both;
  }

  .mat-aside--bottom.mat-aside--closing {
    animation: mat-aside-bottom-exit var(--mat-sys-motion-spring-fast-effects, .2s ease) both;
  }

  .mat-aside--bottom.mat-aside--closed {
    transform: translateY(100%);
  }

  /* Left */
  .mat-aside--left {
    left: var(--mat-aside-insets-left, 0px);
    inset-block: var(--mat-aside-insets-top, 0px) var(--mat-aside-insets-bottom, 0px);
    inline-size: var(--mat-aside-total-block-size);
    padding-left: var(--mat-aside-safe-area-size, 0px);
  }

  .mat-aside--left.mat-aside--bordered {
    border-right: 1px solid var(--mat-sys-color-outline-variant);
  }

  .mat-aside--left.mat-aside--opening {
    animation: mat-aside-left-enter var(--mat-sys-motion-spring-default-spatial, .3s ease) both;
  }

  .mat-aside--left.mat-aside--closing {
    animation: mat-aside-left-exit var(--mat-sys-motion-spring-fast-effects, .2s ease) both;
  }

  .mat-aside--left.mat-aside--closed {
    transform: translateX(-100%);
  }

  /* Right */
  .mat-aside--right {
    right: var(--mat-aside-insets-right, 0px);
    inset-block: var(--mat-aside-insets-top, 0px) var(--mat-aside-insets-bottom, 0px);
    inline-size: var(--mat-aside-total-block-size);
    padding-right: var(--mat-aside-safe-area-size, 0px);
  }

  .mat-aside--right.mat-aside--bordered {
    border-left: 1px solid var(--mat-sys-color-outline-variant);
  }

  .mat-aside--right.mat-aside--opening {
    animation: mat-aside-right-enter var(--mat-sys-motion-spring-default-spatial, .3s ease) both;
  }

  .mat-aside--right.mat-aside--closing {
    animation: mat-aside-right-exit var(--mat-sys-motion-spring-fast-effects, .2s ease) both;
  }

  .mat-aside--right.mat-aside--closed {
    transform: translateX(100%);
  }

  .mat-aside--open {
    transform: translate(0, 0);
  }

  @keyframes mat-aside-top-enter {
    from {
      transform: translateY(-100%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes mat-aside-top-exit {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-100%);
    }
  }

  @keyframes mat-aside-bottom-enter {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes mat-aside-bottom-exit {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(100%);
    }
  }

  @keyframes mat-aside-left-enter {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes mat-aside-left-exit {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-100%);
    }
  }

  @keyframes mat-aside-right-enter {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes mat-aside-right-exit {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-aside {
      animation: none !important;
      transition: none !important;
    }
  }
}
</style>

