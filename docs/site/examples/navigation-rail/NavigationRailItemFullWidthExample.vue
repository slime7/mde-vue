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
      <div class="navigation-rail-example-shell">
        <mat-navigation-rail
          v-model="selected"
          expanded
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
      </div>
    </section>

    <section>
      <h3>full-width：指示器铺满宽度</h3>
      <div class="navigation-rail-example-shell">
        <mat-navigation-rail
          v-model="selected"
          expanded
          full-width
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
      </div>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-full-width-example {
  display: grid;
  inline-size: 100%;
  gap: 16px;
}

.navigation-rail-full-width-example h3 {
  margin-block: 0 8px;
  font-size: 14px;
}

.navigation-rail-example-shell {
  display: flex;
  inline-size: 100%;
  min-block-size: 220px;
  overflow: hidden;
}

.navigation-rail-example-content {
  display: grid;
  flex: 1 1 auto;
  min-inline-size: 0;
  place-items: center;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
