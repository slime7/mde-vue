<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, onUpdated, provide, ref, useAttrs, useId,
} from 'vue';
import {
  MAT_MENU_GROUP_KEY, MAT_MENU_KEY, updateMenuItemPositions,
} from '../menu-context';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatMenuGroup',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 可选的分组标签；未设置时不渲染标签。
   *
   * @type {string | undefined}
   * @default undefined
   */
  label: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('menuGroup', props);
const attrs = useAttrs();
const menu = inject(MAT_MENU_KEY, null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const labelId = `${generatedId}-label`;
const labelledBy = computed(() => (
  propsWithDefaults.label ? labelId : attrs['aria-labelledby']
));
const groupRoot = ref(null);
const itemApis = new Set();

function refreshGroupItemPositions() {
  const rootElement = groupRoot.value;
  const domNodes = rootElement
    ? Array.from(rootElement.querySelectorAll('[data-mat-menu-item]'))
    : [];

  updateMenuItemPositions(Array.from(itemApis), domNodes);
}

function registerItem(api) {
  itemApis.add(api);
  refreshGroupItemPositions();
  nextTick(refreshGroupItemPositions);
}

function unregisterItem(api) {
  itemApis.delete(api);
  refreshGroupItemPositions();
  nextTick(refreshGroupItemPositions);
}

provide(MAT_MENU_GROUP_KEY, {
  registerItem,
  unregisterItem,
});

onMounted(() => menu?.registerGroup());
onUpdated(refreshGroupItemPositions);
onBeforeUnmount(() => menu?.unregisterGroup());
</script>

<template>
  <div
    ref="groupRoot"
    v-bind="$attrs"
    class="mat-menu-group"
    :aria-labelledby="labelledBy"
    role="group"
  >
    <div
      v-if="propsWithDefaults.label"
      :id="labelId"
      class="mat-menu-group__label mat-sys-typescale-label-large"
    >
      {{ propsWithDefaults.label }}
    </div>

    <slot />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-menu-group {
    display: flex;
    flex-direction: column;
    gap: var(--mat-menu-item-space);
    box-sizing: border-box;
    min-inline-size: 100%;
    padding: var(--mat-menu-container-padding);
    color: var(--mat-menu-content-color);
    background: var(--mat-menu-container-color);
    border-radius: var(--mat-sys-shape-corner-small);
  }

  .mat-menu-group:first-child:not(:last-child) {
    border-radius: var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
      var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small);
  }

  .mat-menu-group:last-child:not(:first-child) {
    border-radius: var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)
      var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large);
  }

  .mat-menu-group:only-child {
    border-radius: var(--mat-sys-shape-corner-large);
  }

  .mat-menu-group__label {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-inline-size: 0;
    min-block-size: var(--mat-menu-group-label-height);
    padding-inline: 8px;
    overflow-wrap: anywhere;
    color: var(--mat-menu-supporting-color);
  }

  @supports (border-shape: inset(0 round 1px)) {
    .mat-menu-group {
      border-shape: inset(0 round var(--mat-sys-shape-corner-small));
    }

    .mat-menu-group:first-child:not(:last-child) {
      border-shape: inset(
        0 round
        var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
        var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)
      );
    }

    .mat-menu-group:last-child:not(:first-child) {
      border-shape: inset(
        0 round
        var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)
        var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
      );
    }

    .mat-menu-group:only-child {
      border-shape: inset(0 round var(--mat-sys-shape-corner-large));
    }
  }
}
</style>
