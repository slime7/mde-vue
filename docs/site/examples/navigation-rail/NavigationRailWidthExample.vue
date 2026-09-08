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

    <mat-layout class="navigation-rail-width-example-layout">
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
    </mat-layout>
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
  inline-size: 100%;
  block-size: 240px;
  overflow: hidden;
}

.navigation-rail-width-example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  block-size: 240px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
