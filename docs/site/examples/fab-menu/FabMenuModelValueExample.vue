<!-- #region template -->
<template>
  <mat-app-root :fill-viewport="false" class="fab-menu-app-example">
    <div class="fab-menu-app-example__controls">
      <mat-btn
        variant="tonal"
        @click="open = !open"
      >
        {{ open ? '点击收起菜单' : '点击展开菜单' }}
      </mat-btn>
    </div>

    <mat-fab-menu
      v-model="open"
      icon="share"
      label="分享"
      close-icon="close"
      close-label="关闭分享"
    >
      <mat-btn prefix="link" variant="filled">
        复制链接
      </mat-btn>
      <mat-btn prefix="mail" variant="filled">
        邮件发送
      </mat-btn>
      <mat-btn prefix="send" variant="filled">
        直接发送
      </mat-btn>
    </mat-fab-menu>
  </mat-app-root>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.fab-menu-app-example {
  block-size: 380px;
}

.fab-menu-app-example__controls {
  display: flex;
}
</style>
<!-- #endregion style -->
