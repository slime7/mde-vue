<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="notification-icon-slot-example">
    <mat-btn variant="outlined" @click="open = true">
      重新显示
    </mat-btn>

    <mat-notification
      v-model="open"
      text="图标 Slot 可以放置头像或自定义标记。"
      title="来自 MDE 团队"
    >
      <template #icon>
        <span class="notification-icon-slot-example__avatar">M</span>
      </template>
    </mat-notification>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.notification-icon-slot-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.notification-icon-slot-example__avatar {
  display: grid;
  inline-size: 24px;
  block-size: 24px;
  place-items: center;
  color: var(--mat-sys-color-on-primary-container);
  background: var(--mat-sys-color-primary-container);
  border-radius: var(--mat-sys-shape-corner-full);
}
</style>
<!-- #endregion style -->
