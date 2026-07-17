<!-- #region script -->
<script setup>
import { ref } from 'vue';

const sizes = ref({ first: 1, second: 1 });
const rows = Array.from({ length: 12 }, (_, index) => `可滚动内容 ${index + 1}`);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="panes-scroll-example">
    <mat-panes :sizes="sizes">
      <mat-pane
        id="first"
        resize-label="第一列"
      >
        <div class="panes-scroll-example__content">
          <p
            v-for="row in rows"
            :key="row"
          >
            {{ row }}
          </p>
        </div>
      </mat-pane>

      <mat-pane
        id="second"
        resize-label="第二列"
      >
        <div class="panes-scroll-example__content">
          内容超过 Pane 高度时，滚动条保留在当前 Pane 内。
        </div>
      </mat-pane>
    </mat-panes>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.panes-scroll-example {
  block-size: 180px;
  inline-size: 100%;
  border: 1px solid var(--mat-sys-color-outline-variant);
}

.panes-scroll-example__content {
  min-block-size: 100%;
  padding: 16px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
}

.panes-scroll-example__content p {
  margin: 0 0 8px;
}
</style>
<!-- #endregion style -->
