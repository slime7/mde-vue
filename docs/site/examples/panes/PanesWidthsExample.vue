<!-- #region script -->
<script setup>
import { ref } from 'vue';

const sizes = ref({ first: 1, second: 2 });
const widths = ref({});
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="panes-widths-example">
    <div class="panes-widths-example__status">
      宽度：{{ JSON.stringify(widths) }}
    </div>

    <div class="panes-widths-example__layout">
      <mat-panes
        :sizes="sizes"
        @update:sizes="sizes = $event"
        @update:widths="widths = $event"
      >
        <mat-pane
          id="first"
          resize-label="第一面板"
        >
          <div class="panes-widths-example__panel">
            第一面板
          </div>
        </mat-pane>

        <mat-pane
          id="second"
          resize-label="第二面板"
        >
          <div class="panes-widths-example__panel">
            第二面板
          </div>
        </mat-pane>
      </mat-panes>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.panes-widths-example {
  display: grid;
  gap: 12px;
}

.panes-widths-example__status {
  color: var(--mat-sys-color-on-surface-variant);
  font: var(--mat-sys-typescale-body-small-font);
}

.panes-widths-example__layout {
  block-size: 120px;
  border: 1px solid var(--mat-sys-color-outline-variant);
}

.panes-widths-example__panel {
  display: grid;
  block-size: 100%;
  place-items: center;
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
