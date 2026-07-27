<script setup>
import { computed, inject } from 'vue';
import { MAT_LIST_KEY } from '../list-context';
import { MAT_MENU_KEY } from '../menu-context';

defineOptions({
  name: 'MatDivider',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 分隔线的缩进方式；可选值为 `none`、`start`、`middle`。
   *
   * @type {'none' | 'start' | 'middle'}
   * @default 'none'
   */
  inset: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'start', 'middle'].includes(value);
    },
  },
});
const list = inject(MAT_LIST_KEY, null);
const menu = inject(MAT_MENU_KEY, null);
const isInList = computed(() => Boolean(list));
const isInMenu = computed(() => Boolean(menu));
const isInListbox = computed(() => list?.isSelectable.value ?? false);
const tag = computed(() => {
  if (!isInList.value) {
    return isInMenu.value ? 'div' : 'hr';
  }

  return isInListbox.value ? 'div' : 'li';
});
</script>

<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="mat-divider"
    :class="[
      `mat-divider--${props.inset}`,
      { 'mat-divider--menu': isInMenu },
    ]"
    :aria-hidden="isInListbox ? 'true' : $attrs['aria-hidden']"
    :role="isInListbox ? 'presentation' : isInList || isInMenu ? 'separator' : $attrs.role"
  />
</template>

<style scoped>
.mat-divider {
  display: block;
  flex: 0 0 auto;
  box-sizing: border-box;
  block-size: var(--mat-divider-thickness);
  padding: 0;
  margin-block: 0;
  margin-inline: 0;
  list-style: none;
  background: var(--mat-divider-color);
  border: 0;
}

.mat-divider--start {
  margin-inline-start: var(--mat-divider-inset-space);
}

.mat-divider--middle {
  margin-inline: var(--mat-divider-inset-space);
}

.mat-divider--menu {
  margin-block: 8px;
}
</style>
