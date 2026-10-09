<script setup>
import { computed, inject } from 'vue';
import { useMatProps } from '../use-mat-props';
import { MAT_TABS_KEY } from './tabs-context';

defineOptions({
  name: 'MatTabContent',
});

const props = defineProps({
  /**
   * 对应 `mat-tab-item` 的稳定值；匹配当前选中项的面板保持可交互。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('tabContent', props);

const tabs = inject(MAT_TABS_KEY, null);
const active = computed(() => tabs?.isSelected(propsWithDefaults.value) ?? false);
</script>

<template>
  <div
    class="mat-tab-content"
    role="tabpanel"
    :inert="active ? undefined : ''"
    :aria-hidden="active ? undefined : 'true'"
  >
    <slot />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-tab-content {
    box-sizing: border-box;
    flex: 0 0 100%;
    min-inline-size: 0;
    color: var(--mat-sys-color-on-surface);
  }
}
</style>
