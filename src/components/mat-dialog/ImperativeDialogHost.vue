<script setup>
import {
  computed, provide, ref, shallowRef,
} from 'vue';
import { getImperativeComponentOptions, getImperativeTheme } from '../../imperative-context';
import MAT_UI_KEY from '../../mat-ui-context';
import MAT_THEME_KEY from '../../theme-context';
import MatBtn from '../mat-btn/MatBtn.vue';
import MatSpacer from '../mat-spacer/MatSpacer.vue';
import MatTextField from '../mat-text-field/MatTextField.vue';
import MatDialog from './MatDialog.vue';

defineOptions({
  name: 'MatImperativeDialogHost',
});

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  cancelValue: {
    type: [String, Number, Boolean, Object, Array, Function, Symbol],
    default: undefined,
  },
  onClosed: {
    type: Function,
    required: true,
  },
});
provide(MAT_UI_KEY, getImperativeComponentOptions());

const theme = getImperativeTheme();

if (theme) {
  provide(MAT_THEME_KEY, theme);
}

const open = ref(true);
const result = shallowRef(props.cancelValue);
const inputValue = ref(props.options.promptConfig?.defaultValue ?? '');
const isPrompt = computed(() => Boolean(props.options.promptConfig));
const promptRequired = computed(() => props.options.promptConfig?.required ?? false);
const promptConfirmDisabled = computed(() => (
  promptRequired.value && inputValue.value.trim().length === 0
));
const dialogProps = computed(() => {
  const dialogOptions = { ...props.options };

  delete dialogOptions.actions;
  delete dialogOptions.ariaLabel;
  delete dialogOptions.promptConfig;

  if (props.options.promptConfig) {
    delete dialogOptions.content;
  }

  return dialogOptions;
});

/**
 * @param {object} action
 * @param {number} index
 */
function chooseAction(action, index) {
  if (action.disabled || (isPrompt.value
    && index === props.options.actions.length - 1
    && promptConfirmDisabled.value)) {
    return;
  }

  result.value = isPrompt.value && index === props.options.actions.length - 1
    ? inputValue.value
    : action.value;
  open.value = false;
}

function finish() {
  props.onClosed(result.value);
}
</script>

<template>
  <MatDialog
    v-model="open"
    v-bind="dialogProps"
    :aria-label="options.ariaLabel"
    @closed="finish"
  >
    <template v-if="isPrompt">
      <p v-if="options.content" class="mat-dialog-prompt__content">
        {{ options.content }}
      </p>

      <MatTextField
        v-model="inputValue"
        autofocus
        :label="options.promptConfig.label"
        :placeholder="options.promptConfig.placeholder"
        :required="options.promptConfig.required"
      />
    </template>

    <template #actions>
      <MatSpacer />
      <MatBtn
        v-for="(action, index) in options.actions"
        :key="index"
        :color="action.color"
        :disabled="action.disabled || (isPrompt && index === options.actions.length - 1 && promptConfirmDisabled)"
        :variant="action.variant"
        @click="chooseAction(action, index)"
      >
        {{ action.text }}
      </MatBtn>
    </template>
  </MatDialog>
</template>

<style scoped>
@layer mde.components {
  .mat-dialog-prompt__content {
    margin-block: 0 16px;
  }
}
</style>
