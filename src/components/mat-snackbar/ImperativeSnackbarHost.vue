<script setup>
import { provide, ref } from 'vue';
import { getImperativeComponentOptions, getImperativeTheme } from '../../imperative-context';
import MAT_UI_KEY from '../../mat-ui-context';
import MAT_THEME_KEY from '../../theme-context';
import MAT_SNACKBAR_EXTERNALLY_MANAGED_KEY from '../snackbar-context';
import MatSnackbar from './MatSnackbar.vue';

defineOptions({ name: 'MatImperativeSnackbarHost' });

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  onClosed: {
    type: Function,
    required: true,
  },
});
provide(MAT_UI_KEY, getImperativeComponentOptions());
provide(MAT_SNACKBAR_EXTERNALLY_MANAGED_KEY, true);

const theme = getImperativeTheme();

if (theme) {
  provide(MAT_THEME_KEY, theme);
}

const open = ref(true);

function finish() {
  props.onClosed();
}
</script>

<template>
  <MatSnackbar
    v-model="open"
    v-bind="options"
    @closed="finish"
  />
</template>
