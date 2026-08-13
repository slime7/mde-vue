<script setup>
import { computed, ref } from 'vue';
import vStateLayer from '../directives/state-layer';

defineOptions({ name: 'MatActionBase', inheritAttrs: false });

const props = defineProps({
  as: { type: String, default: 'button' },
  href: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  useCursor: { type: Boolean, default: false },
  focusRing: { type: Boolean, default: true },
});
const emit = defineEmits({
  click(payload) { return payload instanceof MouseEvent; },
});
const isLink = computed(() => props.href !== undefined);
const component = computed(() => (isLink.value ? 'a' : props.as));
const isButton = computed(() => component.value === 'button');
const root = ref(null);
function handleClick(event) {
  if (props.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  emit('click', event);
}
defineExpose({ root });
</script>

<template>
  <component
    :is="component"
    ref="root"
    v-state-layer="{ color: 'var(--mat-action-state-color, currentcolor)' }"
    v-bind="$attrs"
    class="mat-action-base"
    :class="{
      'mat-action-base--disabled': disabled,
      'mat-action-base--use-cursor': useCursor,
      'mat-action-base--focus-ring': focusRing,
    }"
    :aria-disabled="!isButton && disabled ? 'true' : $attrs['aria-disabled']"
    :disabled="isButton ? disabled : undefined"
    :href="isLink && !disabled ? href : undefined"
    :role="isLink && disabled ? 'link' : $attrs.role"
    :tabindex="!isButton && disabled ? -1 : $attrs.tabindex"
    :type="isButton ? type : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style scoped>
.mat-action-base {
  --mat-action-state-color: currentcolor;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  appearance: none;
  cursor: default;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.mat-action-base--use-cursor:not(:disabled):not(.mat-action-base--disabled) { cursor: pointer; }

.mat-action-base--focus-ring:not(:disabled):not(.mat-action-base--disabled):focus-visible {
  outline: var(--mat-sys-interaction-focus-ring-width, 3px) solid var(--mat-sys-color-secondary);
  outline-offset: var(--mat-sys-interaction-focus-ring-offset, 2px);
}

.mat-action-base:disabled,
.mat-action-base--disabled { cursor: not-allowed; }
</style>
