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
    <mat-btn
      :variant="advanced ? 'filled-tonal' : 'outlined'"
      @click="advanced = !advanced"
    >
      {{ advanced ? '收起高级设置' : '展开高级设置' }}
    </mat-btn>
    <mat-simple-expansion v-model="advanced">
      <div class="settings">
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
    </mat-simple-expansion>
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
