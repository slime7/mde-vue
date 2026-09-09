<script setup>
import {
  cloneVNode, computed, Fragment, getCurrentInstance, h, inject, isVNode,
  onBeforeUnmount, onMounted, provide, ref, useSlots, watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import { MAT_LAYOUT_KEY } from '../mat-layout/layout-context';
import MatAside from '../mat-aside/MatAside.vue';
import MatScrollArea from '../mat-scroll-area/MatScrollArea.vue';
import createCloseMotion from '../close-motion';
import createMotionController from '../motion-controller';
import MatNavigationItem from '../mat-navigation-item/MatNavigationItem.vue';
import MatNavigationRailItem from './MatNavigationRailItem.vue';
import { MAT_NAVIGATION_KEY } from './mat-navigation-context';
import { isValidCssLength, toCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationRail',
  inheritAttrs: false,
});

const props = defineProps({
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
   * 纵向 Rail 布局；可选值为 standard、modal。
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
   * 默认 Slot 在主轴上的对齐方式；可选值为 start、center、end。
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
   * 是否 Teleport 到 attach 并固定到视口或接入 MatAppRoot。
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
   * modal 布局在自然布局位置生成占位；standard 布局使用最近 MatLayout 或 MatAppRoot 的 padding。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
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
   * 受控显示/隐藏状态，支持 v-model:open。
   * 省略时遵循 hideOnCollapse 或 modal 模式与 expanded 联动，其余场景默认开启。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  open: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 安全区留白配置。
   *
   * @type {boolean | number | string}
   * @default true
   */
  safeArea: {
    type: [Boolean, Number, String],
    default: true,
  },
  /**
   * 显式指定安全区留白大小。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  safeAreaSize: {
    type: [Number, String],
    default: undefined,
  },
  /**
   * 排布与定位模式。未指定时遵循 aside 默认行为。
   *
   * @type {'docked' | 'flow' | 'sticky' | 'fixed' | undefined}
   * @default undefined
   */
  mode: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || ['docked', 'flow', 'sticky', 'fixed'].includes(value);
    },
  },
  /**
   * 是否启用展开收起过渡动效。
   *
   * @type {boolean}
   * @default true
   */
  transition: {
    type: Boolean,
    default: true,
  },
  /**
   * 显式指定层级。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  zIndex: {
    type: [Number, String],
    default: undefined,
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
  /**
   * Rail 请求切换打开/显隐状态时发出新的 boolean。
   */
  'update:open': (value) => typeof value === 'boolean',
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const slots = useSlots();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const layoutContext = inject(MAT_LAYOUT_KEY, null);
const instance = getCurrentInstance();
const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = computed(() => (
  Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach') && rawVNodeProps.attach !== undefined
));
const forwardedAttach = computed(() => (hasExplicitAttach.value ? propsWithDefaults.attach : undefined));
const asideRef = ref(null);

const effectiveMode = computed(() => {
  if (propsWithDefaults.mode !== undefined) {
    return propsWithDefaults.mode;
  }
  if (propsWithDefaults.app) {
    return undefined;
  }
  if (layoutContext || (isModal.value && appContext)) {
    return 'docked';
  }
  return 'flow';
});

const isModal = computed(() => propsWithDefaults.layout === 'modal');
const isHidden = computed(() => propsWithDefaults.hideOnCollapse && !propsWithDefaults.expanded);
const presentedExpanded = ref(propsWithDefaults.expanded);
const showCollapsibleContent = ref(!isHidden.value);
const hasFixedHeader = computed(() => showCollapsibleContent.value && Boolean(slots.header));
const showsCustomContent = computed(() => propsWithDefaults.expanded);
const isAsideOpen = computed(() => {
  if (propsWithDefaults.open !== undefined) {
    return propsWithDefaults.open;
  }
  if (propsWithDefaults.hideOnCollapse) {
    return propsWithDefaults.expanded;
  }
  if (isModal.value) {
    return propsWithDefaults.expanded;
  }
  return true;
});

const hideMotion = createMotionController();
const closeMotion = createCloseMotion({ motion: hideMotion });

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
    getElement: () => asideRef.value?.hostElement,
    isActive: () => isHidden.value && showCollapsibleContent.value && Boolean(asideRef.value?.hostElement),
    onFinish: () => {
      presentedExpanded.value = false;
      showCollapsibleContent.value = false;
    },
    onStart: () => {
      showCollapsibleContent.value = true;
    },
  });
}

watch(() => propsWithDefaults.expanded, syncExpandedPresentation);

const usesAppRoot = computed(() => (
  propsWithDefaults.app && Boolean(appContext) && !hasExplicitAttach.value
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
  return propsWithDefaults.attach instanceof HTMLElement ? propsWithDefaults.attach : null;
});

const canRender = computed(() => (
  !propsWithDefaults.app || usesAppRoot.value || Boolean(attachTarget.value)
));

function warnForInvalidAttach() {
  if (propsWithDefaults.app && !usesAppRoot.value && !attachTarget.value) {
    console.warn('MatNavigationRail: attach 必须指向当前 document 中存在的 HTMLElement');
  }
}

function isNavigationItemVNode(vnode) {
  return vnode.type === MatNavigationRailItem
    || vnode.type?.name === 'MatNavigationRailItem'
    || vnode.type === MatNavigationItem
    || vnode.type?.name === 'MatNavigationItem';
}

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

  if (isCollapsedVisibleVNode(node)) {
    return node;
  }

  return cloneVNode(node, { hidden: true });
}

function NavigationRailContent() {
  return slots.default?.({
    expanded: propsWithDefaults.expanded,
    orientation: 'vertical',
  }).map(renderDefaultNode);
}

const effectiveBlockSize = computed(() => {
  if (propsWithDefaults.width !== undefined) {
    const css = toCssLength(propsWithDefaults.width, { property: 'inline-size' });
    if (css !== undefined) {
      return css === '0' ? '0' : css;
    }
  }
  if (propsWithDefaults.expanded || isModal.value) {
    return 'var(--mat-navigation-rail-expanded-width, 240px)';
  }
  return 'var(--mat-navigation-rail-collapsed-width, 80px)';
});

const hostClasses = computed(() => ({
  'mat-navigation-rail': true,
  'mat-navigation-rail-host': true,
  'mat-navigation-rail-host--vertical': true,
  'mat-navigation-rail-host--expanded': propsWithDefaults.expanded,
  'mat-navigation-rail-host--collapsed': !propsWithDefaults.expanded,
  'mat-navigation-rail-host--modal': isModal.value,
  'mat-navigation-rail-host--hidden': isHidden.value,
  'mat-navigation-rail-host--app': propsWithDefaults.app,
  'mat-navigation-rail-host--app-root': propsWithDefaults.app && Boolean(appContext) && !hasExplicitAttach.value,
  'mat-navigation-rail--expanded': propsWithDefaults.expanded,
  'mat-navigation-rail--collapsed': !propsWithDefaults.expanded,
  'mat-navigation-rail--modal': isModal.value && propsWithDefaults.expanded,
  'mat-navigation-rail--with-header': hasFixedHeader.value,
  'mat-navigation-rail--app': propsWithDefaults.app,
}));

const hostStyles = computed(() => {
  const styles = {};
  if (propsWithDefaults.width !== undefined) {
    const width = toCssLength(propsWithDefaults.width, { property: 'inline-size' });
    if (width !== undefined) {
      styles['--mat-navigation-rail-expanded-width'] = width;
    }
  }
  if (isModal.value) {
    styles.maxInlineSize = usesAppRoot.value
      ? 'calc(100% - var(--mat-navigation-rail-modal-edge-space, 8px))'
      : 'calc(100dvi - var(--mat-navigation-rail-modal-edge-space, 8px))';
  }
  return styles;
});

function handleAsideUpdateOpen(val) {
  emit('update:open', val);
  if (!val && (isModal.value || propsWithDefaults.hideOnCollapse)) {
    emit('update:expanded', false);
  }
}

provide(MAT_NAVIGATION_KEY, {
  expanded: computed(() => propsWithDefaults.expanded),
  fullWidth: computed(() => propsWithDefaults.fullWidth),
  orientation: computed(() => 'vertical'),
  isSelected: (val) => val !== undefined && Object.is(propsWithDefaults.modelValue, val),
  requestSelection: (val) => {
    if (val !== undefined && !Object.is(propsWithDefaults.modelValue, val)) {
      emit('update:modelValue', val);
    }
  },
  useCursor: matUi.useCursor,
});

onMounted(() => {
  warnForInvalidAttach();
});

onBeforeUnmount(() => {
  hideMotion.cancel();
});

watch([() => propsWithDefaults.app, () => propsWithDefaults.attach, usesAppRoot], warnForInvalidAttach);

defineExpose({
  asideRef,
  hostElement: computed(() => asideRef.value?.hostElement),
});
</script>

<template>
  <MatAside
    v-if="canRender"
    ref="asideRef"
    as="nav"
    location="start"
    :app="propsWithDefaults.app"
    :attach="forwardedAttach"
    :placeholder="propsWithDefaults.placeholder"
    :bordered="propsWithDefaults.bordered"
    :modal="isModal"
    :open="isAsideOpen"
    :block-size="effectiveBlockSize"
    :safe-area="propsWithDefaults.safeArea"
    :safe-area-size="propsWithDefaults.safeAreaSize"
    :mode="effectiveMode"
    :transition="propsWithDefaults.transition"
    :z-index="propsWithDefaults.zIndex"
    scrim-class="mat-navigation-rail__scrim"
    :close-on-back="true"
    :class="hostClasses"
    :style="hostStyles"
    v-bind="$attrs"
    @update:open="handleAsideUpdateOpen"
  >
    <template #placeholder="{ style }">
      <span
        class="mat-navigation-rail__placeholder mat-aside__placeholder"
        :style="style"
        aria-hidden="true"
      />
    </template>

    <MatScrollArea
      class="mat-navigation-rail__scroll-area"
      orientation="vertical"
      bar-width="thin"
      :shadow-length="0"
      no-scroll-padding
    >
      <div class="mat-navigation-rail__layout">
        <div
          v-if="hasFixedHeader && showCollapsibleContent"
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
  </MatAside>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-rail {
    --mat-navigation-rail-current-container-color: var(--mat-navigation-rail-container-color);
    --mat-navigation-rail-item-inline-alignment: flex-start;
    z-index: 1;
    display: flex;
    box-sizing: border-box;
    block-size: 100%;
    min-block-size: 100%;
    flex-direction: column;
    align-items: stretch;
    color: var(--mat-navigation-rail-content-color);
    background: var(--mat-navigation-rail-current-container-color);
    transition: inline-size var(--mat-sys-motion-spring-default-spatial), border-radius var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail-host--hidden {
    inline-size: 0;
  }

  :deep(.mat-navigation-rail__placeholder) {
    display: block;
    pointer-events: none;
    box-sizing: border-box;
    overflow: hidden;
    transition: inline-size var(--mat-sys-motion-spring-default-spatial, .3s ease);
  }

  .mat-navigation-rail--modal {
    --mat-navigation-rail-current-container-color: var(--mat-navigation-rail-modal-container-color);
    background: var(--mat-navigation-rail-modal-container-color);
    border-start-end-radius: var(--mat-navigation-rail-modal-shape);
    border-end-end-radius: var(--mat-navigation-rail-modal-shape);
    box-shadow: var(--mat-navigation-rail-modal-elevation);
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

  .mat-navigation-rail__scroll-area {
    flex: 1 1 auto;
    inline-size: 100%;
    block-size: 100%;
  }

  .mat-navigation-rail__layout {
    display: flex;
    min-inline-size: 100%;
    min-block-size: 100%;
    flex-direction: column;
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

  .mat-navigation-rail__destinations > :deep(.mat-btn) {
    align-self: var(--mat-navigation-rail-item-inline-alignment, flex-start);
  }

  .mat-navigation-rail__destinations > :deep(.mat-fab) {
    align-self: var(--mat-navigation-rail-item-inline-alignment, flex-start);
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

  .mat-navigation-rail__destinations:not(.mat-navigation-rail__destinations--show-custom-content) {
    font-size: 0;
  }

  :global(.mat-navigation-rail__destinations:not(.mat-navigation-rail__destinations--show-custom-content) > :not(.mat-navigation-rail-item):not(.mat-fab):not(.mat-btn):not(.mat-action-base):not(.mat-spacer):not([data-rail-action])) {
    display: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-navigation-rail,
    :deep(.mat-navigation-rail__placeholder) {
      transition-duration: 0s;
    }
  }
}
</style>
