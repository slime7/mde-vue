<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, provide, useAttrs, useId,
} from 'vue';
import {
  MAT_MENU_GROUP_KEY, MAT_MENU_KEY, updateMenuItemPositions,
} from '../menu-context';

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
const attrs = useAttrs();
const menu = inject(MAT_MENU_KEY, null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const labelId = `${generatedId}-label`;
const labelledBy = computed(() => (
  props.label ? labelId : attrs['aria-labelledby']
));
const itemApis = new Set();

function registerItem(api) {
  itemApis.add(api);
  updateMenuItemPositions(Array.from(itemApis));
}

function unregisterItem(api) {
  itemApis.delete(api);
  updateMenuItemPositions(Array.from(itemApis));
}

provide(MAT_MENU_GROUP_KEY, {
  registerItem,
  unregisterItem,
});

onMounted(() => menu?.registerGroup());
onBeforeUnmount(() => menu?.unregisterGroup());
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-menu-group"
    :aria-labelledby="labelledBy"
    role="group"
  >
    <div
      v-if="label"
      :id="labelId"
      class="mat-menu-group__label"
    >
      {{ label }}
    </div>

    <slot />
  </div>
</template>

<style scoped>
.mat-menu-group {
  display: block;
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
  min-block-size: var(--mat-menu-group-label-height);
  padding-inline: 8px;
  color: var(--mat-menu-supporting-color);
  font-family: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  line-height: var(--mat-sys-typescale-label-large-line-height);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
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
</style>
