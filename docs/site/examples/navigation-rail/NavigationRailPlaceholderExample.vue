<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-app-root
    :fill-viewport="false"
    class="navigation-rail-placeholder-example"
  >
    <mat-navigation-rail
      v-if="active"
      app
      placeholder
      aria-label="占位导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="folder">
        项目
      </mat-navigation-rail-item>
    </mat-navigation-rail>
    <div class="navigation-rail-placeholder-example-content">
      <mat-switch v-model="active">
        {{ active ? '隐藏应用导航' : '显示应用导航' }}
      </mat-switch>
      <p>占位保留固定 rail 的宽度，正文不会从其声明位置穿过。</p>
    </div>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-placeholder-example {
  position: relative;
  block-size: 200px;
  overflow: hidden;
  border: 1px solid var(--mat-sys-color-outline-variant);
  border-radius: var(--mat-sys-shape-corner-large);
  background: var(--mat-sys-color-surface-container-low);
}

.navigation-rail-placeholder-example-content {
  padding: 16px;
}

.navigation-rail-placeholder-example p {
  margin-block: 12px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
