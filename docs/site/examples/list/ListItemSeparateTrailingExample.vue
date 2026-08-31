<!-- #region script -->
<script setup>
import { ref } from 'vue';

const selected = ref('option-1');
const lastAction = ref('无');
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-container">
    <mat-list
      interaction="single-select"
      :selected="selected"
      aria-label="选择模式与尾部插槽示例"
      class="example-list"
      @select="selected = $event.nextSelected"
    >
      <mat-list-item value="option-1">
        默认模式（展示型 Radio，点击整行触发选中）
        <template #trailing>
          <mat-radio
            :model-value="selected"
            value="option-1"
            inert
            aria-hidden="true"
          />
        </template>
      </mat-list-item>

      <mat-list-item
        value="option-2"
        :separate-trailing="true"
      >
        分离模式（独立操作按钮，点击按钮不触发选中）
        <template #trailing>
          <mat-btn
            icon="info"
            label="查看详情"
            size="small"
            variant="standard"
            @click="lastAction = '点击了【查看详情】按钮'"
          />
        </template>
      </mat-list-item>
    </mat-list>

    <div class="status-tip">
      <span>当前选中项：{{ selected }}</span>
      <span>最后尾部操作：{{ lastAction }}</span>
    </div>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  inline-size: 100%;
}

.example-list {
  inline-size: 100%;
}

.status-tip {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  color: var(--mat-sys-color-on-surface-variant);
}
</style>
<!-- #endregion style -->
