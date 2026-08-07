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
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import {
  findNearestScrollSource,
  findTimelineScope,
  registerAppBarTimeline,
} from './app-bar-timeline';

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
});

const attrs = useAttrs();
const instance = getCurrentInstance();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach');
const hostElement = ref(null);
const headerElement = ref(null);
const edgeRegistration = shallowRef(null);
const timelineName = `--mat-app-bar-${instance?.uid ?? Math.random().toString(36).slice(2)}`;
const normalizedVariant = computed(() => (
  APP_BAR_VARIANTS.includes(props.variant) ? props.variant : 'small'
));
const normalizedContent = computed(() => {
  if (normalizedVariant.value === 'search') {
    return 'search';
  }

  return APP_BAR_CONTENTS.includes(props.content) ? props.content : 'headline';
});
const normalizedAlign = computed(() => (
  APP_BAR_ALIGNMENTS.includes(props.align) ? props.align : 'start'
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
const usesAppRoot = computed(() => props.app && Boolean(appContext) && !hasExplicitAttach);
const attachTarget = computed(() => {
  if (!props.app) {
    return document.body;
  }

  if (usesAppRoot.value) {
    return appContext.edgeLayer.value;
  }

  if (props.attach instanceof HTMLElement && props.attach.ownerDocument === document) {
    return props.attach;
  }

  if (typeof props.attach === 'string') {
    try {
      return document.querySelector(props.attach);
    } catch {
      return null;
    }
  }

  return null;
});
const placeholderHeight = computed(() => {
  if (!props.app) {
    return 0;
  }

  return usesAppRoot.value ? expandedHeight.value - 64 : expandedHeight.value;
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
const hostClass = computed(() => ({
  'mat-app-bar__host--app': props.app,
  'mat-app-bar__host--app-root': usesAppRoot.value,
}));

let mounted = false;
let unregisterTimeline;

function supportsScrollTimeline() {
  return typeof CSS !== 'undefined'
    && typeof CSS.supports === 'function'
    && CSS.supports('animation-timeline', 'scroll()');
}

function normalizeElement(value) {
  if (value instanceof HTMLElement && value.ownerDocument === document) {
    return value;
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
  headerElement.value?.removeAttribute('data-timeline-active');
  edgeRegistration.value?.unregister();
  edgeRegistration.value = null;
}

async function syncRegistrations() {
  await nextTick();

  if (!mounted || !hostElement.value || !headerElement.value) {
    return;
  }

  stopRegistrations();

  if (usesAppRoot.value) {
    edgeRegistration.value = appContext.publicContext.registerEdge({
      edge: 'top',
      element: hostElement.value,
    });
  }

  if (!supportsScrollTimeline()) {
    return;
  }

  const explicitSource = normalizeElement(props.scrollTarget);
  const appRootSource = usesAppRoot.value && appContext.rootElement.value?.dataset.scrollable === 'true'
    ? appContext.contentElement.value
    : null;
  const source = explicitSource ?? appRootSource ?? findNearestScrollSource(hostElement.value);

  if (!source) {
    return;
  }

  const scope = usesAppRoot.value
    ? appContext.rootElement.value
    : findTimelineScope(source, headerElement.value);

  if (!scope) {
    return;
  }

  unregisterTimeline = registerAppBarTimeline({
    name: timelineName,
    scope,
    source,
  });
  headerElement.value.dataset.timelineActive = '';
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
  () => props.app,
  () => props.attach,
  () => props.scrollTarget,
  normalizedVariant,
], syncRegistrations);
</script>

<template>
  <span
    v-if="placeholderHeight > 0"
    aria-hidden="true"
    class="mat-app-bar__placeholder"
    :style="{ blockSize: `${placeholderHeight}px` }"
  />

  <Teleport
    v-if="!props.app || attachTarget"
    :disabled="!props.app"
    :to="attachTarget"
  >
    <div ref="hostElement" class="mat-app-bar__host" :class="hostClass">
      <header
        ref="headerElement"
        v-bind="attrs"
        class="mat-app-bar"
        :class="headerClass"
        :style="headerStyle"
      >
        <div v-if="$slots.leading" class="mat-app-bar__leading">
          <slot name="leading" />
        </div>

        <div class="mat-app-bar__main">
          <div class="mat-app-bar__primary">
            <slot />
          </div>

          <div v-if="$slots.subtitle" class="mat-app-bar__subtitle">
            <slot name="subtitle" />
          </div>
        </div>

        <span class="mat-app-bar__spacer" aria-hidden="true" />

        <div v-if="$slots.trailing" class="mat-app-bar__trailing">
          <slot name="trailing" />
        </div>
      </header>
    </div>
  </Teleport>
</template>

<style scoped>
.mat-app-bar__placeholder {
  display: block;
  inline-size: 100%;
  pointer-events: none;
}

.mat-app-bar__host {
  display: contents;
}

.mat-app-bar__host--app {
  position: fixed;
  z-index: 8;
  display: block;
  box-sizing: border-box;
  inset-block-start: 0;
  inset-inline: 0;
  block-size: 64px;
  pointer-events: none;
}

.mat-app-bar__host--app-root {
  position: absolute;
}

.mat-app-bar {
  --mat-app-bar-expanded-height: 64px;
  position: sticky;
  z-index: 8;
  inset-block-start: 0;
  box-sizing: border-box;
  display: flex;
  inline-size: 100%;
  min-inline-size: 0;
  block-size: var(--mat-app-bar-expanded-height);
  align-items: center;
  padding-inline: 4px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface);
  pointer-events: auto;
}

.mat-app-bar__host--app .mat-app-bar {
  position: absolute;
  inset: 0 0 auto;
}

.mat-app-bar--medium-flexible {
  --mat-app-bar-expanded-height: 112px;
}

.mat-app-bar--large-flexible {
  --mat-app-bar-expanded-height: 120px;
}

.mat-app-bar__leading,
.mat-app-bar__trailing {
  display: flex;
  flex: 0 0 auto;
  min-block-size: 48px;
  align-items: center;
  gap: var(--mat-sys-spacing-1, 4px);
}

.mat-app-bar__main {
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
  font-family: var(--mat-sys-typescale-title-large-font);
  font-size: var(--mat-sys-typescale-title-large-size);
  font-weight: var(--mat-sys-typescale-title-large-weight);
  line-height: var(--mat-sys-typescale-title-large-line-height);
  letter-spacing: var(--mat-sys-typescale-title-large-tracking);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-app-bar__subtitle {
  overflow: hidden;
  color: var(--mat-sys-color-on-surface-variant);
  font-family: var(--mat-sys-typescale-body-medium-font);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
  letter-spacing: var(--mat-sys-typescale-body-medium-tracking);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-app-bar__spacer {
  flex-grow: 1;
  min-inline-size: 0;
}

.mat-app-bar--medium-flexible,
.mat-app-bar--large-flexible {
  align-items: flex-start;
  padding-block-end: 12px;
}

.mat-app-bar--medium-flexible .mat-app-bar__leading,
.mat-app-bar--medium-flexible .mat-app-bar__trailing,
.mat-app-bar--large-flexible .mat-app-bar__leading,
.mat-app-bar--large-flexible .mat-app-bar__trailing {
  padding-block-start: 8px;
}

.mat-app-bar--medium-flexible .mat-app-bar__main,
.mat-app-bar--large-flexible .mat-app-bar__main {
  align-self: flex-end;
  justify-content: flex-end;
  padding-inline-start: 12px;
}

.mat-app-bar--medium-flexible .mat-app-bar__primary,
.mat-app-bar--large-flexible .mat-app-bar__primary {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.mat-app-bar--medium-flexible .mat-app-bar__primary {
  font-family: var(--mat-sys-typescale-headline-small-font);
  font-size: var(--mat-sys-typescale-headline-small-size);
  line-height: var(--mat-sys-typescale-headline-small-line-height);
  letter-spacing: var(--mat-sys-typescale-headline-small-tracking);
}

.mat-app-bar--large-flexible .mat-app-bar__primary {
  font-family: var(--mat-sys-typescale-headline-medium-font);
  font-size: var(--mat-sys-typescale-headline-medium-size);
  line-height: var(--mat-sys-typescale-headline-medium-line-height);
  letter-spacing: var(--mat-sys-typescale-headline-medium-tracking);
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
  .mat-app-bar[data-timeline-active] {
    animation: mat-app-bar-small-scroll 1ms linear both;
    animation-range: 0 16px;
    animation-timeline: var(--mat-app-bar-timeline);
  }

  .mat-app-bar--medium-flexible[data-timeline-active] {
    animation-name: mat-app-bar-medium-scroll;
    animation-range: 0 48px;
  }

  .mat-app-bar--large-flexible[data-timeline-active] {
    animation-name: mat-app-bar-large-scroll;
    animation-range: 0 56px;
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

@keyframes mat-app-bar-small-scroll {
  to {
    background: var(--mat-sys-color-surface-container);
  }
}

@keyframes mat-app-bar-medium-scroll {
  to {
    block-size: 64px;
    padding-block-end: 0;
    background: var(--mat-sys-color-surface-container);
  }
}

@keyframes mat-app-bar-large-scroll {
  to {
    block-size: 64px;
    padding-block-end: 0;
    background: var(--mat-sys-color-surface-container);
  }
}

@keyframes mat-app-bar-primary-scroll {
  to {
    font-size: var(--mat-sys-typescale-title-large-size);
    line-height: var(--mat-sys-typescale-title-large-line-height);
    translate: 0 -2px;
  }
}

@keyframes mat-app-bar-image-scroll {
  to {
    block-size: 40px;
    scale: .84;
    transform-origin: left center;
    translate: 0 -2px;
  }
}

@keyframes mat-app-bar-secondary-exit {
  to {
    opacity: 0;
    translate: 0 -8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  @supports (animation-timeline: scroll()) {
    .mat-app-bar[data-timeline-active],
    .mat-app-bar--medium-flexible[data-timeline-active],
    .mat-app-bar--large-flexible[data-timeline-active] {
      animation-name: mat-app-bar-small-scroll;
      animation-range: 0 16px;
    }

    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__primary,
    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__primary,
    .mat-app-bar--medium-flexible[data-timeline-active] .mat-app-bar__subtitle,
    .mat-app-bar--large-flexible[data-timeline-active] .mat-app-bar__subtitle {
      animation: none;
    }
  }
}
</style>
