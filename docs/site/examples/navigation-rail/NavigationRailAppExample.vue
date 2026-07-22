<!-- #region script -->
<script setup>
import { ref } from 'vue';

const active = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <section
    id="navigation-rail-app-example"
    class="navigation-rail-app-example"
  >
    <mat-btn variant="outlined" @click="active = !active">
      {{ active ? '隐藏应用导航' : '显示应用导航' }}
    </mat-btn>
    <mat-navigation-rail
      v-if="active"
      app
      attach="#navigation-rail-app-example"
      aria-label="应用导航"
    >
      <mat-navigation-rail-item icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item icon="settings">
        设置
      </mat-navigation-rail-item>
    </mat-navigation-rail>
    <p>应用模式的 rail 固定在视口起始侧，并挂载到本示例容器。</p>
  </section>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-app-example {
  min-block-size: 160px;
}

.navigation-rail-app-example p {
  margin-block: 12px 0;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
