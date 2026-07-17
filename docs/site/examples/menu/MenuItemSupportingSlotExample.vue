<!-- #region script -->
<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <div class="example-menu">
    <mat-btn id="supporting-slot-menu-trigger" @click="open = !open">
      supporting
    </mat-btn>
    <mat-menu
      id="supporting-slot-menu"
      v-model="open"
      anchor="supporting-slot-menu-trigger"
    >
      <mat-menu-item>
        新建文件
        <template #supporting>
          创建空白文档
        </template>
      </mat-menu-item>
    </mat-menu>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-menu {
  min-block-size: 160px;
}
</style>
<!-- #endregion style -->
