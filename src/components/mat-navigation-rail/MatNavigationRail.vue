<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, provide,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import { MAT_NAVIGATION_RAIL_KEY } from './mat-navigation-context';

defineOptions({
  name: 'MatNavigationRail',
  inheritAttrs: false,
});

const props = defineProps({
  orientation: {
    type: String,
    default: 'vertical',
    validator(value) {
      return ['vertical', 'horizontal'].includes(value);
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: undefined,
    validator(value) {
      return (typeof value === 'number' && Number.isFinite(value) && value >= 0)
        || (typeof value === 'string' && value.trim().length > 0);
    },
  },
  position: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'end'].includes(value);
    },
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'modal'].includes(value);
    },
  },
  hideOnCollapse: {
    type: Boolean,
    default: false,
  },
  alignment: {
    type: String,
    default: 'top',
    validator(value) {
      return ['top', 'center'].includes(value);
    },
  },
  openIcon: {
    type: String,
    default: 'menu',
  },
  closeIcon: {
    type: String,
    default: 'menu_open',
  },
  openLabel: {
    type: String,
    default: '展开导航',
  },
  closeLabel: {
    type: String,
    default: '收起导航',
  },
});

const emit = defineEmits({
  'update:modelValue': (value) => ['string', 'number', 'boolean'].includes(typeof value),
  'update:expanded': (value) => typeof value === 'boolean',
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const isHorizontal = computed(() => props.orientation === 'horizontal');
const effectiveExpanded = computed(() => props.expanded);
const isModal = computed(() => !isHorizontal.value && props.layout === 'modal');
const isHidden = computed(() => !isHorizontal.value && props.hideOnCollapse && !props.expanded);
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
}));
const railClasses = computed(() => ({
  'mat-navigation-rail--expanded': effectiveExpanded.value,
  'mat-navigation-rail--collapsed': !props.expanded,
  'mat-navigation-rail--bar': isHorizontal.value,
  'mat-navigation-rail--modal': isModal.value && props.expanded,
  'mat-navigation-rail--hidden': isHidden.value,
}));

const expandedWidthStyle = computed(() => {
  if (props.width === undefined) {
    return undefined;
  }

  const width = typeof props.width === 'number' ? `${props.width}px` : props.width;

  return { '--mat-navigation-rail-expanded-width': width };
});

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
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div
    class="mat-navigation-rail-host"
    :class="hostClasses"
    :style="expandedWidthStyle"
  >
    <button
      v-if="isModal && expanded"
      class="mat-navigation-rail__scrim"
      type="button"
      :aria-label="closeLabel"
      @click="requestCollapse"
    />

    <nav
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

.mat-navigation-rail--modal {
  position: absolute;
  z-index: 11;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: var(--mat-navigation-rail-expanded-width);
  max-inline-size: calc(100vw - var(--mat-navigation-rail-modal-edge-space));
  background: var(--mat-navigation-rail-modal-container-color);
  border-start-end-radius: var(--mat-navigation-rail-modal-shape);
  border-end-end-radius: var(--mat-navigation-rail-modal-shape);
  box-shadow: var(--mat-navigation-rail-modal-elevation);
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
  overflow: visible;
  background: transparent;
}

.mat-navigation-rail__scrim {
  position: absolute;
  z-index: 10;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 100vw;
  block-size: 100%;
  padding: 0;
  background: var(--mat-navigation-rail-scrim-color);
  border: 0;
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

@media (prefers-reduced-motion: reduce) {
  .mat-navigation-rail-host,
  .mat-navigation-rail {
    transition-duration: 0s;
  }
}
</style>
