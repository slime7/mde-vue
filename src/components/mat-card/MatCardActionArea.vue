<script setup>
import { inject } from 'vue';
import MatActionBase from '../MatActionBase.vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import { BUTTON_TYPES } from '../button-props';
defineOptions({ name: 'MatCardActionArea', inheritAttrs: false });
defineProps({ href: { type: String, default: undefined }, disabled: { type: Boolean, default: false }, type: { type: String, default: 'button', validator: (value) => BUTTON_TYPES.includes(value) } });
const emit = defineEmits({ click(payload) { return payload instanceof MouseEvent; } });
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
</script>
<template>
  <MatActionBase
    v-bind="$attrs"
    class="mat-card-action-area"
    :disabled="disabled"
    :focus-ring="false"
    :href="href"
    :type="type"
    :use-cursor="matUi.useCursor"
    @click="emit('click', $event)"
  >
    <span class="mat-card-action-area__content"><slot /></span>
  </MatActionBase>
</template>
<style scoped>
.mat-card-action-area {
  --mat-action-state-color: var(--mat-card-content-color, var(--mat-sys-color-on-surface));
  display: block;
  inline-size: 100%;
  padding: 0;
  color: inherit;
  text-align: inherit;
  text-decoration: none;
  background: transparent;
  border: 0;
}

.mat-card-action-area__content {
  position: relative;
  z-index: 1;
  display: block;
}
</style>
