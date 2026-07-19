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
  expanded: {
    type: Boolean,
    default: false,
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
  selected: {
    type: [String, Number, Boolean],
    default: null,
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
  'update:expanded': (value) => typeof value === 'boolean',
  select: (payload) => payload
    && Object.hasOwn(payload, 'value')
    && Object.hasOwn(payload, 'nextSelected')
    && payload.originalEvent instanceof Event,
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const isVertical = computed(() => props.orientation === 'vertical');
const isModal = computed(() => isVertical.value && props.layout === 'modal');
const isHidden = computed(() => (
  isModal.value && props.hideOnCollapse && !props.expanded
));
const hasToggle = computed(() => isVertical.value && props.collapsible);
const toggleIcon = computed(() => (props.expanded ? props.closeIcon : props.openIcon));
const toggleLabel = computed(() => (props.expanded ? props.closeLabel : props.openLabel));
const hostClasses = computed(() => ({
  'mat-navigation-rail-host--vertical': isVertical.value,
  'mat-navigation-rail-host--horizontal': !isVertical.value,
  'mat-navigation-rail-host--standard': !isModal.value,
  'mat-navigation-rail-host--modal': isModal.value,
  'mat-navigation-rail-host--expanded': props.expanded,
  'mat-navigation-rail-host--collapsed': !props.expanded,
  'mat-navigation-rail-host--hidden': isHidden.value,
}));
const navigationClasses = computed(() => ({
  'mat-navigation-rail--vertical': isVertical.value,
  'mat-navigation-rail--horizontal': !isVertical.value,
  'mat-navigation-rail--standard-expanded': !isModal.value && props.expanded,
  'mat-navigation-rail--modal-expanded': isModal.value && props.expanded,
  'mat-navigation-rail--hidden': isHidden.value,
}));

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isSelected(value) {
  return value !== undefined && Object.is(props.selected, value);
}

/**
 * @param {unknown} value
 * @param {MouseEvent | KeyboardEvent} originalEvent
 */
function requestSelection(value, originalEvent) {
  if (value === undefined) {
    return;
  }

  const selected = isSelected(value);

  if (selected) {
    return;
  }

  emit('select', {
    value,
    selected: true,
    nextSelected: value,
    originalEvent,
  });
}

function toggleExpanded() {
  emit('update:expanded', !props.expanded);
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key === 'Escape' && isModal.value && props.expanded) {
    toggleExpanded();
  }
}

provide(MAT_NAVIGATION_RAIL_KEY, {
  expanded: computed(() => props.expanded),
  isSelected,
  orientation: computed(() => props.orientation),
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
    v-bind="$attrs"
    class="mat-navigation-rail-host"
    :class="hostClasses"
  >
    <nav
      class="mat-navigation-rail"
      :class="navigationClasses"
      :aria-orientation="orientation"
    >
      <MatActionBase
        v-if="hasToggle"
        class="mat-navigation-rail__toggle"
        :aria-expanded="expanded"
        :aria-label="toggleLabel"
        :use-cursor="matUi.useCursor"
        @click="toggleExpanded"
      >
        <MatIcon
          :icon="toggleIcon"
          aria-hidden="true"
        />
      </MatActionBase>

      <div
        v-if="!isHidden"
        class="mat-navigation-rail__items"
      >
        <div
          v-if="$slots.fab"
          class="mat-navigation-rail__fab"
        >
          <slot
            name="fab"
            :expanded="expanded"
          />
        </div>

        <div class="mat-navigation-rail__list">
          <slot :expanded="expanded" />
        </div>
      </div>

      <div
        v-if="$slots.end && !isHidden"
        class="mat-navigation-rail__end"
      >
        <slot
          name="end"
          :expanded="expanded"
          :orientation="orientation"
        />
      </div>
    </nav>
  </div>
</template>

<style scoped>
.mat-navigation-rail-host {
  --mat-navigation-rail-current-width: var(--mat-navigation-rail-collapsed-width);
  position: relative;
  box-sizing: border-box;
  flex: 0 0 auto;
  min-inline-size: 0;
  min-block-size: 0;
  color: var(--mat-navigation-rail-content-color);
  transition: inline-size var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized);
}

.mat-navigation-rail-host--vertical {
  align-self: stretch;
  inline-size: var(--mat-navigation-rail-current-width);
  min-block-size: 100%;
}

.mat-navigation-rail-host--vertical.mat-navigation-rail-host--expanded {
  --mat-navigation-rail-current-width: var(--mat-navigation-rail-expanded-width);
}

.mat-navigation-rail-host--modal {
  --mat-navigation-rail-current-width: var(--mat-navigation-rail-collapsed-width);
}

.mat-navigation-rail-host--hidden {
  --mat-navigation-rail-current-width: 0;
  inline-size: 0;
}

.mat-navigation-rail-host--horizontal {
  inline-size: 100%;
  block-size: var(--mat-navigation-bar-height);
}

.mat-navigation-rail {
  position: relative;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  color: inherit;
  background: var(--mat-navigation-rail-container-color);
  transition: inline-size var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized);
}

.mat-navigation-rail--vertical {
  flex-direction: column;
  inline-size: var(--mat-navigation-rail-current-width);
  block-size: 100%;
  gap: var(--mat-navigation-rail-space);
  padding-block: var(--mat-navigation-rail-padding);
}

.mat-navigation-rail--horizontal {
  inline-size: 100%;
  block-size: 100%;
  gap: var(--mat-navigation-bar-content-gap);
  align-items: stretch;
  justify-content: space-around;
  padding-inline: var(--mat-navigation-bar-padding);
}

.mat-navigation-rail--modal-expanded {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: var(--mat-navigation-rail-expanded-width);
  box-shadow: var(--mat-navigation-rail-modal-elevation);
}

.mat-navigation-rail--hidden {
  inline-size: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;
}

.mat-navigation-rail__toggle {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  inline-size: var(--mat-navigation-rail-toggle-size);
  block-size: var(--mat-navigation-rail-toggle-size);
  padding: 0;
  margin-inline: auto;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: var(--mat-navigation-rail-toggle-shape);
}

.mat-navigation-rail--hidden .mat-navigation-rail__toggle {
  position: absolute;
  inset-block-start: var(--mat-navigation-rail-hidden-toggle-offset);
  inset-inline-start: 0;
  margin: 0;
}

.mat-navigation-rail__items,
.mat-navigation-rail__list,
.mat-navigation-rail__end {
  display: flex;
  min-inline-size: 0;
}

.mat-navigation-rail__items {
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--mat-navigation-rail-space);
  min-block-size: 0;
}

.mat-navigation-rail__list {
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--mat-navigation-rail-item-gap);
  overflow: auto;
  scrollbar-width: none;
}

.mat-navigation-rail__list::-webkit-scrollbar {
  display: none;
}

.mat-navigation-rail__fab,
.mat-navigation-rail__end {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.mat-navigation-rail--horizontal .mat-navigation-rail__items {
  flex: 1 1 auto;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  min-block-size: 0;
}

.mat-navigation-rail--horizontal .mat-navigation-rail__list {
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  overflow: visible;
}

.mat-navigation-rail--horizontal .mat-navigation-rail__fab,
.mat-navigation-rail--horizontal .mat-navigation-rail__end {
  inline-size: auto;
}

@media (prefers-reduced-motion: reduce) {
  .mat-navigation-rail-host,
  .mat-navigation-rail {
    transition-duration: 0s;
  }
}
</style>
