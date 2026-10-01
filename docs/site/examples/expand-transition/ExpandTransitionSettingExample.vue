<!-- #region script -->
<script setup>
import { ref } from 'vue';

const advanced = ref(false);
const volume = ref(40);
const tag = ref('');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example">
    <mat-switch v-model="advanced">高级设置</mat-switch>
    <mat-expand-transition>
      <div
        v-show="advanced"
        class="settings"
      >
        <mat-slider
          v-model="volume"
          aria-label="音量微调"
          :max="100"
          :min="0"
        />
        <mat-text-field
          v-model="tag"
          label="备注标签"
        />
      </div>
    </mat-expand-transition>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example {
  display: flex;
  flex-direction: column;
  gap: 12px;
  inline-size: 100%;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--mat-sys-color-surface-container-low);
  border-radius: var(--mat-sys-shape-corner-medium);
}
</style>
<!-- #endregion style -->
