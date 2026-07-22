<script setup>
import { computed, inject, useSlots } from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import { MAT_NAVIGATION_RAIL_KEY } from './mat-navigation-context';

defineOptions({
  name: 'MatNavigationRailItem',
  inheritAttrs: false,
});

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  click: (payload) => payload instanceof MouseEvent,
});
const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const navigation = inject(MAT_NAVIGATION_RAIL_KEY, null);
const expanded = computed(() => navigation?.expanded.value ?? false);
const isHorizontal = computed(() => navigation?.orientation.value === 'horizontal');
const position = computed(() => navigation?.position.value ?? 'start');
const horizontalContent = computed(() => expanded.value);
const selected = computed(() => navigation?.isSelected(props.value) ?? false);
const hasIcon = computed(() => Boolean(props.icon || slots.icon));
const itemClasses = computed(() => ({
  'mat-navigation-rail-item--selected': selected.value,
  'mat-navigation-rail-item--disabled': props.disabled,
  'mat-navigation-rail-item--expanded': expanded.value,
  'mat-navigation-rail-item--collapsed': !expanded.value,
  'mat-navigation-rail-item--horizontal': isHorizontal.value,
  [`mat-navigation-rail-item--${position.value}`]: true,
}));

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  if (!props.disabled) {
    navigation?.requestSelection(props.value);
  }

  emit('click', event);
}
</script>

<template>
  <MatActionBase
    v-bind="$attrs"
    class="mat-navigation-rail-item"
    :class="itemClasses"
    :aria-current="selected ? 'page' : undefined"
    :disabled="disabled"
    :focus-ring="false"
    :href="href"
    :use-cursor="matUi.useCursor"
    @click="handleClick"
  >
    <span class="mat-navigation-rail-item__indicator">
      <span class="mat-navigation-rail-item__icon-wrap">
        <slot
          v-if="slots.icon"
          name="icon"
          :selected="selected"
        />

        <MatIcon
          v-else-if="hasIcon"
          :fill="selected ? 1 : 0"
          :icon="icon"
          class="mat-navigation-rail-item__icon"
          aria-hidden="true"
        />

      </span>

      <span
        v-if="horizontalContent"
        class="mat-navigation-rail-item__label"
      >
        <slot />
      </span>
    </span>

    <span
      v-if="!horizontalContent"
      class="mat-navigation-rail-item__label"
    >
      <slot />
    </span>
  </MatActionBase>
</template>

<style scoped>
.mat-navigation-rail-item {
  --mat-action-state-color: transparent;
  position: relative;
  display: flex;
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  align-items: center;
  color: var(--mat-navigation-rail-item-content-color);
  text-align: start;
  text-decoration: none;
  background: transparent;
  border: 0;
}

.mat-navigation-rail-item--collapsed {
  min-block-size: var(--mat-navigation-rail-collapsed-item-height);
  flex-direction: column;
  align-items: var(--mat-navigation-rail-item-inline-alignment, center);
  justify-content: center;
  gap: var(--mat-navigation-rail-vertical-icon-label-space);
  padding-block: var(--mat-navigation-rail-item-space);
  padding-inline: var(--mat-navigation-rail-collapsed-side-space);
}

.mat-navigation-rail-item--expanded {
  min-block-size: var(--mat-navigation-rail-expanded-item-height);
  justify-content: var(--mat-navigation-rail-item-inline-alignment, flex-start);
  padding-inline: var(--mat-navigation-rail-expanded-side-space);
}

.mat-navigation-rail-item--horizontal {
  flex: 1 1 0;
  min-block-size: 100%;
  padding-inline: 0;
}

.mat-navigation-rail-item--horizontal.mat-navigation-rail-item--expanded {
  flex: 0 0 var(--mat-navigation-bar-horizontal-item-width);
}

.mat-navigation-rail-item__indicator {
  position: relative;
  isolation: isolate;
  display: flex;
  box-sizing: border-box;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-navigation-rail-item__indicator::before,
.mat-navigation-rail-item__indicator::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  content: '';
  pointer-events: none;
}

.mat-navigation-rail-item__indicator::before {
  background: var(--mat-navigation-rail-item-selected-container-color);
  opacity: 0;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-navigation-rail-item__indicator::after {
  background: var(--mat-navigation-rail-item-state-color);
  opacity: 0;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-navigation-rail-item--selected .mat-navigation-rail-item__indicator::before {
  opacity: 1;
}

.mat-navigation-rail-item--collapsed .mat-navigation-rail-item__indicator {
  inline-size: var(--mat-navigation-rail-vertical-indicator-width);
  block-size: var(--mat-navigation-rail-vertical-indicator-height);
}

.mat-navigation-rail-item--expanded .mat-navigation-rail-item__indicator {
  min-block-size: var(--mat-navigation-rail-horizontal-indicator-height);
  max-inline-size: 100%;
  gap: var(--mat-navigation-rail-horizontal-icon-label-space);
  padding-inline: var(--mat-navigation-rail-horizontal-leading-space);
}

.mat-navigation-rail-item--horizontal .mat-navigation-rail-item__indicator {
  min-block-size: var(--mat-navigation-bar-horizontal-indicator-height);
  max-inline-size: 100%;
  gap: var(--mat-navigation-bar-horizontal-icon-label-space);
  padding-inline: var(--mat-navigation-bar-horizontal-indicator-space);
}

.mat-navigation-rail-item--horizontal.mat-navigation-rail-item--collapsed .mat-navigation-rail-item__indicator {
  inline-size: var(--mat-navigation-rail-vertical-indicator-width);
  block-size: var(--mat-navigation-rail-vertical-indicator-height);
  min-block-size: 0;
  padding-inline: 0;
}

.mat-navigation-rail-item__icon-wrap {
  position: relative;
  z-index: 1;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.mat-navigation-rail-item__icon {
  color: inherit;
}

.mat-navigation-rail-item__label {
  position: relative;
  z-index: 1;
  min-inline-size: 0;
  color: inherit;
  font-family: var(--mat-navigation-rail-item-label-font);
  font-size: var(--mat-navigation-rail-item-label-size);
  font-weight: var(--mat-navigation-rail-item-label-weight);
  line-height: var(--mat-navigation-rail-item-label-line-height);
  letter-spacing: var(--mat-navigation-rail-item-label-tracking);
  overflow-wrap: break-word;
  white-space: normal;
}

.mat-navigation-rail-item--collapsed > .mat-navigation-rail-item__label {
  inline-size: var(--mat-navigation-rail-vertical-indicator-width);
  max-inline-size: 100%;
  color: var(--mat-navigation-rail-item-content-color);
  text-align: center;
}

.mat-navigation-rail-item--expanded .mat-navigation-rail-item__label {
  font-family: var(--mat-navigation-rail-expanded-label-font);
  font-size: var(--mat-navigation-rail-expanded-label-size);
  font-weight: var(--mat-navigation-rail-expanded-label-weight);
  line-height: var(--mat-navigation-rail-expanded-label-line-height);
  letter-spacing: var(--mat-navigation-rail-expanded-label-tracking);
}

.mat-navigation-rail-item--horizontal .mat-navigation-rail-item__label {
  font-family: var(--mat-navigation-rail-item-label-font);
  font-size: var(--mat-navigation-rail-item-label-size);
  font-weight: var(--mat-navigation-rail-item-label-weight);
  line-height: var(--mat-navigation-rail-item-label-line-height);
  letter-spacing: var(--mat-navigation-rail-item-label-tracking);
}

.mat-navigation-rail-item--selected {
  color: var(--mat-navigation-rail-item-selected-content-color);
}

.mat-navigation-rail-item--selected.mat-navigation-rail-item--collapsed > .mat-navigation-rail-item__label {
  color: var(--mat-navigation-rail-item-selected-label-color);
}

.mat-navigation-rail-item--horizontal.mat-navigation-rail-item--selected .mat-navigation-rail-item__label {
  color: var(--mat-navigation-bar-item-selected-label-color);
}

.mat-navigation-rail-item:focus-visible {
  outline: 0;
}

.mat-navigation-rail-item:focus-visible .mat-navigation-rail-item__indicator {
  outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset);
}

.mat-navigation-rail-item:focus-visible .mat-navigation-rail-item__indicator::after,
.mat-navigation-rail-item:active .mat-navigation-rail-item__indicator::after {
  opacity: var(--mat-sys-state-focus-state-layer-opacity);
}

@media (hover: hover) {
  .mat-navigation-rail-item:not(:disabled):hover .mat-navigation-rail-item__indicator::after {
    opacity: var(--mat-sys-state-hover-state-layer-opacity);
  }
}

.mat-navigation-rail-item--disabled {
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

@media (prefers-reduced-motion: reduce) {
  .mat-navigation-rail-item__indicator::before,
  .mat-navigation-rail-item__indicator::after {
    transition-duration: 0s;
  }
}
</style>
