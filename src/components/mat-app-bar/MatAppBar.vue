<script setup>
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  watch,
} from 'vue';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import MatAside from '../mat-aside/MatAside.vue';
import {
  findNearestScrollSource,
  findTimelineScope,
  registerAppBarTimeline,
} from './app-bar-timeline';
import { getTypographyClass } from '../typography';
import { useMatProps } from '../use-mat-props';

const APP_BAR_VARIANTS = ['search', 'small', 'medium-flexible', 'large-flexible'];
const APP_BAR_CONTENTS = ['headline', 'image', 'search'];
const APP_BAR_ALIGNMENTS = ['start', 'center'];

defineOptions({
  name: 'MatAppBar',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * App bar 规格变体。
   *
   * @type {'search' | 'small' | 'medium-flexible' | 'large-flexible'}
   * @default 'small'
   */
  variant: {
    type: String,
    default: 'small',
    validator(value) {
      return ['search', 'small', 'medium-flexible', 'large-flexible'].includes(value);
    },
  },
  /**
   * 默认 Slot 的主内容类型。
   *
   * @type {'headline' | 'image' | 'search'}
   * @default 'headline'
   */
  content: {
    type: String,
    default: 'headline',
    validator(value) {
      return ['headline', 'image', 'search'].includes(value);
    },
  },
  /**
   * 主内容的水平对齐方式。
   *
   * @type {'start' | 'center'}
   * @default 'start'
   */
  align: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'center'].includes(value);
    },
  },
  /**
   * 是否接入最近的 MatAppRoot 顶边；不在 MatAppRoot 内时固定到 attach。
   *
   * @type {boolean}
   * @default false
   */
  app: {
    type: Boolean,
    default: false,
  },
  /**
   * app=true 时的显式 Teleport 目标。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * CSS scroll timeline 的显式滚动源；省略时依次使用 AppRoot 正文、最近滚动祖先和 document。
   *
   * @type {string | HTMLElement | undefined}
   * @default undefined
   */
  scrollTarget: {
    type: [String, Object],
    default: undefined,
  },
  /**
   * 是否在自然布局位置生成占位。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /**
   * 顶部安全区留白配置。
   *
   * @type {boolean | number | string}
   * @default true
   */
  safeArea: {
    type: [Boolean, Number, String],
    default: true,
  },
  /**
   * 显式指定顶部安全区尺寸。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  safeAreaSize: {
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
   * 是否在底部渲染 1px 细边框。
   *
   * @type {boolean}
   * @default false
   */
  bordered: {
    type: Boolean,
    default: false,
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
   * 显式指定层级。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  zIndex: {
    type: [Number, String],
    default: undefined,
  },
  /**
   * 是否启用切入退场动效。
   *
   * @type {boolean}
   * @default true
   */
  transition: {
    type: Boolean,
    default: true,
  },
});
const propsWithDefaults = useMatProps('appBar', props);

const emit = defineEmits({
  'update:open': (payload) => typeof payload === 'boolean',
  'update:modelValue': (payload) => typeof payload === 'boolean',
});

const attrs = useAttrs();
const instance = getCurrentInstance();
const appContext = inject(MAT_APP_ROOT_KEY, null);
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
  return 'sticky';
});
const timelineName = `--mat-app-bar-${instance?.uid ?? Math.random().toString(36).slice(2)}`;

const normalizedVariant = computed(() => (
  APP_BAR_VARIANTS.includes(propsWithDefaults.variant) ? propsWithDefaults.variant : 'small'
));
const normalizedContent = computed(() => {
  if (normalizedVariant.value === 'search') {
    return 'search';
  }

  return APP_BAR_CONTENTS.includes(propsWithDefaults.content)
    ? propsWithDefaults.content
    : 'headline';
});
const normalizedAlign = computed(() => (
  APP_BAR_ALIGNMENTS.includes(propsWithDefaults.align) ? propsWithDefaults.align : 'start'
));
const expandedHeight = computed(() => {
  if (normalizedVariant.value === 'medium-flexible') {
    return 112;
  }

  if (normalizedVariant.value === 'large-flexible') {
    return 120;
  }

  return 64;
});
const usesAppRoot = computed(() => (
  propsWithDefaults.app && Boolean(appContext) && !hasExplicitAttach.value
));
const placeholderHeight = computed(() => {
  const flexibleHeight = Math.max(0, expandedHeight.value - 64);

  if (flexibleHeight > 0) {
    return flexibleHeight;
  }

  return propsWithDefaults.placeholder ? 64 : 0;
});

const headerClass = computed(() => [
  `mat-app-bar--${normalizedVariant.value}`,
  `mat-app-bar--content-${normalizedContent.value}`,
  `mat-app-bar--align-${normalizedAlign.value}`,
]);
const headerStyle = computed(() => [
  attrs.style,
  {
    '--mat-app-bar-timeline': timelineName,
  },
]);
const primaryTypographyClass = computed(() => {
  if (normalizedVariant.value === 'medium-flexible') {
    return getTypographyClass('headline', 'small');
  }

  if (normalizedVariant.value === 'large-flexible') {
    return getTypographyClass('headline', 'medium');
  }

  return getTypographyClass('title', 'large');
});

let mounted = false;
let unregisterTimeline;
let cleanupScrollListener;

function supportsScrollTimeline() {
  return typeof CSS !== 'undefined'
    && typeof CSS.supports === 'function'
    && CSS.supports('animation-timeline', 'scroll()');
}

function normalizeElement(value) {
  if (value instanceof HTMLElement && value.ownerDocument === document) {
    return value;
  }

  if (value?.$el instanceof HTMLElement && value.$el.ownerDocument === document) {
    return value.$el;
  }

  if (typeof value === 'string') {
    try {
      return document.querySelector(value);
    } catch {
      return null;
    }
  }

  return null;
}

function stopRegistrations() {
  unregisterTimeline?.();
  unregisterTimeline = undefined;
  cleanupScrollListener?.();
  cleanupScrollListener = undefined;
  const el = asideRef.value?.hostElement;
  el?.removeAttribute('data-timeline-active');
  el?.removeAttribute('data-scrolled');
}

async function syncRegistrations() {
  await nextTick();

  const el = asideRef.value?.hostElement;
  if (!mounted || !el) {
    return;
  }

  stopRegistrations();

  const explicitSource = normalizeElement(propsWithDefaults.scrollTarget);
  const appRootSource = usesAppRoot.value && appContext.rootElement.value?.dataset.scrollable === 'true'
    ? appContext.contentElement.value
    : null;
  const source = explicitSource ?? appRootSource ?? findNearestScrollSource(el);

  if (!source) {
    return;
  }

  const scope = findTimelineScope(source, el);

  if (supportsScrollTimeline() && scope) {
    unregisterTimeline = registerAppBarTimeline({
      name: timelineName,
      scope,
      source,
    });
    el.dataset.timelineActive = '';
  }

  const isDocSource = (
    source === document.documentElement
    || source === document.body
    || (typeof document.scrollingElement !== 'undefined' && source === document.scrollingElement)
  );
  const scrollListenerTarget = isDocSource ? window : source;

  function getScrollTop() {
    if (isDocSource) {
      return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    return source.scrollTop || 0;
  }

  function handleScroll() {
    const isScrolled = getScrollTop() > 0;
    if (isScrolled) {
      el?.setAttribute('data-scrolled', '');
    } else {
      el?.removeAttribute('data-scrolled');
    }
  }

  scrollListenerTarget.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  cleanupScrollListener = () => {
    scrollListenerTarget.removeEventListener('scroll', handleScroll);
  };
}

onMounted(() => {
  mounted = true;
  syncRegistrations();
});

onBeforeUnmount(() => {
  mounted = false;
  stopRegistrations();
});

watch([
  () => propsWithDefaults.app,
  () => propsWithDefaults.attach,
  () => propsWithDefaults.scrollTarget,
  normalizedVariant,
], syncRegistrations);

defineExpose({
  asideRef,
  hostElement: computed(() => asideRef.value?.hostElement),
});
</script>

<template>
  <MatAside
    ref="asideRef"
    as="header"
    location="top"
    :app="propsWithDefaults.app"
    :attach="forwardedAttach"
    :block-size="64"
    :safe-area="propsWithDefaults.safeArea"
    :safe-area-size="propsWithDefaults.safeAreaSize"
    :open="propsWithDefaults.open"
    :model-value="propsWithDefaults.modelValue"
    :bordered="propsWithDefaults.bordered"
    :mode="effectiveMode"
    :z-index="propsWithDefaults.zIndex"
    :transition="propsWithDefaults.transition"
    class="mat-app-bar"
    :class="headerClass"
    :style="headerStyle"
    v-bind="$attrs"
    @update:open="emit('update:open', $event)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div v-if="$slots.leading" class="mat-app-bar__leading">
      <slot name="leading" />
    </div>

    <div class="mat-app-bar__main">
      <div :class="['mat-app-bar__primary', primaryTypographyClass]">
        <slot />
      </div>

      <div
        v-if="$slots.subtitle"
        class="mat-app-bar__subtitle mat-sys-typescale-body-medium"
      >
        <slot name="subtitle" />
      </div>
    </div>

    <span class="mat-app-bar__spacer" aria-hidden="true" />

    <div v-if="$slots.trailing" class="mat-app-bar__trailing">
      <slot name="trailing" />
    </div>
  </MatAside>

  <span
    v-if="placeholderHeight > 0"
    aria-hidden="true"
    class="mat-app-bar__placeholder"
    :style="{ blockSize: `${placeholderHeight}px` }"
  />
</template>

<style scoped>
@layer mde.components {
  .mat-app-bar {
    --mat-app-bar-expanded-height: 64px;
    --mat-app-bar-collapsed-inset: 0;
    isolation: isolate;
    box-sizing: border-box;
    display: flex;
    inline-size: 100%;
    min-inline-size: 0;
    align-items: center;
    padding-inline: 4px;
    color: var(--mat-sys-color-on-surface);
    pointer-events: auto;
  }

  .mat-app-bar::before {
    position: absolute;
    z-index: 0;
    inset-block-start: 0;
    inset-inline: 0;
    box-sizing: border-box;
    block-size: var(--mat-app-bar-expanded-height);
    clip-path: inset(0);
    background: var(--mat-sys-color-surface);
    content: '';
    pointer-events: none;
  }

  .mat-app-bar::after {
    position: absolute;
    z-index: 0;
    inset-block-start: 0;
    inset-inline: 0;
    box-sizing: border-box;
    block-size: var(--mat-app-bar-expanded-height);
    clip-path: inset(0);
    background: var(--mat-sys-color-surface-container);
    opacity: 0;
    transition: opacity var(--mat-sys-motion-spring-default-spatial, .3s ease);
    content: '';
    pointer-events: none;
  }

  .mat-app-bar[data-scrolled]::after {
    opacity: 1;
  }

  .mat-app-bar--medium-flexible {
    --mat-app-bar-expanded-height: 112px;
    --mat-app-bar-collapsed-inset: 48px;
    --mat-app-bar-collapsed-title-scale: .916667;
  }

  .mat-app-bar--large-flexible {
    --mat-app-bar-expanded-height: 120px;
    --mat-app-bar-collapsed-inset: 56px;
    --mat-app-bar-collapsed-title-scale: .785714;
  }

  .mat-app-bar__leading,
  .mat-app-bar__trailing {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    min-block-size: 48px;
    align-items: center;
    gap: var(--mat-sys-spacing-1, 4px);
  }

  .mat-app-bar__main {
    position: relative;
    z-index: 1;
    display: flex;
    flex-grow: 1;
    min-inline-size: 0;
    flex-direction: column;
    justify-content: center;
    padding-inline: 12px;
  }

  .mat-app-bar__primary {
    min-inline-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform-origin: left center;
  }

  .mat-app-bar__subtitle {
    overflow: hidden;
    color: var(--mat-sys-color-on-surface-variant);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mat-app-bar__spacer {
    position: relative;
    z-index: 1;
    flex-grow: 1;
    min-inline-size: 0;
  }

  .mat-app-bar--medium-flexible,
  .mat-app-bar--large-flexible {
    align-items: center;
  }

  .mat-app-bar--medium-flexible .mat-app-bar__main,
  .mat-app-bar--large-flexible .mat-app-bar__main {
    padding-inline-start: 12px;
  }

  .mat-app-bar--medium-flexible .mat-app-bar__main {
    translate: 0 24px;
  }

  .mat-app-bar--large-flexible .mat-app-bar__main {
    translate: 0 28px;
  }

  .mat-app-bar--medium-flexible .mat-app-bar__primary,
  .mat-app-bar--large-flexible .mat-app-bar__primary {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .mat-app-bar--medium-flexible .mat-app-bar__subtitle,
  .mat-app-bar--large-flexible .mat-app-bar__subtitle {
    position: absolute;
    inset-block-start: 100%;
    inset-inline: 12px;
  }

  .mat-app-bar--align-center {
    display: grid;
    grid-template-columns: minmax(48px, 1fr) minmax(0, auto) minmax(48px, 1fr);
  }

  .mat-app-bar--align-center .mat-app-bar__leading {
    justify-self: start;
  }

  .mat-app-bar--align-center .mat-app-bar__main {
    inline-size: max-content;
    max-inline-size: 100%;
    justify-self: center;
    text-align: center;
  }

  .mat-app-bar--align-center .mat-app-bar__primary {
    transform-origin: center;
  }

  .mat-app-bar--align-center .mat-app-bar__spacer {
    display: none;
  }

  .mat-app-bar--align-center .mat-app-bar__trailing {
    justify-self: end;
  }

  .mat-app-bar--content-image .mat-app-bar__primary {
    block-size: 48px;
  }

  .mat-app-bar--content-image .mat-app-bar__primary :deep(img),
  .mat-app-bar--content-image .mat-app-bar__primary :deep(svg) {
    display: block;
    max-inline-size: 100%;
    block-size: 100%;
    object-fit: contain;
    object-position: left center;
  }

  .mat-app-bar--content-search .mat-app-bar__main {
    inline-size: min(50%, 48rem);
    flex-grow: 0;
  }

  .mat-app-bar--content-search .mat-app-bar__primary {
    display: flex;
    overflow: visible;
  }

  @media (width < 312px) {
    .mat-app-bar--content-search .mat-app-bar__main {
      inline-size: auto;
      flex-grow: 1;
    }
  }

  @supports (animation-timeline: scroll()) {
    .mat-app-bar[data-timeline-active]::after {
      animation: mat-app-bar-tint-scroll 1ms linear both;
      animation-range: 0 16px;
      animation-timeline: var(--mat-app-bar-timeline);
      transition: none;
    }

    .mat-app-bar--medium-flexible[data-timeline-active]::before {
      animation: mat-app-bar-flexible-collapse 1ms linear both;
      animation-range: 0 48px;
      animation-timeline: var(--mat-app-bar-timeline);
    }

    .mat-app-bar--large-flexible[data-timeline-active]::before {
      animation: mat-app-bar-flexible-collapse 1ms linear both;
      animation-range: 0 56px;
      animation-timeline: var(--mat-app-bar-timeline);
    }

    .mat-app-bar--medium-flexible[data-timeline-active]::after {
      animation: mat-app-bar-flexible-tint-scroll 1ms linear both;
      animation-range: 0 48px;
      animation-timeline: var(--mat-app-bar-timeline);
      transition: none;
    }

    .mat-app-bar--large-flexible[data-timeline-active]::after {
      animation: mat-app-bar-flexible-tint-scroll 1ms linear both;
      animation-range: 0 56px;
      animation-timeline: var(--mat-app-bar-timeline);
      transition: none;
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__main,
    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__main {
      animation: mat-app-bar-main-scroll 1ms linear both;
      animation-timeline: var(--mat-app-bar-timeline);
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__primary,
    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__primary {
      animation: mat-app-bar-primary-scroll 1ms linear both;
      animation-timeline: var(--mat-app-bar-timeline);
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__subtitle,
    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__subtitle {
      animation: mat-app-bar-secondary-exit 1ms linear both;
      animation-timeline: var(--mat-app-bar-timeline);
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__primary {
      animation-range: 0 48px;
    }

    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__primary {
      animation-range: 0 56px;
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__main {
      animation-range: 0 48px;
    }

    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__main {
      animation-range: 0 56px;
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__subtitle {
      animation-range: 0 34px;
    }

    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__subtitle {
      animation-range: 0 39px;
    }

    .mat-app-bar--content-image[data-timeline-active] .mat-app-bar__primary {
      animation-name: mat-app-bar-image-scroll;
    }
  }

  @keyframes mat-app-bar-tint-scroll {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes mat-app-bar-flexible-collapse {
    to {
      clip-path: inset(0 0 var(--mat-app-bar-collapsed-inset));
    }
  }

  @keyframes mat-app-bar-flexible-tint-scroll {
    from {
      clip-path: inset(0);
      opacity: 0;
    }

    to {
      clip-path: inset(0 0 var(--mat-app-bar-collapsed-inset));
      opacity: 1;
    }
  }

  @keyframes mat-app-bar-main-scroll {
    to {
      translate: 0;
    }
  }

  @keyframes mat-app-bar-primary-scroll {
    to {
      scale: var(--mat-app-bar-collapsed-title-scale);
    }
  }

  @keyframes mat-app-bar-image-scroll {
    to {
      scale: .84;
    }
  }

  @keyframes mat-app-bar-secondary-exit {
    to {
      opacity: 0;
      translate: 0 -8px;
    }
  }

  .mat-app-bar__placeholder {
    display: block;
    inline-size: 100%;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    @supports (animation-timeline: scroll()) {
      .mat-app-bar[data-timeline-active]::before,
      .mat-app-bar--medium-flexible[data-timeline-active]::before,
      .mat-app-bar--large-flexible[data-timeline-active]::before {
        animation-name: mat-app-bar-small-scroll;
        animation-range: 0 16px;
      }

      .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__main,
      .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__main,
      .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__primary,
      .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__primary,
      .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__subtitle,
      .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__subtitle {
        animation: none;
      }
    }
  }
}
</style>
