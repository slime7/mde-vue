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
const orientation = computed(() => navigation?.orientation.value ?? 'vertical');
const expanded = computed(() => navigation?.expanded.value ?? false);
const selected = computed(() => navigation?.isSelected(props.value) ?? false);
const itemClasses = computed(() => ({
  'mat-navigation-rail-item--selected': selected.value,
  'mat-navigation-rail-item--disabled': props.disabled,
  [`mat-navigation-rail-item--${orientation.value}-${expanded.value ? 'expanded' : 'collapsed'}`]: true,
}));
const hasLabel = computed(() => Boolean(slots.default));

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  navigation?.requestSelection(props.value, event);
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
    :focus-ring="true"
    :href="href"
    :use-cursor="matUi.useCursor"
    @click="handleClick"
  >
    <span class="mat-navigation-rail-item__indicator" aria-hidden="true" />

    <MatIcon
      v-if="icon"
      :fill="selected ? 1 : 0"
      :icon="icon"
      class="mat-navigation-rail-item__icon"
      aria-hidden="true"
    />

    <span
      v-if="hasLabel"
      class="mat-navigation-rail-item__label"
    >
      <slot />
    </span>
  </MatActionBase>
</template>

<style scoped>
.mat-navigation-rail-item {
  --mat-action-state-color: var(--mat-navigation-rail-item-state-color);
  position: relative;
  z-index: 0;
  display: flex;
  box-sizing: border-box;
  min-inline-size: 0;
  min-block-size: var(--mat-navigation-rail-item-target-size);
  align-items: center;
  justify-content: center;
  color: var(--mat-navigation-rail-item-content-color);
  text-align: start;
  text-decoration: none;
  background: transparent;
  border: 0;
  border-radius: var(--mat-navigation-rail-item-shape);
}

.mat-navigation-rail-item__indicator {
  position: absolute;
  z-index: -1;
  inset: 50% auto auto 50%;
  inline-size: var(--mat-navigation-rail-item-indicator-size);
  block-size: var(--mat-navigation-rail-item-indicator-size);
  background: var(--mat-navigation-rail-item-selected-container-color);
  border-radius: var(--mat-navigation-rail-item-selected-shape);
  opacity: 0;
  translate: -50% -50%;
  transition: opacity var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), inline-size var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized), border-radius var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized);
}

.mat-navigation-rail-item--selected {
  --mat-navigation-rail-item-content-color: var(--mat-navigation-rail-item-selected-content-color);
}

.mat-navigation-rail-item--selected .mat-navigation-rail-item__indicator {
  opacity: 1;
}

.mat-navigation-rail-item--vertical-collapsed {
  flex-direction: column;
  gap: var(--mat-navigation-rail-item-icon-label-gap);
  inline-size: var(--mat-navigation-rail-collapsed-item-width);
  min-block-size: var(--mat-navigation-rail-collapsed-item-height);
  padding-block: var(--mat-navigation-rail-item-vertical-padding);
  margin-inline: auto;
}

.mat-navigation-rail-item--vertical-expanded {
  justify-content: flex-start;
  gap: var(--mat-navigation-rail-item-icon-label-gap);
  inline-size: 100%;
  padding-inline: var(--mat-navigation-rail-item-expanded-padding);
}

.mat-navigation-rail-item--horizontal-collapsed {
  flex: 1 1 0;
  flex-direction: column;
  gap: var(--mat-navigation-rail-item-icon-label-gap);
  min-inline-size: var(--mat-navigation-bar-item-min-width);
  padding-block: var(--mat-navigation-rail-item-horizontal-padding);
}

.mat-navigation-rail-item--horizontal-expanded {
  flex: 0 0 auto;
  justify-content: flex-start;
  gap: var(--mat-navigation-rail-item-icon-label-gap);
  min-inline-size: var(--mat-navigation-bar-expanded-item-width);
  padding-inline: var(--mat-navigation-rail-item-expanded-padding);
}

.mat-navigation-rail-item__icon {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  color: inherit;
}

.mat-navigation-rail-item__label {
  position: relative;
  z-index: 1;
  min-inline-size: 0;
  overflow: hidden;
  font-family: var(--mat-navigation-rail-item-label-font);
  font-size: var(--mat-navigation-rail-item-label-size);
  font-weight: var(--mat-navigation-rail-item-label-weight);
  line-height: var(--mat-navigation-rail-item-label-line-height);
  letter-spacing: var(--mat-navigation-rail-item-label-tracking);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-navigation-rail-item--disabled {
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

@media (prefers-reduced-motion: reduce) {
  .mat-navigation-rail-item__indicator {
    transition-duration: 0s;
  }
}
</style>
