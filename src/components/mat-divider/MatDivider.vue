<script setup>
import { computed, inject } from 'vue';
import { MAT_LIST_KEY } from '../list-context';
import { MAT_MENU_KEY } from '../menu-context';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatDivider',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 分隔线的缩进方式。`true` 表示两侧缩进；字符串值兼容 `none`、`start`、`middle`。
   *
   * @type {boolean | 'none' | 'start' | 'middle'}
   * @default false
   */
  inset: {
    type: [Boolean, String],
    default: false,
    validator(value) {
      return typeof value === 'boolean' || ['none', 'start', 'middle'].includes(value);
    },
  },
});
const propsWithDefaults = useMatProps('divider', props);
const list = inject(MAT_LIST_KEY, null);
const menu = inject(MAT_MENU_KEY, null);
const isInList = computed(() => Boolean(list));
const isInMenu = computed(() => Boolean(menu));
const isInListbox = computed(() => list?.isSelectable.value ?? false);
const insetMode = computed(() => {
  if (propsWithDefaults.inset === true) {
    return 'middle';
  }

  if (propsWithDefaults.inset === false) {
    return 'none';
  }

  return propsWithDefaults.inset;
});
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
      `mat-divider--${insetMode}`,
      { 'mat-divider--menu': isInMenu },
    ]"
    :aria-hidden="isInListbox ? 'true' : $attrs['aria-hidden']"
    :role="isInListbox ? 'presentation' : isInList || isInMenu ? 'separator' : $attrs.role"
  />
</template>

<style scoped>
@layer mde.components {
  .mat-divider {
    display: block;
    flex: 0 0 auto;
    box-sizing: border-box;
    block-size: var(--mat-divider-thickness);
    inline-size: 100%;
    padding: 0;
    margin-block: 0;
    margin-inline: 0;
    list-style: none;
    background: var(--mat-divider-color);
    border: 0;
  }

  .mat-divider--start {
    inline-size: calc(100% - var(--mat-divider-inset-space));
    margin-inline-start: var(--mat-divider-inset-space);
  }

  .mat-divider--middle {
    inline-size: calc(100% - 2 * var(--mat-divider-inset-space));
    margin-inline: var(--mat-divider-inset-space);
  }

  .mat-divider--menu {
    margin-block: 8px;
  }
}
</style>
