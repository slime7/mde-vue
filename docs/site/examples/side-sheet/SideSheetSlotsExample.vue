<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <mat-btn @click="open = true">
    编辑订单
  </mat-btn>

  <mat-side-sheet v-model="open" variant="modal">
    <template #title>
      订单详情
    </template>

    <template #actions>
      <mat-btn icon="more_vert" label="更多操作" size="small" variant="standard" />
    </template>

    <div class="side-sheet-slots-example__content">
      <strong>轻量旅行背包</strong>
      <span>数量：1</span>
      <span>总计：¥399</span>
    </div>

    <template #footer>
      <mat-btn block @click="open = false">
        保存订单
      </mat-btn>
    </template>
  </mat-side-sheet>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.side-sheet-slots-example__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
<!-- #endregion style -->
