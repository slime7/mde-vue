<script setup>
import {
  computed, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, provide, ref,
  shallowRef, watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import { MAT_NAVIGATION_RAIL_KEY } from './mat-navigation-context';

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isBottomPlaceholder(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value >= 0;
  }

  if (typeof value !== 'string') {
    return false;
  }

  const cssValue = value.trim();

  if (!cssValue || /[;{}]/.test(cssValue)) {
    return false;
  }

  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return true;
  }

  return CSS.supports('block-size', cssValue);
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeBottomPlaceholder(value) {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return `${value}px`;
  }

  if (typeof value === 'string' && isBottomPlaceholder(value)) {
    return value.trim();
  }

  return '0px';
}

/**
 * @param {unknown} value
 * @returns {HTMLElement | null}
 */
function normalizeAttach(value) {
  if (value instanceof HTMLElement && value.ownerDocument === document) {
    return value;
  }

  return null;
}

defineOptions({
  name: 'MatNavigationRail',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 导航方向；可选值为 `vertical`、`horizontal`。
   *
   * @type {'vertical' | 'horizontal'}
   * @default 'vertical'
   */
  orientation: {
    type: String,
    default: 'vertical',
    validator(value) {
      return ['vertical', 'horizontal'].includes(value);
    },
  },
  /**
   * 受控当前目的地值。
   *
   * @type {string | number | boolean | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  /**
   * 是否展开纵向 Rail。
   *
   * @type {boolean}
   * @default false
   */
  expanded: {
    type: Boolean,
    default: false,
  },
  /**
   * expanded Rail 的宽度；数字按 px 处理，字符串原样使用。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  width: {
    type: [Number, String],
    default: undefined,
    validator(value) {
      return (typeof value === 'number' && Number.isFinite(value) && value >= 0)
        || (typeof value === 'string' && value.trim().length > 0);
    },
  },
  /**
   * 应用模式的固定侧；可选值为 `start`、`end`。
   *
   * @type {'start' | 'end'}
   * @default 'start'
   */
  position: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'end'].includes(value);
    },
  },
  /**
   * 是否允许通过内部菜单入口切换展开状态。
   *
   * @type {boolean}
   * @default false
   */
  collapsible: {
    type: Boolean,
    default: false,
  },
  /**
   * 纵向 Rail 布局；可选值为 `standard`、`modal`。
   *
   * @type {'standard' | 'modal'}
   * @default 'standard'
   */
  layout: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'modal'].includes(value);
    },
  },
  /**
   * collapsed 时是否隐藏 Rail。
   *
   * @type {boolean}
   * @default false
   */
  hideOnCollapse: {
    type: Boolean,
    default: false,
  },
  /**
   * Item 对齐方式；可选值为 `top`、`center`。
   *
   * @type {'top' | 'center'}
   * @default 'top'
   */
  alignment: {
    type: String,
    default: 'top',
    validator(value) {
      return ['top', 'center'].includes(value);
    },
  },
  /**
   * 收起状态菜单入口的 Material Symbols 图标。
   *
   * @type {string}
   * @default 'menu'
   */
  openIcon: {
    type: String,
    default: 'menu',
  },
  /**
   * 展开状态菜单入口的 Material Symbols 图标。
   *
   * @type {string}
   * @default 'menu_open'
   */
  closeIcon: {
    type: String,
    default: 'menu_open',
  },
  /**
   * 收起状态菜单入口的非空可访问名称。
   *
   * @type {string}
   * @default '展开导航'
   */
  openLabel: {
    type: String,
    default: '展开导航',
  },
  /**
   * 展开状态菜单入口的非空可访问名称。
   *
   * @type {string}
   * @default '收起导航'
   */
  closeLabel: {
    type: String,
    default: '收起导航',
  },
  /**
   * 是否 Teleport 到 attach 并固定到视口。
   *
   * @type {boolean}
   * @default false
   */
  app: {
    type: Boolean,
    default: false,
  },
  /**
   * app=true 时的固定挂载目标。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * app=true 时在自然布局位置生成占位。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /**
   * app=true 时的额外底部安全区；数字按 px 处理，也可传 CSS block-size 值。
   *
   * @type {number | string}
   * @default 0
   */
  bottomPlaceholder: {
    type: [Number, String],
    default: 0,
    validator(value) {
      if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0;
      }

      if (typeof value !== 'string') {
        return false;
      }

      const cssValue = value.trim();

      if (!cssValue || /[;{}]/.test(cssValue)) {
        return false;
      }

      if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
        return true;
      }

      return CSS.supports('block-size', cssValue);
    },
  },
});

const emit = defineEmits({
  /**
   * 子 Item 请求切换目的地时发出新的 value。
   */
  'update:modelValue': (value) => ['string', 'number', 'boolean'].includes(typeof value),
  /**
   * Rail 请求切换展开状态时发出新的 boolean。
   */
  'update:expanded': (value) => typeof value === 'boolean',
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const instance = getCurrentInstance();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach');
const isHorizontal = computed(() => props.orientation === 'horizontal');
const effectiveExpanded = computed(() => props.expanded);
const isModal = computed(() => !isHorizontal.value && props.layout === 'modal');
const isHidden = computed(() => !isHorizontal.value && props.hideOnCollapse && !props.expanded);
const usesAppRoot = computed(() => props.app && Boolean(appContext) && !hasExplicitAttach);
const attachTarget = computed(() => {
  if (!props.app) {
    return null;
  }

  if (usesAppRoot.value) {
    return appContext.edgeLayer.value;
  }

  if (typeof props.attach === 'string') {
    try {
      return document.querySelector(props.attach);
    } catch {
      return null;
    }
  }

  return normalizeAttach(props.attach);
});
const menuIcon = computed(() => (props.expanded ? props.closeIcon : props.openIcon));
const menuLabel = computed(() => (props.expanded ? props.closeLabel : props.openLabel));
const hostClasses = computed(() => ({
  'mat-navigation-rail-host--vertical': !isHorizontal.value,
  'mat-navigation-rail-host--horizontal': isHorizontal.value,
  'mat-navigation-rail-host--expanded': effectiveExpanded.value,
  'mat-navigation-rail-host--collapsed': !props.expanded,
  [`mat-navigation-rail-host--${props.position}`]: true,
  'mat-navigation-rail-host--modal': isModal.value,
  'mat-navigation-rail-host--hidden': isHidden.value,
  'mat-navigation-rail-host--app': props.app,
  'mat-navigation-rail-host--app-root': usesAppRoot.value,
}));
const railClasses = computed(() => ({
  'mat-navigation-rail--expanded': effectiveExpanded.value,
  'mat-navigation-rail--collapsed': !props.expanded,
  'mat-navigation-rail--bar': isHorizontal.value,
  'mat-navigation-rail--modal': isModal.value && props.expanded,
  'mat-navigation-rail--hidden': isHidden.value,
  'mat-navigation-rail--app': props.app,
  'mat-navigation-rail--app-root': usesAppRoot.value,
}));

const expandedWidthStyle = computed(() => {
  if (props.width === undefined) {
    return undefined;
  }

  const width = typeof props.width === 'number' ? `${props.width}px` : props.width;

  return { '--mat-navigation-rail-expanded-width': width };
});
const effectiveBottomPlaceholder = computed(() => (
  props.app && !usesAppRoot.value ? normalizeBottomPlaceholder(props.bottomPlaceholder) : '0px'
));
const railStyle = computed(() => [
  expandedWidthStyle.value,
  {
    '--mat-navigation-rail-app-end-inset': `${edgeRegistration.value?.insets.end ?? 0}px`,
    '--mat-navigation-rail-app-start-inset': `${edgeRegistration.value?.insets.start ?? 0}px`,
    '--mat-navigation-rail-bottom-placeholder': effectiveBottomPlaceholder.value,
  },
]);
const hostElement = ref(null);
const railElement = ref(null);
const railSize = ref({
  blockSize: 0,
  inlineSize: 0,
});
const placeholderStyle = computed(() => ({
  blockSize: `${railSize.value.blockSize}px`,
  inlineSize: `${railSize.value.inlineSize}px`,
}));

const edgeRegistration = shallowRef(null);
let resizeObserver;

function syncRailSize() {
  const rect = hostElement.value?.getBoundingClientRect();

  if (!rect) {
    return;
  }

  railSize.value = {
    blockSize: Math.max(0, Math.ceil(Number(rect.height) || 0)),
    inlineSize: Math.max(0, Math.ceil(Number(rect.width) || 0)),
  };
  edgeRegistration.value?.update();
}

async function syncRailMeasurement() {
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  edgeRegistration.value?.unregister();
  edgeRegistration.value = null;
  await nextTick();

  if (!props.app || !hostElement.value) {
    return;
  }

  resizeObserver = typeof ResizeObserver === 'undefined'
    ? undefined
    : new ResizeObserver(syncRailSize);
  resizeObserver?.observe(hostElement.value);

  if (usesAppRoot.value) {
    edgeRegistration.value = appContext.publicContext.registerEdge({
      edge: isHorizontal.value ? 'bottom' : props.position,
      element: hostElement.value,
    });
  }

  syncRailSize();
}

function warnForInvalidAttach() {
  if (props.app && !usesAppRoot.value && !attachTarget.value) {
    console.warn('MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement');
  }
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isSelected(value) {
  return value !== undefined && Object.is(props.modelValue, value);
}

/**
 * @param {unknown} value
 */
function requestSelection(value) {
  if (value === undefined || Object.is(props.modelValue, value)) {
    return;
  }

  emit('update:modelValue', value);
}

function toggleExpanded() {
  emit('update:expanded', !props.expanded);
}

function requestCollapse() {
  emit('update:expanded', false);
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key === 'Escape' && isModal.value && props.expanded) {
    requestCollapse();
  }
}

provide(MAT_NAVIGATION_RAIL_KEY, {
  expanded: effectiveExpanded,
  isSelected,
  orientation: computed(() => props.orientation),
  position: computed(() => props.position),
  requestSelection,
  useCursor: matUi.useCursor,
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  warnForInvalidAttach();
  syncRailMeasurement();
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  resizeObserver?.disconnect();
  edgeRegistration.value?.unregister();
});

watch([
  () => props.app,
  () => props.attach,
  () => props.bottomPlaceholder,
  () => props.expanded,
  () => props.hideOnCollapse,
  () => props.layout,
  () => props.orientation,
  () => props.width,
  usesAppRoot,
], () => {
  warnForInvalidAttach();
  syncRailMeasurement();
});
</script>

<template>
  <span
    v-if="app && attachTarget && placeholder"
    class="mat-navigation-rail__placeholder"
    :style="placeholderStyle"
    aria-hidden="true"
  />

  <Teleport
    :to="attachTarget ?? 'body'"
    :disabled="!app"
  >
    <div
      v-if="!app || attachTarget"
      ref="hostElement"
      class="mat-navigation-rail-host"
      :class="hostClasses"
      :style="railStyle"
    >
      <button
        v-if="isModal && expanded"
        class="mat-navigation-rail__scrim"
        type="button"
        :aria-label="closeLabel"
        @click="requestCollapse"
      />

      <nav
        ref="railElement"
        v-bind="$attrs"
        class="mat-navigation-rail"
        :class="railClasses"
      >
        <div
          v-if="!isHorizontal"
          class="mat-navigation-rail__header"
        >
          <slot
            v-if="!isHidden"
            name="header"
            :expanded="expanded"
          />

          <MatActionBase
            v-if="collapsible"
            class="mat-navigation-rail__menu"
            :aria-expanded="expanded"
            :aria-label="menuLabel"
            :focus-ring="false"
            :use-cursor="matUi.useCursor"
            @click="toggleExpanded"
          >
            <MatIcon
              :icon="menuIcon"
              aria-hidden="true"
            />
          </MatActionBase>

          <div
            v-if="$slots.fab && !isHidden"
            class="mat-navigation-rail__fab"
          >
            <slot
              name="fab"
              :expanded="expanded"
            />
          </div>
        </div>

        <div
          v-if="!isHidden"
          class="mat-navigation-rail__content"
        >
          <div
            class="mat-navigation-rail__destinations"
            :class="`mat-navigation-rail__destinations--${alignment}`"
          >
            <slot
              :expanded="effectiveExpanded"
              :orientation="orientation"
            />
          </div>
        </div>

        <div
          v-if="$slots.end && !isHidden && !isHorizontal"
          class="mat-navigation-rail__end"
        >
          <slot
            name="end"
            :expanded="expanded"
          />
        </div>
      </nav>
    </div>
  </Teleport>
</template>

<style scoped>
.mat-navigation-rail-host {
  --mat-navigation-rail-item-inline-alignment: flex-start;
  position: relative;
  flex: 0 0 auto;
  inline-size: var(--mat-navigation-rail-collapsed-width);
  min-block-size: 100%;
  transition: inline-size var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized);
}

.mat-navigation-rail-host--end {
  --mat-navigation-rail-item-inline-alignment: flex-end;
}

.mat-navigation-rail-host--horizontal {
  inline-size: 100%;
  min-block-size: 0;
  block-size: var(--mat-navigation-bar-height);
}

.mat-navigation-rail-host--horizontal.mat-navigation-rail-host--collapsed {
  block-size: var(--mat-navigation-bar-collapsed-height);
}

.mat-navigation-rail-host--vertical.mat-navigation-rail-host--expanded:not(.mat-navigation-rail-host--modal) {
  inline-size: var(--mat-navigation-rail-expanded-width);
}

.mat-navigation-rail-host--hidden {
  inline-size: 0;
}

.mat-navigation-rail-host--app {
  position: fixed;
  z-index: var(--mat-sys-z-index-toolbar);
  inset-block: 0;
  inset-inline-start: 0;
  block-size: 100dvb;
}

.mat-navigation-rail-host--app-root {
  position: absolute;
  inset-block: var(--mat-navigation-rail-app-start-inset) auto;
  block-size: calc(
    100%
    - var(--mat-navigation-rail-app-start-inset)
    - var(--mat-navigation-rail-app-end-inset)
  );
  min-block-size: 0;
  pointer-events: auto;
}

.mat-navigation-rail-host--app.mat-navigation-rail-host--end {
  inset-inline: auto 0;
}

.mat-navigation-rail-host--app.mat-navigation-rail-host--horizontal {
  --mat-navigation-rail-app-bar-height: var(--mat-navigation-bar-height);
  inset: auto 0 0;
  block-size: calc(
    var(--mat-navigation-rail-app-bar-height)
    + var(--mat-navigation-rail-bottom-placeholder)
  );
}

.mat-navigation-rail-host--app-root.mat-navigation-rail-host--horizontal {
  inset: auto var(--mat-navigation-rail-app-end-inset) 0 var(--mat-navigation-rail-app-start-inset);
  inline-size: auto;
  block-size: calc(
    var(--mat-navigation-rail-app-bar-height)
    + var(--mat-app-root-safe-area-bottom)
  );
}

.mat-navigation-rail-host--app.mat-navigation-rail-host--horizontal.mat-navigation-rail-host--collapsed {
  --mat-navigation-rail-app-bar-height: var(--mat-navigation-bar-collapsed-height);
}

.mat-navigation-rail {
  position: relative;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  inline-size: 100%;
  block-size: 100%;
  min-block-size: inherit;
  flex-direction: column;
  align-items: stretch;
  color: var(--mat-navigation-rail-content-color);
  background: var(--mat-navigation-rail-container-color);
  transition: inline-size var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized), border-radius var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized);
}

.mat-navigation-rail--app {
  padding-block-end: var(--mat-navigation-rail-bottom-placeholder);
}

.mat-navigation-rail--modal {
  position: absolute;
  z-index: 11;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: var(--mat-navigation-rail-expanded-width);
  max-inline-size: calc(100dvi - var(--mat-navigation-rail-modal-edge-space));
  background: var(--mat-navigation-rail-modal-container-color);
  border-start-end-radius: var(--mat-navigation-rail-modal-shape);
  border-end-end-radius: var(--mat-navigation-rail-modal-shape);
  box-shadow: var(--mat-navigation-rail-modal-elevation);
}

.mat-navigation-rail--app-root.mat-navigation-rail--modal {
  max-inline-size: calc(100% - var(--mat-navigation-rail-modal-edge-space));
}

.mat-navigation-rail--app-root:not(.mat-navigation-rail--bar) {
  padding-block: var(--mat-app-root-safe-area-top) max(
    var(--mat-navigation-rail-bottom-placeholder),
    var(--mat-app-root-safe-area-bottom)
  );
}

.mat-navigation-rail--app-root.mat-navigation-rail--bar {
  padding-block-end: max(
    var(--mat-navigation-rail-bottom-placeholder),
    var(--mat-app-root-safe-area-bottom)
  );
}

.mat-navigation-rail-host--app.mat-navigation-rail-host--end .mat-navigation-rail--modal {
  inset-inline: auto 0;
  border-start-start-radius: var(--mat-navigation-rail-modal-shape);
  border-end-start-radius: var(--mat-navigation-rail-modal-shape);
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}

.mat-navigation-rail--bar {
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  min-block-size: 0;
  background: var(--mat-navigation-bar-container-color);
  box-shadow: var(--mat-navigation-bar-elevation);
}

.mat-navigation-rail--hidden {
  inline-size: 0;
  background: transparent;
}

.mat-navigation-rail__scrim {
  position: absolute;
  z-index: 10;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 100dvi;
  block-size: 100%;
  padding: 0;
  background: var(--mat-navigation-rail-scrim-color);
  border: 0;
}

.mat-navigation-rail-host--app-root .mat-navigation-rail__scrim {
  inline-size: 100%;
}

.mat-navigation-rail__header {
  display: flex;
  flex: 0 0 auto;
  min-inline-size: 0;
  flex-direction: column;
  align-items: var(--mat-navigation-rail-item-inline-alignment);
  gap: var(--mat-navigation-rail-header-gap);
  padding-block-start: var(--mat-navigation-rail-top-space);
  padding-inline: var(--mat-navigation-rail-collapsed-side-space);
}

.mat-navigation-rail--expanded .mat-navigation-rail__header {
  align-items: var(--mat-navigation-rail-item-inline-alignment);
  padding-inline: var(--mat-navigation-rail-expanded-side-space);
}

.mat-navigation-rail--hidden .mat-navigation-rail__header {
  position: absolute;
  inset-block-start: var(--mat-navigation-rail-top-space);
  inset-inline-start: var(--mat-navigation-rail-hidden-menu-space);
  padding: 0;
}

.mat-navigation-rail__menu {
  display: inline-flex;
  flex: 0 0 auto;
  inline-size: var(--mat-navigation-rail-menu-size);
  block-size: var(--mat-navigation-rail-menu-size);
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--mat-navigation-rail-content-color);
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-navigation-rail__menu:focus-visible {
  outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset);
}

.mat-navigation-rail__fab {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.mat-navigation-rail__content {
  display: flex;
  flex: 1 1 auto;
  min-block-size: 0;
  flex-direction: column;
  padding-block: var(--mat-navigation-rail-item-space);
}

.mat-navigation-rail__end {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: var(--mat-navigation-rail-end-space);
}

.mat-navigation-rail--expanded .mat-navigation-rail__end {
  justify-content: var(--mat-navigation-rail-item-inline-alignment);
  padding-inline: var(--mat-navigation-rail-expanded-side-space);
}

.mat-navigation-rail--bar .mat-navigation-rail__content {
  flex: 1 1 auto;
  flex-direction: row;
  padding: 0 var(--mat-navigation-bar-edge-space);
}

.mat-navigation-rail__destinations {
  display: flex;
  flex: 1 1 auto;
  min-inline-size: 0;
  min-block-size: 0;
  flex-direction: column;
  align-items: stretch;
  gap: var(--mat-navigation-rail-item-space);
}

.mat-navigation-rail__destinations--top {
  justify-content: flex-start;
}

.mat-navigation-rail__destinations--center {
  justify-content: center;
}

.mat-navigation-rail--bar .mat-navigation-rail__destinations {
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: var(--mat-navigation-bar-item-space);
}

.mat-navigation-rail__placeholder {
  display: block;
  flex: 0 0 auto;
  min-inline-size: 0;
  min-block-size: 0;
  pointer-events: none;
  visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .mat-navigation-rail-host,
  .mat-navigation-rail {
    transition-duration: 0s;
  }
}
</style>
