<script setup>
import {
  computed,
  getCurrentInstance,
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
import {
  dialogStack,
  registerDialog,
  unregisterDialog,
} from '../dialog-stack';
import createCloseMotion from '../close-motion';
import createMotionController from '../motion-controller';
import useFocusTrap from '../use-focus-trap';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, toCssLength } from '../value-utils';

defineOptions({
  name: 'MatAside',
  inheritAttrs: false,
});

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
   * @type {'top' | 'bottom' | 'start' | 'end' | 'left' | 'right'}
   * @default 'start'
   */
  location: {
    type: String,
    default: 'start',
    validator(value) {
      return ['top', 'bottom', 'start', 'end', 'left', 'right'].includes(value);
    },
  },
  /**
   * 是否接入应用级外壳布局。
   * 在 MatAppRoot 内且未显式指定 attach 时自动表现为 docked 并登记；
   * 在外部或有显式 attach 时自动表现为 fixed 并 Teleport 至目标。
   *
   * @type {boolean}
   * @default false
   */
  app: {
    type: Boolean,
    default: false,
  },
  /**
   * 排布与定位模式。
   * docked 为容器内绝对定位避让；flow 为常规文档流；sticky 为粘性定位；fixed 为视口固定定位。
   *
   * @type {'docked' | 'flow' | 'sticky' | 'fixed'}
   * @default 'docked'
   */
  mode: {
    type: String,
    default: 'docked',
    validator(value) {
      return ['docked', 'flow', 'sticky', 'fixed'].includes(value);
    },
  },
  /**
   * 垂直于边缘方向的厚度尺寸（top/bottom 对应高度，left/right 对应宽度）。
   * 省略或为 'auto' 时自适应内容。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  blockSize: {
    type: [Number, String],
    default: undefined,
    validator: (value) => value === undefined || value === 'auto' || isValidCssLength(value, {
      property: 'block-size',
    }),
  },
  /**
   * 边缘方向的安全区留白配置。
   * true 时自适应当前 MatAppRoot 或环境安全区；false 时为 0；也可显式指定尺寸。
   *
   * @type {boolean | number | string}
   * @default true
   */
  safeArea: {
    type: [Boolean, Number, String],
    default: true,
    validator: (value) => typeof value === 'boolean' || isValidCssLength(value, {
      property: 'block-size',
      allowUndefined: false,
    }),
  },
  /**
   * 边缘方向的安全区留白大小。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  safeAreaSize: {
    type: [Number, String],
    default: undefined,
    validator: (value) => value === undefined || isValidCssLength(value, {
      property: 'block-size',
      allowUndefined: false,
    }),
  },
  /**
   * 是否在文档流中渲染占位节点。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /**
   * 显式指定占位节点尺寸。省略时跟随 Aside 自身总厚度。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  placeholderSize: {
    type: [Number, String],
    default: undefined,
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
   * 受控显示/隐藏状态，支持 v-model:open。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  open: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 受控显示/隐藏状态，支持 v-model。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 关闭时是否彻底从 DOM 树卸载节点。
   * 默认 false（保活隐藏），关闭后保留 DOM 并使用 hidden 属性隐藏；设为 true 时退场后销毁节点。
   *
   * @type {boolean}
   * @default false
   */
  unmountOnClose: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否作为模态浮层呈现。开启时不挤占布局正文空间并接入全局遮罩。
   *
   * @type {boolean}
   * @default false
   */
  modal: {
    type: Boolean,
    default: false,
  },
  /**
   * mode="fixed" 时的挂载目标。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * 是否启用默认滑入滑出动效。设为 false 时立即切换。
   *
   * @type {boolean}
   * @default true
   */
  transition: {
    type: Boolean,
    default: true,
  },
  /**
   * modal=true 时附加到背景遮罩的额外类名。
   *
   * @type {string | undefined}
   * @default undefined
   */
  scrimClass: {
    type: String,
    default: undefined,
  },
  /**
   * modal=true 时点击背景遮罩是否请求关闭。
   *
   * @type {boolean}
   * @default true
   */
  closeOnBack: {
    type: Boolean,
    default: true,
  },
});

const propsWithDefaults = useMatProps('aside', props);

const emit = defineEmits({
  'update:open': (payload) => typeof payload === 'boolean',
  'update:modelValue': (payload) => typeof payload === 'boolean',
  opened: () => true,
  closed: () => true,
});

const attrs = useAttrs();
const instance = getCurrentInstance();
const hostElement = ref(null);
const edgeRegistration = shallowRef(null);

const isControlledOpen = computed(() => {
  if (propsWithDefaults.open !== undefined) {
    return Boolean(propsWithDefaults.open);
  }
  if (propsWithDefaults.modelValue !== undefined) {
    return Boolean(propsWithDefaults.modelValue);
  }
  return true;
});

const rendered = ref(propsWithDefaults.unmountOnClose ? isControlledOpen.value : true);
const phase = ref(isControlledOpen.value ? 'open' : 'closed');
const motion = createMotionController();
const closeMotion = createCloseMotion({ motion });
let mounted = false;
let resizeObserver;
let previousFocus = null;

function restoreFocus() {
  if (previousFocus?.isConnected) {
    previousFocus.focus({ preventScroll: true });
  }
  previousFocus = null;
}

const layoutContext = inject(MAT_LAYOUT_KEY, null);
const appContext = inject(MAT_APP_ROOT_KEY, null);

const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = computed(() => (
  Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach') && rawVNodeProps.attach !== undefined
));
const usesAppRoot = computed(() => (
  propsWithDefaults.app && Boolean(appContext) && !hasExplicitAttach.value
));

const effectiveMode = computed(() => {
  if (propsWithDefaults.app) {
    return usesAppRoot.value ? 'docked' : 'fixed';
  }
  return propsWithDefaults.mode;
});

const normalizedLocation = computed(() => {
  const loc = propsWithDefaults.location;
  if (loc === 'left') {
    return 'start';
  }
  if (loc === 'right') {
    return 'end';
  }
  if (['top', 'bottom', 'start', 'end'].includes(loc)) {
    return loc;
  }
  return 'start';
});

const isAutoSize = computed(() => (
  propsWithDefaults.blockSize === undefined || propsWithDefaults.blockSize === 'auto'
));

const measuredSize = ref({ blockSize: 0, inlineSize: 0 });

const isModal = computed(() => Boolean(propsWithDefaults.modal));
const isTop = computed(() => isModal.value && dialogStack.value.at(-1) === hostElement.value);

useFocusTrap(hostElement, computed(() => (
  isModal.value && rendered.value && isTop.value
)));

const normalizedBlockSize = computed(() => {
  if (isAutoSize.value) {
    return 'auto';
  }
  const css = toCssLength(propsWithDefaults.blockSize, {
    property: 'block-size',
    fallback: '0px',
  });
  return css === '0' ? '0px' : css;
});

const normalizedSafeAreaSize = computed(() => {
  if (propsWithDefaults.safeArea === false) {
    return '0px';
  }
  if (propsWithDefaults.safeAreaSize !== undefined) {
    const css = toCssLength(propsWithDefaults.safeAreaSize, {
      property: 'block-size',
      fallback: '0px',
    });
    return css === '0' ? '0px' : css;
  }
  if (typeof propsWithDefaults.safeArea === 'number'
    || (typeof propsWithDefaults.safeArea === 'string' && propsWithDefaults.safeArea !== 'auto')) {
    const css = toCssLength(propsWithDefaults.safeArea, {
      property: 'block-size',
      fallback: '0px',
    });
    return css === '0' ? '0px' : css;
  }

  const loc = normalizedLocation.value;
  if (loc === 'top') {
    return 'var(--mat-app-root-safe-area-top, env(safe-area-inset-top, 0px))';
  }
  if (loc === 'bottom') {
    return 'var(--mat-app-root-safe-area-bottom, env(safe-area-inset-bottom, 0px))';
  }
  if (loc === 'start') {
    return 'var(--mat-app-root-safe-area-start, env(safe-area-inset-left, 0px))';
  }
  return 'var(--mat-app-root-safe-area-end, env(safe-area-inset-right, 0px))';
});

const totalBlockSize = computed(() => {
  if (isAutoSize.value) {
    return 'auto';
  }
  const blockNum = parsePixelNumber(propsWithDefaults.blockSize);
  const safeProp = propsWithDefaults.safeAreaSize !== undefined
    ? propsWithDefaults.safeAreaSize
    : propsWithDefaults.safeArea;
  const safeNum = parsePixelNumber(safeProp);
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
  normalizedLocation.value === 'start' ? 'mat-aside--left' : null,
  normalizedLocation.value === 'end' ? 'mat-aside--right' : null,
  `mat-aside--mode-${effectiveMode.value}`,
  `mat-aside--${phase.value}`,
  {
    'mat-aside--bordered': propsWithDefaults.bordered,
    'mat-aside--auto-size': isAutoSize.value,
    'mat-aside--modal': isModal.value,
    'mat-aside--modal-scoped': isModal.value && isScopedToContainer.value,
    'mat-aside--top-scrim': isTop.value,
    'mat-aside--no-transition': !propsWithDefaults.transition,
    'mat-aside--app': propsWithDefaults.app,
  },
]);

const asideStyle = computed(() => [
  attrs.style,
  {
    '--mat-aside-block-size': isAutoSize.value ? 'auto' : normalizedBlockSize.value,
    '--mat-aside-safe-area-size': normalizedSafeAreaSize.value,
    '--mat-aside-total-block-size': isAutoSize.value ? 'auto' : totalBlockSize.value,
    '--mat-aside-insets-top': `${activeInsets.value.top}px`,
    '--mat-aside-insets-bottom': `${activeInsets.value.bottom}px`,
    '--mat-aside-insets-left': `${activeInsets.value.left}px`,
    '--mat-aside-insets-right': `${activeInsets.value.right}px`,
    '--mat-aside-insets-offset': `${activeInsets.value.offset}px`,
    zIndex: propsWithDefaults.zIndex !== undefined
      ? String(propsWithDefaults.zIndex)
      : (isModal.value ? 'calc(var(--mat-sys-z-index-dialog) + 1)' : defaultZIndex.value),
  },
]);

const isScopedToContainer = computed(() => (
  effectiveMode.value !== 'fixed' && Boolean(
    layoutContext?.rootElement?.value || (appContext && !hasExplicitAttach.value && appContext.rootElement?.value),
  )
));

const targetContainer = computed(() => {
  if (hasExplicitAttach.value && propsWithDefaults.attach) {
    if (propsWithDefaults.attach instanceof HTMLElement
      && propsWithDefaults.attach.ownerDocument === document) {
      return propsWithDefaults.attach;
    }
    if (typeof propsWithDefaults.attach === 'string') {
      try {
        return document.querySelector(propsWithDefaults.attach);
      } catch {
        return null;
      }
    }
  }

  if (effectiveMode.value !== 'fixed') {
    if (layoutContext?.rootElement?.value) {
      return layoutContext.rootElement.value;
    }
    if (appContext && !hasExplicitAttach.value && appContext.rootElement?.value) {
      return appContext.rootElement.value;
    }
  }

  return 'body';
});

const placeholderStyle = computed(() => {
  const isVertical = normalizedLocation.value === 'start' || normalizedLocation.value === 'end';
  const isActive = isControlledOpen.value && phase.value !== 'closed';
  let size;
  if (!isActive) {
    size = '0px';
  } else if (propsWithDefaults.placeholderSize !== undefined) {
    size = toCssLength(propsWithDefaults.placeholderSize, {
      property: isVertical ? 'inline-size' : 'block-size',
      fallback: '0px',
    });
  } else if (isAutoSize.value) {
    size = isVertical ? `${measuredSize.value.inlineSize}px` : `${measuredSize.value.blockSize}px`;
  } else {
    size = totalBlockSize.value;
  }

  if (isVertical) {
    return {
      inlineSize: size,
      minBlockSize: '100%',
      flexShrink: 0,
    };
  }
  return {
    blockSize: size,
    inlineSize: '100%',
    flexShrink: 0,
  };
});

function buildScopeOptions() {
  if (appContext && !hasExplicitAttach.value) {
    const content = appContext.contentElement?.value ?? null;
    const isInsideContent = hostElement.value && content?.contains(hostElement.value);
    return {
      inertElement: isInsideContent ? null : content,
      scrollElement: appContext.documentMode?.value ? null : content,
    };
  }
  if (layoutContext) {
    const content = layoutContext.contentElement?.value ?? null;
    const isInsideContent = hostElement.value && content?.contains(hostElement.value);
    return {
      inertElement: isInsideContent ? null : content,
      scrollElement: layoutContext.rootElement?.value ?? null,
    };
  }
  return {
    inertElement: null,
    scrollElement: null,
  };
}

function syncModal() {
  if (
    !mounted
    || !hostElement.value
    || !rendered.value
    || !isModal.value
    || !isControlledOpen.value
    || phase.value === 'closed'
  ) {
    if (hostElement.value) {
      unregisterDialog(hostElement.value);
    }
    return;
  }
  registerDialog(hostElement.value, buildScopeOptions());
}

function unregisterModal() {
  if (hostElement.value) {
    unregisterDialog(hostElement.value);
  }
}

function requestClose() {
  emit('update:open', false);
  emit('update:modelValue', false);
}

function handleScrimClick() {
  if (!isModal.value || !propsWithDefaults.closeOnBack) {
    return;
  }
  requestClose();
}

function handleGlobalKeyDown(event) {
  if (isModal.value && isTop.value && event.key === 'Escape') {
    event.preventDefault();
    requestClose();
  }
}

function syncMeasurement() {
  if (!mounted || !hostElement.value) {
    return;
  }
  const rect = hostElement.value.getBoundingClientRect();
  const nextBlockSize = Math.max(0, Math.ceil(Number(rect.height) || 0));
  const nextInlineSize = Math.max(0, Math.ceil(Number(rect.width) || 0));

  if (measuredSize.value.blockSize === nextBlockSize
    && measuredSize.value.inlineSize === nextInlineSize) {
    return;
  }

  measuredSize.value = {
    blockSize: nextBlockSize,
    inlineSize: nextInlineSize,
  };
  edgeRegistration.value?.update();
}

function syncRegistration() {
  if (!mounted || !hostElement.value || !rendered.value || !isControlledOpen.value || phase.value === 'closed') {
    edgeRegistration.value?.unregister();
    edgeRegistration.value = null;
    return;
  }

  edgeRegistration.value?.unregister();
  edgeRegistration.value = null;

  if (propsWithDefaults.placeholder
    || effectiveMode.value === 'flow'
    || effectiveMode.value === 'sticky'
    || propsWithDefaults.modal) {
    return;
  }

  if (propsWithDefaults.app && appContext) {
    edgeRegistration.value = appContext.publicContext.registerEdge({
      edge: normalizedLocation.value,
      element: hostElement.value,
    });
  } else if (layoutContext) {
    edgeRegistration.value = layoutContext.publicContext.registerEdge({
      edge: normalizedLocation.value,
      element: hostElement.value,
    });
  } else if (appContext) {
    edgeRegistration.value = appContext.publicContext.registerEdge({
      edge: normalizedLocation.value,
      element: hostElement.value,
    });
  }
}

function openAside() {
  motion.cancel();
  rendered.value = true;
  if (isModal.value && typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
    previousFocus = document.activeElement;
  }
  if (!propsWithDefaults.transition) {
    phase.value = 'open';
    nextTick().then(() => {
      syncRegistration();
      syncModal();
      emit('opened');
    });
    return;
  }

  phase.value = 'opening';
  nextTick().then(() => {
    syncRegistration();
    syncModal();
    if (!mounted || !rendered.value || !isControlledOpen.value) {
      return;
    }
    motion.wait(hostElement.value, ASIDE_ANIMATION_DURATION, () => {
      if (rendered.value && isControlledOpen.value) {
        phase.value = 'open';
        emit('opened');
      }
    });
  });
}

function closeAside() {
  if (!rendered.value || phase.value === 'closed') {
    phase.value = 'closed';
    return;
  }

  if (!propsWithDefaults.transition) {
    phase.value = 'closed';
    if (propsWithDefaults.unmountOnClose) {
      rendered.value = false;
    }
    edgeRegistration.value?.unregister();
    edgeRegistration.value = null;
    unregisterModal();
    restoreFocus();
    emit('closed');
    return;
  }

  closeMotion.start({
    canStart: () => rendered.value && phase.value !== 'closing',
    duration: ASIDE_ANIMATION_DURATION,
    getElement: () => hostElement.value,
    isActive: () => mounted && !isControlledOpen.value && rendered.value,
    onStart: () => {
      phase.value = 'closing';
      edgeRegistration.value?.unregister();
      edgeRegistration.value = null;
    },
    onFinish: () => {
      if (propsWithDefaults.unmountOnClose) {
        rendered.value = false;
      }
      phase.value = 'closed';
      unregisterModal();
      restoreFocus();
      emit('closed');
    },
  });
}

watch(isControlledOpen, (val) => {
  if (val) {
    openAside();
  } else {
    closeAside();
  }
});

watch(normalizedLocation, () => {
  syncRegistration();
  syncMeasurement();
});

watch([
  effectiveMode,
  () => propsWithDefaults.app,
  () => propsWithDefaults.modal,
], () => {
  syncRegistration();
  syncModal();
});

onMounted(async () => {
  mounted = true;
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleGlobalKeyDown);
  }
  if (rendered.value) {
    await nextTick();
    syncRegistration();
    syncModal();
    resizeObserver = typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver(syncMeasurement);
    if (hostElement.value) {
      resizeObserver?.observe(hostElement.value);
      syncMeasurement();
    }
  }
});

onBeforeUnmount(() => {
  mounted = false;
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGlobalKeyDown);
  }
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  edgeRegistration.value?.unregister();
  edgeRegistration.value = null;
  unregisterModal();
});

defineExpose({
  hostElement,
  activeInsets,
  phase,
});
</script>

<template>
  <template v-if="propsWithDefaults.placeholder && (rendered || !propsWithDefaults.unmountOnClose)">
    <slot
      name="placeholder"
      :style="placeholderStyle"
    >
      <span
        class="mat-aside__placeholder"
        aria-hidden="true"
        :style="placeholderStyle"
      />
    </slot>

    <Teleport
      v-if="effectiveMode === 'fixed'"
      :to="targetContainer"
      :disabled="!targetContainer"
    >
      <div
        v-if="isModal && rendered && phase !== 'closed'"
        class="mat-aside__scrim"
        :class="[
          propsWithDefaults.scrimClass,
          {
            'mat-aside__scrim--top': isTop,
            'mat-aside__scrim--closing': phase === 'closing',
          },
        ]"
        aria-hidden="true"
        @click="handleScrimClick"
      />

      <component
        :is="propsWithDefaults.as"
        v-if="rendered"
        ref="hostElement"
        v-bind="$attrs"
        :hidden="phase === 'closed' && !propsWithDefaults.unmountOnClose ? true : undefined"
        :class="asideClass"
        :style="asideStyle"
      >
        <slot />
      </component>
    </Teleport>

    <component
      :is="propsWithDefaults.as"
      v-else-if="rendered"
      ref="hostElement"
      v-bind="$attrs"
      :hidden="phase === 'closed' && !propsWithDefaults.unmountOnClose ? true : undefined"
      :class="asideClass"
      :style="asideStyle"
    >
      <Teleport
        v-if="isModal && rendered && phase !== 'closed'"
        :to="targetContainer"
        :disabled="!targetContainer"
      >
        <div
          class="mat-aside__scrim"
          :class="[
            propsWithDefaults.scrimClass,
            {
              'mat-aside__scrim--top': isTop,
              'mat-aside__scrim--closing': phase === 'closing',
              'mat-aside__scrim--docked': isScopedToContainer,
            },
          ]"
          aria-hidden="true"
          @click="handleScrimClick"
        />
      </Teleport>

      <slot />
    </component>
  </template>

  <Teleport
    v-else-if="effectiveMode === 'fixed'"
    :to="targetContainer"
    :disabled="!targetContainer"
  >
    <div
      v-if="isModal && rendered && phase !== 'closed'"
      class="mat-aside__scrim"
      :class="[
        propsWithDefaults.scrimClass,
        {
          'mat-aside__scrim--top': isTop,
          'mat-aside__scrim--closing': phase === 'closing',
        },
      ]"
      aria-hidden="true"
      @click="handleScrimClick"
    />

    <component
      :is="propsWithDefaults.as"
      v-if="rendered"
      ref="hostElement"
      v-bind="$attrs"
      :hidden="phase === 'closed' && !propsWithDefaults.unmountOnClose ? true : undefined"
      :class="asideClass"
      :style="asideStyle"
    >
      <slot />
    </component>
  </Teleport>

  <component
    :is="propsWithDefaults.as"
    v-else-if="rendered"
    ref="hostElement"
    v-bind="$attrs"
    :hidden="phase === 'closed' && !propsWithDefaults.unmountOnClose ? true : undefined"
    :class="asideClass"
    :style="asideStyle"
  >
    <Teleport
      v-if="isModal && rendered && phase !== 'closed'"
      :to="targetContainer"
      :disabled="!targetContainer"
    >
      <div
        class="mat-aside__scrim"
        :class="[
          propsWithDefaults.scrimClass,
          {
            'mat-aside__scrim--top': isTop,
            'mat-aside__scrim--closing': phase === 'closing',
            'mat-aside__scrim--docked': isScopedToContainer,
          },
        ]"
        aria-hidden="true"
        @click="handleScrimClick"
      />
    </Teleport>

    <slot />
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-aside {
    box-sizing: border-box;
    isolation: isolate;
    transition: inset-block var(--mat-sys-motion-spring-default-spatial, .3s ease), inset-inline var(--mat-sys-motion-spring-default-spatial, .3s ease), inline-size var(--mat-sys-motion-spring-default-spatial, .3s ease), block-size var(--mat-sys-motion-spring-default-spatial, .3s ease);
  }

  .mat-aside[hidden] {
    display: none !important;
  }

  .mat-aside--no-transition {
    animation: none !important;
    transition: none !important;
  }

  .mat-aside__placeholder {
    display: block;
    pointer-events: none;
    box-sizing: border-box;
    overflow: hidden;
    transition: inline-size var(--mat-sys-motion-spring-default-spatial, .3s ease), block-size var(--mat-sys-motion-spring-default-spatial, .3s ease);
  }

  /* Scrim */
  .mat-aside__scrim {
    position: fixed;
    z-index: var(--mat-sys-z-index-dialog);
    inset: 0;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding: 0;
    margin: 0;
    cursor: default;
    background: transparent;
    border: 0;
    pointer-events: auto;
  }

  .mat-aside__scrim--docked {
    position: absolute;
  }

  .mat-aside__scrim--top:not(.mat-aside__scrim--closing) {
    background: color-mix(in srgb, var(--mat-sys-color-scrim) 32%, transparent);
  }

  .mat-aside__scrim--top {
    animation: mat-dialog-scrim-enter var(--mat-sys-motion-spring-default-effects) both;
  }

  .mat-aside__scrim--closing {
    animation: mat-dialog-scrim-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  @keyframes mat-dialog-scrim-enter {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes mat-dialog-scrim-exit {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  /* Mode: Docked (default) */
  .mat-aside--mode-docked {
    position: absolute;
  }

  /* Mode: Flow */
  .mat-aside--mode-flow {
    position: relative;
    flex: 0 0 auto;
  }

  /* Mode: Sticky */
  .mat-aside--mode-sticky {
    position: sticky;
  }

  /* Mode: Fixed */
  .mat-aside--mode-fixed {
    position: fixed;
  }

  /* Modal */
  .mat-aside--modal {
    position: fixed;
    z-index: calc(var(--mat-sys-z-index-dialog) + 1);
  }

  .mat-aside--modal-scoped,
  .mat-aside--mode-docked.mat-aside--modal-scoped {
    position: absolute;
  }

  /* Top */
  .mat-aside--top.mat-aside--mode-docked {
    inset-block-start: var(--mat-aside-insets-top, 0);
    inset-inline: var(--mat-aside-insets-left, 0) var(--mat-aside-insets-right, 0);
  }

  .mat-aside--top.mat-aside--mode-sticky,
  .mat-aside--top.mat-aside--mode-fixed,
  .mat-aside--top.mat-aside--modal {
    inset-block-start: 0;
    inset-inline: 0;
  }

  .mat-aside--top {
    block-size: var(--mat-aside-total-block-size);
    padding-block-start: var(--mat-aside-safe-area-size, 0);
  }

  .mat-aside--top.mat-aside--auto-size {
    block-size: auto;
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
    translate: 0 -100%;
  }

  /* Bottom */
  .mat-aside--bottom.mat-aside--mode-docked {
    inset-block-end: var(--mat-aside-insets-bottom, 0);
    inset-inline: var(--mat-aside-insets-left, 0) var(--mat-aside-insets-right, 0);
  }

  .mat-aside--bottom.mat-aside--mode-sticky,
  .mat-aside--bottom.mat-aside--mode-fixed,
  .mat-aside--bottom.mat-aside--modal {
    inset-block-end: 0;
    inset-inline: 0;
  }

  .mat-aside--bottom {
    block-size: var(--mat-aside-total-block-size);
    padding-block-end: var(--mat-aside-safe-area-size, 0);
  }

  .mat-aside--bottom.mat-aside--auto-size {
    block-size: auto;
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
    translate: 0 100%;
  }

  /* Start / Left */
  .mat-aside--start.mat-aside--mode-docked,
  .mat-aside--left.mat-aside--mode-docked {
    inset-inline-start: var(--mat-aside-insets-left, 0);
    inset-block: var(--mat-aside-insets-top, 0) var(--mat-aside-insets-bottom, 0);
  }

  .mat-aside--start.mat-aside--mode-sticky,
  .mat-aside--start.mat-aside--mode-fixed,
  .mat-aside--start.mat-aside--modal,
  .mat-aside--left.mat-aside--mode-sticky,
  .mat-aside--left.mat-aside--mode-fixed,
  .mat-aside--left.mat-aside--modal {
    inset-inline-start: 0;
    inset-block: 0;
  }

  .mat-aside--start,
  .mat-aside--left {
    inline-size: var(--mat-aside-total-block-size);
    padding-inline-start: var(--mat-aside-safe-area-size, 0);
  }

  .mat-aside--start.mat-aside--auto-size,
  .mat-aside--left.mat-aside--auto-size {
    inline-size: auto;
  }

  .mat-aside--start.mat-aside--bordered,
  .mat-aside--left.mat-aside--bordered {
    border-inline-end: 1px solid var(--mat-sys-color-outline-variant);
  }

  .mat-aside--start.mat-aside--opening,
  .mat-aside--left.mat-aside--opening {
    animation: mat-aside-start-enter var(--mat-sys-motion-spring-default-spatial, .3s ease) both;
  }

  .mat-aside--start.mat-aside--closing,
  .mat-aside--left.mat-aside--closing {
    animation: mat-aside-start-exit var(--mat-sys-motion-spring-fast-effects, .2s ease) both;
  }

  .mat-aside--start.mat-aside--closed,
  .mat-aside--left.mat-aside--closed {
    translate: -100% 0;
  }

  /* End / Right */
  .mat-aside--end.mat-aside--mode-docked,
  .mat-aside--right.mat-aside--mode-docked {
    inset-inline-end: var(--mat-aside-insets-right, 0);
    inset-block: var(--mat-aside-insets-top, 0) var(--mat-aside-insets-bottom, 0);
  }

  .mat-aside--end.mat-aside--mode-sticky,
  .mat-aside--end.mat-aside--mode-fixed,
  .mat-aside--end.mat-aside--modal,
  .mat-aside--right.mat-aside--mode-sticky,
  .mat-aside--right.mat-aside--mode-fixed,
  .mat-aside--right.mat-aside--modal {
    inset-inline-end: 0;
    inset-block: 0;
  }

  .mat-aside--end,
  .mat-aside--right {
    inline-size: var(--mat-aside-total-block-size);
    padding-inline-end: var(--mat-aside-safe-area-size, 0);
  }

  .mat-aside--end.mat-aside--auto-size,
  .mat-aside--right.mat-aside--auto-size {
    inline-size: auto;
  }

  .mat-aside--end.mat-aside--bordered,
  .mat-aside--right.mat-aside--bordered {
    border-inline-start: 1px solid var(--mat-sys-color-outline-variant);
  }

  .mat-aside--end.mat-aside--opening,
  .mat-aside--right.mat-aside--opening {
    animation: mat-aside-end-enter var(--mat-sys-motion-spring-default-spatial, .3s ease) both;
  }

  .mat-aside--end.mat-aside--closing,
  .mat-aside--right.mat-aside--closing {
    animation: mat-aside-end-exit var(--mat-sys-motion-spring-fast-effects, .2s ease) both;
  }

  .mat-aside--end.mat-aside--closed,
  .mat-aside--right.mat-aside--closed {
    translate: 100% 0;
  }

  .mat-aside--open {
    translate: 0 0;
  }

  @keyframes mat-aside-top-enter {
    from {
      translate: 0 -100%;
    }

    to {
      translate: 0 0;
    }
  }

  @keyframes mat-aside-top-exit {
    from {
      translate: 0 0;
    }

    to {
      translate: 0 -100%;
    }
  }

  @keyframes mat-aside-bottom-enter {
    from {
      translate: 0 100%;
    }

    to {
      translate: 0 0;
    }
  }

  @keyframes mat-aside-bottom-exit {
    from {
      translate: 0 0;
    }

    to {
      translate: 0 100%;
    }
  }

  @keyframes mat-aside-start-enter {
    from {
      translate: -100% 0;
    }

    to {
      translate: 0 0;
    }
  }

  @keyframes mat-aside-start-exit {
    from {
      translate: 0 0;
    }

    to {
      translate: -100% 0;
    }
  }

  @keyframes mat-aside-end-enter {
    from {
      translate: 100% 0;
    }

    to {
      translate: 0 0;
    }
  }

  @keyframes mat-aside-end-exit {
    from {
      translate: 0 0;
    }

    to {
      translate: 100% 0;
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
