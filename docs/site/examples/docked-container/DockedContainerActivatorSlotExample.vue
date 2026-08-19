<!-- #region template -->
<template>
  <div class="docked-container-example">
    <mat-docked-container v-model="open">
      <template #activator>
        <mat-btn
          variant="outlined"
          icon="settings"
          @click="open = !open"
        >
          设置选项
        </mat-btn>
      </template>

      <template #headline>
        偏好设置
      </template>

      <div class="docked-settings-content">
        <mat-switch v-model="notifications" label="启用桌面通知" />
      </div>

      <template #actions>
        <mat-spacer />
        <mat-btn variant="filled-tonal" @click="open = false">
          确定
        </mat-btn>
      </template>
    </mat-docked-container>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
const notifications = ref(true);
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.docked-container-example {
  min-block-size: 140px;
}

.docked-settings-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
<!-- #endregion style -->
