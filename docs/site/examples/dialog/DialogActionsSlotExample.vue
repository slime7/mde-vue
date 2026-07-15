<script setup>
import { ref } from 'vue';

const open = ref(false);
const result = ref('尚未选择');

function choose(value) {
  result.value = value;
  open.value = false;
}
</script>

<template>
  <div class="dialog-actions-example">
    <mat-btn @click="open = true">
      选择保存方式
    </mat-btn>
    <span>{{ result }}</span>
  </div>

  <mat-dialog v-model="open" title="保存更改？" content="可以稍后继续编辑。">
    <template #actions>
      <mat-btn variant="text" @click="choose('已取消')">
        取消
      </mat-btn>
      <mat-btn variant="filled-tonal" @click="choose('已保存')">
        保存
      </mat-btn>
    </template>
  </mat-dialog>
</template>

<style scoped>
.dialog-actions-example {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
