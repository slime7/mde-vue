<!-- #region script -->
<script setup>
import { ref } from 'vue';

const modalExpanded = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-layout-example">
    <section>
      <h3>standard：占据空间</h3>
      <mat-layout class="navigation-rail-example-shell">
        <mat-navigation-rail
          expanded
          layout="standard"
          aria-label="标准导航"
        >
          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
        <div class="navigation-rail-example-content">
          正文随 Rail 让位
        </div>
      </mat-layout>
    </section>

    <section>
      <h3>modal：覆盖正文</h3>
      <mat-layout class="navigation-rail-example-shell">
        <mat-navigation-rail
          v-model:expanded="modalExpanded"
          collapsible
          layout="modal"
          aria-label="模态导航"
        >
          <mat-navigation-rail-item icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
        <div class="navigation-rail-example-content">
          <mat-btn
            icon="menu"
            label="打开模态导航"
            @click="modalExpanded = true"
          >
            打开模态导航
          </mat-btn>
        </div>
      </mat-layout>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-layout-example {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  gap: 16px;
}

.navigation-rail-layout-example h3 {
  margin-block: 0 8px;
  font-size: 14px;
}

.navigation-rail-example-shell {
  inline-size: 100%;
  block-size: 220px;
  overflow: hidden;
}

.navigation-rail-example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  block-size: 220px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
