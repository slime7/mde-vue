<!-- #region script -->
<script setup>
import { ref } from 'vue';

const sizes = ref({ navigation: 1, content: 2, details: 1 });

function updateSizes(nextSizes) {
  sizes.value = nextSizes;
}
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="panes-example">
    <mat-panes
      :sizes="sizes"
      @update:sizes="updateSizes"
    >
      <mat-pane
        id="navigation"
        resize-label="导航区域"
      >
        <div class="panes-example__content">
          导航
        </div>
      </mat-pane>

      <mat-pane
        id="content"
        resize-label="主内容区域"
      >
        <div class="panes-example__content">
          主内容
        </div>
      </mat-pane>

      <mat-pane
        id="details"
        resize-label="详情区域"
      >
        <div class="panes-example__content">
          详情
        </div>
      </mat-pane>
    </mat-panes>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.panes-example {
  block-size: 180px;
  inline-size: 100%;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.panes-example__content {
  display: grid;
  block-size: 100%;
  place-items: center;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
