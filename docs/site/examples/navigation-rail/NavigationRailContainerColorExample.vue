<!-- #region script -->
<script setup>
import { ref } from 'vue';

const containerColor = ref(false);
const selected = ref('home');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="navigation-rail-container-color-example__shell">
    <mat-navigation-rail
      v-model="selected"
      expanded
      :container-color="containerColor"
      bordered
      aria-label="容器配色导航"
    >
      <mat-navigation-rail-item value="home" icon="home">
        首页
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="projects" icon="folder">
        项目
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="settings" icon="settings">
        设置
      </mat-navigation-rail-item>
    </mat-navigation-rail>

    <div class="navigation-rail-container-color-example__content">
      <mat-btn
        variant="outlined"
        @click="containerColor = !containerColor"
      >
        {{ containerColor ? '恢复 standard 容器色' : '启用 modal 容器色' }}
      </mat-btn>
      <p>当前容器色：{{ containerColor ? 'modal 语义' : 'standard 语义' }}</p>
    </div>
  </mat-layout>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.navigation-rail-container-color-example__shell {
  inline-size: 100%;
  block-size: 280px;
  overflow: hidden;
}

.navigation-rail-container-color-example__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  block-size: 280px;
  color: var(--mat-sys-color-on-surface-variant);
}

.navigation-rail-container-color-example__content p {
  margin: 0;
}
</style>
<!-- #endregion style -->
