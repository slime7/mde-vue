<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="navigation-rail-full-width-example">
    <section>
      <h3>默认：指示器贴合内容</h3>
      <mat-layout class="navigation-rail-example-shell">
        <mat-navigation-rail
          v-model="selected"
          expanded
          bordered
          aria-label="贴合内容导航"
        >
          <mat-navigation-rail-item value="home" icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item value="folder" icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
        <div class="navigation-rail-example-content">
          正文
        </div>
      </mat-layout>
    </section>

    <section>
      <h3>full-width：指示器铺满宽度</h3>
      <mat-layout class="navigation-rail-example-shell">
        <mat-navigation-rail
          v-model="selected"
          expanded
          full-width
          bordered
          aria-label="铺满宽度导航"
        >
          <mat-navigation-rail-item value="home" icon="home">
            首页
          </mat-navigation-rail-item>
          <mat-navigation-rail-item value="folder" icon="folder">
            项目
          </mat-navigation-rail-item>
        </mat-navigation-rail>
        <div class="navigation-rail-example-content">
          正文
        </div>
      </mat-layout>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-full-width-example {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  gap: 16px;
}

.navigation-rail-full-width-example h3 {
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
