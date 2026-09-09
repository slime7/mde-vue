<!-- #region script -->
<script setup>
import { ref } from 'vue';

const containerColor = ref(false);
const selected = ref('inbox');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-layout class="navigation-drawer-container-color-example__shell">
    <mat-navigation-drawer
      v-model="selected"
      expanded
      :container-color="containerColor"
      bordered
      aria-label="容器配色导航抽屉"
    >
      <mat-navigation-rail-item value="inbox" icon="inbox">
        收件箱
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="starred" icon="star">
        收藏夹
      </mat-navigation-rail-item>
      <mat-navigation-rail-item value="sent" icon="send">
        已发送
      </mat-navigation-rail-item>
    </mat-navigation-drawer>

    <div class="navigation-drawer-container-color-example__content">
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
.navigation-drawer-container-color-example__shell {
  inline-size: 100%;
  block-size: 320px;
  overflow: hidden;
}

.navigation-drawer-container-color-example__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  block-size: 320px;
  color: var(--mat-sys-color-on-surface-variant);
}

.navigation-drawer-container-color-example__content p {
  margin: 0;
}
</style>
<!-- #endregion style -->
