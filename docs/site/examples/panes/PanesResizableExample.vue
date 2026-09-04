<!-- #region script -->
<script setup>
import { ref } from 'vue';

const sizes = ref({ first: 1, second: 1 });
const resizable = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="panes-resizable-example">
    <mat-btn
      variant="outlined"
      @click="resizable = !resizable"
    >
      {{ resizable ? '关闭调整' : '开启调整' }}
    </mat-btn>

    <div class="panes-resizable-example__layout">
      <mat-panes
        :resizable="resizable"
        :sizes="sizes"
        @update:sizes="sizes = $event"
      >
        <mat-pane
          id="first"
          resize-label="第一面板"
        >
          <div>第一面板</div>
        </mat-pane>

        <mat-pane
          id="second"
          resize-label="第二面板"
        >
          <div>第二面板</div>
        </mat-pane>
      </mat-panes>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.panes-resizable-example {
  display: grid;
  gap: 12px;
  inline-size: 100%;
}

.panes-resizable-example__layout {
  block-size: 120px;
}

.panes-resizable-example__layout :deep(.mat-pane) {
  display: grid;
  place-items: center;
  color: var(--mat-sys-color-on-surface);
}
</style>
<!-- #endregion style -->
