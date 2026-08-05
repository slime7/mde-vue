<!-- #region script -->
<script setup>
import {
  defineComponent, h,
} from 'vue';
import { useMatApp } from 'mdu-ui';

const LayoutReadout = defineComponent({
  name: 'LayoutReadout',
  setup() {
    const { layout } = useMatApp();

    return () => h('pre', { class: 'app-root-layout-example__readout' }, JSON.stringify({
      breakpoint: layout.breakpoint,
      breakpointRange: layout.breakpointRange,
      content: layout.content,
      padding: layout.padding,
      size: layout.size,
    }, null, 2));
  },
});
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="app-root-layout-example">
    <p>调整文档预览宽度时，下面的只读响应式数据会同步变化。</p>
    <LayoutReadout />
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.app-root-layout-example {
  min-block-size: 280px;
  padding: 16px;
  background: var(--mat-sys-color-surface-container-low);
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.app-root-layout-example p {
  margin-block: 0 12px;
}

.app-root-layout-example :deep(.app-root-layout-example__readout) {
  margin: 0;
  padding: 16px;
  overflow: auto;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
