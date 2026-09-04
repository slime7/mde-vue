<script setup>
import {
  cloneVNode, computed, Fragment, getCurrentInstance, h, inject, isVNode, nextTick,
  onBeforeUnmount, onMounted, provide, ref, shallowRef, useSlots, watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import createCloseMotion from '../close-motion';
import createMotionController from '../motion-controller';
import MatScrollArea from '../mat-scroll-area/MatScrollArea.vue';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import MatNavigationRailItem from './MatNavigationRailItem.vue';
import { MAT_NAVIGATION_RAIL_KEY } from './mat-navigation-context';
import { isValidCssLength, toCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

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
   * expanded Rail 的宽度；数字与纯数字字符串按 px 处理，
   * 其他字符串 trim 后须为合法 CSS 宽度值，非法时使用默认宽度。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  width: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, { property: 'inline-size' }),
  },
  /**
   * 展开态下所有 Item 的活动指示器是否铺满可用宽度。
   *
   * @type {boolean}
   * @default false
   */
  fullWidth: {
    type: Boolean,
    default: false,
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
   * 默认 Slot 在主轴上的对齐方式；可选值为 `start`、`center`、`end`。
   *
   * @type {'start' | 'center' | 'end'}
   * @default 'start'
   */
  alignment: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
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
   * app=true 时的额外底部安全区；数字与纯数字字符串按 px 处理，
   * 其他字符串 trim 后须为合法 CSS block-size 值，非法时回退 0。
   *
   * @type {number | string}
   * @default 0
   */
  bottomPlaceholder: {
    type: [Number, String],
    default: 0,
    validator: (value) => isValidCssLength(value, {
      property: 'block-size',
      allowUndefined: false,
    }),
  },
});
const propsWithDefaults = useMatProps('navigationRail', props);

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
const slots = useSlots();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach') && rawVNodeProps.attach !== undefined;
const isHorizontal = computed(() => propsWithDefaults.orientation === 'horizontal');
const isModal = computed(() => (
  !isHorizontal.value && propsWithDefaults.layout === 'modal'
));
const isHidden = computed(() => (
  !isHorizontal.value && propsWithDefaults.hideOnCollapse && !propsWithDefaults.expanded
));
const presentedExpanded = ref(propsWithDefaults.expanded);
const showCollapsibleContent = ref(!isHidden.value);
const effectiveExpanded = computed(() => presentedExpanded.value);
const hasFixedHeader = computed(() => (
  showCollapsibleContent.value && Boolean(slots.header)
));
const showsCustomContent = computed(() => (
  !isHorizontal.value && propsWithDefaults.expanded
));

/**
 * @param {import('vue').VNode} vnode
 * @returns {boolean}
 */
function isNavigationItemVNode(vnode) {
  return vnode.type === MatNavigationRailItem
    || vnode.type?.name === 'MatNavigationRailItem';
}

/**
 * @param {import('vue').VNode} vnode
 * @returns {boolean}
 */
function isCollapsedVisibleVNode(vnode) {
  if (isNavigationItemVNode(vnode)) {
    return true;
  }

  const name = vnode.type?.name || vnode.type?.__name;
  if (name === 'MatFab' || name === 'MatBtn' || name === 'MatActionBase' || name === 'MatSpacer') {
    return true;
  }

  if (vnode.props && (vnode.props['data-rail-action'] !== undefined || vnode.props.collapsibleVisible !== undefined)) {
    return true;
  }

  return false;
}

/**
 * @param {unknown} node
 * @returns {unknown}
 */
function renderDefaultNode(node) {
  if (!isVNode(node)) {
    return node;
  }

  if (node.type === Fragment && Array.isArray(node.children)) {
    return h(
      Fragment,
      { key: node.key },
      node.children.map(renderDefaultNode),
    );
  }

  if (isNavigationItemVNode(node)) {
    return node;
  }

  if (showsCustomContent.value) {
    return node;
  }

  if (!isHorizontal.value && isCollapsedVisibleVNode(node)) {
    return node;
  }

  return cloneVNode(node, { hidden: true });
}

function NavigationRailContent() {
  return slots.default?.({
    expanded: propsWithDefaults.expanded,
    orientation: propsWithDefaults.orientation,
  }).map(renderDefaultNode);
}
const hideMotion = createMotionController();
const closeMotion = createCloseMotion({ motion: hideMotion });
const usesAppRoot = computed(() => (
  propsWithDefaults.app && Boolean(appContext) && !hasExplicitAttach
));
const attachTarget = computed(() => {
  if (!propsWithDefaults.app || usesAppRoot.value) {
    return null;
  }

  if (typeof propsWithDefaults.attach === 'string') {
    try {
      return document.querySelector(propsWithDefaults.attach);
    } catch {
      return null;
    }
  }

  return normalizeAttach(propsWithDefaults.attach);
});
const hostClasses = computed(() => ({
  'mat-navigation-rail-host--vertical': !isHorizontal.value,
  'mat-navigation-rail-host--horizontal': isHorizontal.value,
  'mat-navigation-rail-host--expanded': effectiveExpanded.value,
  'mat-navigation-rail-host--collapsed': !effectiveExpanded.value,
  'mat-navigation-rail-host--modal': isModal.value,
  'mat-navigation-rail-host--hidden': isHidden.value,
  'mat-navigation-rail-host--app': propsWithDefaults.app,
  'mat-navigation-rail-host--app-root': usesAppRoot.value,
}));
const railClasses = computed(() => ({
  'mat-navigation-rail--expanded': effectiveExpanded.value,
  'mat-navigation-rail--collapsed': !effectiveExpanded.value,
  'mat-navigation-rail--bar': isHorizontal.value,
  'mat-navigation-rail--modal': isModal.value && effectiveExpanded.value,
  'mat-navigation-rail--hidden': isHidden.value,
  'mat-navigation-rail--collapsible-hidden': !showCollapsibleContent.value,
  'mat-navigation-rail--with-header': hasFixedHeader.value,
  'mat-navigation-rail--app': propsWithDefaults.app,
  'mat-navigation-rail--app-root': usesAppRoot.value,
}));

const expandedWidthStyle = computed(() => {
  const width = toCssLength(propsWithDefaults.width, { property: 'inline-size' });

  if (width === undefined) {
    return undefined;
  }

  return { '--mat-navigation-rail-expanded-width': width };
});
const effectiveBottomPlaceholder = computed(() => {
  if (!propsWithDefaults.app || usesAppRoot.value) {
    return '0px';
  }

  const css = toCssLength(propsWithDefaults.bottomPlaceholder, {
    property: 'block-size',
    fallback: '0px',
  });

  // 占位高度参与 max()/calc() 运算，必须始终携带长度单位；
  // toCssLength 会把 0 输出为无单位值，导致整条声明失效。
  return css === '0' ? '0px' : css;
});
const railStyle = computed(() => [
  expandedWidthStyle.value,
  {
    '--mat-navigation-rail-app-bottom-inset': `${edgeRegistration.value?.insets.bottom ?? 0}px`,
    '--mat-navigation-rail-app-bottom-offset': `${edgeRegistration.value?.insets.bottom ?? 0}px`,
    '--mat-navigation-rail-app-end-inset': `${edgeRegistration.value?.insets.end ?? 0}px`,
    '--mat-navigation-rail-app-start-inset': `${edgeRegistration.value?.insets.start ?? 0}px`,
    '--mat-navigation-rail-app-start-offset': `${edgeRegistration.value?.insets.start ?? 0}px`,
    '--mat-navigation-rail-app-top-inset': `${edgeRegistration.value?.insets.top ?? 0}px`,
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

  if (!propsWithDefaults.app || !hostElement.value) {
    return;
  }

  resizeObserver = typeof ResizeObserver === 'undefined'
    ? undefined
    : new ResizeObserver(syncRailSize);
  resizeObserver?.observe(hostElement.value);

  if (usesAppRoot.value && !propsWithDefaults.placeholder) {
    edgeRegistration.value = appContext.publicContext.registerEdge({
      edge: isHorizontal.value ? 'bottom' : 'start',
      element: hostElement.value,
    });
  }

  syncRailSize();
}

function warnForInvalidAttach() {
  if (propsWithDefaults.app && !usesAppRoot.value && !attachTarget.value) {
    console.warn('MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement');
  }
}

function syncExpandedPresentation() {
  hideMotion.cancel();

  if (propsWithDefaults.expanded || !isHidden.value) {
    presentedExpanded.value = propsWithDefaults.expanded;
    showCollapsibleContent.value = true;
    return;
  }

  closeMotion.start({
    canStart: () => isHidden.value,
    duration: 200,
    getElement: () => hostElement.value,
    isActive: () => isHidden.value
      && showCollapsibleContent.value
      && Boolean(hostElement.value),
    onFinish: () => {
      presentedExpanded.value = false;
      showCollapsibleContent.value = false;
    },
    onStart: () => {
      showCollapsibleContent.value = true;
    },
  });
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isSelected(value) {
  return value !== undefined && Object.is(propsWithDefaults.modelValue, value);
}

/**
 * @param {unknown} value
 */
function requestSelection(value) {
  if (value === undefined || Object.is(propsWithDefaults.modelValue, value)) {
    return;
  }

  emit('update:modelValue', value);
}

function requestCollapse() {
  emit('update:expanded', false);
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key === 'Escape' && isModal.value && propsWithDefaults.expanded) {
    requestCollapse();
  }
}

provide(MAT_NAVIGATION_RAIL_KEY, {
  expanded: effectiveExpanded,
  fullWidth: computed(() => propsWithDefaults.fullWidth),
  isSelected,
  orientation: computed(() => propsWithDefaults.orientation),
  requestSelection,
  useCursor: matUi.useCursor,
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  warnForInvalidAttach();
  syncRailMeasurement();
});

onBeforeUnmount(() => {
  hideMotion.cancel();
  window.removeEventListener('keydown', handleKeydown);
  resizeObserver?.disconnect();
  edgeRegistration.value?.unregister();
});

watch([
  () => propsWithDefaults.app,
  () => propsWithDefaults.attach,
  () => propsWithDefaults.bottomPlaceholder,
  () => propsWithDefaults.expanded,
  () => propsWithDefaults.hideOnCollapse,
  () => propsWithDefaults.layout,
  () => propsWithDefaults.orientation,
  () => propsWithDefaults.placeholder,
  () => propsWithDefaults.width,
  usesAppRoot,
], () => {
  warnForInvalidAttach();
  syncRailMeasurement();
});
watch([
  () => propsWithDefaults.expanded,
  () => propsWithDefaults.hideOnCollapse,
  () => propsWithDefaults.orientation,
], syncExpandedPresentation);
</script>

<template>
  <span
    v-if="propsWithDefaults.app && (attachTarget || usesAppRoot) && propsWithDefaults.placeholder"
    class="mat-navigation-rail__placeholder"
    :style="placeholderStyle"
    aria-hidden="true"
  />

  <Teleport
    :to="attachTarget ?? 'body'"
    :disabled="!propsWithDefaults.app || usesAppRoot"
  >
    <div
      v-if="!propsWithDefaults.app || attachTarget || usesAppRoot"
      ref="hostElement"
      class="mat-navigation-rail-host"
      :class="hostClasses"
      :style="railStyle"
    >
      <button
        v-if="isModal && (propsWithDefaults.expanded || showCollapsibleContent)"
        class="mat-navigation-rail__scrim"
        :class="{ 'mat-navigation-rail__scrim--hidden': !propsWithDefaults.expanded }"
        type="button"
        tabindex="-1"
        aria-hidden="true"
        @click="requestCollapse"
      />

      <nav
        ref="railElement"
        v-bind="$attrs"
        class="mat-navigation-rail"
        :class="railClasses"
      >
        <MatScrollArea
          class="mat-navigation-rail__scroll-area"
          :orientation="isHorizontal ? 'horizontal' : 'vertical'"
          bar-width="thin"
          :shadow-length="0"
          no-scroll-padding
        >
          <div class="mat-navigation-rail__layout">
            <div
              v-if="!isHorizontal && hasFixedHeader && showCollapsibleContent"
              class="mat-navigation-rail__header"
            >
              <slot
                name="header"
                :expanded="propsWithDefaults.expanded"
              />
            </div>

            <div
              v-if="showCollapsibleContent"
              class="mat-navigation-rail__content"
            >
              <div
                class="mat-navigation-rail__destinations"
                :class="[
                  `mat-navigation-rail__destinations--${propsWithDefaults.alignment}`,
                  {
                    'mat-navigation-rail__destinations--show-custom-content': showsCustomContent,
                  },
                ]"
              >
                <NavigationRailContent />
              </div>
            </div>
          </div>
        </MatScrollArea>
      </nav>
    </div>
  </Teleport>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-rail-host {
    --mat-navigation-rail-item-inline-alignment: flex-start;
    position: relative;
    flex: 0 0 auto;
    inline-size: var(--mat-navigation-rail-collapsed-width);
    min-block-size: 100%;
    transition: inline-size var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail-host--horizontal {
    inline-size: 100%;
    min-block-size: 0;
    block-size: var(--mat-navigation-bar-height);
    transition: inline-size var(--mat-sys-motion-spring-default-spatial), block-size var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail-host--horizontal.mat-navigation-rail-host--collapsed {
    block-size: var(--mat-navigation-bar-collapsed-height);
  }

  .mat-navigation-rail-host--vertical.mat-navigation-rail-host--expanded:not(.mat-navigation-rail-host--modal) {
    inline-size: var(--mat-navigation-rail-expanded-width);
  }

  .mat-navigation-rail-host--hidden {
    inline-size: 0;
    transition: inline-size var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-navigation-rail-host--app {
    position: fixed;
    z-index: var(--mat-sys-z-index-toolbar);
    inset-block-start: var(--mat-navigation-rail-app-top-inset, 0);
    inset-inline-start: var(--mat-navigation-rail-app-start-offset, 0);
    block-size: calc(
      100dvb
      - var(--mat-navigation-rail-app-top-inset, 0)
      - var(--mat-navigation-rail-app-bottom-inset, 0)
    );
  }

  .mat-navigation-rail-host--app-root {
    position: absolute;
    inset-inline-start: var(--mat-navigation-rail-app-start-offset, 0);
    inset-block: var(--mat-navigation-rail-app-top-inset, 0) auto;
    block-size: calc(
      100%
      - var(--mat-navigation-rail-app-top-inset, 0)
      - var(--mat-navigation-rail-app-bottom-inset, 0)
    );
    min-block-size: 0;
    pointer-events: auto;
  }

  .mat-navigation-rail-host--app.mat-navigation-rail-host--horizontal {
    --mat-navigation-rail-app-bar-height: var(--mat-navigation-bar-height);
    inset: auto var(--mat-navigation-rail-app-end-inset, 0) var(--mat-navigation-rail-app-bottom-offset, 0) var(--mat-navigation-rail-app-start-offset, 0);
    block-size: calc(
      var(--mat-navigation-rail-app-bar-height)
      + var(--mat-navigation-rail-bottom-placeholder)
    );
  }

  .mat-navigation-rail-host--app-root.mat-navigation-rail-host--horizontal {
    inset: auto var(--mat-navigation-rail-app-end-inset, 0) var(--mat-navigation-rail-app-bottom-offset, 0) var(--mat-navigation-rail-app-start-offset, 0);
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
    --mat-navigation-rail-current-container-color: var(--mat-navigation-rail-container-color);
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
    background: var(--mat-navigation-rail-current-container-color);
    transition: inline-size var(--mat-sys-motion-spring-default-spatial), border-radius var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail--app {
    padding-block-end: var(--mat-navigation-rail-bottom-placeholder);
  }

  @keyframes mat-navigation-rail-modal-enter {
    from {
      translate: -100% 0;
      opacity: 0;
    }

    to {
      translate: 0 0;
      opacity: 1;
    }
  }

  @keyframes mat-navigation-rail-scrim-enter {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .mat-navigation-rail--modal {
    --mat-navigation-rail-current-container-color: var(--mat-navigation-rail-modal-container-color);
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
    translate: 0 0;
    animation: mat-navigation-rail-modal-enter var(--mat-sys-motion-spring-default-spatial);
    transition: translate var(--mat-sys-motion-spring-default-spatial), opacity var(--mat-sys-motion-spring-fast-effects), border-radius var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail--modal.mat-navigation-rail--hidden {
    translate: -100% 0;
    opacity: 0;
    animation: none;
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

  .mat-navigation-rail--bar {
    --mat-navigation-rail-current-container-color: var(--mat-navigation-bar-container-color);
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    min-block-size: 0;
    background: var(--mat-navigation-rail-current-container-color);
    box-shadow: var(--mat-navigation-bar-elevation);
  }

  .mat-navigation-rail--hidden {
    inline-size: 0;
    background: transparent;
    transition: inline-size var(--mat-sys-motion-spring-fast-effects), background-color var(--mat-sys-motion-spring-fast-effects);
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
    opacity: 1;
    animation: mat-navigation-rail-scrim-enter var(--mat-sys-motion-spring-fast-effects);
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-navigation-rail__scrim--hidden {
    opacity: 0;
    pointer-events: none;
    animation: none;
  }

  .mat-navigation-rail-host--app-root .mat-navigation-rail__scrim {
    inline-size: 100%;
  }

  .mat-navigation-rail__header {
    position: sticky;
    z-index: 1;
    inset-block-start: 0;
    display: flex;
    flex: 0 0 auto;
    min-inline-size: 0;
    flex-direction: column;
    align-items: var(--mat-navigation-rail-item-inline-alignment);
    gap: var(--mat-navigation-rail-header-gap);
    padding-block-start: var(--mat-navigation-rail-top-space);
    padding-inline: var(--mat-navigation-rail-collapsed-side-space);
    background: var(--mat-navigation-rail-current-container-color);
  }

  .mat-navigation-rail--expanded .mat-navigation-rail__header {
    align-items: var(--mat-navigation-rail-item-inline-alignment);
    padding-inline: var(--mat-navigation-rail-expanded-side-space);
  }

  .mat-navigation-rail__content {
    display: flex;
    flex: 1 0 auto;
    min-block-size: 0;
    flex-direction: column;
    padding-block: var(--mat-navigation-rail-top-space);
    padding-inline: var(--mat-navigation-rail-collapsed-side-space);
  }

  .mat-navigation-rail--expanded .mat-navigation-rail__content {
    padding-inline: var(--mat-navigation-rail-expanded-side-space);
  }

  .mat-navigation-rail--with-header .mat-navigation-rail__content {
    padding-block-start: var(--mat-navigation-rail-header-content-space);
  }

  .mat-navigation-rail--bar .mat-navigation-rail__content {
    flex: 1 1 auto;
    flex-direction: row;
    padding: 0 var(--mat-navigation-bar-edge-space);
  }

  .mat-navigation-rail__scroll-area {
    flex: 1 1 auto;
  }

  .mat-navigation-rail__layout {
    display: flex;
    min-inline-size: 100%;
    min-block-size: 100%;
    flex-direction: column;
  }

  .mat-navigation-rail--bar .mat-navigation-rail__layout {
    flex-direction: row;
    align-items: stretch;
  }

  .mat-navigation-rail__destinations {
    display: flex;
    flex: 1 1 auto;
    min-inline-size: 0;
    min-block-size: 0;
    flex-direction: column;
    align-items: stretch;
    gap: var(--mat-navigation-rail-item-space);
    transition: gap var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail__destinations > :deep(.mat-fab) {
    margin-block-start: calc(var(--mat-navigation-rail-header-gap, 12px) - var(--mat-navigation-rail-item-space, 4px));
  }

  .mat-navigation-rail__destinations > :deep(.mat-fab + .mat-navigation-rail-item),
  .mat-navigation-rail__destinations > :deep(.mat-fab + .mat-navigation-group) {
    margin-block-start: calc(var(--mat-navigation-rail-header-content-space, 40px) - var(--mat-navigation-rail-item-space, 4px));
  }

  .mat-navigation-rail__destinations > :deep(:first-child:not(.mat-navigation-rail-item):not(.mat-fab) + .mat-navigation-rail-item),
  .mat-navigation-rail__destinations > :deep(:first-child:not(.mat-navigation-rail-item):not(.mat-fab) + .mat-navigation-group) {
    margin-block-start: calc(var(--mat-navigation-rail-header-content-space, 40px) - var(--mat-navigation-rail-item-space, 4px));
  }

  .mat-navigation-rail--expanded .mat-navigation-rail__destinations {
    gap: 0;
  }

  .mat-navigation-rail__destinations--start {
    justify-content: flex-start;
  }

  .mat-navigation-rail__destinations--center {
    justify-content: safe center;
  }

  .mat-navigation-rail__destinations--end {
    justify-content: safe flex-end;
  }

  .mat-navigation-rail--bar .mat-navigation-rail__destinations {
    flex-direction: row;
    align-items: stretch;
    gap: var(--mat-navigation-bar-item-space);
  }

  .mat-navigation-rail__destinations:not(.mat-navigation-rail__destinations--show-custom-content) {
    font-size: 0;
  }

  :global(.mat-navigation-rail__destinations:not(.mat-navigation-rail__destinations--show-custom-content) > :not(.mat-navigation-rail-item):not(.mat-fab):not(.mat-btn):not(.mat-action-base):not(.mat-spacer):not([data-rail-action])) {
    display: none !important;
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
}
</style>
