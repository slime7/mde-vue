<!-- #region script -->
<script setup>
import { ref } from 'vue';

const openTheme = ref(false);
const openExport = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="dialog-width-example">
    <mat-btn @click="openTheme = true">
      打开 720px 主题 Dialog
    </mat-btn>

    <mat-btn variant="outlined" @click="openExport = true">
      打开 520px 导出 Dialog
    </mat-btn>
  </div>

  <mat-dialog
    v-model="openTheme"
    title="主题设置"
    content="较宽的 Dialog 适合展示主题预览和多列设置。"
    :width="720"
  >
    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="openTheme = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>

  <mat-dialog
    v-model="openExport"
    title="导出设置"
    content="520px 宽度适合展示导出选项和确认操作。"
    width="520px"
  >
    <template #actions>
      <mat-spacer />
      <mat-btn variant="text" @click="openExport = false">
        关闭
      </mat-btn>
    </template>
  </mat-dialog>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.dialog-width-example {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
<!-- #endregion style -->
