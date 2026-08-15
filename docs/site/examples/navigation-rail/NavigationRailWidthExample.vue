<!-- #region script -->
<script setup>
import { ref } from 'vue';

const width = ref(280);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-width-example-shell">
    <mat-radio-group
      v-model="width"
      class="navigation-rail-width-example-controls"
      label="展开宽度"
    >
      <mat-radio :value="280">
        280px
      </mat-radio>
      <mat-radio value="min(80vw, 360px)">
        min(80vw, 360px)
      </mat-radio>
    </mat-radio-group>

    <div class="navigation-rail-width-example-layout">
      <mat-navigation-rail
        expanded
        :width="width"
        aria-label="自定义宽度导航"
      >
        <mat-navigation-rail-item icon="home">
          首页
        </mat-navigation-rail-item>
        <mat-navigation-rail-item icon="folder">
          项目
        </mat-navigation-rail-item>
      </mat-navigation-rail>

      <div class="navigation-rail-width-example-content">
        当前宽度：{{ width }}
      </div>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-width-example-shell {
  display: flex;
  inline-size: 100%;
  flex-direction: column;
  gap: 12px;
}

.navigation-rail-width-example-controls {
  flex-flow: row wrap;
  align-items: center;
}

.navigation-rail-width-example-layout {
  display: flex;
  inline-size: 100%;
  min-block-size: 240px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
}

.navigation-rail-width-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
  background: var(--mat-sys-color-surface-container-low);
}
</style>
<!-- #endregion style -->
