<!-- #region template -->
<template>
  <div class="docked-container-example">
    <mat-btn
      id="docked-anchor-trigger"
      variant="filled"
      @click="open = !open"
    >
      打开锚点容器
    </mat-btn>

    <mat-docked-container
      v-model="open"
      anchor="docked-anchor-trigger"
      headline="快捷设置"
    >
      <p>浮动容器依附于锚点元素弹出，支持任意自定义内容。</p>
      <template #actions>
        <mat-spacer />
        <mat-btn variant="text" @click="open = false">
          完成
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
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.docked-container-example {
  min-block-size: 140px;
}
</style>
<!-- #endregion style -->
